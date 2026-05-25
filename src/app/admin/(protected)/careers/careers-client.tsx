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
  Users, Award, Gift, Zap, ShieldAlert, Globe, Sparkles
} from 'lucide-react'

interface HeroStat {
  value: string
  label: string
}

interface FitSignal {
  iconName: string
  title: string
  description: string
}

interface BenefitItem {
  iconName: string
  title: string
  description: string
}

interface HiringStep {
  title: string
  description: string
}

interface CareersData {
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
  heroStats: HeroStat[]
  fitSignals: FitSignal[]
  benefits: BenefitItem[]
  hiringSteps: HiringStep[]
  notForYou: string[]
}

interface CareersCMSClientProps {
  initialData: CareersData
}

export default function CareersCMSClient({ initialData }: CareersCMSClientProps) {
  const [activeTab, setActiveTab] = useState<'hero' | 'fit-stats' | 'benefits-steps' | 'filters' | 'seo'>('hero')
  const [data, setData] = useState<CareersData>(initialData)
  const [saving, setSaving] = useState(false)
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Sub-states
  const [newNotForYou, setNewNotForYou] = useState('')

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text })
    setTimeout(() => {
      setStatusMsg(null)
    }, 5000)
  }

  const handleSaveAll = async () => {
    setSaving(true)
    const result = await updateSiteSectionAction('page_careers', data)
    setSaving(false)
    if (result.error) {
      showStatus('error', result.error)
    } else {
      showStatus('success', 'Careers Page CMS updated successfully!')
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

  // Stats Operations
  const updateStatField = (index: number, field: keyof HeroStat, value: string) => {
    setData(prev => {
      const heroStats = [...prev.heroStats]
      heroStats[index] = { ...heroStats[index], [field]: value }
      return { ...prev, heroStats }
    })
  }

  // Fit Signals Operations
  const updateFitSignalField = (index: number, field: keyof FitSignal, value: string) => {
    setData(prev => {
      const fitSignals = [...prev.fitSignals]
      fitSignals[index] = { ...fitSignals[index], [field]: value }
      return { ...prev, fitSignals }
    })
  }

  const addFitSignal = () => {
    const newSignal: FitSignal = {
      title: 'New Fit Signal',
      description: 'Explain this trait...',
      iconName: 'ShieldCheckIcon'
    }
    setData(prev => ({
      ...prev,
      fitSignals: [...prev.fitSignals, newSignal]
    }))
  }

  const deleteFitSignal = (index: number) => {
    setData(prev => ({
      ...prev,
      fitSignals: prev.fitSignals.filter((_, i) => i !== index)
    }))
  }

  // Benefits Operations
  const updateBenefitField = (index: number, field: keyof BenefitItem, value: string) => {
    setData(prev => {
      const benefits = [...prev.benefits]
      benefits[index] = { ...benefits[index], [field]: value }
      return { ...prev, benefits }
    })
  }

  const addBenefit = () => {
    const newBenefit: BenefitItem = {
      title: 'New Benefit',
      description: 'Detail of package perks...',
      iconName: 'SparklesIcon'
    }
    setData(prev => ({
      ...prev,
      benefits: [...prev.benefits, newBenefit]
    }))
  }

  const deleteBenefit = (index: number) => {
    setData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }))
  }

  // Hiring Steps Operations
  const updateHiringStepField = (index: number, field: keyof HiringStep, value: string) => {
    setData(prev => {
      const hiringSteps = [...prev.hiringSteps]
      hiringSteps[index] = { ...hiringSteps[index], [field]: value }
      return { ...prev, hiringSteps }
    })
  }

  const addHiringStep = () => {
    const newStep: HiringStep = {
      title: 'New Step',
      description: 'Explain what candidate does here...'
    }
    setData(prev => ({
      ...prev,
      hiringSteps: [...prev.hiringSteps, newStep]
    }))
  }

  const deleteHiringStep = (index: number) => {
    setData(prev => ({
      ...prev,
      hiringSteps: prev.hiringSteps.filter((_, i) => i !== index)
    }))
  }

  const moveHiringStep = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1
    if (targetIdx < 0 || targetIdx >= data.hiringSteps.length) return
    setData(prev => {
      const hiringSteps = [...prev.hiringSteps]
      const temp = hiringSteps[index]
      hiringSteps[index] = hiringSteps[targetIdx]
      hiringSteps[targetIdx] = temp
      return { ...prev, hiringSteps }
    })
  }

  // Not For You Operations
  const addNotForYouItem = () => {
    if (!newNotForYou.trim()) return
    setData(prev => ({
      ...prev,
      notForYou: [...prev.notForYou, newNotForYou.trim()]
    }))
    setNewNotForYou('')
  }

  const deleteNotForYouItem = (index: number) => {
    setData(prev => ({
      ...prev,
      notForYou: prev.notForYou.filter((_, i) => i !== index)
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
            Careers Editor
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Modify text elements, list items, hiring process cards, and SEO settings.
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
      <div className="flex border-b gap-1 bg-muted/10 p-1.5 rounded-xl border max-w-xl">
        <button
          onClick={() => setActiveTab('hero')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'hero' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Users className="h-3.5 w-3.5" />
          Hero
        </button>
        <button
          onClick={() => setActiveTab('fit-stats')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'fit-stats' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Award className="h-3.5 w-3.5" />
          Fit & Stats
        </button>
        <button
          onClick={() => setActiveTab('benefits-steps')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'benefits-steps' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Gift className="h-3.5 w-3.5" />
          Benefits & Pipeline
        </button>
        <button
          onClick={() => setActiveTab('filters')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'filters' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <ShieldAlert className="h-3.5 w-3.5" />
          Not For You
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
            <CardDescription className="text-xs">Edit badge text, main heading, and introduction text block.</CardDescription>
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
                rows={5}
                value={data.hero.description || ''}
                onChange={(e) => updateHeroField('description', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'fit-stats' && (
        <div className="grid gap-6">
          {/* Stats Section */}
          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold">Hero Counter Statistics</CardTitle>
              <CardDescription className="text-xs">Configure the counter statistics block beside the hero section (maximum 3).</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              {data.heroStats?.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-xl border bg-muted/10 space-y-3">
                  <span className="text-xs font-bold text-primary block">Stat Counter #{idx + 1}</span>
                  <div className="space-y-1">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Big Value (e.g. Days)</Label>
                    <Input
                      value={stat.value}
                      onChange={(e) => updateStatField(idx, 'value', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Label Description</Label>
                    <Input
                      value={stat.label}
                      onChange={(e) => updateStatField(idx, 'label', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Fit Signals */}
          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold">Fit Signals / Core Traits</CardTitle>
                <CardDescription className="text-xs">Describe the qualities and expectations you look for in candidates.</CardDescription>
              </div>
              <Button onClick={addFitSignal} variant="outline" size="sm" className="gap-1 rounded-lg">
                <Plus className="h-3.5 w-3.5" /> Add Trait
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.fitSignals?.map((signal, idx) => (
                <div key={idx} className="p-4 rounded-xl border bg-muted/5 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-xs font-bold text-primary">Trait Card #{idx + 1}</span>
                    <button
                      onClick={() => deleteFitSignal(idx)}
                      className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-1 text-[11px] font-semibold"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">Title</Label>
                      <Input
                        value={signal.title}
                        onChange={(e) => updateFitSignalField(idx, 'title', e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">Lucide Icon (e.g. ShieldCheckIcon)</Label>
                      <Input
                        value={signal.iconName}
                        onChange={(e) => updateFitSignalField(idx, 'iconName', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Description</Label>
                    <Textarea
                      rows={2}
                      value={signal.description}
                      onChange={(e) => updateFitSignalField(idx, 'description', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'benefits-steps' && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Perks & Benefits */}
          <Card className="rounded-2xl border-border/60 shadow-sm h-fit">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-sm font-bold">Perks & Benefits</CardTitle>
                <CardDescription className="text-[10px]">Perks details displayed in grid</CardDescription>
              </div>
              <Button onClick={addBenefit} variant="outline" size="sm" className="h-7 text-xs gap-1 rounded-md">
                <Plus className="h-3 w-3" /> Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {data.benefits?.map((benefit, idx) => (
                <div key={idx} className="p-3 rounded-lg border bg-background space-y-3 relative">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-bold text-primary">Benefit #{idx + 1}</span>
                    <button onClick={() => deleteBenefit(idx)} className="text-muted-foreground hover:text-red-500">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="grid gap-2 grid-cols-2">
                    <div className="space-y-1">
                      <Label className="text-[10px] font-medium text-muted-foreground">Title</Label>
                      <Input
                        value={benefit.title}
                        onChange={(e) => updateBenefitField(idx, 'title', e.target.value)}
                        className="h-8 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-medium text-muted-foreground">Icon</Label>
                      <Input
                        value={benefit.iconName}
                        onChange={(e) => updateBenefitField(idx, 'iconName', e.target.value)}
                        className="h-8 text-xs"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-medium text-muted-foreground">Description</Label>
                    <Textarea
                      rows={2}
                      value={benefit.description}
                      onChange={(e) => updateBenefitField(idx, 'description', e.target.value)}
                      className="text-xs"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Hiring Pipeline Steps */}
          <Card className="rounded-2xl border-border/60 shadow-sm h-fit">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-sm font-bold">Hiring Process Pipeline</CardTitle>
                <CardDescription className="text-[10px]">Sequential steps for hiring roadmap</CardDescription>
              </div>
              <Button onClick={addHiringStep} variant="outline" size="sm" className="h-7 text-xs gap-1 rounded-md">
                <Plus className="h-3 w-3" /> Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {data.hiringSteps?.map((step, idx) => (
                <div key={idx} className="flex gap-2 items-start p-3 rounded-lg border bg-background relative">
                  <div className="flex-1 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-primary block">Step {idx + 1}</span>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-medium text-muted-foreground">Title</Label>
                      <Input
                        value={step.title}
                        onChange={(e) => updateHiringStepField(idx, 'title', e.target.value)}
                        className="h-8 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-medium text-muted-foreground">Description</Label>
                      <Textarea
                        rows={2}
                        value={step.description}
                        onChange={(e) => updateHiringStepField(idx, 'description', e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-0.5 bg-muted/40 border rounded p-0.5 shrink-0">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-6 hover:bg-background"
                      disabled={idx === 0}
                      onClick={() => moveHiringStep(idx, 'up')}
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-6 hover:bg-background"
                      disabled={idx === data.hiringSteps.length - 1}
                      onClick={() => moveHiringStep(idx, 'down')}
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-6 hover:bg-red-500/10 text-muted-foreground hover:text-red-500"
                      onClick={() => deleteHiringStep(idx)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'filters' && (
        <Card className="rounded-2xl border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold">"Not For You" Disqualifiers</CardTitle>
            <CardDescription className="text-xs">Add bullet points explaining who might NOT be a good fit for Apargo, ensuring transparent expectations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newNotForYou}
                onChange={(e) => setNewNotForYou(e.target.value)}
                placeholder="e.g. You prefer rigid corporate hierarchy over autonomy..."
                onKeyDown={(e) => { if (e.key === 'Enter') addNotForYouItem() }}
              />
              <Button onClick={addNotForYouItem} className="font-semibold shrink-0">
                <Plus className="h-4 w-4 mr-1" /> Add Rule
              </Button>
            </div>

            <div className="space-y-2 border-t pt-4">
              {data.notForYou?.map((rule, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg border bg-muted/5 text-sm">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span className="truncate text-foreground/80">{rule}</span>
                  </div>
                  <button
                    onClick={() => deleteNotForYouItem(idx)}
                    className="text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {data.notForYou?.length === 0 && (
                <p className="text-xs text-muted-foreground italic text-center py-6">No filters added yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
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
