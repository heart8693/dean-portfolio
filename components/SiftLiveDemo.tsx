'use client'

/**
 * SiftLiveDemo — the trained model running in the visitor's browser.
 *
 * Loads a fine-tuned, calibrated, int8-quantized DistilBERT from the
 * Hugging Face Hub via transformers.js and routes the prediction through
 * the same preset thresholds the Sift design ships (90 / 85 / 70).
 *
 * The model download is opt-in (~68 MB) and cached by the browser.
 * Calibration is baked into the exported weights, so the softmax output
 * here IS the calibrated confidence. Input text gets the same
 * normalization the training pipeline used (digit runs -> "num").
 */

import { useRef, useState } from 'react'

// Set this to the Hugging Face repo the model was uploaded to.
const MODEL_ID = 'heart8693/sift-intent-classifier'

const INTENT_TO_CATEGORY: Record<string, string> = {
  check_invoice: 'billing', get_invoice: 'billing',
  check_payment_methods: 'billing', payment_issue: 'billing',
  get_refund: 'refunds', track_refund: 'refunds',
  check_refund_policy: 'refunds',
  create_account: 'account_access', delete_account: 'account_access',
  edit_account: 'account_access', switch_account: 'account_access',
  recover_password: 'account_access', registration_problems: 'account_access',
  place_order: 'orders', change_order: 'orders', cancel_order: 'orders',
  track_order: 'orders', check_cancellation_fee: 'orders',
  set_up_shipping_address: 'shipping_delivery',
  change_shipping_address: 'shipping_delivery',
  delivery_options: 'shipping_delivery', delivery_period: 'shipping_delivery',
  contact_customer_service: 'general_inquiry',
  contact_human_agent: 'general_inquiry', complaint: 'general_inquiry',
  review: 'general_inquiry', newsletter_subscription: 'general_inquiry',
}

const CATEGORY_LABELS: Record<string, string> = {
  billing: 'Billing',
  refunds: 'Refunds',
  account_access: 'Account access',
  orders: 'Orders',
  shipping_delivery: 'Shipping & delivery',
  general_inquiry: 'General inquiry',
}

const PRESETS = [
  { id: 'conservative', label: 'Conservative', threshold: 0.9 },
  { id: 'balanced', label: 'Balanced', threshold: 0.85 },
  { id: 'aggressive', label: 'Aggressive', threshold: 0.7 },
] as const

const SAMPLES = [
  'I was charged twice for my order and want my money back',
  'How do I change the shipping address on order 48291?',
  'My payment failed when I tried to change my order',
]

// Mirror of the training-time clean(): placeholders to words, digits to
// "num", whitespace collapsed. Keeps demo input in-distribution.
function normalize(text: string): string {
  return text
    .replace(/\{\{(.*?)\}\}/g, (_m, inner: string) => inner.toLowerCase())
    .replace(/\d+/g, 'num')
    .replace(/\s+/g, ' ')
    .trim()
}

type IntentScore = { label: string; score: number }
type Result = {
  category: string
  confidence: number
  topIntents: IntentScore[]
  route: 'auto' | 'review'
  threshold: number
  presetLabel: string
}

let classifierPromise: Promise<unknown> | null = null

