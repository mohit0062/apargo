import { Fragment } from 'react'
import {
  AtomIcon,
  GlobeIcon,
  BoxesIcon,
  RocketIcon,
  PaletteIcon,
  FileCode2Icon,
  ServerIcon,
  LayersIcon,
  FastForwardIcon,
  FileCodeIcon,
  ZapIcon,
  BuildingIcon,
  WorkflowIcon,
  DatabaseIcon,
  TableIcon,
  LeafIcon,
  DatabaseBackupIcon,
  SearchIcon,
  SearchCheckIcon,
  FileSearchIcon,
  TriangleIcon,
  CloudIcon,
  CloudLightningIcon,
  MilestoneIcon,
  AnchorIcon,
  TestTubeIcon,
  TestTube2Icon,
  PlayIcon,
  CheckCircleIcon,
  Building2Icon,
  CreditCardIcon,
  LayoutDashboardIcon,
  ShoppingCartIcon
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import CoMediaLogo from '@/assets/svg/comedia-logo'
import CompareUILib from '@/components/shadcn-studio/blocks/compare-01/compare-01'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-09/faq-component-09'
import Features from '@/components/shadcn-studio/blocks/features-section-01-zhy9d2/features-section-01-zhy9d2'
import GrowLogo from '@/assets/svg/grow-logo'
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-03/hero-section-03'
import HiveStudioLogo from '@/assets/svg/hive-studio-logo'
import type { AvatarItem } from '@/components/shadcn-studio/blocks/hero-section-03/hero-section-03'
import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'
import { getSiteSection, getLucideIcon } from '@/utils/cms'

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

const featuresList = [
  {
    icon: GlobeIcon,
    title: 'Marketing and landing sites',
    description:
      'Static or Jamstack sites that hit 95+ Lighthouse scores. Editable through a headless CMS your marketing team can use without us.',
    cardBorderColor: 'border-primary/40 hover:border-primary',
    avatarTextColor: 'text-primary',
    avatarBgColor: 'bg-primary/10',
    cardClassName: 'lg:col-span-3'
  },
  {
    icon: LayoutDashboardIcon,
    title: 'Web applications and dashboards',
    description:
      'Authenticated apps with complex business logic. Role-based access, audit logs, multi-tenant data - built right the first time.',
    cardBorderColor: 'border-sky-600/40 hover:border-sky-600 dark:border-sky-400/40 dark:hover:border-sky-400',
    avatarTextColor: 'text-sky-600 dark:text-sky-400',
    avatarBgColor: 'bg-sky-600/10 dark:bg-sky-400/10',
    cardClassName: 'lg:col-span-3'
  },
  {
    icon: CreditCardIcon,
    title: 'SaaS platforms',
    description:
      "Subscription billing, usage metering, team workspaces. We've done this for ourselves with AI Greentick and for clients across industries.",
    cardBorderColor: 'border-amber-600/40 hover:border-amber-600 dark:border-amber-400/40 dark:hover:border-amber-400',
    avatarTextColor: 'text-amber-600 dark:text-amber-400',
    avatarBgColor: 'bg-amber-600/10 dark:bg-amber-400/10',
    cardClassName: 'lg:col-span-2'
  },
  {
    icon: Building2Icon,
    title: 'Internal tools and admin panels',
    description:
      "Custom CRMs, ops dashboards and back-office tools. Faster than Retool when you outgrow no-code, cheaper than Salesforce when you don't need its weight.",
    cardBorderColor: 'border-destructive/40 hover:border-destructive',
    avatarTextColor: 'text-destructive',
    avatarBgColor: 'bg-destructive/10',
    cardClassName: 'lg:col-span-2'
  },
  {
    icon: ShoppingCartIcon,
    title: 'E-commerce platforms',
    description:
      'Headless storefronts on Shopify, Medusa or custom. Designed to convert, structured for SEO, integrated with your CRM and WhatsApp tooling.',
    cardBorderColor: 'border-green-600/40 hover:border-green-600 dark:border-green-400/40 dark:hover:border-green-400',
    avatarTextColor: 'text-green-600 dark:text-green-400',
    avatarBgColor: 'bg-green-600/10 dark:bg-green-400/10',
    cardClassName: 'lg:col-span-2'
  }
]

const rowdata = [
  {
    name: 'Feature',
    isKey: true,
    columnData: [
      'Best For',
      'Strategy Approach',
      'Work Quality',
      'Pricing',
      'Iteration Speed',
      'Support',
      'Asset Management',
      'SEO & Content',
      'Communication',
      'Team Collaboration'
    ]
  },
  {
    name: 'CoMedia',
    icon: <CoMediaLogo />,
    columnData: [
      'Small businesses needing basic help',
      'Basic ready-made plans',
      <Badge key='comedia-badge' className='bg-destructive/10 text-destructive rounded-sm px-3 py-1'>
        Average
      </Badge>,
      <Fragment key='comedia-price'>
        <span className='font-medium'>$499</span> Medium pricing
      </Fragment>,
      'Slow updates',
      '😕',
      'Files scattered in different places',
      'Basic SEO support',
      '❌',
      'Very little teamwork'
    ]
  },
  {
    name: 'Grow',
    icon: <GrowLogo className='size-6' />,
    isHighlighted: true,
    columnData: [
      'All types and sizes of businesses',
      'Custom plan made for your business',
      <Badge
        key='grow-badge'
        className='rounded-sm bg-green-600/10 px-3 py-1 text-green-600 dark:bg-green-400/10 dark:text-green-400'
      >
        Excellent
      </Badge>,
      <Fragment key='grow-price'>
        <span className='font-semibold'>$399</span> Fair pricing for the work you get
      </Fragment>,
      'Fast and regular updates',
      '🤩',
      'All files kept in one neat system',
      'Easy SEO setup with helpful content',
      '✅',
      'Works closely with your team'
    ]
  },
  {
    name: 'Hive-Studio',
    icon: <HiveStudioLogo />,
    columnData: [
      'Growing small–medium businesses',
      'General plans for most businesses',
      <Badge
        key='hive-badge'
        className='rounded-sm bg-amber-600/10 px-3 py-1 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400'
      >
        Good
      </Badge>,
      <Fragment key='hive-price'>
        <span className='font-medium'>$599</span> High pricing
      </Fragment>,
      'Decent speed',
      '🙂',
      'Files somewhat organized',
      'Medium-level SEO',
      '✅',
      'Some teamwork'
    ]
  }
]

const techIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'React': AtomIcon,
  'Next.js': GlobeIcon,
  'Vue': BoxesIcon,
  'Astro': RocketIcon,
  'Tailwind': PaletteIcon,
  'TypeScript': FileCode2Icon,
  'Node.js': ServerIcon,
  'NestJS': LayersIcon,
  'Express': FastForwardIcon,
  'Python': FileCodeIcon,
  'FastAPI': ZapIcon,
  'Django': BuildingIcon,
  'Go': WorkflowIcon,
  'PostgreSQL': DatabaseIcon,
  'MySQL': TableIcon,
  'MongoDB': LeafIcon,
  'Redis': DatabaseBackupIcon,
  'Elasticsearch': SearchIcon,
  'Meilisearch': SearchCheckIcon,
  'Typesense': FileSearchIcon,
  'Vercel': TriangleIcon,
  'AWS': CloudIcon,
  'Cloudflare': CloudLightningIcon,
  'Railway': MilestoneIcon,
  'Self-hosted Kubernetes': AnchorIcon,
  'Vitest': TestTubeIcon,
  'Jest': TestTube2Icon,
  'Playwright': PlayIcon,
  'Cypress': CheckCircleIcon
}

