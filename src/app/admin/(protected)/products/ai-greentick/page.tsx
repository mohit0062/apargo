import { createClient } from '@/utils/supabase/server'
import { DEFAULT_FALLBACKS } from '@/utils/cms'
import AIGreentickCMSClient from './ai-greentick-client'

export const dynamic = 'force-dynamic'

export default async function AIGreentickCMSPage() {
  const supabase = await createClient()

  // Fetch page_ai_greentick content from the site_sections table
  const { data: section } = await supabase
    .from('site_sections')
    .select('content')
    .eq('key', 'page_ai_greentick')
    .single()

  // Gracefully merge with default fallbacks
  const data = {
    ...DEFAULT_FALLBACKS.page_ai_greentick,
    ...(section?.content || {})
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="border-b pb-5">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">AI Greentick Page CMS</h2>
        <p className="text-muted-foreground text-sm">
          Manage the hero section, target audience list, pricing plans, call-to-action details, and page-specific SEO.
        </p>
      </div>

      <AIGreentickCMSClient initialData={data} />
    </div>
  )
}
