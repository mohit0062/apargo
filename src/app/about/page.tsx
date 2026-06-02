import type { Metadata } from 'next'

import SiteNavbar from '@/components/site-navbar'
import AboutUs11 from '@/components/shadcn-studio/blocks/about-us-page-11/about-us-page-11'
import AboutUs18 from '@/components/shadcn-studio/blocks/about-us-page-18/about-us-page-18'
import BentoGrid from '@/components/shadcn-studio/blocks/bento-grid-16/bento-grid-16'
import CTA from '@/components/shadcn-studio/blocks/cta-section-11/cta-section-11'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'
import HowWeWork from '@/components/shadcn-studio/blocks/how-we-work/how-we-work'
import Team from '@/components/shadcn-studio/blocks/team-section-12/team-section-12'
import type { TeamMember } from '@/components/shadcn-studio/blocks/team-section-12/team-section-12'
import { getSiteSection } from '@/utils/cms'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'About Apargo - The Team Behind AI Greentick',
  description:
    'Meet Apargo - a product-engineering company building custom software, mobile apps and SaaS products. The team behind AI Greentick.'
}

const stats = [
  {
    value: 45,
    description: 'Projects Shipped'
  },
  {
    value: 20,
    description: 'Active Clients'
  },
  {
    value: 35,
    description: 'Engineering Team'
  }
]

const avatars = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    fallback: 'HL',
    name: 'Howard Lloyd'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
    fallback: 'OS',
    name: 'Olivia Sparks'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    fallback: 'HR',
    name: 'Hallie Richards'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png',
    fallback: 'JW',
    name: 'Jenny Wilson'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png',
    fallback: 'MC',
    name: 'Michael Chen'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-8.png',
    fallback: 'SD',
    name: 'Sarah Davis'
  }
]

const logos = [
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/amazon-logo-bw.png',
    alt: 'Amazon'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/walmart-logo-bw.png',
    alt: 'Walmart'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/hubspot-logo-bw.png',
    alt: 'HubSpot'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/microsoft-logo-bw.png',
    alt: 'Microsoft'
  }
]

const teamMember: TeamMember[] = [
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/image-57.png',
    name: 'Ethan Caldwell',
    title: 'Executive Director',
    description: 'Visionary leader driving innovation and fostering a culture of collaboration and growth.',
    type: 'management',
    facebookLink: '#',
    twitterLink: '#',
    githubLink: '#',
    instagramLink: '#'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/image-56.png',
    name: 'Oliver Grayson',
    title: 'Chief Executive Officer',
    description: 'Dynamic CEO inspiring creativity, strategic thinking, and a unified team spirit.',
    type: 'management',
    facebookLink: '#',
    twitterLink: '#',
    githubLink: '#',
    instagramLink: '#'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/image-55.png',
    name: 'Liam Hawthorne',
    title: 'Head of Innovation',
    description: 'Innovative thinker passionate about transforming ideas into impactful solutions.',
    type: 'design team',
    facebookLink: '#',
    twitterLink: '#',
    githubLink: '#',
    instagramLink: '#'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/image-52.png',
    name: 'Lucas Bennett',
    title: 'UI/UX Architect',
    description: 'Expert UI/UX architect dedicated to crafting intuitive and memorable user experiences.',
    type: 'design team',
    facebookLink: '#',
    twitterLink: '#',
    githubLink: '#',
    instagramLink: '#'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/image-50.png',
    name: 'Mason Rivers',
    title: 'Senior Developer',
    description: 'Skilled developer committed to building robust, scalable, and efficient digital products.',
    type: 'Development team',
    facebookLink: '#',
    twitterLink: '#',
    githubLink: '#',
    instagramLink: '#'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/image-54.png',
    name: 'Noah Sinclair',
    title: 'A Chief Marketing Officer',
    description: 'Marketing strategist focused on elevating brand presence and driving successful campaigns.',
    type: 'Marketing team',
    facebookLink: '#',
    twitterLink: '#',
    githubLink: '#',
    instagramLink: '#'
  }
]

const AboutPage = async () => {
  const aboutData = await getSiteSection('about_page')
  const { hero, story, team } = aboutData

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Apargo Innovations",
    "description": hero?.description || "Learn about Apargo Innovations' story, mission, team, and commitments to engineering products.",
    "publisher": {
      "@type": "Organization",
      "name": "Apargo Innovations",
      "url": "https://www.apargoinnovations.com",
      "logo": "https://www.apargoinnovations.com/group-2.svg"
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": team?.members?.length || 0,
      "itemListElement": (team?.members || []).map((m: any, idx: number) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Person",
          "name": m.name,
          "jobTitle": m.title,
          "description": m.description,
          "image": m.image
        }
      }))
    }
  }

  return (
    <div className='flex min-h-screen flex-col'>
      <JsonLd data={aboutSchema} />
      <SiteNavbar />
      <main className='flex-1 pt-[4.5rem]'>
        <AboutUs18 
          stats={hero.stats} 
          badgeText={hero.badgeText}
          heading={hero.heading}
          description={hero.description}
        />
        <AboutUs11 
          avatars={avatars} 
          logos={logos} 
          badgeText={story.badgeText}
          heading={story.heading}
          description={story.description}
          imageUrl={story.imageUrl}
          contentHeading={story.contentHeading}
          paragraphs={story.paragraphs}
        />
        <BentoGrid />
        <Team 
          teamMember={team.members} 
          heading={team.heading}
          description={team.description}
        />
        <HowWeWork />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

export default AboutPage
