import { MegaphoneIcon, InboxIcon, BotIcon, PieChartIcon, ZapIcon, BlocksIcon } from 'lucide-react'
import { MotionPreset } from '@/components/ui/motion-preset'

import { getLucideIcon } from '@/utils/icons'

interface FeaturesGreentickProps {
  features?: {
    title: string
    desc: string
    iconName?: string
  }[]
}

const defaultFeatures = [
  { title: 'WhatsApp Broadcasts', desc: 'bulk campaigns with high deliverability', iconName: 'MegaphoneIcon' },
  { title: 'Shared Team Inbox', desc: 'one number, unlimited team members', iconName: 'InboxIcon' },
  { title: 'AI Chatbot Builder', desc: 'no-code conversation flows', iconName: 'BotIcon' },
  { title: 'Campaign Manager', desc: 'plan, track, optimise WhatsApp campaigns', iconName: 'PieChartIcon' },
  { title: 'Automation', desc: 'trigger workflows from actions, tags or time', iconName: 'ZapIcon' },
  { title: 'Integrations', desc: 'Shopify, Zapier, HubSpot, Salesforce, WooCommerce, Google Sheets', iconName: 'BlocksIcon' }
]

const FeaturesGreentick = ({ features }: FeaturesGreentickProps) => {
  const displayFeatures = features || defaultFeatures

  return (
    <section className='bg-[#e5e2da] py-12 sm:py-16'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <MotionPreset
          component='h3'
          className='mb-12 text-center text-2xl font-semibold md:text-3xl'
          fade
          slide={{ direction: 'up', offset: 50 }}
        >
          What's in the box
        </MotionPreset>
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {displayFeatures.map((feature, i) => {
            const Icon = getLucideIcon(feature.iconName || '')
            return (
              <MotionPreset
                key={i}
                className='flex flex-col items-start gap-3 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md'
                fade
                slide={{ direction: 'up', offset: 50 }}
                delay={i * 0.1}
              >
                <div className='flex items-center gap-3'>
                  <Icon className='text-primary size-6' />
                  <h4 className='text-lg font-semibold'>{feature.title}</h4>
                </div>
                <p className='text-muted-foreground text-base'>
                  {feature.desc}
                </p>
              </MotionPreset>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesGreentick
