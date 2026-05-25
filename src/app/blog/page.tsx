import Blog from '@/components/shadcn-studio/blocks/blog-component-15/blog-component-15'
import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'
import { createClient } from '@/utils/supabase/server'

// Force dynamic rendering to ensure posts are always fresh
export const revalidate = 0

const LandingPage = async () => {
  const supabase = await createClient()

  // Fetch blogs from Supabase (published only)
  const { data: dbPosts } = await supabase
    .from('blogs')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  const blogPosts = (dbPosts || []).map((post) => ({
    title: post.title,
    description: post.description || '',
    imageUrl: post.image_url || 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-25.png',
    imageAlt: post.title,
    date: new Date(post.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    category: post.category || 'Engineering',
    author: post.author || 'Mohit Sharma',
    authorLink: '#',
    blogLink: `/blog/${post.slug}`,
    categoryLink: '#',
  }))

  return (
    <div className='flex min-h-screen flex-col font-sans'>
      <SiteNavbar />
      <Blog blogPosts={blogPosts} />
      <Footer />
    </div>
  )
}

export default LandingPage
