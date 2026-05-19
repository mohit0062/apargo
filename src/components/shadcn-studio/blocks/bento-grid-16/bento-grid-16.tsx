import { MotionPreset } from '@/components/ui/motion-preset'

import SecureAccess from '@/components/shadcn-studio/blocks/bento-grid-16/secure-access'
import OneFlowProcess from '@/components/shadcn-studio/blocks/bento-grid-16/one-flow-process'
import PickYourTool from '@/components/shadcn-studio/blocks/bento-grid-16/pick-your-tool'
import BuildThings from '@/components/shadcn-studio/blocks/bento-grid-16/build-things'
import VoiceAssistant from '@/components/shadcn-studio/blocks/bento-grid-16/voice-assistant'

const BentoGrid = () => {
  return (
    <section className='bg-background py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto mb-10 max-w-7xl px-4 sm:px-6 lg:px-8 text-center'>
        <h2 className='font-sans text-[36px] font-semibold tracking-tight text-foreground'>What makes us different</h2>
      </div>
      <div className='mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8'>
        <MotionPreset
          fade
          blur
          slide={{ direction: 'down', offset: 75 }}
          transition={{ duration: 0.45 }}
          className='group relative flex h-full flex-col gap-6 overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white/90 py-6 shadow-[0_24px_70px_-36px_rgba(14,20,16,0.35)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_34px_90px_-44px_rgba(14,20,16,0.48)]'
        >
          <SecureAccess />
          <div className='mt-auto px-6'>
            <h3 className='text-lg font-semibold leading-snug text-foreground sm:text-xl'>We&apos;re builders who also operate</h3>
            <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
              Most agencies hand over code and walk away. We hand it over and then keep operating something just like it ourselves. The team you hire understands deployments, billing, on-call, support tickets — not just code reviews.
            </p>
          </div>
        </MotionPreset>

        <MotionPreset
          fade
          blur
          slide={{ direction: 'down', offset: 75 }}
          delay={0.15}
          transition={{ duration: 0.45 }}
          className='group relative flex h-full flex-col gap-6 overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white/90 py-6 shadow-[0_24px_70px_-36px_rgba(14,20,16,0.35)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_34px_90px_-44px_rgba(14,20,16,0.48)]'
        >
          <OneFlowProcess />
          <div className='mt-auto px-6'>
            <h3 className='text-lg font-semibold leading-snug text-foreground sm:text-xl'>We&apos;re senior-heavy</h3>
            <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
              Roughly four out of five engineers at Apargo are mid-to-senior. That&apos;s deliberate. We charge less than a big consultancy and ship faster than a junior-heavy agency.
            </p>
          </div>
        </MotionPreset>

        <MotionPreset
          fade
          blur
          slide={{ direction: 'down', offset: 75 }}
          delay={0.3}
          transition={{ duration: 0.45 }}
          className='group relative flex h-full flex-col gap-6 overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white/90 py-6 shadow-[0_24px_70px_-36px_rgba(14,20,16,0.35)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_34px_90px_-44px_rgba(14,20,16,0.48)] max-lg:order-1'
        >
          <PickYourTool />
          <div className='mt-auto px-6'>
            <h3 className='text-lg font-semibold leading-snug text-foreground sm:text-xl'>We say no when it matters</h3>
            <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
              If a client wants something that won&apos;t help their users, or a scope that won&apos;t fit a timeline, we push back early. It costs us short-term work and earns us long-term partnerships.
            </p>
          </div>
        </MotionPreset>

        <MotionPreset
          fade
          blur
          slide={{ direction: 'down', offset: 75 }}
          delay={0.45}
          transition={{ duration: 0.45 }}
          className='group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white/90 pb-6 shadow-[0_24px_70px_-36px_rgba(14,20,16,0.35)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_34px_90px_-44px_rgba(14,20,16,0.48)] sm:col-span-2'
        >
          <BuildThings />
          <div className='mt-auto px-6'>
            <h3 className='text-lg font-semibold leading-snug text-foreground sm:text-xl'>We work in your time-zone</h3>
            <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
              Our team covers US, EU, Middle East and APAC overlap. Async by default. Stand-ups in your hours, not ours.
            </p>
          </div>
        </MotionPreset>

        <MotionPreset
          fade
          blur
          slide={{ direction: 'down', offset: 75 }}
          delay={0.6}
          transition={{ duration: 0.45 }}
          className='group relative flex h-full flex-col gap-6 overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white/90 py-6 shadow-[0_24px_70px_-36px_rgba(14,20,16,0.35)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_34px_90px_-44px_rgba(14,20,16,0.48)] max-lg:order-1'
        >
          <VoiceAssistant />
          <div className='mt-auto px-6'>
            <h3 className='text-lg font-semibold leading-snug text-foreground sm:text-xl'>We stay post-launch</h3>
            <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
              Most teams disappear after delivery. We stay involved with support, optimisation, scaling and ongoing improvements — so your product keeps growing after launch.
            </p>
          </div>
        </MotionPreset>
      </div>
    </section>
  )
}

export default BentoGrid