const webStackData = [
  {
    name: 'Area',
    isKey: true,
    columnData: ['Frontend', 'Backend', 'Database', 'Search', 'Hosting', 'Testing']
  },
  {
    name: 'Web Stack',
    icon: <LayersIcon className='size-5 text-primary' />,
    isHighlighted: true,
    columnData: [
      <div key='frontend-stack' className='flex flex-wrap gap-2'>
        {['React', 'Next.js', 'Vue', 'Astro', 'Tailwind', 'TypeScript'].map(item => {
          const Icon = techIcons[item] || GlobeIcon
          return (
            <Badge key={item} className='rounded-sm bg-primary/10 px-3 py-1 text-primary flex items-center gap-1.5 w-fit'>
              <Icon className='size-3.5 shrink-0' />
              {item}
            </Badge>
          )
        })}
      </div>,
      <div key='backend-stack' className='flex flex-wrap gap-2'>
        {['Node.js', 'NestJS', 'Express', 'Python', 'FastAPI', 'Django', 'Go'].map(item => {
          const Icon = techIcons[item] || GlobeIcon
          return (
            <Badge key={item} className='rounded-sm bg-primary/10 px-3 py-1 text-primary flex items-center gap-1.5 w-fit'>
              <Icon className='size-3.5 shrink-0' />
              {item}
            </Badge>
          )
        })}
      </div>,
      <div key='database-stack' className='flex flex-wrap gap-2'>
        {['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'].map(item => {
          const Icon = techIcons[item] || GlobeIcon
          return (
            <Badge key={item} className='rounded-sm bg-primary/10 px-3 py-1 text-primary flex items-center gap-1.5 w-fit'>
              <Icon className='size-3.5 shrink-0' />
              {item}
            </Badge>
          )
        })}
      </div>,
      <div key='search-stack' className='flex flex-wrap gap-2'>
        {['Elasticsearch', 'Meilisearch', 'Typesense'].map(item => {
          const Icon = techIcons[item] || GlobeIcon
          return (
            <Badge key={item} className='rounded-sm bg-primary/10 px-3 py-1 text-primary flex items-center gap-1.5 w-fit'>
              <Icon className='size-3.5 shrink-0' />
              {item}
            </Badge>
          )
        })}
      </div>,
      <div key='hosting-stack' className='flex flex-wrap gap-2'>
        {['Vercel', 'AWS', 'Cloudflare', 'Railway', 'Self-hosted Kubernetes'].map(item => {
          const Icon = techIcons[item] || GlobeIcon
          return (
            <Badge key={item} className='rounded-sm bg-primary/10 px-3 py-1 text-primary flex items-center gap-1.5 w-fit'>
              <Icon className='size-3.5 shrink-0' />
              {item}
            </Badge>
          )
        })}
      </div>,
      <div key='testing-stack' className='flex flex-wrap gap-2'>
        {['Vitest', 'Jest', 'Playwright', 'Cypress'].map(item => {
          const Icon = techIcons[item] || GlobeIcon
          return (
            <Badge key={item} className='rounded-sm bg-primary/10 px-3 py-1 text-primary flex items-center gap-1.5 w-fit'>
              <Icon className='size-3.5 shrink-0' />
              {item}
            </Badge>
          )
        })}
      </div>
    ]
  }
]

