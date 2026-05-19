import Blog from '@/components/shadcn-studio/blocks/blog-component-15/blog-component-15'
import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'

const blogPosts = [
  {
    title: 'How we decide what to build first',
    description: 'A deep dive into our prioritization framework, balancing immediate client requests with long-term architectural scalability.',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-25.png',
    imageAlt: 'Engineering roadmap prioritization',
    date: 'May 15, 2026',
    category: 'Engineering',
    author: 'Mohit Sharma',
    authorLink: '#',
    blogLink: '/blog/how-we-decide-what-to-build-first',
    categoryLink: '#'
  },
  {
    title: 'Where AI actually saves teams time',
    description: 'Beyond the hype: real-world case studies of implementing LLM workflows and automated pipelines that cut development cycles by 40%.',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-24.png',
    imageAlt: 'AI workflows and automated pipelines',
    date: 'May 15, 2026',
    category: 'AI & Automation',
    author: 'Phillip Palmer',
    authorLink: '#',
    blogLink: '/blog/where-ai-saves-teams-time',
    categoryLink: '#'
  },
  {
    title: 'Lessons from running our own SaaS',
    description: 'The operational, technical, and marketing takeaways from scaling AI Greentick to handle millions of WhatsApp messages daily.',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-23.png',
    imageAlt: 'SaaS operational command center',
    date: 'May 15, 2026',
    category: 'SaaS Playbook',
    author: 'Michael Brown',
    authorLink: '#',
    blogLink: '/blog/lessons-from-running-our-own-saas',
    categoryLink: '#'
  },
  {
    title: 'Design Smarter: How User Behavior Shapes Winning Products',
    description: 'Learn how to discover what users truly want and build with confidence.',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/ink/image-04.png',
    imageAlt: 'Design workspace with color swatches',
    date: 'March 12, 2025',
    category: 'Product Design',
    author: 'Phillip Palmer',
    authorLink: '#',
    blogLink: '/blog/design-smarter-user-behavior',
    categoryLink: '#'
  },
  {
    title: 'Nail Your First Launch: A Checklist for Product Debut Success',
    description: 'Avoid common launch traps and create excitement from day one.',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/ink/image-05.png',
    imageAlt: 'Product launch analytics',
    date: 'January 20, 2025',
    category: 'Startup Growth',
    author: 'Michael Brown',
    authorLink: '#',
    blogLink: '/blog/nail-your-first-launch',
    categoryLink: '#'
  },
  {
    title: 'Why Fast Apps Win: The Blueprint for Lightning-Quick Experiences',
    description: 'Explore proven strategies to boost speed and delight users every time.',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/ink/image-06.png',
    imageAlt: 'Mobile app development',
    date: 'February 28, 2025',
    category: 'Engineering',
    author: 'Jane Smith',
    authorLink: '#',
    blogLink: '/blog/why-fast-apps-win',
    categoryLink: '#'
  },
  {
    title: 'Scaling Design the Right Way with a Solid Component System',
    description: 'Build consistency, save time, and ship optimized UI every release.',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/ink/image-07.png',
    imageAlt: 'Component design system',
    date: 'March 05, 2025',
    category: 'Design Systems',
    author: 'Dylan Field',
    authorLink: '#',
    blogLink: '/blog/scaling-design-component-system',
    categoryLink: '#'
  },
  {
    title: 'Product KPIs That Actually Matter And How to Track Them',
    description: 'Measure progress the right way to build momentum and stay focused.',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/ink/image-08.png',
    imageAlt: 'Team analyzing KPIs',
    date: 'January 09, 2025',
    category: 'Analytics',
    author: 'Nina Rich',
    authorLink: '#',
    blogLink: '/blog/product-kpis-that-matter',
    categoryLink: '#'
  },
  {
    title: 'How AI-Driven Workflows Are Transforming Product Development',
    description: 'Discover smarter ways to ideate, design, and build using AI tools.',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/ink/image-09.png',
    imageAlt: 'AI in product development',
    date: 'March 05, 2025',
    category: 'AI & Future',
    author: 'Startup Growth',
    authorLink: '#',
    blogLink: '/blog/ai-driven-workflows-transforming-product',
    categoryLink: '#'
  }
]

const BlogComponent15Block = () => {
  return <Blog blogPosts={blogPosts} />
}

const LandingPage = () => {
  return (
    <div className='flex min-h-screen flex-col font-sans'>
      <SiteNavbar />
      <BlogComponent15Block />
      <Footer />
    </div>
  )
}

export default LandingPage
