import { createClient } from '@/utils/supabase/server'
import { DEFAULT_FALLBACKS } from '@/utils/cms'
import CareersCMSClient from './careers-client'

export const dynamic = 'force-dynamic'

export default async function CareersCMSPage() {
  const supabase = await createClient()

  // Fetch page_careers content from the site_sections table
  const { data: section } = await supabase
    .from('site_sections')
    .select('content')
    .eq('key', 'page_careers')
    .single()

  // Gracefully merge with default fallbacks
  const data = {
    ...DEFAULT_FALLBACKS.page_careers,
    ...(section?.content || {})
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="border-b pb-5">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Careers Page CMS</h2>
        <p className="text-muted-foreground text-sm">
          Manage the hero copy, statistics, fit signals, benefits, hiring pipeline steps, filters, and page SEO for the Careers page.
        </p>
      </div>

      <CareersCMSClient initialData={data} />
    </div>
  )
}
