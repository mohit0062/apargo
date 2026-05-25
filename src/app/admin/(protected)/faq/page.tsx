import { createClient } from '@/utils/supabase/server'
import { DEFAULT_FALLBACKS } from '@/utils/cms'
import FAQCMSClient from './faq-client'

export const dynamic = 'force-dynamic'

export default async function FAQCMSPage() {
  const supabase = await createClient()

  // Fetch page_faq content from the site_sections table
  const { data: section } = await supabase
    .from('site_sections')
    .select('content')
    .eq('key', 'page_faq')
    .single()

  // Gracefully merge with default fallbacks
  const data = {
    ...DEFAULT_FALLBACKS.page_faq,
    ...(section?.content || {})
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="border-b pb-5">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ Page CMS</h2>
        <p className="text-muted-foreground text-sm">
          Manage the hero section, FAQ categories, FAQ questions/answers list, and page-specific SEO metadata for the FAQ page.
        </p>
      </div>

      <FAQCMSClient initialData={data} />
    </div>
  )
}
