"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Atom,
  Server,
  Database,
  Brain,
  Cloud,
  Globe,
  Zap,
  Cpu,
  Sparkles,
  Smartphone,
  ShieldCheck,
  ChevronRight,
  Activity,
  Terminal,
  ActivityIcon,
  MousePointerClick
} from "lucide-react"

// Types for Stack Explorer
interface StackNode {
  id: string
  name: string
  iconName: "Atom" | "Globe" | "Server" | "Database" | "Brain" | "Cloud" | "Smartphone" | "Zap"
  category: "frontend" | "edge" | "api" | "database" | "ai" | "infrastructure"
  description: string
  whyWeChoose: string
  benefit: string
  benefitLabel: string
  alternativesAvoided: string
  subTechs: string[]
  // Grid position (out of 12 for X and 6 for Y, or custom flex rows)
  row: number
  col: number
}

interface Connection {
  from: string
  to: string
  animated: boolean
}

interface ArchitectureTemplate {
  id: string
  name: string
  description: string
  nodes: StackNode[]
  connections: Connection[]
}

const TEMPLATES: ArchitectureTemplate[] = [
  {
    id: "ai-saas",
    name: "AI-Powered SaaS Architecture",
    description: "Our signature stack for SaaS applications requiring complex background flows, real-time message streams, and strict data isolation.",
    nodes: [
      {
        id: "client-ui",
        name: "Client UI (React/Next.js)",
        iconName: "Atom",
        category: "frontend",
        description: "Modern web frontend with hybrid rendering and full TypeScript safety.",
        whyWeChoose: "React Server Components (RSC) allow us to ship near-zero client JS. Tailwind provides design agility, and TypeScript guarantees type-safety across API borders.",
        benefit: "Instant sub-500ms initial load",
        benefitLabel: "FCP / Speed Index",
        alternativesAvoided: "Avoids heavy legacy single-page frameworks (CRA, Angular) that drag down mobile page-speed and SEO rank.",
        subTechs: ["Next.js 16", "React 19", "Tailwind CSS v4", "TypeScript"],
        row: 1,
        col: 1
      },
      {
        id: "edge-gateway",
        name: "Edge Routing & Auth",
        iconName: "Globe",
        category: "edge",
        description: "Middleware edge validation, dynamic redirects, and geographic routing.",
        whyWeChoose: "Validating user session tokens at the cloud edge (Vercel Edge/Cloudflare Workers) protects our APIs from compute-heavy unauthorized sweeps.",
        benefit: "Auth latency under 15ms",
        benefitLabel: "Edge Overhead",
        alternativesAvoided: "Avoids querying central databases for basic session validations on static routes.",
        subTechs: ["Next.js Middleware", "Vercel Edge", "JWT / Auth0"],
        row: 1,
        col: 2
      },
      {
        id: "api-backend",
        name: "Backend Core (Node.js)",
        iconName: "Server",
        category: "api",
        description: "Asynchronous API server handling webhooks and task scheduling.",
        whyWeChoose: "Node's event loop excels at handling thousands of parallel webhooks (e.g. WhatsApp status alerts for AI Greentick) without blocking CPU resources.",
        benefit: "5,000+ webhook events/sec",
        benefitLabel: "Concurrent Throughput",
        alternativesAvoided: "Avoids blocking multi-threaded servers (e.g. raw Rails or Java) that choke on large queues of concurrent I/O requests.",
        subTechs: ["Node.js", "NestJS", "Express / Fastify", "EAS"],
        row: 2,
        col: 2
      },
      {
        id: "data-queue",
        name: "PostgreSQL & Redis Queue",
        iconName: "Database",
        category: "database",
        description: "Relational database with connection pooling and high-speed key-value cache.",
        whyWeChoose: "PostgreSQL with Supabase RLS provides absolute tenant isolation. Redis acts as our rate-limiter and task-broker to feed model calls steadily.",
        benefit: "Redis job latency < 2ms",
        benefitLabel: "Queue Overhead",
        alternativesAvoided: "Avoids NoSQL document stores (MongoDB) for complex SaaS entities that require strict transaction boundaries and financial schemas.",
        subTechs: ["Supabase PostgreSQL", "Redis Cache", "BullMQ Queue"],
        row: 2,
        col: 3
      },
      {
        id: "ai-orchestrator",
        name: "AI Bedrock & Claude",
        iconName: "Brain",
        category: "ai",
        description: "Secure private AI pipeline with prompt templates, fallbacks, and semantic caching.",
        whyWeChoose: "AWS Bedrock guarantees that customer data is never leaked into training models. Claude 3.5 Sonnet handles complex agent actions with industry-best reasoning.",
        benefit: "Prompt bills cut by 40%",
        benefitLabel: "AI Semantic Cache",
        alternativesAvoided: "Avoids direct unmonitored API calls to public consumer LLMs which present data-privacy leaks and run up massive API fees.",
        subTechs: ["AWS Bedrock", "Claude 3.5 Sonnet", "LangChain / LlamaIndex", "pgvector"],
        row: 3,
        col: 2
      },
      {
        id: "cloud-infra",
        name: "AWS ECS & Docker",
        iconName: "Cloud",
        category: "infrastructure",
        description: "Containerized deployment in a secure, auto-scaling Virtual Private Cloud (VPC).",
        whyWeChoose: "Dockerized AWS ECS auto-scales dynamically. Multi-AZ deployment keeps APIs operational even during hardware outages at specific cloud zones.",
        benefit: "99.99% Automated Uptime",
        benefitLabel: "SLA / High Availability",
        alternativesAvoided: "Avoids over-provisioning massive static servers that drain budget during idle weekends, or over-relying on fragile, cold-start-heavy functions.",
        subTechs: ["AWS ECS Fargate", "Docker Containers", "Terraform", "GitHub Actions"],
        row: 3,
        col: 1
      }
    ],
    connections: [
      { from: "client-ui", to: "edge-gateway", animated: true },
      { from: "edge-gateway", to: "api-backend", animated: true },
      { from: "api-backend", to: "data-queue", animated: true },
      { from: "api-backend", to: "ai-orchestrator", animated: true },
      { from: "ai-orchestrator", to: "data-queue", animated: false },
      { from: "cloud-infra", to: "api-backend", animated: false }
    ]
  },
  {
    id: "headless-ecommerce",
    name: "Headless E-Commerce Stack",
    description: "Tailored for D2C brands that require lightning-fast loading speeds, typing-speed instant search, and massive scale during seasonal flash sales.",
    nodes: [
      {
        id: "client-store",
        name: "Storefront (Next.js)",
        iconName: "Atom",
        category: "frontend",
        description: "Dynamic storefront utilizing Incremental Static Regeneration (ISR).",
        whyWeChoose: "ISR pre-renders static product catalogs and updates them in the background. High-speed headless storefronts capture search traffic and boost dynamic conversion rates.",
        benefit: "0.4s First Contentful Paint",
        benefitLabel: "FCP Core Web Vital",
        alternativesAvoided: "Avoids monolithic Shopify Liquid themes that clog the main thread with unoptimized, heavy rendering scripts.",
        subTechs: ["Next.js (App Router)", "React Server Components", "Tailwind CSS v4"],
        row: 1,
        col: 1
      },
      {
        id: "cdn-edge",
        name: "Cloudflare Edge Cache",
        iconName: "Globe",
        category: "edge",
        description: "Edge caching layers delivering page layouts in less than 50ms worldwide.",
        whyWeChoose: "Cloudflare Workers intercept requests at the edge, serving pre-cached HTML templates directly to users globally without hitting the origin database.",
        benefit: "40ms global TTFB",
        benefitLabel: "Time To First Byte",
        alternativesAvoided: "Avoids route congestion and high latency spikes during flash sales by eliminating direct origin backend database reads.",
        subTechs: ["Cloudflare Workers", "KV Store", "WAF Rules"],
        row: 1,
        col: 2
      },
      {
        id: "commerce-backend",
        name: "Core Engine (Medusa)",
        iconName: "Server",
        category: "api",
        description: "Headless open commerce backend managing cart logic, promotions, and checkout flows.",
        whyWeChoose: "Medusa's Node-based modular API lets us bypass monolithic limits to build custom bundling rules, localized pricing, and headless checkout structures.",
        benefit: "Cart operation < 12ms",
        benefitLabel: "API Response Speed",
        alternativesAvoided: "Avoids heavy monolithic ERP systems (Magento) that require massive server resources and are slow to customize.",
        subTechs: ["MedusaJS Engine", "Shopify Storefront API", "Node.js Microservices"],
        row: 2,
        col: 2
      },
      {
        id: "search-cache",
        name: "Meilisearch & Redis Cache",
        iconName: "Database",
        category: "database",
        description: "Typo-tolerant instant search index and catalog cache.",
        whyWeChoose: "Meilisearch provides millisecond-level instant typing-speed results. Redis holds session metadata and cart states to prevent database write locks.",
        benefit: "Search resolves in 15ms",
        benefitLabel: "Typo-Tolerant Search",
        alternativesAvoided: "Avoids slow SQL 'LIKE' queries that slow down under heavy database traffic or expensive ElasticSearch clusters that require dedicated indexing engineers.",
        subTechs: ["Meilisearch Cloud", "Redis Cache", "PostgreSQL Storage"],
        row: 2,
        col: 3
      },
      {
        id: "marketing-whatsapp",
        name: "AI Greentick Campaigns",
        iconName: "Zap",
        category: "ai",
        description: "Broadcast engine and cart recovery chatbots integrated with WhatsApp Business API.",
        whyWeChoose: "Integrates directly with AI Greentick to send automated broadcast campaigns and recovery flows to customers on their most active personal messaging app.",
        benefit: "18% abandoned cart recovery",
        benefitLabel: "Conversion Lift",
        alternativesAvoided: "Avoids relying solely on low-yield emails that get buried in spam folders (industry email open rates are under 15%).",
        subTechs: ["AI Greentick APIs", "Official WhatsApp API", "Automated Cart recovery Flow"],
        row: 3,
        col: 2
      },
      {
        id: "hosting-platform",
        name: "Vercel & Railway Edge",
        iconName: "Cloud",
        category: "infrastructure",
        description: "Serverless hosting platform with continuous git-based deployments and branch previews.",
        whyWeChoose: "Vercel dynamically scales serverless API routes on demand. High availability, instant rollback paths, and automatic asset optimization built in.",
        benefit: "Zero downtime during launches",
        benefitLabel: "Deployment Safety",
        alternativesAvoided: "Avoids complex manual web server provisioning (Nginx/Apache) that requires continuous security patching and active human operations.",
        subTechs: ["Vercel Hosting", "Railway database Container", "Cloudflare WAF"],
        row: 3,
        col: 1
      }
    ],
    connections: [
      { from: "client-store", to: "cdn-edge", animated: true },
      { from: "cdn-edge", to: "commerce-backend", animated: true },
      { from: "commerce-backend", to: "search-cache", animated: true },
      { from: "commerce-backend", to: "marketing-whatsapp", animated: true },
      { from: "marketing-whatsapp", to: "search-cache", animated: false },
      { from: "hosting-platform", to: "commerce-backend", animated: false }
    ]
  },
  {
    id: "realtime-mobile",
    name: "Real-Time Mobile App Pipeline",
    description: "Designed for mobile-first products needing offline-first capabilities, real-time push alerts, and direct native hardware communication.",
    nodes: [
      {
        id: "mobile-client",
        name: "Mobile App (React Native)",
        iconName: "Smartphone",
        category: "frontend",
        description: "Cross-platform mobile application using Expo and native bridging.",
        whyWeChoose: "React Native with Expo allows us to compile single-source native code for both iOS and Android. Direct React architecture means instant component updates.",
        benefit: "Fluid 60FPS Native UI",
        benefitLabel: "Render Performance",
        alternativesAvoided: "Avoids slow Webview-based containers (Cordova, Capacitor) that feel laggy and struggle to pass App Store review criteria.",
        subTechs: ["React Native", "Expo SDK", "TypeScript", "Reanimated"],
        row: 1,
        col: 1
      },
      {
        id: "gateway-proxy",
        name: "API Gateway (Kong)",
        iconName: "Globe",
        category: "edge",
        description: "Cloud-native API gateway handling rate limits, CORS, and request forwarding.",
        whyWeChoose: "Kong handles high-throughput authorization proxies and traffic routing instantly at the edge of our server network.",
        benefit: "Gateway overhead < 5ms",
        benefitLabel: "Proxying Overhead",
        alternativesAvoided: "Avoids routing raw mobile app requests straight to unprotected backends, leaving databases open to DDoS exploits.",
        subTechs: ["Kong Gateway", "Cloudflare DNS", "OAuth Proxy"],
        row: 1,
        col: 2
      },
      {
        id: "python-backend",
        name: "FastAPI Backend (Python)",
        iconName: "Server",
        category: "api",
        description: "High-performance Python ASGI backend ideal for heavy computational data processing.",
        whyWeChoose: "FastAPI is extremely fast, fully supports async await loops, and handles native Pydantic data validation with strict type-safety rules.",
        benefit: "3x faster request processing",
        benefitLabel: "vs Django / Flask",
        alternativesAvoided: "Avoids heavy legacy frameworks like Django when the task only demands light, super-fast API microservices.",
        subTechs: ["FastAPI", "Uvicorn ASGI", "Pydantic", "SQLAlchemy"],
        row: 2,
        col: 2
      },
      {
        id: "offline-db",
        name: "PostgreSQL & Sync DB",
        iconName: "Database",
        category: "database",
        description: "Offline-first SQL synchronization database with connection pools.",
        whyWeChoose: "WatermelonDB locally caches SQLite states on the device, syncing changed rows silently back to PostgreSQL once the cell network reconnects.",
        benefit: "Sync completes in < 200ms",
        benefitLabel: "Offline Reconciliation",
        alternativesAvoided: "Avoids standard online-only database APIs that cause screen-freezes and 'Connection Lost' error alerts for the user.",
        subTechs: ["PostgreSQL DB", "WatermelonDB", "SQLite Device Cache"],
        row: 2,
        col: 3
      },
      {
        id: "push-engine",
        name: "Firebase Cloud Alerts",
        iconName: "Zap",
        category: "ai",
        description: "High-speed push alerts engine handling silent sync calls and device popups.",
        whyWeChoose: "Firebase is the industry standard for delivering ultra-low-latency background push triggers directly to native iOS APNS and Android layers.",
        benefit: "Push delivery inside 1.2s",
        benefitLabel: "Average Latency",
        alternativesAvoided: "Avoids heavy background polling cycles that drain user battery life and drive up active mobile resource overhead.",
        subTechs: ["Firebase Messaging (FCM)", "Apple Push (APNS)", "Background Tasks SDK"],
        row: 3,
        col: 2
      },
      {
        id: "hetzner-deploy",
        name: "Docker & Hetzner Infrastructure",
        iconName: "Cloud",
        category: "infrastructure",
        description: "Bare-metal instances running containerized API deployments.",
        whyWeChoose: "We run dockerized FastAPI nodes directly on Hetzner bare-metal instances. This bypasses expensive hyperscaler fees, maximizing client budget.",
        benefit: "70% Cloud Bill Reduction",
        benefitLabel: "vs AWS Hyperscaler",
        alternativesAvoided: "Avoids keeping early-stage mobile applications locked inside expensive server clusters that bleed money for simple storage.",
        subTechs: ["Hetzner Dedicated", "Docker Compose", "GitHub Actions Runner"],
        row: 3,
        col: 1
      }
    ],
    connections: [
      { from: "mobile-client", to: "gateway-proxy", animated: true },
      { from: "gateway-proxy", to: "python-backend", animated: true },
      { from: "python-backend", to: "offline-db", animated: true },
      { from: "python-backend", to: "push-engine", animated: true },
      { from: "push-engine", to: "offline-db", animated: false },
      { from: "hetzner-deploy", to: "python-backend", animated: false }
    ]
  }
]

const CATEGORY_COLORS = {
  frontend: {
    border: "border-blue-500/30 hover:border-blue-500/60 dark:border-blue-400/30 dark:hover:border-blue-400/60",
    bg: "bg-blue-500/5 dark:bg-blue-400/5",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.15)]",
    activeGlow: "shadow-[0_0_25px_rgba(59,130,246,0.35)] border-blue-500/80 dark:border-blue-400/80",
    text: "text-blue-600 dark:text-blue-400",
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
  },
  edge: {
    border: "border-cyan-500/30 hover:border-cyan-500/60 dark:border-cyan-400/30 dark:hover:border-cyan-400/60",
    bg: "bg-cyan-500/5 dark:bg-cyan-400/5",
    glow: "shadow-[0_0_15px_rgba(6,182,212,0.15)]",
    activeGlow: "shadow-[0_0_25px_rgba(6,182,212,0.35)] border-cyan-500/80 dark:border-cyan-400/80",
    text: "text-cyan-600 dark:text-cyan-400",
    badge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20"
  },
  api: {
    border: "border-emerald-500/30 hover:border-emerald-500/60 dark:border-emerald-400/30 dark:hover:border-emerald-400/60",
    bg: "bg-emerald-500/5 dark:bg-emerald-400/5",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.15)]",
    activeGlow: "shadow-[0_0_25px_rgba(16,185,129,0.35)] border-emerald-500/80 dark:border-emerald-400/80",
    text: "text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
  },
  database: {
    border: "border-amber-500/30 hover:border-amber-500/60 dark:border-amber-400/30 dark:hover:border-amber-400/60",
    bg: "bg-amber-500/5 dark:bg-amber-400/5",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.15)]",
    activeGlow: "shadow-[0_0_25px_rgba(245,158,11,0.35)] border-amber-500/80 dark:border-amber-400/80",
    text: "text-amber-600 dark:text-amber-400",
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
  },
  ai: {
    border: "border-rose-500/30 hover:border-rose-500/60 dark:border-rose-400/30 dark:hover:border-rose-400/60",
    bg: "bg-rose-500/5 dark:bg-rose-400/5",
    glow: "shadow-[0_0_15px_rgba(244,63,94,0.15)]",
    activeGlow: "shadow-[0_0_25px_rgba(244,63,94,0.35)] border-rose-500/80 dark:border-rose-400/80",
    text: "text-rose-600 dark:text-rose-400",
    badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
  },
  infrastructure: {
    border: "border-indigo-500/30 hover:border-indigo-500/60 dark:border-indigo-400/30 dark:hover:border-indigo-400/60",
    bg: "bg-indigo-500/5 dark:bg-indigo-400/5",
    glow: "shadow-[0_0_15px_rgba(99,102,241,0.15)]",
    activeGlow: "shadow-[0_0_25px_rgba(99,102,241,0.35)] border-indigo-500/80 dark:border-indigo-400/80",
    text: "text-indigo-600 dark:text-indigo-400",
    badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
  }
}

