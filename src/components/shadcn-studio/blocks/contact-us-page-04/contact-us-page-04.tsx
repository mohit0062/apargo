import type { ComponentType } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import ContactForm from '@/components/shadcn-studio/blocks/contact-us-page-04/contact-form'

type ContactCard = {
  icon: ComponentType
  title: string
  description: string
  ctaText: string
  ctaLink: string
}[]

const ContactUs = ({ contactCards, heading = 'Get in Touch', subtitle = 'Have a question? Drop us a message.' }: { contactCards: ContactCard; heading?: string; subtitle?: string }) => {
  return (
    <section className='bg-muted py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-12 text-center sm:mb-16 lg:mb-24'>
          <h2 className='mb-4 text-2xl font-semibold md:text-3xl lg:text-4xl'>{heading}</h2>
          <p className='text-muted-foreground text-xl'>
            {subtitle}
          </p>
        </div>

        <Card className='shadow-none'>
          <CardContent className='grid gap-6 md:grid-cols-2'>
            <ContactForm />

            {/* Map Section */}
            <div>
              <iframe
                className='size-full min-h-[400px] rounded-md'
                src='https://maps.google.com/maps?hl=en&amp;q=Jaipur+Rajasthan+India&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
                title='Google Maps'
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Cards */}
        <div className='mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4'>
          {contactCards.map((contact, index) => (
            <Card
              key={index}
              className='hover:bg-primary hover:border-primary group shadow-none transition-all duration-300'
            >
              <CardContent className='flex flex-col gap-6'>
                <Avatar className='size-11.5 rounded-lg'>
                  <AvatarFallback className='bg-primary/10 group-hover:bg-primary-foreground group-hover:text-primary rounded-lg transition-all duration-300 [&>svg]:size-7'>
                    <contact.icon />
                  </AvatarFallback>
                </Avatar>
                <div className='space-y-2'>
                  <h3 className='group-hover:text-primary-foreground text-lg font-semibold transition-all duration-300'>
                    {contact.title}
                  </h3>
                  <p className='text-muted-foreground group-hover:text-primary-foreground transition-all duration-300'>
                    {contact.description}
                  </p>
                </div>
                <Button
                  className='bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40 group-hover:bg-secondary group-hover:text-secondary-foreground group-hover:hover:bg-secondary text-base'
                  size='lg'
                >
                  <a href={contact.ctaLink}>{contact.ctaText}</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContactUs
