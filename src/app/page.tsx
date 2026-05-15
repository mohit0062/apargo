import {
  ActivityIcon,
  Building2Icon,
  CheckCircle2,
  CreditCardIcon,
  GraduationCapIcon,
  HeartPulseIcon,
  PlaneIcon,
  ShoppingBagIcon,
  UsersIcon,
  Zap,
} from 'lucide-react'

import { BentoGrid } from '@/components/BentoGrid'
import Blog from '@/components/shadcn-studio/blocks/blog-component-06/blog-component-06'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'
import Features01 from '@/components/shadcn-studio/blocks/features-section-01/features-section-01'
import Features18 from '@/components/shadcn-studio/blocks/features-section-18/features-section-18'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-16/hero-section-16'
import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-02/testimonials-component-02'
import type { TestimonialItem } from '@/components/shadcn-studio/blocks/testimonials-component-02/testimonials-component-02'
import SiteNavbar from '@/components/site-navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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

const testimonials: TestimonialItem[] = [
  {
    name: 'Eleanor Pena',
    handle: '@BerryB777',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png?width=48&height=48&format=auto',
    rating: 5,
    title: 'Seamless Integration',
    content:
      'shadcn/studio has made my development process so much easier! The components are intuitive and blend perfectly with Tailwind CSS.',
    platformName: 'G2',
    platformImage: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/g2-logo.png?width=22&height=22&format=auto',
  },
  {
    name: 'Darlene Robertson',
    handle: '@LatentHQ',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png?width=48&height=48&format=auto',
    rating: 5,
    title: 'Incredible Support',
    content:
      'The support team behind shadcn/studio is fantastic! They helped me with integration issues quickly and efficiently.',
    platformName: 'Trustpilot',
    platformImage:
      'https://cdn.shadcnstudio.com/ss-assets/brand-logo/trustpilot-icon.png?width=22&height=22&format=auto',
  },
  {
    name: 'Esther Howard',
    handle: '@oxtuggs',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png?width=48&height=48&format=auto',
    rating: 4.5,
    title: 'Fantastic Component Library',
    content:
      'shadcn/studio is a fantastic tool for any developer using Shadcn UI. The components are not only beautiful but also functional!',
    platformName: 'Twitter',
    platformImage: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/twitter-icon.png?width=22&height=22&format=auto',
  },
  {
    name: 'Floyd Miles',
    handle: '@Athar',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png?width=48&height=48&format=auto',
    rating: 4.5,
    title: 'Game Changer for Developers',
    content:
      'Using shadcn/studio has transformed the way I build applications. The ease of use and flexibility is unmatched!',
    platformName: 'Twitter',
    platformImage: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/twitter-icon.png?width=22&height=22&format=auto',
  },
  {
    name: 'Brad Hanna',
    handle: '@Marko',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png?width=48&height=48&format=auto',
    rating: 4.5,
    title: 'Perfect for Rapid Development',
    content:
      'shadcn/studio has significantly sped up my development process. The pre-built components are perfect for rapid prototyping!',
    platformName: 'Twitter',
    platformImage: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/twitter-icon.png?width=22&height=22&format=auto',
  },
  {
    name: 'Cody Fisher',
    handle: '@BerryB777',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png?width=48&height=48&format=auto',
    rating: 5,
    title: 'Effortless Design',
    content:
      'shadcn/studio has made designing my web applications effortless. The components are easy to customize and integrate seamlessly!',
    platformName: 'G2',
    platformImage: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/g2-logo.png?width=22&height=22&format=auto',
  },
  {
    name: 'Theresa Webb',
    handle: '@inverse_hq',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png?width=48&height=48&format=auto',
    rating: 4.5,
    title: 'Highly Recommended',
    content:
      "The attention to detail in shadcn/studio's components is impressive. It saves me so much time and effort in my projects!",
    platformName: 'Trustpilot',
    platformImage:
      'https://cdn.shadcnstudio.com/ss-assets/brand-logo/trustpilot-icon.png?width=22&height=22&format=auto',
  },
  {
    name: 'Dianne Russell',
    handle: '@mukherjee',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png?width=48&height=48&format=auto',
    rating: 5,
    title: 'Exceptional User Experience',
    content:
      'shadcn/studio has truly elevated my projects! The components are not only easy to use but also enhance the overall user experience.',
    platformName: 'Trustpilot',
    platformImage:
      'https://cdn.shadcnstudio.com/ss-assets/brand-logo/trustpilot-icon.png?width=22&height=22&format=auto',
  },
  {
    name: 'Kathryn Murphy',
    handle: '@stap',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png?width=48&height=48&format=auto',
    rating: 4.5,
    title: 'A Must-Have for Tailwind Users',
    content:
      'shadcn/studio is a must-have for anyone working with Shadcn UI. The library is well-organized and offers outstanding flexibility!',
    platformName: 'Twitter',
    platformImage: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/twitter-icon.png?width=22&height=22&format=auto',
  },
]