export default function InteractiveStackExplorer() {
  const [selectedTemplateIdx, setSelectedTemplateIdx] = useState(0)
  const [activeNodeId, setActiveNodeId] = useState<string>("")
  const [windowWidth, setWindowWidth] = useState(1200)

  const activeTemplate = TEMPLATES[selectedTemplateIdx]
  const activeNode = activeTemplate.nodes.find(n => n.id === activeNodeId) || activeTemplate.nodes[0]

  useEffect(() => {
    // Set initial node ID
    setActiveNodeId(activeTemplate.nodes[0].id)
  }, [selectedTemplateIdx])

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Lucide helper mapper
  const renderIcon = (name: string, className: string) => {
    switch (name) {
      case "Atom":
        return <Atom className={className} />
      case "Globe":
        return <Globe className={className} />
      case "Server":
        return <Server className={className} />
      case "Database":
        return <Database className={className} />
      case "Brain":
        return <Brain className={className} />
      case "Cloud":
        return <Cloud className={className} />
      case "Smartphone":
        return <Smartphone className={className} />
      case "Zap":
        return <Zap className={className} />
      default:
        return <Cpu className={className} />
    }
  }

  // Node coordinate generator for absolute positioning relative to canvas container
  // We place nodes at standard percentage locations to make it responsive on desktop
  const getNodeCoordinates = (nodeId: string) => {
    const node = activeTemplate.nodes.find(n => n.id === nodeId)
    if (!node) return { x: 50, y: 50 }

    const isLarge = windowWidth >= 1024
    if (isLarge) {
      // Map columns (1, 2, 3) to horizontal positions (%) and rows (1, 2, 3) to vertical positions (%)
      const colMap = { 1: 15, 2: 50, 3: 85 }
      const rowMap = { 1: 18, 2: 50, 3: 82 }
      return {
        x: colMap[node.col as 1 | 2 | 3] || 50,
        y: rowMap[node.row as 1 | 2 | 3] || 50
      }
    } else {
      // Mobile vertical stacked/scattered flow
      const colMap = { 1: 20, 2: 50, 3: 80 }
      const rowMap = { 1: 10, 2: 48, 3: 86 }
      // Mobile scatter slightly different
      return {
        x: colMap[node.col as 1 | 2 | 3] || 50,
        y: rowMap[node.row as 1 | 2 | 3] || 50
      }
    }
  }

  return (
    <section className="bg-radial from-neutral-900 to-black py-16 sm:py-24 border-t border-b border-neutral-800 text-white relative overflow-hidden">
      {/* Grid Overlay background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-85 pointer-events-none" />

      {/* Radiant glow decorations */}
      <div className="absolute top-1/4 left-1/4 size-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 size-[400px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl space-y-4 text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3" />
            <span>INTERACTIVE ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-neutral-100">
            Visual Stack Explorer
          </h2>
          <p className="text-muted-foreground text-[15px] sm:text-lg leading-relaxed">
            Apargo maps architecture to product demands. Select a pipeline below to explore how we connect frontend interfaces, server cores, and AI intelligence seamlessly.
          </p>
        </div>

        {/* Template Selector Tabs */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 mb-10 max-w-2xl mx-auto">
          {TEMPLATES.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTemplateIdx(idx)
              }}
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold border transition-all duration-300 ${
                selectedTemplateIdx === idx
                  ? "bg-neutral-100 text-neutral-900 border-neutral-100 shadow-lg"
                  : "bg-neutral-900/60 hover:bg-neutral-800/80 text-neutral-300 border-neutral-800 hover:border-neutral-700"
              }`}
            >
              <Activity className={`size-4 ${selectedTemplateIdx === idx ? "text-primary-foreground" : "text-primary"}`} />
              <span>{t.name}</span>
            </button>
          ))}
        </div>

        {/* Architecture Subtitle Description */}
        <motion.p 
          key={activeTemplate.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center text-sm text-neutral-400 max-w-3xl mx-auto mb-12 italic"
        >
          &ldquo;{activeTemplate.description}&rdquo;
        </motion.p>

        {/* Core Layout Grid */}
        <div className="grid gap-8 lg:grid-cols-12 items-stretch min-h-[580px]">
          
          {/* Node Graph Canvas (7 Columns on large screens) */}
          <div className="lg:col-span-7 bg-neutral-900/40 border border-neutral-800/60 rounded-3xl p-4 sm:p-6 lg:p-8 relative min-h-[480px] lg:min-h-0 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-xs">
            
            {/* Guide Hint */}
            <div className="flex items-center gap-2 text-xs text-neutral-400 absolute top-4 left-4 sm:top-5 sm:left-5 bg-neutral-950/60 border border-neutral-800/50 rounded-full px-3 py-1.5 backdrop-blur-md z-30">
              <MousePointerClick className="size-3.5 text-primary animate-pulse" />
              <span>Click a node to deep-dive</span>
            </div>

            {/* SVG Connection Canvas */}
            <svg className="absolute inset-0 size-full z-10 pointer-events-none overflow-visible">
              <defs>
                <linearGradient id="line-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
                </linearGradient>
                {/* Dynamic gradient marker for glowing dots */}
                <radialGradient id="particle-glow" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
              </defs>

              {activeTemplate.connections.map((conn, idx) => {
                const start = getNodeCoordinates(conn.from)
                const end = getNodeCoordinates(conn.to)
                
                // SVG coordinates mapped from percentage of canvas width/height
                const startX = `${start.x}%`
                const startY = `${start.y}%`
                const endX = `${end.x}%`
                const endY = `${end.y}%`

                const isLineActive = activeNodeId === conn.from || activeNodeId === conn.to

                return (
                  <g key={`${conn.from}-${conn.to}-${idx}`}>
                    {/* Underlying Background Path line */}
                    <line
                      x1={startX}
                      y1={startY}
                      x2={endX}
                      y2={endY}
                      className={`stroke-neutral-800 transition-all duration-500`}
                      strokeWidth={isLineActive ? "2.5" : "1.5"}
                      style={{
                        stroke: isLineActive ? "var(--color-primary, #10b981)" : "#262626",
                        opacity: isLineActive ? 0.45 : 0.25
                      }}
                    />

                    {/* Glowing flow particle path */}
                    {conn.animated && (
                      <motion.line
                        x1={startX}
                        y1={startY}
                        x2={endX}
                        y2={endY}
                        stroke="url(#line-glow)"
                        strokeWidth="2.5"
                        strokeDasharray="4 20"
                        animate={{
                          strokeDashoffset: [-120, 0]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          ease: "linear"
                        }}
                        className="opacity-70"
                      />
                    )}
                  </g>
                )
              })}
            </svg>

            {/* Nodes Container */}
            <div className="relative size-full min-h-[400px] flex-1 z-20">
              {activeTemplate.nodes.map((node) => {
                const pos = getNodeCoordinates(node.id)
                const color = CATEGORY_COLORS[node.category]
                const isActive = activeNodeId === node.id

                return (
                  <motion.div
                    key={node.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveNodeId(node.id)}
                  >
                    {/* Glass card background */}
                    <div
                      className={`rounded-2xl border bg-neutral-950/85 p-3.5 flex flex-col items-center gap-1.5 min-w-[130px] sm:min-w-[155px] text-center transition-all duration-300 ${
                        isActive ? color.activeGlow : `${color.border} ${color.glow}`
                      }`}
                    >
                      {/* Icon */}
                      <div className={`p-2 rounded-xl transition-all duration-300 ${color.bg}`}>
                        {renderIcon(node.iconName, `size-5 sm:size-6 ${color.text}`)}
                      </div>
                      
                      {/* Title */}
                      <span className="text-[12px] sm:text-[13px] font-bold text-neutral-200 tracking-tight leading-tight">
                        {node.name.split(" ")[0]}
                        <span className="hidden sm:inline"> {node.name.split(" ").slice(1).join(" ")}</span>
                      </span>
                    </div>

                    {/* Radial active wave halo */}
                    {isActive && (
                      <span className="absolute inset-0 border border-primary/45 rounded-2xl scale-110 pointer-events-none animate-ping opacity-25" />
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Status Flow Legends */}
            <div className="flex items-center justify-between border-t border-neutral-800/40 pt-4 mt-4 z-30">
              <div className="flex items-center gap-4 text-[11px] sm:text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-blue-500/80" />
                  <span>UI</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500/80" />
                  <span>API Core</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-amber-500/80" />
                  <span>Data Layer</span>
                </span>
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="size-2 rounded-full bg-rose-500/80" />
                  <span>AI Engine</span>
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] sm:text-xs text-neutral-400 bg-neutral-900 border border-neutral-800 rounded px-2 py-0.5">
                <ActivityIcon className="size-3 text-emerald-500 animate-pulse" />
                <span>Live connection flow</span>
              </div>
            </div>

          </div>

          {/* Technical Details Panel (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTemplate.id}-${activeNode.id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-neutral-900/60 border border-neutral-800/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-2xl backdrop-blur-md relative"
              >
                
                {/* Tech Title & Category Indicator */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4">
                    <div>
                      <span className={`text-[11px] font-semibold tracking-widest uppercase ${CATEGORY_COLORS[activeNode.category].text}`}>
                        {activeNode.category} Layer
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-100 mt-1">
                        {activeNode.name}
                      </h3>
                    </div>
                    <div className={`p-3 rounded-2xl bg-neutral-950 border border-neutral-800/50 ${CATEGORY_COLORS[activeNode.category].text}`}>
                      {renderIcon(activeNode.iconName, "size-7")}
                    </div>
                  </div>

                  {/* Core Description */}
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {activeNode.description}
                  </p>

                  {/* Rationale "Why Apargo Chooses This" */}
                  <div className="space-y-2 pt-2">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                      <Terminal className="size-3.5 text-primary" />
                      <span>Why We Choose It</span>
                    </span>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {activeNode.whyWeChoose}
                    </p>
                  </div>

                  {/* Pragmatic "Alternatives Avoided" */}
                  <div className="space-y-2 pt-2">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                      <ShieldCheck className="size-3.5 text-rose-500" />
                      <span>Pragmatic Tradeoffs</span>
                    </span>
                    <p className="text-neutral-400 text-sm leading-relaxed italic border-l-2 border-neutral-800 pl-3">
                      {activeNode.alternativesAvoided}
                    </p>
                  </div>
                </div>

                {/* Sub Tech Badges and Performance highlights */}
                <div className="space-y-6 pt-6 mt-6 border-t border-neutral-800/80">
                  
                  {/* Performance highlight widget */}
                  <div className="rounded-2xl bg-neutral-950/70 border border-neutral-800/50 p-4 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
                        {activeNode.benefitLabel}
                      </span>
                      <div className="text-[15px] sm:text-base font-bold text-neutral-200">
                        {activeNode.benefit}
                      </div>
                    </div>
                    <div className="size-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                      <Activity className="size-5" />
                    </div>
                  </div>

                  {/* Tech stack badges */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                      Key Technology Tokens
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeNode.subTechs.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className={`text-xs px-2.5 py-1 rounded-md border ${CATEGORY_COLORS[activeNode.category].badge}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  )
}
