import {
  BotIcon,
  FileSearchIcon,
  SparklesIcon,
  WorkflowIcon,
  PuzzleIcon,
  ShoppingBagIcon,
  HeartPulseIcon,
  GraduationCapIcon,
  WalletCardsIcon,
  BriefcaseBusinessIcon
} from 'lucide-react'

import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'

import HeroSection from '@/components/shadcn-studio/blocks/hero-section-03-ai/hero-section-03-ai'
import Features01 from '@/components/shadcn-studio/blocks/features-section-01-ai/features-section-01-ai'
import CompareUILib from '@/components/shadcn-studio/blocks/compare-ui-lib-ai/compare-ui-lib-ai'
import AppIntegration from '@/components/shadcn-studio/blocks/app-integration-03-ai/app-integration-03-ai'
import Features03 from '@/components/shadcn-studio/blocks/features-section-03-ai/features-section-03-ai'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11-ai/cta-section-11-ai'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-09/faq-component-09'

import type { AvatarItem } from '@/components/shadcn-studio/blocks/hero-section-03-ai/hero-section-03-ai'

export const metadata = {
  title: 'AI & Machine Learning Services — Practical AI for Business | Apargo',
  description:
    'Apargo builds practical AI solutions — chatbots, document AI, recommendation engines, workflow automation. We use AI where it saves real time and money.'
}

const avatars: AvatarItem[] = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
    name: 'Howard Lloyd',
    fallback: 'HL'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png',
    name: 'Jenny Wilson',
    fallback: 'JW'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    name: 'Hallie Richards',
    fallback: 'HR'
  }
]

const featuresListFeaturesSection01 = [
  {
    icon: BotIcon,
    title: 'AI chatbots and conversational AI',
    description:
      "Customer support, sales qualification, internal helpdesks. Built on RAG over your own docs, integrated with WhatsApp, web chat, Slack, Teams. Same architecture powers AI Greentick's chatbot builder.",
    cardBorderColor: 'border-primary/40 hover:border-primary',
    avatarTextColor: 'text-primary',
    avatarBgColor: 'bg-primary/10',
    cardClassName: 'md:col-span-4'
  },
  {
    icon: FileSearchIcon,
    title: 'Document AI',
    description:
      'Pull structured data out of PDFs, invoices, contracts, scanned forms. Combine OCR, layout-aware parsing and LLMs to get accuracy that beats off-the-shelf APIs.',
    cardBorderColor: 'border-green-600/40 hover:border-green-600 dark:border-green-400/40 dark:hover:border-green-400',
    avatarTextColor: 'text-green-600 dark:text-green-400',
    avatarBgColor: 'bg-green-600/10 dark:bg-green-400/10',
    cardClassName: 'md:col-span-2'
  },
  {
    icon: SparklesIcon,
    title: 'Recommendation and personalisation',
    description:
      'Product recommendations, content feeds, search ranking — for e-commerce, EdTech, media. Mix of classical ML and embedding-based retrieval.',
    cardBorderColor: 'border-amber-600/40 hover:border-amber-600 dark:border-amber-400/40 dark:hover:border-amber-400',
    avatarTextColor: 'text-amber-600 dark:text-amber-400',
    avatarBgColor: 'bg-amber-600/10 dark:bg-amber-400/10',
    cardClassName: 'md:col-span-2'
  },
  {
    icon: WorkflowIcon,
    title: 'Workflow automation with AI',
    description:
      'Multi-step agent workflows — handle email triage, ticket routing, content moderation, lead scoring. Built on LangChain, LlamaIndex or custom orchestration.',
    cardBorderColor: 'border-blue-600/40 hover:border-blue-600 dark:border-blue-400/40 dark:hover:border-blue-400',
    avatarTextColor: 'text-blue-600 dark:text-blue-400',
    avatarBgColor: 'bg-blue-600/10 dark:bg-blue-400/10',
    cardClassName: 'md:col-span-2'
  },
  {
    icon: PuzzleIcon,
    title: 'AI integration into existing products',
    description:
      'You have a working product, you want to add AI features — summarisation, generation, transcription, smart search. We slot in without rewriting your stack.',
    cardBorderColor: 'border-purple-600/40 hover:border-purple-600 dark:border-purple-400/40 dark:hover:border-purple-400',
    avatarTextColor: 'text-purple-600 dark:text-purple-400',
    avatarBgColor: 'bg-purple-600/10 dark:bg-purple-400/10',
    cardClassName: 'md:col-span-2'
  }
]

