import { createClient } from '@/utils/supabase/server'
import { DEFAULT_FALLBACKS } from '@/utils/cms'
import ProductsCMSClient from './products-client'

export const dynamic = 'force-dynamic'

export default async function ProductsCMSPage() {
  const supabase = await createClient()

  // Fetch page_products content from the site_sections table
  const { data: section } = await supabase
    .from('site_sections')
    .select('content')
    .eq('key', 'page_products')
    .single()

  // Gracefully merge with default fallbacks
  const data = {
    ...DEFAULT_FALLBACKS.page_products,
    ...(section?.content || {})
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="border-b pb-5">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">All Products Page CMS</h2>
        <p className="text-muted-foreground text-sm">
          Manage the hero section, active AI Greentick promotion section, lists of features/benefits, upcoming lab products, and page-specific SEO.
        </p>
      </div>

      <ProductsCMSClient initialData={data} />
    </div>
  )
}
