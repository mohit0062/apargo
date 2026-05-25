import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { openRoles } from '@/lib/careers'
import { caseStudies } from '@/lib/case-studies'

export const revalidate = 3600 // Revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.apargoinnovations.com'

  // 1. Static Routes
  const staticRoutes = [
    '',
    '/about',
    '/blog',
    '/careers',
    '/case-studies',
    '/contact',
    '/cookie-policy',
    '/faq',
    '/privacy-policy',
    '/products',
    '/services',
    '/technologies',
    '/terms',
    '/products/ai-greentick',
    '/services/ai-machine-learning',
    '/services/cloud-devops',
    '/services/custom-software',
    '/services/digital-marketing-seo',
    '/services/it-consulting',
    '/services/mobile-app-development',
    '/services/saas-product-development',
    '/services/ui-ux-design',
    '/services/web-development',
    '/industries/ecommerce',
    '/industries/education-edtech',
    '/industries/fintech',
    '/industries/healthcare',
    '/industries/real-estate',
    '/industries/travel-hospitality',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // 2. Dynamic Career Routes
  const careerRoutes = openRoles.map((role) => ({
    url: `${baseUrl}/careers/${role.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // 3. Dynamic Case Study Routes
  const caseStudyRoutes = caseStudies.map((cs) => ({
    url: `${baseUrl}/case-studies/${cs.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // 4. Dynamic Blog Routes from Supabase
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey)
      const { data: posts, error } = await supabase
        .from('blogs')
        .select('slug, created_at')
        .eq('status', 'published')

      if (error) {
        throw new Error(`Supabase query failed: ${error.message}`);
      }

      if (posts) {
        blogRoutes = posts.map((post) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.created_at || Date.now()),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }))
      }
    }
  } catch (error: any) {
    console.error('Error generating blog sitemap routes:', error)
    // Throw error so Vercel build fails if query is invalid, ensuring correctness
    throw error;
  }

  return [...staticRoutes, ...careerRoutes, ...caseStudyRoutes, ...blogRoutes]
}
