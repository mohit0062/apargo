import { Metadata } from 'next'
import { getSiteSection } from '@/utils/cms'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'
import FeaturesGreentick from '@/components/shadcn-studio/blocks/features-greentick'
import Features18 from '@/components/shadcn-studio/blocks/features-section-18/features-section-18'
import Features19 from '@/components/shadcn-studio/blocks/features-section-19/features-section-19'
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-24/hero-section-24'
import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'
import { JsonLd } from '@/components/json-ld'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteSection('page_products')
  return {
    title: content.seo?.title || 'Our Products — AI Greentick & More | Apargo',
    description: content.seo?.description || 'Apargo builds and runs its own SaaS products. Meet AI Greentick — our WhatsApp marketing suite — and the lab projects coming next.',
    keywords: content.seo?.keywords || 'products, software, saas, whatsapp marketing, ai greentick, apargo'
  }
}

export default async function ProductsPage() {
  const content = await getSiteSection('page_products')

  const productsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Apargo Innovations - Software Products",
    "description": content.hero?.description || "Apargo Innovations builds and runs its own SaaS products. Explore AI Greentick and our upcoming lab projects.",
    "url": "https://www.apargoinnovations.com/products",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Product",
          "name": "AI Greentick",
          "description": "The complete WhatsApp marketing suite for modern teams. Broadcasts, shared inbox, no-code AI chatbots, and full campaign analytics.",
          "url": "https://www.apargoinnovations.com/products/ai-greentick"
        }
      }
    ]
  }

  return (
    <div className='flex flex-col'>
      <JsonLd data={productsSchema} />
      <SiteNavbar />

      <HeroSection 
        badge={content.hero?.badge}
        heading={content.hero?.heading}
        description={content.hero?.description}
        primaryBtnText={content.hero?.primaryBtnText}
        primaryBtnHref={content.hero?.primaryBtnHref}
        secondaryBtnText={content.hero?.secondaryBtnText}
        secondaryBtnHref={content.hero?.secondaryBtnHref}
      />

      <Features18 
        badge={content.aiGreentickSection?.badge}
        heading={content.aiGreentickSection?.heading}
        descParagraph1={content.aiGreentickSection?.descParagraph1}
        descParagraph2={content.aiGreentickSection?.descParagraph2}
        primaryBtnText={content.aiGreentickSection?.primaryBtnText}
        primaryBtnHref={content.aiGreentickSection?.primaryBtnHref}
        secondaryBtnText={content.aiGreentickSection?.secondaryBtnText}
        secondaryBtnHref={content.aiGreentickSection?.secondaryBtnHref}
      />

      <FeaturesGreentick features={content.features} />

      <Features19 features={content.upcomingProducts} />

      <CTA 
        heading={content.cta?.heading}
        description={content.cta?.description}
        buttonText={content.cta?.buttonText}
        buttonHref={content.cta?.buttonHref}
        showServiceTags={false}
      />

      <Footer />
    </div>
  )
}
