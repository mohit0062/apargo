import type { ComponentType } from 'react'

type Features = {
  icon: ComponentType
  title: string
  description: string
}[]

const Features = ({ featuresList }: { featuresList: Features }) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-24'>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
            Why custom over{' '}
            <span className='relative z-10'>
              off-the-shelf
              <span
                className='bg-primary absolute bottom-0 left-0 -z-10 h-px w-full max-sm:hidden'
                aria-hidden='true'
              />
            </span>{' '}
          </h2>
          <p className='text-muted-foreground text-xl'>
            Ditch the per-seat SaaS tax and build a platform that fits your exact operational model.
          </p>
        </div>

        <div className='space-y-16'>

          <div className='grid items-center gap-8 sm:gap-16 lg:grid-cols-2 lg:gap-24'>
            {/* Image */}
            <img
              src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-5.png'
              alt='Dashboard Preview'
              className='w-full rounded-xl border dark:hidden'
            />
            <img
              src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-5-dark.png'
              alt='Dashboard Preview'
              className='hidden w-full rounded-xl border dark:inline-block'
            />

            {/* Features List */}
            <div className='space-y-7'>
              {featuresList.map((item, index) => {
                const IconComponent = item.icon

                return (
                  <div key={index} className='group space-y-3'>
                    <div className='group-hover:text-primary flex items-center gap-2 transition-colors duration-300 [&>svg]:size-5'>
                      <IconComponent />
                      <h5 className='text-lg font-medium'>{item.title}</h5>
                    </div>
                    <p className='text-muted-foreground'>{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
