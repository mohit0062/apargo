import { Metadata } from 'next'
import { caseStudies } from '@/lib/case-studies'
import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'
import { JsonLd } from '@/components/json-ld'
import CaseStudiesClient from './case-studies-client'

export const metadata: Metadata = {
  title: 'Case Studies & Shipped Projects | Apargo',
  description: 'Explore the portfolio of web applications, custom software platforms, and mobile apps engineered by Apargo. Real projects with measurable results.',
  alternates: {
    canonical: '/case-studies',
  },
  openGraph: {
    title: 'Case Studies & Shipped Projects | Apargo',
    description: 'Explore the portfolio of web applications, custom software platforms, and mobile apps engineered by Apargo. Real projects with measurable results.',
    url: '/case-studies',
    type: 'website',
  }
}

export default function CaseStudiesPage() {
  const caseStudiesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Apargo Innovations - Shipped Case Studies",
    "description": "Explore real projects shipped by the Apargo Innovations product engineering team including web apps, custom software platforms, and mobile apps with measurable outcomes.",
    "url": "https://www.apargoinnovations.com/case-studies",
    "itemListElement": caseStudies.map((cs, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "TechArticle",
        "headline": cs.title,
        "description": cs.summary,
        "url": `https://www.apargoinnovations.com/case-studies/${cs.slug}`
      }
    }))
  }

  return (
    <div className='flex min-h-screen flex-col'>
      <JsonLd data={caseStudiesSchema} />
      <SiteNavbar />
      <CaseStudiesClient />
      <Footer />
    </div>
  )
}
