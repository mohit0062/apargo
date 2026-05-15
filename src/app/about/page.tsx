import Blog from '@/components/shadcn-studio/blocks/blog-component-06/blog-component-06'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'
import SiteNavbar from '@/components/site-navbar'

const blogCards = [
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-25.png',
    alt: 'Search and Discovery',
    tags: ['Articles', 'Post Types'],
    title: 'Estate Insights and Advice Corner',
    date: 'Nov 11, 2023',
    blogLink: '#'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-24.png',
    alt: 'Dreamscape Realty',
    tags: ['Articles', 'Post Types'],
    title: 'Dreamscape Realty to Real Estate',
    date: 'Dec 3, 2023',
    blogLink: '#'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-23.png',
    alt: 'Property Sale Agreement',
    tags: ['Articles', 'Post Types'],
    title: 'What is Property Agreement?',
    date: 'January 15, 2024',
    blogLink: '#'
  }
]

const BlogComponent06Block = () => {
  return <Blog blogCards={blogCards} />
}

const LandingPage = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <SiteNavbar />
      <main className='flex-1'>
        <BlogComponent06Block />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage
