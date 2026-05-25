import { Metadata } from 'next'
import {
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import ContactUs from '@/components/shadcn-studio/blocks/contact-us-page-04/contact-us-page-04'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'
import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'
import { getSiteSection, getLucideIcon } from '@/utils/cms'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteSection('page_contact')
  return {
    title: content.seo?.title || 'Contact Us — Get in Touch with Apargo',
    description: content.seo?.description || 'Reach out to Apargo for project enquiries, partnerships, or support. Based in Jaipur, serving clients globally.',
    keywords: content.seo?.keywords || 'contact, email, address, phone number, support, queries, apargo',
  }
}

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const content = await getSiteSection('page_contact')

  const mappedContactCards = (content.contactCards || []).map((card: any) => ({
    ...card,
    icon: getLucideIcon(card.iconName),
  }))

  return (
    <div className='flex min-h-screen flex-col'>
      <SiteNavbar />

      {/* Contact Section */}
      <ContactUs
        contactCards={mappedContactCards}
        heading={content.heading || "Tell Us What You're Building."}
        subtitle={content.subtitle || "Fill the form below or email us directly. You'll hear back within one working day from a real engineer, not an account manager."}
      />

      {/* Office & Hours */}
      <section className='py-12 sm:py-16 lg:py-24'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='grid gap-8 md:grid-cols-3'>
            {/* Phone / WhatsApp */}
            <MotionPreset fade slide={{ direction: 'up', offset: 20 }} transition={{ duration: 0.5 }}>
              <Card className='h-full shadow-none'>
                <CardContent className='flex flex-col gap-4 p-6'>
                  <div className='flex size-12 items-center justify-center rounded-xl bg-emerald-600/10'>
                    <PhoneIcon className='size-6 text-emerald-600' />
                  </div>
                  <h3 className='text-lg font-bold'>Phone / WhatsApp</h3>
                  <div className='text-muted-foreground text-[15px] leading-relaxed space-y-1'>
                    <p>10am – 7pm IST, Mon – Fri</p>
                    <p>WhatsApp preferred for quick questions</p>
                  </div>
                </CardContent>
              </Card>
            </MotionPreset>

            {/* Office */}
            <MotionPreset fade slide={{ direction: 'up', offset: 20 }} delay={0.1} transition={{ duration: 0.5 }}>
              <Card className='h-full shadow-none'>
                <CardContent className='flex flex-col gap-4 p-6'>
                  <div className='flex size-12 items-center justify-center rounded-xl bg-blue-600/10'>
                    <MapPinIcon className='size-6 text-blue-600' />
                  </div>
                  <h3 className='text-lg font-bold'>Office</h3>
                  <div className='text-muted-foreground text-[15px] leading-relaxed space-y-1'>
                    <p>Remote-first team</p>
                    <p>Headquartered in Jaipur, Rajasthan, India</p>
                  </div>
                </CardContent>
              </Card>
            </MotionPreset>

            {/* Office hours */}
            <MotionPreset fade slide={{ direction: 'up', offset: 20 }} delay={0.2} transition={{ duration: 0.5 }}>
              <Card className='h-full shadow-none'>
                <CardContent className='flex flex-col gap-4 p-6'>
                  <div className='flex size-12 items-center justify-center rounded-xl bg-amber-600/10'>
                    <ClockIcon className='size-6 text-amber-600' />
                  </div>
                  <h3 className='text-lg font-bold'>Office Hours</h3>
                  <div className='text-muted-foreground text-[15px] leading-relaxed space-y-1'>
                    <p><strong className='text-foreground'>Mon – Fri:</strong> 10:00am – 7:00pm IST</p>
                    <p><strong className='text-foreground'>Saturday:</strong> On-call only for production issues</p>
                    <p><strong className='text-foreground'>Sunday:</strong> Closed</p>
                  </div>
                </CardContent>
              </Card>
            </MotionPreset>
          </div>
        </div>
      </section>

      {/* What happens after you submit */}
      <section className='bg-[#f5f5f0] py-12 sm:py-16 lg:py-24'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <MotionPreset fade slide={{ direction: 'down', offset: 20 }} transition={{ duration: 0.5 }}>
            <h2 className='mb-12 text-center text-2xl font-semibold md:text-3xl lg:text-4xl'>
              What happens after you submit
            </h2>
          </MotionPreset>

          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {(content.steps || []).map((step: any, idx: number) => (
              <MotionPreset
                key={idx}
                fade
                slide={{ direction: 'up', offset: 20 }}
                delay={idx * 0.1}
                transition={{ duration: 0.5 }}
              >
                <Card className='h-full border-none bg-white shadow-sm'>
                  <CardContent className='flex h-full flex-col gap-4 p-6'>
                    <div className='flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold'>
                      {step.number}
                    </div>
                    <h3 className='text-lg font-bold'>{step.title}</h3>
                    <p className='text-muted-foreground text-[15px] leading-relaxed'>{step.description}</p>
                  </CardContent>
                </Card>
              </MotionPreset>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        heading='Prefer to schedule a call directly?'
        description='Pick a time that works for you.'
        buttonText='Book a 30-min Slot on Our Calendar'
        showServiceTags={false}
      />

      <Footer />
    </div>
  )
}