export default function SiftLiveDemo({ note }: { note?: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [progress, setProgress] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [text, setText] = useState('')
  const [presetId, setPresetId] = useState<string>('balanced')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const classifierRef = useRef<unknown>(null)

  async function loadModel() {
    setStatus('loading')
    setProgress(0)
    try {
      if (!classifierPromise) {
        classifierPromise = (async () => {
          const { pipeline } = await import('@huggingface/transformers')
          return pipeline('text-classification', MODEL_ID, {
            dtype: 'q8',
            progress_callback: (info: { status?: string; file?: string; progress?: number }) => {
              if (info.status === 'progress' && info.file?.includes('model')) {
                setProgress(Math.round(info.progress ?? 0))
              }
            },
          })
        })()
      }
      classifierRef.current = await classifierPromise
      setStatus('ready')
    } catch (error) {
      classifierPromise = null
      setErrorMessage(error instanceof Error ? error.message : String(error))
      setStatus('error')
    }
  }

  async function classify() {
    const classifier = classifierRef.current as
      | ((input: string, options: { top_k: number }) => Promise<IntentScore[] | IntentScore[][]>)
      | null
    if (!classifier || !text.trim()) return
    setAnalyzing(true)
    setResult(null)
    try {
      const output = await classifier(normalize(text), { top_k: 27 })
      const intents = (Array.isArray(output[0]) ? output[0] : output) as IntentScore[]

      const categoryScores: Record<string, number> = {}
      for (const { label, score } of intents) {
        const category = INTENT_TO_CATEGORY[label]
        if (!category) continue
        categoryScores[category] = (categoryScores[category] ?? 0) + score
      }
      const [topCategory, confidence] = Object.entries(categoryScores)
        .sort((a, b) => b[1] - a[1])[0]

      const preset = PRESETS.find(item => item.id === presetId) ?? PRESETS[1]
      setResult({
        category: topCategory,
        confidence,
        topIntents: intents.slice(0, 3),
        route: confidence >= preset.threshold ? 'auto' : 'review',
        threshold: preset.threshold,
        presetLabel: preset.label,
      })
    } finally {
      setAnalyzing(false)
    }
  }

  const per100 = result ? Math.min(99, Math.round(result.confidence * 100)) : 0

  return (
    <div style={{
      border: '1px solid var(--hairline)',
      borderRadius: '14px',
      padding: '28px',
      background: 'var(--bg)',
      transition: 'background 0.25s ease, border-color 0.25s ease',
    }}>
      {status === 'idle' && (
        <div>
          <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.75, marginBottom: '20px' }}>
            The classifier weighs 68 MB and runs entirely on this page. Load it
            once and your browser caches it for next time.
          </p>
          <button onClick={loadModel} style={primaryButton}>
            Load the model · 68 MB
          </button>
          {note && <p style={{ ...micro, marginTop: '14px' }}>{note}</p>}
        </div>
      )}

      {status === 'loading' && (
        <div>
          <p style={{ fontSize: '14px', color: 'var(--ink-2)', marginBottom: '14px' }}>
            Downloading the model{progress > 0 ? ` · ${progress}%` : '...'}
          </p>
          <div style={{ height: '4px', background: 'var(--surface)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${Math.max(progress, 2)}%`,
              background: 'var(--accent)',
              borderRadius: '999px',
              transition: 'width 0.3s ease',
            }} />
          </div>
        </div>
      )}

      {status === 'error' && (
        <div>
          <p style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: 600, marginBottom: '8px' }}>
            The model failed to load.
          </p>
          <p style={{ fontSize: '13px', color: 'var(--ink-3)', marginBottom: '16px', lineHeight: 1.6 }}>{errorMessage}</p>
          <button onClick={loadModel} style={primaryButton}>Retry</button>
        </div>
      )}

      {status === 'ready' && (
        <div>
          {/* Sample chips */}
          <p style={{ ...micro, marginBottom: '10px' }}>TRY A SAMPLE</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {SAMPLES.map(sample => (
              <button
                key={sample}
                onClick={() => { setText(sample); setResult(null) }}
                style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  border: '1px solid var(--hairline)',
                  background: text === sample ? 'var(--surface)' : 'transparent',
                  color: 'var(--ink-2)',
                  cursor: 'pointer',
                  lineHeight: 1.4,
                  textAlign: 'left',
                }}
              >
                {sample}
              </button>
            ))}
          </div>

          {/* Input */}
          <textarea
            value={text}
            onChange={event => { setText(event.target.value); setResult(null) }}
            rows={3}
            placeholder="Type any support ticket here, or pick a sample above"
            style={{
              width: '100%',
              padding: '14px 16px',
              fontSize: '14px',
              fontFamily: 'inherit',
              color: 'var(--ink)',
              background: 'var(--surface)',
              border: '1px solid var(--hairline)',
              borderRadius: '8px',
              resize: 'vertical',
              lineHeight: 1.6,
              marginBottom: '20px',
              boxSizing: 'border-box',
            }}
          />

          {/* Preset picker */}
          <p style={{ ...micro, marginBottom: '10px' }}>AUTOMATION PRESET</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {PRESETS.map(preset => {
              const selected = preset.id === presetId
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    setPresetId(preset.id)
                    setResult(current => current ? {
                      ...current,
                      route: current.confidence >= preset.threshold ? 'auto' : 'review',
                      threshold: preset.threshold,
                      presetLabel: preset.label,
                    } : current)
                  }}
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: selected ? '1px solid var(--ink)' : '1px solid var(--hairline)',
                    background: selected ? 'var(--ink)' : 'transparent',
                    color: selected ? 'var(--bg)' : 'var(--ink-2)',
                    cursor: 'pointer',
                  }}
                >
                  {preset.label} · {Math.round(preset.threshold * 100)}
                </button>
              )
            })}
          </div>

          <button onClick={classify} disabled={analyzing || !text.trim()} style={{
            ...primaryButton,
            opacity: analyzing || !text.trim() ? 0.5 : 1,
            cursor: analyzing ? 'wait' : 'pointer',
          }}>
            {analyzing ? 'Classifying...' : 'Classify ticket'}
          </button>

          {/* Result */}
          {result && (
            <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid var(--hairline)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
                  {CATEGORY_LABELS[result.category]}
                </p>
                <p style={{ fontSize: '14px', color: 'var(--ink-3)' }}>{per100}% confident</p>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: '18px' }}>
                On tickets it scores like this one, the model is right about {per100} of 100.
                The confidence is calibrated, so that sentence is measured, not decorative.
              </p>

              {/* Routing outcome */}
              <div style={{
                padding: '16px 20px',
                borderRadius: '8px',
                border: result.route === 'auto' ? '1px solid var(--ink)' : '1px solid var(--hairline)',
                background: 'var(--surface)',
                marginBottom: '20px',
                transition: 'background 0.25s ease',
              }}>
                <p style={{ ...micro, marginBottom: '6px', color: 'var(--ink)' }}>
                  {result.route === 'auto' ? 'AUTO-ROUTED' : 'SENT TO HUMAN REVIEW'}
                </p>
                <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.65 }}>
                  {result.route === 'auto'
                    ? `${per100} clears the ${result.presetLabel} threshold of ${Math.round(result.threshold * 100)}. Sift files the ticket automatically, and the action stays reversible.`
                    : `${per100} is below the ${result.presetLabel} threshold of ${Math.round(result.threshold * 100)}. The ticket goes to a person, exactly as designed.`}
                </p>
              </div>

              {/* Intent breakdown */}
              <p style={{ ...micro, marginBottom: '10px' }}>TOP INTENTS</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {result.topIntents.map(intent => (
                  <div key={intent.label} style={{ display: 'grid', gridTemplateColumns: '190px 1fr 44px', gap: '12px', alignItems: 'center' }}>
                    <p style={{ fontSize: '12px', color: 'var(--ink-2)', fontFamily: 'var(--font-mono, monospace)' }}>
                      {intent.label.replace(/_/g, ' ')}
                    </p>
                    <div style={{ height: '4px', background: 'var(--surface)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.max(intent.score * 100, 1)}%`, background: 'var(--ink)', borderRadius: '999px' }} />
                    </div>
                    <p style={{ fontSize: '11px', color: 'var(--ink-3)', textAlign: 'right' }}>
                      {(intent.score * 100).toFixed(1)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const primaryButton: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 22px',
  background: 'var(--accent)',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 600,
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  letterSpacing: '-0.01em',
}

const micro: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.09em',
  textTransform: 'uppercase',
  color: 'var(--ink-3)',
}
