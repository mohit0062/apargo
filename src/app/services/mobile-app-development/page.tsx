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
  SmartphoneIcon,
  BotIcon,
  Layers2Icon,
  CpuIcon,
  GitMergeIcon,
  CodeXmlIcon,
  PlaneTakeoffIcon,
  ShieldCheckIcon,
  BellRingIcon,
  CreditCardIcon,
  WifiOffIcon,
  MapPinIcon,
  CameraIcon,
  LinkIcon,
  BarChart3Icon
} from 'lucide-react'
import { Fragment } from 'react'
import { Badge } from '@/components/ui/badge'

import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'

import AppIntegration from '@/components/shadcn-studio/blocks/app-integration-03-mobile/app-integration-03-mobile'
import CoMediaLogo from '@/assets/svg/comedia-logo'
import CompareUILib from '@/components/shadcn-studio/blocks/compare-01/compare-01'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11-mobile/cta-section-11-mobile'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-09/faq-component-09'
import Features01 from '@/components/shadcn-studio/blocks/features-section-01-mobile/features-section-01-mobile'
import Features03 from '@/components/shadcn-studio/blocks/features-section-03-mobile/features-section-03-mobile'
import GrowLogo from '@/assets/svg/grow-logo'
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-03-mobile/hero-section-03-mobile'
import HiveStudioLogo from '@/assets/svg/hive-studio-logo'
import type { AvatarItem } from '@/components/shadcn-studio/blocks/hero-section-03-mobile/hero-section-03-mobile'

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
    icon: SmartphoneIcon,
    title: 'iOS',
    description:
      'Native Swift or cross-platform — depending on what your users actually need. App Store submission, TestFlight setup, App Store optimization basics included.',
    cardBorderColor: 'border-primary/40 hover:border-primary',
    avatarTextColor: 'text-primary',
    avatarBgColor: 'bg-primary/10'
  },
  {
    icon: BotIcon,
    title: 'Android',
    description:
      'Native Kotlin or cross-platform, with full Play Store launch support — store listing, internal testing tracks, staged rollouts.',
    cardBorderColor: 'border-green-600/40 hover:border-green-600 dark:border-green-400/40 dark:hover:border-green-400',
    avatarTextColor: 'text-green-600 dark:text-green-400',
    avatarBgColor: 'bg-green-600/10 dark:bg-green-400/10'
  },
  {
    icon: BoxesIcon,
    title: 'Cross-platform',
    description:
      'React Native for most product apps. Flutter when you need pixel-perfect custom UI. Same codebase, two stores, real native performance.',
    cardBorderColor: 'border-amber-600/40 hover:border-amber-600 dark:border-amber-400/40 dark:hover:border-amber-400',
    avatarTextColor: 'text-amber-600 dark:text-amber-400',
    avatarBgColor: 'bg-amber-600/10 dark:bg-amber-400/10'
  }
]

const integrations = [
  {
    name: 'Authentication',
    description: 'Email, phone OTP, Google, Apple, biometric',
    iconName: 'ShieldCheck'
  },
  {
    name: 'Push Notifications',
    description: 'Reliable delivery via Firebase or OneSignal',
    iconName: 'BellRing'
  },
  {
    name: 'Payments',
    description: 'Razorpay, Stripe, PayU, in-app purchases',
    iconName: 'CreditCard'
  },
  {
    name: 'Offline-First Sync',
    description: 'Robust local caching and background queueing',
    iconName: 'WifiOff'
  },
  {
    name: 'Maps & Geolocation',
    description: 'Live tracking, geofencing and custom map layers',
    iconName: 'MapPin'
  },
  {
    name: 'Camera & Video Calling',
    description: 'Camera, file upload, video calling',
    iconName: 'Camera'
  },
  {
    name: 'Deep Linking',
    description: 'Deep linking and universal links',
    iconName: 'Link'
  },
  {
    name: 'Analytics',
    description: 'Mixpanel, Amplitude, Firebase, Segment',
    iconName: 'BarChart3'
  }
]

const techIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'React Native': AtomIcon,
  'Expo': TriangleIcon,
  'Flutter': BoxesIcon,
  'Swift': SmartphoneIcon,
  'SwiftUI': Layers2Icon,
  'Kotlin': BotIcon,
  'Jetpack Compose': CpuIcon,
  'Redux Toolkit': WorkflowIcon,
  'Zustand': ZapIcon,
  'MobX': LayersIcon,
  'Riverpod': MilestoneIcon,
  'Node.js': ServerIcon,
  'Python': FileCodeIcon,
  'Go': WorkflowIcon,
  'Firebase': ZapIcon,
  'Supabase': DatabaseIcon,
  'EAS Build': CloudIcon,
  'Bitrise': MilestoneIcon,
  'Fastlane': FastForwardIcon,
  'GitHub Actions': GitMergeIcon
}

const mobileStackData = [
  {
    name: 'Area',
    isKey: true,
    columnData: ['Cross-platform', 'Native', 'State', 'Backend', 'CI/CD']
  },
  {
    name: 'Mobile Stack',
    icon: <LayersIcon className='size-5 text-primary' />,
    isHighlighted: true,
    columnData: [
      <div key='cross-platform-stack' className='flex flex-wrap gap-2'>
        {['React Native', 'Expo', 'Flutter'].map(item => {
          const Icon = techIcons[item] || SmartphoneIcon
          return (
            <Badge key={item} className='rounded-sm bg-primary/10 px-3 py-1 text-primary flex items-center gap-1.5 w-fit'>
              <Icon className='size-3.5 shrink-0' />
              {item}
            </Badge>
          )
        })}
      </div>,
      <div key='native-stack' className='flex flex-wrap gap-2'>
        {['Swift', 'SwiftUI', 'Kotlin', 'Jetpack Compose'].map(item => {
          const Icon = techIcons[item] || SmartphoneIcon
          return (
            <Badge key={item} className='rounded-sm bg-primary/10 px-3 py-1 text-primary flex items-center gap-1.5 w-fit'>
              <Icon className='size-3.5 shrink-0' />
              {item}
            </Badge>
          )
        })}
      </div>,
      <div key='state-stack' className='flex flex-wrap gap-2'>
        {['Redux Toolkit', 'Zustand', 'MobX', 'Riverpod'].map(item => {
          const Icon = techIcons[item] || SmartphoneIcon
          return (
            <Badge key={item} className='rounded-sm bg-primary/10 px-3 py-1 text-primary flex items-center gap-1.5 w-fit'>
              <Icon className='size-3.5 shrink-0' />
              {item}
            </Badge>
          )
        })}
      </div>,
      <div key='backend-stack' className='flex flex-wrap gap-2'>
        {['Node.js', 'Python', 'Go', 'Firebase', 'Supabase'].map(item => {
          const Icon = techIcons[item] || SmartphoneIcon
          return (
            <Badge key={item} className='rounded-sm bg-primary/10 px-3 py-1 text-primary flex items-center gap-1.5 w-fit'>
              <Icon className='size-3.5 shrink-0' />
              {item}
            </Badge>
          )
        })}
      </div>,
      <div key='cicd-stack' className='flex flex-wrap gap-2'>
        {['EAS Build', 'Bitrise', 'Fastlane', 'GitHub Actions'].map(item => {
          const Icon = techIcons[item] || SmartphoneIcon
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

const featuresListFeaturesSection03 = [
  {
    icon: PlaneTakeoffIcon,
    title: 'App Store & Play Store Launches',
    description: 'Handled for you, end to end with full store listing and review compliance.'
  },
  {
    icon: CodeXmlIcon,
    title: 'Crash Reporting & Analytics',
    description: 'Wired in before launch, not after, ensuring full visibility into app performance.'
  },
  {
    icon: LayersIcon,
    title: 'Over-the-Air Updates',
    description: 'Set up where it makes sense, so you can ship fixes without store review.'
  },
  {
    icon: SmartphoneIcon,
    title: 'Release Management Runbook',
    description: 'Comprehensive documentation so your future team knows how to ship version 2 without us.'
  }
]

const faqItems = [
  {
    question: 'Do you build native or cross-platform mobile apps?',
    answer:
      'We build both! We use React Native and Flutter for most product apps where cross-platform efficiency saves you time and money. When your app requires pixel-perfect custom hardware integrations or intense native performance, we build fully native using Swift and Kotlin.'
  },
  {
    question: 'How do you ensure apps survive the App Store review process?',
    answer:
      'We handle App Store and Play Store submissions end to end. We ensure your app complies with all Apple and Google review guidelines regarding privacy, subscriptions, user generated content, and secure authentication.'
  },
  {
    question: 'What features do you typically integrate into mobile apps?',
    answer:
      'We frequently ship advanced mobile capabilities including biometric authentication, push notifications via Firebase/OneSignal, payment gateways (Razorpay, Stripe), offline-first caching, geolocation, geofencing, and deep linking.'
  },
  {
    question: 'What is included in the project handover?',
    answer:
      'You receive 100% full IP ownership from day one. We hand over the complete source code in your repository, signing certificates, CI/CD pipeline configurations, architecture documentation, and a release management runbook.'
  },
  {
    question: 'How long does a mobile app MVP typically take to build?',
    answer:
      'A production-ready mobile MVP typically takes between 10 to 16 weeks depending on scope and complexity. We provide a fixed price and fixed timeline quote after a brief scoping engagement.'
  }
]

const MobileAppDevelopmentPage = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <SiteNavbar />

      <main className='flex flex-1 flex-col'>
        <HeroSection avatars={avatars} />

        <Features01 featuresList={featuresListFeaturesSection01} />

        <AppIntegration integrations={integrations} />

        <CompareUILib rowdata={mobileStackData} />

        <Features03 featuresList={featuresListFeaturesSection03} />

        <CTA />

        <FAQ faqItems={faqItems} />
      </main>

      <Footer />
    </div>
  )
}

export default MobileAppDevelopmentPage
