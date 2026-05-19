import { MailIcon, CalendarDaysIcon, ArrowRightIcon } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { buttonVariants, Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type BlogCard = {
  image: string
  alt: string
  tags: string[]
  title: string
  description?: string
  date: string
  author?: string
  blogLink: string
}[]

const Blog = ({ blogCards }: { blogCards: BlogCard }) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-12 grid grid-cols-1 gap-16 sm:mb-16 md:grid-cols-2 lg:mb-24'>
          <div className='space-y-4'>
            <p className='text-primary text-sm font-medium uppercase'>world-class project</p>
            <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
              Get Daily Updates And Inspiration From Our Team!
            </h2>
            <p className='text-muted-foreground text-xl'>
              Check out cool new spots, try out yummy local foods, and dive into different cultures.
            </p>
            <a
              href='/blog'
              className={cn(buttonVariants({ size: 'lg' }), 'group rounded-lg text-base has-[>svg]:px-6')}
            >
              See All Blogs
              <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
            </a>
          </div>

          {/* Newsletter Card */}
          <Card className='h-fit shadow-none'>
            <CardHeader className='flex gap-4'>
              <Avatar className='size-11.5'>
                <AvatarFallback className='bg-primary/10 text-primary'>
                  <MailIcon className='size-7.5' />
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col gap-0.5'>
                <CardTitle className='text-lg'>Link your email for messaging.</CardTitle>
                <CardDescription className='text-lg'>
                  Check out our portfolio for examples of our world-class websites and apps.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className='border-primary flex items-center gap-2.5 rounded-xl border-2 px-3 py-2'>
                <Input
                  type='email'
                  placeholder='Email address'
                  className='h-10 border-0 !bg-transparent shadow-none focus-visible:ring-0'
                />
                <Button size='lg' className='rounded-lg text-base'>
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blog Grid */}
        <div className='flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0'>
          {blogCards.map((card, index) => (
            <div key={index} className='w-[85vw] shrink-0 snap-start md:w-auto'>
              <Card className='group h-full overflow-hidden shadow-none transition-all duration-300 border'>
                <CardContent className='space-y-3.5 p-6'>
                  <div className='mb-6 overflow-hidden rounded-lg sm:mb-8'>
                    <a href={card.blogLink}>
                      <img
                        src={card.image}
                        alt={card.alt}
                        className='max-h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105'
                      />
                    </a>
                  </div>
                  <div className='flex items-center justify-between gap-1.5'>
                    <div className='text-muted-foreground flex items-center gap-1.5'>
                      <CalendarDaysIcon className='size-5' />
                      <span>{card.date}</span>
                    </div>
                    <div className='flex flex-wrap gap-1'>
                      {card.tags.map((tag, idx) => (
                        <Badge key={idx} className='bg-primary/10 text-primary rounded-full border-0 text-sm'>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <h3 className='line-clamp-2 text-lg font-medium md:text-xl'>
                    <a href={card.blogLink}>{card.title}</a>
                  </h3>
                  {card.description && (
                    <p className='text-muted-foreground line-clamp-2 text-base'>{card.description}</p>
                  )}
                  <div className='flex items-center justify-between pt-2'>
                    <span className='text-sm font-medium text-muted-foreground'>
                      {card.author || 'Apargo Team'}
                    </span>
                    <a
                      href={card.blogLink}
                      className={cn(
                        buttonVariants({ size: 'icon', variant: 'outline' }),
                        'group-hover:bg-primary! group-hover:text-primary-foreground group-hover:border-primary hover:border-primary hover:bg-primary! hover:text-primary-foreground rounded-full'
                      )}
                    >
                      <ArrowRightIcon className='size-4 -rotate-45' />
                      <span className='sr-only'>Read more: {card.title}</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog
