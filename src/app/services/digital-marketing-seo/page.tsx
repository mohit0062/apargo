import {
  SearchCheckIcon,
  FileTextIcon,
  BotIcon,
  TrendingUpIcon,
  BarChartIcon
} from 'lucide-react'

import SiteNavbar from '@/components/site-navbar'
import { getSiteSection, getLucideIcon } from '@/utils/cms'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'

import HeroSection from '@/components/shadcn-studio/blocks/hero-section-03/hero-section-03'
import Features01 from '@/components/shadcn-studio/blocks/features-section-01-marketing/features-section-01-marketing'
import AppIntegration from '@/components/shadcn-studio/blocks/app-integration-03-marketing/app-integration-03-marketing'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11-marketing/cta-section-11-marketing'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-09/faq-component-09'

import type { AvatarItem } from '@/components/shadcn-studio/blocks/hero-section-03/hero-section-03'

export const metadata = {
  title: 'Digital Marketing & SEO Services for SaaS and Tech | Apargo',
  description:
    'Technical SEO, content engineering, paid acquisition and analytics setup by Apargo. We help products we build actually get found and convert.'
}

const avatars: AvatarItem[] = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
    name: 'Howard Lloyd',
    fallback: 'HL'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png',
    name: 'Jenny Wilson',
    fallback: 'JW'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    name: 'Hallie Richards',
    fallback: 'HR'
  }
]

const featuresListFeaturesSection01 = [
  {
    icon: SearchCheckIcon,
    title: 'Technical SEO',
    description:
      'Crawl audits, Core Web Vitals, structured data, internal linking, programmatic SEO setup. The boring side of SEO that actually moves rankings.',
    cardBorderColor: 'border-primary/40 hover:border-primary',
    avatarTextColor: 'text-primary',
    avatarBgColor: 'bg-primary/10',
    cardClassName: 'md:col-span-4'
  },
  {
    icon: FileTextIcon,
    title: 'Content engineering',
    description:
      "Topic clusters, briefs, drafts and publishing pipelines. We use AI in the draft phase and humans in the review phase — same workflow we use for AI Greentick's blog.",
    cardBorderColor: 'border-green-600/40 hover:border-green-600 dark:border-green-400/40 dark:hover:border-green-400',
    avatarTextColor: 'text-green-600 dark:text-green-400',
    avatarBgColor: 'bg-green-600/10 dark:bg-green-400/10',
    cardClassName: 'md:col-span-2'
  },
  {
    icon: BotIcon,
    title: 'AI search (GEO and AEO) optimisation',
    description:
      'Get cited by ChatGPT, Perplexity, Gemini and AI Overviews. Schema, citable formats, source authority — the new SEO.',
    cardBorderColor: 'border-amber-600/40 hover:border-amber-600 dark:border-amber-400/40 dark:hover:border-amber-400',
    avatarTextColor: 'text-amber-600 dark:text-amber-400',
    avatarBgColor: 'bg-amber-600/10 dark:bg-amber-400/10',
    cardClassName: 'md:col-span-2'
  },
  {
    icon: TrendingUpIcon,
    title: 'Paid acquisition setup',
    description:
      'Google Ads, Meta Ads, LinkedIn Ads — campaign architecture, conversion tracking, server-side events. We set it up clean so your in-house or agency team can run it.',
    cardBorderColor: 'border-blue-600/40 hover:border-blue-600 dark:border-blue-400/40 dark:hover:border-blue-400',
    avatarTextColor: 'text-blue-600 dark:text-blue-400',
    avatarBgColor: 'bg-blue-600/10 dark:bg-blue-400/10',
    cardClassName: 'md:col-span-2'
  },
  {
    icon: BarChartIcon,
    title: 'Analytics and attribution',
    description:
      'GA4, server-side tracking, product analytics (Mixpanel, Amplitude, PostHog), CRM and ad-platform integration. So your team can finally answer "where did that revenue come from".',
    cardBorderColor: 'border-purple-600/40 hover:border-purple-600 dark:border-purple-400/40 dark:hover:border-purple-400',
    avatarTextColor: 'text-purple-600 dark:text-purple-400',
    avatarBgColor: 'bg-purple-600/10 dark:bg-purple-400/10',
    cardClassName: 'md:col-span-2'
  }
]

const integrations = [
  {
    name: 'Founders who just launched',
    description: 'Founders who just launched and need traffic.',
    iconName: 'Rocket'
  },
  {
    name: 'SaaS teams stuck on a plateau',
    description: 'SaaS teams stuck on a flat traffic plateau.',
    iconName: 'BarChart'
  },
  {
    name: 'D2C brands leaking ad spend',
    description: 'D2C brands leaking ad spend through bad tracking.',
    iconName: 'DollarSign'
  },
  {
    name: 'Service businesses wanting local & AI rank',
    description: 'Service businesses wanting to rank locally and on AI search.',
    iconName: 'SearchCheck'
  }
]

const faqItems = [
  {
    question: 'What is AI Search Optimization (GEO/AEO) and why does it matter?',
    answer:
      'Generative Engine Optimization (GEO) focuses on structuring your content, schema, and authority signals so that LLMs like ChatGPT, Perplexity, and Google AI Overviews cite your brand as the primary answer to buyer queries.'
  },
  {
    question: 'How do you approach Technical SEO for modern JavaScript frameworks like Next.js?',
    answer:
      'We optimize Core Web Vitals, implement dynamic XML sitemaps, configure proper canonical tags, and leverage Next.js server-side rendering (SSR) to ensure Googlebot crawls and indexes your dynamic pages flawlessly.'
  },
  {
    question: 'What is included in your free marketing audit?',
    answer:
      'We examine your organic keyword rankings, backlink profile, paid ad account structure, and analytics tracking setup to deliver an actionable, prioritized punch list of immediate growth opportunities.'
  },
  {
    question: 'How do you ensure accurate conversion tracking for paid ads?',
    answer:
      'We implement robust server-side tagging (Google Tag Manager Server-Side), Facebook Conversions API (CAPI), and first-party cookie tracking to prevent data loss from ad blockers and iOS privacy restrictions.'
  },
  {
    question: 'How long does it take to see tangible results from SEO?',
    answer:
      'While technical fixes and indexing improvements show up within weeks, compounding organic traffic growth from content engineering typically takes 3 to 6 months.'
  }
]

import { ServicePageSchema } from '@/components/json-ld'

const DigitalMarketingSEOPage = async () => {
  const data = await getSiteSection('service_digital-marketing-seo')
  return (
    <div className='flex min-h-screen flex-col'>
      <ServicePageSchema
        data={data}
        serviceName="Digital Marketing & SEO Services"
        fallbackDescription="Technical SEO, content engineering, paid acquisition and analytics setup by Apargo."
      />
      <SiteNavbar />

      <main className='flex flex-1 flex-col'>
        <HeroSection
          avatars={avatars}
          badgeText={data.hero?.badgeText}
          subtitleText={data.hero?.subtitleText}
          title={data.hero?.title}
          description={data.hero?.description}
          primaryBtnText={data.hero?.primaryBtnText}
          primaryBtnHref={data.hero?.primaryBtnHref}
          secondaryBtnText={data.hero?.secondaryBtnText}
          secondaryBtnHref={data.hero?.secondaryBtnHref}
        />

        <Features01
          featuresList={(data.featuresList || []).map((feature: any, idx: number) => {
            const fallbackDesign = featuresListFeaturesSection01[idx] || featuresListFeaturesSection01[0] || {}
            return {
              ...fallbackDesign,
              icon: getLucideIcon(feature.iconName),
              title: feature.title,
              description: feature.description
            }
          })}
        />

        <AppIntegration integrations={integrations} />

        <CTA />

        <FAQ faqItems={data.faqItems || faqItems} />
      </main>

      <Footer />
    </div>
  )
}

export default DigitalMarketingSEOPage
