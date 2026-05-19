'use client'

// Third-party Imports
import { motion } from 'motion/react'

// Component Imports
import { PrimaryGrowButton, SecondaryGrowButton } from '@/components/ui/grow-button'
import { MotionPreset } from '@/components/ui/motion-preset'
import GrowLogo from '@/assets/svg/grow-logo'
import LogoVector from '@/assets/svg/logo-vector'

const CTA = () => {
  const services = ['AWS / GCP / Azure', 'Terraform IaC', 'Zero-downtime CI/CD', '24/7 On-call Retainers']

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
              <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Cloud bill making you nervous?</h2>
            </MotionPreset>
            <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={0.2} transition={{ duration: 0.7 }}>
              <p className='text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto'>
                Book a free 30-minute cloud audit. We'll review your setup and give you a punch list — even if you don't engage us further.
              </p>
            </MotionPreset>
          </div>

          {/* Service Tags */}
          <MotionPreset fade slide={{ direction: 'down', offset: 30 }} delay={0.3} transition={{ duration: 0.7 }}>
            <div className='flex flex-wrap items-center justify-center gap-6'>
              {services.map(service => (
                <div
                  key={service}
                  className='border-border bg-primary/10 text-primary rounded-sm border px-2 py-0.5 text-xs font-medium'
                >
                  {service}
                </div>
              ))}
            </div>
          </MotionPreset>

          {/* CTA Buttons */}
          <MotionPreset fade slide={{ direction: 'down', offset: 30 }} delay={0.6} transition={{ duration: 0.7 }}>
            <div className='flex flex-wrap items-center justify-center gap-4'>
              <PrimaryGrowButton size='lg' className='gap-2'>
                Book a Free Cloud Audit <LogoVector className='size-6' />
              </PrimaryGrowButton>
              <SecondaryGrowButton size='lg'>
                See DevOps Portfolio
              </SecondaryGrowButton>
            </div>
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}

export default CTA
