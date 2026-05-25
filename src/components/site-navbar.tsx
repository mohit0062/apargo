"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  ArrowRightIcon,
  BadgeCheckIcon,
  BlocksIcon,
  BookOpenTextIcon,
  BotIcon,
  BriefcaseBusinessIcon,
  Building2Icon,
  ChevronRightIcon,
  CloudCogIcon,
  Code2Icon,
  CpuIcon,
  GraduationCapIcon,
  HeartPulseIcon,
  HomeIcon,
  LayoutDashboardIcon,
  MailIcon,
  MenuIcon,
  PaletteIcon,
  PlaneIcon,
  SearchCheckIcon,
  ShoppingBagIcon,
  SmartphoneIcon,
  SquareStackIcon,
  WalletCardsIcon,
  type LucideIcon,
} from "lucide-react"

import Logo from "@/components/shadcn-studio/logo"
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { buttonVariants } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

type NavLink = {
  title: string
  href: string
  description?: string
  icon?: LucideIcon
}

type NavGroup = {
  title: string
  href: string
  eyebrow: string
  description: string
  items: NavLink[]
  contentClassName?: string
  gridClassName?: string
}

const services: NavLink[] = [
  {
    title: "Web Development",
    href: "/services/web-development",
    description: "Conversion sites, portals, dashboards, and modern web apps.",
    icon: Code2Icon,
  },
  {
    title: "Mobile App Development",
    href: "/services/mobile-app-development",
    description: "Native-feeling iOS and Android experiences for growth teams.",
    icon: SmartphoneIcon,
  },
  {
    title: "Custom Software",
    href: "/services/custom-software",
    description: "Internal tools and product workflows shaped around your process.",
    icon: LayoutDashboardIcon,
  },
  {
    title: "AI & Machine Learning",
    href: "/services/ai-machine-learning",
    description: "Document AI, automation, agents, and model-powered features.",
    icon: BotIcon,
  },
  {
    title: "SaaS Product Development",
    href: "/services/saas-product-development",
    description: "From MVP to subscription-ready product platforms.",
    icon: BlocksIcon,
  },
  {
    title: "Cloud & DevOps",
    href: "/services/cloud-devops",
    description: "Reliable infrastructure, delivery pipelines, and observability.",
    icon: CloudCogIcon,
  },
  {
    title: "UI/UX Design",
    href: "/services/ui-ux-design",
    description: "Clear product systems, prototypes, and polished interfaces.",
    icon: PaletteIcon,
  },
  {
    title: "Digital Marketing & SEO",
    href: "/services/digital-marketing-seo",
    description: "Technical SEO, content systems, and measurable growth loops.",
    icon: SearchCheckIcon,
  },
  {
    title: "IT Consulting",
    href: "/services/it-consulting",
    description: "Architecture, roadmaps, audits, and senior engineering guidance.",
    icon: BriefcaseBusinessIcon,
  },
]

const industries: NavLink[] = [
  {
    title: "E-commerce",
    href: "/industries/ecommerce",
    description: "Storefronts, customer portals, and revenue operations.",
    icon: ShoppingBagIcon,
  },
  {
    title: "Healthcare",
    href: "/industries/healthcare",
    description: "Secure patient journeys and care operations software.",
    icon: HeartPulseIcon,
  },
  {
    title: "Education & EdTech",
    href: "/industries/education-edtech",
    description: "Learning platforms, admin tools, and student experiences.",
    icon: GraduationCapIcon,
  },
  {
    title: "Real Estate",
    href: "/industries/real-estate",
    description: "Property portals, CRMs, and buyer communication systems.",
    icon: Building2Icon,
  },
  {
    title: "FinTech",
    href: "/industries/fintech",
    description: "KYC flows, lending workflows, and secure dashboards.",
    icon: WalletCardsIcon,
  },
  {
    title: "Travel & Hospitality",
    href: "/industries/travel-hospitality",
    description: "Booking tools, guest apps, and hospitality operations.",
    icon: PlaneIcon,
  },
]

const products: NavLink[] = [
  {
    title: "AI Greentick",
    href: "/products/ai-greentick",
    description: "AI-assisted WhatsApp trust, automation, and support workflows.",
    icon: BadgeCheckIcon,
  },
  {
    title: "All Products",
    href: "/products",
    description: "Explore Apargo product accelerators and owned SaaS tools.",
    icon: SquareStackIcon,
  },
]

const navGroups: NavGroup[] = [
  {
    title: "Services",
    href: "/services",
    eyebrow: "Services",
    description: "Product engineering, AI, cloud, design, and growth support.",
    items: services,
    contentClassName: "w-[760px]",
    gridClassName: "grid-cols-3",
  },
  {
    title: "Industries",
    href: "/industries",
    eyebrow: "Industries",
    description: "Purpose-built software for teams in fast-moving markets.",
    items: industries,
    contentClassName: "w-[640px]",
    gridClassName: "grid-cols-2",
  },
  {
    title: "Products",
    href: "/products",
    eyebrow: "Products",
    description: "SaaS products and internal accelerators shaped by client work.",
    items: products,
    contentClassName: "w-[420px]",
    gridClassName: "grid-cols-1",
  },
]

