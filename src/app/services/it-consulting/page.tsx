import {
  BriefcaseBusinessIcon,
  FileSearchIcon,
  SearchCheckIcon,
  ShieldCheckIcon,
  UserCheckIcon,
  UsersIcon
} from 'lucide-react'

import SiteNavbar from '@/components/site-navbar'
import { getSiteSection, getLucideIcon } from '@/utils/cms'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'

import HeroSection from '@/components/shadcn-studio/blocks/hero-section-03/hero-section-03'
import Features01 from '@/components/shadcn-studio/blocks/features-section-01-consulting/features-section-01-consulting'
import CompareUILib from '@/components/shadcn-studio/blocks/compare-ui-lib-consulting/compare-ui-lib-consulting'
import AppIntegration from '@/components/shadcn-studio/blocks/app-integration-03-consulting/app-integration-03-consulting'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11-consulting/cta-section-11-consulting'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-09/faq-component-09'

import type { AvatarItem } from '@/components/shadcn-studio/blocks/hero-section-03/hero-section-03'

export const metadata = {
  title: 'IT Consulting & Staff Augmentation Services | Apargo',
  description:
    'CTO-on-call, architecture reviews, technical due diligence and dedicated engineering pods that plug into your team. Senior-heavy talent from Apargo.'
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
    icon: BriefcaseBusinessIcon,
    title: 'CTO-on-call',
    description:
      'Fractional CTO support for founders without a technical co-founder, or for early-stage teams that need senior judgement on hiring, architecture, vendor selection and roadmap.',
    cardBorderColor: 'border-primary/40 hover:border-primary',
    avatarTextColor: 'text-primary',
    avatarBgColor: 'bg-primary/10',
    cardClassName: 'md:col-span-4'
  },
  {
    icon: FileSearchIcon,
    title: 'Architecture reviews',
    description:
      'Two to four weeks of deep review — codebase, infrastructure, team workflow — delivered as a written report with prioritised recommendations.',
    cardBorderColor: 'border-green-600/40 hover:border-green-600 dark:border-green-400/40 dark:hover:border-green-400',
    avatarTextColor: 'text-green-600 dark:text-green-400',
    avatarBgColor: 'bg-green-600/10 dark:bg-green-400/10',
    cardClassName: 'md:col-span-2'
  },
  {
    icon: SearchCheckIcon,
    title: 'Technical due diligence',
    description:
      'For investors, acquirers, or founders evaluating a build vs buy decision. Honest, written, with no incentive to oversell or undersell.',
    cardBorderColor: 'border-amber-600/40 hover:border-amber-600 dark:border-amber-400/40 dark:hover:border-amber-400',
    avatarTextColor: 'text-amber-600 dark:text-amber-400',
    avatarBgColor: 'bg-amber-600/10 dark:bg-amber-400/10',
    cardClassName: 'md:col-span-2'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Cloud and security audits',
    description:
      "Where the money's leaking. Where the security holes are. What needs urgent attention vs what can wait a quarter.",
    cardBorderColor: 'border-blue-600/40 hover:border-blue-600 dark:border-blue-400/40 dark:hover:border-blue-400',
    avatarTextColor: 'text-blue-600 dark:text-blue-400',
    avatarBgColor: 'bg-blue-600/10 dark:bg-blue-400/10',
    cardClassName: 'md:col-span-2'
  },
  {
    icon: UserCheckIcon,
    title: 'Hiring help',
    description:
      'Job descriptions, interview rubrics, take-home review, technical interview panels — for engineering and AI roles.',
    cardBorderColor: 'border-purple-600/40 hover:border-purple-600 dark:border-purple-400/40 dark:hover:border-purple-400',
    avatarTextColor: 'text-purple-600 dark:text-purple-400',
    avatarBgColor: 'bg-purple-600/10 dark:bg-purple-400/10',
    cardClassName: 'md:col-span-2'
  },
  {
    icon: UsersIcon,
    title: 'Plug-in engineering pods',
    description:
      'We embed senior engineers, designers or product managers into your team for a defined period. They work in your Slack, attend your stand-ups, follow your processes.',
    cardBorderColor: 'border-rose-600/40 hover:border-rose-600 dark:border-rose-400/40 dark:hover:border-rose-400',
    avatarTextColor: 'text-rose-600 dark:text-rose-400',
    avatarBgColor: 'bg-rose-600/10 dark:bg-rose-400/10',
    cardClassName: 'md:col-span-6'
  }
]

const stackData = [
  {
    category: 'Backend',
    iconName: 'Server',
    items: ['Node.js', 'Python', 'Go', 'Java']
  },
  {
    category: 'Frontend',
    iconName: 'FileCode2',
    items: ['React', 'Next.js', 'Vue']
  },
  {
    category: 'Mobile',
    iconName: 'Smartphone',
    items: ['React Native', 'Flutter', 'native iOS', 'native Android']
  },
  {
    category: 'AI & ML',
    iconName: 'Bot',
    items: ['LLM applications', 'classical ML', 'data engineering']
  },
  {
    category: 'DevOps & SRE',
    iconName: 'CloudCog',
    items: ['AWS', 'GCP', 'Kubernetes', 'Terraform']
  },
  {
    category: 'Product & Design',
    iconName: 'Palette',
    items: ['Product designers', 'design system specialists', 'PMs']
  }
]

const integrations = [
  {
    name: 'Minimum engagement',
    description: '1 month part-time / 3 months full-time.',
    iconName: 'Calendar'
  },
  {
    name: 'Notice period',
    description: '30 days either side.',
    iconName: 'Clock'
  },
  {
    name: 'IP and confidentiality',
    description: 'Our standard NDA covers it. Yours works too if you prefer.',
    iconName: 'ShieldCheck'
  }
]

const faqItems = [
  {
    question: 'How does your CTO-on-call / Fractional CTO service work?',
    answer:
      'We provide a highly experienced former CTO or VP of Engineering on a flexible retainer (E.g. 5 to 15 hours per week) to lead your architecture decisions, mentor your team, and represent your tech stack to investors.'
  },
  {
    question: 'What makes your staff augmentation different from hiring freelancers?',
    answer:
      'Our embedded engineers are full-time, vetted Apargo team members who bring established engineering rigor, senior mentorship, and full backup support from our entire agency.'
  },
  {
    question: 'Can we hire your embedded engineers permanently if we like them?',
    answer:
      'Yes. We offer a transparent contract-to-hire option allowing you to transition our embedded engineers to your permanent in-house payroll after an agreed period.'
  },
  {
    question: 'How quickly can you onboard an engineering pod into our Slack?',
    answer:
      'Depending on your required tech stack, we can typically onboard a dedicated senior engineering pod into your Slack and stand-ups within 1 to 2 weeks.'
  },
  {
    question: 'Are your standard NDAs and IP transfer agreements fully secure?',
    answer:
      'Absolutely. All intellectual property, codebases, and architectural documentation created during the engagement are 100% owned by your company from day one.'
  }
]

import { ServicePageSchema } from '@/components/json-ld'

const ITConsultingPage = async () => {
  const data = await getSiteSection('service_it-consulting')
  return (
    <div className='flex min-h-screen flex-col'>
      <ServicePageSchema
        data={data}
        serviceName="IT Consulting & Staff Augmentation Services"
        fallbackDescription="CTO-on-call, architecture reviews, technical due diligence and dedicated engineering pods that plug into your team."
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

        <CompareUILib stackData={stackData} />

        <AppIntegration integrations={integrations} />

        <CTA />

        <FAQ faqItems={data.faqItems || faqItems} />
      </main>

      <Footer />
    </div>
  )
}

export default ITConsultingPage
