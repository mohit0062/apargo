import { Metadata } from 'next'
import IndustryDetailPage from '@/components/shadcn-studio/blocks/industry-detail-page'
import { getSiteSection } from '@/utils/cms'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'EdTech & Education Software Development | Apargo',
  description:
    'Apargo builds LMS platforms, student apps, AI tutoring tools and parent communication systems for schools, coaching centres and EdTech startups.',
  alternates: {
    canonical: '/industries/education-edtech',
  },
  openGraph: {
    title: 'EdTech & Education Software Development | Apargo',
    description:
      'Apargo builds LMS platforms, student apps, AI tutoring tools and parent communication systems for schools, coaching centres and EdTech startups.',
    url: '/industries/education-edtech',
    type: 'website',
  }
}

const EducationPage = async () => {
  const cmsData = await getSiteSection('industry_education-edtech')

  const industrySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "EdTech & Education Software Development | Apargo",
    "description": "Apargo builds LMS platforms, student apps, AI tutoring tools and parent communication systems.",
    "url": "https://www.apargoinnovations.com/industries/education-edtech",
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
          "name": "EdTech & Education",
          "item": "https://www.apargoinnovations.com/industries/education-edtech"
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

export default EducationPage
