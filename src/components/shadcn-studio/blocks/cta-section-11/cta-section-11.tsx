'use client'

import { useState } from 'react'
import Link from 'next/link'

// Third-party Imports
import { motion } from 'motion/react'

// Component Imports
import { PrimaryGrowButton } from '@/components/ui/grow-button'
import { MotionPreset } from '@/components/ui/motion-preset'
import GrowLogo from '@/assets/svg/grow-logo'
import LogoVector from '@/assets/svg/logo-vector'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface CTAProps {
  heading?: string
  description?: string
  buttonText?: string
  showServiceTags?: boolean
  buttonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  services?: string[]
}

const CTA = ({
  heading: propHeading,
  description: propDescription,
  buttonText: propButtonText,
  showServiceTags: propShowServiceTags,
  buttonHref: propButtonHref,
  secondaryButtonText: propSecondaryButtonText,
  secondaryButtonHref: propSecondaryButtonHref,
  services: propServices,
}: CTAProps) => {
  const [ctaConfig, setCtaConfig] = useState(() => ({
    heading: propHeading || 'How We Work at Grow',
    description: propDescription || 'Our process turns complex marketing data into clear insights that drive growth.',
    buttonText: propButtonText || 'Get Started - Free',
    showServiceTags: propShowServiceTags !== undefined ? propShowServiceTags : true,
    buttonHref: propButtonHref || '/contact',
    secondaryButtonText: propSecondaryButtonText || '',
    secondaryButtonHref: propSecondaryButtonHref || '/contact?intent=demo',
    services: propServices || ['Digital Marketing', 'SEO', 'Real Time Analytics']
  }))

  // Fetch client-side if no custom props are supplied
  useState(() => {
    const hasProps =
      propHeading ||
      propDescription ||
      propButtonText ||
      propButtonHref ||
      propServices

    if (typeof window !== 'undefined' && !hasProps) {
      const fetchCTAData = async () => {
        try {
          const { createClient } = await import('@/utils/supabase/client')
          const supabase = createClient()
          const { data } = await supabase
            .from('site_sections')
            .select('content')
            .eq('key', 'cta')
            .single()
          if (data && data.content) {
            setCtaConfig((prev) => ({
              ...prev,
              ...data.content,
            }))
          }
        } catch (err) {
          console.error('Error fetching CTA dynamically:', err)
        }
      }
      fetchCTAData()
    }
  })

  const heading = propHeading || ctaConfig.heading
  const description = propDescription || ctaConfig.description
  const buttonText = propButtonText || ctaConfig.buttonText
  const showServiceTags = propShowServiceTags !== undefined ? propShowServiceTags : ctaConfig.showServiceTags
  const buttonHref = propButtonHref || ctaConfig.buttonHref
  const secondaryButtonText = propSecondaryButtonText !== undefined ? propSecondaryButtonText : ctaConfig.secondaryButtonText
  const secondaryButtonHref = propSecondaryButtonHref || ctaConfig.secondaryButtonHref
  const services = propServices || ctaConfig.services

  const isInternalHref = (href: string) => href.startsWith('/') || href.startsWith('#')
  const primaryButtonClassName = cn(
    'rounded-lg duration-200 ease-in-out active:-translate-x-0.5 active:translate-y-0.5',
    '[box-shadow:0px_1px_8px_0px_color-mix(in_oklab,white_7%,transparent)_inset,0px_0px_4.3px_0px_color-mix(in_oklab,var(--primary)_11%,transparent)_inset,0px_0px_0px_2.5px_var(--primary),0px_9px_21.7px_3px_color-mix(in_oklab,var(--primary)_40%,transparent),0px_-1px_0px_1px_color-mix(in_oklab,white_18%,transparent)_inset,0px_4px_4px_0px_color-mix(in_oklab,var(--primary)_16%,transparent)] dark:[box-shadow:0px_1px_8px_0px_color-mix(in_oklab,black_7%,transparent)_inset,0px_0px_4.3px_0px_color-mix(in_oklab,var(--primary)_11%,transparent)_inset,0px_0px_0px_2.5px_var(--primary),0px_9px_21.7px_3px_color-mix(in_oklab,var(--primary)_40%,transparent),0px_-1px_0px_1px_color-mix(in_oklab,black_18%,transparent)_inset,0px_4px_4px_0px_color-mix(in_oklab,var(--primary)_16%,transparent)]',
    'active:[box-shadow:0px_1px_8px_0px_color-mix(in_oklab,white_7%,transparent)_inset,0px_0px_4.3px_0px_color-mix(in_oklab,var(--primary)_11%,transparent)_inset,0px_0px_0px_2.5px_var(--primary),0px_7px_12px_0px_color-mix(in_oklab,var(--primary)_60%,transparent),0px_-1px_0px_1px_color-mix(in_oklab,white_18%,transparent)_inset,0px_4px_4px_0px_color-mix(in_oklab,var(--primary)_16%,transparent)] dark:active:[box-shadow:0px_1px_8px_0px_color-mix(in_oklab,black_7%,transparent)_inset,0px_0px_4.3px_0px_color-mix(in_oklab,var(--primary)_11%,transparent)_inset,0px_0px_0px_2.5px_var(--primary),0px_7px_12px_0px_color-mix(in_oklab,var(--primary)_60%,transparent),0px_-1px_0px_1px_color-mix(in_oklab,black_18%,transparent)_inset,0px_4px_4px_0px_color-mix(in_oklab,var(--primary)_16%,transparent)]',
    'focus-visible:[box-shadow:0px_1px_8px_0px_color-mix(in_oklab,white_7%,transparent)_inset,0px_0px_4.3px_0px_color-mix(in_oklab,var(--primary)_11%,transparent)_inset,0px_0px_0px_2.5px_var(--primary),0px_7px_12px_0px_color-mix(in_oklab,var(--primary)_60%,transparent),0px_-1px_0_1px_color-mix(in_oklab,white_18%,transparent)_inset,0px_4px_4px_0px_color-mix(in_oklab,var(--primary)_16%,transparent)] dark:focus-visible:[box-shadow:0px_1px_8px_0px_color-mix(in_oklab,black_7%,transparent)_inset,0px_0px_4.3px_0px_color-mix(in_oklab,var(--primary)_11%,transparent)_inset,0px_0px_0px_2.5px_var(--primary),0px_7px_12px_0px_color-mix(in_oklab,var(--primary)_60%,transparent),0px_-1px_0_1px_color-mix(in_oklab,black_18%,transparent)_inset,0px_4px_4px_0px_color-mix(in_oklab,var(--primary)_16%,transparent)]',
    buttonVariants({ size: 'lg' }),
    'whitespace-nowrap h-9 gap-1.5 px-2.5 text-base has-[>svg]:px-6 flex items-center gap-2'
  )
  const secondaryButtonClassName = cn(
    buttonVariants({ variant: 'outline', size: 'lg' }),
    'bg-background/50 hover:bg-background/80 border-2 rounded-full px-8 text-base font-semibold'
  )

  return (
    <section className='bg-muted relative z-1 overflow-hidden py-8 sm:py-16'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Decorative Logo Cards */}
        <motion.div
          initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, rotate: 8, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='bg-accent absolute -top-10 left-4 -z-1 hidden size-46 rotate-[8deg] flex-col items-center justify-center gap-3 rounded-lg border-3 shadow-[inset_0_0_15px_color-mix(in_oklab,var(--primary)60%,transparent)] sm:left-8 lg:left-16 xl:flex'
        >
          <GrowLogo className='size-14' />
          <img
            src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/cta/grow-text.png'
            alt='Website Mockups Grid'
            className='w-28 dark:hidden'
          />
          <img
            src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/cta/grow-text-dark.png'
            alt='Website Mockups Grid'
            className='hidden w-28 dark:inline-block'
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, rotate: 8, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className='bg-accent absolute -right-5 -bottom-[20%] -z-1 flex size-29 rotate-[8deg] flex-col items-center justify-center gap-3 rounded-lg border-3 shadow-[inset_0_0_15px_color-mix(in_oklab,var(--primary)60%,transparent)] md:size-46 lg:right-16 lg:-bottom-[25%]'
        >
          <GrowLogo className='size-7 md:size-14' />
          <img
            src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/cta/grow-text.png'
            alt='Website Mockups Grid'
            className='w-22 md:w-28 dark:hidden'
          />
          <img
            src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/cta/grow-text-dark.png'
            alt='Website Mockups Grid'
            className='hidden w-22 md:w-28 dark:inline-block'
          />
        </motion.div>

        {/* Main Content */}
        <div className='space-y-8 text-center'>
          <div className='space-y-4'>
            <MotionPreset fade slide={{ direction: 'down', offset: 50 }} transition={{ duration: 0.7 }}>
              <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>{heading}</h2>
            </MotionPreset>
            <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={0.2} transition={{ duration: 0.7 }}>
              <p className='text-muted-foreground text-lg md:text-xl leading-relaxed'>
                {description}
              </p>
            </MotionPreset>
          </div>

          {/* Service Tags */}
          {showServiceTags && services && services.length > 0 && (
            <MotionPreset fade slide={{ direction: 'down', offset: 30 }} delay={0.3} transition={{ duration: 0.7 }}>
              <div className='flex flex-wrap items-center justify-center gap-6'>
                {services.map(service => (
                  <div
                    key={service}
                    className='border-border bg-primary/10 text-primary rounded-sm border px-2.5 py-1 text-xs font-medium'
                  >
                    {service}
                  </div>
                ))}
              </div>
            </MotionPreset>
          )}

          {/* CTA Button */}
          <MotionPreset
            fade
            slide={{ direction: 'down', offset: 30 }}
            delay={0.6}
            transition={{ duration: 0.7 }}
            className='flex flex-wrap items-center justify-center gap-4'
          >
            {buttonHref && (
              isInternalHref(buttonHref) ? (
                <Link href={buttonHref} className={primaryButtonClassName}>
                  {buttonText} <LogoVector className='size-6' />
                </Link>
              ) : (
                <a
                  href={buttonHref}
                  className={primaryButtonClassName}
                  target={buttonHref.startsWith('http') ? '_blank' : undefined}
                  rel={buttonHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {buttonText} <LogoVector className='size-6' />
                </a>
              )
            )}
            {secondaryButtonText && secondaryButtonHref && (
              isInternalHref(secondaryButtonHref) ? (
                <Link href={secondaryButtonHref} className={secondaryButtonClassName}>
                  {secondaryButtonText}
                </Link>
              ) : (
                <a
                  href={secondaryButtonHref}
                  className={secondaryButtonClassName}
                  target={secondaryButtonHref.startsWith('http') ? '_blank' : undefined}
                  rel={secondaryButtonHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {secondaryButtonText}
                </a>
              )
            )}
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}

export default CTA