const blogCards = [
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-25.png',
    alt: 'Engineering notes',
    tags: ['Engineering', 'Product'],
    title: 'How we decide what to build first',
    date: 'May 15, 2026',
    blogLink: '#',
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-24.png',
    alt: 'AI experiments',
    tags: ['AI', 'Automation'],
    title: 'Where AI actually saves teams time',
    date: 'May 15, 2026',
    blogLink: '#',
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-23.png',
    alt: 'SaaS product playbooks',
    tags: ['SaaS', 'Playbook'],
    title: 'Lessons from running our own SaaS',
    date: 'May 15, 2026',
    blogLink: '#',
  },
]

const industries = [
  {
    icon: ShoppingBagIcon,
    title: 'E-commerce',
    description: 'Headless storefronts, D2C workflows, customer portals and conversion-focused product experiences.',
  },
  {
    icon: HeartPulseIcon,
    title: 'Healthcare',
    description: 'Secure patient journeys, appointment flows, operational dashboards and reliable care platforms.',
  },
  {
    icon: GraduationCapIcon,
    title: 'Education',
    description: 'Learning platforms, student apps, admin tools and AI-assisted support for education teams.',
  },
  {
    icon: Building2Icon,
    title: 'Real Estate',
    description: 'Property portals, broker CRMs, lead workflows and WhatsApp-first buyer communication systems.',
  },
  {
    icon: CreditCardIcon,
    title: 'FinTech',
    description: 'KYC flows, lending workflows, secure dashboards and document-heavy financial operations.',
  },
  {
    icon: PlaneIcon,
    title: 'Travel',
    description: 'Booking engines, guest apps, channel tools and support systems for hospitality teams.',
  },
]

const HeroSection16Block = () => {
  return (
    <div>
      <SiteNavbar />
      <main className='flex flex-col overflow-hidden'>
        <HeroSection />
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

const FeaturesSection01Block = () => {
  return <Features01 featuresList={featuresList} />
}

const CtaSection11Block = () => {
  return <CTA />
}

const TestimonialsComponent02Block = () => {
  return <TestimonialsComponent testimonials={testimonials} />
}

const BlogComponent06Block = () => {
  return <Blog blogCards={blogCards} />
}

const IndustriesSectionBlock = () => {
  return (
    <section className='bg-[#FAFAFA] py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto mb-12 max-w-3xl space-y-4 text-center sm:mb-16'>
          <p className='text-primary text-sm font-medium uppercase'>Industries we serve</p>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Built For The Industries That Move Fast</h2>
          <p className='text-muted-foreground text-xl'>
            E-commerce, healthcare, education, real estate, FinTech and travel - different domains, same need for
            software that just works.
          </p>
        </div>

        <div className='grid gap-6 grid-cols-2 lg:grid-cols-3'>
          {industries.map(industry => (
            <Card
              key={industry.title}
              className='h-full shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md'
            >
              <CardHeader>
                <div className='mb-4 flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary'>
                  <industry.icon className='size-5' />
                </div>
                <CardTitle>{industry.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className='text-base leading-7'>{industry.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const FooterComponent05Block = () => {
  return <Footer />
}

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col font-sans'>
      <HeroSection16Block />
      <FeaturesSection12Block />
      <FeaturesSection18Block />
      <FeaturesSection01Block />
      <TestimonialsComponent02Block />
      <IndustriesSectionBlock />
      <BlogComponent06Block />
      <CtaSection11Block />
      <FooterComponent05Block />
    </div>
  )
}
