"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, LineChart, CreditCard, LayoutDashboard, Users, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

const cards = [
  {
    title: "AI Automation",
    description: "Automate repetitive tasks with smart AI-driven workflows.",
    icon: BrainCircuit,
    className: "col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-gradient-to-br from-white to-blue-50/50 dark:from-card dark:to-blue-950/20",
    iconClassName: "text-blue-500",
    delay: 0.1,
  },
  {
    title: "Real-Time Analytics",
    description: "Get insights instantly with our powerful analytics engine.",
    icon: LineChart,
    className: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1 bg-gradient-to-br from-white to-purple-50/50 dark:from-card dark:to-purple-950/20",
    iconClassName: "text-purple-500",
    delay: 0.2,
  },
  {
    title: "Faster Payments",
    description: "Process transactions seamlessly with 99.9% uptime.",
    icon: CreditCard,
    className: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1 bg-gradient-to-br from-white to-cyan-50/50 dark:from-card dark:to-cyan-950/20",
    iconClassName: "text-cyan-500",
    delay: 0.3,
  },
  {
    title: "Smart Dashboard",
    description: "Manage everything from one beautiful, intuitive interface.",
    icon: LayoutDashboard,
    className: "col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-gradient-to-br from-white to-gray-50/50 dark:from-card dark:to-gray-900/20",
    iconClassName: "text-gray-500",
    delay: 0.4,
  },
  {
    title: "Team Collaboration",
    description: "Work together in real-time with your entire team seamlessly.",
    icon: Users,
    className: "col-span-1 md:col-span-1 lg:col-span-1 row-span-2 bg-gradient-to-br from-white to-indigo-50/50 dark:from-card dark:to-indigo-950/20",
    iconClassName: "text-indigo-500",
    delay: 0.5,
  },
  {
    title: "Secure Cloud Storage",
    description: "Your data is encrypted and backed up securely in the cloud.",
    icon: Cloud,
    className: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 bg-gradient-to-br from-white to-emerald-50/50 dark:from-card dark:to-emerald-950/20",
    iconClassName: "text-emerald-500",
    delay: 0.6,
  },
];

export function BentoGrid() {
  return (
    <section className="py-24 relative overflow-hidden bg-white/50 dark:bg-background/50 border-b">
      {/* Animated Gradient Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display italic text-4xl md:text-5xl mb-4 font-normal bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Four ways we help you ship
            </h2>
            <p className="text-lg text-muted-foreground">
              Experience the next generation of product engineering with our premium toolkit and services.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[200px]">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className={cn("h-full", card.className)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: card.delay }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full w-full overflow-hidden border-border/40 bg-transparent rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group relative backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 dark:from-white/10 dark:to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20 dark:ring-white/10" />
                
                {/* Subtle border glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ring-2 ring-primary/20" />

                <CardHeader className="relative z-10 pt-8 px-8">
                  <div className={cn("p-3 rounded-xl bg-white dark:bg-card shadow-sm w-fit mb-4 group-hover:scale-110 transition-transform duration-300 ring-1 ring-border/50", card.iconClassName)}>
                    <card.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold tracking-tight">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 px-8 pb-8">
                  <p className="text-muted-foreground/80 leading-relaxed text-sm">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