const DEFAULT_STANDALONE_LINKS = [
  { title: "Home", href: "/" },
  { title: "Technologies", href: "/technologies" },
  { title: "Blog", href: "/blog" },
  { title: "Careers", href: "/careers" },
  { title: "Contact", href: "/contact" },
]

const iconMap: Record<string, LucideIcon> = {
  home: HomeIcon,
  technology: CpuIcon,
  technologies: CpuIcon,
  blog: BookOpenTextIcon,
  career: BriefcaseBusinessIcon,
  careers: BriefcaseBusinessIcon,
  contact: MailIcon,
  service: Code2Icon,
  services: Code2Icon,
  about: Building2Icon,
  product: SquareStackIcon,
  products: SquareStackIcon,
  portfolio: PaletteIcon,
  team: GraduationCapIcon,
}

function getIconForLink(title: string, href: string): LucideIcon {
  const t = title.toLowerCase().trim()
  const h = href.toLowerCase().trim()

  if (iconMap[t]) return iconMap[t]
  if (t.includes("home")) return HomeIcon
  if (t.includes("tech")) return CpuIcon
  if (t.includes("blog") || t.includes("news")) return BookOpenTextIcon
  if (t.includes("career") || t.includes("job") || t.includes("work")) return BriefcaseBusinessIcon
  if (t.includes("contact") || t.includes("mail") || t.includes("support")) return MailIcon
  if (t.includes("about") || t.includes("team") || t.includes("us")) return Building2Icon
  if (t.includes("product") || t.includes("saas") || t.includes("app")) return SquareStackIcon
  if (t.includes("service") || t.includes("work") || t.includes("offer")) return Code2Icon
  if (t.includes("portfolio") || t.includes("project")) return PaletteIcon

  // Also check href prefix patterns
  if (h === "/") return HomeIcon
  if (h.includes("blog")) return BookOpenTextIcon
  if (h.includes("career")) return BriefcaseBusinessIcon
  if (h.includes("contact")) return MailIcon
  if (h.includes("about")) return Building2Icon
  if (h.includes("product")) return SquareStackIcon
  if (h.includes("service")) return Code2Icon
  if (h.includes("tech")) return CpuIcon

  return BlocksIcon
}

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/"
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

