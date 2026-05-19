import React from 'react'
import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CalendarDaysIcon, ClockIcon, ArrowLeftIcon, ArrowRightIcon, Share2Icon, BookmarkIcon, ThumbsUpIcon } from 'lucide-react'

// Dummy data for all blog posts
const allPosts = [
  {
    slug: 'how-we-decide-what-to-build-first',
    title: 'How we decide what to build first',
    description: 'A deep dive into our prioritization framework, balancing immediate client requests with long-term architectural scalability.',
    category: 'Engineering',
    date: 'May 15, 2026',
    readTime: '6 min read',
    author: 'Mohit Sharma',
    authorRole: 'Lead Engineer',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mohit',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-25.png',
    content: `
      <h2>The Prioritization Dilemma</h2>
      <p>Every engineering team faces the same fundamental challenge: an endless backlog of feature requests, bug fixes, and technical debt, paired with finite engineering hours. At Apargo, we’ve developed a battle-tested framework that removes the guesswork from our roadmap.</p>
      
      <h3>1. Impact vs. Effort Matrix</h3>
      <p>We start by categorizing every initiative into a strict 2x2 matrix. However, unlike traditional models, we weigh "Architectural Leverage" heavily. If a feature solves an immediate client need AND lays the groundwork for future microservices, its priority score multiplies.</p>
      
      <blockquote>
        "Building for today is necessary, but building reusable architectural blocks is what creates true engineering leverage."
      </blockquote>

      <h3>2. The RICE Score Adaptation</h3>
      <p>We utilize Reach, Impact, Confidence, and Effort (RICE), but we add a fifth variable: <strong>Maintenance Overhead (M)</strong>. A feature that takes 2 weeks to build but requires permanent manual operational support is penalized compared to a self-healing automated service.</p>

      <h2>Key Takeaways for Your Team</h2>
      <ul>
        <li>Always quantify technical debt reduction in terms of future velocity gained.</li>
        <li>Involve product managers in architectural discussions to align business goals with system design.</li>
        <li>Protect 20% of every sprint dedicated purely to refactoring and tooling improvements.</li>
      </ul>
    `
  },
  {
    slug: 'where-ai-saves-teams-time',
    title: 'Where AI actually saves teams time',
    description: 'Beyond the hype: real-world case studies of implementing LLM workflows and automated pipelines that cut development cycles by 40%.',
    category: 'AI & Automation',
    date: 'May 15, 2026',
    readTime: '5 min read',
    author: 'Phillip Palmer',
    authorRole: 'AI Solutions Architect',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Phillip',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-24.png',
    content: `
      <h2>Cutting Through the AI Noise</h2>
      <p>With AI tools flooding the market, it is easy for engineering teams to get distracted by shiny new toys that add more friction than value. Over the past year, Apargo has rigorously tested dozens of AI integrations across our development and operational workflows.</p>

      <h3>Where We Found Massive ROI</h3>
      <p>We tracked engineering hours before and after implementing specific AI augmentations. Here is where the numbers showed undeniable value:</p>

      <ul>
        <li><strong>Automated Code Review & Linting:</strong> Pre-filtering pull requests with custom LLM agents trained on our internal style guides reduced human PR review times by 45%.</li>
        <li><strong>Test Case Generation:</strong> Generating unit and integration test boilerplate automatically allowed our engineers to achieve 90%+ code coverage without sprint delays.</li>
        <li><strong>Documentation Maintenance:</strong> Keeping API docs synchronized with live codebase changes via automated post-commit hooks.</li>
      </ul>

      <blockquote>
        "AI will not replace elite engineers, but engineers who master AI workflows will replace those who do not."
      </blockquote>

      <h2>The Pitfalls to Avoid</h2>
      <p>Never rely on LLMs for core architectural decision-making or complex cryptographic logic. Human verification and rigorous CI/CD guardrails remain non-negotiable.</p>
    `
  },
  {
    slug: 'lessons-from-running-our-own-saas',
    title: 'Lessons from running our own SaaS',
    description: 'The operational, technical, and marketing takeaways from scaling AI Greentick to handle millions of WhatsApp messages daily.',
    category: 'SaaS Playbook',
    date: 'May 15, 2026',
    readTime: '8 min read',
    author: 'Michael Brown',
    authorRole: 'Head of Product',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-23.png',
    content: `
      <h2>From Internal Tool to High-Growth SaaS</h2>
      <p>AI Greentick began as an internal experiment to manage our own client communications. Today, it operates as a fully fledged WhatsApp marketing command center handling massive daily message volumes. Scaling this product taught us invaluable lessons about infrastructure and user experience.</p>

      <h3>1. Webhooks are Fragile; Queues are Resilient</h3>
      <p>In the early days, direct webhook processing caused bottlenecking during peak broadcast hours. Migrating to a robust event-driven architecture utilizing dead-letter queues ensures zero message loss even during upstream API outages.</p>

      <h3>2. Onboarding is Everything</h3>
      <p>We realized that no matter how powerful your AI chatbot features are, if the WhatsApp Business API onboarding takes more than 10 minutes, users drop off. We invested heavily in a seamless 3-click OAuth flow.</p>

      <blockquote>
        "Your software architecture is only as successful as your user onboarding funnel."
      </blockquote>

      <h2>Summary</h2>
      <p>Building SaaS requires an equal balance of relentless infrastructure optimization and obsessive customer empathy. Keep your feedback loops tight and your server queues robust.</p>
    `
  },
  {
    slug: 'design-smarter-user-behavior',
    title: 'Design Smarter: How User Behavior Shapes Winning Products',
    description: 'Learn how to discover what users truly want and build with confidence.',
    category: 'Product Design',
    date: 'March 12, 2025',
    readTime: '4 min read',
    author: 'Phillip Palmer',
    authorRole: 'Product Lead',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PhillipP',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/ink/image-04.png',
    content: `
      <h2>Observing Over Asking</h2>
      <p>User interviews are wonderful, but user analytics and session recordings reveal the unfiltered truth. Users often claim they want advanced customization, but heatmaps show they overwhelmingly rely on smart default presets.</p>

      <h3>Designing for the Lazy Flow</h3>
      <p>Every extra click cuts conversion by 10%. By mapping core user journeys and eliminating non-essential form fields, we consistently see user engagement skyrocket.</p>

      <blockquote>
        "Great design is not when there is nothing left to add, but when there is nothing left to take away."
      </blockquote>
    `
  },
  {
    slug: 'nail-your-first-launch',
    title: 'Nail Your First Launch: A Checklist for Product Debut Success',
    description: 'Avoid common launch traps and create excitement from day one.',
    category: 'Startup Growth',
    date: 'January 20, 2025',
    readTime: '5 min read',
    author: 'Michael Brown',
    authorRole: 'Growth Lead',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MichaelB',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/ink/image-05.png',
    content: `
      <h2>The Launch Day Playbook</h2>
      <p>A successful product launch is 80% preparation and 20% execution. From warming up your email list to coordinating ProductHunt upvotes, every detail matters.</p>

      <h3>Pre-Launch Checklist</h3>
      <ul>
        <li>Ensure your landing page passes the 5-second clarity test.</li>
        <li>Stress-test your database and CDN caching for traffic spikes.</li>
        <li>Prepare custom social share cards and press kits in advance.</li>
      </ul>
    `
  },
  {
    slug: 'why-fast-apps-win',
    title: 'Why Fast Apps Win: The Blueprint for Lightning-Quick Experiences',
    description: 'Explore proven strategies to boost speed and delight users every time.',
    category: 'Engineering',
    date: 'February 28, 2025',
    readTime: '7 min read',
    author: 'Jane Smith',
    authorRole: 'Performance Engineer',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/ink/image-06.png',
    content: `
      <h2>Speed is a Feature</h2>
      <p>In a world of infinite scrolling and instant gratification, a 2-second load time feels like an eternity. Performance optimization is directly correlated with user retention and revenue.</p>

      <h3>Core Optimization Strategies</h3>
      <p>We employ advanced Edge caching, aggressive image optimization (WebP/AVIF), and code splitting to ensure sub-second First Contentful Paint (FCP) across all Apargo applications.</p>
    `
  },
  {
    slug: 'scaling-design-component-system',
    title: 'Scaling Design the Right Way with a Solid Component System',
    description: 'Build consistency, save time, and ship optimized UI every release.',
    category: 'Design Systems',
    date: 'March 05, 2025',
    readTime: '6 min read',
    author: 'Dylan Field',
    authorRole: 'Design Systems Architect',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dylan',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/ink/image-07.png',
    content: `
      <h2>The Power of Design Tokens</h2>
      <p>A mature component library eliminates design discrepancies and drastically accelerates engineering velocity. By standardizing design tokens (spacing, typography, color palettes) across Figma and React, our teams speak the exact same language.</p>
    `
  },
  {
    slug: 'product-kpis-that-matter',
    title: 'Product KPIs That Actually Matter And How to Track Them',
    description: 'Measure progress the right way to build momentum and stay focused.',
    category: 'Analytics',
    date: 'January 09, 2025',
    readTime: '5 min read',
    author: 'Nina Rich',
    authorRole: 'Data Scientist',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nina',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/ink/image-08.png',
    content: `
      <h2>Vanity Metrics vs. Actionable KPIs</h2>
      <p>Tracking total signups is a vanity metric; tracking 30-day active user retention is an actionable KPI. We focus exclusively on metrics that inform product decisions and highlight friction points in the user journey.</p>
    `
  },
  {
    slug: 'ai-driven-workflows-transforming-product',
    title: 'How AI-Driven Workflows Are Transforming Product Development',
    description: 'Discover smarter ways to ideate, design, and build using AI tools.',
    category: 'AI & Future',
    date: 'March 05, 2025',
    readTime: '6 min read',
    author: 'Startup Growth',
    authorRole: 'Research Team',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Growth',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/ink/image-09.png',
    content: `
      <h2>The Next Generation of Product Management</h2>
      <p>From automated customer sentiment analysis to predictive feature adoption modeling, AI is reshaping how product managers synthesize feedback and plan roadmaps. Staying ahead requires embracing these automated synthesis tools today.</p>
    `
  }
]

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const { slug } = resolvedParams
  const post = allPosts.find(p => p.slug === slug) || allPosts[0]

  const relatedPosts = allPosts.filter(p => p.slug !== post.slug).slice(0, 3)

  return (
    <div className='flex min-h-screen flex-col font-sans'>
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
      </main>

      <Footer />
    </div>
  )
}
