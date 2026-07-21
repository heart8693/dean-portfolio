/** @type {import('next').NextConfig} */
const nextConfig = {
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@huggingface/transformers/**',
        'node_modules/onnxruntime-node/**',
      ],
    },
  }
  
  module.exports = nextConfig