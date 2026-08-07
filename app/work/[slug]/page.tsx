/**
 * app/work/[slug]/page.tsx
 *
 * 네 케이스가 이 라우트 하나를 공유한다. slug 로 데이터를 고른다.
 * 이 파일에 특정 케이스를 하드코딩하면 모든 slug 가 같은 케이스를 그린다.
 *
 * 주의: app/work/triage/page.tsx 같은 개별 폴더 라우트가 남아 있으면
 * Next.js 는 그쪽을 우선한다. 이 파일로 통합할 거면 개별 폴더는 지운다.
 */

import { notFound } from 'next/navigation';
import CaseV2Page from '@/components/CaseV2Page';
import { getCaseV2, caseV2Slugs } from '@/lib/cms';

export function generateStaticParams() {
  return caseV2Slugs.map((slug) => ({ slug }));
}

export default async function WorkCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getCaseV2(slug);
  if (!data) notFound();
  return <CaseV2Page data={data} />;
}