import { Metadata } from 'next'
import Blog from '@/components/shadcn-studio/blocks/blog-component-15/blog-component-15'
import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'
import { createClient } from '@/utils/supabase/server'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Blog — Engineering Notes, AI Experiments & Product Playbooks | Apargo',
  description: 'Read the latest insights on product engineering, applied artificial intelligence, and software scaling strategy from the Apargo builder team.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog — Engineering Notes, AI Experiments & Product Playbooks | Apargo',
    description: 'Read the latest insights on product engineering, applied artificial intelligence, and software scaling strategy from the Apargo builder team.',
    url: '/blog',
    type: 'website',
  }
}

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

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Apargo Innovations Blog",
    "description": "Engineering notes, AI experiments, and product playbooks from the creators of AI Greentick.",
    "publisher": {
      "@type": "Organization",
      "name": "Apargo Innovations",
      "logo": "https://www.apargoinnovations.com/group-2.svg"
    },
    "blogPost": blogPosts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.description,
      "image": post.imageUrl,
      "url": `https://www.apargoinnovations.com${post.blogLink}`
    }))
  }

  return (
    <div className='flex min-h-screen flex-col font-sans'>
      <JsonLd data={blogSchema} />
      <SiteNavbar />
      <Blog blogPosts={blogPosts} />
      <Footer />
    </div>
  )
}

export default LandingPage
