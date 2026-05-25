import type { ReactNode } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Marquee } from '@/components/ui/marquee'
import { MotionPreset } from '@/components/ui/motion-preset'
import Card3DEffect from '@/components/shadcn-studio/blocks/testimonials-component-24/card-3d-effect'
import { TextShimmer } from '@/components/shadcn-studio/blocks/text-shimmer'

const linkedin = 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/linkedin-icon.png?width=26&format=auto'
const twitter = 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/twitter-square-icon.png?width=26&format=auto'

const TestimonialCard = ({
  avatar,
  fallback,
  name,
  handle,
  platform,
  platformAlt,
  date,
  children,
}: {
  avatar: string
  fallback: string
  name: string
  handle: string
  platform: string
  platformAlt: string
  date: string
  children: ReactNode
}) => (
  <Card3DEffect translateDepth={0.5} rotateDepth={5}>
    <Card className='gap-4 shadow-none'>
      <div className='flex items-center justify-between px-6'>
        <div className='flex items-center gap-3'>
          <Avatar className='size-12'>
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className='text-sm'>{fallback}</AvatarFallback>
          </Avatar>
          <div className='space-y-0.5'>
            <h4 className='font-semibold'>{name}</h4>
            <p className='text-muted-foreground'>{handle}</p>
          </div>
        </div>
        <img src={platform} alt={platformAlt} className='w-5.5 rounded-sm' />
      </div>
      <CardContent className='flex flex-col gap-4'>
        <p>{children}</p>
        <span className='text-muted-foreground text-sm font-light uppercase'>{date}</span>
      </CardContent>
    </Card>
  </Card3DEffect>
)

export type TestimonialItem = {
  avatar: string
  fallback: string
  name: string
  handle: string
  platform: 'linkedin' | 'twitter' | string
  date: string
  content: string
}

const DEFAULT_FALLBACK_LIST: TestimonialItem[] = [
  {
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-11.png',
    fallback: 'AS',
    name: 'Arjun Sharma',
    handle: '@arjunbuilds · Founder, D2C Brand',
    platform: 'linkedin',
    date: 'Mar 10 2025',
    content: 'Apargo built our entire e-commerce platform in 8 weeks — headless storefront, WhatsApp cart recovery, and a custom CMS. The engineers were senior-level and communicated daily. No surprises on scope or cost.'
  },
  {
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-14.png',
    fallback: 'PM',
    name: 'Priya Mehta',
    handle: '@priyamehta · CTO, HealthStack',
    platform: 'twitter',
    date: 'Jan 22 2025',
    content: 'We needed a HIPAA-aware telemedicine app in a tight timeline. Apargo delivered a polished iOS + Android app with video consultations and patient records. Their attention to compliance details was impressive.'
  },
  {
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png',
    fallback: 'RV',
    name: 'Rahul Verma',
    handle: '@rahulv · Head of Product, FinServe',
    platform: 'linkedin',
    date: 'Nov 05 2024',
    content: 'Custom KYC and onboarding flow with document AI — exactly what we needed. They scoped it precisely, delivered on time, and the codebase they handed over was clean. Our internal team could pick it up immediately.'
  },
  {
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-18.png',
    fallback: 'AI',
    name: 'Ananya Iyer',
    handle: '@ananyaiyer · CEO, EduLeap',
    platform: 'twitter',
    date: 'Feb 14 2025',
    content: 'Our LMS went from prototype to 10,000 active students in four months. Apargo\'s AI-assisted doubt-solving feature is a genuine differentiator. They think like product builders, not just coders.'
  },
  {
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    fallback: 'VN',
    name: 'Vikram Nair',
    handle: '@vikramnair · Co-founder, PropDesk',
    platform: 'linkedin',
    date: 'Apr 01 2025',
    content: 'They built our real estate portal — property listings, broker CRM, and WhatsApp lead nurture — in a single sprint cycle. The fixed-quote model meant no billing surprises. Would absolutely work with them again.'
  },
  {
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-21.png',
    fallback: 'NS',
    name: 'Neha Singh',
    handle: '@nehasingh · Head of Eng, CloudOps',
    platform: 'twitter',
    date: 'Dec 18 2024',
    content: 'Apargo migrated our legacy monolith to microservices on AWS without a single hour of downtime. Their DevOps team knew what they were doing. Infrastructure-as-code, CI/CD, monitoring — all handed over cleanly.'
  },
  {
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-9.png',
    fallback: 'RK',
    name: 'Rohan Kapoor',
    handle: '@rohankapoor · CTO, SaaSly',
    platform: 'linkedin',
    date: 'Oct 30 2024',
    content: 'We hired Apargo to build our SaaS billing and subscription engine. They integrated Razorpay, built usage metering, and delivered a multi-tenant dashboard. Solid code, zero drama, full IP transfer.'
  },
  {
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-24.png',
    fallback: 'DK',
    name: 'Divya Krishnan',
    handle: '@divyak · PM, TravelNest',
    platform: 'twitter',
    date: 'Jan 08 2025',
    content: 'The booking engine and guest app they built for us handles peak traffic without breaking a sweat. Their UI/UX team nailed the hospitality feel without us having to explain it twice. Highly recommend.'
  },
  {
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    fallback: 'SJ',
    name: 'Siddharth Joshi',
    handle: '@sidjoshi · Founder, BrokerX',
    platform: 'linkedin',
    date: 'Mar 25 2025',
    content: 'We had a rough prototype and a 10-week deadline. Apargo restructured the architecture, shipped the MVP, and stayed on for post-launch support. The product now has 500+ brokers onboarded. Incredible team.'
  },
  {
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-27.png',
    fallback: 'MP',
    name: 'Meera Patel',
    handle: '@meerapatel · CEO, CareCircle',
    platform: 'twitter',
    date: 'Feb 03 2025',
    content: 'Healthcare software is hard to get right — compliance, integrations, data sensitivity. Apargo understood all of it without hand-holding. Our patient management system is now live across three hospitals.'
  },
  {
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
    fallback: 'AK',
    name: 'Aditya Kumar',
    handle: '@adityakumar · CTO, ShopBolt',
    platform: 'linkedin',
    date: 'Nov 20 2024',
    content: 'We needed a high-performance storefront that could handle flash sales. Apargo built it on Next.js with edge caching — our page load dropped from 4.2s to under 800ms. Conversion rate jumped 34% that quarter.'
  },
  {
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-30.png',
    fallback: 'KR',
    name: 'Kavya Reddy',
    handle: '@kavyareddy · Co-founder, LendSmart',
    platform: 'twitter',
    date: 'Jan 15 2025',
    content: 'Document AI for lending workflows is niche — most agencies don\'t understand financial compliance. Apargo did. They scoped it properly, built it correctly, and our loan processing time dropped by 60%.'
  }
]

