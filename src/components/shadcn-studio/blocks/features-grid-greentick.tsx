import { ArrowRightIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'

const features = [
  {
    title: 'WhatsApp Broadcasts',
    description: 'Send approved promotional and transactional campaigns to thousands of contacts with high delivery and clear reporting. Schedule, segment and personalise — without the manual copy-paste pain.',
    linkText: 'Learn more about Broadcasts',
    linkHref: '#',
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-23.png'
  },
  {
    title: 'Shared Team Inbox',
    description: 'One WhatsApp number, accessed by your whole team from any device. Assign chats, add private notes, tag teammates, track who replied — everything you wished WhatsApp Web could do.',
    linkText: 'Explore Shared Inbox',
    linkHref: '#',
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-32.png'
  },
  {
    title: 'AI Chatbot Builder',
    description: 'Build conversation flows visually, no coding. Connect to a backend, plug in an LLM, or just answer FAQs. Same chatbot engine handles lead capture, support and routing.',
    linkText: 'Explore Chatbot Builder',
    linkHref: '#',
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-33.png'
  },
  {
    title: 'Campaign Manager',
    description: "Plan, track and optimise every WhatsApp campaign. Delivered, read, clicked, replied — measure what works and retarget what didn't.",
    linkText: 'Unlock Marketing Analytics',
    linkHref: '#',
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-34.png'
  },
  {
    title: 'WhatsApp Automation',
    description: 'Trigger personalised messages based on time, actions, tags and customer journeys. Abandoned cart recovery, post-purchase follow-up, re-engagement — all on autopilot.',
    linkText: 'View Automation Flows',
    linkHref: '#',
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-35.png'
  },
  {
    title: 'Integrations',
    description: 'Connect Shopify, WooCommerce, Zapier, HubSpot, Salesforce, Google Sheets, custom APIs and 5,000+ other apps.',
    linkText: 'View Integrations',
    linkHref: '#',
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-36.png'
  }
]

const FeaturesGridGreentick = () => {
  return (
    <section className='relative py-16 sm:py-24 bg-[#F8FAFC] overflow-hidden'>
      {/* Subtle dot pattern background */}
      <div 
        className='absolute inset-0 z-0' 
        style={{
          backgroundImage: 'radial-gradient(#CBD5E1 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px'
        }}
      />
      
      <div className='relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8'>
        <div className='mb-16 text-center'>
          <MotionPreset fade slide={{ direction: 'down', offset: 20 }}>
            <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
              Core capabilities
            </h2>
          </MotionPreset>
        </div>
        
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature, index) => (
            <MotionPreset
              key={index}
              fade
              slide={{ direction: 'up', offset: 20 }}
              delay={index * 0.1}
              transition={{ duration: 0.5 }}
            >
              <div className='group flex h-full flex-col overflow-hidden rounded-[32px] bg-white shadow-sm ring-1 ring-slate-200/50 transition-all hover:shadow-md'>
                <div className='flex flex-col p-8 pb-0'>
                  <h3 className='mb-3 text-[22px] font-bold text-slate-900 tracking-tight'>
                    {feature.title}
                  </h3>
                  <p className='mb-6 text-[15px] leading-relaxed text-slate-600'>
                    {feature.description}
                  </p>
                  <a
                    href={feature.linkHref}
                    className='mb-8 inline-flex items-center text-[15px] font-bold text-[#16a34a] transition-colors hover:text-[#15803d]'
                  >
                    {feature.linkText}
                    <ArrowRightIcon className='ml-1.5 size-4 transition-transform group-hover:translate-x-1' strokeWidth={2.5} />
                  </a>
                </div>
                
                <div className='mt-auto px-6 pb-6'>
                  <div className='flex h-48 w-full items-end justify-center overflow-hidden rounded-2xl bg-slate-50 pt-6 px-6 ring-1 ring-slate-100'>
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className='h-auto w-full object-cover object-top rounded-t-lg shadow-sm transition-transform duration-500 group-hover:-translate-y-2'
                    />
                  </div>
                </div>
              </div>
            </MotionPreset>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesGridGreentick
