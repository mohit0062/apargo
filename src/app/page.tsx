import {
  ActivityIcon,
  CheckCircle2,
  UsersIcon,
  Zap,
} from 'lucide-react'

import { industries } from '@/data/industries'
import { BentoGrid } from '@/components/BentoGrid'
import Blog from '@/components/shadcn-studio/blocks/blog-component-06/blog-component-06'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'
import Features01 from '@/components/shadcn-studio/blocks/features-section-01/features-section-01'
import Features18 from '@/components/shadcn-studio/blocks/features-section-18/features-section-18'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-16/hero-section-16'
import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-24/testimonials-component-24'
import SiteNavbar from '@/components/site-navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getSiteSection } from '@/utils/cms'
import { JsonLd } from '@/components/json-ld'

import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSiteSection<any>('seo')
  const title = seo.siteTitle || "Apargo"
  const description = seo.defaultDescription || "Apargo Innovations"
  
  return {
    title: `Product Engineering & AI Services | ${title}`,
    description,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: `Product Engineering & AI Services | ${title}`,
      description,
      url: '/',
      siteName: title,
      type: 'website',
    }
  }
}

const featuresList = [
  {
    icon: CheckCircle2,
    title: 'We use what we build',
    description:
      'AI Greentick runs on the same stack and workflows we use for client projects. If it works at scale for real users, it can work for yours too.',
  },
  {
    icon: UsersIcon,
    title: 'Senior-heavy team',
    description:
      "Most engineers on your project are mid-to-senior level. You're not paying senior rates to train juniors on your product.",
  },
  {
    icon: ActivityIcon,
    title: 'Fixed quotes, no surprises',
    description:
      'We provide a fixed price and timeline after scoping. Any out-of-scope work is discussed and approved separately before development begins.',
  },
  {
    icon: Zap,
    title: 'Full IP handover',
    description:
      'Your code, assets, and infrastructure belong to you from day one. Repositories can be transferred directly to your GitHub or GitLab.',
  },
]

const blogCards = [
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-25.png',
    alt: 'Engineering notes',
    tags: ['Engineering', 'Product'],
    title: 'How we decide what to build first',
    description: 'A deep dive into our prioritization framework, balancing immediate client requests with long-term architectural scalability.',
    date: 'May 15, 2026',
    author: 'Mohit Sharma',
    blogLink: '/blog/how-we-decide-what-to-build-first',
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-24.png',
    alt: 'AI experiments',
    tags: ['AI', 'Automation'],
    title: 'Where AI actually saves teams time',
    description: 'Beyond the hype: real-world case studies of implementing LLM workflows and automated pipelines that cut development cycles by 40%.',
    date: 'May 15, 2026',
    author: 'Phillip Palmer',
    blogLink: '/blog/where-ai-saves-teams-time',
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-23.png',
    alt: 'SaaS product playbooks',
    tags: ['SaaS', 'Playbook'],
    title: 'Lessons from running our own SaaS',
    description: 'The operational, technical, and marketing takeaways from scaling AI Greentick to handle millions of WhatsApp messages daily.',
    date: 'May 15, 2026',
    author: 'Michael Brown',
    blogLink: '/blog/lessons-from-running-our-own-saas',
  },
]

const HeroSection16Block = ({ navbarData, heroData }: { navbarData: any; heroData: any }) => {
  return (
    <div>
      <SiteNavbar initialNavbarData={navbarData} />
      <main className='flex flex-col overflow-hidden'>
        <HeroSection {...heroData} />
      </main>
    </div>
  )
}

const FeaturesSection12Block = () => {
  return <BentoGrid />
}

const FeaturesSection18Block = () => {
  return <Features18 />
}

const FeaturesSection01Block = ({ config }: { config: any }) => {
  return (
    <Features01
      featuresList={config?.features || featuresList}
      title={config?.title}
      description={config?.description}
    />
  )
}

const CtaSection11Block = ({ config }: { config: any }) => {
  return <CTA {...config} />
}

const TestimonialsComponent02Block = ({ testimonials }: { testimonials: any }) => {
  return <TestimonialsComponent testimonials={testimonials} />
}

const BlogComponent06Block = () => {
  return <Blog blogCards={blogCards} />
}

const IndustriesSectionBlock = ({ config }: { config: any }) => {
  const eyebrow = config?.eyebrow || 'Industries we serve'
  const title = config?.title || 'Built For The Industries That Move Fast'
  const description = config?.description || 'E-commerce, healthcare, education, real estate, FinTech and travel - different domains, same need for software that just works.'

  return (
    <section className='bg-[#FAFAFA] py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto mb-12 max-w-3xl space-y-4 text-center sm:mb-16'>
          <p className='text-primary text-sm font-medium uppercase'>{eyebrow}</p>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>{title}</h2>
          <p className='text-muted-foreground text-xl leading-relaxed'>
            {description}
          </p>
        </div>

        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          {industries.map(industry => (
            <a key={industry.name} href={industry.href} className='group block h-full'>
              <Card className={`h-full border-2 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${industry.borderColor} ${industry.hoverBg}`}>
                <CardHeader>
                  <div className={`mb-4 flex size-10 items-center justify-center rounded-md ${industry.bgColor}`}>
                    <industry.icon className={`size-5 ${industry.color}`} />
                  </div>
                  <CardTitle>{industry.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className='text-base leading-7'>{industry.description}</CardDescription>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

const FooterComponent05Block = ({ footerData }: { footerData: any }) => {
  return <Footer initialFooterData={footerData} />
}

export default async function Home() {
  const navbarData = await getSiteSection('navbar')
  const footerData = await getSiteSection('footer')
  const heroData = await getSiteSection('homepage_hero')
  const featuresData = await getSiteSection('homepage_core_features')
  const industriesData = await getSiteSection('homepage_industries')
  const testimonialsData = await getSiteSection('testimonials')
  const ctaData = await getSiteSection('cta')

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Apargo Innovations",
    "image": "https://www.apargoinnovations.com/group-2.svg",
    "@id": "https://www.apargoinnovations.com/#organization",
    "url": "https://www.apargoinnovations.com",
    "telephone": "",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "postalCode": "302001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.9124,
      "longitude": 75.7873
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "10:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://www.linkedin.com/company/apargoinnovations",
      "https://twitter.com/apargo"
    ],
    "knowsAbout": [
      "Product Engineering",
      "Web Development Services",
      "Mobile App Development Services",
      "Custom Software Development Services",
      "AI & Machine Learning Services",
      "SaaS Product Development Services",
      "Cloud & DevOps Services"
    ]
  }

  return (
    <div className='relative flex min-h-screen w-full max-w-[100vw] flex-col font-sans overflow-x-clip'>
      <JsonLd data={professionalServiceSchema} />
      <HeroSection16Block navbarData={navbarData} heroData={heroData} />
      <FeaturesSection12Block />
      <FeaturesSection18Block />
      <FeaturesSection01Block config={featuresData} />
      <TestimonialsComponent02Block testimonials={testimonialsData} />
      <IndustriesSectionBlock config={industriesData} />
      <BlogComponent06Block />
      <CtaSection11Block config={ctaData} />
      <FooterComponent05Block footerData={footerData} />
    </div>
  )
}
