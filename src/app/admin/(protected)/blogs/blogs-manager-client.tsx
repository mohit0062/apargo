'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  Sparkles,
  Copy,
  RotateCcw,
  Check,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { deleteBlog, restoreBlog, duplicateBlog, quickUpdateBlog } from './actions'
import { cn } from '@/lib/utils'

interface Blog {
  id: string
  created_at: string
  title: string
  slug: string
  description: string | null
  content: string | null
  author: string | null
  views: number | null
  category: string | null
  read_time: string | null
  author_role: string | null
  author_avatar: string | null
  image_url: string | null
  status: string | null
  meta_title: string | null
  meta_description: string | null
  focus_keyword: string | null
  seo_score: number | null
  tags: string[] | null
  categories: string[] | null
}

interface BlogsManagerClientProps {
  initialBlogs: Blog[]
}

export default function BlogsManagerClient({ initialBlogs }: BlogsManagerClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Tab filters ('all', 'published', 'draft', 'trash')
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'draft' | 'trash'>('all')

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDate, setSelectedDate] = useState('all')

  // Checked Rows for Bulk Actions
  const [checkedIds, setCheckedIds] = useState<string[]>([])

  // Bulk Action selected
  const [bulkAction, setBulkAction] = useState('')

  // Quick Edit State
  const [quickEditBlog, setQuickEditBlog] = useState<Blog | null>(null)
  const [quickEditForm, setQuickEditForm] = useState({
    title: '',
    slug: '',
    status: 'published',
    category: '',
    tagsString: ''
  })
  const [quickEditError, setQuickEditError] = useState<string | null>(null)
  const [isQuickEditing, setIsQuickEditing] = useState(false)

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Helper: Format Date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  // Get months list dynamically from all blogs for filter dropdown
  const getUniqueMonths = () => {
    const months = new Set<string>()
    initialBlogs.forEach(blog => {
      const d = new Date(blog.created_at)
      const label = d.toLocaleString('default', { month: 'long', year: 'numeric' })
      months.add(label)
    })
    return Array.from(months)
  }

  // Get unique categories dynamically for filter dropdown
  const getUniqueCategories = () => {
    const cats = new Set<string>()
    initialBlogs.forEach(blog => {
      if (blog.category) cats.add(blog.category)
      if (blog.categories) {
        blog.categories.forEach(c => cats.add(c))
      }
    })
    return Array.from(cats)
  }

  // Filter & Search Logic
  const filteredBlogs = initialBlogs.filter(blog => {
    // 1. Tab Status Filter
    const status = blog.status || 'published'
    if (activeTab === 'published' && status !== 'published') return false
    if (activeTab === 'draft' && status !== 'draft') return false
    if (activeTab === 'trash' && status !== 'trash') return false
    // 'all' tab displays non-trash posts
    if (activeTab === 'all' && status === 'trash') return false

    // 2. Search query filter
    const query = searchQuery.toLowerCase().trim()
    if (query) {
      const matchesTitle = blog.title.toLowerCase().includes(query)
      const matchesDesc = (blog.description || '').toLowerCase().includes(query)
      const matchesKeyword = (blog.focus_keyword || '').toLowerCase().includes(query)
      if (!matchesTitle && !matchesDesc && !matchesKeyword) return false
    }

    // 3. Category Filter
    if (selectedCategory !== 'all') {
      const hasCat = blog.category === selectedCategory || 
                     (blog.categories || []).includes(selectedCategory)
      if (!hasCat) return false
    }

    // 4. Date/Month Filter
    if (selectedDate !== 'all') {
      const d = new Date(blog.created_at)
      const label = d.toLocaleString('default', { month: 'long', year: 'numeric' })
      if (label !== selectedDate) return false
    }

    return true
  })

  // Pagination bounds
  const totalItems = filteredBlogs.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Counts for Tabs
  const countAll = initialBlogs.filter(b => b.status !== 'trash').length
  const countPublished = initialBlogs.filter(b => b.status === 'published').length
  const countDrafts = initialBlogs.filter(b => b.status === 'draft').length
  const countTrash = initialBlogs.filter(b => b.status === 'trash').length

  // Checkbox interactions
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setCheckedIds(paginatedBlogs.map(b => b.id))
    } else {
      setCheckedIds([])
    }
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setCheckedIds(prev => [...prev, id])
    } else {
      setCheckedIds(prev => prev.filter(rowId => rowId !== id))
    }
  }

  // Row operations
  const handleMoveToTrash = (id: string) => {
    startTransition(async () => {
      await deleteBlog(id)
      router.refresh()
    })
  }

  const handleRestore = (id: string) => {
    startTransition(async () => {
      await restoreBlog(id)
      router.refresh()
    })
  }

  const handleDuplicate = (id: string) => {
    startTransition(async () => {
      await duplicateBlog(id)
      router.refresh()
    })
  }

  // Bulk Actions
  const handleApplyBulkAction = () => {
    if (!bulkAction || checkedIds.length === 0) return

    startTransition(async () => {
      for (const id of checkedIds) {
        if (bulkAction === 'trash') {
          await deleteBlog(id)
        } else if (bulkAction === 'restore') {
          await restoreBlog(id)
        } else if (bulkAction === 'delete-permanent') {
          // If already in trash, deleteBlog deletes permanently
          await deleteBlog(id)
        }
      }
      setCheckedIds([])
      setBulkAction('')
      router.refresh()
    })
  }

  // Quick Edit Dialog triggers
  const handleOpenQuickEdit = (blog: Blog) => {
    setQuickEditBlog(blog)
    setQuickEditForm({
      title: blog.title,
      slug: blog.slug,
      status: blog.status || 'published',
      category: blog.category || 'Engineering',
      tagsString: (blog.tags || []).join(', ')
    })
    setQuickEditError(null)
  }

  const handleQuickEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setQuickEditForm(prev => {
      const updated = { ...prev, [name]: value }
      // Auto-update slug if title changes
      if (name === 'title') {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim()
      }
      return updated
    })
  }

  const handleSaveQuickEdit = async () => {
    if (!quickEditBlog) return
    setIsQuickEditing(true)
    setQuickEditError(null)

    try {
      const parsedTags = quickEditForm.tagsString
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)

      const res = await quickUpdateBlog(quickEditBlog.id, {
        title: quickEditForm.title,
        slug: quickEditForm.slug,
        status: quickEditForm.status,
        category: quickEditForm.category,
        tags: parsedTags
      })

      if (res && res.error) {
        setQuickEditError(res.error)
      } else {
        setQuickEditBlog(null)
        router.refresh()
      }
    } catch (err: any) {
      setQuickEditError(err.message || 'Failed to update blog.')
    } finally {
      setIsQuickEditing(false)
    }
  }

  // SEO Score Badges Styling
  const getSeoBadgeStyle = (score: number | null) => {
    if (score === null || score === 0) return 'bg-muted text-muted-foreground border-muted-foreground/15'
    if (score >= 81) return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
    if (score >= 51) return 'bg-amber-500/10 text-amber-600 border-amber-500/20'
    return 'bg-destructive/10 text-destructive border-destructive/20'
  }

  return (
    <div className="space-y-6 relative">
      {/* Page Title */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">AIS Blogs & Content</h2>
          <p className="text-muted-foreground text-sm">
            Write dynamic articles, configure meta tags, and audit SEO ranks.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className={cn(buttonVariants({ size: 'default' }), 'flex items-center gap-1.5 self-start sm:self-auto shadow-sm')}
        >
          <Plus className="h-4 w-4" />
          Create New Post
        </Link>
      </div>

      {/* WordPress Navigation Counts Tabs */}
      <div className="flex flex-wrap gap-1.5 text-sm border-b pb-3 text-muted-foreground select-none">
        <button
          onClick={() => { setActiveTab('all'); setCurrentPage(1); }}
          className={cn(
            "px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1.5 hover:text-foreground",
            activeTab === 'all' ? "bg-primary text-primary-foreground font-semibold" : "bg-transparent"
          )}
        >
          All <span className={cn("text-xs px-1.5 py-0.5 rounded-md", activeTab === 'all' ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground")}>{countAll}</span>
        </button>

        <button
          onClick={() => { setActiveTab('published'); setCurrentPage(1); }}
          className={cn(
            "px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1.5 hover:text-foreground",
            activeTab === 'published' ? "bg-primary text-primary-foreground font-semibold" : "bg-transparent"
          )}
        >
          Published <span className={cn("text-xs px-1.5 py-0.5 rounded-md", activeTab === 'published' ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground")}>{countPublished}</span>
        </button>

        <button
          onClick={() => { setActiveTab('draft'); setCurrentPage(1); }}
          className={cn(
            "px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1.5 hover:text-foreground",
            activeTab === 'draft' ? "bg-primary text-primary-foreground font-semibold" : "bg-transparent"
          )}
        >
          Drafts <span className={cn("text-xs px-1.5 py-0.5 rounded-md", activeTab === 'draft' ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground")}>{countDrafts}</span>
        </button>

        <button
          onClick={() => { setActiveTab('trash'); setCurrentPage(1); }}
          className={cn(
            "px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1.5 hover:text-foreground",
            activeTab === 'trash' ? "bg-primary text-primary-foreground font-semibold" : "bg-transparent"
          )}
        >
          Trash <span className={cn("text-xs px-1.5 py-0.5 rounded-md", activeTab === 'trash' ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground")}>{countTrash}</span>
        </button>
      </div>

      <Card className="shadow-sm border">
        <CardHeader className="pb-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Article Directory</CardTitle>
            <CardDescription>
              Check focus keywords, audit schema types, and edit published articles.
            </CardDescription>
          </div>
          
          {/* Quick Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search title, keyword..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="pl-9 h-10 w-full"
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-1">
          {/* Filters & Bulk Actions bar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-y py-3.5 bg-muted/20 px-3 rounded-lg">
            {/* Bulk actions */}
            <div className="flex items-center gap-2">
              <Select value={bulkAction} onValueChange={(val) => setBulkAction(val || '')}>
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="Bulk actions" />
                </SelectTrigger>
                <SelectContent>
                  {activeTab !== 'trash' ? (
                    <SelectItem value="trash">Move to Trash</SelectItem>
                  ) : (
                    <>
                      <SelectItem value="restore">Restore Draft</SelectItem>
                      <SelectItem value="delete-permanent">Delete Permanently</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleApplyBulkAction}
                disabled={!bulkAction || checkedIds.length === 0 || isPending}
                className="h-9 px-3 font-semibold"
              >
                Apply
              </Button>
              {checkedIds.length > 0 && (
                <span className="text-xs text-muted-foreground font-medium bg-background px-2.5 py-1 rounded-md border">
                  {checkedIds.length} items checked
                </span>
              )}
            </div>

            {/* Date and Category filters */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Category */}
              <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase">
                <Filter className="h-3 w-3" /> Filters:
              </div>

              <Select value={selectedCategory} onValueChange={(val) => { setSelectedCategory(val || 'all'); setCurrentPage(1); }}>
                <SelectTrigger className="w-[140px] h-9 bg-background">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {getUniqueCategories().map((cat, idx) => (
                    <SelectItem key={idx} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Month / Date */}
              <Select value={selectedDate} onValueChange={(val) => { setSelectedDate(val || 'all'); setCurrentPage(1); }}>
                <SelectTrigger className="w-[140px] h-9 bg-background">
                  <SelectValue placeholder="All dates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All dates</SelectItem>
                  {getUniqueMonths().map((month, idx) => (
                    <SelectItem key={idx} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Clear filters shortcut */}
              {(selectedCategory !== 'all' || selectedDate !== 'all' || searchQuery) && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedDate('all');
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  className="h-9 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* WordPress Styled Table */}
          <div className="rounded-lg border bg-background overflow-hidden relative shadow-inner">
            {isPending && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] flex items-center justify-center z-10 transition-all">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
            )}
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[45px] text-center">
                    <input
                      type="checkbox"
                      className="rounded border-muted-foreground/30 text-primary focus:ring-primary scale-110 cursor-pointer"
                      checked={paginatedBlogs.length > 0 && checkedIds.length === paginatedBlogs.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </TableHead>
                  <TableHead className="w-[35%] font-bold text-foreground">Title</TableHead>
                  <TableHead className="font-bold text-foreground">Author</TableHead>
                  <TableHead className="font-bold text-foreground">Tags</TableHead>
                  <TableHead className="font-bold text-foreground">Categories</TableHead>
                  <TableHead className="font-bold text-foreground">Date</TableHead>
                  <TableHead className="font-bold text-foreground">SEO Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedBlogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-28 text-center text-muted-foreground font-medium italic">
                      No blog articles found. Make a new one or modify your filter settings.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedBlogs.map((blog) => {
                    const isChecked = checkedIds.includes(blog.id)
                    const status = blog.status || 'published'

                    return (
                      <TableRow
                        key={blog.id}
                        className={cn(
                          "hover:bg-muted/20 group transition-all select-none border-b",
                          isChecked ? "bg-primary/5 hover:bg-primary/5" : ""
                        )}
                      >
                        {/* Checkbox */}
                        <TableCell className="text-center align-middle">
                          <input
                            type="checkbox"
                            className="rounded border-muted-foreground/30 text-primary focus:ring-primary scale-110 cursor-pointer"
                            checked={isChecked}
                            onChange={(e) => handleSelectRow(blog.id, e.target.checked)}
                          />
                        </TableCell>

                        {/* Title and Action links */}
                        <TableCell className="align-middle py-3">
                          <div className="flex flex-col gap-0.5">
                            <span 
                              className="font-semibold text-foreground text-sm leading-snug line-clamp-1 block max-w-[450px]"
                              title={blog.title}
                            >
                              {blog.title.length > 55 ? blog.title.substring(0, 55) + '...' : blog.title}
                            </span>
                            <span className="text-[11px] text-muted-foreground/80 font-mono">
                              Slug: {blog.slug}
                            </span>
                            
                            {/* Actions on hover (WordPress style) */}
                            <div className="flex items-center gap-2.5 mt-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity text-xs font-medium select-none">
                              {status !== 'trash' ? (
                                <>
                                  <Link
                                    href={`/admin/blogs/${blog.id}/edit`}
                                    className="text-primary hover:underline flex items-center gap-0.5"
                                  >
                                    Edit
                                  </Link>
                                  <span className="text-muted-foreground/30">•</span>
                                  <button
                                    onClick={() => handleOpenQuickEdit(blog)}
                                    className="text-amber-600 hover:underline hover:text-amber-500"
                                  >
                                    Quick Edit
                                  </button>
                                  <span className="text-muted-foreground/30">•</span>
                                  <button
                                    onClick={() => handleMoveToTrash(blog.id)}
                                    className="text-destructive hover:underline hover:text-red-500"
                                  >
                                    Trash
                                  </button>
                                  <span className="text-muted-foreground/30">•</span>
                                  <button
                                    onClick={() => handleDuplicate(blog.id)}
                                    className="text-sky-600 hover:underline hover:text-sky-500"
                                  >
                                    Duplicate
                                  </button>
                                  <span className="text-muted-foreground/30">•</span>
                                  <a
                                    href={`/blog/${blog.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#1a0dab] dark:text-[#8ab4f8] hover:underline flex items-center gap-0.5"
                                  >
                                    View
                                  </a>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => handleRestore(blog.id)}
                                    className="text-emerald-600 hover:underline font-semibold"
                                  >
                                    Restore
                                  </button>
                                  <span className="text-muted-foreground/30">•</span>
                                  <button
                                    onClick={() => handleMoveToTrash(blog.id)}
                                    className="text-destructive hover:underline font-semibold"
                                  >
                                    Delete Permanently
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </TableCell>

                        {/* Author */}
                        <TableCell className="align-middle">
                          <div className="flex items-center gap-2">
                            <img
                              src={blog.author_avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'}
                              alt={blog.author || 'Admin'}
                              className="h-6.5 w-6.5 rounded-full border bg-muted"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
                              }}
                            />
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold text-foreground">{blog.author || 'Admin'}</span>
                              <span className="text-[10px] text-muted-foreground/80 leading-none">{blog.author_role || 'Editor'}</span>
                            </div>
                          </div>
                        </TableCell>

                        {/* Tags */}
                        <TableCell className="align-middle max-w-[120px]">
                          {blog.tags && blog.tags.length > 0 ? (
                            <div className="flex flex-wrap gap-1 max-h-[48px] overflow-hidden">
                              {blog.tags.map((tag, idx) => (
                                <Badge key={idx} variant="secondary" className="px-1 text-[9px] font-medium bg-muted scale-95 border-muted-foreground/10 text-muted-foreground rounded-sm truncate max-w-[70px]">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted-foreground/50 text-xs">—</span>
                          )}
                        </TableCell>

                        {/* Categories */}
                        <TableCell className="align-middle max-w-[120px]">
                          {blog.categories && blog.categories.length > 0 ? (
                            <div className="flex flex-wrap gap-1 max-h-[48px] overflow-hidden">
                              {blog.categories.map((cat, idx) => (
                                <Badge key={idx} variant="outline" className="px-1 text-[9px] font-semibold border-primary/20 bg-primary/5 text-primary scale-95 rounded-sm truncate max-w-[70px]">
                                  {cat}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <Badge variant="secondary" className="px-1.5 py-0.5 text-[9px] font-medium rounded-sm">
                              {blog.category || 'General'}
                            </Badge>
                          )}
                        </TableCell>

                        {/* Date */}
                        <TableCell className="align-middle text-xs">
                          <div className="flex flex-col gap-0.5 font-medium">
                            <span className="text-foreground">{formatDate(blog.created_at)}</span>
                            <span className="text-[10px] flex items-center gap-1 font-semibold uppercase">
                              {status === 'published' && <span className="text-emerald-500">Published</span>}
                              {status === 'draft' && <span className="text-amber-500">Draft</span>}
                              {status === 'trash' && <span className="text-destructive">Trash</span>}
                            </span>
                          </div>
                        </TableCell>

                        {/* Rank Math SEO Details */}
                        <TableCell className="align-middle py-2">
                          <div className="flex flex-col gap-1 border-l pl-3 py-0.5 font-sans leading-normal">
                            <div className="flex items-center gap-1.5">
                              <Badge
                                variant="outline"
                                className={cn(
                                  "px-1.5 py-0.5 text-[10px] font-extrabold rounded-md shadow-sm border",
                                  getSeoBadgeStyle(blog.seo_score)
                                )}
                              >
                                {blog.focus_keyword ? `${blog.seo_score}/100` : 'N/A'}
                              </Badge>
                              <span className="text-[10px] text-muted-foreground/70 flex items-center gap-0.5">
                                <Eye className="h-3 w-3" /> {blog.views || 0}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-muted-foreground truncate max-w-[130px]">
                              Keyword: <strong className="text-foreground/90 font-sans">{blog.focus_keyword || 'Not Set'}</strong>
                            </span>
                            <span className="text-[9px] font-mono text-muted-foreground">
                              Schema: <span className="text-foreground/80 font-sans">Article</span>
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* WordPress Pagination Bar */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t pt-4 text-sm text-muted-foreground select-none">
              <span>
                Showing <strong>{Math.min(totalItems, (currentPage - 1) * itemsPerPage + 1)}</strong> to <strong>{Math.min(totalItems, currentPage * itemsPerPage)}</strong> of <strong>{totalItems}</strong> articles
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <Button
                    key={idx}
                    variant={currentPage === idx + 1 ? 'default' : 'outline'}
                    size="icon"
                    className="h-8 w-8 text-xs font-semibold"
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* WordPress-style Quick Edit Overlay Modal Drawer */}
      {quickEditBlog && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-lg bg-background rounded-xl border shadow-xl overflow-hidden flex flex-col max-h-[90vh] scale-in">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b bg-muted/30 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-foreground flex items-center gap-1.5">
                  <Edit2 className="h-4 w-4 text-primary" />
                  Quick Edit Blog
                </h3>
                <p className="text-xs text-muted-foreground">Modify essential blog attributes instantly.</p>
              </div>
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground text-xl leading-none px-2 py-1"
                onClick={() => setQuickEditBlog(null)}
              >
                ×
              </button>
            </div>

            {/* Modal Body / Form */}
            <div className="p-5 space-y-4 overflow-y-auto">
              {quickEditError && (
                <div className="rounded-lg bg-destructive/15 border border-destructive/20 p-3 text-xs text-destructive font-medium flex items-center gap-1.5">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {quickEditError}
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="quick-title">Article Title</Label>
                <Input
                  id="quick-title"
                  name="title"
                  value={quickEditForm.title}
                  onChange={handleQuickEditChange}
                  className="h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="quick-slug" className="flex items-center gap-1">
                  URL Slug <span className="text-[10px] text-muted-foreground">(Auto-updates)</span>
                </Label>
                <Input
                  id="quick-slug"
                  name="slug"
                  value={quickEditForm.slug}
                  onChange={handleQuickEditChange}
                  className="h-10 font-mono text-sm"
                />
              </div>

              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="quick-category">Primary Category</Label>
                  <Input
                    id="quick-category"
                    name="category"
                    value={quickEditForm.category}
                    onChange={handleQuickEditChange}
                    className="h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="quick-status">Visibility Status</Label>
                  <Select
                    name="status"
                    value={quickEditForm.status}
                    onValueChange={(val) => setQuickEditForm(prev => ({ ...prev, status: val || 'published' }))}
                  >
                    <SelectTrigger id="quick-status" className="h-10">
                      <SelectValue placeholder="Visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">🟢 Published (Live)</SelectItem>
                      <SelectItem value="draft">🟡 Draft (Hidden)</SelectItem>
                      <SelectItem value="trash">🔴 Trash (Soft-Deleted)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="quick-tags">Tags (Comma-separated)</Label>
                <Input
                  id="quick-tags"
                  name="tagsString"
                  value={quickEditForm.tagsString}
                  onChange={handleQuickEditChange}
                  placeholder="e.g. Nextjs, Postgres, CMS"
                  className="h-10"
                />
                <p className="text-[10px] text-muted-foreground/80">Separate each tag badge with a standard comma (<code>,</code>).</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-4 border-t bg-muted/20 flex items-center justify-end gap-3 select-none">
              <Button
                type="button"
                variant="outline"
                onClick={() => setQuickEditBlog(null)}
                disabled={isQuickEditing}
                className="h-9 px-4"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSaveQuickEdit}
                disabled={isQuickEditing}
                className="h-9 px-4 font-semibold"
              >
                {isQuickEditing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-1.5" />
                    Update Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
