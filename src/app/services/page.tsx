import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRightIcon,
  BotIcon,
  BriefcaseBusinessIcon,
  CheckCircle2Icon,
  CloudCogIcon,
  Code2Icon,
  LayoutDashboardIcon,
  PaletteIcon,
  RocketIcon,
  SearchCheckIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  SparklesIcon,
  WorkflowIcon,
  type LucideIcon,
} from "lucide-react"

import Footer from "@/components/shadcn-studio/blocks/footer-component-05/footer-component-05"
import SiteNavbar from "@/components/site-navbar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Services | Apargo",
  description:
    "Explore Apargo services across web development, mobile apps, custom software, AI, SaaS products, cloud, UI/UX, SEO, and IT consulting.",
}

type ServiceItem = {
  title: string
  href: string
  icon: LucideIcon
  label: string
  description: string
  deliverables: string[]
  bestFor: string
}

const services: ServiceItem[] = [
  {
    title: "Web Development",
    href: "/services/web-development",
    icon: Code2Icon,
    label: "Web",
    description:
      "High-performance websites, landing pages, portals, dashboards, and business web apps built with a modern stack.",
    deliverables: ["Marketing websites", "Web apps", "Admin dashboards"],
    bestFor: "Founders and teams that need a fast, credible web presence or a web product users can rely on.",
  },
  {
    title: "Mobile App Development",
    href: "/services/mobile-app-development",
    icon: SmartphoneIcon,
    label: "Mobile",
    description:
      "iOS and Android apps with smooth onboarding, push notifications, payments, offline flows, and clean release pipelines.",
    deliverables: ["React Native apps", "Flutter apps", "App store releases"],
    bestFor: "Consumer products, field teams, marketplaces, and businesses that need users to act on mobile.",
  },
  {
    title: "Custom Software",
    href: "/services/custom-software",
    icon: LayoutDashboardIcon,
    label: "Software",
    description:
      "Internal tools, CRMs, ERPs, workflow systems, reporting tools, and operational platforms shaped around your process.",
    deliverables: ["Internal tools", "Workflow platforms", "Role-based systems"],
    bestFor: "Teams replacing spreadsheets, manual handoffs, or disconnected tools with one focused system.",
  },
  {
    title: "AI & Machine Learning",
    href: "/services/ai-machine-learning",
    icon: BotIcon,
    label: "AI",
    description:
      "Practical AI features that save time: chatbots, document AI, recommendation systems, automation, and LLM integrations.",
    deliverables: ["AI assistants", "Document automation", "Model integrations"],
    bestFor: "Businesses with repeatable support, content, document, or decision workflows ready for automation.",
  },
  {
    title: "SaaS Product Development",
    href: "/services/saas-product-development",
    icon: RocketIcon,
    label: "SaaS",
    description:
      "MVPs, subscriptions, product dashboards, analytics, billing flows, and scalable SaaS platforms from roadmap to release.",
    deliverables: ["MVP builds", "Subscription flows", "Product analytics"],
    bestFor: "Startups and companies turning a product idea into a usable, revenue-ready SaaS platform.",
  },
  {
    title: "Cloud & DevOps",
    href: "/services/cloud-devops",
    icon: CloudCogIcon,
    label: "Cloud",
    description:
      "Cloud architecture, CI/CD, hosting, monitoring, backups, infrastructure cleanup, and production deployment workflows.",
    deliverables: ["Cloud setup", "CI/CD pipelines", "Monitoring and backups"],
    bestFor: "Products that need stable infrastructure, faster releases, and fewer production surprises.",
  },
  {
    title: "UI/UX Design",
    href: "/services/ui-ux-design",
    icon: PaletteIcon,
    label: "Design",
    description:
      "Product strategy, UX flows, wireframes, interface design, design systems, and prototypes that make software easier to use.",
    deliverables: ["UX flows", "UI systems", "Clickable prototypes"],
    bestFor: "Teams that need clarity before development or want to improve an existing product experience.",
  },
  {
    title: "Digital Marketing & SEO",
    href: "/services/digital-marketing-seo",
    icon: SearchCheckIcon,
    label: "Growth",
    description:
      "Technical SEO, content structure, landing pages, analytics, conversion tracking, and growth systems for product-led websites.",
    deliverables: ["Technical SEO", "Landing pages", "Analytics setup"],
    bestFor: "Businesses that need more qualified traffic and a site that can convert that attention.",
  },
  {
    title: "IT Consulting",
    href: "/services/it-consulting",
    icon: BriefcaseBusinessIcon,
    label: "Advisory",
    description:
      "Senior technical guidance for architecture, vendor decisions, audits, product planning, delivery rescue, and roadmap choices.",
    deliverables: ["Architecture reviews", "Technical audits", "Roadmap planning"],
    bestFor: "Leaders who need experienced engineering judgment before investing in a build or migration.",
  },
]

const proofPoints = [
  {
    icon: WorkflowIcon,
    title: "One team from idea to launch",
    description: "Strategy, design, engineering, AI, cloud, and growth can stay under one accountable delivery team.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Production-minded delivery",
    description: "We plan for security, ownership, maintainability, and handover while building the first usable version.",
  },
  {
    icon: SparklesIcon,
    title: "AI where it creates leverage",
    description: "Apargo applies AI to real workflow bottlenecks, not as decoration around a normal software project.",
  },
]

