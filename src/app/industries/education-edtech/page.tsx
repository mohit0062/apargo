import { Metadata } from 'next'
import IndustryDetailPage from '@/components/shadcn-studio/blocks/industry-detail-page'
import { getSiteSection } from '@/utils/cms'

export const metadata: Metadata = {
  title: 'EdTech & Education Software Development | Apargo',
  description:
    'Apargo builds LMS platforms, student apps, AI tutoring tools and parent communication systems for schools, coaching centres and EdTech startups.',
}

const EducationPage = async () => {
  const cmsData = await getSiteSection('industry_education-edtech')

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

export default EducationPage
