import { Metadata } from 'next'
import IndustryDetailPage from '@/components/shadcn-studio/blocks/industry-detail-page'
import { getSiteSection } from '@/utils/cms'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Real Estate Software Development — Portals, Broker CRMs | Apargo',
  description:
    'Apargo builds property portals, broker CRMs, virtual tour platforms and WhatsApp-first lead nurture for real estate developers, brokers and PropTech startups.',
  alternates: {
    canonical: '/industries/real-estate',
  },
  openGraph: {
    title: 'Real Estate Software Development — Portals, Broker CRMs | Apargo',
    description:
      'Apargo builds property portals, broker CRMs, virtual tour platforms and WhatsApp-first lead nurture for real estate developers, brokers and PropTech startups.',
    url: '/industries/real-estate',
    type: 'website',
  }
}

const RealEstatePage = async () => {
  const cmsData = await getSiteSection('industry_real-estate')

  const industrySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Real Estate Software Development | Apargo",
    "description": "Apargo builds property portals, broker CRMs, virtual tour platforms and WhatsApp-first lead nurture.",
    "url": "https://www.apargoinnovations.com/industries/real-estate",
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
          "name": "Real Estate",
          "item": "https://www.apargoinnovations.com/industries/real-estate"
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

export default RealEstatePage