const steps = [
  "Choose the service closest to your current problem.",
  "Share context, timeline, users, and success criteria.",
  "Get a practical scope with milestones, cost, and next steps.",
]

function ServiceCard({ service }: { service: ServiceItem }) {
  const Icon = service.icon

  return (
    <Card className="h-full rounded-md border-border/80 py-0 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_18px_42px_-34px_rgba(14,20,16,0.45)]">
      <CardHeader className="rounded-t-md border-b border-border/70 p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <span className="flex size-10 items-center justify-center rounded-md border border-primary/15 bg-primary/10 text-primary">
            <Icon className="size-5" />
          </span>
          <Badge variant="outline" className="rounded-full bg-background px-2.5 py-1 text-xs font-medium">
            {service.label}
          </Badge>
        </div>
        <CardTitle className="text-xl">{service.title}</CardTitle>
        <CardDescription className="leading-6">{service.description}</CardDescription>
        <CardAction>
          <Link
            href={service.href}
            aria-label={`View ${service.title}`}
            className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ArrowRightIcon className="size-4" />
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5 p-5">
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Includes
          </div>
          <ul className="space-y-2">
            {service.deliverables.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle2Icon className="size-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto rounded-md bg-secondary/60 p-3 text-sm leading-6 text-muted-foreground">
          <span className="font-medium text-foreground">Best for:</span> {service.bestFor}
        </div>
      </CardContent>
    </Card>
  )
}

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteNavbar />

      <main className="flex-1">
        <section className="overflow-hidden border-b border-border/70 bg-[linear-gradient(180deg,#FAF8F4_0%,#FFFFFF_100%)]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.78fr] lg:px-8 lg:py-24">
            <div className="flex flex-col justify-center">
              <Badge variant="outline" className="mb-5 w-fit rounded-full bg-card px-3 py-1 text-sm font-medium text-primary">
                Apargo Services
              </Badge>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Choose the right build path for your next product.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                Apargo delivers the full software menu: web, mobile, custom systems, AI, SaaS, cloud,
                design, SEO, and consulting. Pick the service you need now, or start with a short
                consultation and we will map the best route.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact?intent=consultation"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-11 rounded-full px-5 shadow-[0_12px_28px_rgba(26,135,84,0.18)]"
                  )}
                >
                  Book a Free Consultation
                  <ArrowRightIcon className="size-4" />
                </Link>
                <Link
                  href="#services-menu"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 rounded-full bg-card px-5")}
                >
                  View Services
                </Link>
                <Link
                  href="/about"
                  className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "h-11 rounded-full px-5")}
                >
                  About Apargo
                </Link>
              </div>
            </div>

            <div className="relative min-h-[360px]">
              <div className="absolute inset-0 rounded-md border border-border/80 bg-card shadow-[0_28px_80px_-54px_rgba(14,20,16,0.55)]" />
              <div className="relative h-full p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between border-b border-border/70 pb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Delivery map
                    </p>
                    <p className="mt-1 text-lg font-semibold text-foreground">From scope to shipped software</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    9 services
                  </span>
                </div>

                <div className="grid gap-3">
                  {[
                    ["Discover", "Roadmap, scope, user flows"],
                    ["Design", "UX, interface, clickable prototype"],
                    ["Build", "Web, mobile, AI, SaaS, cloud"],
                    ["Grow", "SEO, analytics, iteration, support"],
                  ].map(([title, description], index) => (
                    <div key={title} className="grid grid-cols-[auto_1fr] gap-3 rounded-md border border-border/70 bg-background/70 p-3">
                      <span className="flex size-8 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
                        {index + 1}
                      </span>
                      <div>
                        <div className="font-medium text-foreground">{title}</div>
                        <div className="text-sm text-muted-foreground">{description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services-menu" className="bg-[#FAFAFA] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Full services menu</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                What Apargo can deliver
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Start with the exact service you need, then expand into design, cloud, AI, and growth support as the
                product matures.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border/70 bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-5 lg:grid-cols-3">
              {proofPoints.map((point) => {
                const Icon = point.icon

                return (
                  <div key={point.title} className="rounded-md border border-border/80 bg-card p-6">
                    <span className="mb-5 flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="text-xl font-semibold text-foreground">{point.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{point.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#0E1410] py-16 text-white sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#76B56A]">Need help choosing?</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Tell us what you want to improve. We will point you to the right service.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/68">
                A short discovery call is enough to decide whether you need a website, product build, AI workflow,
                cloud cleanup, or a mixed delivery team.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact?intent=consultation"
                  className={cn(buttonVariants({ size: "lg" }), "h-11 rounded-full bg-white px-5 text-[#0E1410] hover:bg-white/90")}
                >
                  Book a Free Consultation
                  <ArrowRightIcon className="size-4" />
                </Link>
              </div>
            </div>

            <ol className="grid gap-3">
              {steps.map((step, index) => (
                <li key={step} className="grid grid-cols-[auto_1fr] gap-4 rounded-md border border-white/12 bg-white/6 p-4">
                  <span className="flex size-9 items-center justify-center rounded-md bg-[#76B56A] text-sm font-semibold text-[#0E1410]">
                    {index + 1}
                  </span>
                  <span className="self-center text-sm leading-6 text-white/78">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
