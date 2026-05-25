import { MessagesSquareIcon } from 'lucide-react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

type FAQs = {
  question: string
  answer: string
}[]

const FAQ = ({ faqItems }: { faqItems: FAQs }) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* FAQ Header */}
        <div className='mb-12 space-y-4 sm:mb-16 lg:mb-24'>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Common Questions You Might Have</h2>
          <p className='text-muted-foreground text-xl'>Use AI algorithms to give users some cool insights!</p>
        </div>

        <div className='grid grid-cols-1 gap-16 md:grid-cols-2 xl:grid-cols-3'>
          <div className='xl:col-span-2'>
            <Accordion className='w-full rounded-lg border' defaultValue={['item-1']}>
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger className='px-5 text-base'>{item.question}</AccordionTrigger>
                  <AccordionContent className='text-muted-foreground px-5 text-base'>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <Card className='border-primary mx-auto h-max gap-4 shadow-none'>
            <MessagesSquareIcon className='text-primary mx-auto size-16' />
            <CardHeader className='grid-rows-1'>
              <CardTitle className='text-center'>Still have Questions?</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-4 text-center'>
              <p className='text-muted-foreground'>
                Our team will answer all your questions. we ensure a quick response.
              </p>
              <Button size='lg' className='w-full rounded-lg text-base'>
                Contact Support Team
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default FAQ
