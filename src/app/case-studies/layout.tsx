import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Studies & Portfolio | Apargo',
  description:
    'Real projects shipped by Apargo — web platforms, mobile apps, AI tools and SaaS products. With measurable outcomes.',
  alternates: {
    canonical: '/case-studies',
  },
  openGraph: {
    title: 'Case Studies & Portfolio | Apargo',
    description:
      'Real projects shipped by Apargo — web platforms, mobile apps, AI tools and SaaS products. With measurable outcomes.',
    url: '/case-studies',
    type: 'website',
  }
}

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return children
}
