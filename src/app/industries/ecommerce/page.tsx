import { Metadata } from 'next'
import IndustryDetailPage from '@/components/shadcn-studio/blocks/industry-detail-page'
import { getSiteSection } from '@/utils/cms'

export const metadata: Metadata = {
  title: 'E-commerce & D2C Software Development | Apargo',
  description:
    'Apargo builds custom e-commerce platforms, headless storefronts, D2C apps and WhatsApp commerce flows for brands scaling past Shopify defaults.',
}

const EcommercePage = async () => {
  const cmsData = await getSiteSection('industry_ecommerce')

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

export default EcommercePage