const getPlatformIcon = (platform: string) => {
  if (platform?.toLowerCase() === 'linkedin') return linkedin
  if (platform?.toLowerCase() === 'twitter') return twitter
  return platform
}

const TestimonialsComponent = ({ testimonials }: { testimonials?: { items?: TestimonialItem[] } | TestimonialItem[] }) => {
  const rawItems = Array.isArray(testimonials)
    ? testimonials
    : (testimonials?.items || [])

  const finalTestimonials = rawItems.length > 0 ? rawItems : DEFAULT_FALLBACK_LIST

  // Distribute items into 3 columns
  const col1 = finalTestimonials.filter((_, idx) => idx % 3 === 0)
  const col2 = finalTestimonials.filter((_, idx) => idx % 3 === 1)
  const col3 = finalTestimonials.filter((_, idx) => idx % 3 === 2)

  return (
    <section className='relative overflow-hidden bg-[#e5e2da] py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 md:gap-16 lg:gap-24 lg:px-8'>
        {/* Header */}
        <div className='flex flex-col items-center space-y-4 text-center'>
          <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} transition={{ duration: 0.5 }}>
            <TextShimmer className='text-sm font-medium uppercase' duration={1.75}>
              Testimonials
            </TextShimmer>
          </MotionPreset>
          <MotionPreset
            component='h2'
            className='text-2xl font-medium sm:text-3xl lg:text-4xl'
            fade
            blur
            delay={0.2}
            slide={{ direction: 'down', offset: 50 }}
            transition={{ duration: 0.5 }}
          >
            What Our Clients Say
          </MotionPreset>
          <MotionPreset
            component='p'
            className='text-muted-foreground max-w-xl text-lg'
            fade
            blur
            delay={0.4}
            slide={{ direction: 'down', offset: 50 }}
            transition={{ duration: 0.5 }}
          >
            Founders and engineering leads share how Apargo turned their ideas into production software.
          </MotionPreset>
        </div>

        {/* Reviews */}
        <MotionPreset
          fade
          blur
          delay={0.8}
          slide={{ direction: 'down', offset: 50 }}
          transition={{ duration: 0.5 }}
          className='relative grid sm:grid-cols-2 lg:grid-cols-3'
        >
          <div className='absolute top-0 z-1 h-13 w-full bg-gradient-to-b from-[#e5e2da] to-transparent' />

          {/* Column 1 */}
          <Marquee vertical pauseOnHover delay={0.9} duration={70} gap={2} className='h-225 px-4'>
            {col1.map((item, idx) => (
              <TestimonialCard
                key={`col1-${idx}`}
                avatar={item.avatar}
                fallback={item.fallback || item.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                name={item.name}
                handle={item.handle}
                platform={getPlatformIcon(item.platform)}
                platformAlt={item.platform}
                date={item.date}
              >
                {item.content}
              </TestimonialCard>
            ))}
          </Marquee>

          {/* Column 2 */}
          <Marquee vertical pauseOnHover delay={0.9} duration={70} gap={2} reverse className='h-225 px-4 max-sm:hidden'>
            {col2.map((item, idx) => (
              <TestimonialCard
                key={`col2-${idx}`}
                avatar={item.avatar}
                fallback={item.fallback || item.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                name={item.name}
                handle={item.handle}
                platform={getPlatformIcon(item.platform)}
                platformAlt={item.platform}
                date={item.date}
              >
                {item.content}
              </TestimonialCard>
            ))}
          </Marquee>

          {/* Column 3 */}
          <Marquee vertical pauseOnHover delay={0.9} duration={70} gap={2} className='h-225 px-4 max-lg:hidden'>
            {col3.map((item, idx) => (
              <TestimonialCard
                key={`col3-${idx}`}
                avatar={item.avatar}
                fallback={item.fallback || item.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                name={item.name}
                handle={item.handle}
                platform={getPlatformIcon(item.platform)}
                platformAlt={item.platform}
                date={item.date}
              >
                {item.content}
              </TestimonialCard>
            ))}
          </Marquee>

          <div className='absolute bottom-0 z-1 h-13 w-full bg-gradient-to-t from-[#e5e2da] to-transparent' />
        </MotionPreset>
      </div>
    </section>
  )
}

export default TestimonialsComponent
