import { Metadata } from 'next'

import { Badge } from '@/components/ui/badge'
import { MotionPreset } from '@/components/ui/motion-preset'
import SiteNavbar from '@/components/site-navbar'
import Footer from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'

export const metadata: Metadata = {
  title: 'Cookie Policy | Apargo',
  description:
    'What cookies Apargo uses on apargo.com, why, and how you can control them. Works alongside our Privacy Policy.',
}

const lastUpdated = '17 May 2026'

const CookiePolicyPage = () => {
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
              Cookie Policy
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

            <h2>1. What this policy covers</h2>
            <p>
              This Cookie Policy explains what cookies and similar tracking technologies we use on apargo.com, why we use them, and how you can control them. It works alongside our <a href='/privacy-policy'>Privacy Policy</a>.
            </p>
            <p>
              If you have read a hundred cookie banners and tuned them out — fair. This page tries to be the one that actually tells you what is going on.
            </p>

            <h2>2. What are cookies?</h2>
            <p>
              Cookies are small text files that a website stores on your device when you visit. They let the site remember things between visits — like whether you are logged in, what language you prefer, or which pages you have already seen.
            </p>
            <p>
              We also use similar technologies like local storage, pixels, and tags. For simplicity, we refer to all of these as &quot;cookies&quot; in this policy.
            </p>

            <h2>3. Types of cookies we use</h2>

            <h3>3.1 Strictly necessary cookies</h3>
            <p>
              These cookies are required for the website to work. They cannot be turned off in our systems. They are usually set in response to actions you take, like submitting a form, setting your privacy preferences, or signing in.
            </p>
            <ul>
              <li><strong>Examples</strong> — Session cookies, security cookies, load balancer cookies.</li>
              <li><strong>Consent</strong> — Not required, because the site cannot function without them.</li>
            </ul>

            <h3>3.2 Performance and analytics cookies</h3>
            <p>
              These help us understand how visitors use the site — which pages are popular, where people drop off, which campaigns bring traffic — so we can improve it. The data is aggregated and does not identify you personally.
            </p>
            <ul>
              <li><strong>Examples</strong> — Google Analytics, Plausible, or similar privacy-aware analytics.</li>
              <li><strong>Consent</strong> — Required in the EU/UK and recommended in India under DPDPA. Off by default until you opt in.</li>
            </ul>

            <h3>3.3 Functional cookies</h3>
            <p>
              These enable extra features on the site — for example, remembering that you closed a banner, or that you prefer a dark theme.
            </p>
            <ul>
              <li><strong>Examples</strong> — Preference cookies set by our own code.</li>
              <li><strong>Consent</strong> — Required where the cookie is non-essential.</li>
            </ul>

            <h3>3.4 Marketing and advertising cookies</h3>
            <p>
              These let us measure how our marketing performs and show relevant ads on other sites. We use these sparingly — typically only LinkedIn Insight, Meta Pixel, or Google Ads conversion tracking, and only if we are actively running a campaign.
            </p>
            <ul>
              <li><strong>Examples</strong> — LinkedIn Insight Tag, Meta Pixel, Google Ads tags.</li>
              <li><strong>Consent</strong> — Required. Off by default until you opt in.</li>
            </ul>

            <h3>3.5 Embedded content cookies</h3>
            <p>
              Pages that embed third-party content — for example, a YouTube video, a Loom recording, or a Google Map — may set cookies from those services. We do not control those cookies. Check the third party&apos;s own policy.
            </p>

            <h2>4. Third-party cookies</h2>
            <p>
              Some cookies are set by services we use, not by Apargo directly. Examples of services that may set cookies through our site:
            </p>
            <ul>
              <li>Google (Analytics, Ads, Tag Manager)</li>
              <li>LinkedIn (Insight Tag)</li>
              <li>Meta / Facebook (Pixel)</li>
              <li>YouTube and Vimeo (for embedded videos)</li>
              <li>Calendly or similar booking tools (if embedded on a page)</li>
              <li>Live chat or support widgets (if embedded)</li>
            </ul>
            <p>
              Each of these has its own privacy and cookie policy, which you can read on their websites.
            </p>

            <h2>5. How long cookies stay</h2>
            <ul>
              <li><strong>Session cookies</strong> — Deleted when you close your browser.</li>
              <li><strong>Persistent cookies</strong> — Stay on your device for a set period — typically a few days to two years, depending on the cookie.</li>
            </ul>
            <p>
              We do not use cookies that last longer than is necessary for the purpose described.
            </p>

            <h2>6. How you can control cookies</h2>

            <h3>6.1 On apargo.com</h3>
            <p>When you first visit, you will see a cookie banner. You can:</p>
            <ul>
              <li><strong>Accept all</strong> — Let us set all categories of cookies.</li>
              <li><strong>Reject non-essential</strong> — Use only strictly necessary cookies.</li>
              <li><strong>Customise</strong> — Choose category by category which cookies you allow.</li>
            </ul>
            <p>
              You can change your choices at any time by clicking &quot;Cookie settings&quot; in the footer.
            </p>

            <h3>6.2 In your browser</h3>
            <p>Most browsers let you view, block, or delete cookies. Look in:</p>
            <ul>
              <li><strong>Chrome</strong> — Settings → Privacy and security → Cookies and other site data.</li>
              <li><strong>Firefox</strong> — Settings → Privacy &amp; Security → Cookies and Site Data.</li>
              <li><strong>Safari</strong> — Preferences → Privacy.</li>
              <li><strong>Edge</strong> — Settings → Cookies and site permissions.</li>
            </ul>
            <p>
              Blocking all cookies may make parts of the site stop working — especially anything that requires you to be signed in.
            </p>

            <h3>6.3 Do Not Track and Global Privacy Control</h3>
            <p>
              Where supported by your browser, we honour Global Privacy Control (GPC) signals as a request to opt out of non-essential cookies.
            </p>

            <h2>7. Cookies on AI Greentick and other products</h2>
            <p>
              Our products — including AI Greentick — have their own cookie policies. When you use those products, the product&apos;s policy applies in addition to or instead of this one, depending on the context. Always check the product&apos;s own cookie settings.
            </p>

            <h2>8. Changes to this policy</h2>
            <p>
              We may update this Cookie Policy when we change the cookies we use or when the law changes. The &quot;Last updated&quot; date at the top of the page reflects the current version. For material changes, we will refresh the cookie banner so you can re-confirm your preferences.
            </p>

            <h2>9. Contact</h2>
            <p>Questions about cookies or how to control them? Reach out:</p>
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

export default CookiePolicyPage
