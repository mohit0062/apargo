import { createClient } from '@/utils/supabase/server'
import { DEFAULT_FALLBACKS } from '@/utils/cms'
import TestimonialsClient from './testimonials-client'

export const dynamic = 'force-dynamic'

export default async function TestimonialsCMSPage() {
  const supabase = await createClient()

  // Fetch testimonials content from the site_sections table
  const { data: section } = await supabase
    .from('site_sections')
    .select('content')
    .eq('key', 'testimonials')
    .single()

  const testimonialsData = section?.content || DEFAULT_FALLBACKS.testimonials

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="border-b pb-5">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Testimonials CMS</h2>
        <p className="text-muted-foreground text-sm">
          Add, edit, delete, and reorder client reviews displayed on the website's homepage.
        </p>
      </div>

      <TestimonialsClient initialData={testimonialsData} />
    </div>
  )
}
