import { createClient } from '@/utils/supabase/server'
import * as Lucide from 'lucide-react'
import React from 'react'

// Default values for common and home page sections
export const DEFAULT_FALLBACKS: Record<string, any> = {
  navbar: {
    logoText: "Apargo",
    logoImageUrl: "/group-2.svg",
    demoBtnText: "Book a Demo",
    demoBtnLink: "/contact?intent=demo",
    consultBtnText: "Book a Free Consultation",
    consultBtnLink: "/contact?intent=consultation",
    standaloneLinks: [
      { title: "Home", href: "/" },
      { title: "Technologies", href: "/technologies" },
      { title: "Blog", href: "/blog" },
      { title: "Careers", href: "/careers" },
      { title: "Contact", href: "/contact" }
    ]
  },
  footer: {
    description: "Product engineering and AI services. Builders of AI Greentick.",
    copyright: "Apargo. All rights reserved.",
    logoImageUrl: "/group-2.svg",
    socialLinks: {
      globe: "https://apargo.com",
      mail: "hello@apargo.com",
      phone: "hello@apargo.com",
      mapPin: "/contact"
    },
    linkColumns: [
      {
        title: "Services",
        links: [
          { title: "Web Development", href: "/services/web-development" },
          { title: "Mobile App Development", href: "/services/mobile-app-development" },
          { title: "Custom Software", href: "/services/custom-software" },
          { title: "AI & Machine Learning", href: "/services/ai-machine-learning" },
          { title: "SaaS Product Development", href: "/services/saas-product-development" },
          { title: "Cloud & DevOps", href: "/services/cloud-devops" },
          { title: "UI/UX Design", href: "/services/ui-ux-design" },
          { title: "Digital Marketing & SEO", href: "/services/digital-marketing-seo" },
          { title: "IT Consulting", href: "/services/it-consulting" }
        ]
      },
      {
        title: "Products",
        links: [
          { title: "AI Greentick", href: "/products/ai-greentick" },
          { title: "All Products", href: "/products" }
        ]
      },
      {
        title: "Company",
        links: [
          { title: "About Us", href: "/about" },
          { title: "Industries", href: "/industries" },
          { title: "Technologies", href: "/technologies" },
          { title: "Blog", href: "/blog" },
          { title: "FAQ", href: "/faq" },
          { title: "Careers", href: "/careers" },
          { title: "Contact", href: "/contact" }
        ]
      }
    ],
    bottomLinks: [
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Terms of Service", href: "/terms" },
      { title: "Cookie Policy", href: "/cookie-policy" }
    ]
  },
  cta: {
    heading: "How We Work at Grow",
    description: "Our process turns complex marketing data into clear insights that drive growth.",
    buttonText: "Get Started - Free",
    buttonHref: "/contact",
    showServiceTags: true,
    services: ["Digital Marketing", "SEO", "Real Time Analytics"],
    secondaryButtonText: "",
    secondaryButtonHref: "/contact?intent=demo"
  },
  homepage_hero: {
    eyebrowText: "Apargo",
    eyebrowTag: "Product Engineering & AI Services",
    heading: "We Build Software That Growing Businesses Actually Use.",
    description: "From custom platforms and mobile apps to in-house SaaS products like AI Greentick — Apargo is the engineering partner founders call when they want to ship fast, scale safely and stay technical.",
    primaryBtnText: "Book a Free Consultation",
    emailPlaceholder: "hello@apargo.com"
  },
  homepage_core_features: {
    title: "We use what we build",
    description: "AI Greentick runs on the same stack and workflows we use for client projects. If it works at scale for real users, it can work for yours too.",
    features: [
      {
        title: "We use what we build",
        description: "AI Greentick runs on the same stack and workflows we use for client projects. If it works at scale for real users, it can work for yours too."
      },
      {
        title: "Senior-heavy team",
        description: "Most engineers on your project are mid-to-senior level. You're not paying senior rates to train juniors on your product."
      },
      {
        title: "Fixed quotes, no surprises",
        description: "We provide a fixed price and timeline after scoping. Any out-of-scope work is discussed and approved separately before development begins."
      },
      {
        title: "Full IP handover",
        description: "Your code, assets, and infrastructure belong to you from day one. Repositories can be transferred directly to your GitHub or GitLab."
      }
    ]
  },
  homepage_industries: {
    eyebrow: "Industries we serve",
    title: "Built For The Industries That Move Fast",
    description: "E-commerce, healthcare, education, real estate, FinTech and travel - different domains, same need for software that just works."
  },
  testimonials: {
    items: [
      {
        avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-11.png",
        fallback: "AS",
        name: "Arjun Sharma",
        handle: "@arjunbuilds · Founder, D2C Brand",
        platform: "linkedin",
        date: "Mar 10 2025",
        content: "Apargo built our entire e-commerce platform in 8 weeks — headless storefront, WhatsApp cart recovery, and a custom CMS. The engineers were senior-level and communicated daily. No surprises on scope or cost."
      },
      {
        avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-14.png",
        fallback: "PM",
        name: "Priya Mehta",
        handle: "@priyamehta · CTO, HealthStack",
        platform: "twitter",
        date: "Jan 22 2025",
        content: "We needed a HIPAA-aware telemedicine app in a tight timeline. Apargo delivered a polished iOS + Android app with video consultations and patient records. Their attention to compliance details was impressive."
      },
      {
        avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png",
        fallback: "RV",
        name: "Rahul Verma",
        handle: "@rahulv · Head of Product, FinServe",
        platform: "linkedin",
        date: "Nov 05 2024",
        content: "Custom KYC and onboarding flow with document AI — exactly what we needed. They scoped it precisely, delivered on time, and the codebase they handed over was clean. Our internal team could pick it up immediately."
      },
      {
        avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-18.png",
        fallback: "AI",
        name: "Ananya Iyer",
        handle: "@ananyaiyer · CEO, EduLeap",
        platform: "twitter",
        date: "Feb 14 2025",
        content: "Our LMS went from prototype to 10,000 active students in four months. Apargo's AI-assisted doubt-solving feature is a genuine differentiator. They think like product builders, not just coders."
      },
      {
        avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png",
        fallback: "VN",
        name: "Vikram Nair",
        handle: "@vikramnair · Co-founder, PropDesk",
        platform: "linkedin",
        date: "Apr 01 2025",
        content: "They built our real estate portal — property listings, broker CRM, and WhatsApp lead nurture — in a single sprint cycle. The fixed-quote model meant no billing surprises. Would absolutely work with them again."
      },
      {
        avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-21.png",
        fallback: "NS",
        name: "Neha Singh",
        handle: "@nehasingh · Head of Eng, CloudOps",
        platform: "twitter",
        date: "Dec 18 2024",
        content: "Apargo migrated our legacy monolith to microservices on AWS without a single hour of downtime. Their DevOps team knew what they were doing. Infrastructure-as-code, CI/CD, monitoring — all handed over cleanly."
      },
      {
        avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-9.png",
        fallback: "RK",
        name: "Rohan Kapoor",
        handle: "@rohankapoor · CTO, SaaSly",
        platform: "linkedin",
        date: "Oct 30 2024",
        content: "We hired Apargo to build our SaaS billing and subscription engine. They integrated Razorpay, built usage metering, and delivered a multi-tenant dashboard. Solid code, zero drama, full IP transfer."
      },
      {
        avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-24.png",
        fallback: "DK",
        name: "Divya Krishnan",
        handle: "@divyak · PM, TravelNest",
        platform: "twitter",
        date: "Jan 08 2025",
        content: "The booking engine and guest app they built for us handles peak traffic without breaking a sweat. Their UI/UX team nailed the hospitality feel without us having to explain it twice. Highly recommend."
      },
      {
        avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png",
        fallback: "SJ",
        name: "Siddharth Joshi",
        handle: "@sidjoshi · Founder, BrokerX",
        platform: "linkedin",
        date: "Mar 25 2025",
        content: "We had a rough prototype and a 10-week deadline. Apargo restructured the architecture, shipped the MVP, and stayed on for post-launch support. The product now has 500+ brokers onboarded. Incredible team."
      },
      {
        avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-27.png",
        fallback: "MP",
        name: "Meera Patel",
        handle: "@meerapatel · CEO, CareCircle",
        platform: "twitter",
        date: "Feb 03 2025",
        content: "Healthcare software is hard to get right — compliance, integrations, data sensitivity. Apargo understood all of it without hand-holding. Our patient management system is now live across three hospitals."
      },
      {
        avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png",
        fallback: "AK",
        name: "Aditya Kumar",
        handle: "@adityakumar · CTO, ShopBolt",
        platform: "linkedin",
        date: "Nov 20 2024",
        content: "We needed a high-performance storefront that could handle flash sales. Apargo built it on Next.js with edge caching — our page load dropped from 4.2s to under 800ms. Conversion rate jumped 34% that quarter."
      },
      {
        avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-30.png",
        fallback: "KR",
        name: "Kavya Reddy",
        handle: "@kavyareddy · Co-founder, LendSmart",
        platform: "twitter",
        date: "Jan 15 2025",
        content: "Document AI for lending workflows is niche — most agencies don't understand financial compliance. Apargo did. They scoped it properly, built it correctly, and our loan processing time dropped by 60%."
      }
    ]
  },
  about_page: {
    hero: {
      badgeText: "ABOUT APARGO",
      heading: "We Build and Ship What Others Only Plan",
      description: "Apargo started as a small group of engineers tired of seeing good ideas die in slide decks. Today we build production software for clients across the world and run our own SaaS products in parallel.",
      stats: [
        { value: 45, description: "Projects Shipped" },
        { value: 20, description: "Active Clients" },
        { value: 35, description: "Engineering Team" }
      ]
    },
    story: {
      badgeText: "OUR STORY",
      heading: "How Apargo started",
      description: "Apargo was built for founders who needed real execution — not endless presentations, delays and outsourced confusion.",
      imageUrl: "https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/about-us/image-45.png",
      contentHeading: "We build products the way ambitious teams actually need them built.",
      paragraphs: [
        "Apargo started with one belief: growing businesses don’t fail because of ideas — they fail because execution is slow.",
        "So we built a senior-heavy engineering team focused on shipping fast, solving real problems and working closely with founders.",
        "As our clients grew, we faced the same operational challenges they did — especially around WhatsApp at scale. That led us to build AI Greentick, now used by businesses across India and beyond.",
        "Today Apargo builds custom software for ambitious companies while also running and scaling our own SaaS products."
      ]
    },
    team: {
      heading: "Introducing Our Team, the Creators Behind the Magic ✨",
      description: "Driven by purpose, our team blends creativity, innovation, and expertise to shape remarkable outcomes.",
      members: [
        {
          image: "https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/image-57.png",
          name: "Ethan Caldwell",
          title: "Executive Director",
          description: "Visionary leader driving innovation and fostering a culture of collaboration and growth.",
          type: "management",
          facebookLink: "#",
          twitterLink: "#",
          githubLink: "#",
          instagramLink: "#"
        },
        {
          image: "https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/image-56.png",
          name: "Oliver Grayson",
          title: "Chief Executive Officer",
          description: "Dynamic CEO inspiring creativity, strategic thinking, and a unified team spirit.",
          type: "management",
          facebookLink: "#",
          twitterLink: "#",
          githubLink: "#",
          instagramLink: "#"
        },
        {
          image: "https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/image-55.png",
          name: "Liam Hawthorne",
          title: "Head of Innovation",
          description: "Innovative thinker passionate about transforming ideas into impactful solutions.",
          type: "design team",
          facebookLink: "#",
          twitterLink: "#",
          githubLink: "#",
          instagramLink: "#"
        },
        {
          image: "https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/image-52.png",
          name: "Lucas Bennett",
          title: "UI/UX Architect",
          description: "Expert UI/UX architect dedicated to crafting intuitive and memorable user experiences.",
          type: "design team",
          facebookLink: "#",
          twitterLink: "#",
          githubLink: "#",
          instagramLink: "#"
        },
        {
          image: "https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/image-50.png",
          name: "Mason Rivers",
          title: "Senior Developer",
          description: "Skilled developer committed to building robust, scalable, and efficient digital products.",
          type: "Development team",
          facebookLink: "#",
          twitterLink: "#",
          githubLink: "#",
          instagramLink: "#"
        },
        {
          image: "https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/image-54.png",
          name: "Noah Sinclair",
          title: "A Chief Marketing Officer",
          description: "Marketing strategist focused on elevating brand presence and driving successful campaigns.",
          type: "Marketing team",
          facebookLink: "#",
          twitterLink: "#",
          githubLink: "#",
          instagramLink: "#"
        }
      ]
    }
  },
  seo: {
    siteTitle: "Apargo",
    titleTemplate: "%s | Apargo",
    defaultDescription: "Apargo — Product engineering and AI services. Custom software, mobile apps, SaaS products, and the builders of AI Greentick.",
    keywords: "product engineering, AI services, custom software, mobile app development, SaaS, AI Greentick, Apargo",
    ogImage: "/og-image.png",
    ogType: "website",
    ogSiteName: "Apargo",
    twitterCard: "summary_large_image",
    twitterSite: "",
    twitterCreator: "",
    robots: "index, follow",
    canonicalBase: "https://apargo.com",
    googleVerification: "",
    bingVerification: "",
    additionalMetaTags: []
  },
  "service_web-development": {
    hero: {
      badgeText: "Services",
      subtitleText: "Web Development",
      title: "Web Apps That Load Fast, Scale Clean and Don't Break on Friday Evening.",
      description: "From marketing sites to multi-tenant SaaS dashboards, we build web products on a modern stack — and we operate one of our own (AI Greentick) in production every day.",
      primaryBtnText: "Start a Project",
      primaryBtnHref: "/contact?intent=consultation",
      secondaryBtnText: "See Web Projects",
      secondaryBtnHref: "/case-studies"
    },
    featuresList: [
      {
        iconName: "Globe",
        title: "Marketing and landing sites",
        description: "Static or Jamstack sites that hit 95+ Lighthouse scores. Editable through a headless CMS your marketing team can use without us."
      },
      {
        iconName: "LayoutDashboard",
        title: "Web applications and dashboards",
        description: "Authenticated apps with complex business logic. Role-based access, audit logs, multi-tenant data - built right the first time."
      },
      {
        iconName: "CreditCard",
        title: "SaaS platforms",
        description: "Subscription billing, usage metering, team workspaces. We've done this for ourselves with AI Greentick and for clients across industries."
      },
      {
        iconName: "Building2",
        title: "Internal tools and admin panels",
        description: "Custom CRMs, ops dashboards and back-office tools. Faster than Retool when you outgrow no-code, cheaper than Salesforce when you don't need its weight."
      },
      {
        iconName: "ShoppingCart",
        title: "E-commerce platforms",
        description: "Headless storefronts on Shopify, Medusa or custom. Designed to convert, structured for SEO, integrated with your CRM and WhatsApp tooling."
      }
    ],
    faqItems: [
      {
        question: "Could you please provide details on the various types of accommodations available?",
        answer: "We offer a diverse range of accommodations to suit every preference and budget. Our hotels provide luxury and standard rooms with full amenities, while our motels offer convenient and comfortable stays for travelers. For extended stays or family trips, we have fully furnished vacation rentals with kitchen facilities and living spaces."
      },
      {
        question: "What is the process for making a booking?",
        answer: "Booking with us is simple and straightforward. Select your desired accommodation type, check availability for your dates, and complete the reservation through our secure online system. You'll receive instant confirmation and detailed information about your stay via email."
      },
      {
        question: "Could you please provide details regarding your cancellation policy?",
        answer: "Our flexible cancellation policy allows free cancellation up to 48 hours before check-in for most bookings. Specific terms may vary by property and season. For detailed information, please review the cancellation terms provided during the booking process."
      },
      {
        question: "Is it possible to modify my booking after it has been confirmed?",
        answer: "Yes, you can modify your confirmed booking through our online booking management system or by contacting our customer service team. Changes to dates, room types, or guest numbers are subject to availability and may affect the pricing."
      },
      {
        question: "Are pets permitted in your accommodations?",
        answer: "Select properties are pet-friendly and welcome your furry companions. Additional pet fees and restrictions may apply. Please check the specific property details or contact us directly to confirm pet policies and arrangements."
      }
    ]
  },
  "service_mobile-app-development": {
    hero: {
      badgeText: "Services",
      subtitleText: "Mobile App Development",
      title: "Mobile Apps with Native Performance and Zero Deployment Drama.",
      description: "From native iOS & Android apps to cross-platform React Native codebases, we design and build mobile products that users love and stores approve.",
      primaryBtnText: "Start a Project",
      primaryBtnHref: "/contact?intent=consultation",
      secondaryBtnText: "See Mobile Projects",
      secondaryBtnHref: "/case-studies"
    },
    featuresList: [
      {
        iconName: "Smartphone",
        title: "iOS",
        description: "Native Swift or cross-platform — depending on what your users actually need. App Store submission, TestFlight setup, App Store optimization basics included."
      },
      {
        iconName: "Bot",
        title: "Android",
        description: "Native Kotlin or cross-platform, with full Play Store launch support — store listing, internal testing tracks, staged rollouts."
      },
      {
        iconName: "Boxes",
        title: "Cross-platform",
        description: "React Native for most product apps. Flutter when you need pixel-perfect custom UI. Same codebase, two stores, real native performance."
      }
    ],
    integrations: [
      {
        name: "Authentication",
        description: "Email, phone OTP, Google, Apple, biometric",
        iconName: "ShieldCheck"
      },
      {
        name: "Push Notifications",
        description: "Reliable delivery via Firebase or OneSignal",
        iconName: "BellRing"
      },
      {
        name: "Payments",
        description: "Razorpay, Stripe, PayU, in-app purchases",
        iconName: "CreditCard"
      },
      {
        name: "Offline-First Sync",
        description: "Robust local caching and background queueing",
        iconName: "WifiOff"
      },
      {
        name: "Maps & Geolocation",
        description: "Live tracking, geofencing and custom map layers",
        iconName: "MapPin"
      },
      {
        name: "Camera & Video Calling",
        description: "Camera, file upload, video calling",
        iconName: "Camera"
      },
      {
        name: "Deep Linking",
        description: "Deep linking and universal links",
        iconName: "Link"
      },
      {
        name: "Analytics",
        description: "Mixpanel, Amplitude, Firebase, Segment",
        iconName: "BarChart3"
      }
    ],
    features03: [
      {
        iconName: "PlaneTakeoff",
        title: "App Store & Play Store Launches",
        description: "Handled for you, end to end with full store listing and review compliance."
      },
      {
        iconName: "CodeXml",
        title: "Crash Reporting & Analytics",
        description: "Wired in before launch, not after, ensuring full visibility into app performance."
      },
      {
        iconName: "Layers",
        title: "Over-the-Air Updates",
        description: "Set up where it makes sense, so you can ship fixes without store review."
      },
      {
        iconName: "Smartphone",
        title: "Release Management Runbook",
        description: "Comprehensive documentation so your future team knows how to ship version 2 without us."
      }
    ],
    faqItems: [
      {
        question: "Do you build native or cross-platform mobile apps?",
        answer: "We build both! We use React Native and Flutter for most product apps where cross-platform efficiency saves you time and money. When your app requires pixel-perfect custom hardware integrations or intense native performance, we build fully native using Swift and Kotlin."
      },
      {
        question: "How do you ensure apps survive the App Store review process?",
        answer: "We handle App Store and Play Store submissions end to end. We ensure your app complies with all Apple and Google review guidelines regarding privacy, subscriptions, user generated content, and secure authentication."
      },
      {
        question: "What features do you typically integrate into mobile apps?",
        answer: "We frequently ship advanced mobile capabilities including biometric authentication, push notifications via Firebase/OneSignal, payment gateways (Razorpay, Stripe), offline-first caching, geolocation, geofencing, and deep linking."
      },
      {
        question: "What is included in the project handover?",
        answer: "You receive 100% full IP ownership from day one. We hand over the complete source code in your repository, signing certificates, CI/CD pipeline configurations, architecture documentation, and a release management runbook."
      },
      {
        question: "How long does a mobile app MVP typically take to build?",
        answer: "A production-ready mobile MVP typically takes between 10 to 16 weeks depending on scope and complexity. We provide a fixed price and fixed timeline quote after a brief scoping engagement."
      }
    ]
  },
  "service_custom-software": {
    hero: {
      badgeText: "Services",
      subtitleText: "Custom Software",
      title: "Software Designed Around Your Business, Not a Generic SaaS Template.",
      description: "When spreadsheets become too slow and off-the-shelf software doesn't fit your workflow, we build the bespoke systems you need to automate operations.",
      primaryBtnText: "Start a Project",
      primaryBtnHref: "/contact?intent=consultation",
      secondaryBtnText: "See Custom Projects",
      secondaryBtnHref: "/case-studies"
    },
    featuresList: [
      {
        iconName: "Building2",
        title: "ERPs and operations platforms",
        description: "Inventory, procurement, manufacturing, dispatch — all in one place, designed around how your team actually works. Integrations with Tally, Zoho, SAP and bespoke local systems."
      },
      {
        iconName: "Users",
        title: "CRMs and customer platforms",
        description: "Sales pipelines, support ticketing, customer health scores. Tightly integrated with WhatsApp, email and call systems — including AI Greentick."
      },
      {
        iconName: "ShoppingCart",
        title: "Marketplaces and multi-vendor platforms",
        description: "Two-sided platforms with onboarding, listings, search, payments, ratings and admin moderation. Built to scale before you hit traffic."
      },
      {
        iconName: "Calendar",
        title: "Booking and scheduling platforms",
        description: "For clinics, salons, fitness studios, consultants, tutors. Calendars, reminders, payments, no-shows, recurring sessions."
      },
      {
        iconName: "LayoutDashboard",
        title: "Internal admin and ops tools",
        description: "Back-office dashboards your team uses every day. Bulk actions, audit logs, exports, permissions — the boring features that make a tool feel professional."
      }
    ],
    integrations: [
      {
        name: "Discovery",
        description: "Workshops with your team and operators. We watch how things actually get done today.",
        iconName: "Search"
      },
      {
        name: "Spec",
        description: "Written document with screens, workflows, data model, integrations. You approve before any code is written.",
        iconName: "FileText"
      },
      {
        name: "Design",
        description: "Clickable Figma prototype. We test it with your team before shipping pixels.",
        iconName: "Figma"
      },
      {
        name: "Build",
        description: "Sprint-by-sprint, with weekly demos on real preview links.",
        iconName: "Code"
      },
      {
        name: "Pilot",
        description: "Rollout to one team or location, fix what surfaces, then expand.",
        iconName: "PlayCircle"
      },
      {
        name: "Handover",
        description: "Documentation, training videos, admin manuals.",
        iconName: "CheckCheck"
      }
    ],
    features03: [
      {
        iconName: "Database",
        title: "Owned data",
        description: "Your data lives in your database, not someone else's API."
      },
      {
        iconName: "Workflow",
        title: "Workflow fit",
        description: "Built around what you do, not what a SaaS vendor thought was generic."
      },
      {
        iconName: "CreditCard",
        title: "No per-seat tax",
        description: "Scale users without scaling subscription fees."
      },
      {
        iconName: "Milestone",
        title: "Integration freedom",
        description: "Connect anything to anything — not just what a vendor's marketplace allows."
      }
    ],
    faqItems: [
      {
        question: "When should a business choose custom software over SaaS?",
        answer: "If you've outgrown Excel, Google Sheets, and find yourself duct-taping three different SaaS subscriptions together to run basic workflows, it's time for custom software. Custom builds are ideal when your operational logic is unique and off-the-shelf tools slow your team down."
      },
      {
        question: "How long does a custom software build typically take?",
        answer: "A production-ready custom platform typically takes between 12 to 20 weeks depending on complexity. We break the build into predictable, sprint-by-sprint milestones with weekly demos on live preview links."
      },
      {
        question: "Who owns the intellectual property and data?",
        answer: "You receive 100% full IP ownership and data sovereignty from day one. Your data lives in your own secure database, not a vendor's proprietary API."
      },
      {
        question: "Will you integrate the custom software with our existing tools like Tally or SAP?",
        answer: "Absolutely. We routinely build robust, secure integrations with legacy accounting software like Tally, ERPs like SAP and Zoho, payment gateways, and custom local systems."
      },
      {
        question: "How do you handle future updates and maintenance?",
        answer: "We provide full handover documentation, admin manuals, and training videos so your team can operate the platform independently. We also offer dedicated ongoing support and maintenance retainers for continuous feature expansion."
      }
    ]
  },
  "service_ai-machine-learning": {
    hero: {
      badgeText: "Services",
      subtitleText: "AI & Machine Learning",
      title: "Practical AI — The Kind That Earns Its Monthly Bill.",
      description: "We use LLMs and ML where they replace real hours, real headcount or real customer wait time. We skip them where they don't. No AI theatre — just systems that move metrics.",
      primaryBtnText: "Talk to an AI Engineer",
      primaryBtnHref: "/contact?intent=consultation",
      secondaryBtnText: "See AI Projects",
      secondaryBtnHref: "/case-studies"
    },
    featuresList: [
      {
        iconName: "Bot",
        title: "AI chatbots and conversational AI",
        description: "Customer support, sales qualification, internal helpdesks. Built on RAG over your own docs, integrated with WhatsApp, web chat, Slack, Teams. Same architecture powers AI Greentick's chatbot builder."
      },
      {
        iconName: "FileSearch",
        title: "Document AI",
        description: "Pull structured data out of PDFs, invoices, contracts, scanned forms. Combine OCR, layout-aware parsing and LLMs to get accuracy that beats off-the-shelf APIs."
      },
      {
        iconName: "Sparkles",
        title: "Recommendation and personalisation",
        description: "Product recommendations, content feeds, search ranking — for e-commerce, EdTech, media. Mix of classical ML and embedding-based retrieval."
      },
      {
        iconName: "Workflow",
        title: "Workflow automation with AI",
        description: "Multi-step agent workflows — handle email triage, ticket routing, content moderation, lead scoring. Built on LangChain, LlamaIndex or custom orchestration."
      },
      {
        iconName: "Puzzle",
        title: "AI integration into existing products",
        description: "You have a working product, you want to add AI features — summarisation, generation, transcription, smart search. We slot in without rewriting your stack."
      }
    ],
    integrations: [
      {
        name: "Start with measurement",
        description: "What metric should move? How do we measure it before and after?",
        iconName: "BarChart"
      },
      {
        name: "Build the cheap baseline first",
        description: "Sometimes a regex or rule is better than a model. We test that.",
        iconName: "TerminalSquare"
      },
      {
        name: "Monitor cost per request",
        description: "AI bills can spiral. We log, alert and optimise.",
        iconName: "DollarSign"
      },
      {
        name: "Human-in-the-loop where it matters",
        description: "Critical decisions stay reviewable, not just automated.",
        iconName: "UserCheck"
      },
      {
        name: "Data privacy by design",
        description: "On-prem or private deployments where compliance demands it.",
        iconName: "ShieldCheck"
      }
    ],
    features03: [
      {
        iconName: "ShoppingBag",
        title: "E-commerce",
        description: "Product Q&A bots, review summarisation, smart search"
      },
      {
        iconName: "HeartPulse",
        title: "Healthcare",
        description: "Patient intake automation, clinical document summarisation"
      },
      {
        iconName: "GraduationCap",
        title: "Education",
        description: "AI tutors, doubt-solving bots, auto-grading drafts"
      },
      {
        iconName: "WalletCards",
        title: "FinTech",
        description: "Document verification, fraud signals, customer onboarding"
      },
      {
        iconName: "BriefcaseBusiness",
        title: "Service businesses",
        description: "Quote generation, FAQ deflection, lead qualification"
      }
    ],
    faqItems: [
      {
        question: "How do you ensure AI chatbots don't hallucinate or give wrong answers?",
        answer: "We build our conversational AI using advanced Retrieval-Augmented Generation (RAG) architectures with strict guardrails, ensuring the model only answers based on your verified documentation."
      },
      {
        question: "Can we host open-source LLMs privately on our own servers?",
        answer: "Absolutely. We routinely deploy fine-tuned open-source models like Llama 3, Mistral, and Qwen using vLLM or Ollama on private cloud infrastructure to guarantee 100% data privacy."
      },
      {
        question: "How do you prevent AI API costs from spiraling out of control?",
        answer: "We actively monitor cost per request, implement semantic caching, and use hybrid routing—directing simpler queries to faster, cheaper models while reserving large frontier models for complex reasoning tasks."
      },
      {
        question: "What is the difference between Document AI and standard OCR?",
        answer: "Standard OCR simply extracts raw text without context. Our Document AI combines OCR with layout-aware parsing and vision LLMs to understand complex tables, multi-column invoices, and unstructured contracts with near-perfect accuracy."
      },
      {
        question: "How long does an initial AI proof-of-concept (PoC) take?",
        answer: "A functional, measurable PoC typically takes 3 to 6 weeks. We start by establishing clear baseline metrics before scaling into a full production deployment."
      }
    ]
  },
  "service_saas-product-development": {
    hero: {
      badgeText: "Services",
      subtitleText: "SaaS Product Development",
      title: "Build SaaS Products That Scale, Billing Included.",
      description: "From multi-tenant databases and Stripe billing to customer workspace roles, we build complete SaaS platforms so you can focus on PMF.",
      primaryBtnText: "Start a Project",
      primaryBtnHref: "/contact?intent=consultation",
      secondaryBtnText: "See SaaS Projects",
      secondaryBtnHref: "/case-studies"
    },
    featuresList: [
      {
        iconName: "Lightbulb",
        title: "Idea to MVP",
        description: "From a written idea or a Figma mockup to a working MVP in 8 to 12 weeks. Just enough features to put it in front of paying users."
      },
      {
        iconName: "TrendingUp",
        title: "MVP to product-market fit",
        description: "Add what users actually ask for. Cut what they ignore. Build the metrics dashboard you need to tell which is which."
      },
      {
        iconName: "Rocket",
        title: "PMF to scale",
        description: "Scale the architecture, the team and the unit economics. Handle 10x users without 10x infra bills."
      },
      {
        iconName: "RefreshCw",
        title: "Pivot or rebuild",
        description: "Sometimes the right answer is a rewrite. We've helped clients migrate off no-code, off legacy stacks, off platforms that were eating their margins."
      }
    ],
    integrations: [
      {
        name: "Multi-tenant data isolation",
        description: "Schema-per-tenant, row-level security, or hybrid.",
        iconName: "Database"
      },
      {
        name: "Subscription billing",
        description: "Stripe, Paddle, Razorpay, with self-serve upgrades and downgrades.",
        iconName: "CreditCard"
      },
      {
        name: "Team workspaces and roles",
        description: "Owner, admin, member, guest, with audit logs.",
        iconName: "Users"
      },
      {
        name: "Usage metering",
        description: "Track and bill on rows, calls, messages or whatever your unit is.",
        iconName: "BarChart"
      },
      {
        name: "Onboarding flows",
        description: "Welcome wizard, sample data, empty-state nudges.",
        iconName: "Milestone"
      },
      {
        name: "Customer support tooling",
        description: "Integrated chat, knowledge base, in-app announcements.",
        iconName: "LifeBuoy"
      },
      {
        name: "Analytics and observability",
        description: "Product analytics, error tracking, performance monitoring.",
        iconName: "Activity"
      }
    ],
    features03: [
      {
        iconName: "Wrench",
        title: "Build-only",
        description: "Fixed scope, you take over operations after launch."
      },
      {
        iconName: "Cog",
        title: "Build and operate",
        description: "We build, then run it in production for you for 6 to 12 months while you find an in-house team."
      },
      {
        iconName: "Handshake",
        title: "Co-build with equity or revenue share",
        description: "Selectively, for projects we believe in."
      }
    ],
    faqItems: [
      {
        question: "What is your approach to multi-tenant data architecture?",
        answer: "We choose between schema-per-tenant, row-level security (RLS) in PostgreSQL, or hybrid models based on your compliance needs and scale, ensuring complete data isolation without compromising query performance."
      },
      {
        question: "How do you handle complex usage-based or tiered billing?",
        answer: "We integrate robust billing engines like Stripe Billing, Paddle, or Razorpay with custom webhook listeners to meter usage (API calls, active seats, storage) and automatically manage upgrades, prorations, and failed payments."
      },
      {
        question: "Can you help us migrate our SaaS off a no-code platform or legacy stack?",
        answer: "Yes. We specialize in rewriting MVPs that have outgrown bubble.io or legacy monoliths, migrating your database and business logic to a high-performance Next.js and Node/Go stack with zero data loss."
      },
      {
        question: "What is included in your 'Build and operate' engagement model?",
        answer: "In addition to building the product, we handle 24/7 cloud infrastructure monitoring, CI/CD pipeline management, bug fixes, and feature iterations for 6 to 12 months while helping you interview and onboard your permanent in-house engineering team."
      },
      {
        question: "How do you ensure our SaaS is secure and compliant?",
        answer: "We implement strict role-based access control (RBAC), immutable audit logs, secure JWT/OAuth authentication, and automated vulnerability scanning, preparing your platform for SOC2 and GDPR compliance from day one."
      }
    ]
  },
  "service_cloud-devops": {
    hero: {
      badgeText: "Services",
      subtitleText: "Cloud & DevOps",
      title: "Infrastructure That Scales Smoothly, Bills That Don't Hurt.",
      description: "We design, deploy, and maintain secure, highly available cloud setups using Terraform, Kubernetes, and automated CI/CD pipelines.",
      primaryBtnText: "Start a Project",
      primaryBtnHref: "/contact?intent=consultation",
      secondaryBtnText: "See DevOps Projects",
      secondaryBtnHref: "/case-studies"
    },
    featuresList: [
      {
        iconName: "CloudCog",
        title: "Cloud migration",
        description: "Move from shared hosting, on-prem servers or legacy clouds to AWS, GCP or Azure. Audit first, plan second, migrate in phases."
      },
      {
        iconName: "FileCode2",
        title: "Infrastructure-as-code",
        description: "Terraform, Pulumi or Cloud-specific tooling — your infrastructure defined in code, version-controlled, reviewable. No more clicking through dashboards."
      },
      {
        iconName: "GitBranch",
        title: "CI/CD setup",
        description: "GitHub Actions, GitLab CI, CircleCI. Build, test, deploy on every commit. Branch previews, staging environments, one-click rollbacks."
      },
      {
        iconName: "Activity",
        title: "Monitoring and observability",
        description: "Logs, metrics, traces in one place. Datadog, Grafana, New Relic, Sentry — whatever fits your budget. Alerts that page humans only when something actually matters."
      },
      {
        iconName: "ShieldCheck",
        title: "Managed hosting and on-call",
        description: "Apargo runs your production environment on a retainer. Patching, upgrades, scaling, on-call coverage in your time zone."
      }
    ],
    integrations: [
      {
        name: "Idle Resources",
        description: "Identify and terminate abandoned staging environments, unattached elastic IPs, and orphaned snapshots.",
        iconName: "Server"
      },
      {
        name: "Suboptimal Storage Tiers",
        description: "Automate S3 lifecycle policies to transition older logs and backups to Glacier or Infrequent Access.",
        iconName: "Database"
      },
      {
        name: "Unattached Volumes",
        description: "Clean up unattached EBS volumes that continue to bill monthly long after EC2 instances are terminated.",
        iconName: "TerminalSquare"
      },
      {
        name: "Architectural Bottlenecks",
        description: "Refactor inefficient database queries and implement Redis caching to downsize expensive RDS instances.",
        iconName: "BarChart"
      },
      {
        name: "Over-provisioned Instances",
        description: "Analyze CPU and memory utilization metrics to right-size oversized compute clusters.",
        iconName: "DollarSign"
      }
    ],
    faqItems: [
      {
        question: "What is involved in your free 30-minute cloud audit?",
        answer: "We examine your AWS, GCP, or Azure architecture and billing statements to identify idle resources, unattached volumes, suboptimal storage tiers, and architectural bottlenecks, providing a clear punch list of immediate cost savings."
      },
      {
        question: "Why should we use Infrastructure-as-Code (IaC) instead of cloud consoles?",
        answer: "IaC using Terraform or Pulumi makes your infrastructure reproducible, version-controlled, and self-documenting. It eliminates human error from manual dashboard clicking and allows disaster recovery in minutes."
      },
      {
        question: "How do your managed hosting and on-call retainers work?",
        answer: "We act as your dedicated Site Reliability Engineering (SRE) team. We handle 24/7 monitoring, automated patching, scaling events, and incident response within your SLA, ensuring maximum uptime while you sleep."
      },
      {
        question: "Can you set up zero-downtime CI/CD pipelines for our existing monolith?",
        answer: "Yes. We implement robust GitHub Actions or GitLab CI pipelines with automated testing, containerization, staging environments, and blue-green deployments to ensure seamless rollouts and one-click rollbacks."
      },
      {
        question: "Do you work with alternative cloud providers like Hetzner or DigitalOcean?",
        answer: "Absolutely. For workloads where hyperscaler fees (AWS/GCP) eat into margins, we routinely architect highly available Kubernetes clusters on Hetzner or DigitalOcean, cutting infrastructure bills by up to 70%."
      }
    ]
  },
  "service_ui-ux-design": {
    hero: {
      badgeText: "Services",
      subtitleText: "UI/UX Design",
      title: "Interfaces That Feel Intuitive, Systems That Engineers Love to Build.",
      description: "We design beautiful, cohesive product interfaces and production-ready Figma design systems that bridge the gap between design and code.",
      primaryBtnText: "Start a Project",
      primaryBtnHref: "/contact?intent=consultation",
      secondaryBtnText: "See UI/UX Projects",
      secondaryBtnHref: "/case-studies"
    },
    featuresList: [
      {
        iconName: "Palette",
        title: "Product design",
        description: "End-to-end design for SaaS dashboards, mobile apps and web platforms. Wireframes, prototypes, final UI, design system."
      },
      {
        iconName: "Smartphone",
        title: "Mobile app design",
        description: "iOS and Android UX, native patterns, motion, dark mode, accessibility. Built around the platform conventions your users already know."
      },
      {
        iconName: "Boxes",
        title: "Design systems",
        description: "Reusable component libraries — Figma + Storybook + code. Tokens, components, patterns, documentation. Your designers and engineers stay in sync."
      },
      {
        iconName: "FileSearch",
        title: "UX audits",
        description: "We use your product like a real user, then deliver a written punch list of friction points, prioritised by impact and effort. Pairs well with our development services or stands alone."
      },
      {
        iconName: "Sparkles",
        title: "Branding and visual identity",
        description: "Logo, palette, type system, brand guidelines. We don't do brand-only projects in isolation — but if you need branding alongside a product build, we handle it."
      }
    ],
    integrations: [
      {
        name: "Designers sit in Slack",
        description: "Designers sit in the engineering Slack. No silos.",
        iconName: "Users"
      },
      {
        name: "Feasibility reviews",
        description: "Components reviewed for feasibility. Before pixels go to dev, the engineer says yes or proposes a cheaper alternative.",
        iconName: "TerminalSquare"
      },
      {
        name: "Design QA before launch",
        description: "Designer reviews the live build, files small fixes, signs off.",
        iconName: "ShieldCheck"
      }
    ],
    faqItems: [
      {
        question: "How do you ensure your designs are actually buildable by engineers?",
        answer: "Our designers work closely with our engineering team from day one. Every component is reviewed for technical feasibility, performance impact, and implementation cost before we hand off the final Figma files."
      },
      {
        question: "What is included in a design system handoff?",
        answer: "We deliver a production-ready Figma component library complete with design tokens (colors, typography, spacing), interactive variants, and auto-layout guidelines, paired with Storybook documentation for seamless developer handoff."
      },
      {
        question: "Can you help us redesign an existing legacy enterprise application?",
        answer: "Yes. We specialize in enterprise redesigns of complex legacy workflows, simplifying enterprise interfaces without disrupting operational habits."
      },
      {
        question: "Do you design for both iOS and Android native platforms?",
        answer: "Absolutely. We respect platform-specific conventions E.g. Cupertino navigation for iOS and Material Design patterns for Android, ensuring your app feels perfectly native to each user."
      },
      {
        question: "How long does a typical UX audit take?",
        answer: "A comprehensive UX audit takes 1 to 2 weeks. We deliver a detailed, prioritized punch list of friction points and actionable UI improvements that your team can implement immediately."
      }
    ]
  },
  "service_digital-marketing-seo": {
    hero: {
      badgeText: "Services",
      subtitleText: "Digital Marketing & SEO",
      title: "Organic Traffic That Converts, Analytics That Prove It.",
      description: "Technical SEO, content pipelines, paid ads campaigns, and first-party event tracking built to make your product visible and profitable.",
      primaryBtnText: "Start a Project",
      primaryBtnHref: "/contact?intent=consultation",
      secondaryBtnText: "See Marketing Work",
      secondaryBtnHref: "/case-studies"
    },
    featuresList: [
      {
        iconName: "SearchCheck",
        title: "Technical SEO",
        description: "Crawl audits, Core Web Vitals, structured data, internal linking, programmatic SEO setup. The boring side of SEO that actually moves rankings."
      },
      {
        iconName: "FileText",
        title: "Content engineering",
        description: "Topic clusters, briefs, drafts and publishing pipelines. We use AI in the draft phase and humans in the review phase — same workflow we use for AI Greentick's blog."
      },
      {
        iconName: "Bot",
        title: "AI search (GEO and AEO) optimisation",
        description: "Get cited by ChatGPT, Perplexity, Gemini and AI Overviews. Schema, citable formats, source authority — the new SEO."
      },
      {
        iconName: "TrendingUp",
        title: "Paid acquisition setup",
        description: "Google Ads, Meta Ads, LinkedIn Ads — campaign architecture, conversion tracking, server-side events. We set it up clean so your in-house or agency team can run it."
      },
      {
        iconName: "BarChart",
        title: "Analytics and attribution",
        description: "GA4, server-side tracking, product analytics (Mixpanel, Amplitude, PostHog), CRM and ad-platform integration. So your team can finally answer 'where did that revenue come from'."
      }
    ],
    integrations: [
      {
        name: "Founders who just launched",
        description: "Founders who just launched and need traffic.",
        iconName: "Rocket"
      },
      {
        name: "SaaS teams stuck on a plateau",
        description: "SaaS teams stuck on a flat traffic plateau.",
        iconName: "BarChart"
      },
      {
        name: "D2C brands leaking ad spend",
        description: "D2C brands leaking ad spend through bad tracking.",
        iconName: "DollarSign"
      },
      {
        name: "Service businesses wanting local & AI rank",
        description: "Service businesses wanting to rank locally and on AI search.",
        iconName: "SearchCheck"
      }
    ],
    faqItems: [
      {
        question: "What is AI Search Optimization (GEO/AEO) and why does it matter?",
        answer: "Generative Engine Optimization (GEO) focuses on structuring your content, schema, and authority signals so that LLMs like ChatGPT, Perplexity, and Google AI Overviews cite your brand as the primary answer to buyer queries."
      },
      {
        question: "How do you approach Technical SEO for modern JavaScript frameworks like Next.js?",
        answer: "We optimize Core Web Vitals, implement dynamic XML sitemaps, configure proper canonical tags, and leverage Next.js server-side rendering (SSR) to ensure Googlebot crawls and indexes your dynamic pages flawlessly."
      },
      {
        question: "What is included in your free marketing audit?",
        answer: "We examine your organic keyword rankings, backlink profile, paid ad account structure, and analytics tracking setup to deliver an actionable, prioritized punch list of immediate growth opportunities."
      },
      {
        question: "How do you ensure accurate conversion tracking for paid ads?",
        answer: "We implement robust server-side tagging (Google Tag Manager Server-Side), Facebook Conversions API (CAPI), and first-party cookie tracking to prevent data loss from ad blockers and iOS privacy restrictions."
      },
      {
        question: "How long does it take to see tangible results from SEO?",
        answer: "While technical fixes and indexing improvements show up within weeks, compounding organic traffic growth from content engineering typically takes 3 to 6 months."
      }
    ]
  },
  "service_it-consulting": {
    hero: {
      badgeText: "Services",
      subtitleText: "IT Consulting",
      title: "Senior Tech Leadership and Embedded Teams, on Your Schedule.",
      description: "Fractional CTO advisory, technical due diligence, architecture reviews, and high-performance engineering pods that plug directly into your workflow.",
      primaryBtnText: "Talk to a Consultant",
      primaryBtnHref: "/contact?intent=consultation",
      secondaryBtnText: "See Client Work",
      secondaryBtnHref: "/case-studies"
    },
    featuresList: [
      {
        iconName: "Briefcase",
        title: "CTO-on-call",
        description: "Fractional CTO support for founders without a technical co-founder, or for early-stage teams that need senior judgement on hiring, architecture, vendor selection and roadmap."
      },
      {
        iconName: "FileSearch",
        title: "Architecture reviews",
        description: "Two to four weeks of deep review — codebase, infrastructure, team workflow — delivered as a written report with prioritised recommendations."
      },
      {
        iconName: "SearchCheck",
        title: "Technical due diligence",
        description: "For investors, acquirers, or founders evaluating a build vs buy decision. Honest, written, with no incentive to oversell or undersell."
      },
      {
        iconName: "ShieldCheck",
        title: "Cloud and security audits",
        description: "Where the money's leaking. Where the security holes are. What needs urgent attention vs what can wait a quarter."
      },
      {
        iconName: "UserCheck",
        title: "Hiring help",
        description: "Job descriptions, interview rubrics, take-home review, technical interview panels — for engineering and AI roles."
      },
      {
        iconName: "Users",
        title: "Plug-in engineering pods",
        description: "We embed senior engineers, designers or product managers into your team for a defined period. They work in your Slack, attend your stand-ups, follow your processes."
      }
    ],
    integrations: [
      {
        name: "Minimum engagement",
        description: "1 month part-time / 3 months full-time.",
        iconName: "Calendar"
      },
      {
        name: "Notice period",
        description: "30 days either side.",
        iconName: "Clock"
      },
      {
        name: "IP and confidentiality",
        description: "Our standard NDA covers it. Yours works too if you prefer.",
        iconName: "ShieldCheck"
      }
    ],
    faqItems: [
      {
        question: "How does your CTO-on-call / Fractional CTO service work?",
        answer: "We provide a highly experienced former CTO or VP of Engineering on a flexible retainer (E.g. 5 to 15 hours per week) to lead your architecture decisions, mentor your team, and represent your tech stack to investors."
      },
      {
        question: "What makes your staff augmentation different from hiring freelancers?",
        answer: "Our embedded engineers are full-time, vetted Apargo team members who bring established engineering rigor, senior mentorship, and full backup support from our entire agency."
      },
      {
        question: "Can we hire your embedded engineers permanently if we like them?",
        answer: "Yes. We offer a transparent contract-to-hire option allowing you to transition our embedded engineers to your permanent in-house payroll after an agreed period."
      },
      {
        question: "How quickly can you onboard an engineering pod into our Slack?",
        answer: "Depending on your required tech stack, we can typically onboard a dedicated senior engineering pod into your Slack and stand-ups within 1 to 2 weeks."
      },
      {
        question: "Are your standard NDAs and IP transfer agreements fully secure?",
        answer: "Absolutely. All intellectual property, codebases, and architectural documentation created during the engagement are 100% owned by your company from day one."
      }
    ]
  },
  "industry_ecommerce": {
    eyebrow: "E-COMMERCE & D2C",
    h1: "When Shopify alone doesn't cut it anymore.",
    subHeadline: "D2C brands hit a wall: theme limits, per-app fees, slow checkouts, no real customer data. Apargo builds the layer that sits on top of (or replaces) the platform — and ties everything to WhatsApp via AI Greentick.",
    sectionTitle: "What we build for D2C teams",
    buildItems: [
      {
        title: "Custom Shopify themes",
        description: "Performance-first, conversion-tuned, design-system-driven themes that load fast and sell harder."
      },
      {
        title: "Headless storefronts",
        description: "Next.js + Shopify, Medusa, or fully custom — decoupled architecture for maximum speed and flexibility."
      },
      {
        title: "D2C mobile apps",
        description: "React Native apps with push notifications, deep links, loyalty programmes and seamless checkout."
      },
      {
        title: "WhatsApp commerce flows",
        description: "Catalog, cart and checkout in WhatsApp via AI Greentick — turning conversations into conversions."
      },
      {
        title: "Customer portals",
        description: "Order tracking, returns, subscription management — everything your customers need in one place."
      },
      {
        title: "Internal ops dashboards",
        description: "Inventory, dispatch, COD reconciliation — the back-office tools your ops team actually wants."
      }
    ],
    extraSections: [
      {
        title: "Integrations we do often",
        items: [
          "Shopify, WooCommerce, Magento, Shiprocket, Delhivery",
          "Razorpay, Stripe, PayU, Cashfree",
          "Klaviyo, Mailchimp, AI Greentick (WhatsApp)",
          "Tally, Zoho Books, QuickBooks"
        ]
      }
    ],
    typicalProjects: [
      "Migration from Shopify themes to a headless Next.js storefront",
      "Rebuild of a D2C app that hit React Native version-upgrade hell",
      "Custom warehouse and dispatch dashboard for a multi-warehouse brand",
      "WhatsApp abandoned-cart recovery flow with 18 percent conversion"
    ],
    ctaHeading: "Outgrew your e-commerce platform?",
    ctaButtonText: "Book an E-com Strategy Call"
  },
  "industry_education-edtech": {
    eyebrow: "EDUCATION & EDTECH",
    h1: "Software for the people who teach — and the ones who learn.",
    subHeadline: "Coaching centres, schools, EdTech startups and corporate training providers all run on software now. We build that software — and the AI layer on top that makes it actually useful.",
    sectionTitle: "What we build for education",
    buildItems: [
      {
        title: "Learning Management Systems (LMS)",
        description: "Courses, batches, assessments, progress tracking — built for how Indian coaching and ed institutions actually work."
      },
      {
        title: "Student and parent mobile apps",
        description: "Attendance, homework, fee payments, reports — a single app that parents and students rely on daily."
      },
      {
        title: "Online classroom tools",
        description: "Live classes, recordings, interactive whiteboards — the virtual classroom experience done right."
      },
      {
        title: "AI tutors and doubt-solving bots",
        description: "RAG over your own content, integrated with WhatsApp — 24/7 doubt resolution without human bottlenecks."
      },
      {
        title: "Coaching centre management",
        description: "Admissions, fee management, batch scheduling — the admin layer that coaching centres outgrow spreadsheets for."
      },
      {
        title: "School ERP",
        description: "Full school operations from admissions to alumni — a system that grows with your institution."
      }
    ],
    extraSections: [
      {
        title: "AI in education",
        items: [
          "Auto-grading drafts of essays and assignments",
          "Personalised practice paths based on student weaknesses",
          "Doubt-solving on WhatsApp 24/7 via AI Greentick + RAG",
          "Counsellor copilots for admissions teams"
        ]
      }
    ],
    typicalProjects: [
      "LMS for a coaching centre going from offline to hybrid",
      "School management software for a 5-school group",
      "AI tutor app for JEE/NEET aspirants",
      "WhatsApp-based fee reminder and report card delivery"
    ],
    ctaHeading: "Modernising your institution or EdTech startup?",
    ctaButtonText: "Book an EdTech Strategy Call"
  },
  "industry_fintech": {
    eyebrow: "FINTECH & BFSI",
    h1: "FinTech software where security is the default, not an afterthought.",
    subHeadline: "Lending, payments, wealth, insurance, KYC — we build software for FinTech and BFSI teams that need to ship fast and stay audit-ready.",
    sectionTitle: "What we build for FinTech",
    buildItems: [
      {
        title: "KYC and onboarding",
        description: "Video KYC, document upload, OCR, liveness, eSign — the entire onboarding funnel, compliant by design."
      },
      {
        title: "Lending platforms",
        description: "Application, underwriting, disbursal, collection — the full lending lifecycle in one system."
      },
      {
        title: "Wealth and broking dashboards",
        description: "Portfolio views, transaction history, reporting — dashboards that traders and advisors trust."
      },
      {
        title: "Document AI",
        description: "Bank statements, ITRs, agreements, GST returns — extract structure from any financial document."
      },
      {
        title: "Embedded finance",
        description: "Lending or payments inside another product — the invisible financial layer your users never leave for."
      },
      {
        title: "Internal ops tools",
        description: "Credit underwriting, collections, fraud review — the back-office systems that keep risk in check."
      }
    ],
    extraSections: [
      {
        title: "Security and compliance",
        items: [
          "ISO 27001 aligned development practices",
          "PCI-DSS aware payment integrations",
          "Encryption at rest and in transit",
          "Audit logging on every sensitive action",
          "Penetration testing before launch"
        ]
      }
    ],
    typicalProjects: [
      "Video KYC plus document AI for an NBFC's loan onboarding",
      "Salaried lending platform with bank statement parsing and credit scoring",
      "Wealth dashboard for a broker network",
      "Embedded lending API for a B2B SaaS"
    ],
    ctaHeading: "Shipping FinTech, need senior builders?",
    ctaButtonText: "Book a FinTech Call"
  },
  "industry_healthcare": {
    eyebrow: "HEALTHCARE",
    h1: "Healthcare software that respects compliance and the clinician's time.",
    subHeadline: "From single-clinic booking apps to multi-hospital management platforms, we build software for healthcare teams that need to move quickly without breaking compliance.",
    sectionTitle: "What we build for healthcare",
    buildItems: [
      {
        title: "Telemedicine apps",
        description: "Video consultations, e-prescriptions, e-pharmacy integration — the full remote care stack."
      },
      {
        title: "Clinic and hospital management",
        description: "OPD, IPD, billing, lab and pharmacy modules — unified under one system that actually works."
      },
      {
        title: "Patient portals",
        description: "Records, reports, appointments, payments — giving patients control without burdening your staff."
      },
      {
        title: "EMR and EHR systems",
        description: "Custom electronic records designed around your specialty, not forced into a generic template."
      },
      {
        title: "Document AI for healthcare",
        description: "Parse prescriptions, lab reports, insurance documents — turning unstructured data into structured records."
      },
      {
        title: "WhatsApp-first patient communication",
        description: "Reminders, follow-ups, intake forms via AI Greentick — meeting patients where they already are."
      }
    ],
    extraSections: [
      {
        title: "Compliance and privacy",
        items: [
          "HIPAA-aware architecture for US-facing clients",
          "DPDPA-aware (India's data law) by default",
          "Audit logging and consent management built in",
          "Role-based access down to the record level",
          "Encrypted at rest and in transit"
        ]
      }
    ],
    typicalProjects: [
      "Telemedicine platform with video, e-prescriptions and pharmacy integration",
      "Clinic chain management software replacing four legacy systems",
      "AI-powered prescription parser turning handwritten Rx into structured data",
      "WhatsApp-based patient intake replacing paper forms"
    ],
    ctaHeading: "Building software for a healthcare team?",
    ctaButtonText: "Talk to Our Healthcare Lead"
  },
  "industry_real-estate": {
    eyebrow: "REAL ESTATE",
    h1: "Real estate runs on follow-ups. We build the software that does them for you.",
    subHeadline: "Property portals, broker CRMs, virtual tours, lead nurture on WhatsApp — Apargo builds the tech stack real estate businesses need to convert without dropping leads.",
    sectionTitle: "What we build for real estate",
    buildItems: [
      {
        title: "Property portals",
        description: "Search, filters, map-based, mobile-first — portals that help buyers find what they want fast."
      },
      {
        title: "Broker CRMs",
        description: "Lead pipelines, site visit scheduling, commission tracking — the CRM built for how brokers actually sell."
      },
      {
        title: "Developer sales platforms",
        description: "Inventory management, EOI, booking, payment plans — everything a developer needs to sell projects."
      },
      {
        title: "Virtual tour and AR experiences",
        description: "360-degree walkthroughs and AR visualisation for under-construction properties."
      },
      {
        title: "WhatsApp lead nurture",
        description: "Drip campaigns, instant FAQ replies via AI Greentick — nurture leads on the channel they prefer."
      },
      {
        title: "Channel partner portals",
        description: "Exclusive inventory, commission tracking, communication — keeping your channel partners in the loop."
      }
    ],
    extraSections: [],
    typicalProjects: [
      "Property portal MVP for a regional broker network",
      "Sales and inventory platform for a developer with 5 active projects",
      "WhatsApp-first lead capture and qualification flow",
      "Virtual tour platform with 360-degree walkthrough"
    ],
    ctaHeading: "Real estate tech stack stuck in 2015?",
    ctaButtonText: "Talk to Our PropTech Team"
  },
  "industry_travel-hospitality": {
    eyebrow: "TRAVEL & HOSPITALITY",
    h1: "Software for the people who run trips, stays and tours.",
    subHeadline: "Booking engines, channel managers, guest apps, WhatsApp-first concierge — we build the tech that makes travel and hospitality businesses feel modern.",
    sectionTitle: "What we build for travel",
    buildItems: [
      {
        title: "Booking engines",
        description: "Hotel, package, activity, custom-itinerary — booking flows that convert browsers into guests."
      },
      {
        title: "Channel managers",
        description: "Sync inventory across Booking, Airbnb, Agoda, MakeMyTrip — one dashboard, every channel."
      },
      {
        title: "Guest apps",
        description: "Check-in, room service, local guide, feedback — the digital concierge guests actually use."
      },
      {
        title: "Travel agency platforms",
        description: "Quote, book, manage clients and suppliers — the operations backbone for modern travel agencies."
      },
      {
        title: "OTA and aggregator MVPs",
        description: "Search, filter, book, pay — launch your travel marketplace with the right technical foundation."
      },
      {
        title: "WhatsApp concierge",
        description: "Pre-arrival info, in-stay support, post-stay reviews via AI Greentick — hospitality on autopilot."
      }
    ],
    extraSections: [],
    typicalProjects: [
      "Booking engine with payment links and WhatsApp confirmations",
      "Channel manager replacing a legacy desktop tool",
      "Guest-facing app for a boutique hotel chain",
      "Custom itinerary builder for a luxury travel agency"
    ],
    ctaHeading: "Building in travel? Let's talk.",
    ctaButtonText: "Book a Travel Tech Call"
  },
  page_technologies: {
    seo: {
      title: "Technologies We Use — React, Node, Python, AWS, AI | Apargo",
      description: "Apargo's technology stack — React, Next.js, Node, Python, AWS, GCP, Kubernetes, LLMs and more. Modern, mainstream, maintainable.",
      keywords: "react, node, python, aws, ai, apargo"
    },
    hero: {
      badge: "Technologies",
      heading: "Mainstream stack, modern choices.",
      description: "We don't chase the framework of the month. We pick technologies a future team can hire for and maintain — and we keep up with the modern features that genuinely save time."
    },
    stackGroups: [
      {
        title: "Frontend",
        iconName: "AtomIcon",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-600/10 dark:bg-blue-400/10",
        borderColor: "border-blue-600/25 hover:border-blue-600/60 dark:border-blue-400/25 dark:hover:border-blue-400/60",
        items: [
          { name: "React", iconName: "AtomIcon" },
          { name: "Next.js", iconName: "GlobeIcon" },
          { name: "Remix", iconName: "RocketIcon" },
          { name: "Vue", iconName: "BoxesIcon" },
          { name: "Nuxt", iconName: "LayersIcon" },
          { name: "Astro", iconName: "RocketIcon" },
          { name: "Tailwind CSS", iconName: "PaletteIcon" },
          { name: "shadcn/ui", iconName: "ComponentIcon" },
          { name: "Radix UI", iconName: "FrameIcon" },
          { name: "TypeScript", iconName: "FileCode2Icon" }
        ]
      },
      {
        title: "Backend",
        iconName: "ServerIcon",
        color: "text-emerald-600 dark:text-emerald-400",
        bgColor: "bg-emerald-600/10 dark:bg-emerald-400/10",
        borderColor: "border-emerald-600/25 hover:border-emerald-600/60 dark:border-emerald-400/25 dark:hover:border-emerald-400/60",
        items: [
          { name: "Node.js", iconName: "ServerIcon" },
          { name: "Express", iconName: "FastForwardIcon" },
          { name: "NestJS", iconName: "LayersIcon" },
          { name: "Fastify", iconName: "ZapIcon" },
          { name: "Python", iconName: "FileCodeIcon" },
          { name: "FastAPI", iconName: "ZapIcon" },
          { name: "Django", iconName: "BuildingIcon" },
          { name: "Flask", iconName: "FlameIcon" },
          { name: "Go", iconName: "WorkflowIcon" },
          { name: "Java", iconName: "CodeIcon" },
          { name: "Kotlin", iconName: "CodeIcon" }
        ]
      },
      {
        title: "Mobile",
        iconName: "SmartphoneIcon",
        color: "text-violet-600 dark:text-violet-400",
        bgColor: "bg-violet-600/10 dark:bg-violet-400/10",
        borderColor: "border-violet-600/25 hover:border-violet-600/60 dark:border-violet-400/25 dark:hover:border-violet-400/60",
        items: [
          { name: "React Native", iconName: "AtomIcon" },
          { name: "Expo", iconName: "RocketIcon" },
          { name: "Flutter", iconName: "MonitorSmartphoneIcon" },
          { name: "Swift / SwiftUI", iconName: "AppleIcon" },
          { name: "Kotlin / Jetpack Compose", iconName: "TabletSmartphoneIcon" }
        ]
      },
      {
        title: "Databases",
        iconName: "DatabaseIcon",
        color: "text-amber-600 dark:text-amber-400",
        bgColor: "bg-amber-600/10 dark:bg-amber-400/10",
        borderColor: "border-amber-600/25 hover:border-amber-600/60 dark:border-amber-400/25 dark:hover:border-amber-400/60",
        items: [
          { name: "PostgreSQL", iconName: "DatabaseIcon" },
          { name: "MySQL", iconName: "TableIcon" },
          { name: "MariaDB", iconName: "TableIcon" },
          { name: "MongoDB", iconName: "LeafIcon" },
          { name: "DynamoDB", iconName: "CloudIcon" },
          { name: "Firestore", iconName: "FlameIcon" },
          { name: "Redis", iconName: "DatabaseBackupIcon" },
          { name: "Elasticsearch", iconName: "SearchIcon" },
          { name: "Meilisearch", iconName: "SearchCheckIcon" },
          { name: "Typesense", iconName: "FileSearchIcon" },
          { name: "ClickHouse", iconName: "BarChart3Icon" },
          { name: "BigQuery", iconName: "BarChart3Icon" }
        ]
      },
      {
        title: "AI and ML",
        iconName: "BrainCircuitIcon",
        color: "text-rose-600 dark:text-rose-400",
        bgColor: "bg-rose-600/10 dark:bg-rose-400/10",
        borderColor: "border-rose-600/25 hover:border-rose-600/60 dark:border-rose-400/25 dark:hover:border-rose-400/60",
        items: [
          { name: "OpenAI", iconName: "SparklesIcon" },
          { name: "Anthropic Claude", iconName: "BotIcon" },
          { name: "Google Gemini", iconName: "SparklesIcon" },
          { name: "Llama", iconName: "BrainCircuitIcon" },
          { name: "Mistral", iconName: "BrainCircuitIcon" },
          { name: "Qwen", iconName: "BrainCircuitIcon" },
          { name: "vLLM", iconName: "ZapIcon" },
          { name: "Ollama", iconName: "TerminalIcon" },
          { name: "Pinecone", iconName: "DatabaseIcon" },
          { name: "Weaviate", iconName: "NetworkIcon" },
          { name: "Qdrant", iconName: "DatabaseIcon" },
          { name: "pgvector", iconName: "DatabaseIcon" },
          { name: "LangChain", iconName: "WorkflowIcon" },
          { name: "LlamaIndex", iconName: "FileSearchIcon" },
          { name: "Haystack", iconName: "SearchIcon" },
          { name: "scikit-learn", iconName: "CpuIcon" },
          { name: "XGBoost", iconName: "BarChart3Icon" },
          { name: "PyTorch", iconName: "FlameIcon" },
          { name: "TensorFlow", iconName: "CircuitBoardIcon" },
          { name: "Whisper", iconName: "AudioLinesIcon" }
        ]
      },
      {
        title: "Cloud & Infrastructure",
        iconName: "CloudIcon",
        color: "text-sky-600 dark:text-sky-400",
        bgColor: "bg-sky-600/10 dark:bg-sky-400/10",
        borderColor: "border-sky-600/25 hover:border-sky-600/60 dark:border-sky-400/25 dark:hover:border-sky-400/60",
        items: [
          { name: "AWS", iconName: "CloudIcon" },
          { name: "GCP", iconName: "CloudIcon" },
          { name: "Azure", iconName: "CloudIcon" },
          { name: "Cloudflare", iconName: "CloudLightningIcon" },
          { name: "Hetzner", iconName: "HardDriveIcon" },
          { name: "DigitalOcean", iconName: "GlobeIcon" },
          { name: "Railway", iconName: "MilestoneIcon" },
          { name: "EC2", iconName: "ServerIcon" },
          { name: "ECS", iconName: "ContainerIcon" },
          { name: "Lambda", iconName: "SquareFunctionIcon" },
          { name: "Cloud Run", iconName: "ZapIcon" },
          { name: "GKE", iconName: "AnchorIcon" }
        ]
      },
      {
        title: "DevOps",
        iconName: "ContainerIcon",
        color: "text-teal-600 dark:text-teal-400",
        bgColor: "bg-teal-600/10 dark:bg-teal-400/10",
        borderColor: "border-teal-600/25 hover:border-teal-600/60 dark:border-teal-400/25 dark:hover:border-teal-400/60",
        items: [
          { name: "Docker", iconName: "ContainerIcon" },
          { name: "Kubernetes", iconName: "AnchorIcon" },
          { name: "Helm", iconName: "AnchorIcon" },
          { name: "Terraform", iconName: "CloudCogIcon" },
          { name: "Pulumi", iconName: "CloudCogIcon" },
          { name: "AWS CDK", iconName: "CodeIcon" },
          { name: "GitHub Actions", iconName: "GitBranchIcon" },
          { name: "GitLab CI", iconName: "GitBranchIcon" },
          { name: "Argo CD", iconName: "WorkflowIcon" },
          { name: "Datadog", iconName: "ScanIcon" },
          { name: "Grafana", iconName: "ActivityIcon" },
          { name: "Prometheus", iconName: "BarChart3Icon" },
          { name: "Sentry", iconName: "BugIcon" },
          { name: "BetterStack", iconName: "LayersIcon" }
        ]
      },
      {
        title: "Data & Integrations",
        iconName: "ShuffleIcon",
        color: "text-orange-600 dark:text-orange-400",
        bgColor: "bg-orange-600/10 dark:bg-orange-400/10",
        borderColor: "border-orange-600/25 hover:border-orange-600/60 dark:border-orange-400/25 dark:hover:border-orange-400/60",
        items: [
          { name: "Airbyte", iconName: "ShuffleIcon" },
          { name: "Fivetran", iconName: "ShuffleIcon" },
          { name: "dbt", iconName: "WorkflowIcon" },
          { name: "Kafka", iconName: "RadioIcon" },
          { name: "RabbitMQ", iconName: "MailIcon" },
          { name: "AWS SQS", iconName: "MailIcon" },
          { name: "Segment", iconName: "BarChart3Icon" },
          { name: "Rudderstack", iconName: "BarChart3Icon" },
          { name: "PostHog", iconName: "MousePointerClickIcon" },
          { name: "Zapier", iconName: "ZapIcon" },
          { name: "Make", iconName: "PlugIcon" },
          { name: "n8n", iconName: "WorkflowIcon" }
        ]
      }
    ],
    principles: [
      {
        iconName: "UsersIcon",
        title: "Hireability first",
        description: "Your future team has to be able to hire for it. We pick tools with large, active talent pools.",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-600/10 dark:bg-blue-400/10"
      },
      {
        iconName: "ShieldCheckIcon",
        title: "Maintenance over novelty",
        description: "Boring tech that works beats exciting tech that breaks. We optimise for long-term stability.",
        color: "text-emerald-600 dark:text-emerald-400",
        bgColor: "bg-emerald-600/10 dark:bg-emerald-400/10"
      },
      {
        iconName: "CoinsIcon",
        title: "Cost-aware",
        description: "We match the stack to your stage — startups don't need Kubernetes on day one.",
        color: "text-amber-600 dark:text-amber-400",
        bgColor: "bg-amber-600/10 dark:bg-amber-400/10"
      },
      {
        iconName: "UnlockIcon",
        title: "Vendor-neutral where possible",
        description: "Avoid lock-in unless the value is clear. Your code should be portable.",
        color: "text-violet-600 dark:text-violet-400",
        bgColor: "bg-violet-600/10 dark:bg-violet-400/10"
      }
    ]
  },
  page_faq: {
    seo: {
      title: "FAQ — Frequently Asked Questions | Apargo",
      description: "Find answers to questions about Apargo's product engineering, IT services, pricing, process, products like AI Greentick, and career hiring processes.",
      keywords: "faq, questions, support, pricing, process, apargo"
    },
    hero: {
      badge: "FAQ",
      heading: "Questions buyers actually ask us.",
      description: "If yours isn't covered, write to hello@apargo.com. We'll either answer in a reply or add it here."
    },
    categories: [
      { id: "about", label: "About Apargo", iconName: "BuildingIcon" },
      { id: "services", label: "Services & Pricing", iconName: "CreditCardIcon" },
      { id: "process", label: "Process & Delivery", iconName: "WorkflowIcon" },
      { id: "products", label: "Products", iconName: "PackageIcon" },
      { id: "hiring", label: "Hiring Us", iconName: "HandshakeIcon" },
      { id: "careers", label: "Careers", iconName: "BriefcaseIcon" }
    ],
    items: [
      {
        categoryId: "about",
        question: "Who are you, briefly?",
        answer: "Apargo is a product-engineering and IT services company based in India. We build custom software, mobile apps and SaaS for clients across the world, and run our own products like AI Greentick."
      },
      {
        categoryId: "about",
        question: "How big is the team?",
        answer: "Senior-heavy team of engineers, designers and PMs. Most engineers are mid-to-senior. We deliberately stay lean — we'd rather have 30 senior people than 100 mixed."
      },
      {
        categoryId: "about",
        question: "Where are you based?",
        answer: "Headquartered in India, remote-first. Engineers work across IST, with overlap into US, EU, Middle East and APAC hours."
      },
      {
        categoryId: "about",
        question: "How are you different from a typical agency?",
        answer: "Most agencies hand over code and walk away. We hand it over and continue running similar products ourselves. That changes how we build — we ship things we'd be comfortable maintaining at 2am."
      },
      {
        categoryId: "services",
        question: "How much does a typical project cost?",
        answer: "It depends on scope. A marketing site might be a five-figure project in INR. A SaaS MVP runs higher and is usually a dedicated-team engagement. We give a fixed quote only after a short scoping conversation — never a ballpark over email."
      },
      {
        categoryId: "services",
        question: "Do you do fixed-price projects?",
        answer: "Yes, for projects with a clear scope and deliverable. For evolving products, dedicated team or staff augmentation usually works better."
      },
      {
        categoryId: "services",
        question: "Do you take small projects?",
        answer: "We take projects we can do well in our model. A two-week landing page tweak might not fit. A 4 to 8-week MVP usually does. Best path — book a discovery call and we'll be straight."
      },
      {
        categoryId: "services",
        question: "What's not included in your pricing?",
        answer: "Third-party services we set up but don't own — hosting, paid APIs, SaaS subscriptions, ad spend. Those go directly on your card."
      },
      {
        categoryId: "services",
        question: "Do you work with non-Indian clients?",
        answer: "Yes. We work with clients across US, EU, Middle East, Southeast Asia and Australia. Invoicing in USD or local currency on request."
      },
      {
        categoryId: "process",
        question: "Do I get to talk to the actual engineers?",
        answer: "Yes. Every project has a Slack channel with the engineers, not just the PM. Weekly demos are run by the people writing the code."
      },
      {
        categoryId: "process",
        question: "How do you handle scope creep?",
        answer: "We don't pretend it doesn't happen. If a new request lands mid-sprint, we either swap it for something else in the same sprint or quote it separately. Always in writing, always before work starts."
      },
      {
        categoryId: "process",
        question: "What happens if we need to pause the project?",
        answer: "We allow one paid pause window per engagement. After that, we usually need to re-scope when the project resumes — the team may have moved on to other work."
      },
      {
        categoryId: "process",
        question: "Who owns the code?",
        answer: "You do, from day one. Code lives in your repo. We have access only while engaged. Our standard NDA covers IP transfer."
      },
      {
        categoryId: "products",
        question: "Is AI Greentick the same company as Apargo?",
        answer: "Yes. Apargo is the parent company. AI Greentick is Apargo's flagship SaaS product. Both are run by the same team."
      },
      {
        categoryId: "products",
        question: "Can I get a custom version of AI Greentick?",
        answer: "For enterprise needs — yes, we offer custom integrations and on-prem deployments under the Apargo services model."
      },
      {
        categoryId: "products",
        question: "Are you building more products?",
        answer: "Yes — Apargo Labs has multiple products in active development. Some go public, some stay internal to specific clients."
      },
      {
        categoryId: "hiring",
        question: "How fast can you start?",
        answer: "Usually within 1 to 3 weeks of contract signature, depending on team availability and the size of the engagement."
      },
      {
        categoryId: "hiring",
        question: "Do you sign NDAs before discussing a project?",
        answer: "Yes. Send your NDA or use ours — we can sign before the first call if needed."
      },
      {
        categoryId: "hiring",
        question: "Do replace existing teams?",
        answer: "Sometimes. More often we augment them. We've also taken over legacy codebases when a previous team has left — we call that a rescue engagement."
      },
      {
        categoryId: "careers",
        question: "Do you hire juniors?",
        answer: "Not at this stage. Our model depends on senior engineers shipping fast. We'll likely open junior pipelines in future — follow the Careers page for updates."
      },
      {
        categoryId: "careers",
        question: "Is it fully remote?",
        answer: "Most roles are remote-friendly. A few in-office or hybrid roles open from time to time, mainly senior leadership."
      },
      {
        categoryId: "careers",
        question: "How long is the hiring process?",
        answer: "Usually 2 to 3 weeks end to end. We respect your time — no surprise rounds."
      }
    ]
  },
  page_careers: {
    seo: {
      title: "Careers at Apargo — Build Software That Ships",
      description: "Open engineering, design, AI and product roles at Apargo. Remote-friendly, senior-heavy team. Builders of AI Greentick.",
      keywords: "careers, jobs, hiring, work at apargo, next.js jobs, react native jobs"
    },
    hero: {
      badge: "CAREERS",
      heading: "Join a team that builds — and operates — what it builds.",
      description: "Apargo is a small, senior-heavy team that ships software for clients and runs its own SaaS products. You'll write code that goes live in days, not quarters. You'll see your work used by real people. You won't sit through three rounds of \"culture fit\" interviews."
    },
    fitSignals: [
      {
        iconName: "ShieldCheckIcon",
        title: "Senior judgement",
        description: "You've shipped real software at scale. You know when to refactor and when to leave it alone."
      },
      {
        iconName: "MessageSquareTextIcon",
        title: "Written communication",
        description: "We're async-first. If you cannot explain a decision in writing, we will not move fast."
      },
      {
        iconName: "BadgeCheckIcon",
        title: "Ownership",
        description: "From spec to deploy to on-call to bug fixes. We do not split build and maintain into separate teams."
      },
      {
        iconName: "SparklesIcon",
        title: "Curiosity over credentials",
        description: "We do not care where you went to school. We care what you've built and what you're learning."
      }
    ],
    benefits: [
      {
        iconName: "Globe2Icon",
        title: "Remote-friendly",
        description: "Most of the team works from wherever they do their best work, with optional coworking support in select cities."
      },
      {
        iconName: "BriefcaseBusinessIcon",
        title: "Senior-only pay bands",
        description: "We pay above market for senior builders. We are not hiring juniors at this stage."
      },
      {
        iconName: "GraduationCapIcon",
        title: "Learning budget",
        description: "Annual budget for courses, books, conferences, and the learning loops that make you sharper."
      },
      {
        iconName: "LaptopIcon",
        title: "Hardware that works",
        description: "Your choice of laptop, a decent monitor, and the tools you need to ship without fighting the setup."
      },
      {
        iconName: "RocketIcon",
        title: "Real product impact",
        description: "Your code goes live in production for real users, including AI Greentick customers."
      },
      {
        iconName: "UsersRoundIcon",
        title: "Equity for early team",
        description: "Meaningful ESOPs for the first 30 hires, because ownership should show up on the cap table too."
      }
    ],
    hiringSteps: [
      {
        title: "Application",
        description: "A short form or email. We read every one and look for shipped work."
      },
      {
        title: "First call",
        description: "30 minutes with a hiring manager. No surprise live coding."
      },
      {
        title: "Take-home or paid trial",
        description: "A real, scoped task. We pay for serious trials because your time matters."
      },
      {
        title: "Pairing round",
        description: "60 to 90 minutes working through a practical problem with a senior teammate."
      },
      {
        title: "Founder chat",
        description: "30 to 45 minutes focused on mutual fit, ambition, and how we work."
      },
      {
        title: "Offer",
        description: "Usually within 2 weeks of the first call when both sides want to move."
      }
    ],
    notForYou: [
      "You need a manager to break work into tiny daily tickets before you can move.",
      "You prefer handing work off instead of owning the deploy, support loop, and cleanup.",
      "You avoid writing decisions down and rely on meetings to recover context.",
      "You want greenfield work only and dislike maintaining systems that real users depend on."
    ],
    heroStats: [
      { value: "Days", label: "from idea to production, not quarters" },
      { value: "Senior", label: "team shape by default" },
      { value: "2 weeks", label: "typical offer timeline after first call" }
    ]
  },
  page_contact: {
    seo: {
      title: "Contact Us — Get in Touch with Apargo",
      description: "Reach out to Apargo for project enquiries, partnerships, or support. Based in Jaipur, serving clients globally.",
      keywords: "contact, email, address, phone number, support, queries, apargo"
    },
    heading: "Tell Us What You're Building.",
    subtitle: "Fill the form below or email us directly. You'll hear back within one working day from a real engineer, not an account manager.",
    contactCards: [
      {
        iconName: "MessageSquareMoreIcon",
        title: "Chat to Sales",
        description: "Talk to our team about your project",
        ctaText: "hello@apargo.com",
        ctaLink: "mailto:hello@apargo.com"
      },
      {
        iconName: "MailIcon",
        title: "Email Support",
        description: "Get help with an existing project",
        ctaText: "support@apargo.com",
        ctaLink: "mailto:support@apargo.com"
      },
      {
        iconName: "MapPinIcon",
        title: "Visit Us",
        description: "Jaipur, Rajasthan, India",
        ctaText: "View on maps",
        ctaLink: "https://maps.google.com/?q=Jaipur+Rajasthan+India"
      },
      {
        iconName: "PhoneIcon",
        title: "Phone / WhatsApp",
        description: "10am – 7pm IST, Mon – Fri",
        ctaText: "hello@apargo.com",
        ctaLink: "mailto:hello@apargo.com"
      }
    ],
    steps: [
      {
        number: "1",
        iconName: "MailIcon",
        title: "Instant confirmation",
        description: "You get an instant confirmation email."
      },
      {
        number: "2",
        iconName: "MessageCircleIcon",
        title: "Engineer reviews",
        description: "Within one working day, a real engineer or PM reviews your enquiry."
      },
      {
        number: "3",
        iconName: "CheckCircle2Icon",
        title: "Honest reply",
        description: "We reply with either a 30-minute call slot, a written response, or an honest \"not a fit\"."
      },
      {
        number: "4",
        iconName: "FileTextIcon",
        title: "Scope & quote",
        description: "If we move forward — written scope and a fixed quote within a week."
      }
    ]
  },
  page_products: {
    hero: {
      badge: "PRODUCTS BY APARGO",
      heading: "We don't just build software. We build, ship and operate it.",
      description: "Most agencies hand over code and walk away. Apargo runs its own SaaS in production — every day, at scale. The lessons from operating real products feed back into every client engagement.",
      primaryBtnText: "Visit AI Greentick",
      primaryBtnHref: "#ai-greentick",
      secondaryBtnText: "See What We're Building Next",
      secondaryBtnHref: "#labs"
    },
    aiGreentickSection: {
      badge: "AI Greentick",
      heading: "The complete WhatsApp marketing suite for modern teams.",
      descParagraph1: "AI Greentick is a full WhatsApp marketing and conversation platform built on the official WhatsApp Business API. Send broadcasts to thousands, run a shared inbox across the whole team, build no-code AI chatbots and track every conversation through a dedicated analytics layer.",
      descParagraph2: "Used by D2C brands, agencies and service businesses that want to turn WhatsApp into a real revenue channel — without missing chats or getting blocked.",
      primaryBtnText: "Visit AI Greentick",
      primaryBtnHref: "https://aigreentick.com",
      secondaryBtnText: "Book a Demo",
      secondaryBtnHref: "/contact?intent=demo"
    },
    features: [
      { title: "WhatsApp Broadcasts", desc: "bulk campaigns with high deliverability", iconName: "MegaphoneIcon" },
      { title: "Shared Team Inbox", desc: "one number, unlimited team members", iconName: "InboxIcon" },
      { title: "AI Chatbot Builder", desc: "no-code conversation flows", iconName: "BotIcon" },
      { title: "Campaign Manager", desc: "plan, track, optimise WhatsApp campaigns", iconName: "PieChartIcon" },
      { title: "Automation", desc: "trigger workflows from actions, tags or time", iconName: "ZapIcon" },
      { title: "Integrations", desc: "Shopify, Zapier, HubSpot, Salesforce, WooCommerce, Google Sheets", iconName: "BlocksIcon" }
    ],
    upcomingProducts: [
      { title: "Product 2 (placeholder)", description: "In private beta", iconName: "RocketIcon" },
      { title: "Product 3 (placeholder)", description: "Coming soon", iconName: "MicroscopeIcon" }
    ],
    cta: {
      heading: "Want to ship a SaaS like AI Greentick?",
      description: "We don't just sell our products — we also build new ones for founders, on the same playbook. Same architecture choices, same delivery rhythm, same engineers.",
      buttonText: "Talk to Our Product Team",
      buttonHref: "/contact"
    },
    seo: {
      title: "Our Products — AI Greentick & More | Apargo",
      description: "Apargo builds and runs its own SaaS products. Meet AI Greentick — our WhatsApp marketing suite — and the lab projects coming next.",
      keywords: "products, software, saas, whatsapp marketing, ai greentick, apargo"
    }
  },
  page_ai_greentick: {
    hero: {
      badge: "AI Greentick",
      heading: "WhatsApp marketing, minus the headache.",
      description: "The complete WhatsApp marketing suite for modern teams. Built on the official WhatsApp Business API.",
      primaryBtnText: "Start Free Trial →",
      primaryBtnHref: "#pricing",
      secondaryBtnText: "Book a Live Demo",
      secondaryBtnHref: "/contact?intent=demo"
    },
    audience: [
      { title: "D2C Brands", description: "Running product launches, festival sales and event promotions with ease.", iconName: "ShapesIcon" },
      { title: "Agencies", description: "Managing WhatsApp for multiple clients through a unified interface.", iconName: "SproutIcon" },
      { title: "Service Businesses", description: "Handling leads, bookings and customer support without missing a beat.", iconName: "CreditCardIcon" },
      { title: "High-Volume Teams", description: "EdTech, fitness, real estate and healthcare teams managing complex conversations.", iconName: "CircleDollarSignIcon" }
    ],
    plans: [
      {
        name: "Starter",
        price: 49,
        description: "Good for individuals and small businesses just starting on WhatsApp.",
        features: ["Standard Broadcasts", "Shared Inbox (2 Agents)", "Basic Analytics", "Community Support"],
        iconName: "LeafIcon",
        isHighlighted: false
      },
      {
        name: "Growth",
        price: 149,
        description: "For small teams that want to upgrade speed and analytics.",
        features: ["High-Speed Broadcasts", "Unlimited Agents", "Advanced Analytics", "Priority Support"],
        iconName: "ShapesIcon",
        isHighlighted: true
      },
      {
        name: "Scale",
        price: 499,
        description: "Larger teams with custom needs around control, privacy and security.",
        features: ["Custom API Rate Limits", "Dedicated Success Manager", "SSO & Advanced Security", "Custom Integrations"],
        iconName: "SproutIcon",
        isHighlighted: false
      }
    ],
    cta: {
      heading: "Try AI Greentick on your own WhatsApp number.",
      description: "30-day free trial on all plans. No card required.",
      buttonText: "Start Free Trial →",
      buttonHref: "#pricing",
      secondaryButtonText: "Book a Live Demo",
      secondaryButtonHref: "/contact?intent=demo"
    },
    seo: {
      title: "AI Greentick | Apargo",
      description: "The complete WhatsApp marketing suite for modern teams.",
      keywords: "whatsapp marketing, shared inbox, broadcasts, ai greentick, apargo"
    }
  }
};


