import { createClient } from '@/utils/supabase/server'
import { DEFAULT_FALLBACKS } from '@/utils/cms'
import AboutCMSClient from './about-client'

export const dynamic = 'force-dynamic'

export default async function AboutCMSPage() {
  const supabase = await createClient()

  // Fetch about_page content from the site_sections table
  const { data: section } = await supabase
    .from('site_sections')
    .select('content')
    .eq('key', 'about_page')
    .single()

  // Gracefully merge with default fallbacks
  const aboutData = {
    ...DEFAULT_FALLBACKS.about_page,
    ...(section?.content || {})
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="border-b pb-5">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">About Page CMS</h2>
        <p className="text-muted-foreground text-sm">
          Dynamically manage the Hero texts, Statistics, Company Story, and Team Members displayed on the About page.
        </p>
      </div>

      <AboutCMSClient initialData={aboutData} />
    </div>
  )
}
