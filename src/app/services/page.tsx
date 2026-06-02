import { BookOpenIcon, CodeIcon, PenToolIcon, RocketIcon, SparklesIcon, ZapIcon } from 'lucide-react'
import React from 'react'
import { Metadata } from 'next'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'
import Features05 from '@/components/shadcn-studio/blocks/features-section-05/features-section-05'
import Features12 from '@/components/shadcn-studio/blocks/features-section-12/features-section-12'
import Header from '@/components/shadcn-studio/blocks/hero-section-33/header'
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-33/hero-section-33'
import JourneyTimeline from '@/components/shadcn-studio/blocks/timeline-component-02/timeline-component-02'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-navigation-02'
import { BentoGrid } from '@/components/BentoGrid'
import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'IT Services — Web, Mobile, AI & SaaS Development | Apargo',
  description: 'Apargo offers full-stack product engineering services — web and mobile development, AI integration, SaaS product development, cloud and DevOps. Built by the team behind AI Greentick.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'IT Services — Web, Mobile, AI & SaaS Development | Apargo',
    description: 'Apargo offers full-stack product engineering services — web and mobile development, AI integration, SaaS product development, cloud and DevOps. Built by the team behind AI Greentick.',
    url: '/services',
    type: 'website',
  }
}


const navigationData: Navigation[] = [
  {
    title: 'Home',
    href: '#'
  },
  {
    title: 'Features',
    subtitle: 'Core Features',
    imgSubtitle: 'Workflow',
    contentClassName: '!w-130',
    items: [
      {
        icon: <PenToolIcon className='size-4' />,
        title: 'Figma Integration',
        href: '#',
        description: 'Turn Figma designs into clean, production-ready code instantly'
      },
      {
        icon: <CodeIcon className='size-4' />,
        title: 'Code Generation',
        href: '#',
        description: 'Save hours of manual development with automated code export'
      },
      {
        icon: <ZapIcon className='size-4' />,
        title: 'Fast Deployment',
        href: '#',
        description: 'From design to production in just a few clicks'
      }
    ],
    imageSection: {
      img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/hero/image-69.png',
      href: '#',
      title: 'Design to Code',
      description: 'Seamless workflow from Figma to production'
    }
  },
  {
    title: 'Resources',
    contentClassName: '!w-80',
    items: [
      {
        icon: <BookOpenIcon className='size-4' />,
        title: 'Documentation',
        href: '#',
        description: 'Comprehensive guides for quick setup and easy dev'
      },
      {
        icon: <RocketIcon className='size-4' />,
        title: 'Get Started',
        href: '#',
        description: 'Start now and learn more about our platform'
      },
      {
        icon: <SparklesIcon className='size-4' />,
        title: 'Templates',
        href: '#',
        description: 'Pre-built templates for faster development'
      }
    ]
  },
  {
    title: 'Company',
    contentClassName: '!w-42',
    items: [
      {
        title: 'About Us',
        href: '#'
      },
      {
        title: 'Pricing',
        href: '#'
      },
      {
        title: 'Testimonials',
        href: '#'
      },
      {
        title: 'Contact',
        href: '#'
      }
    ]
  }
]

const testimonials = [
  {
    name: 'Paityn Lipshutz',
    role: 'CEO at Lemonsqueezy',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png?width=40&height=40&format=auto',
    rating: 4,
    content:
      'Excellent product—durable, intuitive, and exactly what I needed. Customer service was outstanding and very helpful.'
  },
  {
    name: 'Angel Lubin',
    role: 'Co Founder at Zipline',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-17.png?width=40&height=40&format=auto',
    rating: 5,
    content:
      'Top-notch quality—easy to set up and performs as promised. The support team was incredibly responsive and attentive'
  },
  {
    name: 'Lincoln Stanton',
    role: 'CEO at Gumroad',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png?width=40&height=40&format=auto',
    rating: 5,
    content:
      'Amazing product—well-built, user-friendly, and just as advertised. The service team exceeded my expectations'
  },
  {
    name: 'Skylar Lipshutz',
    role: 'Product manager at Orbit',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-12.png?width=40&height=40&format=auto',
    rating: 4.5,
    content:
      'Outstanding product—well-crafted, user-friendly, and exactly what I expected. The team went above and beyond to help.'
  }
]

