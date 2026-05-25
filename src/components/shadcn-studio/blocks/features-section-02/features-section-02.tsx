import AccordionWithImage from '@/components/shadcn-studio/blocks/features-section-02/accordion-with-image'

import { MotionPreset } from '@/components/ui/motion-preset'

const Features = () => {
  return (
    <section className='bg-[#e5e2da] py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-24'>
          <MotionPreset
            component='h2'
            className='text-2xl font-semibold md:text-3xl lg:text-4xl'
            fade
            slide={{ direction: 'down', offset: 50 }}
            blur
            transition={{ duration: 0.5 }}
          >
            Engineered for growth, by operators who lived the problem.
          </MotionPreset>
          <MotionPreset
            component='p'
            className='text-muted-foreground text-xl max-w-4xl mx-auto'
            fade
            blur
            slide={{ direction: 'down', offset: 50 }}
            delay={0.3}
            transition={{ duration: 0.5 }}
          >
            What started as an internal solution evolved into a complete communication infrastructure helping businesses
            scale faster, respond smarter, and operate without limitations.
          </MotionPreset>
        </div>

        <AccordionWithImage />
      </div>
    </section>
  )
}

export default Features