function DesktopLink({
  item,
  active,
}: {
  item: NavLink
  active: boolean
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        href={item.href}
        className={cn(
          "h-9 rounded-full bg-transparent px-3 py-0 text-[0.86rem] font-medium text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground",
          active && "bg-secondary text-foreground"
        )}
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

function DesktopDropdown({
  group,
  active,
}: {
  group: NavGroup
  active: boolean
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(
          "h-9 rounded-full bg-transparent px-3 py-0 text-[0.86rem] font-medium text-muted-foreground shadow-none transition-all duration-200 hover:bg-secondary hover:text-foreground data-popup-open:bg-secondary data-popup-open:text-foreground [&_svg]:size-3.5",
          active && "bg-secondary text-foreground"
        )}
      >
        {group.title}
      </NavigationMenuTrigger>
      <NavigationMenuContent
        className={cn(
          "rounded-xl bg-popover/95 p-2 shadow-[0_24px_80px_rgba(14,20,16,0.12)] ring-1 ring-border/90 backdrop-blur-xl",
          group.contentClassName
        )}
      >
        <div className="space-y-2">
          <div className="flex items-end justify-between gap-6 border-b border-border/70 px-3 pb-3 pt-2">
            <div className="space-y-1">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary">
                {group.eyebrow}
              </p>
              <p className="max-w-md text-sm leading-5 text-muted-foreground">
                {group.description}
              </p>
            </div>
            <NavigationMenuLink
              href={group.href}
              className="hidden shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10 lg:flex"
            >
              View all
              <ArrowRightIcon className="size-3.5" />
            </NavigationMenuLink>
          </div>

          <div className={cn("grid gap-1.5", group.gridClassName)}>
            {group.items.map((item) => (
              <DropdownItem key={item.title} item={item} />
            ))}
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

function DropdownItem({ item }: { item: NavLink }) {
  const Icon = item.icon

  return (
    <NavigationMenuLink
      href={item.href}
      className="group items-start gap-3 rounded-lg p-3 transition-all duration-200 hover:bg-secondary/80"
    >
      {Icon && (
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-border/80 bg-background text-primary transition-colors duration-200 group-hover:border-primary/25 group-hover:bg-primary/10">
          <Icon className="size-4" />
        </span>
      )}
      <span className="min-w-0 space-y-1">
        <span className="block text-sm font-medium text-foreground">
          {item.title}
        </span>
        {item.description && (
          <span className="block text-[0.82rem] leading-5 text-muted-foreground">
            {item.description}
          </span>
        )}
      </span>
    </NavigationMenuLink>
  )
}

function DesktopNavigation({ links }: { links: Array<{ title: string; href: string }> }) {
  const pathname = usePathname()

  const mappedLinks: NavLink[] = (links || DEFAULT_STANDALONE_LINKS).map((link) => ({
    title: link.title,
    href: link.href,
    icon: getIconForLink(link.title, link.href)
  }))

  if (mappedLinks.length === 0) return null

  const firstLink = mappedLinks[0]
  const otherLinks = mappedLinks.slice(1)

  return (
    <nav className="hidden min-w-0 flex-1 justify-center xl:flex" aria-label="Main navigation">
      <NavigationMenu align="center" className="max-w-none flex-none">
        <NavigationMenuList className="gap-0.5 rounded-full border border-border/70 bg-card/70 p-1 shadow-sm">
          <DesktopLink item={firstLink} active={isActive(pathname, firstLink.href)} />
          {navGroups.map((group) => (
            <DesktopDropdown key={group.title} group={group} active={isActive(pathname, group.href)} />
          ))}
          {otherLinks.map((item) => (
            <DesktopLink key={item.title} item={item} active={isActive(pathname, item.href)} />
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}

function MobileNavLink({
  item,
  onNavigate,
}: {
  item: NavLink
  onNavigate: () => void
}) {
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="group flex min-h-11 items-center justify-between rounded-lg px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
    >
      <span className="flex items-center gap-3">
        {Icon && (
          <span className="flex size-8 items-center justify-center rounded-md bg-secondary text-primary">
            <Icon className="size-4" />
          </span>
        )}
        {item.title}
      </span>
      <ChevronRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  )
}

function MobileNavGroup({
  group,
  onNavigate,
}: {
  group: NavGroup
  onNavigate: () => void
}) {
  return (
    <AccordionItem value={group.title} className="border-border/70">
      <AccordionHeader>
        <AccordionTrigger className="min-h-12 px-3 py-3 text-base">
          {group.title}
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent>
        <div className="space-y-1 px-1">
          {group.items.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={onNavigate}
                className="group flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-secondary"
              >
                {Icon && (
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                    <Icon className="size-4" />
                  </span>
                )}
                <span className="min-w-0 space-y-1">
                  <span className="block text-sm font-medium text-foreground">
                    {item.title}
                  </span>
                  {item.description && (
                    <span className="block text-xs leading-5 text-muted-foreground">
                      {item.description}
                    </span>
                  )}
                </span>
              </Link>
            )
          })}
          <Link
            href={group.href}
            onClick={onNavigate}
            className="mt-1 flex min-h-10 items-center justify-between rounded-lg px-3 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
          >
            View all {group.title}
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

function MobileNavigation({ config }: { config: any }) {
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(false)

  const rawLinks = config.standaloneLinks || DEFAULT_STANDALONE_LINKS
  const linksWithIcons = rawLinks.map((link: any) => ({
    title: link.title,
    href: link.href,
    icon: getIconForLink(link.title, link.href)
  }))

  const firstLink = linksWithIcons[0] || { title: "Home", href: "/", icon: HomeIcon }
  const otherLinks = linksWithIcons.slice(1)

  const orderedMobileNav: Array<NavLink | NavGroup> = [
    firstLink,
    navGroups[0],
    navGroups[1],
    navGroups[2],
    ...otherLinks,
  ]

  return (
    <div className="xl:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          className={cn(
            buttonVariants({ variant: "outline", size: "icon-lg" }),
            "rounded-full bg-card/80"
          )}
          aria-label="Open navigation menu"
        >
          <MenuIcon className="size-5" />
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[min(92vw,25rem)] gap-0 overflow-hidden bg-background/95 p-0 backdrop-blur-xl sm:max-w-md"
        >
          <SheetHeader className="border-b border-border/70 px-5 py-4">
            <SheetTitle className="sr-only">Apargo navigation</SheetTitle>
            <SheetDescription className="sr-only">
              Main navigation links and consultation actions.
            </SheetDescription>
            <Link href="/" className="w-fit" onClick={closeMenu}>
              <div className="flex items-center gap-2">
                <Logo src={config.logoImageUrl} />
                {config.logoText && config.logoText !== "Apargo" && (
                  <span className="text-lg font-bold tracking-tight text-foreground">{config.logoText}</span>
                )}
              </div>
            </Link>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4 py-3">
            <Accordion multiple className="gap-1">
              {orderedMobileNav.map((item) => {
                if ("items" in item) {
                  return (
                    <MobileNavGroup
                      key={item.title}
                      group={item}
                      onNavigate={closeMenu}
                    />
                  )
                }

                return (
                  <div key={item.title} className="border-b border-border/70 py-1">
                    <MobileNavLink item={item} onNavigate={closeMenu} />
                  </div>
                )
              })}
            </Accordion>
          </div>

          <SheetFooter className="sticky bottom-0 border-t border-border/70 bg-background/95 p-4 backdrop-blur-xl">
            {config.demoBtnText && (
              <Link
                href={config.demoBtnLink || "/contact?intent=demo"}
                onClick={closeMenu}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 w-full rounded-full bg-card"
                )}
              >
                {config.demoBtnText}
              </Link>
            )}
            {config.consultBtnText && (
              <Link
                href={config.consultBtnLink || "/contact?intent=consultation"}
                onClick={closeMenu}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 w-full rounded-full shadow-[0_12px_28px_rgba(26,135,84,0.18)] hover:bg-primary/90"
                )}
              >
                {config.consultBtnText}
                <ArrowRightIcon className="size-4" />
              </Link>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export interface SiteNavbarProps {
  className?: string
  initialNavbarData?: {
    logoText?: string
    logoImageUrl?: string
    demoBtnText?: string
    demoBtnLink?: string
    consultBtnText?: string
    consultBtnLink?: string
    standaloneLinks?: Array<{ title: string; href: string }>
  }
}

export function SiteNavbar({ className, initialNavbarData }: SiteNavbarProps) {
  const [navbarConfig, setNavbarConfig] = useState(() => ({
    logoText: initialNavbarData?.logoText || "Apargo",
    logoImageUrl: initialNavbarData?.logoImageUrl || "/group-2.svg",
    demoBtnText: initialNavbarData?.demoBtnText || "Book a Demo",
    demoBtnLink: initialNavbarData?.demoBtnLink || "/contact?intent=demo",
    consultBtnText: initialNavbarData?.consultBtnText || "Book a Free Consultation",
    consultBtnLink: initialNavbarData?.consultBtnLink || "/contact?intent=consultation",
    standaloneLinks: initialNavbarData?.standaloneLinks || DEFAULT_STANDALONE_LINKS
  }))

  // Client-side fetch if server props not passed
  useState(() => {
    if (typeof window !== 'undefined' && !initialNavbarData) {
      const fetchNavbarData = async () => {
        try {
          const { createClient } = await import('@/utils/supabase/client')
          const supabase = createClient()
          const { data } = await supabase
            .from('site_sections')
            .select('content')
            .eq('key', 'navbar')
            .single()
          if (data && data.content) {
            setNavbarConfig((prev) => ({
              ...prev,
              ...data.content,
            }))
          }
        } catch (err) {
          console.error('Error fetching navbar dynamically:', err)
        }
      }
      fetchNavbarData()
    }
  })

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75",
        className
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[90rem] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Apargo home">
          <Logo className="shrink-0" src={navbarConfig.logoImageUrl} />
          {navbarConfig.logoText && navbarConfig.logoText !== "Apargo" && (
            <span className="text-xl font-bold tracking-tight text-foreground transition-all">
              {navbarConfig.logoText}
            </span>
          )}
        </Link>

        <DesktopNavigation links={navbarConfig.standaloneLinks} />

        <div className="ml-auto hidden shrink-0 items-center gap-2 xl:flex">
          {navbarConfig.demoBtnText && (
            <Link
              href={navbarConfig.demoBtnLink || "/contact?intent=demo"}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-10 rounded-full bg-card/80 px-4"
              )}
            >
              {navbarConfig.demoBtnText}
            </Link>
          )}
          {navbarConfig.consultBtnText && (
            <Link
              href={navbarConfig.consultBtnLink || "/contact?intent=consultation"}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-10 rounded-full px-5 shadow-[0_12px_28px_rgba(26,135,84,0.18)] hover:bg-primary/90"
              )}
            >
              {navbarConfig.consultBtnText}
              <ArrowRightIcon className="size-4" />
            </Link>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2 xl:hidden">
          {navbarConfig.consultBtnText && (
            <Link
              href={navbarConfig.consultBtnLink || "/contact?intent=consultation"}
              className={cn(
                buttonVariants({ size: "sm" }),
                "hidden h-9 rounded-full px-3 shadow-[0_10px_22px_rgba(26,135,84,0.14)] hover:bg-primary/90 sm:inline-flex"
              )}
            >
              {navbarConfig.consultBtnText.includes("Consultation") ? "Consultation" : navbarConfig.consultBtnText}
            </Link>
          )}
          <MobileNavigation config={navbarConfig} />
        </div>
      </div>
    </header>
  )
}

export default SiteNavbar
