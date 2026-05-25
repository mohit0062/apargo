import { Metadata } from 'next'
import IndustryDetailPage from '@/components/shadcn-studio/blocks/industry-detail-page'
import { getSiteSection } from '@/utils/cms'

export const metadata: Metadata = {
  title: 'Travel & Hospitality Software Development | Apargo',
  description:
    'Apargo builds booking engines, channel managers, guest apps and WhatsApp concierge software for hotels, travel agencies and OTA startups.',
}

const TravelPage = async () => {
  const cmsData = await getSiteSection('industry_travel-hospitality')

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

export default TravelPage
