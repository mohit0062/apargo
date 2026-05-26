const fs = require('fs');
const path = require('path');
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');
const { createClient } = require('@supabase/supabase-js');

// Helper to manually parse .env and .env.local files in Node.js
function loadEnv() {
  // Load .env first, then override with .env.local to match Next.js priority
  const envPaths = [
    path.join(__dirname, '../.env'),
    path.join(__dirname, '../.env.local')
  ];

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split(/\r?\n/);
      for (const line of lines) {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const key = match[1];
          let value = (match[2] || '').trim();
          // Remove wrapping quotes if present
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1);
          } else if (value.startsWith("'") && value.endsWith("'")) {
            value = value.substring(1, value.length - 1);
          }
          process.env[key] = value;
        }
      }
      console.log(`Loaded environment variables from: ${path.basename(envPath)}`);
    }
  }
}

// Curated stock images
const PREMIUM_TECH_IMAGES = {
  ai_ml: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1200&q=80',
  cloud_devops: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
  web_mobile: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
  software_engineering: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80',
  product_design: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&q=80',
  whatsapp_automation: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&q=80',
  default: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&q=80'
};

const CATEGORY_IMAGE_MAP = {
  'AI & Machine Learning': 'ai_ml',
  'AI & ML': 'ai_ml',
  'Cloud & DevOps': 'cloud_devops',
  'Cloud Computing': 'cloud_devops',
  'Web Development': 'web_mobile',
  'Mobile App Development': 'web_mobile',
  'SaaS Development': 'software_engineering',
  'Engineering': 'software_engineering',
  'Software Development': 'software_engineering',
  'UI/UX Design': 'product_design',
  'Product Design': 'product_design',
  'WhatsApp Automation': 'whatsapp_automation',
  'AI Greentick': 'whatsapp_automation',
  'Marketing & SEO': 'default'
};

function calculateSeoScore(params) {
  let score = 0;
  const titleLower = params.title.toLowerCase();
  const descLower = params.description.toLowerCase();
  const contentLower = params.content.toLowerCase();
  const keywordLower = params.focusKeyword.toLowerCase();
  const metaTitleLower = params.metaTitle.toLowerCase();
  const metaDescLower = params.metaDescription.toLowerCase();

  if (titleLower.includes(keywordLower)) score += 20;
  if (metaDescLower.includes(keywordLower)) score += 15;

  const matches = contentLower.split(keywordLower).length - 1;
  if (matches >= 3) score += 20;
  else if (matches > 0) score += 10;

  const wordCount = params.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  if (wordCount >= 1000) score += 15;
  else if (wordCount >= 600) score += 10;

  if (contentLower.includes('<h2>') || contentLower.includes('<h3>')) score += 15;
  if (params.metaDescription.length >= 120 && params.metaDescription.length <= 160) score += 15;

  return Math.min(100, Math.max(40, score));
}

