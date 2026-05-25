'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft, 
  Loader2, 
  Image as ImageIcon, 
  Sparkles, 
  Eye, 
  Laptop, 
  Smartphone, 
  CheckCircle2, 
  XCircle, 
  Tags, 
  Globe,
  Settings,
  ChevronRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Maximize2,
  Minimize2
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BlogFormProps {
  initialData?: {
    id?: string
    title: string
    slug: string
    description: string
    content: string
    author: string
    author_role: string
    author_avatar: string
    category: string
    read_time: string
    image_url: string
    status?: string
    meta_title?: string
    meta_description?: string
    focus_keyword?: string
    seo_score?: number
    tags?: string[]
    categories?: string[]
  }
  onSubmitAction: (formData: FormData) => Promise<{ error?: string } | void>
  title: string
  description: string
}

export default function BlogForm({
  initialData,
  onSubmitAction,
  title,
  description,
}: BlogFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // SEO Snippet Preview Mode (Desktop / Mobile)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop')

  // WYSIWYG Visual Editor States
  const [editorMode, setEditorMode] = useState<'visual' | 'code'>('visual')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeBlockFormat, setActiveBlockFormat] = useState('<p>')
  const editorRef = useRef<HTMLDivElement>(null)

  // Form State
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    content: initialData?.content || '',
    author: initialData?.author || 'Mohit Sharma',
    author_role: initialData?.author_role || 'Lead Engineer',
    author_avatar: initialData?.author_avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mohit',
    category: initialData?.category || 'Engineering',
    read_time: initialData?.read_time || '5 min read',
    image_url: initialData?.image_url || 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-25.png',
    
    // WordPress & SEO properties
    status: initialData?.status || 'published',
    meta_title: initialData?.meta_title || '',
    meta_description: initialData?.meta_description || '',
    focus_keyword: initialData?.focus_keyword || '',
    seo_score: initialData?.seo_score || 0,
  })

  // Tags State
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])

  // Categories State
  const [categoryInput, setCategoryInput] = useState('')
  const [categories, setCategories] = useState<string[]>(
    initialData?.categories || (initialData?.category ? [initialData.category] : ['Engineering'])
  )

  // Real-time SEO checklist states
  const [seoScore, setSeoScore] = useState(0)
  const [seoChecks, setSeoChecks] = useState({
    keywordInTitle: false,
    keywordInSlug: false,
    keywordInDescription: false,
    keywordInContent: false,
    keywordAtStartOfContent: false,
    idealMetaTitle: false,
    idealMetaDescription: false,
    contentLength: 0,
    hasLinks: false,
  })

  // Auto-generate slug from title (only for new blogs)
  useEffect(() => {
    if (!initialData && formData.title) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // remove special chars
        .replace(/\s+/g, '-')         // replace spaces with dashes
        .replace(/-+/g, '-')          // replace multiple dashes with single
        .trim()
      setFormData(prev => ({ ...prev, slug: generatedSlug }))
    }
  }, [formData.title, initialData])

  // Run SEO Analysis on content changes
  useEffect(() => {
    const keyword = formData.focus_keyword.trim().toLowerCase()
    const content = formData.content || ''
    const title = formData.title || ''
    const slug = formData.slug || ''
    const desc = formData.description || ''
    const metaTitle = formData.meta_title || ''
    const metaDesc = formData.meta_description || ''

    // Word Count calculation (strip HTML tags first for accurate count)
    const cleanContent = content.replace(/<\/?[^>]+(>|$)/g, "")
    const words = cleanContent.trim() ? cleanContent.trim().split(/\s+/).length : 0

    if (!keyword) {
      setSeoScore(0)
      setSeoChecks({
        keywordInTitle: false,
        keywordInSlug: false,
        keywordInDescription: false,
        keywordInContent: false,
        keywordAtStartOfContent: false,
        idealMetaTitle: false,
        idealMetaDescription: false,
        contentLength: words,
        hasLinks: false,
      })
      return
    }

    // Rules matching
    const keywordInTitle = title.toLowerCase().includes(keyword)
    
    // Slug friendly keyword
    const urlKeyword = keyword.replace(/\s+/g, '-')
    const keywordInSlug = slug.toLowerCase().includes(urlKeyword) || slug.toLowerCase().includes(keyword)

    const keywordInDescription = desc.toLowerCase().includes(keyword)
    const keywordInContent = content.toLowerCase().includes(keyword)
    
    // Check first 150 chars of content for keyword
    const keywordAtStartOfContent = content.toLowerCase().slice(0, 300).includes(keyword)

    const idealMetaTitle = metaTitle.length >= 45 && metaTitle.length <= 65
    const idealMetaDescription = metaDesc.length >= 110 && metaDesc.length <= 165

    const hasLinks = content.includes('<a ') || content.includes('href=')

    // Scoring computation
    let score = 0
    if (keywordInTitle) score += 20
    if (keywordInSlug) score += 15
    if (keywordInDescription) score += 15
    if (keywordInContent) score += 15
    if (keywordAtStartOfContent) score += 10
    if (idealMetaTitle && idealMetaDescription) score += 10
    else if (idealMetaTitle || idealMetaDescription) score += 5
    
    // Length points
    if (words >= 600) score += 15
    else if (words >= 300) score += 10
    else if (words >= 100) score += 5

    if (hasLinks) score += 5

    setSeoScore(score)
    setSeoChecks({
      keywordInTitle,
      keywordInSlug,
      keywordInDescription,
      keywordInContent,
      keywordAtStartOfContent,
      idealMetaTitle,
      idealMetaDescription,
      contentLength: words,
      hasLinks,
    })
  }, [
    formData.title,
    formData.slug,
    formData.description,
    formData.content,
    formData.focus_keyword,
    formData.meta_title,
    formData.meta_description
  ])

  // Sync computed score to formData so it gets submitted
  useEffect(() => {
    setFormData(prev => ({ ...prev, seo_score: seoScore }))
  }, [seoScore])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // WYSIWYG Visual Editor Sync & Actions
  useEffect(() => {
    if (editorMode === 'visual' && editorRef.current) {
      if (editorRef.current.innerHTML !== formData.content) {
        editorRef.current.innerHTML = formData.content
      }
    }
  }, [editorMode, formData.content])

  const handleVisualInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML
      setFormData(prev => ({ ...prev, content: html }))
    }
  }

  const execCommand = (command: string, value: string = '') => {
    if (editorMode !== 'visual') return
    editorRef.current?.focus()
    document.execCommand(command, false, value)
    handleVisualInput()
  }

  const handleBlockFormat = (format: string) => {
    execCommand('formatBlock', format)
  }

  const handleInsertLink = () => {
    const url = prompt('Enter the link URL (e.g. https://google.com):')
    if (url) {
      execCommand('createLink', url)
    }
  }

  const handleAddMedia = () => {
    const url = prompt('Enter Image URL:')
    if (url) {
      const alt = prompt('Enter Image Alt Description:', 'Blog media image')
      const imgHtml = `<figure class="my-4 overflow-hidden rounded-xl border bg-background shadow-lg"><img src="${url}" alt="${alt || ''}" class="w-full object-cover max-h-[450px]" /><figcaption class="text-center text-xs text-muted-foreground mt-2">${alt || ''}</figcaption></figure><p>&nbsp;</p>`
      execCommand('insertHTML', imgHtml)
    }
  }

  // Tags actions
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const val = tagInput.trim().replace(/,$/, '')
      if (val && !tags.includes(val)) {
        setTags(prev => [...prev, val])
      }
      setTagInput('')
    }
  }

  const removeTag = (indexToRemove: number) => {
    setTags(prev => prev.filter((_, idx) => idx !== indexToRemove))
  }

  // Categories actions
  const handleCategoryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const val = categoryInput.trim().replace(/,$/, '')
      if (val && !categories.includes(val)) {
        setCategories(prev => [...prev, val])
        // Update main category if it's the first one
        if (categories.length === 0) {
          setFormData(prev => ({ ...prev, category: val }))
        }
      }
      setCategoryInput('')
    }
  }

  const removeCategory = (indexToRemove: number) => {
    const updated = categories.filter((_, idx) => idx !== indexToRemove)
    setCategories(updated)
    if (updated.length > 0) {
      setFormData(prev => ({ ...prev, category: updated[0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const rawFormData = new FormData()
      
      // Append main fields
      Object.entries(formData).forEach(([key, val]) => {
        rawFormData.append(key, String(val))
      })

      // Append Tags and Categories as comma-separated strings
      rawFormData.append('tags', tags.join(','))
      rawFormData.append('categories', categories.join(','))

      const res = await onSubmitAction(rawFormData)
      if (res && res.error) {
        setError(res.error)
        setIsSubmitting(false)
      } else {
        router.push('/admin/blogs')
        router.refresh()
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please check your connection.')
      setIsSubmitting(false)
    }
  }

  // Visual helper for SEO Score Color
  const getScoreColor = (score: number) => {
    if (score >= 81) return 'text-emerald-500 stroke-emerald-500 border-emerald-500/20 bg-emerald-500/10'
    if (score >= 51) return 'text-amber-500 stroke-amber-500 border-amber-500/20 bg-amber-500/10'
    return 'text-destructive stroke-destructive border-destructive/20 bg-destructive/10'
  }

  const getScoreText = (score: number) => {
    if (score >= 81) return 'Excellent SEO'
    if (score >= 51) return 'Good SEO'
    if (formData.focus_keyword ? false : true) return 'Keyword Empty'
    return 'Needs SEO Review'
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-5">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blogs"
            className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
        
        {/* Real-time SEO Score Quick pill */}
        <div className={cn(
          "flex items-center gap-2.5 rounded-full px-4 py-2 border font-medium text-sm transition-all",
          getScoreColor(seoScore)
        )}>
          <Sparkles className="h-4 w-4 animate-pulse" />
          <span>SEO Score: <strong>{formData.focus_keyword ? seoScore : 'N/A'}/100</strong> ({getScoreText(seoScore)})</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
        {/* Left Columns (Main Content & SEO Tool) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Post Content */}
          <Card className="shadow-sm border">
            <CardHeader className="pb-3">
              <CardTitle>Article Editor</CardTitle>
              <CardDescription>
                Craft your blog post content and define the URL parameters.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="rounded-lg bg-destructive/15 p-3.5 text-sm text-destructive font-medium border border-destructive/20">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="title">Post Title</Label>
                <Input
                  id="title"
                  name="title"
                  required
                  placeholder="e.g. Scaling Next.js Apps with Supabase"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="h-11 text-base font-semibold focus-visible:ring-primary"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="slug" className="flex items-center gap-1.5">
                    URL Slug
                    <span className="text-[10px] text-muted-foreground font-normal bg-muted px-1.5 py-0.5 rounded">(Auto-generated)</span>
                  </Label>
                  <Input
                    id="slug"
                    name="slug"
                    required
                    placeholder="e.g. scaling-nextjs-apps-with-supabase"
                    value={formData.slug}
                    onChange={handleInputChange}
                    className="h-10 font-mono text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="read_time">Estimated Read Time</Label>
                  <Input
                    id="read_time"
                    name="read_time"
                    required
                    placeholder="e.g. 5 min read"
                    value={formData.read_time}
                    onChange={handleInputChange}
                    className="h-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Summary / Excerpt</Label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  placeholder="Briefly describe what this article is about (used in blog feeds)..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="h-20 resize-none leading-relaxed"
                  maxLength={350}
                />
              </div>

              <div className={cn(
                "space-y-2 relative transition-all duration-300",
                isFullscreen ? "fixed inset-0 z-[100] bg-background p-6 overflow-y-auto" : ""
              )}>
                <div className="flex justify-between items-center">
                  <Label htmlFor="content" className="flex justify-between items-center w-full">
                    <span className="text-sm font-semibold text-foreground">Article Content</span>
                    <span className="text-xs text-muted-foreground font-mono bg-muted/60 px-2 py-0.5 rounded">
                      Words: {seoChecks.contentLength}
                    </span>
                  </Label>
                </div>

                {/* Editor Container */}
                <div className="border rounded-xl bg-background shadow-sm overflow-hidden flex flex-col min-h-[450px]">
                  {/* Top Bar: Add Media and Tabs */}
                  <div className="flex justify-between items-center px-4 py-2.5 bg-muted/20 border-b select-none">
                    {/* Add Media button */}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddMedia}
                      disabled={editorMode !== 'visual'}
                      className="h-8 text-xs font-semibold flex items-center gap-1.5 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                    >
                      <ImageIcon className="h-3.5 w-3.5" />
                      Add Media
                    </Button>

                    {/* Editor Tabs switch */}
                    <div className="flex bg-muted p-0.5 rounded-lg border">
                      <Button
                        type="button"
                        variant={editorMode === 'visual' ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setEditorMode('visual')}
                        className="h-7 text-xs px-3 font-semibold rounded-md transition-all"
                      >
                        Visual
                      </Button>
                      <Button
                        type="button"
                        variant={editorMode === 'code' ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setEditorMode('code')}
                        className="h-7 text-xs px-3 font-semibold rounded-md transition-all"
                      >
                        Code
                      </Button>
                    </div>
                  </div>

                  {/* Formatting Toolbar (Only active in Visual mode) */}
                  <div className="flex flex-wrap items-center gap-1 p-2 bg-muted/10 border-b select-none">
                    {/* Block formatting dropdown */}
                    <Select
                      value={activeBlockFormat}
                      onValueChange={(val) => {
                        const fallbackVal = val || '<p>'
                        setActiveBlockFormat(fallbackVal)
                        handleBlockFormat(fallbackVal)
                      }}
                      disabled={editorMode !== 'visual'}
                    >
                      <SelectTrigger className="w-[130px] h-8 text-xs bg-background">
                        <SelectValue placeholder="Paragraph" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<p>">Paragraph</SelectItem>
                        <SelectItem value="<h2>">Heading 2</SelectItem>
                        <SelectItem value="<h3>">Heading 3</SelectItem>
                        <SelectItem value="<h4>">Heading 4</SelectItem>
                        <SelectItem value="<blockquote>">Blockquote</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="h-4 w-px bg-muted mx-1" />

                    {/* Bold and Italic */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onMouseDown={(e) => e.preventDefault()} // Prevents selection loss
                      onClick={() => execCommand('bold')}
                      disabled={editorMode !== 'visual'}
                      className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors"
                      title="Bold (Ctrl+B)"
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => execCommand('italic')}
                      disabled={editorMode !== 'visual'}
                      className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors"
                      title="Italic (Ctrl+I)"
                    >
                      <Italic className="h-4 w-4" />
                    </Button>

                    <div className="h-4 w-px bg-muted mx-1" />

                    {/* Lists */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => execCommand('insertUnorderedList')}
                      disabled={editorMode !== 'visual'}
                      className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors"
                      title="Bullet List"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => execCommand('insertOrderedList')}
                      disabled={editorMode !== 'visual'}
                      className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors"
                      title="Numbered List"
                    >
                      <ListOrdered className="h-4 w-4" />
                    </Button>

                    {/* Blockquote shortcut */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleBlockFormat('<blockquote>')}
                      disabled={editorMode !== 'visual'}
                      className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors"
                      title="Blockquote"
                    >
                      <Quote className="h-4 w-4" />
                    </Button>

                    <div className="h-4 w-px bg-muted mx-1" />

                    {/* Alignment options */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => execCommand('justifyLeft')}
                      disabled={editorMode !== 'visual'}
                      className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors"
                      title="Align Left"
                    >
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => execCommand('justifyCenter')}
                      disabled={editorMode !== 'visual'}
                      className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors"
                      title="Align Center"
                    >
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => execCommand('justifyRight')}
                      disabled={editorMode !== 'visual'}
                      className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors"
                      title="Align Right"
                    >
                      <AlignRight className="h-4 w-4" />
                    </Button>

                    <div className="h-4 w-px bg-muted mx-1" />

                    {/* Hyperlink */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={handleInsertLink}
                      disabled={editorMode !== 'visual'}
                      className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors"
                      title="Insert Link"
                    >
                      <Link2 className="h-4 w-4" />
                    </Button>

                    <div className="flex-1" />

                    {/* Expand / Minimize screen */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors"
                      title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    >
                      {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </Button>
                  </div>

                  {/* Editor Editing Panels */}
                  <div className="flex-1 flex flex-col bg-background min-h-[380px] max-h-[600px] overflow-hidden">
                    {/* Visual Mode contentEditable Canvas */}
                    <div
                      ref={editorRef}
                      contentEditable={editorMode === 'visual'}
                      onInput={handleVisualInput}
                      className={cn(
                        "flex-1 p-5 outline-none overflow-y-auto select-text cursor-text focus-visible:ring-0 relative",
                        editorMode === 'visual' ? "block" : "hidden",
                        // Visual placeholder when empty
                        "empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground/50 empty:before:absolute empty:before:pointer-events-none",
                        // Dynamic layout matching public article styles exactly
                        "max-w-none [&_h2]:scroll-m-20 [&_h2]:border-b [&_h2]:pb-2 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:scroll-m-20 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-foreground [&_h3]:mt-5 [&_h3]:mb-2 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-foreground [&_h4]:mt-4 [&_h4]:mb-2 [&_p]:leading-7 [&_p]:text-base [&_p]:text-muted-foreground [&_p]:mt-2 [&_p]:mb-3 [&_blockquote]:mt-4 [&_blockquote]:mb-4 [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:bg-primary/5 [&_blockquote]:py-2.5 [&_blockquote]:px-5 [&_blockquote]:rounded-r-md [&_blockquote]:font-medium [&_blockquote]:italic [&_blockquote]:text-foreground [&_ul]:my-4 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ol]:my-4 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_li]:leading-7 [&_li]:text-base [&_li]:text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4"
                      )}
                      data-placeholder="Write your article paragraphs here..."
                    />

                    {/* Code Mode Textarea */}
                    <textarea
                      id="content"
                      name="content"
                      required
                      placeholder="<h2>Heading 2</h2><p>Write your article paragraphs here...</p>"
                      value={formData.content}
                      onChange={handleInputChange}
                      className={cn(
                        "flex-1 p-5 font-mono text-sm leading-relaxed border-0 focus:ring-0 outline-none bg-muted/5 resize-none overflow-y-auto",
                        editorMode === 'code' ? "block" : "hidden"
                      )}
                    />
                  </div>
                </div>

                <p className="text-[11px] text-muted-foreground/85 leading-normal">
                  Standard HTML structure is fully supported. Switch between <strong>Visual</strong> for rich editing and <strong>Code</strong> to edit raw HTML blocks.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* RankMath Advanced SEO Suite */}
          <Card className="shadow-sm border-2 border-primary/10 overflow-hidden bg-gradient-to-b from-background to-muted/10">
            <CardHeader className="bg-primary/5 border-b pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span>RankMath SEO Optimizer</span>
                </CardTitle>
                <CardDescription>
                  Configure search engine metadata and optimize your score.
                </CardDescription>
              </div>
              <div className="flex items-center gap-1.5 bg-background border rounded-lg p-1">
                <Button
                  type="button"
                  variant={previewMode === 'desktop' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setPreviewMode('desktop')}
                  className="h-8 px-2.5"
                >
                  <Laptop className="h-3.5 w-3.5 mr-1" />
                  Desktop
                </Button>
                <Button
                  type="button"
                  variant={previewMode === 'mobile' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setPreviewMode('mobile')}
                  className="h-8 px-2.5"
                >
                  <Smartphone className="h-3.5 w-3.5 mr-1" />
                  Mobile
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Google Snippet Live Preview Simulator */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                  <Globe className="h-3 w-3" /> Live Google Search Result Simulator
                </Label>
                <div className={cn(
                  "border rounded-xl bg-background p-4 shadow-inner text-left font-sans select-none border-dashed border-muted-foreground/35 transition-all duration-300",
                  previewMode === 'mobile' ? 'max-w-[360px] mx-auto' : 'w-full'
                )}>
                  {/* Google Breadcrumb */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground overflow-hidden whitespace-nowrap text-ellipsis mb-1.5">
                    <span>apargo.com</span>
                    <ChevronRight className="h-2.5 w-2.5" />
                    <span>blog</span>
                    <ChevronRight className="h-2.5 w-2.5" />
                    <span className="truncate text-primary/70">{formData.slug || 'url-slug'}</span>
                  </div>
                  {/* Google Title */}
                  <h3 className="text-xl font-medium text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-snug line-clamp-2">
                    {formData.meta_title || formData.title || 'Dynamic Page Title | Apargo'}
                  </h3>
                  {/* Google Description */}
                  <p className="text-sm text-[#4d5156] dark:text-[#bdc1c6] mt-1 line-clamp-2 leading-relaxed font-normal">
                    {formData.meta_description || formData.description || 'Provide an optimized meta description here to raise click-through rates on search results. Google indexes between 120 and 160 characters...'}
                  </p>
                </div>
              </div>

              {/* Focus Keyword & Meta Settings Grid */}
              <div className="grid gap-4 md:grid-cols-3 border-t pt-5">
                <div className="space-y-1.5">
                  <Label htmlFor="focus_keyword" className="flex items-center gap-1 text-primary">
                    <Sparkles className="h-3.5 w-3.5" /> Focus Keyword
                  </Label>
                  <Input
                    id="focus_keyword"
                    name="focus_keyword"
                    placeholder="e.g. Next.js SEO"
                    value={formData.focus_keyword}
                    onChange={handleInputChange}
                    className="h-10"
                  />
                  <p className="text-[10px] text-muted-foreground">The main keyword you wish to rank for.</p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="meta_title" className="flex justify-between items-center">
                    <span>Meta SEO Title</span>
                    <span className={cn(
                      "text-[10px] font-mono",
                      formData.meta_title.length >= 45 && formData.meta_title.length <= 65 ? "text-emerald-500" : "text-amber-500"
                    )}>
                      {formData.meta_title.length} chars
                    </span>
                  </Label>
                  <Input
                    id="meta_title"
                    name="meta_title"
                    placeholder="Fallback to Article Title if blank..."
                    value={formData.meta_title}
                    onChange={handleInputChange}
                    className="h-10"
                  />
                  {/* Character visual indicator bar */}
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                    <div className={cn(
                      "h-full transition-all duration-300",
                      formData.meta_title.length >= 45 && formData.meta_title.length <= 65 ? "bg-emerald-500" : "bg-amber-500"
                    )} style={{ width: `${Math.min(100, (formData.meta_title.length / 70) * 100)}%` }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="meta_description" className="flex justify-between items-center">
                    <span>Meta SEO Description</span>
                    <span className={cn(
                      "text-[10px] font-mono",
                      formData.meta_description.length >= 110 && formData.meta_description.length <= 165 ? "text-emerald-500" : "text-amber-500"
                    )}>
                      {formData.meta_description.length} chars
                    </span>
                  </Label>
                  <Input
                    id="meta_description"
                    name="meta_description"
                    placeholder="Fallback to summary if blank..."
                    value={formData.meta_description}
                    onChange={handleInputChange}
                    className="h-10"
                  />
                  {/* Description bar */}
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                    <div className={cn(
                      "h-full transition-all duration-300",
                      formData.meta_description.length >= 110 && formData.meta_description.length <= 165 ? "bg-emerald-500" : "bg-amber-500"
                    )} style={{ width: `${Math.min(100, (formData.meta_description.length / 180) * 100)}%` }} />
                  </div>
                </div>
              </div>

              {/* SEO Checklist */}
              {formData.focus_keyword ? (
                <div className="border-t pt-5 space-y-3">
                  <h4 className="text-sm font-semibold text-foreground">SEO Checklist Review</h4>
                  <div className="grid gap-3 md:grid-cols-2 text-sm">
                    {/* Check 1 */}
                    <div className="flex items-start gap-2.5">
                      {seoChecks.keywordInTitle ? (
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-4.5 w-4.5 text-destructive shrink-0 mt-0.5" />
                      )}
                      <span className={seoChecks.keywordInTitle ? "text-foreground" : "text-muted-foreground"}>
                        Focus Keyword in Blog Title
                      </span>
                    </div>

                    {/* Check 2 */}
                    <div className="flex items-start gap-2.5">
                      {seoChecks.keywordInSlug ? (
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-4.5 w-4.5 text-destructive shrink-0 mt-0.5" />
                      )}
                      <span className={seoChecks.keywordInSlug ? "text-foreground" : "text-muted-foreground"}>
                        Focus Keyword in URL Slug
                      </span>
                    </div>

                    {/* Check 3 */}
                    <div className="flex items-start gap-2.5">
                      {seoChecks.keywordInDescription ? (
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-4.5 w-4.5 text-destructive shrink-0 mt-0.5" />
                      )}
                      <span className={seoChecks.keywordInDescription ? "text-foreground" : "text-muted-foreground"}>
                        Focus Keyword in Card Summary
                      </span>
                    </div>

                    {/* Check 4 */}
                    <div className="flex items-start gap-2.5">
                      {seoChecks.keywordInContent ? (
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-4.5 w-4.5 text-destructive shrink-0 mt-0.5" />
                      )}
                      <span className={seoChecks.keywordInContent ? "text-foreground" : "text-muted-foreground"}>
                        Focus Keyword in Article Content
                      </span>
                    </div>

                    {/* Check 5 */}
                    <div className="flex items-start gap-2.5">
                      {seoChecks.keywordAtStartOfContent ? (
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-4.5 w-4.5 text-destructive shrink-0 mt-0.5" />
                      )}
                      <span className={seoChecks.keywordAtStartOfContent ? "text-foreground" : "text-muted-foreground"}>
                        Keyword found in early paragraphs
                      </span>
                    </div>

                    {/* Check 6 */}
                    <div className="flex items-start gap-2.5">
                      {seoChecks.contentLength >= 600 ? (
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-4.5 w-4.5 text-destructive shrink-0 mt-0.5" />
                      )}
                      <span className={seoChecks.contentLength >= 600 ? "text-foreground" : "text-muted-foreground"}>
                        Ideal body word length ({seoChecks.contentLength}/600 words)
                      </span>
                    </div>

                    {/* Check 7 */}
                    <div className="flex items-start gap-2.5">
                      {seoChecks.idealMetaTitle && seoChecks.idealMetaDescription ? (
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-4.5 w-4.5 text-destructive shrink-0 mt-0.5" />
                      )}
                      <span className={seoChecks.idealMetaTitle && seoChecks.idealMetaDescription ? "text-foreground" : "text-muted-foreground"}>
                        Meta Title and Meta Description lengths are optimized
                      </span>
                    </div>

                    {/* Check 8 */}
                    <div className="flex items-start gap-2.5">
                      {seoChecks.hasLinks ? (
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-4.5 w-4.5 text-destructive shrink-0 mt-0.5" />
                      )}
                      <span className={seoChecks.hasLinks ? "text-foreground" : "text-muted-foreground"}>
                        Has internal/external hyper-links
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border-t pt-4 text-center text-sm text-muted-foreground flex items-center justify-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-muted-foreground/60 animate-pulse" />
                  Define a Focus Keyword above to activate live SEO scoring and checklist checks.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar Columns (Control Panels) */}
        <div className="space-y-6">
          {/* Publish & Status Card */}
          <Card className="shadow-sm border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-4.5 w-4.5 text-primary" />
                <span>Publish Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Post Visibility Status</Label>
                <Select
                  name="status"
                  value={formData.status}
                  onValueChange={(val) => setFormData(prev => ({ ...prev, status: val || 'published' }))}
                >
                  <SelectTrigger id="status" className="h-10">
                    <SelectValue placeholder="Select Visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">🟢 Published (Live on Blog)</SelectItem>
                    <SelectItem value="draft">🟡 Draft (Hidden/Preview-Only)</SelectItem>
                    <SelectItem value="trash">🔴 Trash (Soft-Deleted)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {initialData?.id && (
                <div className="text-xs text-muted-foreground border-t pt-3 flex flex-col gap-1 font-mono">
                  <span>Created: {new Date().toLocaleDateString()}</span>
                  <span>Views: {initialData?.seo_score || 0} hits</span>
                </div>
              )}

              {/* Actions submit */}
              <div className="flex gap-3 border-t pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push('/admin/blogs')}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : initialData ? (
                    'Update Post'
                  ) : (
                    'Publish Post'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Taxonomy & Tags Card */}
          <Card className="shadow-sm border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tags className="h-4.5 w-4.5 text-primary" />
                <span>Categories & Tags</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Category selector */}
              <div className="space-y-2">
                <Label htmlFor="category-input">Primary Category</Label>
                <Input
                  id="category-input"
                  placeholder="e.g. Engineering, AI, Design"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyDown={handleCategoryKeyDown}
                />
                <span className="text-[10px] text-muted-foreground">Press Enter or comma to insert a category.</span>
                
                {/* Visual Category Tags */}
                {categories.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {categories.map((cat, idx) => (
                      <span
                        key={idx}
                        className={cn(
                          "inline-flex items-center gap-1 rounded px-2.5 py-0.5 text-xs font-semibold border transition-all select-none",
                          idx === 0 
                            ? "bg-primary/10 text-primary border-primary/20" 
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {cat}
                        {idx === 0 && <span className="text-[8px] uppercase font-bold px-1 bg-primary text-primary-foreground rounded-sm scale-90">primary</span>}
                        <button
                          type="button"
                          onClick={() => removeCategory(idx)}
                          className="ml-1 text-muted-foreground/60 hover:text-foreground text-[10px]"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Tag builder */}
              <div className="space-y-2 border-t pt-4">
                <Label htmlFor="tag-input">Blog Article Tags</Label>
                <Input
                  id="tag-input"
                  placeholder="e.g. Nextjs, Tailwind, Postgres"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                />
                <span className="text-[10px] text-muted-foreground">Press Enter or comma to insert a tag.</span>

                {/* Visual tags */}
                {tags.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 rounded bg-muted border text-muted-foreground px-2.5 py-0.5 text-xs font-medium hover:bg-muted/70 transition-colors select-none"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(idx)}
                          className="ml-1 text-muted-foreground/60 hover:text-foreground text-[10px]"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-muted-foreground italic">No tags selected.</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Featured Image URL */}
          <Card className="shadow-sm border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-4.5 w-4.5 text-primary" />
                <span>Featured Image</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image_url">Featured Image URL</Label>
                <div className="relative">
                  <Input
                    id="image_url"
                    name="image_url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image_url}
                    onChange={handleInputChange}
                    className="pr-8"
                  />
                  <ImageIcon className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
                {formData.image_url && (
                  <div className="mt-2 aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                    <img
                      src={formData.image_url}
                      alt="Featured preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-25.png'
                      }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Author settings */}
          <Card className="shadow-sm border">
            <CardHeader className="pb-3">
              <CardTitle>Author Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="author">Author Name</Label>
                <Input
                  id="author"
                  name="author"
                  required
                  value={formData.author}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author_role">Author Role</Label>
                <Input
                  id="author_role"
                  name="author_role"
                  required
                  value={formData.author_role}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author_avatar">Author Avatar URL</Label>
                <Input
                  id="author_avatar"
                  name="author_avatar"
                  required
                  value={formData.author_avatar}
                  onChange={handleInputChange}
                />
                {formData.author_avatar && (
                  <div className="mt-2 flex items-center gap-3 bg-muted/30 p-2 border rounded-lg">
                    <img
                      src={formData.author_avatar}
                      alt="Avatar preview"
                      className="h-10 w-10 rounded-full border bg-muted"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mohit'
                      }}
                    />
                    <div className="flex flex-col text-xs text-muted-foreground leading-normal">
                      <span className="font-semibold text-foreground">{formData.author}</span>
                      <span>{formData.author_role}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
