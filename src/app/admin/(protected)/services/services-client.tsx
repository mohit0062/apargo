'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { updateSiteSectionAction } from '../cms-actions'
import { Check, Loader2, Plus, Trash2, ArrowUp, ArrowDown, HelpCircle } from 'lucide-react'
import * as Lucide from 'lucide-react'

// Slugs and labels for all 9 services
const SERVICES = [
  { slug: 'web-development', name: 'Web Development' },
  { slug: 'mobile-app-development', name: 'Mobile App Development' },
  { slug: 'custom-software', name: 'Custom Software' },
  { slug: 'ai-machine-learning', name: 'AI & Machine Learning' },
  { slug: 'saas-product-development', name: 'SaaS Product Development' },
  { slug: 'cloud-devops', name: 'Cloud & DevOps' },
  { slug: 'ui-ux-design', name: 'UI/UX Design' },
  { slug: 'digital-marketing-seo', name: 'Digital Marketing & SEO' },
  { slug: 'it-consulting', name: 'IT Consulting' }
]

// Common Lucide icons list to suggest for features list
const POPULAR_ICONS = [
  'Globe', 'Smartphone', 'Bot', 'Boxes', 'Database', 'Cloud', 
  'ShieldCheck', 'Palette', 'SearchCheck', 'Briefcase', 'Layers', 
  'CreditCard', 'LayoutDashboard', 'ShoppingCart', 'Activity', 
  'Users', 'Calendar', 'Rocket', 'Search', 'Sparkles', 'Workflow'
]

interface ServicesClientProps {
  initialServicesData: Record<string, any>
}

// Interactive client-side dynamic Lucide Icon rendering
function ClientIconPreview({ iconName }: { iconName: string }) {
  if (!iconName) return <HelpCircle className="h-5 w-5 text-muted-foreground" />
  const cleanName = iconName.endsWith('Icon') ? iconName.slice(0, -4) : iconName
  const IconComponent = (Lucide as any)[cleanName] || (Lucide as any)[iconName] || HelpCircle
  return <IconComponent className="h-5 w-5 text-primary" />
}

