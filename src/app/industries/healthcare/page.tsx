import { Metadata } from 'next'
import IndustryDetailPage from '@/components/shadcn-studio/blocks/industry-detail-page'
import { getSiteSection } from '@/utils/cms'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Healthcare Software Development — HIPAA-Aware, Telehealth, EMR | Apargo',
  description:
    'Apargo builds telemedicine apps, patient management platforms, hospital dashboards and healthcare AI tools — compliance-aware from day one.',
  alternates: {
    canonical: '/industries/healthcare',
  },
  openGraph: {
    title: 'Healthcare Software Development — HIPAA-Aware, Telehealth, EMR | Apargo',
    description:
      'Apargo builds telemedicine apps, patient management platforms, hospital dashboards and healthcare AI tools — compliance-aware from day one.',
    url: '/industries/healthcare',
    type: 'website',
  }
}

const HealthcarePage = async () => {
  const cmsData = await getSiteSection('industry_healthcare')

  const industrySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Healthcare Software Development | Apargo",
    "description": "Apargo builds telemedicine apps, patient management platforms, hospital dashboards and healthcare AI tools.",
    "url": "https://www.apargoinnovations.com/industries/healthcare",
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
          "name": "Healthcare",
          "item": "https://www.apargoinnovations.com/industries/healthcare"
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

export default HealthcarePage
