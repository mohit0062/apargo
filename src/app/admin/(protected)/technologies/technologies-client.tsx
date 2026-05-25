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
  Cpu, Award, Search, Sparkles, Sliders, Globe
} from 'lucide-react'

interface TechItem {
  name: string
  iconName: string
}

interface StackGroup {
  title: string
  iconName: string
  color: string
  bgColor: string
  borderColor: string
  items: TechItem[]
}

interface PrincipleItem {
  iconName: string
  title: string
  description: string
  color: string
  bgColor: string
}

interface TechnologiesData {
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
  stackGroups: StackGroup[]
  principles: PrincipleItem[]
}

interface TechnologiesCMSClientProps {
  initialData: TechnologiesData
}

export default function TechnologiesCMSClient({ initialData }: TechnologiesCMSClientProps) {
  const [activeTab, setActiveTab] = useState<'hero' | 'stacks' | 'principles' | 'seo'>('hero')
  const [data, setData] = useState<TechnologiesData>(initialData)
  const [saving, setSaving] = useState(false)
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Sub-states for group edits
  const [activeGroupIdx, setActiveGroupIdx] = useState<number>(0)
  const [newTechName, setNewTechName] = useState('')
  const [newTechIcon, setNewTechIcon] = useState('AtomIcon')

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text })
    setTimeout(() => {
      setStatusMsg(null)
    }, 5000)
  }

  const handleSaveAll = async () => {
    setSaving(true)
    const result = await updateSiteSectionAction('page_technologies', data)
    setSaving(false)
    if (result.error) {
      showStatus('error', result.error)
    } else {
      showStatus('success', 'Technologies Page CMS updated successfully!')
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

  // Stack Group Operations
  const addStackGroup = () => {
    const newGroup: StackGroup = {
      title: 'New Stack Category',
      iconName: 'ServerIcon',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-600/10 dark:bg-blue-400/10',
      borderColor: 'border-blue-600/25 dark:border-blue-400/25',
      items: []
    }
    setData(prev => ({
      ...prev,
      stackGroups: [...prev.stackGroups, newGroup]
    }))
    setActiveGroupIdx(data.stackGroups.length)
  }

  const deleteStackGroup = (index: number) => {
    if (data.stackGroups.length <= 1) {
      showStatus('error', 'Must have at least one Stack Category.')
      return
    }
    setData(prev => ({
      ...prev,
      stackGroups: prev.stackGroups.filter((_, i) => i !== index)
    }))
    setActiveGroupIdx(0)
  }

  const updateGroupField = (index: number, field: keyof StackGroup, value: string) => {
    setData(prev => {
      const groups = [...prev.stackGroups]
      groups[index] = {
        ...groups[index],
        [field]: value
      }
      return { ...prev, stackGroups: groups }
    })
  }

  // Tech Item Operations inside a Group
  const addTechItemToGroup = (groupIdx: number) => {
    if (!newTechName.trim()) {
      showStatus('error', 'Tech item name is required.')
      return
    }
    setData(prev => {
      const groups = [...prev.stackGroups]
      const items = [...groups[groupIdx].items, { name: newTechName, iconName: newTechIcon }]
      groups[groupIdx] = { ...groups[groupIdx], items }
      return { ...prev, stackGroups: groups }
    })
    setNewTechName('')
    setNewTechIcon('AtomIcon')
  }

  const deleteTechItemFromGroup = (groupIdx: number, itemIdx: number) => {
    setData(prev => {
      const groups = [...prev.stackGroups]
      const items = groups[groupIdx].items.filter((_, i) => i !== itemIdx)
      groups[groupIdx] = { ...groups[groupIdx], items }
      return { ...prev, stackGroups: groups }
    })
  }

  // Principle Operations
  const updatePrincipleField = (index: number, field: keyof PrincipleItem, value: string) => {
    setData(prev => {
      const principles = [...prev.principles]
      principles[index] = {
        ...principles[index],
        [field]: value
      }
      return { ...prev, principles }
    })
  }

  const addPrinciple = () => {
    const newPrinciple: PrincipleItem = {
      title: 'New Principle',
      description: 'Write description here...',
      iconName: 'ShieldCheckIcon',
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-600/10 dark:bg-emerald-400/10'
    }
    setData(prev => ({
      ...prev,
      principles: [...prev.principles, newPrinciple]
    }))
  }

  const deletePrinciple = (index: number) => {
    setData(prev => ({
      ...prev,
      principles: prev.principles.filter((_, i) => i !== index)
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
            Technologies Editor
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Modify any section below, then save all changes to update the live Technologies page.
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
          <Cpu className="h-3.5 w-3.5" />
          Hero
        </button>
        <button
          onClick={() => setActiveTab('stacks')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'stacks' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Sliders className="h-3.5 w-3.5" />
          Stack Groups
        </button>
        <button
          onClick={() => setActiveTab('principles')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'principles' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Award className="h-3.5 w-3.5" />
          Principles
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

      {activeTab === 'stacks' && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left panel: Categories List */}
          <Card className="lg:col-span-1 rounded-2xl border-border/60 shadow-sm h-fit">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-sm font-bold">Categories</CardTitle>
                <CardDescription className="text-[10px]">Configure stack groups</CardDescription>
              </div>
              <Button onClick={addStackGroup} variant="outline" size="sm" className="h-7 text-xs gap-1 rounded-md">
                <Plus className="h-3 w-3" /> Add
              </Button>
            </CardHeader>
            <CardContent className="p-2 space-y-1">
              {data.stackGroups.map((group, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveGroupIdx(idx)}
                  className={`flex items-center justify-between p-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    activeGroupIdx === idx ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <span className="truncate">{group.title}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                      {group.items.length} items
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteStackGroup(idx)
                      }}
                      className="text-muted-foreground hover:text-red-500 transition-colors"
                      title="Delete category"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Right panel: Active Group Editor */}
          {data.stackGroups[activeGroupIdx] && (
            <Card className="lg:col-span-2 rounded-2xl border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  Edit Category: {data.stackGroups[activeGroupIdx].title}
                </CardTitle>
                <CardDescription className="text-xs">Customize styling labels and list of items.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Meta details */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Category Title</Label>
                    <Input
                      value={data.stackGroups[activeGroupIdx].title}
                      onChange={(e) => updateGroupField(activeGroupIdx, 'title', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Lucide Icon (e.g. AtomIcon)</Label>
                    <Input
                      value={data.stackGroups[activeGroupIdx].iconName}
                      onChange={(e) => updateGroupField(activeGroupIdx, 'iconName', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3 border-t pt-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Text Color Classes</Label>
                    <Input
                      value={data.stackGroups[activeGroupIdx].color}
                      onChange={(e) => updateGroupField(activeGroupIdx, 'color', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Bg Color Classes</Label>
                    <Input
                      value={data.stackGroups[activeGroupIdx].bgColor}
                      onChange={(e) => updateGroupField(activeGroupIdx, 'bgColor', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Border Color Classes</Label>
                    <Input
                      value={data.stackGroups[activeGroupIdx].borderColor}
                      onChange={(e) => updateGroupField(activeGroupIdx, 'borderColor', e.target.value)}
                    />
                  </div>
                </div>

                {/* Sub-items configuration */}
                <div className="border-t pt-4 space-y-3">
                  <Label className="text-xs font-semibold block">Technology Items</Label>

                  {/* Add tech item inline form */}
                  <div className="flex gap-2 items-end bg-muted/30 p-3 rounded-lg border border-dashed">
                    <div className="space-y-1 flex-1">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Tech Name</Label>
                      <Input
                        value={newTechName}
                        placeholder="React, AWS, Node, etc."
                        onChange={(e) => setNewTechName(e.target.value)}
                        className="bg-background h-8 text-xs"
                      />
                    </div>
                    <div className="space-y-1 w-40">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Lucide Icon</Label>
                      <Input
                        value={newTechIcon}
                        placeholder="AtomIcon"
                        onChange={(e) => setNewTechIcon(e.target.value)}
                        className="bg-background h-8 text-xs"
                      />
                    </div>
                    <Button
                      onClick={() => addTechItemToGroup(activeGroupIdx)}
                      size="sm"
                      className="h-8 text-xs font-semibold rounded-md shadow-sm"
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add Item
                    </Button>
                  </div>

                  {/* Grid layout of active tech items */}
                  <div className="grid gap-2 sm:grid-cols-2 max-h-[300px] overflow-y-auto pr-1">
                    {data.stackGroups[activeGroupIdx].items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-center justify-between p-2 rounded-lg border bg-background text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <span className="font-semibold">{item.name}</span>
                          <span className="text-[10px] text-muted-foreground font-mono">({item.iconName})</span>
                        </div>
                        <button
                          onClick={() => deleteTechItemFromGroup(activeGroupIdx, itemIdx)}
                          className="text-muted-foreground hover:text-red-500 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                    {data.stackGroups[activeGroupIdx].items.length === 0 && (
                      <p className="text-[11px] text-muted-foreground italic p-2 col-span-2 text-center border border-dashed rounded-lg bg-muted/10">
                        No tech items added in this category. Use the form above to add some.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === 'principles' && (
        <Card className="rounded-2xl border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold">Philosophy / Principles List</CardTitle>
              <CardDescription className="text-xs">Configure the values/principles grid at the bottom of the page.</CardDescription>
            </div>
            <Button onClick={addPrinciple} size="sm" variant="outline" className="gap-1 rounded-lg">
              <Plus className="h-3.5 w-3.5" /> Add Principle
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.principles.map((p, idx) => (
              <div key={idx} className="p-4 rounded-xl border bg-muted/5 space-y-4 relative">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-xs font-bold text-primary">Principle Item #{idx + 1}</span>
                  <button
                    onClick={() => deletePrinciple(idx)}
                    className="text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1 text-[11px]"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1.5 col-span-1">
                    <Label className="text-xs font-semibold">Title</Label>
                    <Input
                      value={p.title}
                      onChange={(e) => updatePrincipleField(idx, 'title', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5 col-span-1">
                    <Label className="text-xs font-semibold">Lucide Icon</Label>
                    <Input
                      value={p.iconName}
                      onChange={(e) => updatePrincipleField(idx, 'iconName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5 col-span-1">
                    <Label className="text-xs font-semibold">Text Color Class</Label>
                    <Input
                      value={p.color}
                      onChange={(e) => updatePrincipleField(idx, 'color', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Bg Color Class</Label>
                    <Input
                      value={p.bgColor}
                      onChange={(e) => updatePrincipleField(idx, 'bgColor', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Description</Label>
                    <Textarea
                      rows={2}
                      value={p.description}
                      onChange={(e) => updatePrincipleField(idx, 'description', e.target.value)}
                    />
                  </div>
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
