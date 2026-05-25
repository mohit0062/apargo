import { createClient } from '@/utils/supabase/server'
import { DEFAULT_FALLBACKS } from '@/utils/cms'
import CommonSectionsClient from './common-sections-client'

export const dynamic = 'force-dynamic'

export default async function CommonSectionsPage() {
  const supabase = await createClient()

  // Fetch sections navbar, footer, cta, seo
  const { data: sections } = await supabase
    .from('site_sections')
    .select('key, content')
    .in('key', ['navbar', 'footer', 'cta', 'seo'])

  const mergeWithDefaults = (dbContent: any, fallbackKey: string) => {
    const fallback = DEFAULT_FALLBACKS[fallbackKey] || {}
    if (!dbContent) return fallback
    const merged = { ...fallback, ...dbContent }
    // Restore default arrays if DB saved empty arrays
    for (const key of Object.keys(fallback)) {
      if (Array.isArray(dbContent[key]) && dbContent[key].length === 0 && Array.isArray(fallback[key]) && fallback[key].length > 0) {
        merged[key] = fallback[key]
      }
    }
    return merged
  }

  const navbarData = mergeWithDefaults(sections?.find(s => s.key === 'navbar')?.content, 'navbar')
  const footerData = mergeWithDefaults(sections?.find(s => s.key === 'footer')?.content, 'footer')
  const ctaData = mergeWithDefaults(sections?.find(s => s.key === 'cta')?.content, 'cta')
  const seoData = mergeWithDefaults(sections?.find(s => s.key === 'seo')?.content, 'seo')

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="border-b pb-5">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Common Sections CMS</h2>
        <p className="text-muted-foreground text-sm">
          Manage parts of your website that appear globally across all pages (Navbar, Footer, CTA, and SEO).
        </p>
      </div>

      <CommonSectionsClient 
        initialNavbar={navbarData}
        initialFooter={footerData}
        initialCta={ctaData}
        initialSeo={seoData}
      />
    </div>
  )
}
