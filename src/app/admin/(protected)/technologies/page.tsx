import { createClient } from '@/utils/supabase/server'
import { DEFAULT_FALLBACKS } from '@/utils/cms'
import TechnologiesCMSClient from './technologies-client'

export const dynamic = 'force-dynamic'

export default async function TechnologiesCMSPage() {
  const supabase = await createClient()

  // Fetch page_technologies content from the site_sections table
  const { data: section } = await supabase
    .from('site_sections')
    .select('content')
    .eq('key', 'page_technologies')
    .single()

  // Gracefully merge with default fallbacks
  const data = {
    ...DEFAULT_FALLBACKS.page_technologies,
    ...(section?.content || {})
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="border-b pb-5">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Technologies Page CMS</h2>
        <p className="text-muted-foreground text-sm">
          Manage the hero text, stack categories, tech stack lists, values/principles, and page-specific SEO metadata for the Technologies page.
        </p>
      </div>

      <TechnologiesCMSClient initialData={data} />
    </div>
  )
}
