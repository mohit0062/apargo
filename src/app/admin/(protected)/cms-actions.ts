'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

function getCategoryForKey(key: string): string {
  if (key.startsWith('homepage_') || key === 'testimonials') {
    return 'homepage'
  }
  if (key.startsWith('industry_')) {
    return 'industries'
  }
  if (key.startsWith('service_')) {
    return 'services'
  }
  // Map all other sections/pages (about_page, page_contact, page_faq, page_careers, page_technologies, page_products, page_ai_greentick, etc.)
  // to 'common' to avoid violating the site_sections_category_check constraint (which only allows 'common', 'homepage', 'services', 'industries').
  return 'common'
}


export async function updateSiteSectionAction(key: string, content: any) {
  try {
    const supabase = await createClient()

    // 1. Double check authentication status
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { error: 'Unauthorized: Admin authentication required.' }
    }

    // Determine category based on key to satisfy the NOT NULL constraint in database
    const category = getCategoryForKey(key)

    // 2. Perform upsert into site_sections
    const { error } = await supabase
      .from('site_sections')
      .upsert(
        { key, category, content, updated_at: new Date().toISOString() },
        { onConflict: 'key' }
      )

    if (error) {
      console.error(`Supabase error saving section [${key}]:`, error)
      return { error: `Failed to save changes: ${error.message}` }
    }

    // 3. Clear Static Page Caches for instant UI update
    revalidatePath('/')
    revalidatePath('/careers')
    revalidatePath('/case-studies')
    revalidatePath('/services')
    revalidatePath('/services/web-development')
    revalidatePath('/services/mobile-app-development')
    revalidatePath('/services/custom-software')
    revalidatePath('/services/ai-machine-learning')
    revalidatePath('/services/saas-product-development')
    revalidatePath('/services/cloud-devops')
    revalidatePath('/services/ui-ux-design')
    revalidatePath('/services/digital-marketing-seo')
    revalidatePath('/services/it-consulting')
    revalidatePath('/blog')
    revalidatePath('/about')
    revalidatePath('/contact')
    revalidatePath('/technologies')
    revalidatePath('/industries')
    revalidatePath('/industries/ecommerce')
    revalidatePath('/industries/education-edtech')
    revalidatePath('/industries/fintech')
    revalidatePath('/industries/healthcare')
    revalidatePath('/industries/real-estate')
    revalidatePath('/industries/travel-hospitality')
    revalidatePath('/products')
    revalidatePath('/products/ai-greentick')

    return { success: true }
  } catch (err: any) {
    console.error('Server Action Error inside updateSiteSectionAction:', err)
    return { error: err.message || 'An unexpected server error occurred.' }
  }
}
