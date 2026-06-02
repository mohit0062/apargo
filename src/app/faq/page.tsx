import { Metadata } from 'next'
import { getSiteSection } from '@/utils/cms'
import { Badge } from '@/components/ui/badge'
import { MotionPreset } from '@/components/ui/motion-preset'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'
import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'
import FAQPageClient from './faq-page-client'
import { JsonLd } from '@/components/json-ld'

// Dynamic Metadata Generation
export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteSection('page_faq')
  const title = content.seo?.title || 'FAQ — Frequently Asked Questions | Apargo'
  const description = content.seo?.description || "Find answers to questions about Apargo's product engineering, IT services, pricing, process, products like AI Greentick, and career hiring processes."
  return {
    title,
    description,
    keywords: content.seo?.keywords || "faq, questions, support, pricing, process, apargo",
    alternates: {
      canonical: '/faq',
    },
    openGraph: {
      title,
      description,
      url: '/faq',
      type: 'website',
    }
  }
}

export const dynamic = 'force-dynamic'

export default async function FAQPage() {
  const content = await getSiteSection('page_faq')

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (content.items || []).map((item: any) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

  return (
    <div className='flex min-h-screen flex-col'>
      <JsonLd data={faqSchema} />
      <SiteNavbar />

      {/* Hero */}
      <section className='from-primary/20 to-background flex flex-col bg-linear-to-bl to-50% py-24 lg:py-32'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-3xl space-y-8 text-center'>
            <MotionPreset fade slide transition={{ duration: 0.5 }} className='flex justify-center'>
              <Badge variant='outline' className='text-sm font-normal uppercase tracking-wider'>
                {content.hero?.badge || 'FAQ'}
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
              {content.hero?.heading || 'Questions buyers actually ask us.'}
            </MotionPreset>

            <MotionPreset
              component='p'
              fade
              slide
              delay={0.6}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className='text-muted-foreground text-lg leading-relaxed'
            >
              {content.hero?.description ? (
                content.hero.description
              ) : (
                <>
                  If yours isn&apos;t covered, write to{' '}
                  <a href='mailto:hello@apargo.com' className='text-primary font-medium hover:underline'>
                    hello@apargo.com
                  </a>
                  . We&apos;ll either answer in a reply or add it here.
                </>
              )}
            </MotionPreset>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-12 sm:py-16 lg:py-24'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <FAQPageClient categories={content.categories || []} items={content.items || []} />
        </div>
      </section>

      {/* CTA */}
      <CTA
        heading="Question we didn't answer?"
        description="Write to us and we'll get back within 24 hours."
        buttonText='Email hello@apargo.com'
        buttonHref='mailto:hello@apargo.com'
        showServiceTags={false}
      />

      <Footer />
    </div>
  )
}
