'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Globe } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export type FooterLink = { title: string; href: string }
export type FooterColumn = { title: string; links: FooterLink[] }

export const DEFAULT_LINK_COLUMNS: FooterColumn[] = [
  {
    title: "Services",
    links: [
      { title: "Web Development", href: "/services/web-development" },
      { title: "Mobile App Development", href: "/services/mobile-app-development" },
      { title: "Custom Software", href: "/services/custom-software" },
      { title: "AI & Machine Learning", href: "/services/ai-machine-learning" },
      { title: "SaaS Product Development", href: "/services/saas-product-development" },
      { title: "Cloud & DevOps", href: "/services/cloud-devops" },
      { title: "UI/UX Design", href: "/services/ui-ux-design" },
      { title: "Digital Marketing & SEO", href: "/services/digital-marketing-seo" },
      { title: "IT Consulting", href: "/services/it-consulting" },
    ]
  },
  {
    title: "Products",
    links: [
      { title: "AI Greentick", href: "/products/ai-greentick" },
      { title: "All Products", href: "/products" },
    ]
  },
  {
    title: "Company",
    links: [
      { title: "About Us", href: "/about" },
      { title: "Industries", href: "/industries" },
      { title: "Technologies", href: "/technologies" },
      { title: "Blog", href: "/blog" },
      { title: "FAQ", href: "/faq" },
      { title: "Careers", href: "/careers" },
      { title: "Contact", href: "/contact" },
    ]
  },
]

export const DEFAULT_BOTTOM_LINKS: FooterLink[] = [
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Terms of Service", href: "/terms" },
  { title: "Cookie Policy", href: "/cookie-policy" },
]

export interface FooterProps {
  initialFooterData?: {
    description?: string
    copyright?: string
    logoImageUrl?: string
    socialLinks?: {
      globe?: string
      mail?: string
      phone?: string
      mapPin?: string
    }
    linkColumns?: FooterColumn[]
    bottomLinks?: FooterLink[]
  }
}

const Footer = ({ initialFooterData }: FooterProps) => {
  const [footerConfig, setFooterConfig] = useState(() => ({
    description: initialFooterData?.description || "Product engineering and AI services. Builders of AI Greentick.",
    copyright: initialFooterData?.copyright || "Apargo. All rights reserved.",
    logoImageUrl: initialFooterData?.logoImageUrl || "/group-2.svg",
    socialLinks: {
      globe: initialFooterData?.socialLinks?.globe || "https://apargo.com",
      mail: initialFooterData?.socialLinks?.mail || "hello@apargo.com",
      phone: initialFooterData?.socialLinks?.phone || "hello@apargo.com",
      mapPin: initialFooterData?.socialLinks?.mapPin || "/contact",
    },
    linkColumns: (initialFooterData?.linkColumns && initialFooterData.linkColumns.length > 0) ? initialFooterData.linkColumns : DEFAULT_LINK_COLUMNS,
    bottomLinks: (initialFooterData?.bottomLinks && initialFooterData.bottomLinks.length > 0) ? initialFooterData.bottomLinks : DEFAULT_BOTTOM_LINKS,
  }))

  // Dynamic client-side fetch if server prop is not passed
  useState(() => {
    if (typeof window !== 'undefined' && !initialFooterData) {
      const fetchFooterData = async () => {
        try {
          const { createClient } = await import('@/utils/supabase/client')
          const supabase = createClient()
          const { data } = await supabase
            .from('site_sections')
            .select('content')
            .eq('key', 'footer')
            .single()
          if (data && data.content) {
            setFooterConfig((prev) => ({
              ...prev,
              description: data.content.description || prev.description,
              copyright: data.content.copyright || prev.copyright,
              logoImageUrl: data.content.logoImageUrl || prev.logoImageUrl,
              socialLinks: {
                ...prev.socialLinks,
                ...(data.content.socialLinks || {}),
              },
              // Only override linkColumns/bottomLinks if DB has non-empty arrays
              linkColumns: (data.content.linkColumns && data.content.linkColumns.length > 0) ? data.content.linkColumns : prev.linkColumns,
              bottomLinks: (data.content.bottomLinks && data.content.bottomLinks.length > 0) ? data.content.bottomLinks : prev.bottomLinks,
            }))
          }
        } catch (err) {
          console.error('Error fetching footer dynamically:', err)
        }
      }
      fetchFooterData()
    }
  })

  const columns = footerConfig.linkColumns || DEFAULT_LINK_COLUMNS
  const bottomLinks = footerConfig.bottomLinks || DEFAULT_BOTTOM_LINKS

  // Grid columns: 1 for brand + N for link columns
  const totalCols = 1 + columns.length
  const gridClass =
    totalCols <= 2 ? 'lg:grid-cols-2' :
    totalCols <= 3 ? 'lg:grid-cols-3' :
    totalCols <= 4 ? 'lg:grid-cols-4' :
    'lg:grid-cols-5'

  return (
    <footer>
      <div className={`mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-16 md:py-24 ${gridClass}`}>
        <div className='flex flex-col items-start gap-4'>
          <img src={footerConfig.logoImageUrl || '/group-2.svg'} alt='Apargo' className='mb-4 h-12 w-auto max-w-48' />
          <p className='text-muted-foreground text-sm font-sans leading-relaxed'>
            {footerConfig.description}
          </p>
          <div className='flex items-center gap-4 mt-4'>
            {footerConfig.socialLinks.globe && (
              <a href={footerConfig.socialLinks.globe} target='_blank' rel='noopener noreferrer' className='text-muted-foreground hover:text-foreground transition-colors' title="Website">
                <Globe className='size-5' />
              </a>
            )}
            {footerConfig.socialLinks.mail && (
              <a href={footerConfig.socialLinks.mail.startsWith('mailto:') ? footerConfig.socialLinks.mail : `mailto:${footerConfig.socialLinks.mail}`} className='text-muted-foreground hover:text-foreground transition-colors' title="Email">
                <Mail className='size-5' />
              </a>
            )}
            {footerConfig.socialLinks.phone && (
              <a href={footerConfig.socialLinks.phone.includes('@') ? `mailto:${footerConfig.socialLinks.phone}` : `tel:${footerConfig.socialLinks.phone}`} className='text-muted-foreground hover:text-foreground transition-colors' title="Contact info">
                <Phone className='size-5' />
              </a>
            )}
            {footerConfig.socialLinks.mapPin && (
              <Link href={footerConfig.socialLinks.mapPin} className='text-muted-foreground hover:text-foreground transition-colors' title="Location">
                <MapPin className='size-5' />
              </Link>
            )}
          </div>
        </div>

        {columns.map((column, colIdx) => (
          <div key={colIdx} className='flex flex-col gap-5'>
            <div className='text-lg font-medium'>{column.title}</div>
            <ul className='text-muted-foreground space-y-3 text-sm'>
              {(column.links || []).map((link, linkIdx) => (
                <li key={linkIdx}>
                  <Link href={link.href} className='hover:text-foreground transition-colors duration-300'>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Separator />

      <div className='mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-6 sm:px-6'>
        <p className='text-muted-foreground text-sm font-sans'>
          © {new Date().getFullYear()} {footerConfig.copyright}
        </p>

        <div className='flex flex-wrap items-center gap-6 text-sm text-muted-foreground'>
          {bottomLinks.map((link, idx) => (
            <Link key={idx} href={link.href} className='hover:text-foreground transition-colors duration-300'>
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
