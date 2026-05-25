import React from 'react'

export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

interface ServicePageSchemaProps {
  data: any
  serviceName: string
  fallbackDescription: string
}

export function ServicePageSchema({ data, serviceName, fallbackDescription }: ServicePageSchemaProps) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data?.hero?.subtitleText || serviceName,
    "description": data?.hero?.description || fallbackDescription,
    "provider": {
      "@type": "Organization",
      "name": "Apargo Innovations",
      "url": "https://www.apargoinnovations.com"
    }
  }

  const faqItems = data?.faqItems || []
  const faqSchema = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item: any) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null

  return (
    <>
      <JsonLd data={serviceSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
    </>
  )
}
