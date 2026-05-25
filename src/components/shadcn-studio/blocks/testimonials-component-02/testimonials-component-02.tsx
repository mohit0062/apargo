import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { Rating } from '@/components/ui/rating'
import { cn } from '@/lib/utils'

export type TestimonialItem = {
  name: string
  handle: string
  avatar: string
  rating: number
  title: string
  content: string
  platformName: string
  platformImage: string
}

type TestimonialsComponentProps = {
  testimonials: TestimonialItem[]
}

const TestimonialsComponent = ({ testimonials }: TestimonialsComponentProps) => {
  return (
    <section className='bg-muted py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl space-y-12 px-4 sm:space-y-16 sm:px-6 lg:space-y-24 lg:px-8'>
        <div className='space-y-3 text-center'>
          <h2 className='relative z-1 inline-block text-2xl font-semibold sm:text-3xl lg:text-4xl'>
            The Wall of Love
            <span
              className='from-primary absolute bottom-0 left-0 -z-1 h-0.5 w-full rounded-full bg-gradient-to-r to-transparent'
              aria-hidden='true'
            />
          </h2>
          <p className='text-muted-foreground text-xl'>Insights from those who&apos;ve experienced Shadcn Studio.</p>
        </div>
        <div className='columns-1 gap-6 sm:columns-2 lg:columns-3'>
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={cn(
                'mb-6 break-inside-avoid-column border-none shadow-none transition-shadow duration-300 hover:shadow-md',
                index >= 5 && 'hidden sm:block'
              )}
            >
              <CardContent className='space-y-6'>
                <div className='flex items-center justify-between gap-3'>
                  <Rating readOnly variant='yellow' size={24} value={testimonial.rating} precision={0.5} />

                  <div className='flex grow justify-end gap-1.5'>
                    <img src={testimonial.platformImage} alt={testimonial.platformName} className='size-5.5' />
                    <span className='text-sm'>{testimonial.platformName}</span>
                  </div>
                </div>
                <div className='space-y-2'>
                  <h3 className='text-lg font-semibold'>{testimonial.title}</h3>
                  <p className='text-muted-foreground'>{testimonial.content}</p>
                </div>
                <div className='flex items-center gap-3'>
                  <Avatar className='size-12'>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className='text-sm'>
                      {testimonial.name
                        .split(' ', 2)
                        .map(n => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className='space-y-0.5'>
                    <h4 className='font-medium'>{testimonial.name}</h4>
                    <p className='text-muted-foreground text-sm'>{testimonial.handle}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className='flex justify-center'>
          <a
            href='/about'
            className={cn(buttonVariants({ size: 'lg' }), 'rounded-lg text-base has-[>svg]:px-6')}
          >
            View All Reviews
          </a>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsComponent
