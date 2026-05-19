import {
  LightbulbIcon,
  TrendingUpIcon,
  RocketIcon,
  RefreshCwIcon,
  WrenchIcon,
  CogIcon,
  HandshakeIcon
} from 'lucide-react'

import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'

import HeroSection from '@/components/shadcn-studio/blocks/hero-section-03-saas/hero-section-03-saas'
import Features01 from '@/components/shadcn-studio/blocks/features-section-01-saas/features-section-01-saas'
import AppIntegration from '@/components/shadcn-studio/blocks/app-integration-03-saas/app-integration-03-saas'
import Features03 from '@/components/shadcn-studio/blocks/features-section-03-saas/features-section-03-saas'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11-saas/cta-section-11-saas'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-09/faq-component-09'

import type { AvatarItem } from '@/components/shadcn-studio/blocks/hero-section-03-saas/hero-section-03-saas'

export const metadata = {
  title: 'SaaS Product Development Services | Apargo',
  description:
    'Apargo builds SaaS products from idea to scale. Multi-tenant architecture, billing, auth, analytics — same stack we use for AI Greentick.'
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
    icon: LightbulbIcon,
    title: 'Idea to MVP',
    description:
      'From a written idea or a Figma mockup to a working MVP in 8 to 12 weeks. Just enough features to put it in front of paying users.',
    cardBorderColor: 'border-primary/40 hover:border-primary',
    avatarTextColor: 'text-primary',
    avatarBgColor: 'bg-primary/10',
    cardClassName: 'md:col-span-3'
  },
  {
    icon: TrendingUpIcon,
    title: 'MVP to product-market fit',
    description:
      'Add what users actually ask for. Cut what they ignore. Build the metrics dashboard you need to tell which is which.',
    cardBorderColor: 'border-green-600/40 hover:border-green-600 dark:border-green-400/40 dark:hover:border-green-400',
    avatarTextColor: 'text-green-600 dark:text-green-400',
    avatarBgColor: 'bg-green-600/10 dark:bg-green-400/10',
    cardClassName: 'md:col-span-3'
  },
  {
    icon: RocketIcon,
    title: 'PMF to scale',
    description:
      'Scale the architecture, the team and the unit economics. Handle 10x users without 10x infra bills.',
    cardBorderColor: 'border-amber-600/40 hover:border-amber-600 dark:border-amber-400/40 dark:hover:border-amber-400',
    avatarTextColor: 'text-amber-600 dark:text-amber-400',
    avatarBgColor: 'bg-amber-600/10 dark:bg-amber-400/10',
    cardClassName: 'md:col-span-3'
  },
  {
    icon: RefreshCwIcon,
    title: 'Pivot or rebuild',
    description:
      "Sometimes the right answer is a rewrite. We've helped clients migrate off no-code, off legacy stacks, off platforms that were eating their margins.",
    cardBorderColor: 'border-blue-600/40 hover:border-blue-600 dark:border-blue-400/40 dark:hover:border-blue-400',
    avatarTextColor: 'text-blue-600 dark:text-blue-400',
    avatarBgColor: 'bg-blue-600/10 dark:bg-blue-400/10',
    cardClassName: 'md:col-span-3'
  }
]

const integrations = [
  {
    name: 'Multi-tenant data isolation',
    description: 'Schema-per-tenant, row-level security, or hybrid.',
    iconName: 'Database'
  },
  {
    name: 'Subscription billing',
    description: 'Stripe, Paddle, Razorpay, with self-serve upgrades and downgrades.',
    iconName: 'CreditCard'
  },
  {
    name: 'Team workspaces and roles',
    description: 'Owner, admin, member, guest, with audit logs.',
    iconName: 'Users'
  },
  {
    name: 'Usage metering',
    description: 'Track and bill on rows, calls, messages or whatever your unit is.',
    iconName: 'BarChart'
  },
  {
    name: 'Onboarding flows',
    description: 'Welcome wizard, sample data, empty-state nudges.',
    iconName: 'Milestone'
  },
  {
    name: 'Customer support tooling',
    description: 'Integrated chat, knowledge base, in-app announcements.',
    iconName: 'LifeBuoy'
  },
  {
    name: 'Analytics and observability',
    description: 'Product analytics, error tracking, performance monitoring.',
    iconName: 'Activity'
  }
]

const featuresListFeaturesSection03 = [
  {
    icon: WrenchIcon,
    title: 'Build-only',
    description: 'Fixed scope, you take over operations after launch.'
  },
  {
    icon: CogIcon,
    title: 'Build and operate',
    description: 'We build, then run it in production for you for 6 to 12 months while you find an in-house team.'
  },
  {
    icon: HandshakeIcon,
    title: 'Co-build with equity or revenue share',
    description: 'Selectively, for projects we believe in.'
  }
]

const faqItems = [
  {
    question: 'What is your approach to multi-tenant data architecture?',
    answer:
      'We choose between schema-per-tenant, row-level security (RLS) in PostgreSQL, or hybrid models based on your compliance needs and scale, ensuring complete data isolation without compromising query performance.'
  },
  {
    question: 'How do you handle complex usage-based or tiered billing?',
    answer:
      'We integrate robust billing engines like Stripe Billing, Paddle, or Razorpay with custom webhook listeners to meter usage (API calls, active seats, storage) and automatically manage upgrades, prorations, and failed payments.'
  },
  {
    question: 'Can you help us migrate our SaaS off a no-code platform or legacy stack?',
    answer:
      'Yes. We specialize in rewriting MVPs that have outgrown bubble.io or legacy monoliths, migrating your database and business logic to a high-performance Next.js and Node/Go stack with zero data loss.'
  },
  {
    question: "What is included in your 'Build and operate' engagement model?",
    answer:
      'In addition to building the product, we handle 24/7 cloud infrastructure monitoring, CI/CD pipeline management, bug fixes, and feature iterations for 6 to 12 months while helping you interview and onboard your permanent in-house engineering team.'
  },
  {
    question: 'How do you ensure our SaaS is secure and compliant?',
    answer:
      'We implement strict role-based access control (RBAC), immutable audit logs, secure JWT/OAuth authentication, and automated vulnerability scanning, preparing your platform for SOC2 and GDPR compliance from day one.'
  }
]

const SaaSProductDevelopmentPage = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <SiteNavbar />

      <main className='flex flex-1 flex-col'>
        <HeroSection avatars={avatars} />

        <Features01 featuresList={featuresListFeaturesSection01} />

        <AppIntegration integrations={integrations} />

        <Features03 featuresList={featuresListFeaturesSection03} />

        <CTA />

        <FAQ faqItems={faqItems} />
      </main>

      <Footer />
    </div>
  )
}

export default SaaSProductDevelopmentPage
