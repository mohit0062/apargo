import Link from 'next/link'

import { Button } from '@/components/ui/button'
import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col'>
      <SiteNavbar />
      <main className='flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center'>
        <p className='text-muted-foreground text-sm font-medium uppercase tracking-widest'>404</p>
        <h1 className='text-3xl font-semibold md:text-4xl lg:text-5xl'>Page not found</h1>
        <p className='text-muted-foreground max-w-md text-lg'>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className='flex flex-wrap items-center justify-center gap-4'>
          <Button size='lg' render={<Link href='/' />}>
            Go home
          </Button>
          <Button variant='outline' size='lg' render={<Link href='/contact' />}>
            Contact us
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
