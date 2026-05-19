import {
  Building2Icon,
  UsersIcon,
  ShoppingCartIcon,
  CalendarIcon,
  LayoutDashboardIcon,
  DatabaseIcon,
  WorkflowIcon,
  CreditCardIcon,
  MilestoneIcon
} from 'lucide-react'

import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'

import HeroSection from '@/components/shadcn-studio/blocks/hero-section-03-custom/hero-section-03-custom'
import Features01 from '@/components/shadcn-studio/blocks/features-section-01-custom/features-section-01-custom'
import AppIntegration from '@/components/shadcn-studio/blocks/app-integration-03-custom/app-integration-03-custom'
import Features03 from '@/components/shadcn-studio/blocks/features-section-03-custom/features-section-03-custom'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11-custom/cta-section-11-custom'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-09/faq-component-09'

import type { AvatarItem } from '@/components/shadcn-studio/blocks/hero-section-03-custom/hero-section-03-custom'

export const metadata = {
  title: 'Custom Software Development Services | Apargo',
  description:
    'Apargo builds bespoke software for businesses that have outgrown off-the-shelf tools. ERPs, CRMs, marketplaces, internal platforms — designed around your workflow.'
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
    icon: Building2Icon,
    title: 'ERPs and operations platforms',
    description:
      'Inventory, procurement, manufacturing, dispatch — all in one place, designed around how your team actually works. Integrations with Tally, Zoho, SAP and bespoke local systems.',
    cardBorderColor: 'border-primary/40 hover:border-primary',
    avatarTextColor: 'text-primary',
    avatarBgColor: 'bg-primary/10',
    cardClassName: 'md:col-span-4'
  },
  {
    icon: UsersIcon,
    title: 'CRMs and customer platforms',
    description:
      'Sales pipelines, support ticketing, customer health scores. Tightly integrated with WhatsApp, email and call systems — including AI Greentick.',
    cardBorderColor: 'border-green-600/40 hover:border-green-600 dark:border-green-400/40 dark:hover:border-green-400',
    avatarTextColor: 'text-green-600 dark:text-green-400',
    avatarBgColor: 'bg-green-600/10 dark:bg-green-400/10',
    cardClassName: 'md:col-span-2'
  },
  {
    icon: ShoppingCartIcon,
    title: 'Marketplaces and multi-vendor platforms',
    description:
      'Two-sided platforms with onboarding, listings, search, payments, ratings and admin moderation. Built to scale before you hit traffic.',
    cardBorderColor: 'border-amber-600/40 hover:border-amber-600 dark:border-amber-400/40 dark:hover:border-amber-400',
    avatarTextColor: 'text-amber-600 dark:text-amber-400',
    avatarBgColor: 'bg-amber-600/10 dark:bg-amber-400/10',
    cardClassName: 'md:col-span-2'
  },
  {
    icon: CalendarIcon,
    title: 'Booking and scheduling platforms',
    description:
      'For clinics, salons, fitness studios, consultants, tutors. Calendars, reminders, payments, no-shows, recurring sessions.',
    cardBorderColor: 'border-blue-600/40 hover:border-blue-600 dark:border-blue-400/40 dark:hover:border-blue-400',
    avatarTextColor: 'text-blue-600 dark:text-blue-400',
    avatarBgColor: 'bg-blue-600/10 dark:bg-blue-400/10',
    cardClassName: 'md:col-span-2'
  },
  {
    icon: LayoutDashboardIcon,
    title: 'Internal admin and ops tools',
    description:
      'Back-office dashboards your team uses every day. Bulk actions, audit logs, exports, permissions — the boring features that make a tool feel professional.',
    cardBorderColor: 'border-purple-600/40 hover:border-purple-600 dark:border-purple-400/40 dark:hover:border-purple-400',
    avatarTextColor: 'text-purple-600 dark:text-purple-400',
    avatarBgColor: 'bg-purple-600/10 dark:bg-purple-400/10',
    cardClassName: 'md:col-span-2'
  }
]

const integrations = [
  {
    name: 'Discovery',
    description: 'Workshops with your team and operators. We watch how things actually get done today.',
    iconName: 'Search'
  },
  {
    name: 'Spec',
    description: 'Written document with screens, workflows, data model, integrations. You approve before any code is written.',
    iconName: 'FileText'
  },
  {
    name: 'Design',
    description: 'Clickable Figma prototype. We test it with your team before shipping pixels.',
    iconName: 'Figma'
  },
  {
    name: 'Build',
    description: 'Sprint-by-sprint, with weekly demos on real preview links.',
    iconName: 'Code'
  },
  {
    name: 'Pilot',
    description: 'Rollout to one team or location, fix what surfaces, then expand.',
    iconName: 'PlayCircle'
  },
  {
    name: 'Handover',
    description: 'Documentation, training videos, admin manuals.',
    iconName: 'CheckCheck'
  }
]

const featuresListFeaturesSection03 = [
  {
    icon: DatabaseIcon,
    title: 'Owned data',
    description: "Your data lives in your database, not someone else's API."
  },
  {
    icon: WorkflowIcon,
    title: 'Workflow fit',
    description: 'Built around what you do, not what a SaaS vendor thought was generic.'
  },
  {
    icon: CreditCardIcon,
    title: 'No per-seat tax',
    description: 'Scale users without scaling subscription fees.'
  },
  {
    icon: MilestoneIcon,
    title: 'Integration freedom',
    description: "Connect anything to anything — not just what a vendor's marketplace allows."
  }
]

const faqItems = [
  {
    question: 'When should a business choose custom software over SaaS?',
    answer:
      "If you've outgrown Excel, Google Sheets, and find yourself duct-taping three different SaaS subscriptions together to run basic workflows, it's time for custom software. Custom builds are ideal when your operational logic is unique and off-the-shelf tools slow your team down."
  },
  {
    question: 'How long does a custom software build typically take?',
    answer:
      'A production-ready custom platform typically takes between 12 to 20 weeks depending on complexity. We break the build into predictable, sprint-by-sprint milestones with weekly demos on live preview links.'
  },
  {
    question: 'Who owns the intellectual property and data?',
    answer:
      "You receive 100% full IP ownership and data sovereignty from day one. Your data lives in your own secure database, not a vendor's proprietary API."
  },
  {
    question: 'Will you integrate the custom software with our existing tools like Tally or SAP?',
    answer:
      'Absolutely. We routinely build robust, secure integrations with legacy accounting software like Tally, ERPs like SAP and Zoho, payment gateways, and custom local systems.'
  },
  {
    question: 'How do you handle future updates and maintenance?',
    answer:
      'We provide full handover documentation, admin manuals, and training videos so your team can operate the platform independently. We also offer dedicated ongoing support and maintenance retainers for continuous feature expansion.'
  }
]

const CustomSoftwareDevelopmentPage = () => {
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

export default CustomSoftwareDevelopmentPage