const faqItems = [
  {
    icon: CodeIcon,
    title: 'Fixed scope',
    description:
      'Best for projects with a clear deliverable - a website, an MVP, a specific module. We give a fixed price and timeline after scoping.',
    goodFor: 'Founders with a clear spec or a discovery doc',
    typicalLength: '4 to 16 weeks'
  },
  {
    icon: RocketIcon,
    title: 'Dedicated team',
    description:
      'Best for products that need ongoing engineering. You get a pod - engineers, designer, PM - that works only on your product, in your time zone.',
    goodFor: 'Funded startups and SMBs scaling a product',
    typicalLength: '3 to 12 months, rolling'
  },
  {
    icon: SparklesIcon,
    title: 'Staff augmentation',
    description:
      'Best when your in-house team needs extra hands fast. We slot one or more senior engineers into your existing workflow and tools.',
    goodFor: 'Teams in a hiring crunch or facing a deadline',
    typicalLength: '1 to 6 months'
  }
]

const data = [
  {
    title: 'January, 2026',
    content: (
      <div>
        <Card className='mb-8 overflow-hidden md:max-w-136'>
          <CardContent className='space-y-4'>
            <CardTitle className='text-lg font-medium md:text-xl lg:text-2xl'>A Dream That Started at Home</CardTitle>
            <p className='text-muted-foreground'>
              With nothing but two people, a single desk, and a shared vision, we began building something we believed
              could make a difference.
            </p>
            <div className='flex flex-wrap items-center gap-3'>
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/timeline/image-09.png'
                className='h-17 rounded-md object-contain'
                alt='Elver Buds X True Wireless Earbuds'
              />
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/timeline/image-08.png'
                className='h-17 rounded-md object-contain'
                alt='Elver Buds X True Wireless Earbuds'
              />
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/timeline/image-07.png'
                className='h-17 rounded-md object-contain'
                alt='Elver Buds X True Wireless Earbuds'
              />
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/timeline/image-06.png'
                className='h-17 rounded-md object-contain'
                alt='Elver Buds X True Wireless Earbuds'
              />
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/timeline/image-05.png'
                className='h-17 rounded-md object-contain'
                alt='Elver Buds X True Wireless Earbuds'
              />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
  {
    title: 'June, 2017',
    content: (
      <div>
        <Card className='mb-8 overflow-hidden md:max-w-136'>
          <CardContent className='space-y-4'>
            <CardTitle className='text-lg font-medium md:text-xl lg:text-2xl'>First Big Win</CardTitle>
            <p className='text-muted-foreground'>
              We delivered our first major project the moment that transformed our small idea into a real business.
              Clients noticed our dedication, and word spread quickly.
            </p>
            <div className='flex items-center gap-3'>
              <Avatar className='size-11 rounded-sm'>
                <AvatarFallback className='shrink-0 rounded-sm bg-sky-600/10'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                    <path
                      d='M8.04299 9.38328H6.4732C5.93678 9.38328 5.66857 9.38328 5.43188 9.27515C5.19518 9.167 5.01802 8.96353 4.6637 8.55658L3.63343 7.3733C3.45629 7.16985 3.36769 7.06809 3.24935 7.01403C3.13099 6.95996 2.99689 6.95996 2.72868 6.95996H2.62756C1.85171 6.95996 1.46377 6.95996 1.2837 7.21723C1.10363 7.4745 1.23287 7.84409 1.49134 8.58325L2.54424 11.5943C2.61446 11.7951 2.64958 11.8956 2.64958 11.9999C2.64958 12.1043 2.61446 12.2047 2.54426 12.4055L1.49134 15.4167C1.23287 16.1559 1.10363 16.5255 1.2837 16.7826C1.46378 17.0399 1.8517 17.0399 2.62756 17.0399H2.72869C2.99689 17.0399 3.13099 17.0399 3.24935 16.9859C3.36769 16.9318 3.45628 16.83 3.63343 16.6266L4.6637 15.4433C5.01803 15.0364 5.19518 14.8329 5.43188 14.7247C5.66857 14.6166 5.93678 14.6166 6.4732 14.6166H8.04299C8.39351 14.6166 8.65273 14.6166 8.84621 14.6477H15.1248C15.2583 14.6166 15.405 14.6166 15.6984 14.6166H18.3093C19.7284 14.6166 21.1053 14.1286 22.2135 13.2328C22.9954 12.6007 22.9954 11.3992 22.2135 10.7671C21.1053 9.87132 19.7284 9.38328 18.3093 9.38328H15.6984C15.405 9.38328 15.2583 9.38328 15.1248 9.35217L8.8462 9.35221C8.65272 9.38331 8.39351 9.38328 8.04299 9.38328Z'
                      fill='#0284C7'
                      fillOpacity='0.3'
                    />
                    <path
                      d='M10.8769 21.7581L14.1905 15.5272C14.3294 15.2661 14.3988 15.1356 14.4892 15.0315C14.6559 14.8392 14.8782 14.7048 15.1248 14.6475H8.84624C9.0242 14.676 9.14654 14.731 9.23312 14.8365C9.41381 15.0565 9.35165 15.3906 9.22732 16.0589L8.19118 21.6281C8.11448 22.0404 8.07613 22.2466 8.13617 22.4067C8.18362 22.533 8.27137 22.6399 8.38558 22.7104C8.53017 22.7997 8.73777 22.7997 9.15292 22.7997C9.58906 22.7997 9.80716 22.7997 10.0003 22.7314C10.1544 22.6769 10.296 22.5915 10.4164 22.48C10.5673 22.3404 10.6705 22.1463 10.8769 21.7581Z'
                      fill='#0284C7'
                    />
                    <path
                      d='M10.8769 2.24171L14.1906 8.47263C14.3294 8.73369 14.3988 8.86422 14.4892 8.9684C14.6559 9.16062 14.8782 9.29496 15.1248 9.35238H8.84623C9.02419 9.32376 9.14653 9.26883 9.23311 9.16337C9.41381 8.94326 9.35165 8.60913 9.22732 7.94088L8.19118 2.37168C8.11447 1.95941 8.07612 1.75326 8.13618 1.5932C8.18362 1.46675 8.27136 1.35987 8.38558 1.2894C8.53017 1.2002 8.73777 1.2002 9.15292 1.2002C9.58906 1.2002 9.80716 1.2002 10.0003 1.2684C10.1544 1.32285 10.296 1.40837 10.4164 1.51978C10.5672 1.65938 10.6705 1.8535 10.8769 2.24171Z'
                      fill='#0284C7'
                    />
                  </svg>
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <span className='text-card-foreground font-medium'>South Airlines</span>
                <span className='text-muted-foreground text-sm'>Online flight booking</span>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <Avatar className='size-11 rounded-sm'>
                <AvatarFallback className='shrink-0 rounded-sm bg-green-600/10'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M4.73921 1.68901C7.09714 0.782439 9.91183 1.07789 12 3.07332C14.0881 1.07789 16.9028 0.782439 19.2608 1.68901C21.8898 2.69981 24 5.21801 24 8.53156C24 11.0615 22.859 13.3422 21.2965 15.3453C19.7342 17.3481 17.6916 19.1484 15.7633 20.7264L15.7196 20.7621C14.998 21.3528 14.392 21.8487 13.8526 22.1898C13.2814 22.5508 12.6924 22.8002 12 22.8002C11.3076 22.8002 10.7187 22.5508 10.1474 22.1898C9.60804 21.8487 9.00205 21.3528 8.28032 20.7621L8.23663 20.7264C6.30842 19.1484 4.26577 17.3481 2.70352 15.3453C1.141 13.3422 0 11.0615 0 8.53156C0 5.21801 2.11021 2.69981 4.73921 1.68901Z'
                      fill='#16A34A'
                      fillOpacity='0.3'
                    />
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M10.731 7.23516C11.0942 7.22039 11.4324 7.41545 11.595 7.73344L13.7526 11.954L14.22 10.8112C14.3601 10.4685 14.6996 10.2437 15.077 10.2437H18.1539C18.6637 10.2437 19.077 10.6479 19.077 11.1465C19.077 11.6451 18.6637 12.0493 18.1539 12.0493H15.702L14.7033 14.4912C14.5683 14.8213 14.2478 15.0432 13.8846 15.0579C13.5215 15.0727 13.1832 14.8776 13.0206 14.5595L10.863 10.3391L10.3956 11.4818C10.2554 11.8246 9.91602 12.0493 9.53857 12.0493H6.46165C5.95184 12.0493 5.53857 11.6451 5.53857 11.1465C5.53857 10.6479 5.95184 10.2437 6.46165 10.2437H8.91361L9.91229 7.80188C10.0473 7.4718 10.3678 7.24993 10.731 7.23516Z'
                      fill='#16A34A'
                    />
                  </svg>
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <span className='text-card-foreground font-medium'>Heath care mobile app</span>
                <span className='text-muted-foreground text-sm'>Online book doctors appoints </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
  {
    title: 'May, 2015',
    content: (
      <div>
        <Card className='mb-8 overflow-hidden md:max-w-136'>
          <CardContent className='space-y-4'>
            <CardTitle className='text-lg font-medium md:text-xl lg:text-2xl'>Recognised & Featured</CardTitle>
            <p className='text-muted-foreground'>
              Our consistent quality brought attention. We were featured in tech media and earned our first award,
              boosting our confidence to aim even higher.
            </p>
            <div className='flex flex-wrap items-center gap-3'>
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/timeline/image-11.png'
                className='size-12.5 rounded-md border object-contain'
                alt='Award 1'
              />
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/timeline/image-10.png'
                className='size-12.5 rounded-md border object-contain'
                alt='Award 2'
              />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
  {
    title: 'January, 2010',
    content: (
      <div>
        <Card className='mb-8 overflow-hidden md:max-w-136'>
          <CardContent className='space-y-4'>
            <CardTitle className='text-lg font-medium md:text-xl lg:text-2xl'>Launching Our 2 Products</CardTitle>
            <p className='text-muted-foreground'>
              What began in a home finally found a real address. We opened our first office a space filled with energy,
              ideas, and the start of our growing culture.
            </p>
            <div className='flex flex-wrap items-center gap-3.5'>
              <div className='bg-muted flex w-25 flex-col items-center justify-center gap-1.5 rounded-[10px] px-2 py-3.25'>
                <img
                  src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/timeline/image-01.png'
                  className='size-8 rounded-md object-contain'
                  alt='FlyonUI'
                />
                <p className='text-xs font-medium'>FlyonUI</p>
              </div>
              <div className='bg-muted flex w-25 flex-col items-center justify-center gap-1.5 rounded-[10px] px-2 py-3.25'>
                <img
                  src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/timeline/image-02.png'
                  className='size-8 rounded-md object-contain'
                  alt='Shadcn Studio'
                />
                <p className='text-xs font-medium'>Shadcn Studio</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
  {
    title: 'June, 2005',
    content: (
      <div>
        <Card className='mb-8 overflow-hidden md:max-w-136'>
          <CardContent className='space-y-4'>
            <CardTitle className='text-lg font-medium md:text-xl lg:text-2xl'>A Team of 20+ Innovators</CardTitle>
            <p className='text-muted-foreground'>
              Our family grew beyond expectations. With 50+ skilled developers, designers, and strategists, we began
              delivering digital solutions across global markets.
            </p>
            <div className='flex -space-x-2 hover:space-x-1'>
              <Avatar className='ring-background size-12 ring-2 transition-all duration-300 ease-in-out'>
                <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png' alt='Olivia Sparks' />
                <AvatarFallback className='text-xs'>OS</AvatarFallback>
              </Avatar>
              <Avatar className='ring-background size-12 ring-2 transition-all duration-300 ease-in-out'>
                <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png' alt='Olivia Sparks' />
                <AvatarFallback className='text-xs'>OS</AvatarFallback>
              </Avatar>
              <Avatar className='ring-background size-12 ring-2 transition-all duration-300 ease-in-out'>
                <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png' alt='Olivia Sparks' />
                <AvatarFallback className='text-xs'>OS</AvatarFallback>
              </Avatar>
              <Avatar className='ring-background size-12 ring-2 transition-all duration-300 ease-in-out'>
                <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png' alt='Olivia Sparks' />
                <AvatarFallback className='text-xs'>OS</AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
]

const deliveryProcess = [
  {
    title: 'Step 01',
    content: (
      <Card className='mb-8 overflow-hidden md:max-w-136'>
        <CardContent className='space-y-3'>
          <div className='flex items-center gap-3'>
            <Avatar className='size-11 rounded-sm'>
              <AvatarFallback className='shrink-0 rounded-sm bg-primary/10 text-primary'>
                <BookOpenIcon className='size-5' />
              </AvatarFallback>
            </Avatar>
            <CardTitle className='text-lg font-medium md:text-xl lg:text-2xl'>Discovery call</CardTitle>
          </div>
          <p className='text-muted-foreground'>30 to 45 minutes, free, no slides.</p>
        </CardContent>
      </Card>
    )
  },
  {
    title: 'Step 02',
    content: (
      <Card className='mb-8 overflow-hidden md:max-w-136'>
        <CardContent className='space-y-3'>
          <div className='flex items-center gap-3'>
            <Avatar className='size-11 rounded-sm'>
              <AvatarFallback className='shrink-0 rounded-sm bg-primary/10 text-primary'>
                <PenToolIcon className='size-5' />
              </AvatarFallback>
            </Avatar>
            <CardTitle className='text-lg font-medium md:text-xl lg:text-2xl'>Written scoping doc</CardTitle>
          </div>
          <p className='text-muted-foreground'>What&apos;s in, what&apos;s out, milestones, fixed quote.</p>
        </CardContent>
      </Card>
    )
  },
  {
    title: 'Step 03',
    content: (
      <Card className='mb-8 overflow-hidden md:max-w-136'>
        <CardContent className='space-y-3'>
          <div className='flex items-center gap-3'>
            <Avatar className='size-11 rounded-sm'>
              <AvatarFallback className='shrink-0 rounded-sm bg-primary/10 text-primary'>
                <RocketIcon className='size-5' />
              </AvatarFallback>
            </Avatar>
            <CardTitle className='text-lg font-medium md:text-xl lg:text-2xl'>Kickoff</CardTitle>
          </div>
          <p className='text-muted-foreground'>Slack channel, project board, weekly demo schedule.</p>
        </CardContent>
      </Card>
    )
  },
  {
    title: 'Step 04',
    content: (
      <Card className='mb-8 overflow-hidden md:max-w-136'>
        <CardContent className='space-y-3'>
          <div className='flex items-center gap-3'>
            <Avatar className='size-11 rounded-sm'>
              <AvatarFallback className='shrink-0 rounded-sm bg-primary/10 text-primary'>
                <ZapIcon className='size-5' />
              </AvatarFallback>
            </Avatar>
            <CardTitle className='text-lg font-medium md:text-xl lg:text-2xl'>Sprints</CardTitle>
          </div>
          <p className='text-muted-foreground'>Weekly demos on real preview links, async updates daily.</p>
        </CardContent>
      </Card>
    )
  },
  {
    title: 'Step 05',
    content: (
      <Card className='mb-8 overflow-hidden md:max-w-136'>
        <CardContent className='space-y-3'>
          <div className='flex items-center gap-3'>
            <Avatar className='size-11 rounded-sm'>
              <AvatarFallback className='shrink-0 rounded-sm bg-primary/10 text-primary'>
                <CodeIcon className='size-5' />
              </AvatarFallback>
            </Avatar>
            <CardTitle className='text-lg font-medium md:text-xl lg:text-2xl'>Launch</CardTitle>
          </div>
          <p className='text-muted-foreground'>Code handover, deployment, training, runbooks.</p>
        </CardContent>
      </Card>
    )
  },
  {
    title: 'Step 06',
    content: (
      <Card className='mb-8 overflow-hidden md:max-w-136'>
        <CardContent className='space-y-3'>
          <div className='flex items-center gap-3'>
            <Avatar className='size-11 rounded-sm'>
              <AvatarFallback className='shrink-0 rounded-sm bg-primary/10 text-primary'>
                <SparklesIcon className='size-5' />
              </AvatarFallback>
            </Avatar>
            <CardTitle className='text-lg font-medium md:text-xl lg:text-2xl'>Post-launch support</CardTitle>
          </div>
          <p className='text-muted-foreground'>Flexible window or full retainer.</p>
        </CardContent>
      </Card>
    )
  }
]

const HeroSection33Block = () => {
  return (
    <div className='bg-muted flex flex-col'>
      {/* Main Content */}
      <main className='flex flex-col'>
        <HeroSection testimonials={testimonials} />
      </main>
    </div>
  )
}

const FeaturesSection12Block = () => {
  return <Features12 />
}

const FeaturesSection05Block = () => {
  return <Features05 featuresList={faqItems} />
}

const TimelineComponent02Block = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <JourneyTimeline data={deliveryProcess} />
    </div>
  )
}

const CtaSection11Block = () => {
  return (
    <CTA
      heading='Not sure which service fits?'
      description="Book a 30-minute call. We'll listen, ask annoyingly specific questions, and tell you honestly whether and how we can help."
      buttonText='Book a Discovery Call'
      showServiceTags={false}
    />
  )
}

const LandingPage = () => {
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Apargo Innovations - IT & Product Engineering Services",
    "description": "Apargo Innovations offers a full range of custom software engineering services including web development, mobile apps, custom SaaS engines, practical AI integration, and dedicated developer augmentation.",
    "url": "https://www.apargoinnovations.com/services",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Service",
          "name": "Web Development",
          "url": "https://www.apargoinnovations.com/services/web-development"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Service",
          "name": "Mobile App Development",
          "url": "https://www.apargoinnovations.com/services/mobile-app-development"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Service",
          "name": "Custom Software Development",
          "url": "https://www.apargoinnovations.com/services/custom-software"
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Service",
          "name": "AI & Machine Learning",
          "url": "https://www.apargoinnovations.com/services/ai-machine-learning"
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "Service",
          "name": "SaaS Product Development",
          "url": "https://www.apargoinnovations.com/services/saas-product-development"
        }
      },
      {
        "@type": "ListItem",
        "position": 6,
        "item": {
          "@type": "Service",
          "name": "Cloud & DevOps",
          "url": "https://www.apargoinnovations.com/services/cloud-devops"
        }
      },
      {
        "@type": "ListItem",
        "position": 7,
        "item": {
          "@type": "Service",
          "name": "UI/UX Design",
          "url": "https://www.apargoinnovations.com/services/ui-ux-design"
        }
      },
      {
        "@type": "ListItem",
        "position": 8,
        "item": {
          "@type": "Service",
          "name": "Digital Marketing & SEO",
          "url": "https://www.apargoinnovations.com/services/digital-marketing-seo"
        }
      },
      {
        "@type": "ListItem",
        "position": 9,
        "item": {
          "@type": "Service",
          "name": "IT Consulting",
          "url": "https://www.apargoinnovations.com/services/it-consulting"
        }
      }
    ]
  }

  return (
    <div className='flex flex-col'>
      <JsonLd data={servicesSchema} />
      <SiteNavbar />

      <HeroSection33Block />

      <BentoGrid />

      <FeaturesSection05Block />

      <TimelineComponent02Block />

      <CtaSection11Block />

      <Footer />
    </div>
  )
}

export default LandingPage
