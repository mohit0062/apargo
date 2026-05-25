import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRightIcon,
  Code2Icon,
  MailIcon,
  TimerResetIcon,
  XCircleIcon,
} from 'lucide-react'

import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'
import SiteNavbar from '@/components/site-navbar'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { openApplicationHref, openRoles, type CareerRole } from '@/lib/careers'
import { cn } from '@/lib/utils'
import { getSiteSection, getLucideIcon } from '@/utils/cms'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteSection('page_careers')
  return {
    title: content.seo?.title || 'Careers at Apargo — Build Software That Ships',
    description: content.seo?.description || 'Open engineering, design, AI and product roles at Apargo. Remote-friendly, senior-heavy team. Builders of AI Greentick.',
    keywords: content.seo?.keywords || 'careers, jobs, hiring, work at apargo, next.js jobs, react native jobs',
  }
}

export const dynamic = 'force-dynamic'

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Badge variant="outline" className="mb-4 border-primary/25 bg-primary/5 text-primary">
        {eyebrow}
      </Badge>
      <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
        {description}
      </p>
    </div>
  )
}

function SignalCard({ item }: { item: any }) {
  const Icon = getLucideIcon(item.iconName)

  return (
    <Card className="h-full border-border/80 bg-card/90 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_18px_50px_rgba(14,20,16,0.08)]">
      <CardHeader>
        <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
        <CardTitle className="text-xl">{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-7">
          {item.description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

function RoleCard({ role }: { role: CareerRole }) {
  return (
    <Card className="group h-full border-border/80 bg-card/95 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_70px_rgba(14,20,16,0.1)]">
      <CardHeader className="gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{role.team}</Badge>
          <Badge variant="outline">{role.employmentType}</Badge>
          <Badge variant="outline">{role.location}</Badge>
        </div>
        <div className="space-y-3">
          <CardTitle className="text-2xl tracking-tight">{role.title}</CardTitle>
          <CardDescription className="text-base leading-7">
            {role.summary}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto space-y-5">
        <Separator />
        <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <div>
            <p className="font-medium text-foreground">Compensation</p>
            <p>{role.compensation.range}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Equity</p>
            <p>{role.compensation.equity}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between gap-3 bg-muted/35">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Active role
        </span>
        <Link
          href={`/careers/${role.slug}`}
          className={cn(
            buttonVariants({ variant: 'outline', size: 'lg' }),
            'h-10 rounded-full bg-card px-4 group-hover:border-primary/40 group-hover:text-primary'
          )}
        >
          View role
          <ArrowRightIcon className="size-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}

export default async function CareersPage() {
  const content = await getSiteSection('page_careers')

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteNavbar />

      <main className="flex-1 overflow-hidden">
        <section className="relative border-b border-border/70 bg-[linear-gradient(180deg,var(--background)_0%,var(--secondary)_100%)]">
          <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_18%_22%,rgba(26,135,84,0.16),transparent_28rem),radial-gradient(circle_at_88%_8%,rgba(199,82,42,0.12),transparent_24rem)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[minmax(0,1fr)_28rem] lg:px-8">
            <div className="max-w-4xl">
              <Badge className="mb-6 bg-primary text-primary-foreground">
                {content.hero?.badge || 'CAREERS'}
              </Badge>
              <h1 className="max-w-5xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {content.hero?.heading || 'Join a team that builds — and operates — what it builds.'}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
                {content.hero?.description || 'Apargo is a small, senior-heavy team that ships software for clients and runs its own SaaS products. You\'ll write code that goes live in days, not quarters. You\'ll see your work used by real people. You won\'t sit through three rounds of "culture fit" interviews.'}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#open-roles"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'h-12 rounded-full px-6 text-base shadow-[0_16px_36px_rgba(26,135,84,0.18)]'
                  )}
                >
                  See Open Roles
                  <ArrowRightIcon className="size-4" />
                </Link>
                <a
                  href={openApplicationHref}
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }),
                    'h-12 rounded-full bg-card/80 px-6 text-base'
                  )}
                >
                  Send an Open Application
                  <MailIcon className="size-4" />
                </a>
              </div>
            </div>

            <Card className="relative h-fit border-primary/15 bg-card/85 p-2 shadow-[0_24px_90px_rgba(14,20,16,0.12)] backdrop-blur">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="outline" className="border-primary/25 text-primary">
                    Operating agreement
                  </Badge>
                  <Code2Icon className="size-5 text-primary" />
                </div>
                <CardTitle className="text-2xl">
                  Builders who stay close to production.
                </CardTitle>
                <CardDescription className="text-base leading-7">
                  We hire for people who can move through ambiguity, write clearly, and keep systems alive after launch.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {content.heroStats?.map((stat: any) => (
                  <div
                    key={stat.value}
                    className="rounded-xl border border-border/80 bg-background/70 p-4"
                  >
                    <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="What we look for"
              title="The bar is high, but refreshingly practical."
              description="Apargo works best for senior builders who can make good calls, write down tradeoffs, and keep ownership after launch."
            />

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {content.fitSignals?.map((item: any) => (
                <SignalCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary/65 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="max-w-xl lg:sticky lg:top-24 lg:self-start">
              <Badge variant="outline" className="mb-4 border-primary/25 bg-background text-primary">
                What we offer
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Fewer perks-as-theater. More conditions for good work.
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
                We optimize for autonomy, strong peers, clear compensation, and the boring operational support that lets senior people do serious work.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {content.benefits?.map((item: any) => (
                <SignalCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="How we hire"
              title="No theater. Just enough signal to decide well."
              description="The process is designed to respect senior candidates and still let both sides see how the work actually feels."
            />

            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {content.hiringSteps?.map((step: any, index: number) => (
                <Card key={step.title} className="border-border/80 bg-card shadow-none">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-sm text-primary">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <TimerResetIcon className="size-4 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-7">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-foreground px-4 py-16 text-background sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Badge className="mb-4 bg-primary text-primary-foreground">
                Wrong fit filter
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                You might not enjoy Apargo if...
              </h2>
              <p className="mt-4 text-base leading-7 text-background/70 md:text-lg">
                This page should attract the right people and save the wrong people a long process. Tiny kindness, big leverage.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {content.notForYou?.map((item: any) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-2xl border border-background/15 bg-background/5 p-5"
                >
                  <XCircleIcon className="mt-1 size-5 shrink-0 text-accent" />
                  <p className="text-sm leading-6 text-background/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="open-roles" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <Badge variant="outline" className="mb-4 border-primary/25 bg-primary/5 text-primary">
                  Open roles
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Active roles for senior builders.
                </h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
                  Each role has a dedicated page with scope, compensation, equity, and what the first 90 days look like.
                </p>
              </div>
              <div className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
                {openRoles.length} roles open now
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {openRoles.map((role) => (
                <RoleCard key={role.slug} role={role} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          <Card className="mx-auto max-w-7xl border-primary/20 bg-primary text-primary-foreground shadow-[0_28px_90px_rgba(26,135,84,0.18)]">
            <CardContent className="grid gap-8 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-10">
              <div>
                <Badge className="mb-4 bg-primary-foreground text-primary">
                  Open application
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Don&apos;t see your role?
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-primary-foreground/85 md:text-lg">
                  If you&apos;re a senior engineer, designer or PM who wants to work with us, send us a note. We open roles based on the team we want to build, not just slot-filling.
                </p>
              </div>
              <a
                href={openApplicationHref}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'h-12 rounded-full border-primary-foreground/40 bg-primary-foreground px-6 text-base text-primary hover:bg-primary-foreground/90'
                )}
              >
                Send an Open Application
                <MailIcon className="size-4" />
              </a>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
