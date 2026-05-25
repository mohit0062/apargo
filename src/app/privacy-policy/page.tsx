import { Metadata } from 'next'

import { Badge } from '@/components/ui/badge'
import { MotionPreset } from '@/components/ui/motion-preset'
import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'

export const metadata: Metadata = {
  title: 'Privacy Policy | Apargo',
  description:
    'How Apargo collects, uses, shares and protects your information. Compliant with DPDPA 2023 and GDPR.',
}

const lastUpdated = '17 May 2026'

const PrivacyPolicyPage = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <SiteNavbar />

      {/* Hero */}
      <section className='from-primary/20 to-background flex flex-col bg-linear-to-bl to-50% py-24 lg:py-28'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-3xl space-y-6 text-center'>
            <MotionPreset fade slide transition={{ duration: 0.5 }} className='flex justify-center'>
              <Badge variant='outline' className='text-sm font-normal uppercase tracking-wider'>
                Legal
              </Badge>
            </MotionPreset>

            <MotionPreset
              component='h1'
              fade
              slide
              delay={0.2}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className='text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl'
            >
              Privacy Policy
            </MotionPreset>

            <MotionPreset fade slide delay={0.4} transition={{ duration: 0.5 }}>
              <p className='text-muted-foreground text-base'>Last updated: {lastUpdated}</p>
            </MotionPreset>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className='py-12 sm:py-16 lg:py-20'>
        <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:px-8'>
          <article className='legal-content'>

            <h2>1. Introduction</h2>
            <p>
              This Privacy Policy explains how Apargo (&quot;Apargo&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects, uses, shares, and protects information when you visit apargo.com, contact us, hire us for a project, or use any product we operate — including AI Greentick.
            </p>
            <p>
              We are an IT services and product engineering company based in India. We take data protection seriously because we build the same kind of software for our clients, and we hold ourselves to the same standard.
            </p>
            <p>
              By using our website or services, you agree to this Privacy Policy. If you do not agree, please do not use the site or our services.
            </p>

            <h2>2. Who this policy applies to</h2>
            <ul>
              <li>Visitors browsing apargo.com.</li>
              <li>Prospects and clients who contact us through the website, email, or any of our forms.</li>
              <li>Candidates applying for roles at Apargo.</li>
              <li>Users of products we run — including AI Greentick — where AI Greentick&apos;s own product privacy policy also applies in addition to this one.</li>
              <li>Vendors, partners, and anyone else who shares information with us in the course of doing business.</li>
            </ul>

            <h2>3. Information we collect</h2>

            <h3>3.1 Information you give us directly</h3>
            <ul>
              <li><strong>Contact details</strong> — Name, email, phone number, company name, role, country.</li>
              <li><strong>Project details</strong> — Anything you share in a form, email, or call about the project you want us to build.</li>
              <li><strong>Career details</strong> — Resume, portfolio links, LinkedIn, work history, salary expectations, and anything else you submit when applying for a role.</li>
              <li><strong>Billing details</strong> — GST number, billing address, and payment-related information needed to invoice you. We do not store credit card numbers; payments are handled by our payment partners.</li>
              <li><strong>Account details</strong> — If you create an account on any of our products (like AI Greentick), the credentials and profile data you provide.</li>
            </ul>

            <h3>3.2 Information we collect automatically</h3>
            <ul>
              <li><strong>Usage data</strong> — Pages visited, time on page, referring URL, clicks, and similar analytics signals.</li>
              <li><strong>Device data</strong> — Browser type, operating system, device type, screen size, language.</li>
              <li><strong>Approximate location</strong> — Derived from your IP address (city/country level), not precise GPS location.</li>
              <li><strong>Cookies and similar tech</strong> — See our <a href='/cookie-policy'>Cookie Policy</a> for details.</li>
            </ul>

            <h3>3.3 Information from third parties</h3>
            <ul>
              <li><strong>Authentication providers</strong> — If you sign in using Google, Microsoft, or similar, we receive the basic profile info those services share.</li>
              <li><strong>Public sources</strong> — Public LinkedIn or company-website information, when we research a prospect or candidate.</li>
              <li><strong>Referrals</strong> — If a partner or existing client refers you to us, they may share your contact details.</li>
            </ul>

            <h2>4. How we use your information</h2>
            <p>We use the data we collect to do the following, and only the following:</p>
            <ul>
              <li>Respond to your enquiries and provide quotes, proposals, and contracts.</li>
              <li>Deliver the services you have hired us for — including communicating with you during the project.</li>
              <li>Operate, maintain, and improve our website and our products.</li>
              <li>Process payments and send invoices.</li>
              <li>Send service updates, security alerts, and account-related messages.</li>
              <li>Send marketing emails — only if you have opted in. You can unsubscribe at any time using the link in the email.</li>
              <li>Evaluate job applications and run our hiring process.</li>
              <li>Detect and prevent fraud, abuse, and security incidents.</li>
              <li>Comply with our legal and tax obligations.</li>
            </ul>

            <h2>5. Legal basis for processing (for GDPR users)</h2>
            <p>If you are in the EU or UK, we process your personal data on one or more of the following legal bases:</p>
            <ul>
              <li><strong>Contract</strong> — We need the data to deliver the service you have hired us for.</li>
              <li><strong>Legitimate interests</strong> — Running our business, securing our systems, and improving our products, balanced against your rights.</li>
              <li><strong>Consent</strong> — For marketing emails, optional cookies, and anything else you have explicitly opted in to.</li>
              <li><strong>Legal obligation</strong> — Tax, accounting, and other regulatory requirements.</li>
            </ul>

            <h2>6. Who we share data with</h2>
            <p>We do not sell your data. We share it only with the categories of recipients below, and only to the extent needed to run our business:</p>
            <ul>
              <li><strong>Service providers</strong> — Cloud hosting, email, analytics, CRM, payment processing, error monitoring, and similar tools. These providers act as our data processors and are bound by contract to protect your data.</li>
              <li><strong>Sub-contractors</strong> — If we engage a vetted contractor to help on your project, they get only the data they need and are bound by an NDA.</li>
              <li><strong>Professional advisors</strong> — Lawyers, accountants, auditors, when required.</li>
              <li><strong>Regulators and authorities</strong> — When we are legally required to disclose.</li>
              <li><strong>Acquirers</strong> — If Apargo is ever involved in a merger, acquisition, or asset sale, your data may be transferred — and you will be notified.</li>
            </ul>

            <h2>7. International data transfers</h2>
            <p>
              We are based in India. The services we use may host data in India, the United States, the European Union, and other regions. Where data crosses borders, we rely on standard contractual clauses or equivalent safeguards offered by the underlying providers.
            </p>

            <h2>8. How long we keep your data</h2>
            <ul>
              <li><strong>Contact and project data</strong> — Kept for the duration of our relationship and up to 7 years after, to meet legal, tax, and audit requirements.</li>
              <li><strong>Marketing data</strong> — Until you unsubscribe or ask us to delete it.</li>
              <li><strong>Candidate data</strong> — Up to 12 months after the role closes, unless you ask us to delete it sooner.</li>
              <li><strong>Product account data</strong> — As long as your account is active, plus the retention window described in the relevant product&apos;s policy.</li>
              <li><strong>Analytics data</strong> — Aggregated and de-identified after the standard retention period of the underlying tool.</li>
            </ul>

            <h2>9. Your rights</h2>
            <p>Depending on where you live, you may have the following rights regarding your personal data:</p>
            <ul>
              <li><strong>Access</strong> — Ask for a copy of the data we hold about you.</li>
              <li><strong>Correction</strong> — Ask us to fix data that is wrong or out of date.</li>
              <li><strong>Deletion</strong> — Ask us to delete your data, subject to legal retention requirements.</li>
              <li><strong>Restriction</strong> — Ask us to stop using your data while we resolve a concern.</li>
              <li><strong>Objection</strong> — Object to processing based on our legitimate interests.</li>
              <li><strong>Portability</strong> — Get your data in a structured, machine-readable format.</li>
              <li><strong>Withdraw consent</strong> — Where we rely on consent, you can withdraw it at any time.</li>
              <li><strong>Complaint</strong> — If you are in the EU/UK, you can complain to your local data protection authority. In India, you can approach the Data Protection Board under the DPDPA.</li>
            </ul>
            <p>
              To exercise any of these rights, email us at{' '}
              <a href='mailto:privacy@apargo.com'>privacy@apargo.com</a>. We will respond within 30 days.
            </p>

            <h2>10. Security</h2>
            <p>We protect your data with reasonable technical and organisational measures:</p>
            <ul>
              <li>HTTPS everywhere on apargo.com and our products.</li>
              <li>Encrypted storage and encrypted backups for production data.</li>
              <li>Role-based access control and least-privilege access for team members.</li>
              <li>Regular dependency updates and security reviews.</li>
              <li>NDAs and security training for everyone who handles client or user data.</li>
            </ul>
            <p>
              No system is perfectly secure. If we ever become aware of a breach that affects your data, we will notify you and the relevant authorities as required by law.
            </p>

            <h2>11. Children</h2>
            <p>
              Our website and services are not directed at children under 18. We do not knowingly collect personal data from children. If you believe a child has shared data with us, contact{' '}
              <a href='mailto:privacy@apargo.com'>privacy@apargo.com</a> and we will delete it.
            </p>

            <h2>12. Third-party links</h2>
            <p>
              Our website may link to third-party sites — for example, blog references, partner pages, or our product pages. Those sites have their own privacy policies. We are not responsible for how they handle your data.
            </p>

            <h2>13. AI Greentick and other products</h2>
            <p>
              AI Greentick is a product operated by Apargo. When you use AI Greentick, the AI Greentick product privacy policy applies in addition to this one. If there is any conflict, the product-specific policy controls for that product.
            </p>

            <h2>14. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy as our services and the law evolve. The &quot;Last updated&quot; date at the top of this page always reflects the most recent version. For material changes, we will give you reasonable notice — for example, by email or by a notice on the website — before the change takes effect.
            </p>

            <h2>15. Contact us</h2>
            <p>
              If you have any questions about this Privacy Policy or how we handle your data, please reach out:
            </p>
            <ul>
              <li><strong>Email</strong> — <a href='mailto:privacy@apargo.com'>privacy@apargo.com</a></li>
              <li><strong>Postal address</strong> — Apargo, Jaipur, Rajasthan, India</li>
            </ul>

          </article>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PrivacyPolicyPage
