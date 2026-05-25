import {
  CloudCogIcon,
  FileCode2Icon,
  GitBranchIcon,
  ActivityIcon,
  ShieldCheckIcon
} from 'lucide-react'

import SiteNavbar from '@/components/site-navbar'
import { getSiteSection, getLucideIcon } from '@/utils/cms'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'

import HeroSection from '@/components/shadcn-studio/blocks/hero-section-03/hero-section-03'
import Features01 from '@/components/shadcn-studio/blocks/features-section-01-cloud/features-section-01-cloud'
import CompareUILib from '@/components/shadcn-studio/blocks/compare-ui-lib-cloud/compare-ui-lib-cloud'
import AppIntegration from '@/components/shadcn-studio/blocks/app-integration-03-cloud/app-integration-03-cloud'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11-cloud/cta-section-11-cloud'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-09/faq-component-09'

import type { AvatarItem } from '@/components/shadcn-studio/blocks/hero-section-03/hero-section-03'

export const metadata = {
  title: 'Cloud, DevOps & Managed Hosting Services | Apargo',
  description:
    'AWS, GCP, Azure cloud setup, CI/CD, infrastructure-as-code, monitoring and on-call by Apargo. Predictable bills, predictable uptime.'
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
    icon: CloudCogIcon,
    title: 'Cloud migration',
    description:
      'Move from shared hosting, on-prem servers or legacy clouds to AWS, GCP or Azure. Audit first, plan second, migrate in phases.',
    cardBorderColor: 'border-primary/40 hover:border-primary',
    avatarTextColor: 'text-primary',
    avatarBgColor: 'bg-primary/10',
    cardClassName: 'md:col-span-4'
  },
  {
    icon: FileCode2Icon,
    title: 'Infrastructure-as-code',
    description:
      'Terraform, Pulumi or Cloud-specific tooling — your infrastructure defined in code, version-controlled, reviewable. No more clicking through dashboards.',
    cardBorderColor: 'border-green-600/40 hover:border-green-600 dark:border-green-400/40 dark:hover:border-green-400',
    avatarTextColor: 'text-green-600 dark:text-green-400',
    avatarBgColor: 'bg-green-600/10 dark:bg-green-400/10',
    cardClassName: 'md:col-span-2'
  },
  {
    icon: GitBranchIcon,
    title: 'CI/CD setup',
    description:
      'GitHub Actions, GitLab CI, CircleCI. Build, test, deploy on every commit. Branch previews, staging environments, one-click rollbacks.',
    cardBorderColor: 'border-amber-600/40 hover:border-amber-600 dark:border-amber-400/40 dark:hover:border-amber-400',
    avatarTextColor: 'text-amber-600 dark:text-amber-400',
    avatarBgColor: 'bg-amber-600/10 dark:bg-amber-400/10',
    cardClassName: 'md:col-span-2'
  },
  {
    icon: ActivityIcon,
    title: 'Monitoring and observability',
    description:
      'Logs, metrics, traces in one place. Datadog, Grafana, New Relic, Sentry — whatever fits your budget. Alerts that page humans only when something actually matters.',
    cardBorderColor: 'border-blue-600/40 hover:border-blue-600 dark:border-blue-400/40 dark:hover:border-blue-400',
    avatarTextColor: 'text-blue-600 dark:text-blue-400',
    avatarBgColor: 'bg-blue-600/10 dark:bg-blue-400/10',
    cardClassName: 'md:col-span-2'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Managed hosting and on-call',
    description:
      'Apargo runs your production environment on a retainer. Patching, upgrades, scaling, on-call coverage in your time zone.',
    cardBorderColor: 'border-purple-600/40 hover:border-purple-600 dark:border-purple-400/40 dark:hover:border-purple-400',
    avatarTextColor: 'text-purple-600 dark:text-purple-400',
    avatarBgColor: 'bg-purple-600/10 dark:bg-purple-400/10',
    cardClassName: 'md:col-span-2'
  }
]

const stackData = [
  {
    category: 'Clouds',
    iconName: 'Cloud',
    items: ['AWS', 'GCP', 'Azure', 'Hetzner', 'DigitalOcean']
  },
  {
    category: 'Orchestration',
    iconName: 'Boxes',
    items: ['Kubernetes', 'ECS', 'Cloud Run', 'App Runner']
  },
  {
    category: 'IaC',
    iconName: 'FileCode',
    items: ['Terraform', 'Pulumi', 'AWS CDK']
  },
  {
    category: 'CI/CD',
    iconName: 'GitBranch',
    items: ['GitHub Actions', 'GitLab CI', 'Argo CD']
  },
  {
    category: 'Monitoring',
    iconName: 'Activity',
    items: ['Datadog', 'Grafana', 'Prometheus', 'Sentry', 'BetterStack']
  }
]

