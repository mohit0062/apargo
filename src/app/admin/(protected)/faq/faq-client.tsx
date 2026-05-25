'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { updateSiteSectionAction } from '../cms-actions'
import {
  Check, Loader2, Plus, Trash2, ArrowUp, ArrowDown, X,
  HelpCircle, Settings, ListCollapse, Globe, Sparkles
} from 'lucide-react'

interface FAQCategory {
  id: string
  label: string
  iconName: string
}

interface FAQItem {
  categoryId: string
  question: string
  answer: string
}

interface FAQData {
  seo: {
    title: string
    description: string
    keywords: string
  }
  hero: {
    badge: string
    heading: string
    description: string
  }
  categories: FAQCategory[]
  items: FAQItem[]
}

interface FAQCMSClientProps {
  initialData: FAQData
}

export default function FAQCMSClient({ initialData }: FAQCMSClientProps) {
  const [activeTab, setActiveTab] = useState<'hero' | 'categories' | 'faqs' | 'seo'>('hero')
  const [data, setData] = useState<FAQData>(initialData)
  const [saving, setSaving] = useState(false)
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Sub-states
  const [newCategoryId, setNewCategoryId] = useState('')
  const [newCategoryLabel, setNewCategoryLabel] = useState('')
  const [newCategoryIcon, setNewCategoryIcon] = useState('BuildingIcon')

  const [newFAQQuestion, setNewFAQQuestion] = useState('')
  const [newFAQAnswer, setNewFAQAnswer] = useState('')
  const [newFAQCategoryId, setNewFAQCategoryId] = useState('')

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text })
    setTimeout(() => {
      setStatusMsg(null)
    }, 5000)
  }

  const handleSaveAll = async () => {
    setSaving(true)
    const result = await updateSiteSectionAction('page_faq', data)
    setSaving(false)
    if (result.error) {
      showStatus('error', result.error)
    } else {
      showStatus('success', 'FAQ Page CMS updated successfully!')
    }
  }

  // Hero Fields Update
  const updateHeroField = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value
      }
    }))
  }

  // SEO Fields Update
  const updateSEOField = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        [field]: value
      }
    }))
  }

  // Category Operations
  const addCategory = () => {
    const cleanId = newCategoryId.trim().toLowerCase()
    if (!cleanId || !newCategoryLabel.trim()) {
      showStatus('error', 'Category ID and Label are required.')
      return
    }
    if (data.categories.some(c => c.id === cleanId)) {
      showStatus('error', 'Category ID must be unique.')
      return
    }

    const newCat: FAQCategory = {
      id: cleanId,
      label: newCategoryLabel.trim(),
      iconName: newCategoryIcon
    }

    setData(prev => ({
      ...prev,
      categories: [...prev.categories, newCat]
    }))

    setNewCategoryId('')
    setNewCategoryLabel('')
    setNewCategoryIcon('BuildingIcon')
    showStatus('success', 'Category added to local list. Save changes to apply.')
  }

  const deleteCategory = (id: string) => {
    // Check if there are FAQs in this category
    const hasItems = data.items.some(x => x.categoryId === id)
    if (hasItems) {
      showStatus('error', 'Cannot delete category containing FAQ items. Remove those FAQs first.')
      return
    }
    setData(prev => ({
      ...prev,
      categories: prev.categories.filter(x => x.id !== id)
    }))
    showStatus('success', 'Category removed from local list. Save changes to apply.')
  }

  const updateCategoryField = (index: number, field: keyof FAQCategory, value: string) => {
    setData(prev => {
      const categories = [...prev.categories]
      categories[index] = {
        ...categories[index],
        [field]: value
      }
      return { ...prev, categories }
    })
  }

  // FAQ Items Operations
  const addFAQItem = () => {
    const catId = newFAQCategoryId || (data.categories[0]?.id || '')
    if (!newFAQQuestion.trim() || !newFAQAnswer.trim() || !catId) {
      showStatus('error', 'Question, Answer, and Category are required.')
      return
    }

    const newItem: FAQItem = {
      categoryId: catId,
      question: newFAQQuestion.trim(),
      answer: newFAQAnswer.trim()
    }

    setData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }))

    setNewFAQQuestion('')
    setNewFAQAnswer('')
    showStatus('success', 'FAQ item added to local list. Save changes to apply.')
  }

  const deleteFAQItem = (index: number) => {
    setData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }))
    showStatus('success', 'FAQ item removed from local list. Save changes to apply.')
  }

  const updateFAQField = (index: number, field: keyof FAQItem, value: string) => {
    setData(prev => {
      const items = [...prev.items]
      items[index] = {
        ...items[index],
        [field]: value
      }
      return { ...prev, items }
    })
  }

  const moveFAQItem = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1
    if (targetIdx < 0 || targetIdx >= data.items.length) return
    setData(prev => {
      const items = [...prev.items]
      const temp = items[index]
      items[index] = items[targetIdx]
      items[targetIdx] = temp
      return { ...prev, items }
    })
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      {statusMsg && (
        <div
          className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border transition-all duration-300 ${
            statusMsg.type === 'success'
              ? 'bg-green-500/10 text-green-500 border-green-500/20'
              : 'bg-red-500/10 text-red-500 border-red-500/20'
          }`}
        >
          {statusMsg.type === 'success' ? (
            <Check className="h-4 w-4 shrink-0" />
          ) : (
            <X className="h-4 w-4 shrink-0" />
          )}
          <span className="text-sm font-medium">{statusMsg.text}</span>
        </div>
      )}

      {/* Control Actions Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/20 p-4 rounded-2xl border">
        <div>
          <h3 className="text-md font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            FAQ Editor
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Modify the FAQ categories, questions, hero, and SEO settings.
          </p>
        </div>
        <Button onClick={handleSaveAll} disabled={saving} className="rounded-xl w-full sm:w-auto px-6 font-semibold shadow-sm">
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Save All Changes
            </>
          )}
        </Button>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b gap-1 bg-muted/10 p-1.5 rounded-xl border max-w-lg">
        <button
          onClick={() => setActiveTab('hero')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'hero' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <HelpCircle className="h-3.5 w-3.5" />
          Hero
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'categories' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Settings className="h-3.5 w-3.5" />
          Categories
        </button>
        <button
          onClick={() => setActiveTab('faqs')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'faqs' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <ListCollapse className="h-3.5 w-3.5" />
          FAQs List
        </button>
        <button
          onClick={() => setActiveTab('seo')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'seo' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Globe className="h-3.5 w-3.5" />
          SEO Meta
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'hero' && (
        <Card className="rounded-2xl border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold">Hero Text Configuration</CardTitle>
            <CardDescription className="text-xs">Edit the badge, header title, and description paragraph for the FAQ page.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1.5 md:col-span-1">
                <Label htmlFor="hero-badge" className="text-xs font-semibold">Hero Badge</Label>
                <Input
                  id="hero-badge"
                  value={data.hero.badge || ''}
                  onChange={(e) => updateHeroField('badge', e.target.value)}
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="hero-heading" className="text-xs font-semibold">Hero Heading</Label>
                <Input
                  id="hero-heading"
                  value={data.hero.heading || ''}
                  onChange={(e) => updateHeroField('heading', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="hero-description" className="text-xs font-semibold">Hero Description</Label>
              <Textarea
                id="hero-description"
                rows={4}
                value={data.hero.description || ''}
                onChange={(e) => updateHeroField('description', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'categories' && (
        <div className="grid gap-6">
          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold">Add New Category</CardTitle>
              <CardDescription className="text-xs">Create a new FAQ category group with unique ID, display name, and icon.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-4 items-end">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Unique ID (e.g. pricing)</Label>
                <Input
                  value={newCategoryId}
                  onChange={(e) => setNewCategoryId(e.target.value)}
                  placeholder="lowercase-no-spaces"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Display Label</Label>
                <Input
                  value={newCategoryLabel}
                  onChange={(e) => setNewCategoryLabel(e.target.value)}
                  placeholder="e.g. Services & Pricing"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Lucide Icon</Label>
                <Input
                  value={newCategoryIcon}
                  onChange={(e) => setNewCategoryIcon(e.target.value)}
                  placeholder="e.g. CreditCardIcon"
                />
              </div>
              <Button onClick={addCategory} className="w-full font-semibold">
                <Plus className="h-4 w-4 mr-2" /> Add Category
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold">Categories List ({data.categories.length})</CardTitle>
              <CardDescription className="text-xs">Edit display labels and icons for existing categories, or delete them.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.categories.map((cat, idx) => (
                <div key={cat.id} className="flex flex-col md:flex-row gap-4 items-end p-4 rounded-xl border bg-muted/5">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">ID</Label>
                    <Input value={cat.id} disabled className="bg-muted w-32 cursor-not-allowed" />
                  </div>
                  <div className="space-y-1.5 flex-1 w-full">
                    <Label className="text-xs font-semibold">Display Label</Label>
                    <Input
                      value={cat.label}
                      onChange={(e) => updateCategoryField(idx, 'label', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5 w-full md:w-56">
                    <Label className="text-xs font-semibold">Icon Component</Label>
                    <Input
                      value={cat.iconName}
                      onChange={(e) => updateCategoryField(idx, 'iconName', e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={() => deleteCategory(cat.id)}
                    variant="ghost"
                    className="text-red-500 hover:text-red-600 hover:bg-red-500/10 shrink-0 font-semibold text-xs rounded-lg"
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'faqs' && (
        <div className="grid gap-6">
          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold">Add New FAQ Question</CardTitle>
              <CardDescription className="text-xs">Create a new question and map it to an existing category.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1.5 md:col-span-2">
                  <Label className="text-xs font-semibold">Question</Label>
                  <Input
                    value={newFAQQuestion}
                    onChange={(e) => setNewFAQQuestion(e.target.value)}
                    placeholder="e.g. Do you sign NDAs?"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-1">
                  <Label className="text-xs font-semibold">Category Group</Label>
                  <select
                    value={newFAQCategoryId}
                    onChange={(e) => setNewFAQCategoryId(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">-- Choose Category --</option>
                    {data.categories.map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Answer Content</Label>
                <Textarea
                  rows={3}
                  value={newFAQAnswer}
                  onChange={(e) => setNewFAQAnswer(e.target.value)}
                  placeholder="Answer explaining details..."
                />
              </div>
              <Button onClick={addFAQItem} className="font-semibold">
                <Plus className="h-4 w-4 mr-2" /> Add FAQ Item
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold">FAQs List ({data.items.length})</CardTitle>
              <CardDescription className="text-xs">Manage your FAQ entries. You can move items, modify text, re-assign categories, or delete them.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {data.items.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start p-4 rounded-xl border bg-muted/5 relative">
                  <div className="flex-1 space-y-3">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-1.5 md:col-span-2">
                        <Label className="text-xs font-semibold">Question</Label>
                        <Input
                          value={item.question}
                          onChange={(e) => updateFAQField(idx, 'question', e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5 md:col-span-1">
                        <Label className="text-xs font-semibold">Category Group</Label>
                        <select
                          value={item.categoryId}
                          onChange={(e) => updateFAQField(idx, 'categoryId', e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          {data.categories.map(c => (
                            <option key={c.id} value={c.id}>{c.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">Answer</Label>
                      <Textarea
                        rows={2}
                        value={item.answer}
                        onChange={(e) => updateFAQField(idx, 'answer', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 bg-background border rounded-lg p-0.5 shrink-0">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-7 hover:bg-muted"
                      disabled={idx === 0}
                      onClick={() => moveFAQItem(idx, 'up')}
                      title="Move up"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-7 hover:bg-muted"
                      disabled={idx === data.items.length - 1}
                      onClick={() => moveFAQItem(idx, 'down')}
                      title="Move down"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-7 hover:bg-red-500/10 text-muted-foreground hover:text-red-500"
                      onClick={() => deleteFAQItem(idx)}
                      title="Delete FAQ"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
              {data.items.length === 0 && (
                <div className="text-center py-8 border border-dashed rounded-xl bg-muted/10">
                  <p className="text-xs text-muted-foreground">No FAQs available. Create one using the form above.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'seo' && (
        <Card className="rounded-2xl border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold">SEO Metadata Settings</CardTitle>
            <CardDescription className="text-xs">Configure how this page displays in search engines and browser tabs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="seo-title" className="text-xs font-semibold">Meta Title</Label>
              <Input
                id="seo-title"
                value={data.seo?.title || ''}
                onChange={(e) => updateSEOField('title', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="seo-description" className="text-xs font-semibold">Meta Description</Label>
              <Textarea
                id="seo-description"
                rows={3}
                value={data.seo?.description || ''}
                onChange={(e) => updateSEOField('description', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="seo-keywords" className="text-xs font-semibold">Meta Keywords (Comma separated)</Label>
              <Input
                id="seo-keywords"
                value={data.seo?.keywords || ''}
                onChange={(e) => updateSEOField('keywords', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
