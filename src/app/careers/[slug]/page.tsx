import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BriefcaseBusinessIcon,
  CheckCircle2Icon,
  CircleDollarSignIcon,
  Clock3Icon,
  MapPinIcon,
  MailIcon,
  SparklesIcon,
  UsersRoundIcon,
} from 'lucide-react'

import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'
import SiteNavbar from '@/components/site-navbar'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getCareerRole, openApplicationHref, openRoles } from '@/lib/careers'
import { cn } from '@/lib/utils'

type RolePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return openRoles.map((role) => ({
    slug: role.slug,
  }))
}

export async function generateMetadata({
  params,
}: RolePageProps): Promise<Metadata> {
  const { slug } = await params
  const role = getCareerRole(slug)

  if (!role) {
    return {
      title: 'Role not found | Careers at Apargo',
    }
  }

  return {
    title: `${role.title} | Careers at Apargo`,
    description: `${role.summary} ${role.location}. ${role.employmentType}. Compensation: ${role.compensation.range}.`,
  }
}

function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground md:text-base">
          <CheckCircle2Icon className="mt-0.5 size-5 shrink-0 text-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default async function CareerRolePage({ params }: RolePageProps) {
  const { slug } = await params
  const role = getCareerRole(slug)

  if (!role) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteNavbar />

      <main className="flex-1">
        <section className="border-b border-border/70 bg-[linear-gradient(180deg,var(--background)_0%,var(--secondary)_100%)]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <Link
              href="/careers"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                '-ml-2 mb-8 rounded-full text-muted-foreground hover:text-foreground'
              )}
            >
              <ArrowLeftIcon className="size-4" />
              Back to careers
            </Link>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
              <div>
                <div className="mb-5 flex flex-wrap gap-2">
                  <Badge className="bg-primary text-primary-foreground">{role.team}</Badge>
                  <Badge variant="outline">{role.employmentType}</Badge>
                  <Badge variant="outline">{role.location}</Badge>
                </div>
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
                  {role.title}
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                  {role.summary}
                </p>
              </div>

              <Card className="border-primary/20 bg-card/90 shadow-[0_20px_70px_rgba(14,20,16,0.1)]">
                <CardHeader>
                  <CardTitle className="text-xl">Role snapshot</CardTitle>
                  <CardDescription>
                    Closed ranges, clear team, and a process that respects senior candidates.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <MapPinIcon className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Location</p>
                      <p className="text-sm text-muted-foreground">{role.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <BriefcaseBusinessIcon className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Type</p>
                      <p className="text-sm text-muted-foreground">{role.employmentType}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <UsersRoundIcon className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Team</p>
                      <p className="text-sm text-muted-foreground">{role.team}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
            <div className="space-y-6">
              <Card className="shadow-none">
                <CardHeader>
                  <Badge variant="outline" className="w-fit border-primary/25 text-primary">
                    About the role
                  </Badge>
                  <CardTitle className="text-2xl">What you will own</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {role.about.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-none">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Clock3Icon className="size-5 text-primary" />
                    <CardTitle className="text-2xl">First 90 days</CardTitle>
                  </div>
                  <CardDescription>
                    You should see meaningful production impact quickly.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DetailList items={role.first90} />
                </CardContent>
              </Card>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="shadow-none">
                  <CardHeader>
                    <CardTitle className="text-2xl">What you&apos;ll do</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DetailList items={role.responsibilities} />
                  </CardContent>
                </Card>

                <Card className="shadow-none">
                  <CardHeader>
                    <CardTitle className="text-2xl">What we&apos;re looking for</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DetailList items={role.requirements} />
                  </CardContent>
                </Card>
              </div>

              <Card className="border-primary/20 bg-primary/5 shadow-none">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <SparklesIcon className="size-5 text-primary" />
                    <CardTitle className="text-2xl">Nice to have</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <DetailList items={role.niceToHave} />
                </CardContent>
              </Card>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <Card className="border-primary/25 shadow-[0_20px_70px_rgba(14,20,16,0.08)]">
                <CardHeader>
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <CircleDollarSignIcon className="size-5" />
                  </div>
                  <CardTitle className="text-2xl">Compensation</CardTitle>
                  <CardDescription>
                    Closed ranges signal trust. We would rather be specific up front.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Range</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">
                      {role.compensation.range}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Equity</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">
                      {role.compensation.equity}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-foreground text-background shadow-[0_24px_80px_rgba(14,20,16,0.16)]">
                <CardHeader>
                  <Badge className="w-fit bg-primary text-primary-foreground">
                    How to apply
                  </Badge>
                  <CardTitle className="text-2xl text-background">
                    Send signal, not a novel.
                  </CardTitle>
                  <CardDescription className="text-background/70">
                    Include links to shipped work, a short note on why this role fits, and any constraints we should know early.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a
                    href={role.applyHref}
                    className={cn(
                      buttonVariants({ size: 'lg' }),
                      'h-12 w-full rounded-full px-5 text-base'
                    )}
                  >
                    Apply for this role
                    <MailIcon className="size-4" />
                  </a>
                  <a
                    href={openApplicationHref}
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'lg' }),
                      'h-12 w-full rounded-full border-background/20 bg-background/10 px-5 text-base text-background hover:bg-background/15'
                    )}
                  >
                    Open application instead
                    <ArrowRightIcon className="size-4" />
                  </a>
                </CardContent>
              </Card>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
