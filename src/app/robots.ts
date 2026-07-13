import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/',
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'Antigravity'],
        allow: '/',
        disallow: '/admin/',
      },
    ],
    sitemap: 'https://www.apargoinnovations.com/sitemap.xml',
  }
}