const stackData = [
  {
    category: 'Foundation models',
    iconName: 'BrainCircuit',
    items: ['OpenAI GPT family', 'Anthropic Claude', 'Google Gemini', 'Meta Llama', 'Mistral']
  },
  {
    category: 'Open-source LLMs',
    iconName: 'Server',
    items: ['Llama', 'Mistral', 'Qwen', 'vLLM', 'Ollama']
  },
  {
    category: 'Vector databases',
    iconName: 'Database',
    items: ['Pinecone', 'Weaviate', 'Qdrant', 'pgvector']
  },
  {
    category: 'Frameworks',
    iconName: 'Code',
    items: ['LangChain', 'LlamaIndex', 'Haystack', 'Python', 'TypeScript']
  },
  {
    category: 'Classical ML',
    iconName: 'Cpu',
    items: ['scikit-learn', 'XGBoost', 'PyTorch', 'TensorFlow']
  },
  {
    category: 'Speech and vision',
    iconName: 'Eye',
    items: ['Whisper', 'OpenAI Vision', 'custom CV pipelines']
  }
]

const integrations = [
  {
    name: 'Start with measurement',
    description: 'What metric should move? How do we measure it before and after?',
    iconName: 'BarChart'
  },
  {
    name: 'Build the cheap baseline first',
    description: 'Sometimes a regex or rule is better than a model. We test that.',
    iconName: 'TerminalSquare'
  },
  {
    name: 'Monitor cost per request',
    description: 'AI bills can spiral. We log, alert and optimise.',
    iconName: 'DollarSign'
  },
  {
    name: 'Human-in-the-loop where it matters',
    description: 'Critical decisions stay reviewable, not just automated.',
    iconName: 'UserCheck'
  },
  {
    name: 'Data privacy by design',
    description: 'On-prem or private deployments where compliance demands it.',
    iconName: 'ShieldCheck'
  }
]

const featuresListFeaturesSection03 = [
  {
    icon: ShoppingBagIcon,
    title: 'E-commerce',
    description: 'Product Q&A bots, review summarisation, smart search'
  },
  {
    icon: HeartPulseIcon,
    title: 'Healthcare',
    description: 'Patient intake automation, clinical document summarisation'
  },
  {
    icon: GraduationCapIcon,
    title: 'Education',
    description: 'AI tutors, doubt-solving bots, auto-grading drafts'
  },
  {
    icon: WalletCardsIcon,
    title: 'FinTech',
    description: 'Document verification, fraud signals, customer onboarding'
  },
  {
    icon: BriefcaseBusinessIcon,
    title: 'Service businesses',
    description: 'Quote generation, FAQ deflection, lead qualification'
  }
]

const faqItems = [
  {
    question: "How do you ensure AI chatbots don't hallucinate or give wrong answers?",
    answer:
      'We build our conversational AI using advanced Retrieval-Augmented Generation (RAG) architectures with strict guardrails, ensuring the model only answers based on your verified documentation.'
  },
  {
    question: 'Can we host open-source LLMs privately on our own servers?',
    answer:
      'Absolutely. We routinely deploy fine-tuned open-source models like Llama 3, Mistral, and Qwen using vLLM or Ollama on private cloud infrastructure to guarantee 100% data privacy.'
  },
  {
    question: 'How do you prevent AI API costs from spiraling out of control?',
    answer:
      'We actively monitor cost per request, implement semantic caching, and use hybrid routing—directing simpler queries to faster, cheaper models while reserving large frontier models for complex reasoning tasks.'
  },
  {
    question: 'What is the difference between Document AI and standard OCR?',
    answer:
      'Standard OCR simply extracts raw text without context. Our Document AI combines OCR with layout-aware parsing and vision LLMs to understand complex tables, multi-column invoices, and unstructured contracts with near-perfect accuracy.'
  },
  {
    question: 'How long does an initial AI proof-of-concept (PoC) take?',
    answer:
      'A functional, measurable PoC typically takes 3 to 6 weeks. We start by establishing clear baseline metrics before scaling into a full production deployment.'
  }
]

const AIMachineLearningPage = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <SiteNavbar />

      <main className='flex flex-1 flex-col'>
        <HeroSection avatars={avatars} />

        <Features01 featuresList={featuresListFeaturesSection01} />

        <CompareUILib stackData={stackData} />

        <AppIntegration integrations={integrations} />

        <Features03 featuresList={featuresListFeaturesSection03} />

        <CTA />

        <FAQ faqItems={faqItems} />
      </main>

      <Footer />
    </div>
  )
}

export default AIMachineLearningPage