export { getLucideIcon } from './icons'


/**
 * Smart merge: for each key in the DB content, if the value is an empty array
 * and the fallback has a non-empty array, keep the fallback value.
 * This prevents admin-saved empty arrays from wiping out default link columns etc.
 */
function smartMerge(fallback: Record<string, any>, dbContent: Record<string, any>): Record<string, any> {
  const merged = { ...fallback }
  for (const key of Object.keys(dbContent)) {
    const dbVal = dbContent[key]
    const fbVal = fallback[key]
    // If DB has an empty array but fallback has a non-empty array, keep fallback
    if (Array.isArray(dbVal) && dbVal.length === 0 && Array.isArray(fbVal) && fbVal.length > 0) {
      continue
    }
    merged[key] = dbVal
  }
  return merged
}

/**
 * Fetch a page section or common section from Supabase by its unique key
 * Falls back to DEFAULT_FALLBACKS if not found or on error.
 */
export async function getSiteSection<T = any>(key: string): Promise<T> {
  const fallback = DEFAULT_FALLBACKS[key] || {}
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('site_sections')
      .select('content')
      .eq('key', key)
      .single()

    if (error || !data) {
      return fallback as T
    }

    // Smart merge: DB content overrides fallback, but empty arrays don't wipe defaults
    return smartMerge(fallback, data.content || {}) as T
  } catch (err) {
    console.error(`Error fetching site section [${key}]:`, err)
    return fallback as T
  }
}
