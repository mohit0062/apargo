'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { updateSiteSectionAction } from '../../cms-actions'
import { Switch } from '@/components/ui/switch'
import {
  Check, Loader2, Plus, Trash2, X, Sparkles, Sliders, Globe, Users, CreditCard, Info
} from 'lucide-react'

interface AudienceItem {
  title: string
  description: string
  iconName: string
}

interface PlanItem {
  name: string
  price: number
  description: string
  features: string[]
  iconName: string
  isHighlighted: boolean
}

interface AIGreentickData {
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
  audience: AudienceItem[]
  plans: PlanItem[]
  cta: {
    heading: string
    description: string
    buttonText: string
    buttonHref: string
    secondaryButtonText: string
    secondaryButtonHref: string
  }
}

interface AIGreentickCMSClientProps {
  initialData: AIGreentickData
}

export default function AIGreentickCMSClient({ initialData }: AIGreentickCMSClientProps) {
  const [activeTab, setActiveTab] = useState<'hero' | 'audience' | 'plans' | 'cta' | 'seo'>('hero')
  const [data, setData] = useState<AIGreentickData>(initialData)
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
    const result = await updateSiteSectionAction('page_ai_greentick', data)
    setSaving(false)
    if (result.error) {
      showStatus('error', result.error)
    } else {
      showStatus('success', 'AI Greentick Page CMS updated successfully!')
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

  // Audience Actions
  const updateAudienceItem = (index: number, field: keyof AudienceItem, value: string) => {
    setData(prev => {
      const audience = [...prev.audience]
      audience[index] = { ...audience[index], [field]: value }
      return { ...prev, audience }
    })
  }

  const addAudienceItem = () => {
    const newItem: AudienceItem = {
      title: 'New Audience Segment',
      description: 'Describe who this is for...',
      iconName: 'ShapesIcon'
    }
    setData(prev => ({
      ...prev,
      audience: [...prev.audience, newItem]
    }))
  }

  const deleteAudienceItem = (index: number) => {
    setData(prev => ({
      ...prev,
      audience: prev.audience.filter((_, i) => i !== index)
    }))
  }

  // Plans Actions
  const updatePlanField = (index: number, field: keyof PlanItem, value: any) => {
    setData(prev => {
      const plans = [...prev.plans]
      plans[index] = { ...plans[index], [field]: value }
      return { ...prev, plans }
    })
  }

  const addPlanItem = () => {
    const newPlan: PlanItem = {
      name: 'Pro',
      price: 99,
      description: 'Best plan description...',
      features: ['Feature 1', 'Feature 2'],
      iconName: 'SparklesIcon',
      isHighlighted: false
    }
    setData(prev => ({
      ...prev,
      plans: [...prev.plans, newPlan]
    }))
  }

  const deletePlanItem = (index: number) => {
    setData(prev => ({
      ...prev,
      plans: prev.plans.filter((_, i) => i !== index)
    }))
  }

  // Plan Features Actions
  const updatePlanFeature = (planIndex: number, featureIndex: number, value: string) => {
    setData(prev => {
      const plans = [...prev.plans]
      const features = [...plans[planIndex].features]
      features[featureIndex] = value
      plans[planIndex] = { ...plans[planIndex], features }
      return { ...prev, plans }
    })
  }

  const addPlanFeature = (planIndex: number) => {
    setData(prev => {
      const plans = [...prev.plans]
      plans[planIndex] = {
        ...plans[planIndex],
        features: [...plans[planIndex].features, 'New Feature']
      }
      return { ...prev, plans }
    })
  }

  const deletePlanFeature = (planIndex: number, featureIndex: number) => {
    setData(prev => {
      const plans = [...prev.plans]
      plans[planIndex] = {
        ...plans[planIndex],
        features: plans[planIndex].features.filter((_, i) => i !== featureIndex)
      }
      return { ...prev, plans }
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
            AI Greentick Page Editor
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Modify any section below, then save all changes to update the live AI Greentick page.
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
          onClick={() => setActiveTab('audience')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'audience' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Users className="h-3.5 w-3.5" />
          Audience
        </button>
        <button
          onClick={() => setActiveTab('plans')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'plans' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <CreditCard className="h-3.5 w-3.5" />
          Pricing Plans
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

      {activeTab === 'audience' && (
        <Card className="rounded-2xl border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold">Target Audience Segments</CardTitle>
              <CardDescription className="text-xs">Configure who AI Greentick is built for.</CardDescription>
            </div>
            <Button onClick={addAudienceItem} size="sm" variant="outline" className="gap-1 rounded-lg">
              <Plus className="h-3.5 w-3.5" /> Add Segment
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.audience.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border bg-muted/5 space-y-3 relative">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-xs font-bold text-primary">Audience Segment #{idx + 1}</span>
                  <button
                    onClick={() => deleteAudienceItem(idx)}
                    className="text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1 text-[11px]"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1.5 col-span-1">
                    <Label className="text-xs font-semibold">Title</Label>
                    <Input
                      value={item.title}
                      onChange={(e) => updateAudienceItem(idx, 'title', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5 col-span-1">
                    <Label className="text-xs font-semibold">Lucide Icon (e.g. ShapesIcon)</Label>
                    <Input
                      value={item.iconName}
                      onChange={(e) => updateAudienceItem(idx, 'iconName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5 col-span-1">
                    <Label className="text-xs font-semibold">Description</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => updateAudienceItem(idx, 'description', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            {data.audience.length === 0 && (
              <p className="text-sm text-muted-foreground italic text-center p-4">No audience segments defined.</p>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === 'plans' && (
        <Card className="rounded-2xl border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold">Pricing Plans</CardTitle>
              <CardDescription className="text-xs">Manage plans, features list per plan, pricing tier details and highlighting options.</CardDescription>
            </div>
            <Button onClick={addPlanItem} size="sm" variant="outline" className="gap-1 rounded-lg">
              <Plus className="h-3.5 w-3.5" /> Add Plan
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {data.plans.map((plan, planIdx) => (
              <div key={planIdx} className="p-6 rounded-2xl border bg-muted/5 space-y-4 relative">
                <div className="flex justify-between items-center pb-2 border-b">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-primary">Plan #{planIdx + 1}: {plan.name}</span>
                    <div className="flex items-center gap-1.5">
                      <Switch
                        id={`highlight-${planIdx}`}
                        checked={plan.isHighlighted}
                        onCheckedChange={(checked) => updatePlanField(planIdx, 'isHighlighted', checked)}
                      />
                      <Label htmlFor={`highlight-${planIdx}`} className="text-xs font-medium cursor-pointer">
                        Highlight Plan
                      </Label>
                    </div>
                  </div>
                  <button
                    onClick={() => deletePlanItem(planIdx)}
                    className="text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1 text-[11px]"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove Plan
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Plan Name</Label>
                    <Input
                      value={plan.name}
                      onChange={(e) => updatePlanField(planIdx, 'name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Monthly Price ($)</Label>
                    <Input
                      type="number"
                      value={plan.price}
                      onChange={(e) => updatePlanField(planIdx, 'price', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Lucide Icon (e.g. LeafIcon)</Label>
                    <Input
                      value={plan.iconName || ''}
                      onChange={(e) => updatePlanField(planIdx, 'iconName', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Plan Description</Label>
                  <Input
                    value={plan.description}
                    onChange={(e) => updatePlanField(planIdx, 'description', e.target.value)}
                  />
                </div>

                {/* Features of this plan */}
                <div className="space-y-2 pt-2 border-t border-border/40">
                  <div className="flex justify-between items-center">
                    <Label className="text-xs font-bold text-foreground">Features List</Label>
                    <Button
                      onClick={() => addPlanFeature(planIdx)}
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs gap-1 hover:bg-muted font-medium text-primary rounded-md"
                    >
                      <Plus className="h-3 w-3" /> Add Feature Item
                    </Button>
                  </div>
                  <div className="grid gap-2">
                    {plan.features.map((feature, featIdx) => (
                      <div key={featIdx} className="flex gap-2 items-center">
                        <Input
                          value={feature}
                          onChange={(e) => updatePlanFeature(planIdx, featIdx, e.target.value)}
                          className="h-8 text-xs"
                        />
                        <Button
                          onClick={() => deletePlanFeature(planIdx, featIdx)}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-red-500 rounded-md shrink-0"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                    {plan.features.length === 0 && (
                      <p className="text-xs text-muted-foreground italic pl-1">No feature items configured yet.</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {data.plans.length === 0 && (
              <p className="text-sm text-muted-foreground italic text-center p-4">No plans defined.</p>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === 'cta' && (
        <Card className="rounded-2xl border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold">Call-To-Action (CTA)</CardTitle>
            <CardDescription className="text-xs">Modify the headers and action buttons at the bottom of the page.</CardDescription>
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
                <Label htmlFor="cta-btn-text" className="text-xs font-semibold">Primary Button Text</Label>
                <Input
                  id="cta-btn-text"
                  value={data.cta?.buttonText || ''}
                  onChange={(e) => updateCTAField('buttonText', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cta-btn-href" className="text-xs font-semibold">Primary Button Link</Label>
                <Input
                  id="cta-btn-href"
                  value={data.cta?.buttonHref || ''}
                  onChange={(e) => updateCTAField('buttonHref', e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="cta-sbtn-text" className="text-xs font-semibold">Secondary Button Text</Label>
                <Input
                  id="cta-sbtn-text"
                  value={data.cta?.secondaryButtonText || ''}
                  onChange={(e) => updateCTAField('secondaryButtonText', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cta-sbtn-href" className="text-xs font-semibold">Secondary Button Link</Label>
                <Input
                  id="cta-sbtn-href"
                  value={data.cta?.secondaryButtonHref || ''}
                  onChange={(e) => updateCTAField('secondaryButtonHref', e.target.value)}
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
