import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRightIcon, ArrowLeftIcon, QuoteIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { buttonVariants } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'
import { cn } from '@/lib/utils'
import { caseStudies } from '@/lib/case-studies'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'
import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cs = caseStudies.find((c) => c.slug === slug)
  if (!cs) return {}
  return {
    title: `${cs.title} | Case Study | Apargo`,
    description: cs.summary,
  }
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cs = caseStudies.find((c) => c.slug === slug)
  if (!cs) notFound()

  return (
    <div className='flex min-h-screen flex-col'>
      <SiteNavbar />

      {/* Hero */}
      <section className='from-primary/20 to-background flex flex-col bg-linear-to-bl to-50% py-20 lg:py-28'>
        <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
          <MotionPreset fade slide transition={{ duration: 0.5 }}>
            <Link
              href='/case-studies'
              className='mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
            >
              <ArrowLeftIcon className='size-3.5' />
              All case studies
            </Link>
          </MotionPreset>

          <MotionPreset fade slide delay={0.15} transition={{ duration: 0.5 }}>
            <Badge variant='outline' className='mb-4 text-sm font-normal uppercase tracking-wider'>
              {cs.industry}
            </Badge>
          </MotionPreset>

          <MotionPreset
            component='h1'
            fade
            slide
            delay={0.25}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl'
          >
            {cs.title}
          </MotionPreset>

          <MotionPreset fade slide delay={0.4} transition={{ duration: 0.5 }}>
            <p className='mt-4 text-lg leading-relaxed text-muted-foreground'>
              {cs.summary}
            </p>
          </MotionPreset>
        </div>
      </section>

      {/* Client Snapshot */}
      <section className='py-10 sm:py-14'>
        <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
          <Card className='border-border/80 shadow-none'>
            <CardContent className='grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-5'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>Client</p>
                <p className='mt-1 text-sm font-medium text-foreground'>{cs.client}</p>
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>Industry</p>
                <p className='mt-1 text-sm font-medium text-foreground'>{cs.industry}</p>
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>Engagement</p>
                <p className='mt-1 text-sm font-medium text-foreground'>{cs.engagementType}</p>
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>Timeline</p>
                <p className='mt-1 text-sm font-medium text-foreground'>{cs.timeline}</p>
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>Team</p>
                <p className='mt-1 text-sm font-medium text-foreground'>{cs.team}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Content */}
      <section className='pb-12 sm:pb-16'>
        <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
          <div className='legal-content'>
            <h2>The problem</h2>
            <p>{cs.problem}</p>

            <h2>The approach</h2>
            <p>{cs.approach}</p>

            <h2>What we built</h2>
            <ul>
              {cs.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className='bg-[#f5f5f0] py-12 sm:py-16'>
        <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
          <h2 className='mb-8 text-2xl font-bold'>Outcomes</h2>
          <div className='grid gap-5 sm:grid-cols-3'>
            {cs.outcomes.map((o, i) => (
              <Card key={i} className='border-none bg-white shadow-sm'>
                <CardContent className='p-6'>
                  <p className='text-2xl font-bold text-primary'>{o.value.split(' ')[0]}</p>
                  <p className='mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                    {o.metric}
                  </p>
                  <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>{o.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client Quote */}
      {cs.clientQuote && (
        <section className='py-12 sm:py-16'>
          <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
            <Card className='border-primary/15 bg-primary/5 shadow-none'>
              <CardContent className='p-8'>
                <QuoteIcon className='mb-4 size-8 text-primary/30' />
                <blockquote className='text-lg leading-relaxed font-medium text-foreground italic'>
                  &ldquo;{cs.clientQuote.quote}&rdquo;
                </blockquote>
                <Separator className='my-5' />
                <p className='text-sm font-semibold text-foreground'>
                  {cs.clientQuote.name}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {cs.clientQuote.role}, {cs.clientQuote.company}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Stack */}
      <section className='bg-[#f5f5f0] py-12 sm:py-16'>
        <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
          <h2 className='mb-8 text-2xl font-bold'>Stack used</h2>
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {cs.stack.map((s, i) => (
              <Card key={i} className='border-none bg-white shadow-sm'>
                <CardContent className='p-5'>
                  <p className='text-xs font-semibold uppercase tracking-wider text-primary'>
                    {s.category}
                  </p>
                  <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>{s.tech}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className='py-12 sm:py-16'>
        <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
          <h2 className='mb-6 text-2xl font-bold'>Related services</h2>
          <div className='flex flex-wrap gap-3'>
            {cs.relatedServices.map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'rounded-full'
                )}
              >
                {svc.name}
                <ArrowRightIcon className='size-4' />
              </Link>
            ))}
          </div>

          <Separator className='my-10' />

          <Link
            href='/contact'
            className={cn(
              buttonVariants({ size: 'lg' }),
              'rounded-full px-8 text-base'
            )}
          >
            Start a similar project
            <ArrowRightIcon className='size-4' />
          </Link>
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
