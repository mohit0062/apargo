import { Metadata } from 'next'
import { getSiteSection, getLucideIcon } from '@/utils/cms'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'
import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'
import InteractiveStackExplorer from '@/components/InteractiveStackExplorer'

// Dynamic Metadata Generation
export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteSection('page_technologies')
  return {
    title: content.seo?.title || 'Technologies We Use — React, Node, Python, AWS, AI | Apargo',
    description: content.seo?.description || "Apargo's technology stack — React, Next.js, Node, Python, AWS, GCP, Kubernetes, LLMs and more. Modern, mainstream, maintainable.",
    keywords: content.seo?.keywords || "react, node, python, aws, ai, apargo",
  }
}

export const dynamic = 'force-dynamic'

export default async function TechnologiesPage() {
  const content = await getSiteSection('page_technologies')

  return (
    <div className='flex min-h-screen flex-col'>
      <SiteNavbar />

      {/* Hero */}
      <section className='from-primary/20 to-background flex flex-col bg-linear-to-bl to-50% py-24 lg:py-32'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-3xl space-y-8 text-center'>
            <MotionPreset fade slide transition={{ duration: 0.5 }} className='flex justify-center'>
              <Badge variant='outline' className='text-sm font-normal uppercase tracking-wider'>
                {content.hero?.badge || 'Technologies'}
              </Badge>
            </MotionPreset>

            <MotionPreset
              component='h1'
              fade
              slide
              delay={0.3}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className='text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl'
            >
              {content.hero?.heading || 'Mainstream stack, modern choices.'}
            </MotionPreset>

            <MotionPreset
              component='p'
              fade
              slide
              delay={0.6}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className='text-muted-foreground text-lg leading-relaxed'
            >
              {content.hero?.description || "We don't chase the framework of the month. We pick technologies a future team can hire for and maintain — and we keep up with the modern features that genuinely save time."}
            </MotionPreset>
          </div>
        </div>
      </section>

      {/* Interactive Stack Explorer Node Graph */}
      <InteractiveStackExplorer />

      {/* Stack Groups */}
      <section className='py-12 sm:py-16 lg:py-24'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='grid gap-8 md:grid-cols-2'>
            {content.stackGroups?.map((group: any, gIdx: number) => {
              const GroupIcon = getLucideIcon(group.iconName)
              return (
                <MotionPreset
                  key={gIdx}
                  fade
                  slide={{ direction: 'up', offset: 24 }}
                  delay={gIdx * 0.07}
                  transition={{ duration: 0.5 }}
                >
                  <Card
                    className={`h-full shadow-none transition-all duration-300 ${group.borderColor}`}
                  >
                    <CardContent className='p-6 sm:p-8'>
                      {/* Group header */}
                      <div className='mb-6 flex items-center gap-3'>
                        <div className={`flex size-10 items-center justify-center rounded-xl ${group.bgColor}`}>
                          <GroupIcon className={`size-5 ${group.color}`} />
                        </div>
                        <h3 className='text-lg font-bold'>{group.title}</h3>
                      </div>

                      {/* Tech badges */}
                      <div className='flex flex-wrap gap-2'>
                        {group.items?.map((item: any, iIdx: number) => {
                          const ItemIcon = getLucideIcon(item.iconName)
                          return (
                            <Badge
                              key={iIdx}
                              variant='outline'
                              className='flex items-center gap-1.5 rounded-lg border-border/70 bg-background px-3 py-1.5 text-[13px] font-medium transition-colors hover:border-primary/40 hover:bg-primary/5'
                            >
                              {item.iconName && <ItemIcon className='size-3.5 shrink-0 opacity-60' />}
                              {item.name}
                            </Badge>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </MotionPreset>
              )
            })}
          </div>
        </div>
      </section>

      {/* How We Choose */}
      <section className='bg-[#f5f5f0] py-12 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.06)] sm:py-16 lg:py-24'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mb-12 max-w-3xl space-y-4 sm:mb-16'>
            <MotionPreset fade slide={{ direction: 'down', offset: 20 }} transition={{ duration: 0.5 }}>
              <p className='text-primary text-sm font-semibold uppercase tracking-wide'>Our philosophy</p>
            </MotionPreset>
            <MotionPreset
              component='h2'
              fade
              slide={{ direction: 'down', offset: 20 }}
              delay={0.15}
              transition={{ duration: 0.5 }}
              className='text-2xl font-semibold md:text-3xl lg:text-4xl'
            >
              How we choose technology for your project
            </MotionPreset>
          </div>

          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {content.principles?.map((p: any, idx: number) => {
              const PrincipleIcon = getLucideIcon(p.iconName)
              return (
                <MotionPreset
                  key={idx}
                  fade
                  slide={{ direction: 'up', offset: 20 }}
                  delay={idx * 0.1}
                  transition={{ duration: 0.5 }}
                >
                  <Card className='h-full border-none bg-white shadow-sm'>
                    <CardContent className='flex h-full flex-col gap-4 p-6'>
                      <div className={`flex size-12 items-center justify-center rounded-xl ${p.bgColor}`}>
                        <PrincipleIcon className={`size-6 ${p.color}`} />
                      </div>
                      <h3 className='text-lg font-bold'>{p.title}</h3>
                      <p className='text-muted-foreground text-[15px] leading-relaxed'>{p.description}</p>
                    </CardContent>
                  </Card>
                </MotionPreset>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        heading='Want a stack recommendation for your project?'
        description="Tell us what you're building and we'll suggest the right tools."
        buttonText='Book a Tech Stack Call'
        showServiceTags={false}
      />

      <Footer />
    </div>
  )
}
