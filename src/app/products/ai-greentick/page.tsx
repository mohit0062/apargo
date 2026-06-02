import { Metadata } from 'next'
import { getSiteSection } from '@/utils/cms'
import FeaturesGridGreentick from '@/components/shadcn-studio/blocks/features-grid-greentick'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'
import Features02 from '@/components/shadcn-studio/blocks/features-section-02/features-section-02'
import Features05 from '@/components/shadcn-studio/blocks/features-section-05/features-section-05'
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-11/hero-section-11'
import Pricing from '@/components/shadcn-studio/blocks/pricing-component-15/pricing-component-15'
import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'
import { JsonLd } from '@/components/json-ld'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteSection('page_ai_greentick')
  return {
    title: content.seo?.title || 'AI Greentick | Apargo',
    description: content.seo?.description || 'The complete WhatsApp marketing suite for modern teams.',
    keywords: content.seo?.keywords || 'whatsapp marketing, shared inbox, broadcasts, ai greentick, apargo'
  }
}

export default async function AiGreentickPage() {
  const content = await getSiteSection('page_ai_greentick')

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "AI Greentick",
    "description": content.hero?.description || "The complete WhatsApp marketing suite for modern teams. Built on the official WhatsApp Business API.",
    "brand": {
      "@type": "Brand",
      "name": "Apargo"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": 49,
      "highPrice": 499,
      "offerCount": 3,
      "offers": [
        {
          "@type": "Offer",
          "name": "Starter Plan",
          "price": 49,
          "priceCurrency": "USD",
          "url": "https://www.apargoinnovations.com/products/ai-greentick#pricing"
        },
        {
          "@type": "Offer",
          "name": "Growth Plan",
          "price": 149,
          "priceCurrency": "USD",
          "url": "https://www.apargoinnovations.com/products/ai-greentick#pricing"
        },
        {
          "@type": "Offer",
          "name": "Scale Plan",
          "price": 499,
          "priceCurrency": "USD",
          "url": "https://www.apargoinnovations.com/products/ai-greentick#pricing"
        }
      ]
    }
  }

  return (
    <div className='flex flex-col'>
      <JsonLd data={productSchema} />
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

      <Features02 />

      <FeaturesGridGreentick />

      <Features05 
        featuresList={content.audience || []} 
        heading="Who it's for"
      />

      <Pricing plans={content.plans || []} />

      <CTA
        heading={content.cta?.heading}
        description={content.cta?.description}
        buttonText={content.cta?.buttonText}
        buttonHref={content.cta?.buttonHref}
        secondaryButtonText={content.cta?.secondaryButtonText}
        secondaryButtonHref={content.cta?.secondaryButtonHref}
        showServiceTags={false}
      />

      <Footer />
    </div>
  )
}
