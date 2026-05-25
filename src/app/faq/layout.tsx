import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Apargo',
  description:
    "Common questions about Apargo's IT services, products, pricing, engagement models and team.",
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children
}
