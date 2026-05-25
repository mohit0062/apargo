import { Metadata } from 'next'
import IndustryDetailPage from '@/components/shadcn-studio/blocks/industry-detail-page'
import { getSiteSection } from '@/utils/cms'

export const metadata: Metadata = {
  title: 'FinTech & BFSI Software Development — KYC, Lending, Document AI | Apargo',
  description:
    'Apargo builds FinTech and BFSI software — KYC and onboarding, lending workflows, document AI and secure dashboards for banks, NBFCs and FinTech startups.',
}

const FinTechPage = async () => {
  const cmsData = await getSiteSection('industry_fintech')

  return (
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
  )
}

export default FinTechPage
