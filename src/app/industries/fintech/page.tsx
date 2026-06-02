import { Metadata } from 'next'
import IndustryDetailPage from '@/components/shadcn-studio/blocks/industry-detail-page'
import { getSiteSection } from '@/utils/cms'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'FinTech & BFSI Software Development — KYC, Lending, Document AI | Apargo',
  description:
    'Apargo builds FinTech and BFSI software — KYC and onboarding, lending workflows, document AI and secure dashboards for banks, NBFCs and FinTech startups.',
  alternates: {
    canonical: '/industries/fintech',
  },
  openGraph: {
    title: 'FinTech & BFSI Software Development — KYC, Lending, Document AI | Apargo',
    description:
      'Apargo builds FinTech and BFSI software — KYC and onboarding, lending workflows, document AI and secure dashboards for banks, NBFCs and FinTech startups.',
    url: '/industries/fintech',
    type: 'website',
  }
}

const FinTechPage = async () => {
  const cmsData = await getSiteSection('industry_fintech')

  const industrySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "FinTech & BFSI Software Development | Apargo",
    "description": "Apargo builds FinTech and BFSI software — KYC and onboarding, lending workflows, document AI and secure dashboards.",
    "url": "https://www.apargoinnovations.com/industries/fintech",
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
          "name": "FinTech",
          "item": "https://www.apargoinnovations.com/industries/fintech"
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

export default FinTechPage
