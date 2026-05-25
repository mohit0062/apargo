export type CareerRole = {
  slug: string
  title: string
  location: string
  employmentType: string
  team: string
  summary: string
  about: string[]
  first90: string[]
  responsibilities: string[]
  requirements: string[]
  niceToHave: string[]
  compensation: {
    range: string
    equity: string
  }
  applyHref: string
}

const careersEmail = 'hello@apargo.com'

function mailto(subject: string) {
  return `mailto:${careersEmail}?subject=${encodeURIComponent(subject)}`
}

export const openApplicationHref = mailto('Open application for Apargo')

export const openRoles: CareerRole[] = [
  {
    slug: 'senior-backend-engineer-node-python',
    title: 'Senior Backend Engineer - Node/Python',
    location: 'Remote',
    employmentType: 'Full-time',
    team: 'Engineering',
    summary:
      'Own production services, queues, APIs, and integrations for client products and AI Greentick.',
    about: [
      'You will work on the services that make Apargo products reliable: APIs, worker queues, event pipelines, billing integrations, WhatsApp workflows, and the operational tooling behind them.',
      'In the first 90 days, you will ship a real production module, harden one existing service, and write the runbook that future engineers use when something breaks.',
    ],
    first90: [
      'Map one critical backend flow from request to deployment and identify the highest-leverage reliability fix.',
      'Ship a scoped production feature with tests, observability, and a rollback path.',
      'Pair with product and support to remove one recurring manual operation from AI Greentick.',
    ],
    responsibilities: [
      'Design and build Node.js/Python services, APIs, queues, and data workflows.',
      'Own deploys, alerts, incident follow-up, and production fixes for the services you touch.',
      'Write clear technical specs so async reviewers can make decisions without meetings.',
    ],
    requirements: [
      '6+ years building backend systems used by real customers.',
      'Strong judgement around databases, queues, API design, testing, and production debugging.',
      'Comfort working across Node.js, Python, SQL, cloud infrastructure, and CI/CD.',
    ],
    niceToHave: [
      'Experience with WhatsApp Business APIs, LLM workflows, or high-volume notification systems.',
      'You have migrated a brittle service without pausing product delivery.',
    ],
    compensation: {
      range: 'INR 36L-60L annual CTC',
      equity: '0.15%-0.40% ESOP',
    },
    applyHref: mailto('Application: Senior Backend Engineer - Node/Python'),
  },
  {
    slug: 'senior-full-stack-engineer-ai-products',
    title: 'Senior Full-stack Engineer - AI Products',
    location: 'Remote',
    employmentType: 'Full-time',
    team: 'AI',
    summary:
      'Build AI-assisted product workflows from model integration to polished UI and production telemetry.',
    about: [
      'This role sits between product engineering and applied AI. You will turn ambiguous workflow problems into shipped product experiences, not research demos.',
      'In the first 90 days, you will own one AI Greentick workflow end-to-end: UX, API contract, model/tool orchestration, evaluation, analytics, and release.',
    ],
    first90: [
      'Audit an existing AI workflow for latency, quality, cost, and UX failure points.',
      'Ship a new AI-assisted feature behind a guarded release with evaluation notes.',
      'Create a practical playbook for prompt, tool, and fallback decisions.',
    ],
    responsibilities: [
      'Build full-stack features across Next.js, APIs, background jobs, and AI integrations.',
      'Design fallbacks, guardrails, eval checks, and analytics for model-powered flows.',
      'Work directly with PM/design to reduce vague ideas into small production releases.',
    ],
    requirements: [
      '5+ years shipping full-stack products with strong TypeScript/React fundamentals.',
      'Practical experience using LLM APIs, tool calling, retrieval, evals, or agentic workflows.',
      'Strong product taste and the ability to debug across UI, backend, and provider layers.',
    ],
    niceToHave: [
      'Experience with Vercel, queues, observability, and cost-aware AI architecture.',
      'You have shipped an AI feature customers actually kept using.',
    ],
    compensation: {
      range: 'INR 42L-70L annual CTC',
      equity: '0.20%-0.50% ESOP',
    },
    applyHref: mailto('Application: Senior Full-stack Engineer - AI Products'),
  },
  {
    slug: 'product-designer-saas-systems',
    title: 'Product Designer - SaaS Systems',
    location: 'Remote / India',
    employmentType: 'Contract to full-time',
    team: 'Design',
    summary:
      'Design serious SaaS workflows for operators, founders, support teams, and internal product users.',
    about: [
      'You will design the interfaces Apargo uses to make complex work feel manageable: admin panels, AI review queues, onboarding flows, analytics, and customer-facing SaaS surfaces.',
      'In the first 90 days, you will redesign one high-traffic workflow, define reusable interface patterns, and work with engineers until the shipped UI matches the intent.',
    ],
    first90: [
      'Audit a live workflow and identify where users lose confidence, speed, or context.',
      'Prototype a cleaner version and validate it with internal users or customers.',
      'Document a small set of reusable product patterns for future Apargo work.',
    ],
    responsibilities: [
      'Create flows, wireframes, prototypes, high-fidelity UI, and implementation-ready specs.',
      'Use the shadcn design system thoughtfully instead of dropping generic component grids.',
      'Partner with engineering during build review, not just at handoff.',
    ],
    requirements: [
      '5+ years designing B2B SaaS, dashboards, admin tools, or workflow-heavy products.',
      'Excellent information architecture and interaction design judgement.',
      'Strong written rationale for tradeoffs, edge cases, and product decisions.',
    ],
    niceToHave: [
      'Experience designing AI-assisted workflows or WhatsApp-first business tools.',
      'You can write enough frontend code to understand implementation constraints.',
    ],
    compensation: {
      range: 'INR 24L-42L annual CTC or INR 1.5L-2.8L/month contract',
      equity: '0.05%-0.20% ESOP if converted full-time',
    },
    applyHref: mailto('Application: Product Designer - SaaS Systems'),
  },
  {
    slug: 'senior-product-manager-ai-greentick',
    title: 'Senior Product Manager - AI Greentick',
    location: 'Remote',
    employmentType: 'Full-time',
    team: 'Product',
    summary:
      'Own roadmap slices for AI Greentick and turn customer pain into shipped, measurable product loops.',
    about: [
      'You will run discovery, prioritization, specs, release notes, and post-launch learning for AI Greentick. This is not a meeting-heavy coordinator role; it is a builder PM seat.',
      'In the first 90 days, you will own a measurable onboarding or automation improvement from customer interviews through rollout and usage review.',
    ],
    first90: [
      'Interview customers and support to find one workflow causing repeated friction.',
      'Write a crisp spec with success metrics, non-goals, and rollout constraints.',
      'Ship with engineering, read the data, and decide what to cut or double down on.',
    ],
    responsibilities: [
      'Prioritize roadmap work across customer value, engineering effort, and operational load.',
      'Write specs, release notes, docs, and async decision memos that unblock senior engineers.',
      'Use product analytics, support signals, and customer calls to make roadmap calls.',
    ],
    requirements: [
      '5+ years in product management for SaaS, automation, CRM, messaging, or AI products.',
      'Strong written communication and comfort making decisions with imperfect data.',
      'Enough technical fluency to reason about APIs, queues, integrations, and AI tradeoffs.',
    ],
    niceToHave: [
      'Experience with WhatsApp Business, SMB SaaS, product-led onboarding, or support automation.',
      'You have shipped a product improvement that moved a metric you can explain.',
    ],
    compensation: {
      range: 'INR 34L-56L annual CTC',
      equity: '0.10%-0.35% ESOP',
    },
    applyHref: mailto('Application: Senior Product Manager - AI Greentick'),
  },
]

export function getCareerRole(slug: string) {
  return openRoles.find((role) => role.slug === slug)
}
