import type { ComponentType } from 'react'

import { ArrowRightIcon, CheckIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import { cn } from '@/lib/utils'

import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'
import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'

type IndustryDetailProps = {
  eyebrow: string
  h1: string
  subHeadline: string
  sectionTitle: string
  buildItems: { title: string; description: string }[]
  extraSections?: {
    title: string
    items: string[]
  }[]
  typicalProjects?: string[]
  ctaHeading: string
  ctaButtonText: string
  accentColor?: string
}

const IndustryDetailPage = ({
  eyebrow,
  h1,
  subHeadline,
  sectionTitle,
  buildItems,
  extraSections,
  typicalProjects,
  ctaHeading,
  ctaButtonText,
  accentColor = 'primary',
}: IndustryDetailProps) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <SiteNavbar />

      {/* Hero */}
      <section className='from-primary/20 to-background flex flex-col bg-linear-to-bl to-50% py-24 lg:py-32'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='max-w-3xl space-y-8'>
            <MotionPreset
              fade
              slide
              transition={{ duration: 0.5 }}
            >
              <Badge variant='outline' className='text-sm font-normal uppercase tracking-wider'>
                {eyebrow}
              </Badge>
            </MotionPreset>

            <MotionPreset
              component='h1'
              fade
              slide
              delay={0.3}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className='text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl'
            >
              {h1}
            </MotionPreset>

            <MotionPreset
              component='p'
              fade
              slide
              delay={0.6}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className='text-muted-foreground text-lg leading-relaxed'
            >
              {subHeadline}
            </MotionPreset>
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className='py-12 sm:py-16 lg:py-24'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mb-12 max-w-3xl space-y-4 sm:mb-16'>
            <p className='text-primary text-sm font-semibold uppercase tracking-wide'>What we build</p>
            <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>{sectionTitle}</h2>
          </div>

          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {buildItems.map((item, index) => (
              <MotionPreset
                key={index}
                fade
                slide={{ direction: 'up', offset: 20 }}
                delay={index * 0.08}
                transition={{ duration: 0.5 }}
              >
                <Card className='h-full shadow-none transition-colors duration-300 border-border/60 hover:border-primary/40'>
                  <CardContent className='flex h-full flex-col gap-3 p-6'>
                    <h3 className='text-lg font-semibold'>{item.title}</h3>
                    <p className='text-muted-foreground text-[15px] leading-relaxed'>{item.description}</p>
                  </CardContent>
                </Card>
              </MotionPreset>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Sections (Integrations, Compliance, etc.) */}
      {extraSections && extraSections.length > 0 && (
        <section className='bg-[#e5e2da] py-12 sm:py-16 lg:py-24'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className={`grid gap-12 ${extraSections.length > 1 ? 'lg:grid-cols-2' : ''}`}>
              {extraSections.map((section, sIdx) => (
                <MotionPreset
                  key={sIdx}
                  fade
                  slide={{ direction: 'up', offset: 20 }}
                  delay={sIdx * 0.15}
                  transition={{ duration: 0.5 }}
                >
                  <div className='space-y-6'>
                    <h3 className='text-xl font-semibold md:text-2xl'>{section.title}</h3>
                    <ul className='space-y-3'>
                      {section.items.map((item, iIdx) => (
                        <li key={iIdx} className='flex items-start gap-3'>
                          <div className='mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15'>
                            <CheckIcon className='size-3 text-primary' />
                          </div>
                          <span className='text-[15px] leading-relaxed'>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </MotionPreset>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Typical Projects */}
      {typicalProjects && typicalProjects.length > 0 && (
        <section className='py-12 sm:py-16 lg:py-24'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='mb-12 max-w-3xl space-y-4 sm:mb-16'>
              <p className='text-primary text-sm font-semibold uppercase tracking-wide'>Track record</p>
              <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Typical projects</h2>
            </div>
            <div className='grid gap-5 sm:grid-cols-2'>
              {typicalProjects.map((project, index) => (
                <MotionPreset
                  key={index}
                  fade
                  slide={{ direction: 'up', offset: 20 }}
                  delay={index * 0.1}
                  transition={{ duration: 0.5 }}
                >
                  <Card className='h-full shadow-none border-border/60'>
                    <CardContent className='flex items-start gap-4 p-6'>
                      <div className='mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10'>
                        <ArrowRightIcon className='size-3.5 text-primary' />
                      </div>
                      <p className='text-[15px] leading-relaxed'>{project}</p>
                    </CardContent>
                  </Card>
                </MotionPreset>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTA
        heading={ctaHeading}
        description="Let's discuss your requirements."
        buttonText={ctaButtonText}
        showServiceTags={false}
      />

      <Footer />
    </div>
  )
}

export default IndustryDetailPage
