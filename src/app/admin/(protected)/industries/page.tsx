import { createClient } from '@/utils/supabase/server'
import { DEFAULT_FALLBACKS } from '@/utils/cms'
import IndustriesClient from './industries-client'

export const dynamic = 'force-dynamic'

const INDUSTRY_SLUGS = [
  'ecommerce',
  'education-edtech',
  'fintech',
  'healthcare',
  'real-estate',
  'travel-hospitality'
]

export default async function IndustriesCMSPage() {
  const supabase = await createClient()

  // Fetch sections for all 6 industries
  const keys = INDUSTRY_SLUGS.map(slug => `industry_${slug}`)
  const { data: sections } = await supabase
    .from('site_sections')
    .select('key, content')
    .in('key', keys)

  // Build a dictionary of industries data
  const industriesData: Record<string, any> = {}
  INDUSTRY_SLUGS.forEach(slug => {
    const key = `industry_${slug}`
    const dbRecord = sections?.find(s => s.key === key)
    const fallback = DEFAULT_FALLBACKS[key] || {}
    industriesData[slug] = {
      ...fallback,
      ...(dbRecord?.content || {})
    }
  })

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="border-b pb-5">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Industries CMS</h2>
        <p className="text-muted-foreground text-sm">
          Select and customize content, "What we build" items, extra sections, typical projects, and CTAs for any of the 6 Industries pages.
        </p>
      </div>

      <IndustriesClient initialIndustriesData={industriesData} />
    </div>
  )
}
