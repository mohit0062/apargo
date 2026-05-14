import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Smartphone, BrainCircuit, Rocket, CheckCircle2, ChevronRight, Activity, Zap, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      {/* Navbar (Placeholder for now) */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground font-display italic text-xl h-8 w-8 flex items-center justify-center rounded-md">
              A
            </div>
            <span className="font-semibold tracking-tight">Apargo</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/services" className="text-muted-foreground hover:text-foreground">Services</Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link>
            <Link href="/products" className="text-muted-foreground hover:text-foreground">Products</Link>
          </nav>
          <Button size="sm">Contact Us</Button>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden py-24 md:py-32 border-b">
          <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(26,135,84,0.10)_0%,transparent_65%)] pointer-events-none" />
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-start gap-6 max-w-4xl">
              <div className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Product Engineering & AI Services
              </div>
              <h1 className="font-display text-5xl md:text-7xl leading-[1.1] tracking-tight">
                We build software that growing businesses <i className="text-primary font-display font-normal">actually use.</i>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                From custom platforms and mobile apps to in-house SaaS products like AI Greentick — Apargo is the engineering partner founders call when they want to ship fast, scale safely and stay technical.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="h-12 px-8 text-base">Book a Free Consultation</Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base group">
                  See Our Work <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* LOGOS / TRUST STRIP */}
        <section className="py-12 border-b bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <p className="text-center text-sm font-medium text-muted-foreground mb-8">
              Trusted by founders building serious products. Startups, D2C brands, agencies and service businesses use what we build.
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale">
              {['Acme Corp', 'Globex', 'Soylent', 'Initech', 'Massive Dynamic'].map((company) => (
                <div key={company} className="font-display italic text-2xl font-bold">{company}</div>
              ))}
            </div>
          </div>
        </section>

        {/* FOUR WAYS WE HELP YOU SHIP */}
        <section className="py-24 border-b">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="mb-12">
              <h2 className="font-display italic text-4xl md:text-5xl mb-4 font-normal">Four ways we help you ship</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Whether you need one project delivered or a long-term engineering partner, we slot into your workflow.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Custom Product Development", icon: Code, desc: "Web platforms, dashboards, admin panels, internal tools. Built from scratch on a modern stack and handed over with full code ownership.", link: "Explore Custom Software" },
                { title: "Mobile Apps", icon: Smartphone, desc: "iOS and Android apps using React Native and Flutter, or fully native when you need it. Push notifications, offline-first, payments.", link: "Explore Mobile App Development" },
                { title: "AI & Automation", icon: BrainCircuit, desc: "Chatbots, document AI, recommendation engines, workflow automation. We use LLMs where they save real time and money.", link: "Explore AI Services" },
                { title: "SaaS Products", icon: Rocket, desc: "We don't just build for clients. We build, run and scale our own SaaS. The team you hire actually runs the production playbook.", link: "See Our Products" }
              ].map((service, i) => (
                <Card key={i} className="group hover:bg-muted/50 transition-colors border-border/50">
                  <CardHeader>
                    <service.icon className="h-10 w-10 text-primary mb-4" />
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4 h-[calc(100%-8rem)] justify-between">
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                    <Link href="#" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 group-hover:underline">
                      {service.link} <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCT - AI GREENTICK */}
        <section className="py-24 border-b bg-card">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">
                  From the Apargo Lab
                </div>
                <h2 className="font-display italic text-4xl md:text-5xl mb-6 font-normal">
                  AI Greentick — the WhatsApp marketing suite we built for modern teams
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Broadcasts, shared team inbox, no-code AI chatbots and full campaign analytics — built on the official WhatsApp Business API. Used by D2C brands, agencies and service businesses to turn WhatsApp into a real revenue channel.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <div className="text-3xl font-display font-bold text-primary mb-1">3x faster</div>
                    <div className="text-sm text-muted-foreground">reply times with shared inbox</div>
                  </div>
                  <div>
                    <div className="text-3xl font-display font-bold text-primary mb-1">90%+</div>
                    <div className="text-sm text-muted-foreground">average WhatsApp read rates</div>
                  </div>
                  <div>
                    <div className="text-3xl font-display font-bold text-primary mb-1">One #</div>
                    <div className="text-sm text-muted-foreground">unlimited team members</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button>Visit AI Greentick <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  <Button variant="outline">Book a Demo</Button>
                </div>
              </div>
              <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square bg-muted rounded-2xl border flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,var(--color-primary)_0%,transparent_100%)] opacity-10" />
                <div className="relative w-3/4 h-3/4 bg-background rounded-xl shadow-2xl border flex flex-col overflow-hidden">
                  <div className="h-12 border-b bg-muted/50 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 p-6 flex flex-col gap-4">
                    <div className="h-8 w-1/3 bg-muted rounded" />
                    <div className="h-32 w-full bg-muted/50 rounded-lg" />
                    <div className="h-24 w-2/3 bg-primary/10 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW WE WORK */}
        <section className="py-24 border-b">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="mb-16 max-w-2xl mx-auto text-center">
              <h2 className="font-display italic text-4xl md:text-5xl mb-4 font-normal">A simple, transparent process</h2>
              <p className="text-lg text-muted-foreground">
                Four steps from first call to first release. No surprise invoices, no "it's almost done" energy.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Discover", desc: "One short call to understand the problem, users and constraints. We push back early if scope doesn't match the goal." },
                { step: "02", title: "Plan", desc: "Detailed scope, milestones, tech stack and fixed quote. You sign only after you've seen exactly what you'll get." },
                { step: "03", title: "Build", desc: "Weekly demos on a real preview link. Slack channel with the actual engineers. Trello or Linear board you can see anytime." },
                { step: "04", title: "Launch & Support", desc: "Code handover, deployment, training. Then a flexible support window — bug fixes, small changes, or a full retainer." }
              ].map((item, i) => (
                <div key={i} className="relative flex flex-col gap-4">
                  <div className="text-5xl font-display text-muted/50 font-bold">{item.step}</div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY TEAMS PICK APARGO */}
        <section className="py-24 border-b bg-muted/20">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="font-display italic text-4xl md:text-5xl mb-12 font-normal">Four reasons we stick</h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
              <div className="flex gap-4">
                <div className="mt-1 bg-primary/10 p-2 rounded-lg h-fit"><CheckCircle2 className="h-6 w-6 text-primary" /></div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">We use what we build</h3>
                  <p className="text-muted-foreground leading-relaxed">AI Greentick runs on the same stack and same workflows we use for client projects. If it can serve real paying users at scale, it can serve yours too.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-primary/10 p-2 rounded-lg h-fit"><Users className="h-6 w-6 text-primary" /></div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Senior-heavy team</h3>
                  <p className="text-muted-foreground leading-relaxed">Most engineers on your project are mid-to-senior. You're not paying senior rates to train juniors on your problem.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-primary/10 p-2 rounded-lg h-fit"><Activity className="h-6 w-6 text-primary" /></div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Fixed quotes, no surprises</h3>
                  <p className="text-muted-foreground leading-relaxed">We give a fixed price and a fixed timeline after scoping. Out-of-scope items are quoted separately before any work starts.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-primary/10 p-2 rounded-lg h-fit"><Zap className="h-6 w-6 text-primary" /></div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Full IP handover</h3>
                  <p className="text-muted-foreground leading-relaxed">Code is yours from day one. Repos transfer to your GitHub or GitLab. NDAs signed before we see anything sensitive.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INDUSTRIES WE SERVE */}
        <section className="py-24 border-b">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="mb-12">
              <h2 className="font-display italic text-4xl md:text-5xl mb-4 font-normal">Built for the industries that move fast</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                E-commerce, healthcare, education, real estate, FinTech and travel — different domains, same need for software that just works.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['E-commerce & D2C', 'Healthcare', 'Education & EdTech', 'Real Estate', 'FinTech & BFSI', 'Travel & Hospitality'].map((industry) => (
                <div key={industry} className="flex items-center justify-center p-8 border border-border/50 rounded-xl bg-card hover:bg-muted/50 transition-colors text-center font-medium cursor-pointer shadow-sm">
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-32 relative overflow-hidden text-center bg-card">
          <div className="container relative z-10 px-4 md:px-6 mx-auto">
            <h2 className="font-display text-5xl md:text-7xl mb-6 font-normal">Have a project in mind?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Tell us what you're building. We'll reply within one working day with honest feedback — and a clear next step, even if it's not us.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg">Book a Free Consultation</Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg">Email hello@apargo.com</Button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t bg-muted/20 py-16">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary text-primary-foreground font-display italic h-6 w-6 flex items-center justify-center rounded-sm text-sm">A</div>
                <span className="font-semibold">Apargo</span>
              </div>
              <p className="text-sm text-muted-foreground">Product engineering and AI services. Builders of AI Greentick.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Web Development</Link></li>
                <li><Link href="#" className="hover:text-foreground">Mobile App Development</Link></li>
                <li><Link href="#" className="hover:text-foreground">Custom Software</Link></li>
                <li><Link href="#" className="hover:text-foreground">AI & Machine Learning</Link></li>
                <li><Link href="#" className="hover:text-foreground">SaaS Product Development</Link></li>
                <li><Link href="#" className="hover:text-foreground">Cloud & DevOps</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">AI Greentick</Link></li>
                <li><Link href="#" className="hover:text-foreground">All Products</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">About</Link></li>
                <li><Link href="#" className="hover:text-foreground">Industries</Link></li>
                <li><Link href="#" className="hover:text-foreground">Case Studies</Link></li>
                <li><Link href="#" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
                <li><Link href="#" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t text-xs text-muted-foreground">
            <p>© 2026 Apargo. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground">Terms of Service</Link>
              <Link href="#" className="hover:text-foreground">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
