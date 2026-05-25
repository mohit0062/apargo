import { createClient } from '@/utils/supabase/server'
import { DEFAULT_FALLBACKS } from '@/utils/cms'
import HomepageClient from './homepage-client'

export const dynamic = 'force-dynamic'

export default async function HomepageCMSPage() {
  const supabase = await createClient()

  // Fetch sections for the homepage
  const { data: sections } = await supabase
    .from('site_sections')
    .select('key, content')
    .in('key', ['homepage_hero', 'homepage_core_features', 'homepage_industries'])

  const heroData = sections?.find(s => s.key === 'homepage_hero')?.content || DEFAULT_FALLBACKS.homepage_hero
  const featuresData = sections?.find(s => s.key === 'homepage_core_features')?.content || DEFAULT_FALLBACKS.homepage_core_features
  const industriesData = sections?.find(s => s.key === 'homepage_industries')?.content || DEFAULT_FALLBACKS.homepage_industries

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="border-b pb-5">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Home Page CMS</h2>
        <p className="text-muted-foreground text-sm">
          Customize content and messaging displayed on the website's landing page.
        </p>
      </div>

      <HomepageClient 
        initialHero={heroData}
        initialFeatures={featuresData}
        initialIndustries={industriesData}
      />
    </div>
  )
}
