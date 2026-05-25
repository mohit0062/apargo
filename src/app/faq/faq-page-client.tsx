'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { getLucideIcon } from '@/utils/icons'

import { MotionPreset } from '@/components/ui/motion-preset'
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface FAQCategory {
  id: string
  label: string
  iconName: string
}

interface FAQItem {
  categoryId: string
  question: string
  answer: string
}

interface FAQPageClientProps {
  categories: FAQCategory[]
  items: FAQItem[]
}

export default function FAQPageClient({ categories, items }: FAQPageClientProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || 'about')
  const activeFaqs = categories.find((c) => c.id === activeCategory)
  const activeItems = items.filter(x => x.categoryId === activeCategory)

  return (
    <div className='grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16'>
      {/* Category Sidebar */}
      <MotionPreset fade slide={{ direction: 'right', offset: 20 }} transition={{ duration: 0.5 }}>
        <nav className='flex flex-row gap-1.5 overflow-x-auto pb-4 lg:flex-col lg:overflow-x-visible lg:pb-0'>
          {categories.map((cat) => {
            const Icon = getLucideIcon(cat.iconName)
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary/10 text-primary shadow-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className='size-4 shrink-0' />
                <span className='whitespace-nowrap'>{cat.label}</span>
              </button>
            )
          })}
        </nav>
      </MotionPreset>

      {/* FAQ Items */}
      <MotionPreset fade slide={{ direction: 'up', offset: 20 }} transition={{ duration: 0.5 }}>
        <div>
          <h2 className='mb-6 text-xl font-bold lg:text-2xl'>{activeFaqs?.label}</h2>
          <Accordion className='gap-0'>
            {activeItems.map((item, idx) => (
              <AccordionItem key={idx} value={`faq-${activeCategory}-${idx}`}>
                <AccordionHeader>
                  <AccordionTrigger className='text-base font-semibold py-5'>
                    {item.question}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent>
                  <p className='text-muted-foreground text-[15px] leading-relaxed pr-8'>
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {activeItems.length === 0 && (
            <p className="text-sm text-muted-foreground italic">No questions found in this category.</p>
          )}
        </div>
      </MotionPreset>
    </div>
  )
}
