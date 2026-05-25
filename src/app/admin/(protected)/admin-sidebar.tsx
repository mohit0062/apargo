'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, MessageSquare, FileText, Settings, LogOut,
  Home, Globe, Quote, Info, Briefcase, Building2, Shield, Lock,
  Cpu, HelpCircle, Users, Mail, Boxes, Smartphone
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { canAccess, getRoleLabel, getRoleBadgeClasses } from '@/utils/roles'

type NavItem = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  exact?: boolean
  group: 'main' | 'cms' | 'system'
}

const navItems: NavItem[] = [
  // Main
  { href: '/admin',              label: 'Dashboard',         icon: LayoutDashboard, exact: true, group: 'main' },
  { href: '/admin/inquiries',    label: 'Inquiries',         icon: MessageSquare,                group: 'main' },

  // CMS
  { href: '/admin/blogs',        label: 'Blogs',             icon: FileText,                     group: 'cms' },
  { href: '/admin/testimonials', label: 'Testimonials',      icon: Quote,                        group: 'cms' },
  { href: '/admin/homepage',     label: 'Home Page',         icon: Home,                         group: 'cms' },
  { href: '/admin/about',        label: 'About Page',        icon: Info,                         group: 'cms' },
  { href: '/admin/services',     label: 'Services',          icon: Briefcase,                    group: 'cms' },
  { href: '/admin/industries',   label: 'Industries',        icon: Building2,                    group: 'cms' },
  { href: '/admin/technologies', label: 'Technologies',      icon: Cpu,                          group: 'cms' },
  { href: '/admin/faq',          label: 'FAQ',               icon: HelpCircle,                   group: 'cms' },
  { href: '/admin/careers',      label: 'Careers',           icon: Users,                        group: 'cms' },
  { href: '/admin/contact',      label: 'Contact',           icon: Mail,                         group: 'cms' },
  { href: '/admin/products',      label: 'Products',          icon: Boxes,                        group: 'cms' },
  { href: '/admin/products/ai-greentick', label: 'AI Greentick',     icon: Smartphone,            group: 'cms' },

  // System
  { href: '/admin/common-sections', label: 'Common Sections', icon: Globe,                      group: 'system' },
  { href: '/admin/settings',     label: 'Settings & Users',  icon: Settings,                     group: 'system' },
]

const GROUP_LABELS: Record<string, string> = {
  main:   'Overview',
  cms:    'Content Management',
  system: 'System',
}

export default function AdminSidebar({
  userEmail,
  userRole = 'editor',
  allowedPaths,
}: {
  userEmail: string
  userRole?: string
  allowedPaths?: string[]
}) {
  const pathname = usePathname()

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    const match = pathname === href || pathname.startsWith(href + '/')
    if (!match) return false

    // Check if there is a more specific (longer) matching nav item
    const hasMoreSpecificMatch = navItems.some(item => 
      item.href !== href && 
      item.href.startsWith(href + '/') && 
      (pathname === item.href || pathname.startsWith(item.href + '/'))
    )
    return !hasMoreSpecificMatch
  }

  // Split items into accessible and restricted
  const groups: Record<string, { item: NavItem; allowed: boolean }[]> = {}
  for (const item of navItems) {
    if (!groups[item.group]) groups[item.group] = []
    
    let allowed = false
    if (allowedPaths && allowedPaths.length > 0) {
      const normalized = item.href.endsWith('/') ? item.href.slice(0, -1) : item.href
      const matchingKey = allowedPaths
        .sort((a, b) => b.length - a.length)
        .find(key => normalized === key || normalized.startsWith(key + '/'))
      
      if (userRole === 'super_admin' && (normalized === '/admin' || normalized === '/admin/settings')) {
        allowed = true
      } else {
        allowed = !!matchingKey
      }
    } else {
      allowed = canAccess(userRole, item.href)
    }
    
    groups[item.group].push({ item, allowed })
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
      {/* Logo */}
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="bg-primary text-primary-foreground rounded-md px-2 py-1 text-xs">Apargo</span>
          <span>Admin</span>
        </Link>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-auto py-3">
        {(['main', 'cms', 'system'] as const).map((group) => {
          const items = groups[group]
          if (!items || items.length === 0) return null

          return (
            <div key={group} className="mb-4">
              <p className="px-4 pb-1 pt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 select-none">
                {GROUP_LABELS[group]}
              </p>
              <nav className="grid px-2 text-sm font-medium lg:px-3">
                {items.map(({ item, allowed }) => {
                  const active = isActive(item.href, item.exact)
                  if (!allowed) {
                    // Show locked item — grayed out, not clickable
                    return (
                      <div
                        key={item.href}
                        title={`Requires higher role to access`}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground/40 cursor-not-allowed select-none"
                      >
                        <item.icon className="h-4 w-4" />
                        <span className="flex-1 truncate">{item.label}</span>
                        <Lock className="h-3 w-3 shrink-0" />
                      </div>
                    )
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
                        active ? 'bg-muted text-primary' : 'text-muted-foreground'
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </div>
          )
        })}
      </div>

      {/* User Profile Card + Logout */}
      <div className="mt-auto border-t">
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            {/* Avatar initials */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm select-none">
              {userEmail ? userEmail.charAt(0).toUpperCase() : '?'}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">{userEmail}</p>
              {/* Role Badge */}
              <span
                className={cn(
                  'inline-flex items-center gap-1 mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide',
                  getRoleBadgeClasses(userRole)
                )}
              >
                <Shield className="h-2.5 w-2.5" />
                {getRoleLabel(userRole)}
              </span>
            </div>
          </div>

          {/* Logout */}
          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted text-sm"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </form>
        </div>
      </div>
    </aside>
  )
}
