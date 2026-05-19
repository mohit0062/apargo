import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Rating } from '@/components/ui/rating'

export type Testimonial = {
  name: string
  role: string
  avatar: string
  content: string
  rating: number
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <Card className='bg-muted max-w-md border-none py-2 shadow-none'>
      <CardContent className='space-y-8 px-4'>
        <div>
          <p className='text-primary text-6xl'>&ldquo;</p>
          <p className='text-muted-foreground -mt-4 line-clamp-3 font-medium'>{testimonial.content}</p>
        </div>
        <div className='flex flex-wrap items-center justify-between gap-5'>
          <div className='flex items-center gap-2'>
            <Avatar className='size-10'>
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback>
                {testimonial.name
                  .split(' ', 2)
                  .map(n => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className='font-medium'>{testimonial.name}</h4>
              <p className='text-muted-foreground text-sm text-nowrap'>{testimonial.role}</p>
            </div>
          </div>

          <Rating variant='yellow' readOnly size={22} value={testimonial.rating} precision={0.5} />
        </div>
      </CardContent>
    </Card>
  )
}

export default TestimonialCard
