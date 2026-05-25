"use client";

import Link from "next/link";
import { memo, type ComponentType, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  Boxes,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Layers3,
  LineChart,
  Lock,
  MessageSquareText,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TerminalSquare,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ServiceCard = {
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  visual: ReactNode;
  className: string;
  tone: "emerald" | "blue" | "amber" | "rose" | "slate";
  featured?: boolean;
};

const itemVariants: Variants = {
  rest: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 22, delay: 0.03 },
  },
};

function BentoCard({ service }: { service: ServiceCard }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowColor = {
    emerald: "rgba(26, 135, 84, 0.16)",
    blue: "rgba(58, 111, 165, 0.16)",
    amber: "rgba(216, 158, 42, 0.16)",
    rose: "rgba(199, 82, 42, 0.14)",
    slate: "rgba(15, 23, 42, 0.12)",
  }[service.tone];

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent<HTMLDivElement>) {
    const rect = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - rect.left);
    mouseY.set(clientY - rect.top);
  }

  const Icon = service.icon;

  const content = (
    <Card
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative h-full rounded-[24px] border border-zinc-200/80 bg-white/90 py-0 shadow-[0_24px_70px_-36px_rgba(14,20,16,0.35)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_34px_90px_-44px_rgba(14,20,16,0.48)]",
        service.featured && "bg-[linear-gradient(135deg,#ffffff_0%,#f9fbf7_56%,#eef7f0_100%)]"
      )}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 68%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0)_42%)]"
      />
      <CardContent className="relative flex h-full flex-col px-5 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex size-10 items-center justify-center rounded-2xl border border-zinc-200 bg-white shadow-[0_10px_30px_-18px_rgba(14,20,16,0.4)]">
            <Icon className="size-5 text-zinc-900" strokeWidth={1.8} />
          </div>
          <div className="flex size-9 items-center justify-center rounded-full text-zinc-500 opacity-70 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-zinc-100 group-hover:text-zinc-950 group-hover:opacity-100">
            <ArrowUpRight className="size-4" />
          </div>
        </div>

        <div className="mb-7 flex min-h-[150px] items-center">{service.visual}</div>

        <div className="mt-auto">
          <h3 className="max-w-[17rem] text-lg font-semibold leading-snug text-foreground sm:text-xl">
            {service.title}
          </h3>
          <p className="mt-3 max-w-[39rem] text-sm leading-relaxed text-muted-foreground">
            {service.description}
          </p>
          <div className="mt-5 flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80">
            {service.cta}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <motion.div variants={itemVariants} className={cn("min-h-[420px]", service.className)}>
      {service.href ? (
        <Link href={service.href} className="block h-full cursor-pointer outline-none ring-0">
          {content}
        </Link>
      ) : content}
    </motion.div>
  );
}

const ProductPreview = memo(function ProductPreview() {
  const metricCards = [
    { label: "Build", value: "31", tone: "bg-[#1A8754]", fill: "h-[74%]", delay: 0 },
    { label: "QA", value: "18", tone: "bg-[#3A6FA5]", fill: "h-[55%]", delay: 0.12 },
    { label: "Ship", value: "06", tone: "bg-[#D89E2A]", fill: "h-[86%]", delay: 0.24 },
  ];
  const workflow = [
    { label: "API routes", status: "Ready", color: "bg-[#1A8754]" },
    { label: "Role access", status: "Review", color: "bg-[#3A6FA5]" },
    { label: "Audit trail", status: "Live", color: "bg-[#D89E2A]" },
  ];

  return (
    <div className="relative w-full">
      <div
        aria-hidden="true"
        className="absolute -inset-x-4 -bottom-5 top-7 rounded-[28px] bg-[linear-gradient(135deg,rgba(26,135,84,0.10),rgba(58,111,165,0.08)_52%,rgba(216,158,42,0.08))] blur-xl"
      />
      <motion.div
        className="absolute -right-4 -top-6 z-20 hidden rounded-[18px] border border-emerald-200/80 bg-white/90 px-3.5 py-2 shadow-[0_18px_46px_-26px_rgba(14,20,16,0.5)] ring-1 ring-white/80 backdrop-blur-md sm:block"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
          <span className="flex size-5 items-center justify-center rounded-full bg-[#1A8754]/10">
            <CheckCircle2 className="size-3.5 text-[#1A8754]" />
          </span>
          Sprint ready
        </div>
      </motion.div>

      <div className="relative overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white shadow-[0_24px_70px_-44px_rgba(14,20,16,0.72)] ring-1 ring-white/80">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(135deg,rgba(26,135,84,0.05),transparent_38%),linear-gradient(315deg,rgba(58,111,165,0.07),transparent_42%)]"
        />
        <div className="relative flex items-center gap-2 border-b border-zinc-200/80 bg-white/88 px-4 py-3 backdrop-blur">
          <span className="size-2.5 rounded-full bg-zinc-300" />
          <span className="size-2.5 rounded-full bg-zinc-300" />
          <span className="size-2.5 rounded-full bg-[#1A8754]" />
          <div className="ml-3 hidden h-2 w-28 rounded-full bg-zinc-100 sm:block" />
          <div className="ml-auto flex items-center gap-2 rounded-[14px] border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[11px] font-semibold text-zinc-600">
            <Code2 className="size-3.5 text-[#1A8754]" />
            Next.js
          </div>
        </div>

        <div className="relative grid gap-4 p-4 sm:grid-cols-[1fr_0.78fr]">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2.5 w-28 rounded-full bg-zinc-200" />
                <div className="mt-2 h-2 w-16 rounded-full bg-zinc-100" />
              </div>
              <div className="rounded-[14px] border border-emerald-200/80 bg-[#1A8754]/10 px-2.5 py-1 text-[10px] font-semibold text-[#136B41]">
                82% done
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {metricCards.map((card) => (
                <motion.div
                  key={card.label}
                  className="min-h-[102px] rounded-[18px] border border-zinc-200 bg-white/92 p-2 shadow-[0_14px_40px_-32px_rgba(14,20,16,0.65)]"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4.2, delay: card.delay, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="h-2 w-8 rounded-full bg-zinc-200" />
                    <span className={cn("size-2 rounded-full", card.tone)} />
                  </div>
                  <div className="mt-5 flex h-10 items-end justify-center gap-1">
                    <span className={cn("w-3 rounded-full opacity-35", card.tone, card.fill)} />
                    <span className={cn("h-full w-3 rounded-full opacity-70", card.tone)} />
                    <span className={cn("h-[62%] w-3 rounded-full opacity-45", card.tone)} />
                  </div>
                  <div className="mt-3 flex items-end justify-between">
                    <span className="text-[10px] font-medium text-zinc-500">{card.label}</span>
                    <span className="font-mono text-sm font-semibold text-zinc-900">{card.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-[1fr_auto] gap-2">
              <div className="rounded-[16px] border border-zinc-200 bg-white/88 p-2.5 shadow-[0_12px_34px_-30px_rgba(14,20,16,0.55)]">
                <div className="mb-2 flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#1A8754]" />
                  <span className="h-2 w-20 rounded-full bg-zinc-200" />
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100">
                  <motion.div
                    className="h-full rounded-full bg-[#1A8754]"
                    animate={{ width: ["38%", "76%", "58%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
              <div className="flex size-12 items-center justify-center rounded-[16px] border border-zinc-200 bg-zinc-950 text-white shadow-[0_14px_36px_-26px_rgba(14,20,16,0.7)]">
                <TerminalSquare className="size-4" strokeWidth={1.8} />
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            {workflow.map((item, index) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-2 rounded-[18px] border border-zinc-200 bg-white/92 px-3 py-2.5 shadow-[0_12px_32px_-30px_rgba(14,20,16,0.55)]"
                animate={{ x: [0, index === 1 ? 3 : -2, 0] }}
                transition={{ duration: 4.8, delay: index * 0.1, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className={cn("size-2.5 rounded-full", item.color)} />
                <span className="text-xs font-semibold text-zinc-700">{item.label}</span>
                <span className="ml-auto rounded-full bg-zinc-100 px-2 py-0.5 text-[9px] font-semibold text-zinc-500">
                  {item.status}
                </span>
              </motion.div>
            ))}

            <div className="rounded-[20px] border border-zinc-200 bg-[#0E1410] p-3 text-white shadow-[0_18px_46px_-32px_rgba(14,20,16,0.75)]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-white/58">Release health</span>
                <span className="font-mono text-xs font-semibold text-[#76B56A]">98.4</span>
              </div>
              <div className="mt-3 flex h-10 items-end gap-1">
                {[46, 72, 58, 88, 64, 94, 78].map((height, index) => (
                  <motion.span
                    key={index}
                    className="flex-1 rounded-full bg-[#76B56A]"
                    animate={{ height: [`${height}%`, `${Math.min(height + 10, 100)}%`, `${height}%`] }}
                    transition={{ duration: 3.8, delay: index * 0.08, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const MobilePreview = memo(function MobilePreview() {
  const phones = [
    {
      key: "delivery",
      x: -92,
      rotate: -7,
      delay: 0,
      layer: "z-10",
      accent: "from-[#1A8754] via-[#2F9867] to-[#76B56A]",
      wash: "from-[#DFF1E6] to-transparent",
      stat: "82%",
      label: "Sprint",
      bars: [34, 52, 78],
    },
    {
      key: "launch",
      x: -14,
      rotate: 6,
      delay: 0.2,
      layer: "z-20",
      accent: "from-[#3A6FA5] via-[#4F7FB4] to-[#70A6C5]",
      wash: "from-[#DFEAF6] to-transparent",
      stat: "24h",
      label: "Launch",
      bars: [68, 42, 84],
    },
  ];

  return (
    <div className="relative mx-auto h-[190px] w-full max-w-[300px] overflow-visible">
      <div
        aria-hidden="true"
        className="absolute inset-x-4 top-8 h-32 rounded-[30px] border border-zinc-200/70 bg-[linear-gradient(135deg,#f9fbf8_0%,#edf6ef_48%,#f4f7fb_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_24px_70px_-48px_rgba(14,20,16,0.5)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-8 top-5 h-px w-20 bg-gradient-to-r from-transparent via-zinc-300 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-8 right-6 h-px w-24 bg-gradient-to-r from-transparent via-zinc-300 to-transparent"
      />

      {phones.map((phone) => (
        <motion.div
          key={phone.key}
          className={cn(
            "absolute left-1/2 top-1 h-[184px] w-[100px] rounded-[30px] bg-zinc-950 p-[5px] shadow-[0_26px_72px_-34px_rgba(14,20,16,0.8)] ring-1 ring-zinc-950/10",
            phone.layer
          )}
          style={{ x: phone.x, rotate: phone.rotate }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.8, delay: phone.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative h-full overflow-hidden rounded-[25px] bg-white">
            <div aria-hidden="true" className={cn("absolute inset-x-0 top-0 h-16 bg-gradient-to-b", phone.wash)} />
            <div className="relative flex items-center justify-between px-3 pt-2.5 text-[7px] font-semibold text-zinc-400">
              <span>9:41</span>
              <span className="flex items-end gap-0.5">
                <span className="h-1 w-0.5 rounded-full bg-zinc-300" />
                <span className="h-1.5 w-0.5 rounded-full bg-zinc-300" />
                <span className="h-2 w-0.5 rounded-full bg-zinc-400" />
              </span>
            </div>
            <div className="relative mx-auto mt-1 h-1 w-9 rounded-full bg-zinc-200/90" />

            <div className="relative px-2.5 pt-2">
              <div className={cn("rounded-[19px] bg-gradient-to-br p-2 text-white shadow-[0_16px_28px_-18px_rgba(14,20,16,0.65)]", phone.accent)}>
                <div className="flex items-center justify-between">
                  <span className="h-1.5 w-9 rounded-full bg-white/70" />
                  <span className="size-4 rounded-full bg-white/20 ring-1 ring-white/30" />
                </div>
                <div className="mt-5 flex items-end justify-between">
                  <span className="text-[16px] font-semibold leading-none">{phone.stat}</span>
                  <span className="pb-0.5 text-[6px] font-semibold text-white/80">
                    {phone.label}
                  </span>
                </div>
              </div>

              <div className="mt-2.5 grid grid-cols-[1fr_0.65fr] gap-1.5">
                <div className="rounded-[14px] bg-zinc-100/90 p-1.5">
                  <div className="mb-1.5 h-1.5 w-9 rounded-full bg-zinc-300/80" />
                  <div className="flex h-7 items-end gap-0.5">
                    {phone.bars.map((height, index) => (
                      <span
                        key={index}
                        className="flex-1 rounded-full bg-zinc-300"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-[14px] bg-zinc-100/80 p-1.5">
                  <div className="size-4 rounded-full bg-white shadow-sm" />
                  <div className="mt-2 space-y-1">
                    <div className="h-1.5 rounded-full bg-zinc-300/70" />
                    <div className="h-1.5 w-7 rounded-full bg-zinc-200" />
                  </div>
                </div>
              </div>

              <div className="mt-1.5 space-y-1.5">
                {[0, 1].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 rounded-full bg-zinc-50 px-1.5 py-1">
                    <span className={cn("size-2 rounded-full", item === 0 ? "bg-[#1A8754]" : "bg-[#3A6FA5]")} />
                    <span className="h-1.5 flex-1 rounded-full bg-zinc-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      <motion.div
        className="absolute bottom-2 right-3 z-30 flex items-center gap-2 rounded-[18px] border border-white/80 bg-white/90 px-3 py-2 text-xs font-semibold text-zinc-800 shadow-[0_18px_44px_-24px_rgba(14,20,16,0.65)] ring-1 ring-zinc-950/5 backdrop-blur-md"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="relative flex size-5 items-center justify-center rounded-md bg-[#1A8754]/10">
          <Smartphone className="size-3 text-[#1A8754]" />
          <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-[#1A8754] ring-2 ring-white" />
        </span>
        Live build
      </motion.div>
    </div>
  );
});

const AutomationPreview = memo(function AutomationPreview() {
  const nodes = [
    { label: "Brief", icon: MessageSquareText, x: "left-0 top-0", tone: "bg-[#3A6FA5]", delay: 0 },
    { label: "Model", icon: Bot, x: "left-1/2 top-14 -translate-x-1/2", tone: "bg-[#1A8754]", delay: 0.16 },
    { label: "Action", icon: CheckCircle2, x: "right-0 top-0", tone: "bg-[#D89E2A]", delay: 0.32 },
  ];
  const runSteps = [
    ["Intent", "ok"],
    ["Draft", "run"],
    ["Handoff", "live"],
  ];

  return (
    <div className="relative mx-auto h-[212px] w-full max-w-[320px] overflow-visible">
      <div
        aria-hidden="true"
        className="absolute inset-x-6 top-8 h-32 rounded-[32px] bg-[linear-gradient(135deg,rgba(216,158,42,0.12),rgba(26,135,84,0.08)_48%,rgba(58,111,165,0.10))] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-14 h-24 w-24 -translate-x-1/2 rounded-full border border-zinc-200/70 bg-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
      />

      <svg className="absolute inset-0 size-full" viewBox="0 0 320 212" fill="none" aria-hidden="true">
        <path d="M54 62 C94 62 105 98 160 98 C215 98 226 62 266 62" stroke="#d6d7db" strokeWidth="1.5" />
        <motion.path
          d="M54 62 C94 62 105 98 160 98"
          stroke="#1A8754"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="28 150"
          animate={{ strokeDashoffset: [0, -178] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M160 98 C215 98 226 62 266 62"
          stroke="#3A6FA5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="28 150"
          animate={{ strokeDashoffset: [0, -178] }}
          transition={{ duration: 3.8, delay: 0.35, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {nodes.map(({ label, icon: Icon, x, tone, delay }) => (
        <motion.div
          key={label}
          className={cn("absolute z-10 flex flex-col items-center gap-2", x)}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.4, delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className={cn(
              "relative flex size-16 items-center justify-center rounded-[22px] border border-zinc-200 bg-white/92 shadow-[0_18px_46px_-30px_rgba(14,20,16,0.6)] ring-1 ring-white/90 backdrop-blur",
              label === "Model" && "size-[70px] rounded-[24px] border-emerald-200 bg-[linear-gradient(135deg,#ffffff,#eef7f0)]"
            )}
          >
            <span className={cn("absolute right-2 top-2 size-2 rounded-full", tone)} />
            <Icon className="size-5 text-zinc-900" strokeWidth={1.8} />
          </div>
          <span className="rounded-[14px] border border-zinc-200 bg-white/90 px-3 py-1 text-[10px] font-semibold text-zinc-600 shadow-[0_10px_28px_-24px_rgba(14,20,16,0.6)]">
            {label}
          </span>
        </motion.div>
      ))}

      <div className="absolute -bottom-5 left-1/2 z-20 w-[230px] -translate-x-1/2 rounded-[24px] border border-zinc-200/90 bg-white/92 p-3.5 shadow-[0_24px_58px_-34px_rgba(14,20,16,0.72)] ring-1 ring-white/80 backdrop-blur-md">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-900">
          <span className="flex size-7 items-center justify-center rounded-[10px] bg-[#1A8754]/10">
            <Sparkles className="size-4 text-[#1A8754]" />
          </span>
          Automation run
          <span className="ml-auto rounded-full bg-zinc-100 px-2 py-0.5 font-mono text-[10px] font-semibold text-zinc-500">
            3.7s
          </span>
        </div>
        <div className="mb-3 grid grid-cols-3 gap-1.5">
          {runSteps.map(([label, state]) => (
            <div key={label} className="rounded-[12px] border border-zinc-200 bg-zinc-50 px-2 py-1.5">
              <div className="text-[9px] font-semibold text-zinc-500">{label}</div>
              <div className="mt-1 flex items-center gap-1">
                <span className={cn("size-1.5 rounded-full", state === "run" ? "bg-[#3A6FA5]" : "bg-[#1A8754]")} />
                <span className="font-mono text-[9px] font-semibold text-zinc-700">{state}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
            <motion.div
              className="h-full origin-left rounded-full bg-[#1A8754]"
              animate={{ scaleX: [0.42, 0.86, 0.62] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="flex items-center gap-2 rounded-[14px] bg-[#0E1410] px-2.5 py-2 text-white">
            <TerminalSquare className="size-3.5 text-[#76B56A]" strokeWidth={1.8} />
            <span className="text-[10px] font-medium text-white/70">workflow synced</span>
            <span className="ml-auto font-mono text-[10px] font-semibold text-[#76B56A]">24</span>
          </div>
        </div>
      </div>
    </div>
  );
});

const SaasPreview = memo(function SaasPreview() {
  const bars = [34, 48, 42, 72, 58, 78, 66, 84];
  const metrics = [
    { label: "MRR", value: "18.6%", meta: "Tracking", change: "+4.8%", tone: "bg-[#1A8754]", fill: "w-[72%]" },
    { label: "Latency", value: "182ms", meta: "Mumbai edge", change: "-31ms", tone: "bg-[#3A6FA5]", fill: "w-[54%]" },
    { label: "Rollout", value: "72%", meta: "Canary", change: "live", tone: "bg-[#D89E2A]", fill: "w-[72%]" },
  ];

  return (
    <div className="relative grid w-full gap-3 sm:grid-cols-[0.95fr_1.05fr]">
      <div
        aria-hidden="true"
        className="absolute -inset-x-3 bottom-0 top-8 rounded-[28px] bg-[radial-gradient(circle_at_18%_28%,rgba(26,135,84,0.12),transparent_36%),radial-gradient(circle_at_72%_78%,rgba(216,158,42,0.12),transparent_42%)] blur-2xl"
      />

      <div className="relative overflow-hidden rounded-[22px] border border-emerald-200/70 bg-[linear-gradient(145deg,#ffffff_0%,#f5fbf7_58%,#eef7f0_100%)] p-4 shadow-[0_24px_58px_-38px_rgba(20,83,45,0.45)] ring-1 ring-white/80">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(rgba(26,135,84,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(26,135,84,0.045)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]"
        />

        <div className="relative mb-4 flex items-center justify-between gap-3">
          <span className="flex size-9 items-center justify-center rounded-[14px] bg-white text-[#1A8754] shadow-[0_12px_32px_-24px_rgba(20,83,45,0.55)] ring-1 ring-emerald-900/10">
            <LineChart className="size-4" strokeWidth={1.9} />
          </span>
          <Badge className="rounded-full border-[#1A8754]/20 bg-white/82 px-2.5 py-1 text-[#136B41] shadow-sm hover:bg-white/82">
            AI Greentick
          </Badge>
        </div>

        <div className="relative flex items-end justify-between gap-3">
          <div>
            <div className="text-[34px] font-semibold leading-none tracking-tight tabular-nums text-zinc-950">47.2k</div>
            <div className="mt-2 text-xs font-medium text-zinc-500">verified conversations</div>
          </div>
          <span className="rounded-full bg-[#1A8754]/10 px-2.5 py-1 text-[10px] font-semibold tabular-nums text-[#136B41]">
            +12.4%
          </span>
        </div>

        <div className="relative mt-5 h-20 overflow-hidden rounded-[18px] bg-white/70 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-emerald-900/8">
          <div className="absolute inset-x-3 top-1/2 h-px bg-emerald-900/8" />
          <svg className="absolute inset-x-3 top-3 h-12 w-[calc(100%-24px)]" viewBox="0 0 160 48" fill="none" aria-hidden="true">
            <path d="M2 35 C22 28 28 14 47 22 C66 31 69 8 88 15 C106 22 109 11 126 10 C142 9 146 20 158 13" stroke="#3A6FA5" strokeWidth="2.3" strokeLinecap="round" />
            <motion.circle
              cx="126"
              cy="10"
              r="3.2"
              fill="#1A8754"
              animate={{ opacity: [0.45, 1, 0.45], scale: [0.92, 1.18, 0.92] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
          <div className="relative flex h-full items-end gap-1.5">
            {bars.map((height, index) => (
              <motion.span
                key={index}
                className={cn(
                  "flex-1 rounded-t-full rounded-b-md shadow-[0_8px_18px_-14px_rgba(20,83,45,0.8)]",
                  index % 3 === 1 ? "bg-[#3A6FA5]/70" : "bg-[#1A8754]/70"
                )}
                style={{ height: `${height}%` }}
                initial={{ height: `${height}%` }}
                animate={{ height: [`${height}%`, `${Math.min(height + 12, 94)}%`, `${height}%`] }}
                transition={{ duration: 3.8, delay: index * 0.07, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>
        </div>

        <div className="relative mt-3 flex items-center justify-between rounded-[15px] bg-[#0E1410] px-3 py-2 text-white shadow-[0_16px_38px_-30px_rgba(14,20,16,0.8)]">
          <span className="text-[10px] font-medium text-white/62">retention pulse</span>
          <span className="font-mono text-[11px] font-semibold text-[#76B56A]">healthy</span>
        </div>
      </div>

      <div className="relative grid gap-2">
        {metrics.map((item, index) => (
          <motion.div
            key={item.label}
            className="group relative overflow-hidden rounded-[20px] border border-zinc-200/90 bg-white/92 px-4 py-3 shadow-[0_16px_42px_-34px_rgba(14,20,16,0.55)] ring-1 ring-white/80 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300"
            animate={{ y: [0, index === 1 ? -3 : 3, 0] }}
            transition={{ duration: 4.8, delay: index * 0.12, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 w-24 bg-[radial-gradient(circle_at_center,rgba(26,135,84,0.08),transparent_68%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <div className="relative flex items-start justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold text-zinc-500">{item.label}</div>
                <div className="mt-1 text-[22px] font-semibold leading-none tracking-tight tabular-nums text-zinc-950">{item.value}</div>
              </div>
              <div className="text-right">
                <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-semibold text-zinc-500">
                  {item.meta}
                </span>
                <div className="mt-2 text-[10px] font-semibold tabular-nums text-[#136B41]">{item.change}</div>
              </div>
            </div>
            <div className="relative mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-100">
              <motion.div
                className={cn("h-full origin-left rounded-full", item.tone, item.fill)}
                initial={{ scaleX: 0.6 }}
                animate={{ scaleX: [0.72, 1, 0.82] }}
                transition={{ duration: 3.6, delay: index * 0.15, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

const CloudPreview = memo(function CloudPreview() {
  const pipeline = [
    { label: "Repo", meta: "main", icon: GitBranch, tone: "text-[#3A6FA5]", delay: 0 },
    { label: "Build", meta: "182s", icon: TerminalSquare, tone: "text-[#1A8754]", delay: 0.12 },
    { label: "Deploy", meta: "edge", icon: Cloud, tone: "text-[#D89E2A]", delay: 0.24 },
  ];
  const checks = [
    { icon: Lock, label: "Backups", value: "7d" },
    { icon: Server, label: "Monitoring", value: "live" },
    { icon: ShieldCheck, label: "CDN", value: "19ms" },
  ];

  return (
    <div className="relative min-h-[206px] w-full overflow-hidden rounded-[22px] border border-zinc-200/90 bg-[linear-gradient(145deg,#ffffff_0%,#f7fbf8_52%,#f3f7fb_100%)] p-4 shadow-[0_24px_58px_-42px_rgba(14,20,16,0.55)] ring-1 ring-white/80">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgba(58,111,165,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(26,135,84,0.04)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(circle_at_50%_28%,black,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-14 -top-20 size-44 rounded-full bg-[#3A6FA5]/10 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-16 left-8 size-44 rounded-full bg-[#1A8754]/12 blur-2xl"
      />

      <div className="relative mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">edge pipeline</div>
          <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-zinc-800">
            <span className="size-1.5 rounded-full bg-[#1A8754]" />
            Mumbai cluster
          </div>
        </div>
        <span className="rounded-full bg-white/82 px-2.5 py-1 font-mono text-[10px] font-semibold tabular-nums text-[#136B41] shadow-sm ring-1 ring-emerald-900/10">
          99.98%
        </span>
      </div>

      <svg className="absolute left-10 right-10 top-[94px] h-8 w-[calc(100%-80px)]" viewBox="0 0 260 32" fill="none" aria-hidden="true">
        <path d="M6 16 H254" stroke="#d8dde0" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="5 7" />
        <motion.path
          d="M6 16 H254"
          stroke="#1A8754"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="34 226"
          animate={{ strokeDashoffset: [0, -260] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      <motion.div
        className="absolute top-[103px] size-2 rounded-full bg-[#1A8754] shadow-[0_0_0_6px_rgba(26,135,84,0.12)]"
        animate={{ left: ["13%", "84%", "13%"] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative grid grid-cols-3 gap-2.5">
        {pipeline.map(({ label, meta, icon: Icon, tone, delay }) => (
          <motion.div
            key={label}
            className="rounded-[18px] border border-zinc-200/90 bg-white/92 p-3 text-center shadow-[0_16px_40px_-32px_rgba(14,20,16,0.62)] ring-1 ring-white/80 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4.5, delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-[14px] bg-zinc-100/80 ring-1 ring-zinc-950/5">
              <Icon className={cn("size-4", tone)} strokeWidth={1.9} />
            </div>
            <div className="text-xs font-semibold text-zinc-800">{label}</div>
            <div className="mt-1 font-mono text-[9px] font-semibold text-zinc-400">{meta}</div>
          </motion.div>
        ))}
      </div>

      <div className="relative mt-4 grid gap-2 sm:grid-cols-3">
        {checks.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex min-w-0 items-center gap-2 rounded-[15px] border border-zinc-200/90 bg-white/88 px-3 py-2 shadow-[0_12px_30px_-28px_rgba(14,20,16,0.5)]">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-[10px] bg-[#1A8754]/8">
              <Icon className="size-3.5 text-[#1A8754]" strokeWidth={1.8} />
            </span>
            <div className="min-w-0">
              <div className="truncate text-[11px] font-semibold text-zinc-700">{label}</div>
              <div className="font-mono text-[9px] font-semibold text-zinc-400">{value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative mt-3 flex items-center justify-between rounded-[16px] bg-[#0E1410] px-3 py-2 text-white shadow-[0_18px_44px_-32px_rgba(14,20,16,0.82)]">
        <span className="text-[10px] font-medium text-white/62">production guard</span>
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((item) => (
            <motion.span
              key={item}
              className="size-1.5 rounded-full bg-[#76B56A]"
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 1.8, delay: item * 0.18, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
          <span className="ml-1 font-mono text-[10px] font-semibold text-[#76B56A]">stable</span>
        </div>
      </div>
    </div>
  );
});

const services: ServiceCard[] = [
  {
    title: "Custom Product Development",
    description:
      "Web platforms, dashboards, admin panels, internal tools. Built from scratch on a modern stack - React, Next.js, Node, Python - and handed over with full code ownership.",
    cta: "Explore Custom Software",
    href: "/services/custom-software",
    icon: Layers3,
    visual: <ProductPreview />,
    className: "lg:col-span-6",
    tone: "emerald",
    featured: true,
  },
  {
    title: "Mobile Apps",
    description:
      "iOS and Android apps using React Native and Flutter, or fully native when you need it. Push notifications, offline-first, payments, deep linking - the boring stuff that actually matters.",
    cta: "Explore Mobile App Development",
    href: "/services/mobile-app-development",
    icon: Smartphone,
    visual: <MobilePreview />,
    className: "lg:col-span-3",
    tone: "blue",
  },
  {
    title: "AI & Automation",
    description:
      "Chatbots, document AI, recommendation engines, workflow automation. We use LLMs where they save real time and money, and skip them where they don't.",
    cta: "Explore AI Services",
    href: "/services/ai-machine-learning",
    icon: Bot,
    visual: <AutomationPreview />,
    className: "lg:col-span-3",
    tone: "amber",
  },
  {
    title: "SaaS Products",
    description:
      "We don't just build for clients. We build, run and scale our own SaaS - like AI Greentick. The team you hire actually runs the production playbook, not just the project plan.",
    cta: "See Our Products",
    href: "/products",
    icon: Boxes,
    visual: <SaasPreview />,
    className: "lg:col-span-7",
    tone: "rose",
  },
  {
    title: "Cloud Hosting & Deployment",
    description:
      "Fast, secure, scalable hosting infrastructure with CI/CD pipelines, server optimization, monitoring, backups, CDN setup, and production-grade deployment workflows.",
    cta: "Explore Hosting Solutions",
    href: "/services/cloud-devops",
    icon: Database,
    visual: <CloudPreview />,
    className: "lg:col-span-5",
    tone: "slate",
  },
];

export function BentoGrid() {
  return (
    <section className="relative overflow-hidden bg-[#fafafa] py-12 sm:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[48%] h-[620px] w-[min(980px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(26,135,84,0.13),rgba(58,111,165,0.07)_38%,transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(14,20,16,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(14,20,16,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <Badge variant="outline" className="mb-5 rounded-full bg-background px-3 py-1 text-sm font-normal text-muted-foreground shadow-sm">
            What We Do
          </Badge>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            Four Ways We Help You Ship
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Whether you need one project delivered or a long-term engineering partner, we slot into your workflow.
          </p>
        </div>

        <motion.div
          initial="rest"
          animate="rest"
          transition={{ staggerChildren: 0.08, delayChildren: 0.12 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-fr"
        >
          {services.map((service) => (
            <BentoCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
