import { Metadata } from 'next'
import IndustryDetailPage from '@/components/shadcn-studio/blocks/industry-detail-page'
import { getSiteSection } from '@/utils/cms'

export const metadata: Metadata = {
  title: 'Real Estate Software Development — Portals, Broker CRMs | Apargo',
  description:
    'Apargo builds property portals, broker CRMs, virtual tour platforms and WhatsApp-first lead nurture for real estate developers, brokers and PropTech startups.',
}

const RealEstatePage = async () => {
  const cmsData = await getSiteSection('industry_real-estate')

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

export default RealEstatePage