export default function ServicesClient({ initialServicesData }: ServicesClientProps) {
  const [selectedSlug, setSelectedSlug] = useState('web-development')
  const [servicesData, setServicesData] = useState<Record<string, any>>(initialServicesData)
  const [saving, setSaving] = useState(false)
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Feature Add State
  const [newFeature, setNewFeature] = useState({ title: '', description: '', iconName: 'Globe' })
  const [isAddingFeature, setIsAddingFeature] = useState(false)

  // FAQ Add State
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' })
  const [isAddingFaq, setIsAddingFaq] = useState(false)

  const activeService = servicesData[selectedSlug] || { hero: {}, featuresList: [], faqItems: [] }

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text })
    setTimeout(() => {
      setStatusMsg(null)
    }, 5000)
  }

  // Handle saving the currently active service CMS config
  const handleSaveActiveService = async () => {
    setSaving(true)
    const dbKey = `service_${selectedSlug}`
    const result = await updateSiteSectionAction(dbKey, activeService)
    setSaving(false)

    if (result.error) {
      showStatus('error', result.error)
    } else {
      showStatus('success', `CMS Configuration for "${SERVICES.find(s => s.slug === selectedSlug)?.name}" saved successfully!`)
    }
  }

  // Hero Fields Update
  const updateHeroField = (field: string, value: string) => {
    setServicesData({
      ...servicesData,
      [selectedSlug]: {
        ...activeService,
        hero: {
          ...activeService.hero,
          [field]: value
        }
      }
    })
  }

  // Features List Update
  const updateFeatureField = (index: number, field: string, value: string) => {
    const updatedFeatures = [...(activeService.featuresList || [])]
    updatedFeatures[index] = {
      ...updatedFeatures[index],
      [field]: value
    }
    setServicesData({
      ...servicesData,
      [selectedSlug]: {
        ...activeService,
        featuresList: updatedFeatures
      }
    })
  }

  const deleteFeature = (index: number) => {
    const updatedFeatures = (activeService.featuresList || []).filter((_: any, i: number) => i !== index)
    setServicesData({
      ...servicesData,
      [selectedSlug]: {
        ...activeService,
        featuresList: updatedFeatures
      }
    })
  }

  const moveFeature = (index: number, direction: 'up' | 'down') => {
    const features = [...(activeService.featuresList || [])]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= features.length) return

    const temp = features[index]
    features[index] = features[targetIndex]
    features[targetIndex] = temp

    setServicesData({
      ...servicesData,
      [selectedSlug]: {
        ...activeService,
        featuresList: features
      }
    })
  }

  const saveNewFeature = () => {
    if (!newFeature.title.trim() || !newFeature.description.trim()) return
    const updatedFeatures = [...(activeService.featuresList || []), newFeature]
    setServicesData({
      ...servicesData,
      [selectedSlug]: {
        ...activeService,
        featuresList: updatedFeatures
      }
    })
    setIsAddingFeature(false)
    setNewFeature({ title: '', description: '', iconName: 'Globe' })
  }

  // FAQ Items Update
  const updateFaqField = (index: number, field: string, value: string) => {
    const updatedFaqs = [...(activeService.faqItems || [])]
    updatedFaqs[index] = {
      ...updatedFaqs[index],
      [field]: value
    }
    setServicesData({
      ...servicesData,
      [selectedSlug]: {
        ...activeService,
        faqItems: updatedFaqs
      }
    })
  }

  const deleteFaq = (index: number) => {
    const updatedFaqs = (activeService.faqItems || []).filter((_: any, i: number) => i !== index)
    setServicesData({
      ...servicesData,
      [selectedSlug]: {
        ...activeService,
        faqItems: updatedFaqs
      }
    })
  }

  const moveFaq = (index: number, direction: 'up' | 'down') => {
    const faqs = [...(activeService.faqItems || [])]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= faqs.length) return

    const temp = faqs[index]
    faqs[index] = faqs[targetIndex]
    faqs[targetIndex] = temp

    setServicesData({
      ...servicesData,
      [selectedSlug]: {
        ...activeService,
        faqItems: faqs
      }
    })
  }

  const saveNewFaq = () => {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) return
    const updatedFaqs = [...(activeService.faqItems || []), newFaq]
    setServicesData({
      ...servicesData,
      [selectedSlug]: {
        ...activeService,
        faqItems: updatedFaqs
      }
    })
    setIsAddingFaq(false)
    setNewFaq({ question: '', answer: '' })
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {statusMsg && (
        <div
          className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border transition-all duration-300 ${
            statusMsg.type === 'success'
              ? 'bg-green-500/10 text-green-500 border-green-500/20'
              : 'bg-red-500/10 text-red-500 border-red-500/20'
          }`}
        >
          {statusMsg.type === 'success' && <Check className="h-4 w-4" />}
          <span className="text-sm font-medium">{statusMsg.text}</span>
        </div>
      )}

      {/* Services Selector & Save Card */}
      <Card className="backdrop-blur-md bg-card/80 border">
        <CardContent className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 flex-1">
            <Label htmlFor="service-selector" className="text-sm font-semibold text-foreground">Select Service Page to Edit</Label>
            <div className="relative mt-1">
              <select
                id="service-selector"
                value={selectedSlug}
                onChange={(e) => {
                  setSelectedSlug(e.target.value)
                  setIsAddingFeature(false)
                  setIsAddingFaq(false)
                }}
                className="w-full md:w-80 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {SERVICES.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button
            size="lg"
            onClick={handleSaveActiveService}
            disabled={saving}
            className="w-full md:w-auto font-semibold flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Save Selected Service
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Main CMS Editor Tabs */}
      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid grid-cols-3 max-w-md bg-muted/50 p-1 rounded-lg border">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="features">Features list</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>

        {/* 1. HERO SECTION EDITOR */}
        <TabsContent value="hero" className="space-y-6 mt-4">
          <Card className="backdrop-blur-md bg-card/50 border">
            <CardHeader>
              <CardTitle>Hero Section Content</CardTitle>
              <CardDescription>
                Customize badge, title, subtitle, descriptive text, and call-to-action buttons for the header block.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-badge">Badge Text</Label>
                  <Input
                    id="hero-badge"
                    value={activeService.hero?.badgeText || ''}
                    onChange={(e) => updateHeroField('badgeText', e.target.value)}
                    placeholder="e.g. Services"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-subtitle">Subtitle Text (Category)</Label>
                  <Input
                    id="hero-subtitle"
                    value={activeService.hero?.subtitleText || ''}
                    onChange={(e) => updateHeroField('subtitleText', e.target.value)}
                    placeholder="e.g. Web Development"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hero-title">Hero Title</Label>
                <Textarea
                  id="hero-title"
                  rows={2}
                  value={activeService.hero?.title || ''}
                  onChange={(e) => updateHeroField('title', e.target.value)}
                  placeholder="Enter high-impact title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hero-description">Hero Description</Label>
                <Textarea
                  id="hero-description"
                  rows={3}
                  value={activeService.hero?.description || ''}
                  onChange={(e) => updateHeroField('description', e.target.value)}
                  placeholder="Enter detailed service description"
                />
              </div>

              <hr className="border-muted-foreground/20 my-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4 border p-4 rounded-lg bg-muted/20">
                  <h4 className="text-sm font-semibold">Primary Button CTA</h4>
                  <div className="space-y-2">
                    <Label htmlFor="hero-primary-text">Button Text</Label>
                    <Input
                      id="hero-primary-text"
                      value={activeService.hero?.primaryBtnText || ''}
                      onChange={(e) => updateHeroField('primaryBtnText', e.target.value)}
                      placeholder="Start a Project"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero-primary-href">Button Destination Href</Label>
                    <Input
                      id="hero-primary-href"
                      value={activeService.hero?.primaryBtnHref || ''}
                      onChange={(e) => updateHeroField('primaryBtnHref', e.target.value)}
                      placeholder="/contact?intent=consultation"
                    />
                  </div>
                </div>

                <div className="space-y-4 border p-4 rounded-lg bg-muted/20">
                  <h4 className="text-sm font-semibold">Secondary Button CTA</h4>
                  <div className="space-y-2">
                    <Label htmlFor="hero-secondary-text">Button Text</Label>
                    <Input
                      id="hero-secondary-text"
                      value={activeService.hero?.secondaryBtnText || ''}
                      onChange={(e) => updateHeroField('secondaryBtnText', e.target.value)}
                      placeholder="See Work"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero-secondary-href">Button Destination Href</Label>
                    <Input
                      id="hero-secondary-href"
                      value={activeService.hero?.secondaryBtnHref || ''}
                      onChange={(e) => updateHeroField('secondaryBtnHref', e.target.value)}
                      placeholder="/case-studies"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2. FEATURES LIST EDITOR */}
        <TabsContent value="features" className="space-y-6 mt-4">
          <Card className="backdrop-blur-md bg-card/50 border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Features List</CardTitle>
                <CardDescription>
                  Manage the core capabilities and key features highlighting this service.
                </CardDescription>
              </div>
              {!isAddingFeature && (
                <Button onClick={() => setIsAddingFeature(true)} size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" /> Add Feature
                </Button>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Feature Add Form */}
              {isAddingFeature && (
                <div className="border border-primary/20 rounded-lg p-4 bg-primary/5 space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="font-semibold text-primary">New Feature Item</h4>
                    <Button variant="ghost" size="sm" onClick={() => setIsAddingFeature(false)}>Cancel</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="new-feature-title">Feature Title</Label>
                      <Input
                        id="new-feature-title"
                        value={newFeature.title}
                        onChange={(e) => setNewFeature({ ...newFeature, title: e.target.value })}
                        placeholder="e.g. Authenticated Dashboards"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-feature-icon">Lucide Icon name</Label>
                      <div className="flex gap-2">
                        <select
                          id="new-feature-icon"
                          value={newFeature.iconName}
                          onChange={(e) => setNewFeature({ ...newFeature, iconName: e.target.value })}
                          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          {POPULAR_ICONS.map(i => (
                            <option key={i} value={i}>{i}</option>
                          ))}
                        </select>
                        <div className="border rounded bg-muted/40 p-2 flex items-center justify-center shrink-0 w-10">
                          <ClientIconPreview iconName={newFeature.iconName} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-feature-description">Feature Description</Label>
                    <Textarea
                      id="new-feature-description"
                      rows={2}
                      value={newFeature.description}
                      onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                      placeholder="Detail this feature..."
                    />
                  </div>

                  <Button onClick={saveNewFeature} size="sm">Save Feature</Button>
                </div>
              )}

              {/* Existing Features List */}
              <div className="space-y-4">
                {(activeService.featuresList || []).length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
                    No features configured. Click "Add Feature" above to start.
                  </p>
                ) : (
                  (activeService.featuresList || []).map((feature: any, idx: number) => (
                    <div key={idx} className="border rounded-lg p-4 bg-muted/20 relative space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold bg-muted-foreground/15 px-2.5 py-0.5 rounded-full">
                          Feature #{idx + 1}
                        </span>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveFeature(idx, 'up')}
                            disabled={idx === 0}
                            className="h-7 w-7"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveFeature(idx, 'down')}
                            disabled={idx === (activeService.featuresList || []).length - 1}
                            className="h-7 w-7"
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteFeature(idx)}
                            className="h-7 w-7 text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2 md:col-span-2">
                          <Label>Feature Title</Label>
                          <Input
                            value={feature.title || ''}
                            onChange={(e) => updateFeatureField(idx, 'title', e.target.value)}
                            placeholder="e.g. Marketing Sites"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Lucide Icon name</Label>
                          <div className="flex gap-2">
                            <select
                              value={feature.iconName || 'Globe'}
                              onChange={(e) => updateFeatureField(idx, 'iconName', e.target.value)}
                              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            >
                              {POPULAR_ICONS.map(i => (
                                <option key={i} value={i}>{i}</option>
                              ))}
                              {/* Add current if not in popular to support custom inputs */}
                              {feature.iconName && !POPULAR_ICONS.includes(feature.iconName) && (
                                <option value={feature.iconName}>{feature.iconName}</option>
                              )}
                            </select>
                            <div className="border rounded bg-muted/40 p-2 flex items-center justify-center shrink-0 w-10">
                              <ClientIconPreview iconName={feature.iconName} />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Feature Description</Label>
                        <Textarea
                          rows={2}
                          value={feature.description || ''}
                          onChange={(e) => updateFeatureField(idx, 'description', e.target.value)}
                          placeholder="Describe capabilities..."
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3. FAQ SECTION EDITOR */}
        <TabsContent value="faqs" className="space-y-6 mt-4">
          <Card className="backdrop-blur-md bg-card/50 border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Frequently Asked Questions (FAQs)</CardTitle>
                <CardDescription>
                  Modify the questions and answers compiled specifically for this service page.
                </CardDescription>
              </div>
              {!isAddingFaq && (
                <Button onClick={() => setIsAddingFaq(true)} size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" /> Add FAQ
                </Button>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              {/* FAQ Add Form */}
              {isAddingFaq && (
                <div className="border border-primary/20 rounded-lg p-4 bg-primary/5 space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="font-semibold text-primary">New FAQ Item</h4>
                    <Button variant="ghost" size="sm" onClick={() => setIsAddingFaq(false)}>Cancel</Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-faq-question">Question</Label>
                    <Input
                      id="new-faq-question"
                      value={newFaq.question}
                      onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                      placeholder="e.g. Do you support React Native?"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-faq-answer">Answer</Label>
                    <Textarea
                      id="new-faq-answer"
                      rows={3}
                      value={newFaq.answer}
                      onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                      placeholder="Provide simple, direct answer..."
                    />
                  </div>

                  <Button onClick={saveNewFaq} size="sm">Save FAQ</Button>
                </div>
              )}

              {/* Existing FAQs List */}
              <div className="space-y-4">
                {(activeService.faqItems || []).length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
                    No FAQs configured. Click "Add FAQ" above to start.
                  </p>
                ) : (
                  (activeService.faqItems || []).map((faq: any, idx: number) => (
                    <div key={idx} className="border rounded-lg p-4 bg-muted/20 relative space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold bg-muted-foreground/15 px-2.5 py-0.5 rounded-full">
                          FAQ #{idx + 1}
                        </span>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveFaq(idx, 'up')}
                            disabled={idx === 0}
                            className="h-7 w-7"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveFaq(idx, 'down')}
                            disabled={idx === (activeService.faqItems || []).length - 1}
                            className="h-7 w-7"
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteFaq(idx)}
                            className="h-7 w-7 text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Question</Label>
                        <Input
                          value={faq.question || ''}
                          onChange={(e) => updateFaqField(idx, 'question', e.target.value)}
                          placeholder="FAQ Question"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Answer</Label>
                        <Textarea
                          rows={3}
                          value={faq.answer || ''}
                          onChange={(e) => updateFaqField(idx, 'answer', e.target.value)}
                          placeholder="FAQ Answer details"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
