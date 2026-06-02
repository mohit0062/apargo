import { Metadata } from 'next'
import IndustryDetailPage from '@/components/shadcn-studio/blocks/industry-detail-page'
import { getSiteSection } from '@/utils/cms'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'E-commerce & D2C Software Development | Apargo',
  description:
    'Apargo builds custom e-commerce platforms, headless storefronts, D2C apps and WhatsApp commerce flows for brands scaling past Shopify defaults.',
  alternates: {
    canonical: '/industries/ecommerce',
  },
  openGraph: {
    title: 'E-commerce & D2C Software Development | Apargo',
    description:
      'Apargo builds custom e-commerce platforms, headless storefronts, D2C apps and WhatsApp commerce flows for brands scaling past Shopify defaults.',
    url: '/industries/ecommerce',
    type: 'website',
  }
}

const EcommercePage = async () => {
  const cmsData = await getSiteSection('industry_ecommerce')

  const industrySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "E-commerce & D2C Software Development | Apargo",
    "description": "Apargo builds custom e-commerce platforms, headless storefronts, D2C apps and WhatsApp commerce flows.",
    "url": "https://www.apargoinnovations.com/industries/ecommerce",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.apargoinnovations.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Industries",
          "item": "https://www.apargoinnovations.com/industries"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "E-commerce",
          "item": "https://www.apargoinnovations.com/industries/ecommerce"
        }
      ]
    }
  }

  return (
    <>
      <JsonLd data={industrySchema} />
      <IndustryDetailPage
        eyebrow={cmsData.eyebrow}
        h1={cmsData.h1}
        subHeadline={cmsData.subHeadline}
        sectionTitle={cmsData.sectionTitle}
        buildItems={cmsData.buildItems}
        extraSections={cmsData.extraSections}
        typicalProjects={cmsData.typicalProjects}
        ctaHeading={cmsData.ctaHeading}
        ctaButtonText={cmsData.ctaButtonText}
      />
    </>
  )
}

export default EcommercePage
