import { Metadata } from 'next'
import { ArrowRightIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MotionPreset } from '@/components/ui/motion-preset'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'
import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'
import { industries } from '@/data/industries'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Industries We Serve — E-commerce, Healthcare, EdTech, FinTech | Apargo',
  description:
    'Apargo builds software for E-commerce, Healthcare, Education, Real Estate, FinTech and Travel businesses. Domain-aware engineering, not generic dev shop work.',
  alternates: {
    canonical: '/industries',
  },
  openGraph: {
    title: 'Industries We Serve — E-commerce, Healthcare, EdTech, FinTech | Apargo',
    description:
      'Apargo builds software for E-commerce, Healthcare, Education, Real Estate, FinTech and Travel businesses. Domain-aware engineering, not generic dev shop work.',
    url: '/industries',
    type: 'website',
  }
}

const IndustriesPage = () => {
  const industriesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Apargo Innovations Industries Served",
    "description": "Industries in which Apargo Innovations provides custom software development, mobile apps, and cloud integration solutions.",
    "numberOfItems": industries.length,
    "itemListElement": industries.map((ind, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": ind.name,
      "url": `https://www.apargoinnovations.com${ind.href}`
    }))
  }

  return (
    <div className='flex min-h-screen flex-col'>
      <JsonLd data={industriesSchema} />
      <SiteNavbar />

      {/* Hero */}
      <section className='from-primary/20 to-background flex flex-col bg-linear-to-bl to-50% py-24 lg:py-32'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-3xl space-y-8 text-center'>
            <MotionPreset
              fade
              slide
              transition={{ duration: 0.5 }}
              className='flex justify-center'
            >
              <Badge variant='outline' className='text-sm font-normal uppercase tracking-wider'>
                Industries
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
              We don&apos;t pretend to know every industry. We know these six well.
            </MotionPreset>

            <MotionPreset
              component='p'
              fade
              slide
              delay={0.6}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className='text-muted-foreground text-lg leading-relaxed'
            >
              Generic agencies say they serve every industry. We&apos;ve shipped repeatedly in six — which means we understand the compliance, the integrations and the user behaviour that comes with each. If your domain isn&apos;t on this list, talk to us anyway — we&apos;ll tell you honestly.
            </MotionPreset>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className='py-12 sm:py-16 lg:py-24'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {industries.map((industry, index) => (
              <MotionPreset
                key={index}
                fade
                slide={{ direction: 'up', offset: 30 }}
                delay={index * 0.1}
                transition={{ duration: 0.5 }}
              >
                <a href={industry.href} className='group block h-full'>
                  <Card className={`h-full border-2 shadow-none transition-all duration-300 ${industry.borderColor} ${industry.hoverBg}`}>
                    <CardContent className='flex h-full flex-col gap-5 p-8'>
                      <div className={`flex size-14 items-center justify-center rounded-xl ${industry.bgColor}`}>
                        <industry.icon className={`size-7 ${industry.color}`} />
                      </div>
                      <div className='flex-1 space-y-2'>
                        <h3 className='text-xl font-bold'>{industry.name}</h3>
                        <p className='text-muted-foreground leading-relaxed'>{industry.description}</p>
                      </div>
                      <div className={`flex items-center gap-1.5 text-sm font-semibold ${industry.color} transition-transform duration-300 group-hover:translate-x-1`}>
                        Learn more
                        <ArrowRightIcon className='size-4' />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </MotionPreset>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        heading="Industry you don't see here?"
        description="We've shipped projects in plenty of other domains too. Tell us yours."
        buttonText='Tell Us About Your Industry'
        showServiceTags={false}
      />

      <Footer />
    </div>
  )
}

export default IndustriesPage
