export type CaseStudy = {
  slug: string
  coverImage: string
  industry: string
  headline: string
  quickStats: string[]
  // Detail page
  title: string
  summary: string
  client: string
  engagementType: string
  timeline: string
  team: string
  problem: string
  approach: string
  features: string[]
  outcomes: { metric: string; value: string }[]
  clientQuote?: { quote: string; name: string; role: string; company: string }
  stack: { category: string; tech: string }[]
  relatedServices: { name: string; href: string }[]
  techTags: string[]
  serviceTags: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'whatsapp-commerce-d2c-brand',
    coverImage: '/case-studies/whatsapp-commerce.jpg',
    industry: 'E-commerce',
    headline: 'Cut WhatsApp response time by 5x for a 200-store D2C brand',
    quickStats: ['5x faster replies', '18% cart recovery', '12-week build'],
    title: 'WhatsApp Commerce for D2C Beauty Brand',
    summary: 'Built a WhatsApp-first commerce layer that cut response time from 18 minutes to under 3 and recovered 18% of abandoned carts.',
    client: 'A 200-store D2C beauty brand',
    engagementType: 'Fixed scope',
    timeline: '12 weeks',
    team: '1 PM, 2 backend engineers, 1 frontend engineer',
    problem: 'The brand had 200+ retail stores and a growing D2C channel, but customer queries on WhatsApp were handled manually by a team of 12. Average reply time was 18 minutes during peak hours. Cart abandonment on the website sat at 72% with no recovery mechanism.',
    approach: 'We scoped a WhatsApp-first commerce layer using the official WhatsApp Business API, not a third-party wrapper. We chose to automate the top 20 query types that covered 80% of volume, and kept human handoff for everything else. We explicitly chose not to build a full chatbot — rule-based routing with smart templates outperformed LLM-based chat in our testing for this use case.',
    features: [
      'Automated WhatsApp catalogue browsing with product cards and quick-reply buttons',
      'Abandoned cart recovery flows triggered 30 minutes and 24 hours after drop-off',
      'Live agent handoff with full conversation context preserved',
      'Analytics dashboard showing reply times, recovery rates, and agent performance',
    ],
    outcomes: [
      { metric: 'WhatsApp reply time', value: 'Reduced from 18 minutes to under 3 minutes' },
      { metric: 'Cart abandonment recovery', value: 'Up 18% in the first 60 days' },
      { metric: 'Manual agent workload', value: 'Down 65%, team reduced from 12 to 4' },
    ],
    clientQuote: {
      quote: 'We went from drowning in WhatsApp messages to running a system that sells while we sleep. The cart recovery alone paid for the project in month two.',
      name: 'Priya S.',
      role: 'Head of D2C',
      company: 'Confidential',
    },
    stack: [
      { category: 'Frontend', tech: 'Next.js, React, Tailwind CSS' },
      { category: 'Backend', tech: 'Node.js, NestJS, Redis' },
      { category: 'Infra', tech: 'AWS (ECS, RDS, SQS), WhatsApp Business API' },
      { category: 'Other', tech: 'AI Greentick for WhatsApp orchestration' },
    ],
    relatedServices: [
      { name: 'Web Development', href: '/services/web-development' },
      { name: 'AI & Machine Learning', href: '/services/ai-machine-learning' },
      { name: 'Custom Software', href: '/services/custom-software' },
    ],
    techTags: ['Web', 'AI', 'SaaS'],
    serviceTags: ['Build'],
  },
  {
    slug: 'healthcare-patient-portal',
    coverImage: '/case-studies/healthcare-portal.jpg',
    industry: 'Healthcare',
    headline: 'Built a HIPAA-ready patient portal serving 40,000 monthly active users',
    quickStats: ['40K MAU', '99.97% uptime', '16-week build'],
    title: 'Patient Portal for Multi-Specialty Hospital Chain',
    summary: 'Designed and shipped a patient-facing portal with appointment booking, lab results, and telemedicine — serving 40,000 monthly active users with 99.97% uptime.',
    client: 'A 12-location multi-specialty hospital chain in India',
    engagementType: 'Dedicated team',
    timeline: '16 weeks',
    team: '1 PM, 1 designer, 2 backend engineers, 2 frontend engineers, 1 DevOps',
    problem: 'Patients had to call the hospital for everything — booking appointments, checking lab results, requesting prescription refills. The existing website was a static brochure. Wait times on the phone averaged 8 minutes, and no-show rates for appointments were 28%.',
    approach: 'We proposed a phased rollout: appointments and lab results first, telemedicine second. We built against the hospital\'s existing HIS (Hospital Information System) API rather than replacing it. We chose server-side rendering for the patient-facing pages to keep load times under 2 seconds on 4G connections, which most patients used.',
    features: [
      'Appointment booking with real-time doctor availability and SMS/WhatsApp reminders',
      'Lab results viewer with PDF download and historical trend charts',
      'Telemedicine module with video calling, e-prescriptions, and payment',
      'Admin dashboard for hospital staff to manage schedules and patient queues',
    ],
    outcomes: [
      { metric: 'Monthly active users', value: '40,000 within 4 months of launch' },
      { metric: 'No-show rate', value: 'Down from 28% to 11% with automated reminders' },
      { metric: 'Call center volume', value: 'Reduced 45% — team reallocated to in-person support' },
    ],
    stack: [
      { category: 'Frontend', tech: 'Next.js, React, Tailwind CSS' },
      { category: 'Backend', tech: 'Node.js, Fastify, PostgreSQL' },
      { category: 'Infra', tech: 'AWS (ECS, Aurora, CloudFront, S3)' },
      { category: 'Other', tech: 'Twilio for SMS, Jitsi for video, Razorpay for payments' },
    ],
    relatedServices: [
      { name: 'Web Development', href: '/services/web-development' },
      { name: 'UI/UX Design', href: '/services/ui-ux-design' },
      { name: 'Cloud & DevOps', href: '/services/cloud-devops' },
    ],
    techTags: ['Web', 'Cloud'],
    serviceTags: ['Build'],
  },
  {
    slug: 'edtech-learning-platform',
    coverImage: '/case-studies/edtech-platform.jpg',
    industry: 'EdTech',
    headline: 'Shipped a live-class platform handling 10,000 concurrent learners',
    quickStats: ['10K concurrent', '4.8★ app rating', '20-week build'],
    title: 'Live Learning Platform for K-12 EdTech Startup',
    summary: 'Built a cross-platform learning app with live classes, quizzes, and progress tracking — scaled to 10,000 concurrent learners in the first semester.',
    client: 'A funded K-12 EdTech startup',
    engagementType: 'Dedicated team',
    timeline: '20 weeks',
    team: '1 PM, 1 designer, 1 mobile engineer, 2 backend engineers, 1 frontend engineer',
    problem: 'The startup had validated demand with a Zoom-based pilot but couldn\'t scale. Teachers had no tools for quizzes or attendance. Parents had no visibility into progress. The existing mobile app was a thin WebView wrapper that crashed on low-end Android devices.',
    approach: 'We rebuilt the mobile app in React Native with Expo for faster iteration. For live classes, we chose a WebRTC-based solution with server-side recording instead of embedding a third-party video SDK — this gave us control over latency and cost. We designed the quiz engine to work offline and sync when connectivity returned, because many students were on intermittent connections.',
    features: [
      'Live class streaming with real-time chat, hand-raise, and screen sharing',
      'Interactive quiz engine with offline support and instant grading',
      'Parent dashboard showing attendance, quiz scores, and teacher feedback',
      'Teacher toolkit for scheduling, attendance tracking, and content upload',
    ],
    outcomes: [
      { metric: 'Concurrent learners', value: '10,000 during peak hours, zero downtime' },
      { metric: 'App store rating', value: '4.8 stars on Google Play (2,400+ reviews)' },
      { metric: 'Student engagement', value: 'Quiz completion rate up from 35% to 78%' },
    ],
    stack: [
      { category: 'Frontend', tech: 'React Native (Expo), React, Next.js' },
      { category: 'Backend', tech: 'Node.js, NestJS, PostgreSQL, Redis' },
      { category: 'Infra', tech: 'AWS (ECS, ElastiCache, MediaLive, S3)' },
      { category: 'Other', tech: 'WebRTC, Socket.io, Firebase Push' },
    ],
    relatedServices: [
      { name: 'Mobile App Development', href: '/services/mobile-app-development' },
      { name: 'Cloud & DevOps', href: '/services/cloud-devops' },
      { name: 'UI/UX Design', href: '/services/ui-ux-design' },
    ],
    techTags: ['Mobile', 'Cloud', 'Web'],
    serviceTags: ['Build'],
  },
  {
    slug: 'fintech-lending-dashboard',
    coverImage: '/case-studies/fintech-lending.jpg',
    industry: 'FinTech',
    headline: 'Rescued a stalled lending platform and shipped it in 8 weeks',
    quickStats: ['8-week rescue', '₹12Cr disbursed', '3x faster processing'],
    title: 'Lending Platform Rescue for NBFC',
    summary: 'Took over a stalled lending platform from a previous vendor, stabilised the codebase, and shipped the remaining 60% of features in 8 weeks. ₹12 crore disbursed in month one.',
    client: 'An RBI-registered NBFC',
    engagementType: 'Fixed scope (rescue)',
    timeline: '8 weeks',
    team: '1 PM, 2 full-stack engineers, 1 DevOps',
    problem: 'The NBFC had spent 6 months and significant budget with a previous vendor. The platform was 40% complete, had no automated tests, and the deployment process was manual SSH into a single EC2 instance. The previous team had left, and the NBFC needed to launch before a regulatory deadline.',
    approach: 'We audited the existing codebase in 3 days and presented a brutally honest assessment: keep the data models and API contracts, rewrite the frontend, and add CI/CD before writing another line of feature code. The client agreed. We chose to not migrate databases — the schema was sound, only the application layer needed rescue.',
    features: [
      'Loan origination workflow with e-KYC, credit scoring API integration, and e-sign',
      'Disbursement engine with NEFT/IMPS integration and real-time status tracking',
      'Collections dashboard with EMI schedules, overdue alerts, and agent assignment',
      'Compliance reporting module with RBI-format exports',
    ],
    outcomes: [
      { metric: 'Launch', value: 'Shipped 2 weeks before regulatory deadline' },
      { metric: 'Disbursement', value: '₹12 crore in the first month of operation' },
      { metric: 'Processing speed', value: 'Loan approval time down from 48 hours to 16 hours' },
    ],
    clientQuote: {
      quote: 'Apargo took a codebase we thought was dead and turned it into a working product in two months. They were honest about what to keep and what to throw away.',
      name: 'Rahul M.',
      role: 'CTO',
      company: 'Confidential NBFC',
    },
    stack: [
      { category: 'Frontend', tech: 'React, Tailwind CSS, shadcn/ui' },
      { category: 'Backend', tech: 'Node.js, Express, PostgreSQL' },
      { category: 'Infra', tech: 'AWS (ECS, RDS, CloudWatch), GitHub Actions CI/CD' },
      { category: 'Other', tech: 'DigiLocker API, CERSAI, Razorpay for NACH' },
    ],
    relatedServices: [
      { name: 'Custom Software', href: '/services/custom-software' },
      { name: 'Cloud & DevOps', href: '/services/cloud-devops' },
      { name: 'IT Consulting', href: '/services/it-consulting' },
    ],
    techTags: ['Web', 'Cloud'],
    serviceTags: ['Rescue'],
  },
  {
    slug: 'real-estate-property-management',
    coverImage: '/case-studies/real-estate-mgmt.jpg',
    industry: 'Real Estate',
    headline: 'Built a property management SaaS used by 150+ housing societies',
    quickStats: ['150+ societies', '60K residents', '24-week build'],
    title: 'Property Management SaaS for Housing Societies',
    summary: 'Designed and shipped a multi-tenant SaaS platform for housing society management — visitor logs, maintenance billing, complaints, and community features — serving 150+ societies and 60,000 residents.',
    client: 'A proptech startup backed by angel investors',
    engagementType: 'Dedicated team',
    timeline: '24 weeks',
    team: '1 PM, 1 designer, 2 backend engineers, 1 mobile engineer, 1 frontend engineer',
    problem: 'Housing societies across India managed everything on paper registers and WhatsApp groups. The startup had a PowerPoint and seed funding but no product. They needed a full SaaS platform — web for admins, mobile for residents — that could onboard societies in under a day.',
    approach: 'We designed a multi-tenant architecture from day one to keep per-society costs low. The mobile app was built with React Native for cross-platform reach. We chose a self-service onboarding flow so societies could sign up without sales calls — this was key to reaching 150+ in the first year without a large sales team.',
    features: [
      'Visitor management with QR-based gate passes and real-time notifications',
      'Maintenance billing with auto-calculation, payment gateway, and receipt generation',
      'Complaint tracking with SLA timers and escalation workflows',
      'Community features — polls, announcements, event calendar, emergency directory',
    ],
    outcomes: [
      { metric: 'Societies onboarded', value: '150+ in the first 12 months' },
      { metric: 'Residents served', value: '60,000+ active users across both platforms' },
      { metric: 'Maintenance collection', value: 'On-time payment rate up from 55% to 82%' },
    ],
    stack: [
      { category: 'Frontend', tech: 'Next.js, React, Tailwind CSS' },
      { category: 'Backend', tech: 'Node.js, NestJS, PostgreSQL, Redis' },
      { category: 'Mobile', tech: 'React Native (Expo)' },
      { category: 'Infra', tech: 'AWS (ECS, Aurora, S3, SES), Razorpay' },
    ],
    relatedServices: [
      { name: 'SaaS Product Development', href: '/services/saas-product-development' },
      { name: 'Mobile App Development', href: '/services/mobile-app-development' },
      { name: 'UI/UX Design', href: '/services/ui-ux-design' },
    ],
    techTags: ['Web', 'Mobile', 'SaaS'],
    serviceTags: ['Build'],
  },
  {
    slug: 'travel-booking-engine',
    coverImage: '/case-studies/travel-booking.jpg',
    industry: 'Travel',
    headline: 'Shipped a white-label booking engine processing ₹2Cr monthly GMV',
    quickStats: ['₹2Cr/mo GMV', '12 travel agents', '14-week build'],
    title: 'White-Label Booking Engine for Travel Aggregator',
    summary: 'Built a white-label travel booking engine with flight, hotel, and package search — processing ₹2 crore monthly GMV across 12 travel agent brands.',
    client: 'A mid-size travel aggregator',
    engagementType: 'Fixed scope',
    timeline: '14 weeks',
    team: '1 PM, 2 backend engineers, 1 frontend engineer',
    problem: 'The aggregator was reselling bookings through phone calls and email. Each of their 12 partner travel agents had their own brand but no online booking capability. The aggregator needed a white-label platform that could be themed per agent and connected to a single backend for inventory and pricing.',
    approach: 'We built a themeable booking engine using Next.js with dynamic theming per subdomain. The backend aggregated inventory from multiple GDS and direct hotel APIs into a unified search. We chose server-side rendering for SEO and fast load on mobile — 70% of bookings came from phones.',
    features: [
      'Multi-brand booking engine with per-agent theming, logo, and domain',
      'Unified search across flights, hotels, and holiday packages',
      'Payment split system — commission auto-calculated per agent per booking',
      'Admin panel for inventory management, pricing overrides, and booking reports',
    ],
    outcomes: [
      { metric: 'Monthly GMV', value: '₹2 crore within 3 months of launch' },
      { metric: 'Agent onboarding', value: '12 agents live with branded booking sites' },
      { metric: 'Booking conversion', value: 'Up 3.2x compared to phone-based booking' },
    ],
    stack: [
      { category: 'Frontend', tech: 'Next.js, React, Tailwind CSS' },
      { category: 'Backend', tech: 'Python, FastAPI, PostgreSQL, Redis' },
      { category: 'Infra', tech: 'AWS (ECS, ElastiCache, CloudFront)' },
      { category: 'Other', tech: 'Amadeus GDS, TBO API, Razorpay' },
    ],
    relatedServices: [
      { name: 'Web Development', href: '/services/web-development' },
      { name: 'SaaS Product Development', href: '/services/saas-product-development' },
      { name: 'Custom Software', href: '/services/custom-software' },
    ],
    techTags: ['Web', 'SaaS'],
    serviceTags: ['Build'],
  },
]

export const industries = ['All', 'E-commerce', 'Healthcare', 'EdTech', 'Real Estate', 'FinTech', 'Travel']
export const techFilters = ['All', 'Web', 'Mobile', 'AI', 'SaaS', 'Cloud']
export const serviceFilters = ['All', 'Build', 'Rescue', 'Consulting', 'Design']
