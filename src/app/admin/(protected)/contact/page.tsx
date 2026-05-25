import { createClient } from '@/utils/supabase/server'
import { DEFAULT_FALLBACKS } from '@/utils/cms'
import ContactCMSClient from './contact-client'

export const dynamic = 'force-dynamic'

export default async function ContactCMSPage() {
  const supabase = await createClient()

  // Fetch page_contact content from the site_sections table
  const { data: section } = await supabase
    .from('site_sections')
    .select('content')
    .eq('key', 'page_contact')
    .single()

  // Gracefully merge with default fallbacks
  const data = {
    ...DEFAULT_FALLBACKS.page_contact,
    ...(section?.content || {})
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="border-b pb-5">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Contact Page CMS</h2>
        <p className="text-muted-foreground text-sm">
          Manage page headers, contact info cards (sales, support, office map, phone), sequence steps (what happens next), and SEO meta properties.
        </p>
      </div>

      <ContactCMSClient initialData={data} />
    </div>
  )
}
