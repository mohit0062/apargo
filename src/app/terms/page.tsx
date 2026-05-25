import { Metadata } from 'next'

import { Badge } from '@/components/ui/badge'
import { MotionPreset } from '@/components/ui/motion-preset'
import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'

export const metadata: Metadata = {
  title: 'Terms of Service | Apargo',
  description:
    'Terms of Service governing use of apargo.com and engagement of Apargo for IT services and product engineering.',
}

const lastUpdated = '17 May 2026'

const TermsPage = () => {
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
              Terms of Service
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

            <h2>1. Agreement</h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) form a binding agreement between you and Apargo (&quot;Apargo&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;). They govern your use of apargo.com (the &quot;Site&quot;), our communications, and any services we provide unless a signed Master Services Agreement (MSA) or Statement of Work (SOW) says otherwise — in which case that signed document controls.
            </p>
            <p>
              By using the Site or engaging us for services, you confirm that you accept these Terms. If you are accepting on behalf of a company, you confirm you have the authority to bind that company.
            </p>

            <h2>2. Who we are</h2>
            <ul>
              <li><strong>Legal name</strong> — Apargo</li>
              <li><strong>Registered office</strong> — Jaipur, Rajasthan, India</li>
              <li><strong>Contact</strong> — <a href='mailto:hello@apargo.com'>hello@apargo.com</a></li>
            </ul>

            <h2>3. Use of the website</h2>
            <p>
              You may use the Site to learn about our services, contact us, read our blog, and apply for roles. You agree not to:
            </p>
            <ul>
              <li>Use the Site for any unlawful purpose.</li>
              <li>Attempt to break, probe, or reverse-engineer the Site or any of our systems.</li>
              <li>Scrape, copy, or republish our content without written permission, beyond normal browsing.</li>
              <li>Use automated tools to flood our forms or send spam.</li>
              <li>Impersonate anyone or misrepresent your affiliation with any person or organisation.</li>
            </ul>
            <p>We may suspend or block access if we believe you are violating these rules.</p>

            <h2>4. Services and engagement</h2>
            <p>When you hire Apargo for a project, the following applies in addition to these Terms:</p>
            <ul>
              <li><strong>Statement of Work (SOW)</strong> — The specific scope, deliverables, timelines, team, and price are written in an SOW signed by both sides.</li>
              <li><strong>Engagement models</strong> — We offer fixed-scope, dedicated team, and staff augmentation models. The SOW will state which one applies.</li>
              <li><strong>Change requests</strong> — Any change to scope, timeline, or team is captured in a written change request, signed by both sides, before work begins on it.</li>
              <li><strong>Acceptance</strong> — Deliverables are considered accepted after the review period stated in the SOW, unless you give written feedback within that period.</li>
            </ul>

            <h2>5. Your responsibilities</h2>
            <p>To help us deliver well, you agree to:</p>
            <ul>
              <li>Give us timely access to the information, accounts, assets, and decision-makers we need.</li>
              <li>Respond to questions and review requests within the timelines we agree on.</li>
              <li>Make sure any content, data, or third-party material you share with us is yours to share.</li>
              <li>Pay our invoices on time per the payment terms in the SOW.</li>
            </ul>

            <h2>6. Fees and payment</h2>
            <ul>
              <li><strong>Pricing</strong> — Stated in the SOW. Unless otherwise written, all amounts are in Indian Rupees (INR) or US Dollars (USD) and exclusive of taxes.</li>
              <li><strong>Invoicing</strong> — We invoice as per the schedule in the SOW — typically monthly for retainers and milestone-based for fixed-scope projects.</li>
              <li><strong>Payment terms</strong> — Net 15 days from invoice date, unless otherwise agreed in writing.</li>
              <li><strong>Late payments</strong> — If an invoice is overdue by more than 15 days, we may pause work and charge interest at the maximum rate allowed by law.</li>
              <li><strong>Taxes</strong> — You are responsible for any applicable taxes (GST, VAT, withholding) other than taxes on our income.</li>
              <li><strong>Refunds</strong> — Fees for work already performed are non-refundable. If a milestone is rejected for failing acceptance criteria, we fix it at our cost.</li>
            </ul>

            <h2>7. Intellectual property</h2>

            <h3>7.1 Client work product</h3>
            <p>
              Upon full payment of all amounts due, you own the deliverables we create specifically for you under the SOW, including custom code, designs, and documentation. Until full payment, we retain ownership.
            </p>

            <h3>7.2 Pre-existing materials and Apargo tools</h3>
            <p>
              We may use frameworks, libraries, internal tools, and code patterns we developed before or outside your project. We grant you a perpetual, worldwide, royalty-free licence to use those pre-existing materials as embedded in your deliverables — but we keep ownership of the underlying materials themselves.
            </p>

            <h3>7.3 Open-source components</h3>
            <p>
              Your project may include open-source software covered by its own licence. Those licences apply on top of these Terms.
            </p>

            <h3>7.4 Apargo brand</h3>
            <p>
              All Apargo brand assets — name, logo, website content, case studies, blog posts — remain our property. You may reference your relationship with Apargo factually, but you may not use our brand for endorsement or marketing without written permission. Similarly, we may reference our work for you in our portfolio and case studies unless your SOW says otherwise.
            </p>

            <h3>7.5 Our products</h3>
            <p>
              AI Greentick and any other products we operate remain entirely owned by Apargo. Using those products is governed by the product&apos;s own terms of use, not by these Terms or by an SOW for services.
            </p>

            <h2>8. Confidentiality</h2>
            <p>
              Both sides agree to keep each other&apos;s confidential information confidential — including business plans, source code, financials, customer lists, and anything reasonably understood to be private. We will sign a separate NDA on request, and otherwise treat your information as confidential by default.
            </p>
            <p>
              Confidentiality obligations survive the end of the engagement for 3 years, or longer if required by law.
            </p>

            <h2>9. Warranties</h2>
            <p>We warrant that:</p>
            <ul>
              <li>We will perform services in a professional manner consistent with industry standards.</li>
              <li>We have the authority to enter into this agreement and to deliver the services described in the SOW.</li>
              <li>To the best of our knowledge, our deliverables do not knowingly infringe a third party&apos;s IP rights (excluding any materials you provided to us).</li>
            </ul>
            <p>
              Other than these warranties, services are provided &quot;as is&quot;. We disclaim all other warranties, express or implied, including implied warranties of merchantability and fitness for a particular purpose.
            </p>

            <h2>10. Limitation of liability</h2>
            <p>To the maximum extent permitted by law:</p>
            <ul>
              <li>Neither party is liable for indirect, incidental, special, consequential, or punitive damages — including lost profits, lost data, or business interruption — even if advised of the possibility.</li>
              <li>Each party&apos;s total aggregate liability under this agreement is capped at the total fees you have paid to Apargo for the services giving rise to the claim, in the 12 months before the claim arose.</li>
            </ul>
            <p>
              These limits do not apply to liability for fraud, gross negligence, breach of confidentiality, or any liability that cannot legally be limited.
            </p>

            <h2>11. Indemnity</h2>
            <p>
              Each side will defend and indemnify the other against third-party claims caused by its own gross negligence, wilful misconduct, breach of confidentiality, or IP infringement of materials it provided — subject to prompt notice, sole control of defence by the indemnifying party, and the liability cap above.
            </p>

            <h2>12. Term and termination</h2>
            <ul>
              <li><strong>Term</strong> — Each engagement runs for the duration set in the SOW.</li>
              <li><strong>Termination for convenience</strong> — Either side may terminate an engagement with 30 days&apos; written notice, unless the SOW says otherwise. You pay for all work performed up to the effective termination date.</li>
              <li><strong>Termination for cause</strong> — Either side may terminate immediately if the other materially breaches the agreement and fails to cure within 15 days of written notice.</li>
              <li><strong>Effect of termination</strong> — We will return or destroy your confidential information on request. Unpaid amounts become immediately due.</li>
            </ul>

            <h2>13. Force majeure</h2>
            <p>
              Neither side is liable for delay or failure caused by events beyond reasonable control — including natural disasters, war, civil unrest, internet or power failures at the regional level, and government actions — so long as the affected party gives prompt notice and works in good faith to resume performance.
            </p>

            <h2>14. Governing law and dispute resolution</h2>
            <p>These Terms are governed by the laws of India, without regard to conflict-of-law principles.</p>
            <p>
              Any dispute will first be addressed through good-faith discussions between authorised representatives of both sides. If not resolved within 30 days, the dispute will be referred to arbitration in Jaipur, Rajasthan, under the Arbitration and Conciliation Act, 1996. The arbitration will be conducted in English by a single arbitrator. Subject to that, the courts in Jaipur have exclusive jurisdiction.
            </p>

            <h2>15. Notices</h2>
            <p>
              Formal notices must be in writing and sent to <a href='mailto:hello@apargo.com'>hello@apargo.com</a> (for Apargo) and to the email of record on your most recent SOW (for you). Notices are deemed received on the next business day.
            </p>

            <h2>16. Miscellaneous</h2>
            <ul>
              <li><strong>Independent contractor</strong> — We are an independent contractor. Nothing in these Terms creates a partnership, joint venture, or employment relationship.</li>
              <li><strong>Assignment</strong> — Neither side may assign these Terms without the other&apos;s written consent, except to a successor in a merger or sale of substantially all assets.</li>
              <li><strong>Entire agreement</strong> — These Terms, plus any signed MSA and SOW, are the entire agreement between us and supersede earlier discussions on the same subject.</li>
              <li><strong>Severability</strong> — If any clause is unenforceable, the rest of the agreement remains in force.</li>
              <li><strong>No waiver</strong> — Not enforcing a right at one point does not waive it later.</li>
            </ul>

            <h2>17. Changes to these Terms</h2>
            <p>
              We may update these Terms from time to time. The &quot;Last updated&quot; date at the top reflects the latest version. For material changes that affect ongoing engagements, we will give you reasonable advance notice. Your continued use of the Site or services after the change means you accept the updated Terms.
            </p>

            <h2>18. Contact</h2>
            <p>Questions about these Terms? Reach us at:</p>
            <ul>
              <li><strong>Email</strong> — <a href='mailto:legal@apargo.com'>legal@apargo.com</a></li>
              <li><strong>Postal address</strong> — Apargo, Jaipur, Rajasthan, India</li>
            </ul>

          </article>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default TermsPage
