'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { updateSiteSectionAction } from '../cms-actions'
import { Check, Loader2, Plus, Trash2, ArrowUp, ArrowDown, HelpCircle, Layers, FileText, CheckCircle2 } from 'lucide-react'

// Slugs and labels for all 6 industries
const INDUSTRIES = [
  { slug: 'ecommerce', name: 'E-commerce & D2C' },
  { slug: 'education-edtech', name: 'Education & EdTech' },
  { slug: 'fintech', name: 'FinTech & BFSI' },
  { slug: 'healthcare', name: 'Healthcare' },
  { slug: 'real-estate', name: 'Real Estate' },
  { slug: 'travel-hospitality', name: 'Travel & Hospitality' }
]

interface IndustriesClientProps {
  initialIndustriesData: Record<string, any>
}

export default function IndustriesClient({ initialIndustriesData }: IndustriesClientProps) {
  const [selectedSlug, setSelectedSlug] = useState('ecommerce')
  const [industriesData, setIndustriesData] = useState<Record<string, any>>(initialIndustriesData)
  const [saving, setSaving] = useState(false)
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Build Item Add State
  const [newBuildItem, setNewBuildItem] = useState({ title: '', description: '' })
  const [isAddingBuildItem, setIsAddingBuildItem] = useState(false)

  // Extra Section Add State
  const [newExtraSectionTitle, setNewExtraSectionTitle] = useState('')
  const [isAddingExtraSection, setIsAddingExtraSection] = useState(false)

  // Track Record Item Add State
  const [newProjectText, setNewProjectText] = useState('')
  const [isAddingProject, setIsAddingProject] = useState(false)

  const activeIndustry = industriesData[selectedSlug] || {
    eyebrow: '',
    h1: '',
    subHeadline: '',
    sectionTitle: '',
    buildItems: [],
    extraSections: [],
    typicalProjects: [],
    ctaHeading: '',
    ctaButtonText: ''
  }

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text })
    setTimeout(() => {
      setStatusMsg(null)
    }, 5000)
  }

  // Handle saving the currently active industry CMS config
  const handleSaveActiveIndustry = async () => {
    setSaving(true)
    const dbKey = `industry_${selectedSlug}`
    const result = await updateSiteSectionAction(dbKey, activeIndustry)
    setSaving(false)

    if (result.error) {
      showStatus('error', result.error)
    } else {
      showStatus('success', `CMS Configuration for "${INDUSTRIES.find(i => i.slug === selectedSlug)?.name}" saved successfully!`)
    }
  }

  // General Field Updates
  const updateField = (field: string, value: any) => {
    setIndustriesData({
      ...industriesData,
      [selectedSlug]: {
        ...activeIndustry,
        [field]: value
      }
    })
  }

  // "What We Build" Items Update
  const updateBuildItemField = (index: number, field: string, value: string) => {
    const updatedItems = [...(activeIndustry.buildItems || [])]
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    }
    updateField('buildItems', updatedItems)
  }

  const deleteBuildItem = (index: number) => {
    const updatedItems = (activeIndustry.buildItems || []).filter((_: any, i: number) => i !== index)
    updateField('buildItems', updatedItems)
  }

  const moveBuildItem = (index: number, direction: 'up' | 'down') => {
    const items = [...(activeIndustry.buildItems || [])]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= items.length) return

    const temp = items[index]
    items[index] = items[targetIndex]
    items[targetIndex] = temp
    updateField('buildItems', items)
  }

  const saveNewBuildItem = () => {
    if (!newBuildItem.title.trim() || !newBuildItem.description.trim()) return
    const updatedItems = [...(activeIndustry.buildItems || []), newBuildItem]
    updateField('buildItems', updatedItems)
    setIsAddingBuildItem(false)
    setNewBuildItem({ title: '', description: '' })
  }

  // Extra Sections (Integrations / Compliance) Updates
  const updateExtraSectionTitle = (sIdx: number, title: string) => {
    const updated = [...(activeIndustry.extraSections || [])]
    updated[sIdx] = {
      ...updated[sIdx],
      title
    }
    updateField('extraSections', updated)
  }

  const deleteExtraSection = (sIdx: number) => {
    const updated = (activeIndustry.extraSections || []).filter((_: any, i: number) => i !== sIdx)
    updateField('extraSections', updated)
  }

  const moveExtraSection = (sIdx: number, direction: 'up' | 'down') => {
    const updated = [...(activeIndustry.extraSections || [])]
    const targetIndex = direction === 'up' ? sIdx - 1 : sIdx + 1
    if (targetIndex < 0 || targetIndex >= updated.length) return

    const temp = updated[sIdx]
    updated[sIdx] = updated[targetIndex]
    updated[targetIndex] = temp
    updateField('extraSections', updated)
  }

  const addExtraSectionPoint = (sIdx: number, pointText: string) => {
    if (!pointText.trim()) return
    const updated = [...(activeIndustry.extraSections || [])]
    updated[sIdx] = {
      ...updated[sIdx],
      items: [...(updated[sIdx].items || []), pointText]
    }
    updateField('extraSections', updated)
  }

  const deleteExtraSectionPoint = (sIdx: number, pIdx: number) => {
    const updated = [...(activeIndustry.extraSections || [])]
    updated[sIdx] = {
      ...updated[sIdx],
      items: updated[sIdx].items.filter((_: any, i: number) => i !== pIdx)
    }
    updateField('extraSections', updated)
  }

  const updateExtraSectionPoint = (sIdx: number, pIdx: number, value: string) => {
    const updated = [...(activeIndustry.extraSections || [])]
    const newItems = [...(updated[sIdx].items || [])]
    newItems[pIdx] = value
    updated[sIdx] = {
      ...updated[sIdx],
      items: newItems
    }
    updateField('extraSections', updated)
  }

  const saveNewExtraSection = () => {
    if (!newExtraSectionTitle.trim()) return
    const updated = [...(activeIndustry.extraSections || []), { title: newExtraSectionTitle, items: [] }]
    updateField('extraSections', updated)
    setIsAddingExtraSection(false)
    setNewExtraSectionTitle('')
  }

  // Typical Projects Updates
  const updateProjectField = (index: number, value: string) => {
    const updated = [...(activeIndustry.typicalProjects || [])]
    updated[index] = value
    updateField('typicalProjects', updated)
  }

  const deleteProject = (index: number) => {
    const updated = (activeIndustry.typicalProjects || []).filter((_: any, i: number) => i !== index)
    updateField('typicalProjects', updated)
  }

  const moveProject = (index: number, direction: 'up' | 'down') => {
    const projects = [...(activeIndustry.typicalProjects || [])]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= projects.length) return

    const temp = projects[index]
    projects[index] = projects[targetIndex]
    projects[targetIndex] = temp
    updateField('typicalProjects', projects)
  }

  const saveNewProject = () => {
    if (!newProjectText.trim()) return
    const updated = [...(activeIndustry.typicalProjects || []), newProjectText]
    updateField('typicalProjects', updated)
    setIsAddingProject(false)
    setNewProjectText('')
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

      {/* Industries Selector & Save Card */}
      <Card className="backdrop-blur-md bg-card/80 border">
        <CardContent className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 flex-1">
            <Label htmlFor="industry-selector" className="text-sm font-semibold text-foreground">Select Industry Page to Edit</Label>
            <div className="relative mt-1">
              <select
                id="industry-selector"
                value={selectedSlug}
                onChange={(e) => {
                  setSelectedSlug(e.target.value)
                  setIsAddingBuildItem(false)
                  setIsAddingExtraSection(false)
                  setIsAddingProject(false)
                }}
                className="w-full md:w-80 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {INDUSTRIES.map((i) => (
                  <option key={i.slug} value={i.slug}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button
            size="lg"
            onClick={handleSaveActiveIndustry}
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
                Save Selected Industry
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Main CMS Editor Tabs */}
      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid grid-cols-5 max-w-2xl bg-muted/50 p-1 rounded-lg border">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="build">What We Build</TabsTrigger>
          <TabsTrigger value="extra">Extra Sections</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="cta">CTA Block</TabsTrigger>
        </TabsList>

        {/* 1. HERO TAB */}
        <TabsContent value="hero" className="space-y-6 mt-4">
          <Card className="backdrop-blur-md bg-card/50 border">
            <CardHeader>
              <CardTitle>Hero Section Content</CardTitle>
              <CardDescription>
                Modify Eyebrow Badge, main Title header, and Sub-Headline description text.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-eyebrow">Eyebrow Badge</Label>
                <Input
                  id="hero-eyebrow"
                  value={activeIndustry.eyebrow || ''}
                  onChange={(e) => updateField('eyebrow', e.target.value)}
                  placeholder="e.g. E-COMMERCE & D2C"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hero-h1">Hero Heading (H1)</Label>
                <Textarea
                  id="hero-h1"
                  rows={2}
                  value={activeIndustry.h1 || ''}
                  onChange={(e) => updateField('h1', e.target.value)}
                  placeholder="Enter a compelling H1 title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hero-subHeadline">Hero Description / Sub-Headline</Label>
                <Textarea
                  id="hero-subHeadline"
                  rows={4}
                  value={activeIndustry.subHeadline || ''}
                  onChange={(e) => updateField('subHeadline', e.target.value)}
                  placeholder="Provide supporting body text describing Apargo's expertise"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2. WHAT WE BUILD TAB */}
        <TabsContent value="build" className="space-y-6 mt-4">
          <Card className="backdrop-blur-md bg-card/50 border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>What We Build</CardTitle>
                <CardDescription>
                  Update the grid of custom applications or workflows designed for this industry.
                </CardDescription>
              </div>
              {!isAddingBuildItem && (
                <Button onClick={() => setIsAddingBuildItem(true)} size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" /> Add Item
                </Button>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Build Item Add Form */}
              {isAddingBuildItem && (
                <div className="border border-primary/20 rounded-lg p-4 bg-primary/5 space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="font-semibold text-primary">New Capability Card</h4>
                    <Button variant="ghost" size="sm" onClick={() => setIsAddingBuildItem(false)}>Cancel</Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-build-title">Title</Label>
                    <Input
                      id="new-build-title"
                      value={newBuildItem.title}
                      onChange={(e) => setNewBuildItem({ ...newBuildItem, title: e.target.value })}
                      placeholder="e.g. Headless storefronts"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-build-desc">Description</Label>
                    <Textarea
                      id="new-build-desc"
                      rows={2}
                      value={newBuildItem.description}
                      onChange={(e) => setNewBuildItem({ ...newBuildItem, description: e.target.value })}
                      placeholder="Explain what this entails..."
                    />
                  </div>

                  <Button onClick={saveNewBuildItem} size="sm">Save Item</Button>
                </div>
              )}

              {/* Section Header Title */}
              <div className="space-y-2 pb-4 border-b">
                <Label htmlFor="section-title">Section Heading</Label>
                <Input
                  id="section-title"
                  value={activeIndustry.sectionTitle || ''}
                  onChange={(e) => updateField('sectionTitle', e.target.value)}
                  placeholder="e.g. What we build for D2C teams"
                />
              </div>

              {/* Items list */}
              <div className="space-y-4">
                {(activeIndustry.buildItems || []).length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
                    No capabilities listed. Click "Add Item" above to get started.
                  </p>
                ) : (
                  (activeIndustry.buildItems || []).map((item: any, idx: number) => (
                    <div key={idx} className="border rounded-lg p-4 bg-muted/20 space-y-3 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold bg-muted-foreground/15 px-2.5 py-0.5 rounded-full">
                          Card #{idx + 1}
                        </span>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveBuildItem(idx, 'up')}
                            disabled={idx === 0}
                            className="h-7 w-7"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveBuildItem(idx, 'down')}
                            disabled={idx === (activeIndustry.buildItems || []).length - 1}
                            className="h-7 w-7"
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteBuildItem(idx)}
                            className="h-7 w-7 text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={item.title || ''}
                          onChange={(e) => updateBuildItemField(idx, 'title', e.target.value)}
                          placeholder="Card Title"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          rows={2}
                          value={item.description || ''}
                          onChange={(e) => updateBuildItemField(idx, 'description', e.target.value)}
                          placeholder="Card Description"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3. EXTRA SECTIONS TAB (INTEGRATIONS / COMPLIANCE) */}
        <TabsContent value="extra" className="space-y-6 mt-4">
          <Card className="backdrop-blur-md bg-card/50 border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Extra Sections</CardTitle>
                <CardDescription>
                  Manage integrations list, compliance tables, or AI specific bullets.
                </CardDescription>
              </div>
              {!isAddingExtraSection && (
                <Button onClick={() => setIsAddingExtraSection(true)} size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" /> Add Section
                </Button>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Extra Section Add Form */}
              {isAddingExtraSection && (
                <div className="border border-primary/20 rounded-lg p-4 bg-primary/5 space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="font-semibold text-primary">New Custom Section</h4>
                    <Button variant="ghost" size="sm" onClick={() => setIsAddingExtraSection(false)}>Cancel</Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-extra-title">Section Title</Label>
                    <Input
                      id="new-extra-title"
                      value={newExtraSectionTitle}
                      onChange={(e) => setNewExtraSectionTitle(e.target.value)}
                      placeholder="e.g. Compliance & Privacy"
                    />
                  </div>

                  <Button onClick={saveNewExtraSection} size="sm">Save Section</Button>
                </div>
              )}

              {/* Extra Sections List */}
              <div className="space-y-6">
                {(activeIndustry.extraSections || []).length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
                    No extra sections configured. Click "Add Section" above if this page requires one.
                  </p>
                ) : (
                  (activeIndustry.extraSections || []).map((sec: any, sIdx: number) => (
                    <div key={sIdx} className="border border-border/80 rounded-lg p-4 space-y-4 bg-muted/10">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span className="text-sm font-bold flex items-center gap-2">
                          <Layers className="h-4 w-4 text-primary" />
                          Section #{sIdx + 1}
                        </span>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveExtraSection(sIdx, 'up')}
                            disabled={sIdx === 0}
                            className="h-7 w-7"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveExtraSection(sIdx, 'down')}
                            disabled={sIdx === (activeIndustry.extraSections || []).length - 1}
                            className="h-7 w-7"
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteExtraSection(sIdx)}
                            className="h-7 w-7 text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Section Title</Label>
                        <Input
                          value={sec.title || ''}
                          onChange={(e) => updateExtraSectionTitle(sIdx, e.target.value)}
                          placeholder="Section Title"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-xs font-semibold uppercase text-muted-foreground">List of Points</Label>
                        
                        {/* Points List */}
                        <div className="space-y-2">
                          {(sec.items || []).map((point: string, pIdx: number) => (
                            <div key={pIdx} className="flex gap-2 items-center">
                              <div className="size-6 shrink-0 flex items-center justify-center bg-primary/10 rounded-full text-[10px] font-bold text-primary">
                                {pIdx + 1}
                              </div>
                              <Input
                                value={point}
                                onChange={(e) => updateExtraSectionPoint(sIdx, pIdx, e.target.value)}
                                className="flex-1"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteExtraSectionPoint(sIdx, pIdx)}
                                className="h-8 w-8 text-red-400 hover:text-red-500 shrink-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>

                        {/* Add Point Form */}
                        <div className="flex gap-2 pt-2 border-t border-dashed">
                          <Input
                            id={`add-point-input-${sIdx}`}
                            placeholder="Add new detail point..."
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                const val = (e.target as HTMLInputElement).value
                                addExtraSectionPoint(sIdx, val)
                                ;(e.target as HTMLInputElement).value = ''
                              }
                            }}
                          />
                          <Button
                            size="sm"
                            onClick={() => {
                              const el = document.getElementById(`add-point-input-${sIdx}`) as HTMLInputElement
                              if (el) {
                                addExtraSectionPoint(sIdx, el.value)
                                el.value = ''
                              }
                            }}
                            className="shrink-0 flex items-center gap-1"
                          >
                            <Plus className="h-3.5 w-3.5" /> Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 4. TYPICAL PROJECTS TAB */}
        <TabsContent value="projects" className="space-y-6 mt-4">
          <Card className="backdrop-blur-md bg-card/50 border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Typical Projects</CardTitle>
                <CardDescription>
                  Manage the checklist track record of specific types of projects built inside this segment.
                </CardDescription>
              </div>
              {!isAddingProject && (
                <Button onClick={() => setIsAddingProject(true)} size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" /> Add Project
                </Button>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Project Add Form */}
              {isAddingProject && (
                <div className="border border-primary/20 rounded-lg p-4 bg-primary/5 space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="font-semibold text-primary">New Track Record Item</h4>
                    <Button variant="ghost" size="sm" onClick={() => setIsAddingProject(false)}>Cancel</Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-project-desc">Project Description</Label>
                    <Input
                      id="new-project-desc"
                      value={newProjectText}
                      onChange={(e) => setNewProjectText(e.target.value)}
                      placeholder="e.g. Headless Next.js storefront migrations"
                    />
                  </div>

                  <Button onClick={saveNewProject} size="sm">Save Project</Button>
                </div>
              )}

              {/* Projects List */}
              <div className="space-y-3">
                {(activeIndustry.typicalProjects || []).length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
                    No typical projects configured. Click "Add Project" above to start.
                  </p>
                ) : (
                  (activeIndustry.typicalProjects || []).map((proj: string, idx: number) => (
                    <div key={idx} className="flex gap-2 items-center bg-muted/10 p-3 rounded-lg border">
                      <div className="flex-1 space-y-1">
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground">Project #{idx + 1}</Label>
                        <Input
                          value={proj}
                          onChange={(e) => updateProjectField(idx, e.target.value)}
                          placeholder="Project summary..."
                        />
                      </div>
                      
                      <div className="flex flex-col gap-1 pt-4">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveProject(idx, 'up')}
                            disabled={idx === 0}
                            className="h-7 w-7"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveProject(idx, 'down')}
                            disabled={idx === (activeIndustry.typicalProjects || []).length - 1}
                            className="h-7 w-7"
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteProject(idx)}
                            className="h-7 w-7 text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 5. CTA BLOCK TAB */}
        <TabsContent value="cta" className="space-y-6 mt-4">
          <Card className="backdrop-blur-md bg-card/50 border">
            <CardHeader>
              <CardTitle>Call To Action (CTA) Block</CardTitle>
              <CardDescription>
                Customize heading and button text for the CTA block positioned at the bottom of the page.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cta-heading">CTA Card Heading</Label>
                <Input
                  id="cta-heading"
                  value={activeIndustry.ctaHeading || ''}
                  onChange={(e) => updateField('ctaHeading', e.target.value)}
                  placeholder="e.g. Outgrew your e-commerce platform?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cta-button-text">CTA Button Label</Label>
                <Input
                  id="cta-button-text"
                  value={activeIndustry.ctaButtonText || ''}
                  onChange={(e) => updateField('ctaButtonText', e.target.value)}
                  placeholder="e.g. Book an E-com Strategy Call"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
