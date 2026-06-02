import React from 'react'
import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CalendarDaysIcon, ClockIcon, ArrowLeftIcon, ArrowRightIcon, Share2Icon, BookmarkIcon, ThumbsUpIcon } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/json-ld'

export const revalidate = 0

// Dynamically generate Meta Tags for SEO Optimization
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const { slug } = resolvedParams

  const supabase = await createClient()
  const { data: post } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!post) return {}

  const title = post.meta_title || post.title
  const description = post.meta_description || post.description || ''
  const keywords = post.tags ? post.tags.join(', ') : ''

  return {
    title: `${title} | Apargo Blog`,
    description,
    keywords,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/blog/${slug}`,
      publishedTime: post.created_at,
      authors: [post.author || 'Apargo'],
      images: [
        {
          url: post.image_url || 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-25.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.image_url || 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-25.png'],
    },
  }
}

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const { slug } = resolvedParams

  const supabase = await createClient()

  // Fetch the current post
  const { data: dbPost, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !dbPost) {
    notFound()
  }

  // Check admin authorization status for Draft / Trash viewing
  const { data: { user } } = await supabase.auth.getUser()
  const isAuthorized = !!user

  if (dbPost.status !== 'published' && !isAuthorized) {
    notFound()
  }

  // Increment views
  await supabase
    .from('blogs')
    .update({ views: (dbPost.views || 0) + 1 })
    .eq('id', dbPost.id)

  const post = {
    title: dbPost.title,
    description: dbPost.description || '',
    category: dbPost.category || 'Engineering',
    date: new Date(dbPost.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    readTime: dbPost.read_time || '5 min read',
    author: dbPost.author || 'Mohit Sharma',
    authorRole: dbPost.author_role || 'Lead Engineer',
    authorAvatar: dbPost.author_avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mohit',
    imageUrl: dbPost.image_url || 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-25.png',
    content: dbPost.content || '',
    slug: dbPost.slug,
  }

  // Fetch related posts (excluding current one, published only)
  const { data: dbRelated } = await supabase
    .from('blogs')
    .select('*')
    .eq('status', 'published')
    .neq('slug', slug)
    .limit(3)

  const relatedPosts = (dbRelated || []).map((related) => ({
    title: related.title,
    description: related.description || '',
    imageUrl: related.image_url || 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-25.png',
    date: new Date(related.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    category: related.category || 'Engineering',
    author: related.author || 'Mohit Sharma',
    slug: related.slug,
  }))

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.imageUrl,
    "datePublished": dbPost.created_at,
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.authorRole
    },
    "publisher": {
      "@type": "Organization",
      "name": "Apargo Innovations",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.apargoinnovations.com/group-2.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.apargoinnovations.com/blog/${post.slug}`
    }
  }

  return (
    <div className='flex min-h-screen flex-col font-sans'>
      <JsonLd data={blogSchema} />
      {/* Dynamic Warning Banner for drafts viewed by logged-in Admins */}
      {dbPost.status !== 'published' && (
        <div className="bg-amber-500 text-amber-950 px-4 py-2 text-center text-xs font-semibold select-none flex items-center justify-center gap-1.5 shadow-sm">
          <span>⚠️ <strong>Admin Preview Mode:</strong> This article status is set to "{dbPost.status?.toUpperCase()}" and is hidden from search engine crawlers and public feeds.</span>
        </div>
      )}

      <SiteNavbar />

      <main className='flex-1 pb-16 sm:pb-24'>
        {/* Hero Section */}
        <div className='bg-muted/50 border-b py-12 sm:py-20 lg:py-24'>
          <div className='container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
            <a
              href='/blog'
              className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'mb-6 -ml-3 text-muted-foreground hover:text-foreground')}
            >
              <ArrowLeftIcon className='mr-2 size-4' />
              Back to all blogs
            </a>

            <div className='flex items-center gap-3 mb-4'>
              <Badge className='bg-primary/10 text-primary rounded-full border-0 px-3 py-1 text-sm font-medium'>
                {post.category}
              </Badge>
              <span className='text-muted-foreground text-sm flex items-center gap-1.5'>
                <CalendarDaysIcon className='size-4' />
                {post.date}
              </span>
              <span className='text-muted-foreground text-sm flex items-center gap-1.5'>
                <ClockIcon className='size-4' />
                {post.readTime}
              </span>
            </div>

            <h1 className='text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-6'>
              {post.title}
            </h1>

            <p className='text-muted-foreground text-xl sm:text-2xl mb-8 leading-relaxed'>
              {post.description}
            </p>

            <div className='flex items-center justify-between border-t pt-6'>
              <div className='flex items-center gap-3'>
                <Avatar className='size-12 border'>
                  <AvatarImage src={post.authorAvatar} alt={post.author} />
                  <AvatarFallback>{post.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className='font-semibold text-foreground text-base'>{post.author}</div>
                  <div className='text-muted-foreground text-sm'>{post.authorRole}</div>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <button className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary')}>
                  <ThumbsUpIcon className='size-4' />
                </button>
                <button className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary')}>
                  <BookmarkIcon className='size-4' />
                </button>
                <button className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary')}>
                  <Share2Icon className='size-4' />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className='container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 mb-12 sm:mb-16'>
          <div className='overflow-hidden rounded-2xl border bg-background shadow-2xl'>
            <img
              src={post.imageUrl}
              alt={post.title}
              className='w-full max-h-[500px] object-cover'
            />
          </div>
        </div>

        {/* Article Content */}
        <div className='container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24'>
          <div
            className='max-w-none [&_h2]:scroll-m-20 [&_h2]:border-b [&_h2]:pb-2 [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:mt-12 [&_h2]:mb-6 [&_h3]:scroll-m-20 [&_h3]:text-xl [&_h3]:sm:text-2xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-4 [&_p]:leading-7 [&_p]:text-lg [&_p]:text-muted-foreground [&_p]:mt-6 [&_blockquote]:mt-6 [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:bg-primary/5 [&_blockquote]:py-3 [&_blockquote]:px-6 [&_blockquote]:rounded-r-lg [&_blockquote]:font-medium [&_blockquote]:italic [&_blockquote]:text-foreground [&_ul]:my-6 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_li]:leading-7 [&_li]:text-lg [&_li]:text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4'
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className='flex items-center justify-between border-t border-b py-6 mt-12'>
            <div className='flex items-center gap-3'>
              <span className='text-sm font-medium text-muted-foreground'>Share this article:</span>
              <div className='flex gap-2'>
                <button className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'rounded-full')}>Twitter</button>
                <button className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'rounded-full')}>LinkedIn</button>
                <button className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'rounded-full')}>Copy Link</button>
              </div>
            </div>
            <div className='flex gap-2'>
              <Badge variant='secondary' className='rounded-full px-3 py-1 text-sm'>{post.category}</Badge>
              <Badge variant='secondary' className='rounded-full px-3 py-1 text-sm'>Apargo Lab</Badge>
            </div>
          </div>
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className='bg-muted/30 border-t py-16 sm:py-24'>
            <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
              <div className='flex items-center justify-between mb-12'>
                <div>
                  <h2 className='text-2xl font-bold tracking-tight sm:text-3xl'>Related Articles</h2>
                  <p className='text-muted-foreground text-lg mt-1'>Explore more insights from our engineering and product teams.</p>
                </div>
                <a href='/blog' className={cn(buttonVariants({ variant: 'outline' }), 'rounded-lg')}>
                  View all blogs
                </a>
              </div>

              <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
                {relatedPosts.map((related) => (
                  <Card key={related.slug} className='group h-full overflow-hidden shadow-none transition-all duration-300 border hover:shadow-lg'>
                    <CardContent className='space-y-3.5 p-6'>
                      <div className='mb-6 overflow-hidden rounded-lg sm:mb-8'>
                        <a href={`/blog/${related.slug}`}>
                          <img
                            src={related.imageUrl}
                            alt={related.title}
                            className='max-h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105'
                          />
                        </a>
                      </div>
                      <div className='flex items-center justify-between gap-1.5'>
                        <div className='text-muted-foreground flex items-center gap-1.5'>
                          <CalendarDaysIcon className='size-5' />
                          <span>{related.date}</span>
                        </div>
                        <Badge className='bg-primary/10 text-primary rounded-full border-0 text-sm'>
                          {related.category}
                        </Badge>
                      </div>
                      <h3 className='line-clamp-2 text-lg font-medium md:text-xl'>
                        <a href={`/blog/${related.slug}`}>{related.title}</a>
                      </h3>
                      <p className='text-muted-foreground line-clamp-2 text-base'>{related.description}</p>
                      <div className='flex items-center justify-between pt-2'>
                        <span className='text-sm font-medium text-muted-foreground'>
                          {related.author}
                        </span>
                        <a
                          href={`/blog/${related.slug}`}
                          className={cn(
                            buttonVariants({ size: 'icon', variant: 'outline' }),
                            'group-hover:bg-primary! group-hover:text-primary-foreground group-hover:border-primary hover:border-primary hover:bg-primary! hover:text-primary-foreground rounded-full'
                          )}
                        >
                          <ArrowRightIcon className='size-4 -rotate-45' />
                          <span className='sr-only'>Read more: {related.title}</span>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

