import { createClient } from '@/utils/supabase/server'
import { DEFAULT_FALLBACKS } from '@/utils/cms'
import ServicesClient from './services-client'

export const dynamic = 'force-dynamic'

const SERVICE_SLUGS = [
  'web-development',
  'mobile-app-development',
  'custom-software',
  'ai-machine-learning',
  'saas-product-development',
  'cloud-devops',
  'ui-ux-design',
  'digital-marketing-seo',
  'it-consulting'
]

export default async function ServicesCMSPage() {
  const supabase = await createClient()

  // Fetch sections for all 9 services
  const keys = SERVICE_SLUGS.map(slug => `service_${slug}`)
  const { data: sections } = await supabase
    .from('site_sections')
    .select('key, content')
    .in('key', keys)

  // Build a dictionary of services data
  const servicesData: Record<string, any> = {}
  SERVICE_SLUGS.forEach(slug => {
    const key = `service_${slug}`
    const dbRecord = sections?.find(s => s.key === key)
    const fallback = DEFAULT_FALLBACKS[key] || {}
    servicesData[slug] = {
      ...fallback,
      ...(dbRecord?.content || {})
    }
  })

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="border-b pb-5">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Services CMS</h2>
        <p className="text-muted-foreground text-sm">
          Select and customize content, features, and FAQs for any of the 9 Services pages.
        </p>
      </div>

      <ServicesClient initialServicesData={servicesData} />
    </div>
  )
}
