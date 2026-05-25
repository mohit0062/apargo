'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { updateSiteSectionAction } from '../cms-actions'
import { Check, Loader2, Plus, Trash2, ArrowUp, ArrowDown, X, Edit2 } from 'lucide-react'

interface HomepageClientProps {
  initialHero: any
  initialFeatures: any
  initialIndustries: any
}

export default function HomepageClient({
  initialHero,
  initialFeatures,
  initialIndustries,
}: HomepageClientProps) {
  // States
  const [hero, setHero] = useState(initialHero)
  const [savingHero, setSavingHero] = useState(false)

  const [featuresData, setFeaturesData] = useState(initialFeatures)
  const [savingFeatures, setSavingFeatures] = useState(false)
  const [editingFeatureIndex, setEditingFeatureIndex] = useState<number | null>(null)
  
  // States for adding a new feature
  const [newFeature, setNewFeature] = useState({ title: '', description: '' })
  const [isAddingFeature, setIsAddingFeature] = useState(false)

  const [industries, setIndustries] = useState(initialIndustries)
  const [savingIndustries, setSavingIndustries] = useState(false)

  // Status notification banner
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text })
    setTimeout(() => {
      setStatusMsg(null)
    }, 5000)
  }

  // Action handlers
  const handleSaveHero = async () => {
    setSavingHero(true)
    const result = await updateSiteSectionAction('homepage_hero', hero)
    setSavingHero(false)
    if (result.error) {
      showStatus('error', result.error)
    } else {
      showStatus('success', 'Hero section configuration updated!')
    }
  }

  const handleSaveFeatures = async () => {
    setSavingFeatures(true)
    const result = await updateSiteSectionAction('homepage_core_features', featuresData)
    setSavingFeatures(false)
    if (result.error) {
      showStatus('error', result.error)
    } else {
      showStatus('success', 'Core features configuration updated!')
    }
  }

  const handleSaveIndustries = async () => {
    setSavingIndustries(true)
    const result = await updateSiteSectionAction('homepage_industries', industries)
    setSavingIndustries(false)
    if (result.error) {
      showStatus('error', result.error)
    } else {
      showStatus('success', 'Industries Served configuration updated!')
    }
  }

  // Feature actions
  const moveFeature = (index: number, direction: 'up' | 'down') => {
    const features = [...(featuresData.features || [])]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= features.length) return
    
    // Swap
    const temp = features[index]
    features[index] = features[targetIndex]
    features[targetIndex] = temp

    setFeaturesData({
      ...featuresData,
      features,
    })
  }

  const deleteFeature = (index: number) => {
    const features = (featuresData.features || []).filter((_: any, i: number) => i !== index)
    setFeaturesData({
      ...featuresData,
      features,
    })
    if (editingFeatureIndex === index) {
      setEditingFeatureIndex(null)
    } else if (editingFeatureIndex !== null && editingFeatureIndex > index) {
      setEditingFeatureIndex(editingFeatureIndex - 1)
    }
  }

  const startAddFeature = () => {
    setIsAddingFeature(true)
    setNewFeature({ title: '', description: '' })
  }

  const saveNewFeature = () => {
    if (!newFeature.title.trim() || !newFeature.description.trim()) return
    const features = [...(featuresData.features || []), newFeature]
    setFeaturesData({
      ...featuresData,
      features,
    })
    setIsAddingFeature(false)
    setNewFeature({ title: '', description: '' })
  }

  const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
    const features = [...(featuresData.features || [])]
    features[index] = {
      ...features[index],
      [field]: value
    }
    setFeaturesData({
      ...featuresData,
      features
    })
  }

  return (
    <div className="space-y-6">
      {/* Dynamic Notification Banner */}
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

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md bg-muted/60 p-1 rounded-xl">
          <TabsTrigger value="hero" className="rounded-lg py-2">Hero Block</TabsTrigger>
          <TabsTrigger value="features" className="rounded-lg py-2">Core Features</TabsTrigger>
          <TabsTrigger value="industries" className="rounded-lg py-2">Industries Served</TabsTrigger>
        </TabsList>

        {/* HERO TAB */}
        <TabsContent value="hero" className="mt-6">
          <Card className="border border-border/50 bg-background/50 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
              <CardTitle className="text-xl font-semibold">Hero Section</CardTitle>
              <CardDescription>
                Edit the main text block, subtext descriptions, and primary CTA on your website's landing hero section.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="heroEyebrow">Eyebrow Text</Label>
                  <Input
                    id="heroEyebrow"
                    value={hero.eyebrowText || ''}
                    onChange={(e) => setHero({ ...hero, eyebrowText: e.target.value })}
                    placeholder="Apargo"
                    className="bg-muted/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroEyebrowTag">Eyebrow Tag / Subheading</Label>
                  <Input
                    id="heroEyebrowTag"
                    value={hero.eyebrowTag || ''}
                    onChange={(e) => setHero({ ...hero, eyebrowTag: e.target.value })}
                    placeholder="Product Engineering & AI Services"
                    className="bg-muted/30 font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="heroHeading">Main Headline Text</Label>
                <Input
                  id="heroHeading"
                  value={hero.heading || ''}
                  onChange={(e) => setHero({ ...hero, heading: e.target.value })}
                  placeholder="We Build Software That Growing Businesses Actually Use."
                  className="bg-muted/30 font-bold"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="heroDescription">Main Description Subtext</Label>
                <Textarea
                  id="heroDescription"
                  value={hero.description || ''}
                  onChange={(e) => setHero({ ...hero, description: e.target.value })}
                  placeholder="Engineering partner founders call when they want to ship fast..."
                  className="bg-muted/30 min-h-[100px] leading-relaxed"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2 border-t border-border/30 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="heroBtnText">Primary Button Label</Label>
                  <Input
                    id="heroBtnText"
                    value={hero.primaryBtnText || ''}
                    onChange={(e) => setHero({ ...hero, primaryBtnText: e.target.value })}
                    placeholder="Book a Free Consultation"
                    className="bg-muted/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroEmailPlaceholder">Email Input Placeholder</Label>
                  <Input
                    id="heroEmailPlaceholder"
                    value={hero.emailPlaceholder || ''}
                    onChange={(e) => setHero({ ...hero, emailPlaceholder: e.target.value })}
                    placeholder="hello@apargo.com"
                    className="bg-muted/30"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/50 bg-muted/20 px-6 py-4 flex justify-end">
              <Button onClick={handleSaveHero} disabled={savingHero} className="gap-2 px-6 rounded-lg">
                {savingHero && <Loader2 className="h-4 w-4 animate-spin" />}
                Save Hero Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* CORE FEATURES TAB */}
        <TabsContent value="features" className="mt-6">
          <Card className="border border-border/50 bg-background/50 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
              <CardTitle className="text-xl font-semibold">Core Features List</CardTitle>
              <CardDescription>
                Customize headings and list parameters detailing why customers choose Apargo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="featTitle">Section Header Title</Label>
                <Input
                  id="featTitle"
                  value={featuresData.title || ''}
                  onChange={(e) => setFeaturesData({ ...featuresData, title: e.target.value })}
                  placeholder="We use what we build"
                  className="bg-muted/30 font-semibold"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="featDesc">Section Header Description</Label>
                <Textarea
                  id="featDesc"
                  value={featuresData.description || ''}
                  onChange={(e) => setFeaturesData({ ...featuresData, description: e.target.value })}
                  placeholder="AI Greentick runs on the same stack..."
                  className="bg-muted/30 min-h-[80px]"
                />
              </div>

              {/* FEATURES INTERACTIVE LIST */}
              <div className="border-t border-border/30 pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-foreground">Specific Feature Cards</h4>
                  {!isAddingFeature && (
                    <Button onClick={startAddFeature} size="sm" variant="secondary" className="gap-1.5 rounded-lg text-xs">
                      <Plus className="h-3.5 w-3.5" /> Add New Card
                    </Button>
                  )}
                </div>

                {/* ADD NEW FEATURE BLOCK */}
                {isAddingFeature && (
                  <Card className="border border-primary/20 bg-primary/5 rounded-xl p-4 space-y-4">
                    <h5 className="text-xs font-bold text-primary uppercase tracking-wider">New Feature Details</h5>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="newFeatTitle">Title</Label>
                        <Input
                          id="newFeatTitle"
                          value={newFeature.title}
                          onChange={(e) => setNewFeature({ ...newFeature, title: e.target.value })}
                          placeholder="Feature Title"
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newFeatDesc">Description</Label>
                        <Input
                          id="newFeatDesc"
                          value={newFeature.description}
                          onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                          placeholder="Feature details and core summary..."
                          className="bg-background"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <Button onClick={() => setIsAddingFeature(false)} size="sm" variant="outline" className="rounded-lg">
                        Cancel
                      </Button>
                      <Button onClick={saveNewFeature} size="sm" className="rounded-lg">
                        Confirm Add
                      </Button>
                    </div>
                  </Card>
                )}

                {/* FEATURE ITEMS LIST */}
                <div className="space-y-3">
                  {(featuresData.features || []).map((feature: any, index: number) => {
                    const isEditing = editingFeatureIndex === index
                    return (
                      <div
                        key={index}
                        className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-muted/20 border border-border/50 rounded-xl transition-all hover:bg-muted/30"
                      >
                        {isEditing ? (
                          <div className="flex-1 space-y-3">
                            <div className="space-y-1">
                              <Label className="text-xs font-semibold text-muted-foreground">Title</Label>
                              <Input
                                value={feature.title}
                                onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                                className="bg-background"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs font-semibold text-muted-foreground">Description</Label>
                              <Textarea
                                value={feature.description}
                                onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                                className="bg-background min-h-[60px]"
                              />
                            </div>
                            <div className="flex justify-end pt-1">
                              <Button onClick={() => setEditingFeatureIndex(null)} size="sm" className="gap-1 rounded-lg">
                                <Check className="h-3.5 w-3.5" /> Done Editing
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex-1 space-y-1">
                            <h5 className="font-semibold text-foreground text-sm flex items-center gap-2">
                              <span className="text-xs bg-muted border border-border/50 text-muted-foreground rounded px-1.5 py-0.5">#{index + 1}</span>
                              {feature.title || 'Untitled Feature'}
                            </h5>
                            <p className="text-muted-foreground text-xs leading-relaxed max-w-2xl">
                              {feature.description || 'No description provided.'}
                            </p>
                          </div>
                        )}

                        {!isEditing && (
                          <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
                            <Button
                              onClick={() => setEditingFeatureIndex(index)}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-muted text-muted-foreground hover:text-foreground"
                              title="Edit feature"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              onClick={() => moveFeature(index, 'up')}
                              disabled={index === 0}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-muted text-muted-foreground disabled:opacity-40"
                              title="Move up"
                            >
                              <ArrowUp className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              onClick={() => moveFeature(index, 'down')}
                              disabled={index === (featuresData.features || []).length - 1}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-muted text-muted-foreground disabled:opacity-40"
                              title="Move down"
                            >
                              <ArrowDown className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              onClick={() => deleteFeature(index)}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-red-500/10 text-muted-foreground hover:text-red-500"
                              title="Delete feature"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                  {(featuresData.features || []).length === 0 && (
                    <p className="text-center text-xs text-muted-foreground py-6 italic border border-dashed rounded-xl">
                      No feature cards configured. Add one above.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/50 bg-muted/20 px-6 py-4 flex justify-end">
              <Button onClick={handleSaveFeatures} disabled={savingFeatures} className="gap-2 px-6 rounded-lg">
                {savingFeatures && <Loader2 className="h-4 w-4 animate-spin" />}
                Save Features Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* INDUSTRIES TAB */}
        <TabsContent value="industries" className="mt-6">
          <Card className="border border-border/50 bg-background/50 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
              <CardTitle className="text-xl font-semibold">Industries Served Block</CardTitle>
              <CardDescription>
                Customize headings and text descriptions that summarize industries you serve.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="indEyebrow">Eyebrow Caption</Label>
                  <Input
                    id="indEyebrow"
                    value={industries.eyebrow || ''}
                    onChange={(e) => setIndustries({ ...industries, eyebrow: e.target.value })}
                    placeholder="Industries we serve"
                    className="bg-muted/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="indTitle">Section Heading</Label>
                  <Input
                    id="indTitle"
                    value={industries.title || ''}
                    onChange={(e) => setIndustries({ ...industries, title: e.target.value })}
                    placeholder="Built For The Industries That Move Fast"
                    className="bg-muted/30 font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="indDesc">Section Subtitle Description</Label>
                <Textarea
                  id="indDesc"
                  value={industries.description || ''}
                  onChange={(e) => setIndustries({ ...industries, description: e.target.value })}
                  placeholder="E-commerce, healthcare, education, real estate..."
                  className="bg-muted/30 min-h-[100px] leading-relaxed"
                />
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/50 bg-muted/20 px-6 py-4 flex justify-end">
              <Button onClick={handleSaveIndustries} disabled={savingIndustries} className="gap-2 px-6 rounded-lg">
                {savingIndustries && <Loader2 className="h-4 w-4 animate-spin" />}
                Save Industries Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
