import {
  PaletteIcon,
  SmartphoneIcon,
  BoxesIcon,
  FileSearchIcon,
  SparklesIcon
} from 'lucide-react'

import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'

import HeroSection from '@/components/shadcn-studio/blocks/hero-section-03-uiux/hero-section-03-uiux'
import Features01 from '@/components/shadcn-studio/blocks/features-section-01-uiux/features-section-01-uiux'
import CompareUILib from '@/components/shadcn-studio/blocks/compare-ui-lib-uiux/compare-ui-lib-uiux'
import AppIntegration from '@/components/shadcn-studio/blocks/app-integration-03-uiux/app-integration-03-uiux'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11-uiux/cta-section-11-uiux'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-09/faq-component-09'

import type { AvatarItem } from '@/components/shadcn-studio/blocks/hero-section-03-uiux/hero-section-03-uiux'

export const metadata = {
  title: 'UI/UX Design Services — Product, Mobile, SaaS | Apargo',
  description:
    'Product, mobile and dashboard UX design by Apargo. Design systems, prototypes and shipped product UI — designed to be built, not just to look good in a portfolio.'
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
    icon: PaletteIcon,
    title: 'Product design',
    description:
      'End-to-end design for SaaS dashboards, mobile apps and web platforms. Wireframes, prototypes, final UI, design system.',
    cardBorderColor: 'border-primary/40 hover:border-primary',
    avatarTextColor: 'text-primary',
    avatarBgColor: 'bg-primary/10',
    cardClassName: 'md:col-span-4'
  },
  {
    icon: SmartphoneIcon,
    title: 'Mobile app design',
    description:
      'iOS and Android UX, native patterns, motion, dark mode, accessibility. Built around the platform conventions your users already know.',
    cardBorderColor: 'border-green-600/40 hover:border-green-600 dark:border-green-400/40 dark:hover:border-green-400',
    avatarTextColor: 'text-green-600 dark:text-green-400',
    avatarBgColor: 'bg-green-600/10 dark:bg-green-400/10',
    cardClassName: 'md:col-span-2'
  },
  {
    icon: BoxesIcon,
    title: 'Design systems',
    description:
      'Reusable component libraries — Figma + Storybook + code. Tokens, components, patterns, documentation. Your designers and engineers stay in sync.',
    cardBorderColor: 'border-amber-600/40 hover:border-amber-600 dark:border-amber-400/40 dark:hover:border-amber-400',
    avatarTextColor: 'text-amber-600 dark:text-amber-400',
    avatarBgColor: 'bg-amber-600/10 dark:bg-amber-400/10',
    cardClassName: 'md:col-span-2'
  },
  {
    icon: FileSearchIcon,
    title: 'UX audits',
    description:
      'We use your product like a real user, then deliver a written punch list of friction points, prioritised by impact and effort. Pairs well with our development services or stands alone.',
    cardBorderColor: 'border-blue-600/40 hover:border-blue-600 dark:border-blue-400/40 dark:hover:border-blue-400',
    avatarTextColor: 'text-blue-600 dark:text-blue-400',
    avatarBgColor: 'bg-blue-600/10 dark:bg-blue-400/10',
    cardClassName: 'md:col-span-2'
  },
  {
    icon: SparklesIcon,
    title: 'Branding and visual identity',
    description:
      "Logo, palette, type system, brand guidelines. We don't do brand-only projects in isolation — but if you need branding alongside a product build, we handle it.",
    cardBorderColor: 'border-purple-600/40 hover:border-purple-600 dark:border-purple-400/40 dark:hover:border-purple-400',
    avatarTextColor: 'text-purple-600 dark:text-purple-400',
    avatarBgColor: 'bg-purple-600/10 dark:bg-purple-400/10',
    cardClassName: 'md:col-span-2'
  }
]

const stackData = [
  {
    category: 'Design',
    iconName: 'Palette',
    items: ['Figma', 'FigJam', 'Framer', 'Spline (3D)']
  },
  {
    category: 'Prototyping',
    iconName: 'Play',
    items: ['Figma', 'ProtoPie', 'Lottie']
  },
  {
    category: 'Handoff',
    iconName: 'FileCode',
    items: ['Figma Dev Mode', 'Storybook', 'Style Dictionary']
  }
]

const integrations = [
  {
    name: 'Designers sit in Slack',
    description: 'Designers sit in the engineering Slack. No silos.',
    iconName: 'Users'
  },
  {
    name: 'Feasibility reviews',
    description: 'Components reviewed for feasibility. Before pixels go to dev, the engineer says yes or proposes a cheaper alternative.',
    iconName: 'TerminalSquare'
  },
  {
    name: 'Design QA before launch',
    description: 'Designer reviews the live build, files small fixes, signs off.',
    iconName: 'ShieldCheck'
  }
]

const faqItems = [
  {
    question: 'How do you ensure your designs are actually buildable by engineers?',
    answer:
      'Our designers work closely with our engineering team from day one. Every component is reviewed for technical feasibility, performance impact, and implementation cost before we hand off the final Figma files.'
  },
  {
    question: 'What is included in a design system handoff?',
    answer:
      'We deliver a production-ready Figma component library complete with design tokens (colors, typography, spacing), interactive variants, and auto-layout guidelines, paired with Storybook documentation for seamless developer handoff.'
  },
  {
    question: 'Can you help us redesign an existing legacy enterprise application?',
    answer:
      'Yes. We specialize in UX audits and phased redesigns of complex enterprise software, simplifying navigation and modernizing workflows without disrupting your active user base.'
  },
  {
    question: 'Do you design for both iOS and Android native platforms?',
    answer:
      'Absolutely. We respect platform-specific conventions E.g. Cupertino navigation for iOS and Material Design patterns for Android, ensuring your app feels perfectly native to each user.'
  },
  {
    question: 'How long does a typical UX audit take?',
    answer:
      'A comprehensive UX audit takes 1 to 2 weeks. We deliver a detailed, prioritized punch list of friction points and actionable UI improvements that your team can implement immediately.'
  }
]

const UIUXDesignPage = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <SiteNavbar />

      <main className='flex flex-1 flex-col'>
        <HeroSection avatars={avatars} />

        <Features01 featuresList={featuresListFeaturesSection01} />

        <CompareUILib stackData={stackData} />

        <AppIntegration integrations={integrations} />

        <CTA />

        <FAQ faqItems={faqItems} />
      </main>

      <Footer />
    </div>
  )
}

export default UIUXDesignPage
