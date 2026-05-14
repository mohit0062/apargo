"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { BrainCircuit, LineChart, CreditCard, LayoutDashboard, Users, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { MouseEvent } from "react";

const cards = [
  {
    title: "AI Automation",
    description: "Automate repetitive tasks with smart AI-driven workflows and save hours of manual work every week.",
    icon: BrainCircuit,
    className: "md:col-span-2 md:row-span-2",
    iconClassName: "text-blue-500",
  },
  {
    title: "Real-Time Analytics",
    description: "Get insights instantly.",
    icon: LineChart,
    className: "md:col-span-1 md:row-span-1",
    iconClassName: "text-purple-500",
  },
  {
    title: "Faster Payments",
    description: "Process transactions seamlessly.",
    icon: CreditCard,
    className: "md:col-span-1 md:row-span-1",
    iconClassName: "text-cyan-500",
  },
  {
    title: "Smart Dashboard",
    description: "Manage everything from one beautiful, intuitive interface.",
    icon: LayoutDashboard,
    className: "md:col-span-2 md:row-span-1",
    iconClassName: "text-gray-500",
  },
  {
    title: "Team Collaboration",
    description: "Work together in real-time with your entire team seamlessly across the globe.",
    icon: Users,
    className: "md:col-span-1 md:row-span-2",
    iconClassName: "text-indigo-500",
  },
  {
    title: "Secure Cloud Storage",
    description: "Your data is encrypted and backed up securely.",
    icon: Cloud,
    className: "md:col-span-2 md:row-span-1",
    iconClassName: "text-emerald-500",
  },
];

function MagicCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn("group relative flex flex-col rounded-2xl bg-card border shadow-sm overflow-hidden", className)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(26, 135, 84, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 ring-1 ring-inset ring-primary/20"
      />
      {children}
    </div>
  );
}

export function BentoGrid() {
  return (
    <section className="py-24 relative overflow-hidden bg-white/50 dark:bg-background/50 border-b">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px]">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className={cn("h-full w-full", card.className)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <MagicCard className="h-full w-full p-8 transition-transform duration-300 hover:-translate-y-1">
                <div className={cn("p-3 rounded-xl bg-white dark:bg-card shadow-sm w-fit mb-6 ring-1 ring-border/50", card.iconClassName)}>
                  <card.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight mb-3">
                  {card.title}
                </h3>
                <p className="text-muted-foreground/80 leading-relaxed text-sm">
                  {card.description}
                </p>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
