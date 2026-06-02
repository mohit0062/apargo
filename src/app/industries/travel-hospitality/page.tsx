import { Metadata } from 'next'
import IndustryDetailPage from '@/components/shadcn-studio/blocks/industry-detail-page'
import { getSiteSection } from '@/utils/cms'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Travel & Hospitality Software Development | Apargo',
  description:
    'Apargo builds booking engines, channel managers, guest apps and WhatsApp concierge software for hotels, travel agencies and OTA startups.',
  alternates: {
    canonical: '/industries/travel-hospitality',
  },
  openGraph: {
    title: 'Travel & Hospitality Software Development | Apargo',
    description:
      'Apargo builds booking engines, channel managers, guest apps and WhatsApp concierge software for hotels, travel agencies and OTA startups.',
    url: '/industries/travel-hospitality',
    type: 'website',
  }
}

const TravelPage = async () => {
  const cmsData = await getSiteSection('industry_travel-hospitality')

  const industrySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Travel & Hospitality Software Development | Apargo",
    "description": "Apargo builds booking engines, channel managers, guest apps and WhatsApp concierge software.",
    "url": "https://www.apargoinnovations.com/industries/travel-hospitality",
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
          "name": "Travel & Hospitality",
          "item": "https://www.apargoinnovations.com/industries/travel-hospitality"
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

export default TravelPage
