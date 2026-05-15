import Link from 'next/link'
import { Mail, Phone, MapPin, Globe } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const Footer = () => {
  return (
    <footer>
      <div className='mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-16 md:py-24 lg:grid-cols-4'>
        <div className='flex flex-col items-start gap-4'>
          <img src='/group-2.svg' alt='Apargo' className='mb-4 h-12 w-auto max-w-48' />
          <p className='text-muted-foreground text-sm font-sans'>
            Product engineering and AI services. Builders of AI Greentick.
          </p>
          <div className='flex items-center gap-4 mt-4'>
            <a href='#' target='#'>
              <Globe className='size-5' />
            </a>
            <a href='#' target='#'>
              <Mail className='size-5' />
            </a>
            <a href='#' target='#'>
              <Phone className='size-5' />
            </a>
            <a href='#' target='#'>
              <MapPin className='size-5' />
            </a>
          </div>
        </div>

        <div className='flex flex-col gap-5'>
          <div className='text-lg font-medium'>Services</div>
          <ul className='text-muted-foreground space-y-3 text-sm'>
            <li><Link href='/services/web-development' className='hover:text-foreground transition-colors duration-300'>Web Development</Link></li>
            <li><Link href='/services/mobile-app-development' className='hover:text-foreground transition-colors duration-300'>Mobile App Development</Link></li>
            <li><Link href='/services/custom-software' className='hover:text-foreground transition-colors duration-300'>Custom Software</Link></li>
            <li><Link href='/services/ai-machine-learning' className='hover:text-foreground transition-colors duration-300'>AI & Machine Learning</Link></li>
            <li><Link href='/services/saas-product-development' className='hover:text-foreground transition-colors duration-300'>SaaS Product Development</Link></li>
            <li><Link href='/services/cloud-devops' className='hover:text-foreground transition-colors duration-300'>Cloud & DevOps</Link></li>
          </ul>
        </div>

        <div className='flex flex-col gap-5'>
          <div className='text-lg font-medium'>Products</div>
          <ul className='text-muted-foreground space-y-3 text-sm'>
            <li><Link href='/products/ai-greentick' className='hover:text-foreground transition-colors duration-300'>AI Greentick</Link></li>
            <li><Link href='/products' className='hover:text-foreground transition-colors duration-300'>All Products</Link></li>
          </ul>
        </div>

        <div className='flex flex-col gap-5'>
          <div className='text-lg font-medium'>Company</div>
          <ul className='text-muted-foreground space-y-3 text-sm'>
            <li><Link href='/about' className='hover:text-foreground transition-colors duration-300'>About Us</Link></li>
            <li><Link href='/industries' className='hover:text-foreground transition-colors duration-300'>Industries</Link></li>
            <li><Link href='/case-studies' className='hover:text-foreground transition-colors duration-300'>Case Studies</Link></li>
            <li><Link href='/blog' className='hover:text-foreground transition-colors duration-300'>Blog</Link></li>
            <li><Link href='/careers' className='hover:text-foreground transition-colors duration-300'>Careers</Link></li>
            <li><Link href='/contact' className='hover:text-foreground transition-colors duration-300'>Contact</Link></li>
          </ul>
        </div>
      </div>

      <Separator />

      <div className='mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-6 sm:px-6'>
        <p className='text-muted-foreground text-sm'>
          {`© ${new Date().getFullYear()}`} Apargo. All rights reserved.
        </p>

        <div className='flex flex-wrap items-center gap-6 text-sm text-muted-foreground'>
          <a href="#" className="hover:text-foreground">Privacy Policy</a>
          <a href="#" className="hover:text-foreground">Terms of Service</a>
          <a href="#" className="hover:text-foreground">Cookie Policy</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
