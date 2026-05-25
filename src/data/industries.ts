import {
  ShoppingBagIcon,
  HeartPulseIcon,
  GraduationCapIcon,
  Building2Icon,
  WalletCardsIcon,
  PlaneIcon,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type Industry = {
  icon: LucideIcon
  name: string
  description: string
  href: string
  color: string
  bgColor: string
  borderColor: string
  hoverBg: string
}

export const industries: Industry[] = [
  {
    icon: ShoppingBagIcon,
    name: 'E-commerce & D2C',
    description: 'Storefronts, dashboards, WhatsApp commerce, abandoned cart recovery, loyalty engines.',
    href: '/industries/ecommerce',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-600/10 dark:bg-amber-400/10',
    borderColor: 'border-amber-500 dark:border-amber-400',
    hoverBg: 'hover:bg-amber-50 dark:hover:bg-amber-400/5',
  },
  {
    icon: HeartPulseIcon,
    name: 'Healthcare',
    description: 'HIPAA-aware platforms, telemedicine, patient management, hospital ops dashboards.',
    href: '/industries/healthcare',
    color: 'text-rose-600 dark:text-rose-400',
    bgColor: 'bg-rose-600/10 dark:bg-rose-400/10',
    borderColor: 'border-rose-500 dark:border-rose-400',
    hoverBg: 'hover:bg-rose-50 dark:hover:bg-rose-400/5',
  },
  {
    icon: GraduationCapIcon,
    name: 'Education & EdTech',
    description: 'LMS platforms, student apps, doubt-solving bots, parent communication tooling.',
    href: '/industries/education-edtech',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-600/10 dark:bg-blue-400/10',
    borderColor: 'border-blue-500 dark:border-blue-400',
    hoverBg: 'hover:bg-blue-50 dark:hover:bg-blue-400/5',
  },
  {
    icon: Building2Icon,
    name: 'Real Estate',
    description: 'Property portals, broker CRMs, virtual tours, lead capture, drip nurture on WhatsApp.',
    href: '/industries/real-estate',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-600/10 dark:bg-emerald-400/10',
    borderColor: 'border-emerald-500 dark:border-emerald-400',
    hoverBg: 'hover:bg-emerald-50 dark:hover:bg-emerald-400/5',
  },
  {
    icon: WalletCardsIcon,
    name: 'FinTech & BFSI',
    description: 'KYC and onboarding, lending workflows, document AI, secure dashboards.',
    href: '/industries/fintech',
    color: 'text-violet-600 dark:text-violet-400',
    bgColor: 'bg-violet-600/10 dark:bg-violet-400/10',
    borderColor: 'border-violet-500 dark:border-violet-400',
    hoverBg: 'hover:bg-violet-50 dark:hover:bg-violet-400/5',
  },
  {
    icon: PlaneIcon,
    name: 'Travel & Hospitality',
    description: 'Booking engines, channel managers, guest apps, WhatsApp-first concierge support.',
    href: '/industries/travel-hospitality',
    color: 'text-sky-600 dark:text-sky-400',
    bgColor: 'bg-sky-600/10 dark:bg-sky-400/10',
    borderColor: 'border-sky-500 dark:border-sky-400',
    hoverBg: 'hover:bg-sky-50 dark:hover:bg-sky-400/5',
  },
]
