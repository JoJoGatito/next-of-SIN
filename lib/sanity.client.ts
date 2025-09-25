import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

if (!projectId || !dataset) {
  // Helpful diagnostics during build (e.g., on Vercel)
  console.error('[sanity.client] Missing Sanity config', {
    projectIdPresent: Boolean(projectId),
    datasetPresent: Boolean(dataset),
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    vercel: process.env.VERCEL,
  })
  throw new Error(
    'Sanity client misconfigured: projectId and/or dataset are missing. Ensure NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET are defined for this environment (Preview/Production) and redeploy.'
  )
}

console.log('[sanity.client] Using Sanity config', { projectId, dataset, apiVersion })

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // set to `false` to bypass the edge cache if needed
})