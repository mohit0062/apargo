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
  Mail, MessageSquare, ListCollapse, Globe, Sparkles
} from 'lucide-react'

interface ContactCard {
  iconName: string
  title: string
  description: string
  ctaText: string
  ctaLink: string
}

interface StepItem {
  number: string
  iconName: string
  title: string
  description: string
}

interface ContactData {
  seo: {
    title: string
    description: string
    keywords: string
  }
  heading: string
  subtitle: string
  contactCards: ContactCard[]
  steps: StepItem[]
}

interface ContactCMSClientProps {
  initialData: ContactData
}

export default function ContactCMSClient({ initialData }: ContactCMSClientProps) {
  const [activeTab, setActiveTab] = useState<'hero' | 'cards' | 'steps' | 'seo'>('hero')
  const [data, setData] = useState<ContactData>(initialData)
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
    const result = await updateSiteSectionAction('page_contact', data)
    setSaving(false)
    if (result.error) {
      showStatus('error', result.error)
    } else {
      showStatus('success', 'Contact Page CMS updated successfully!')
    }
  }

  // Hero Fields Update
  const updateField = (field: keyof ContactData, value: string) => {
    setData(prev => ({
      ...prev,
      [field]: value
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

  // Contact Cards Operations
  const updateCardField = (index: number, field: keyof ContactCard, value: string) => {
    setData(prev => {
      const contactCards = [...prev.contactCards]
      contactCards[index] = { ...contactCards[index], [field]: value }
      return { ...prev, contactCards }
    })
  }

  const addContactCard = () => {
    const newCard: ContactCard = {
      title: 'New Department',
      description: 'Contact info details...',
      ctaText: 'hello@apargo.com',
      ctaLink: 'mailto:hello@apargo.com',
      iconName: 'MailIcon'
    }
    setData(prev => ({
      ...prev,
      contactCards: [...prev.contactCards, newCard]
    }))
  }

  const deleteContactCard = (index: number) => {
    setData(prev => ({
      ...prev,
      contactCards: prev.contactCards.filter((_, i) => i !== index)
    }))
  }

  // Steps Operations
  const updateStepField = (index: number, field: keyof StepItem, value: string) => {
    setData(prev => {
      const steps = [...prev.steps]
      steps[index] = { ...steps[index], [field]: value }
      return { ...prev, steps }
    })
  }

  const addStep = () => {
    const nextNum = (data.steps.length + 1).toString()
    const newStep: StepItem = {
      number: nextNum,
      title: 'Next Step',
      description: 'Describe what candidate or prospect experiences...',
      iconName: 'CheckCircle2Icon'
    }
    setData(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }))
  }

  const deleteStep = (index: number) => {
    setData(prev => {
      const steps = prev.steps.filter((_, i) => i !== index)
      // Renumber steps
      const renumbered = steps.map((s, idx) => ({ ...s, number: (idx + 1).toString() }))
      return { ...prev, steps: renumbered }
    })
  }

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1
    if (targetIdx < 0 || targetIdx >= data.steps.length) return
    setData(prev => {
      const steps = [...prev.steps]
      const temp = steps[index]
      steps[index] = steps[targetIdx]
      steps[targetIdx] = temp
      // Renumber steps
      const renumbered = steps.map((s, idx) => ({ ...s, number: (idx + 1).toString() }))
      return { ...prev, steps: renumbered }
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
            Contact Editor
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Modify the main page titles, contact cards (Sales, Support, Map), next steps roadmap, and SEO meta configuration.
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
          <MessageSquare className="h-3.5 w-3.5" />
          Intro Text
        </button>
        <button
          onClick={() => setActiveTab('cards')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'cards' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Mail className="h-3.5 w-3.5" />
          Contact Cards
        </button>
        <button
          onClick={() => setActiveTab('steps')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'steps' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <ListCollapse className="h-3.5 w-3.5" />
          "What Happens Next"
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
            <CardTitle className="text-base font-bold">Contact Page Headers</CardTitle>
            <CardDescription className="text-xs">Edit the main page titles and subtitles displayed above the contact form.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="contact-heading" className="text-xs font-semibold">Heading Title</Label>
              <Input
                id="contact-heading"
                value={data.heading || ''}
                onChange={(e) => updateField('heading', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contact-subtitle" className="text-xs font-semibold">Subtitle Description</Label>
              <Textarea
                id="contact-subtitle"
                rows={4}
                value={data.subtitle || ''}
                onChange={(e) => updateField('subtitle', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'cards' && (
        <Card className="rounded-2xl border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-bold">Info & Contact Cards ({data.contactCards?.length})</CardTitle>
              <CardDescription className="text-xs">Modify the grid cards displaying contact pathways.</CardDescription>
            </div>
            <Button onClick={addContactCard} variant="outline" size="sm" className="gap-1 rounded-lg">
              <Plus className="h-3.5 w-3.5" /> Add Card
            </Button>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {data.contactCards?.map((card, idx) => (
              <div key={idx} className="p-4 rounded-xl border bg-muted/5 space-y-3 relative">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-xs font-bold text-primary">Card #{idx + 1}</span>
                  <button
                    onClick={() => deleteContactCard(idx)}
                    className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-1 text-[11px] font-semibold"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
                <div className="grid gap-2 grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-semibold">Title</Label>
                    <Input
                      value={card.title}
                      onChange={(e) => updateCardField(idx, 'title', e.target.value)}
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-semibold">Lucide Icon (e.g. MailIcon)</Label>
                    <Input
                      value={card.iconName}
                      onChange={(e) => updateCardField(idx, 'iconName', e.target.value)}
                      className="h-8 text-xs"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-semibold">Description</Label>
                  <Textarea
                    rows={2}
                    value={card.description}
                    onChange={(e) => updateCardField(idx, 'description', e.target.value)}
                    className="text-xs"
                  />
                </div>
                <div className="grid gap-2 grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-semibold">CTA Button Label</Label>
                    <Input
                      value={card.ctaText}
                      onChange={(e) => updateCardField(idx, 'ctaText', e.target.value)}
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-semibold">CTA Link (mailto: or URL)</Label>
                    <Input
                      value={card.ctaLink}
                      onChange={(e) => updateCardField(idx, 'ctaLink', e.target.value)}
                      className="h-8 text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {activeTab === 'steps' && (
        <Card className="rounded-2xl border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-bold">"What Happens Next" Roadmap Steps</CardTitle>
              <CardDescription className="text-xs">Describe the response pipeline step-by-step for prospective inquiries.</CardDescription>
            </div>
            <Button onClick={addStep} variant="outline" size="sm" className="gap-1 rounded-lg">
              <Plus className="h-3.5 w-3.5" /> Add Step
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.steps?.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start p-4 rounded-xl border bg-muted/5 relative">
                <div className="flex-1 space-y-3">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1.5 md:col-span-1">
                      <Label className="text-xs font-semibold">Step Number (Auto-assigned)</Label>
                      <Input value={step.number} disabled className="bg-muted cursor-not-allowed" />
                    </div>
                    <div className="space-y-1.5 md:col-span-1">
                      <Label className="text-xs font-semibold">Title</Label>
                      <Input
                        value={step.title}
                        onChange={(e) => updateStepField(idx, 'title', e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-1">
                      <Label className="text-xs font-semibold">Lucide Icon (e.g. MailIcon)</Label>
                      <Input
                        value={step.iconName}
                        onChange={(e) => updateStepField(idx, 'iconName', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Description</Label>
                    <Textarea
                      rows={2}
                      value={step.description}
                      onChange={(e) => updateStepField(idx, 'description', e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 bg-background border rounded-lg p-0.5 shrink-0">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-7 hover:bg-muted"
                    disabled={idx === 0}
                    onClick={() => moveStep(idx, 'up')}
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-7 hover:bg-muted"
                    disabled={idx === data.steps.length - 1}
                    onClick={() => moveStep(idx, 'down')}
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-7 hover:bg-red-500/10 text-muted-foreground hover:text-red-500"
                    onClick={() => deleteStep(idx)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
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