const integrations = [
  {
    name: 'Idle Resources',
    description: 'Identify and terminate abandoned staging environments, unattached elastic IPs, and orphaned snapshots.',
    iconName: 'Server'
  },
  {
    name: 'Suboptimal Storage Tiers',
    description: 'Automate S3 lifecycle policies to transition older logs and backups to Glacier or Infrequent Access.',
    iconName: 'Database'
  },
  {
    name: 'Unattached Volumes',
    description: 'Clean up unattached EBS volumes that continue to bill monthly long after EC2 instances are terminated.',
    iconName: 'TerminalSquare'
  },
  {
    name: 'Architectural Bottlenecks',
    description: 'Refactor inefficient database queries and implement Redis caching to downsize expensive RDS instances.',
    iconName: 'BarChart'
  },
  {
    name: 'Over-provisioned Instances',
    description: 'Analyze CPU and memory utilization metrics to right-size oversized compute clusters.',
    iconName: 'DollarSign'
  }
]

const faqItems = [
  {
    question: 'What is involved in your free 30-minute cloud audit?',
    answer:
      'We examine your AWS, GCP, or Azure architecture and billing statements to identify idle resources, unattached volumes, suboptimal storage tiers, and architectural bottlenecks, providing a clear punch list of immediate cost savings.'
  },
  {
    question: 'Why should we use Infrastructure-as-Code (IaC) instead of cloud consoles?',
    answer:
      'IaC using Terraform or Pulumi makes your infrastructure reproducible, version-controlled, and self-documenting. It eliminates human error from manual dashboard clicking and allows disaster recovery in minutes.'
  },
  {
    question: 'How do your managed hosting and on-call retainers work?',
    answer:
      'We act as your dedicated Site Reliability Engineering (SRE) team. We handle 24/7 monitoring, automated patching, scaling events, and incident response within your SLA, ensuring maximum uptime while you sleep.'
  },
  {
    question: 'Can you set up zero-downtime CI/CD pipelines for our existing monolith?',
    answer:
      'Yes. We implement robust GitHub Actions or GitLab CI pipelines with automated testing, containerization, staging environments, and blue-green deployments to ensure seamless rollouts and one-click rollbacks.'
  },
  {
    question: 'Do you work with alternative cloud providers like Hetzner or DigitalOcean?',
    answer:
      'Absolutely. For workloads where hyperscaler fees (AWS/GCP) eat into margins, we routinely architect highly available Kubernetes clusters on Hetzner or DigitalOcean, cutting infrastructure bills by up to 70%.'
  }
]

import { ServicePageSchema } from '@/components/json-ld'

const CloudDevOpsPage = async () => {
  const data = await getSiteSection('service_cloud-devops')
  return (
    <div className='flex min-h-screen flex-col'>
      <ServicePageSchema
        data={data}
        serviceName="Cloud, DevOps & Managed Hosting Services"
        fallbackDescription="AWS, GCP, Azure cloud setup, CI/CD, infrastructure-as-code, monitoring and on-call."
      />
      <SiteNavbar />

      <main className='flex flex-1 flex-col'>
        <HeroSection
          avatars={avatars}
          badgeText={data.hero?.badgeText}
          subtitleText={data.hero?.subtitleText}
          title={data.hero?.title}
          description={data.hero?.description}
          primaryBtnText={data.hero?.primaryBtnText}
          primaryBtnHref={data.hero?.primaryBtnHref}
          secondaryBtnText={data.hero?.secondaryBtnText}
          secondaryBtnHref={data.hero?.secondaryBtnHref}
        />

        <Features01
          featuresList={(data.featuresList || []).map((feature: any, idx: number) => {
            const fallbackDesign = featuresListFeaturesSection01[idx] || featuresListFeaturesSection01[0] || {}
            return {
              ...fallbackDesign,
              icon: getLucideIcon(feature.iconName),
              title: feature.title,
              description: feature.description
            }
          })}
        />

        <CompareUILib stackData={stackData} />

        <AppIntegration integrations={integrations} />

        <CTA />

        <FAQ faqItems={data.faqItems || faqItems} />
      </main>

      <Footer />
    </div>
  )
}

export default CloudDevOpsPage
