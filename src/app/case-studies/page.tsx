'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRightIcon,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'
import { cn } from '@/lib/utils'
import {
  caseStudies,
  industries,
  techFilters,
  serviceFilters,
} from '@/lib/case-studies'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'
import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'

const CaseStudiesPage = () => {
  const [activeIndustry, setActiveIndustry] = useState('All')
  const [activeTech, setActiveTech] = useState('All')
  const [activeService, setActiveService] = useState('All')

  const filtered = caseStudies.filter((cs) => {
    const industryMatch = activeIndustry === 'All' || cs.industry === activeIndustry
    const techMatch = activeTech === 'All' || cs.techTags.includes(activeTech)
    const serviceMatch = activeService === 'All' || cs.serviceTags.includes(activeService)
    return industryMatch && techMatch && serviceMatch
  })

  return (
    <div className='flex min-h-screen flex-col'>
      <SiteNavbar />

      {/* Hero */}
      <section className='from-primary/20 to-background flex flex-col bg-linear-to-bl to-50% py-24 lg:py-32'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-3xl space-y-8 text-center'>
            <MotionPreset fade slide transition={{ duration: 0.5 }} className='flex justify-center'>
              <Badge variant='outline' className='text-sm font-normal uppercase tracking-wider'>
                Work
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
              Real projects, real outcomes.
            </MotionPreset>

            <MotionPreset
              component='p'
              fade
              slide
              delay={0.6}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className='text-muted-foreground text-lg leading-relaxed'
            >
              Selected work from the Apargo team — clients we can name and a few we can&apos;t. Sorted by industry and tech, so you can find something close to your problem.
            </MotionPreset>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className='py-12 sm:py-16 lg:py-24'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* Filters */}
          <div className='mb-12 space-y-5'>
            {/* Industry */}
            <div className='flex flex-wrap items-center gap-2'>
              <span className='mr-2 text-sm font-semibold text-foreground'>Industry:</span>
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setActiveIndustry(ind)}
                  className={cn(
                    'rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200',
                    activeIndustry === ind
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  )}
                >
                  {ind}
                </button>
              ))}
            </div>

            {/* Tech */}
            <div className='flex flex-wrap items-center gap-2'>
              <span className='mr-2 text-sm font-semibold text-foreground'>Tech:</span>
              {techFilters.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setActiveTech(tech)}
                  className={cn(
                    'rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200',
                    activeTech === tech
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  )}
                >
                  {tech}
                </button>
              ))}
            </div>

            {/* Service */}
            <div className='flex flex-wrap items-center gap-2'>
              <span className='mr-2 text-sm font-semibold text-foreground'>Service:</span>
              {serviceFilters.map((svc) => (
                <button
                  key={svc}
                  onClick={() => setActiveService(svc)}
                  className={cn(
                    'rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200',
                    activeService === svc
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  )}
                >
                  {svc}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              {filtered.map((cs, idx) => (
                <MotionPreset
                  key={cs.slug}
                  fade
                  slide={{ direction: 'up', offset: 20 }}
                  delay={idx * 0.08}
                  transition={{ duration: 0.5 }}
                >
                  <Link href={`/case-studies/${cs.slug}`} className='group block h-full'>
                    <Card className='h-full overflow-hidden border-border/80 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_18px_50px_rgba(14,20,16,0.08)]'>
                      {/* Cover */}
                      <div className='relative aspect-[16/10] overflow-hidden bg-muted'>
                        <div className='flex size-full items-center justify-center bg-gradient-to-br from-primary/10 via-muted to-secondary'>
                          <span className='text-5xl font-bold text-primary/20'>
                            {cs.industry.charAt(0)}
                          </span>
                        </div>
                        <Badge className='absolute left-3 top-3 bg-foreground/80 text-background text-xs'>
                          {cs.industry}
                        </Badge>
                      </div>

                      <CardContent className='flex flex-col gap-4 p-5'>
                        <h3 className='text-lg font-bold leading-snug group-hover:text-primary transition-colors duration-200'>
                          {cs.headline}
                        </h3>

                        {/* Quick stats */}
                        <div className='flex flex-wrap gap-2'>
                          {cs.quickStats.map((stat) => (
                            <Badge
                              key={stat}
                              variant='secondary'
                              className='text-xs font-medium'
                            >
                              {stat}
                            </Badge>
                          ))}
                        </div>

                        <span className='mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary'>
                          Read case study
                          <ArrowRightIcon className='size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </MotionPreset>
              ))}
            </div>
          ) : (
            <div className='py-20 text-center'>
              <p className='text-muted-foreground text-lg'>No case studies match the selected filters.</p>
              <button
                onClick={() => {
                  setActiveIndustry('All')
                  setActiveTech('All')
                  setActiveService('All')
                }}
                className='mt-4 text-primary font-medium underline underline-offset-4 hover:opacity-80'
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <CTA
        heading='Want to be the next case study?'
        description="Tell us what you're building and we'll show you how we can help."
        buttonText='Start a Project'
        buttonHref='/contact'
        showServiceTags={false}
      />

      <Footer />
    </div>
  )
}

export default CaseStudiesPage