async function runTestGeneration() {
  loadEnv();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const awsRegion = process.env.AWS_REGION || 'us-east-1';
  const bedrockModelId = process.env.AWS_BEDROCK_MODEL_ID || 'anthropic.claude-3-5-sonnet-20241022-v2:0';

  if (!supabaseUrl || !supabaseKey || !awsAccessKeyId || !awsSecretAccessKey) {
    console.error('❌ Error: Missing required environment variables. Please check your .env file.');
    process.exit(1);
  }

  console.log('🤖 Initializing Supabase and Bedrock clients...');
  const supabase = createClient(supabaseUrl, supabaseKey);
  const bedrock = new BedrockRuntimeClient({
    region: awsRegion,
    credentials: {
      accessKeyId: awsAccessKeyId,
      secretAccessKey: awsSecretAccessKey,
    },
  });

  console.log('📚 Fetching existing blogs to avoid topic duplication...');
  const { data: existingBlogs, error: fetchErr } = await supabase
    .from('blogs')
    .select('title')
    .neq('status', 'trash')
    .limit(100);

  if (fetchErr) {
    console.warn('⚠️ Warning: Could not fetch existing blogs from Supabase:', fetchErr.message);
  }

  const existingTitles = (existingBlogs || []).map(b => b.title).join(', ');
  console.log(`Found ${existingBlogs ? existingBlogs.length : 0} active blogs.`);

  console.log(`✨ Invoking AWS Bedrock model: "${bedrockModelId}"...`);
  
  const systemPrompt = `You are a world-class Senior Developer Advocate, Tech Evangelist, and Professional Content Marketer for "Apargo" (an elite product engineering, custom software, SaaS development, and AI consulting agency).
You also build "AI Greentick" (a highly scalable, real-world WhatsApp Business Automation product for customer support & smart conversational chatbots).

Your job is to generate a highly technical, engaging, and professional tech blog post.

You MUST write the blog post using custom tag boundaries to encapsulate each field. Do NOT wrap in JSON or any other format. Return ONLY the fields inside these exact tags:

[TITLE] A highly engaging, click-worthy technical article title [/TITLE]
[DESCRIPTION] A compelling, high-converting summary of the article (1-2 sentences) to hook the reader. [/DESCRIPTION]
[SLUG] url-friendly-slug-separated-by-hyphens [/SLUG]
[CONTENT] A detailed, long-form (1200+ words) technical article written in clean HTML. Do NOT include <html> or <body> tags. Use <h2>, <h3>, <p>, <strong>, <ul>, <li>, and <blockquote> tags. Use proper spacing, code snippets formatted with pre/code tags if applicable, and deep engineering insights. [/CONTENT]
[CATEGORY] AI & Machine Learning | Web Development | Mobile App Development | SaaS Development | Cloud & DevOps | Product Design | WhatsApp Automation [/CATEGORY]
[TAGS] Tag1, Tag2, Tag3 [/TAGS]
[READ_TIME] Specify a value between "5 min read" and "10 min read" (e.g., 6 min read, 8 min read) based on content length [/READ_TIME]
[META_TITLE] SEO Optimized Meta Title (max 60 chars) [/META_TITLE]
[META_DESCRIPTION] SEO Optimized Meta Description (120-160 chars) [/META_DESCRIPTION]
[FOCUS_KEYWORD] A single primary keyword or phrase to optimize this article for [/FOCUS_KEYWORD]

Important Style Instructions:
- "Apargo" is senior-heavy, uses what it builds (AI Greentick is proof!), works on fixed quotes, ships fast, and handles full IP handovers.
- Avoid boring surface-level articles. Go deep into architectural patterns, technical solutions, scaling challenges, or strategic AI implementations.
- The HTML inside "content" must be exceptionally formatted. Use beautifully structured <h2> and <h3> headers, bulleted lists, and detailed explanations.
- The article must be highly SEO optimized: naturally integrate the focus keyword in the title, meta description, first paragraph, headings, and at least 3-4 times throughout the body content.
- DO NOT duplicate any of these existing blog post titles: [${existingTitles}]. Choose a fresh, highly relevant engineering topic.`;

  const userPrompt = `Generate a fresh, outstanding, long-form technical article for the Apargo blog.
Choose a trending topic in product engineering, AI deployment (like production RAG or open-source LLMs), mobile apps (React Native vs Swift/Kotlin), cloud cost optimization, scaling web platforms, or WhatsApp automation for businesses.

Ensure that the output strictly follows the custom tag structure.`;

  const payload = {
    anthropic_version: 'bedrock-2023-05-31',
    max_tokens: 4000,
    temperature: 0.7,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
  };

  try {
    const command = new InvokeModelCommand({
      modelId: bedrockModelId,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(payload),
    });

    const response = await bedrock.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    const textResponse = responseBody.content[0].text.trim();

    const parseTag = (tag) => {
      const regex = new RegExp(`\\[${tag}\\](.*?)\\[\\/${tag}\\]`, 'is');
      return textResponse.match(regex)?.[1]?.trim() || '';
    };

    const title = parseTag('TITLE') || 'Tech Insights from Apargo';
    const slug = (parseTag('SLUG') || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')).toLowerCase();
    const description = parseTag('DESCRIPTION') || '';
    const content = parseTag('CONTENT') || '';
    const category = parseTag('CATEGORY') || 'Engineering';
    const tagsString = parseTag('TAGS');
    const tags = tagsString ? tagsString.split(',').map(t => t.trim()).filter(Boolean) : ['Engineering'];
    const focusKeyword = parseTag('FOCUS_KEYWORD') || 'Engineering';
    const metaTitle = parseTag('META_TITLE') || `${title} | Apargo`;
    const metaDescription = parseTag('META_DESCRIPTION') || description.substring(0, 155);
    const readTime = parseTag('READ_TIME') || '5 min read';

    console.log('✅ Successfully received and parsed response from Claude!');
    console.log(`📌 Title: "${title}"`);
    console.log(`📌 Category: "${category}"`);
    console.log(`📌 Focus Keyword: "${focusKeyword}"`);

    const imageKey = CATEGORY_IMAGE_MAP[category] || 'default';
    const imageUrl = PREMIUM_TECH_IMAGES[imageKey];

    const seoScore = calculateSeoScore({
      title,
      description,
      content,
      focusKeyword,
      metaTitle,
      metaDescription
    });

    const authors = [
      { name: 'Mohit Sharma', role: 'Lead Product Architect', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mohit' },
      { name: 'Oliver Grayson', role: 'Chief Executive Officer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver' },
      { name: 'Lucas Bennett', role: 'UI/UX Design Director', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas' }
    ];
    const chosenAuthor = authors[Math.floor(Math.random() * authors.length)];

    const insertPayload = {
      title,
      slug,
      description,
      content,
      author: chosenAuthor.name,
      author_role: chosenAuthor.role,
      author_avatar: chosenAuthor.avatar,
      category,
      read_time: readTime,
      image_url: imageUrl,
      status: 'published',
      meta_title: metaTitle,
      meta_description: metaDescription,
      focus_keyword: focusKeyword,
      seo_score: seoScore,
      tags,
      categories: [category]
    };

    console.log('🚀 Uploading to Supabase "blogs" table...');
    const { data: insertedPost, error: insertError } = await supabase
      .from('blogs')
      .insert([insertPayload])
      .select()
      .single();

    if (insertError) {
      throw new Error(`Supabase insert failed: ${insertError.message}`);
    }

    console.log('🎉 SUCCESS! Blog post uploaded successfully.');
    console.log(`ID: ${insertedPost.id}`);
    console.log(`Slug: ${insertedPost.slug}`);
    console.log(`SEO Score: ${insertedPost.seo_score}/100`);
    console.log(`URL: /blog/${insertedPost.slug}`);

  } catch (error) {
    console.error('❌ Automation failed:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

runTestGeneration();