const faqItems = [
  {
    question: 'Could you please provide details on the various types of accommodations available?',
    answer:
      'We offer a diverse range of accommodations to suit every preference and budget. Our hotels provide luxury and standard rooms with full amenities, while our motels offer convenient and comfortable stays for travelers. For extended stays or family trips, we have fully furnished vacation rentals with kitchen facilities and living spaces.'
  },
  {
    question: 'What is the process for making a booking?',
    answer:
      "Booking with us is simple and straightforward. Select your desired accommodation type, check availability for your dates, and complete the reservation through our secure online system. You'll receive instant confirmation and detailed information about your stay via email."
  },
  {
    question: 'Could you please provide details regarding your cancellation policy?',
    answer:
      'Our flexible cancellation policy allows free cancellation up to 48 hours before check-in for most bookings. Specific terms may vary by property and season. For detailed information, please review the cancellation terms provided during the booking process.'
  },
  {
    question: 'Is it possible to modify my booking after it has been confirmed?',
    answer:
      'Yes, you can modify your confirmed booking through our online booking management system or by contacting our customer service team. Changes to dates, room types, or guest numbers are subject to availability and may affect the pricing.'
  },
  {
    question: 'Are pets permitted in your accommodations?',
    answer:
      'Select properties are pet-friendly and welcome your furry companions. Additional pet fees and restrictions may apply. Please check the specific property details or contact us directly to confirm pet policies and arrangements.'
  }
]

import { ServicePageSchema } from '@/components/json-ld'

const ServiceDetailPage = async () => {
  const data = await getSiteSection('service_web-development')

  const dynamicFeaturesList = (data.featuresList || []).map((feature: any, idx: number) => {
    const fallbackDesign = featuresList[idx] || featuresList[0] || {}
    return {
      ...fallbackDesign,
      icon: getLucideIcon(feature.iconName),
      title: feature.title,
      description: feature.description
    }
  })

  return (
    <div className='flex flex-col min-h-screen'>
      <ServicePageSchema
        data={data}
        serviceName="Web Development Services"
        fallbackDescription="From marketing sites to multi-tenant SaaS dashboards, we build web products on a modern stack."
      />
      <div className='relative'>
        <SiteNavbar />
        <main className='flex flex-col'>
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
        </main>
      </div>

      <Features featuresList={dynamicFeaturesList} />

      <CompareUILib rowdata={webStackData} />

      <FAQ faqItems={data.faqItems || faqItems} />

      <Footer />
    </div>
  )
}

export default ServiceDetailPage
