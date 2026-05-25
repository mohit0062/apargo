'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { updateSiteSectionAction } from '../cms-actions'
import {
  Check, Loader2, Plus, Trash2, X, Sparkles, Sliders, Globe, Boxes, MessageSquare, Info
} from 'lucide-react'

interface FeatureItem {
  title: string
  desc: string
  iconName: string
}

interface UpcomingProductItem {
  title: string
  description: string
  iconName: string
}

interface ProductsData {
  seo: {
    title: string
    description: string
    keywords: string
  }
  hero: {
    badge: string
    heading: string
    description: string
    primaryBtnText: string
    primaryBtnHref: string
    secondaryBtnText: string
    secondaryBtnHref: string
  }
  aiGreentickSection: {
    badge: string
    heading: string
    descParagraph1: string
    descParagraph2: string
    primaryBtnText: string
    primaryBtnHref: string
    secondaryBtnText: string
    secondaryBtnHref: string
  }
  features: FeatureItem[]
  upcomingProducts: UpcomingProductItem[]
  cta: {
    heading: string
    description: string
    buttonText: string
    buttonHref: string
  }
}

interface ProductsCMSClientProps {
  initialData: ProductsData
}

export default function ProductsCMSClient({ initialData }: ProductsCMSClientProps) {
  const [activeTab, setActiveTab] = useState<'hero' | 'promo' | 'features' | 'upcoming' | 'cta' | 'seo'>('hero')
  const [data, setData] = useState<ProductsData>(initialData)
  const [saving, setSaving] = useState(false)
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text })
    setTimeout(() => {
      setStatusMsg(null)
    }, 5000)
  }

  const handleSaveAll = async () => {
    setSaving(true)
    const result = await updateSiteSectionAction('page_products', data)
    setSaving(false)
    if (result.error) {
      showStatus('error', result.error)
    } else {
      showStatus('success', 'Products Page CMS updated successfully!')
    }
  }

  const updateHeroField = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value
      }
    }))
  }

  const updatePromoField = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      aiGreentickSection: {
        ...prev.aiGreentickSection,
        [field]: value
      }
    }))
  }

  const updateCTAField = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      cta: {
        ...prev.cta,
        [field]: value
      }
    }))
  }

  const updateSEOField = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        [field]: value
      }
    }))
  }

  // Features Actions
  const updateFeature = (index: number, field: keyof FeatureItem, value: string) => {
    setData(prev => {
      const features = [...prev.features]
      features[index] = { ...features[index], [field]: value }
      return { ...prev, features }
    })
  }

  const addFeature = () => {
    const newFeature: FeatureItem = {
      title: 'New Feature',
      desc: 'Short description of feature...',
      iconName: 'ZapIcon'
    }
    setData(prev => ({
      ...prev,
      features: [...prev.features, newFeature]
    }))
  }

  const deleteFeature = (index: number) => {
    setData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  // Upcoming Products Actions
  const updateUpcomingProduct = (index: number, field: keyof UpcomingProductItem, value: string) => {
    setData(prev => {
      const upcoming = [...prev.upcomingProducts]
      upcoming[index] = { ...upcoming[index], [field]: value }
      return { ...prev, upcomingProducts: upcoming }
    })
  }

  const addUpcomingProduct = () => {
    const newProduct: UpcomingProductItem = {
      title: 'Lab Project Beta',
      description: 'Under development...',
      iconName: 'RocketIcon'
    }
    setData(prev => ({
      ...prev,
      upcomingProducts: [...prev.upcomingProducts, newProduct]
    }))
  }

  const deleteUpcomingProduct = (index: number) => {
    setData(prev => ({
      ...prev,
      upcomingProducts: prev.upcomingProducts.filter((_, i) => i !== index)
    }))
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
            Products Page Editor
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Modify any section below, then save all changes to update the live Products page.
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
      <div className="flex flex-wrap border-b gap-1 bg-muted/10 p-1.5 rounded-xl border max-w-2xl">
        <button
          onClick={() => setActiveTab('hero')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'hero' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Sliders className="h-3.5 w-3.5" />
          Hero
        </button>
        <button
          onClick={() => setActiveTab('promo')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'promo' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <MessageSquare className="h-3.5 w-3.5" />
          AI Greentick
        </button>
        <button
          onClick={() => setActiveTab('features')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'features' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Boxes className="h-3.5 w-3.5" />
          Features List
        </button>
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'upcoming' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Boxes className="h-3.5 w-3.5" />
          Labs (Upcoming)
        </button>
        <button
          onClick={() => setActiveTab('cta')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'cta' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Info className="h-3.5 w-3.5" />
          CTA Section
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
            <CardDescription className="text-xs">Edit the badge, header title, and description paragraph.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1.5 md:col-span-1">
                <Label htmlFor="hero-badge" className="text-xs font-semibold">Hero Badge</Label>
                <Input
                  id="hero-badge"
                  value={data.hero?.badge || ''}
                  onChange={(e) => updateHeroField('badge', e.target.value)}
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="hero-heading" className="text-xs font-semibold">Hero Heading</Label>
                <Input
                  id="hero-heading"
                  value={data.hero?.heading || ''}
                  onChange={(e) => updateHeroField('heading', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="hero-description" className="text-xs font-semibold">Hero Description</Label>
              <Textarea
                id="hero-description"
                rows={3}
                value={data.hero?.description || ''}
                onChange={(e) => updateHeroField('description', e.target.value)}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="hero-pbtn-text" className="text-xs font-semibold">Primary Button Text</Label>
                <Input
                  id="hero-pbtn-text"
                  value={data.hero?.primaryBtnText || ''}
                  onChange={(e) => updateHeroField('primaryBtnText', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="hero-pbtn-href" className="text-xs font-semibold">Primary Button Link</Label>
                <Input
                  id="hero-pbtn-href"
                  value={data.hero?.primaryBtnHref || ''}
                  onChange={(e) => updateHeroField('primaryBtnHref', e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="hero-sbtn-text" className="text-xs font-semibold">Secondary Button Text</Label>
                <Input
                  id="hero-sbtn-text"
                  value={data.hero?.secondaryBtnText || ''}
                  onChange={(e) => updateHeroField('secondaryBtnText', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="hero-sbtn-href" className="text-xs font-semibold">Secondary Button Link</Label>
                <Input
                  id="hero-sbtn-href"
                  value={data.hero?.secondaryBtnHref || ''}
                  onChange={(e) => updateHeroField('secondaryBtnHref', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'promo' && (
        <Card className="rounded-2xl border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold">AI Greentick Promotion Section</CardTitle>
            <CardDescription className="text-xs">Customize the core AI Greentick block content on the Products page.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1.5 md:col-span-1">
                <Label className="text-xs font-semibold">Section Badge</Label>
                <Input
                  value={data.aiGreentickSection?.badge || ''}
                  onChange={(e) => updatePromoField('badge', e.target.value)}
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label className="text-xs font-semibold">Section Heading</Label>
                <Input
                  value={data.aiGreentickSection?.heading || ''}
                  onChange={(e) => updatePromoField('heading', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Paragraph 1</Label>
              <Textarea
                rows={3}
                value={data.aiGreentickSection?.descParagraph1 || ''}
                onChange={(e) => updatePromoField('descParagraph1', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Paragraph 2</Label>
              <Textarea
                rows={3}
                value={data.aiGreentickSection?.descParagraph2 || ''}
                onChange={(e) => updatePromoField('descParagraph2', e.target.value)}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Primary Button Text</Label>
                <Input
                  value={data.aiGreentickSection?.primaryBtnText || ''}
                  onChange={(e) => updatePromoField('primaryBtnText', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Primary Button Link</Label>
                <Input
                  value={data.aiGreentickSection?.primaryBtnHref || ''}
                  onChange={(e) => updatePromoField('primaryBtnHref', e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Secondary Button Text</Label>
                <Input
                  value={data.aiGreentickSection?.secondaryBtnText || ''}
                  onChange={(e) => updatePromoField('secondaryBtnText', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Secondary Button Link</Label>
                <Input
                  value={data.aiGreentickSection?.secondaryBtnHref || ''}
                  onChange={(e) => updatePromoField('secondaryBtnHref', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'features' && (
        <Card className="rounded-2xl border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold">What's in the Box (Features List)</CardTitle>
              <CardDescription className="text-xs">Configure the highlights list under the AI Greentick block.</CardDescription>
            </div>
            <Button onClick={addFeature} size="sm" variant="outline" className="gap-1 rounded-lg">
              <Plus className="h-3.5 w-3.5" /> Add Feature
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.features.map((feat, idx) => (
              <div key={idx} className="p-4 rounded-xl border bg-muted/5 space-y-3 relative">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-xs font-bold text-primary">Feature #{idx + 1}</span>
                  <button
                    onClick={() => deleteFeature(idx)}
                    className="text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1 text-[11px]"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1.5 col-span-1">
                    <Label className="text-xs font-semibold">Title</Label>
                    <Input
                      value={feat.title}
                      onChange={(e) => updateFeature(idx, 'title', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5 col-span-1">
                    <Label className="text-xs font-semibold">Lucide Icon (e.g. MegaphoneIcon)</Label>
                    <Input
                      value={feat.iconName}
                      onChange={(e) => updateFeature(idx, 'iconName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5 col-span-1">
                    <Label className="text-xs font-semibold">Description</Label>
                    <Input
                      value={feat.desc}
                      onChange={(e) => updateFeature(idx, 'desc', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            {data.features.length === 0 && (
              <p className="text-sm text-muted-foreground italic text-center p-4">No features defined. Click 'Add Feature' to add one.</p>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === 'upcoming' && (
        <Card className="rounded-2xl border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold">Upcoming Lab Projects</CardTitle>
              <CardDescription className="text-xs">Configure the placeholder cards showing projects currently in the lab.</CardDescription>
            </div>
            <Button onClick={addUpcomingProduct} size="sm" variant="outline" className="gap-1 rounded-lg">
              <Plus className="h-3.5 w-3.5" /> Add Lab Project
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.upcomingProducts.map((prod, idx) => (
              <div key={idx} className="p-4 rounded-xl border bg-muted/5 space-y-3 relative">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-xs font-bold text-primary">Lab Project #{idx + 1}</span>
                  <button
                    onClick={() => deleteUpcomingProduct(idx)}
                    className="text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1 text-[11px]"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1.5 col-span-1">
                    <Label className="text-xs font-semibold">Title</Label>
                    <Input
                      value={prod.title}
                      onChange={(e) => updateUpcomingProduct(idx, 'title', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5 col-span-1">
                    <Label className="text-xs font-semibold">Lucide Icon (e.g. RocketIcon)</Label>
                    <Input
                      value={prod.iconName}
                      onChange={(e) => updateUpcomingProduct(idx, 'iconName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5 col-span-1">
                    <Label className="text-xs font-semibold">Description / Status</Label>
                    <Input
                      value={prod.description}
                      onChange={(e) => updateUpcomingProduct(idx, 'description', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            {data.upcomingProducts.length === 0 && (
              <p className="text-sm text-muted-foreground italic text-center p-4">No upcoming projects configured.</p>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === 'cta' && (
        <Card className="rounded-2xl border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold">Call-To-Action (CTA)</CardTitle>
            <CardDescription className="text-xs">Modify the header text and action button at the bottom of the page.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="cta-heading" className="text-xs font-semibold">CTA Heading</Label>
              <Input
                id="cta-heading"
                value={data.cta?.heading || ''}
                onChange={(e) => updateCTAField('heading', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cta-description" className="text-xs font-semibold">CTA Description</Label>
              <Textarea
                id="cta-description"
                rows={3}
                value={data.cta?.description || ''}
                onChange={(e) => updateCTAField('description', e.target.value)}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="cta-btn-text" className="text-xs font-semibold">Button Text</Label>
                <Input
                  id="cta-btn-text"
                  value={data.cta?.buttonText || ''}
                  onChange={(e) => updateCTAField('buttonText', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cta-btn-href" className="text-xs font-semibold">Button Link</Label>
                <Input
                  id="cta-btn-href"
                  value={data.cta?.buttonHref || ''}
                  onChange={(e) => updateCTAField('buttonHref', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'seo' && (
        <Card className="rounded-2xl border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold">SEO Metadata Settings</CardTitle>
            <CardDescription className="text-xs">Configure meta title, description, and keywords for search optimization.</CardDescription>
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
