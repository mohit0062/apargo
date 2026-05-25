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
  Edit2, Info, Users, Award, BookOpen, ExternalLink, Image as ImageIcon, Sparkles
} from 'lucide-react'

interface StatItem {
  value: number
  description: string
}

interface TeamMember {
  image: string
  name: string
  title: string
  description: string
  type: string
  facebookLink: string
  twitterLink: string
  githubLink: string
  instagramLink: string
}

interface AboutData {
  hero: {
    badgeText: string
    heading: string
    description: string
    stats: StatItem[]
  }
  story: {
    badgeText: string
    heading: string
    description: string
    imageUrl: string
    contentHeading: string
    paragraphs: string[]
  }
  team: {
    heading: string
    description: string
    members: TeamMember[]
  }
}

interface AboutCMSClientProps {
  initialData: AboutData
}

export default function AboutCMSClient({ initialData }: AboutCMSClientProps) {
  const [activeTab, setActiveTab] = useState<'hero' | 'story' | 'team'>('hero')
  const [data, setData] = useState<AboutData>(initialData)
  const [saving, setSaving] = useState(false)
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  // States for new team member form
  const [isAddingMember, setIsAddingMember] = useState(false)
  const [newMember, setNewMember] = useState<TeamMember>({
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/image-57.png',
    name: '',
    title: '',
    description: '',
    type: 'Development team',
    facebookLink: '#',
    twitterLink: '#',
    githubLink: '#',
    instagramLink: '#'
  })

  // Filter department for team list preview
  const [teamFilter, setTeamFilter] = useState<string>('all')

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text })
    setTimeout(() => {
      setStatusMsg(null)
    }, 5000)
  }

  // Handle nested object changes
  const updateHeroField = (field: string, value: any) => {
    setData(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value
      }
    }))
  }

  const updateHeroStat = (index: number, field: keyof StatItem, value: any) => {
    const updatedStats = [...data.hero.stats]
    updatedStats[index] = {
      ...updatedStats[index],
      [field]: field === 'value' ? Number(value) : value
    }
    setData(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        stats: updatedStats
      }
    }))
  }

  const updateStoryField = (field: string, value: any) => {
    setData(prev => ({
      ...prev,
      story: {
        ...prev.story,
        [field]: value
      }
    }))
  }

  const updateStoryParagraph = (index: number, value: string) => {
    const updatedParagraphs = [...data.story.paragraphs]
    updatedParagraphs[index] = value
    setData(prev => ({
      ...prev,
      story: {
        ...prev.story,
        paragraphs: updatedParagraphs
      }
    }))
  }

  const addStoryParagraph = () => {
    setData(prev => ({
      ...prev,
      story: {
        ...prev.story,
        paragraphs: [...prev.story.paragraphs, '']
      }
    }))
  }

  const deleteStoryParagraph = (index: number) => {
    setData(prev => ({
      ...prev,
      story: {
        ...prev.story,
        paragraphs: prev.story.paragraphs.filter((_, i) => i !== index)
      }
    }))
  }

  const moveStoryParagraph = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= data.story.paragraphs.length) return
    const updatedParagraphs = [...data.story.paragraphs]
    const temp = updatedParagraphs[index]
    updatedParagraphs[index] = updatedParagraphs[targetIndex]
    updatedParagraphs[targetIndex] = temp
    setData(prev => ({
      ...prev,
      story: {
        ...prev.story,
        paragraphs: updatedParagraphs
      }
    }))
  }

  const updateTeamField = (field: string, value: any) => {
    setData(prev => ({
      ...prev,
      team: {
        ...prev.team,
        [field]: value
      }
    }))
  }

  const updateTeamMemberField = (index: number, field: keyof TeamMember, value: string) => {
    const updatedMembers = [...data.team.members]
    updatedMembers[index] = {
      ...updatedMembers[index],
      [field]: value
    }
    setData(prev => ({
      ...prev,
      team: {
        ...prev.team,
        members: updatedMembers
      }
    }))
  }

  const addTeamMember = () => {
    if (!newMember.name.trim() || !newMember.title.trim()) {
      showStatus('error', 'Name and Title are required for new team members.')
      return
    }
    setData(prev => ({
      ...prev,
      team: {
        ...prev.team,
        members: [...prev.team.members, newMember]
      }
    }))
    setIsAddingMember(false)
    setNewMember({
      image: `https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/image-${[50,52,54,55,56,57][Math.floor(Math.random() * 6)]}.png`,
      name: '',
      title: '',
      description: '',
      type: 'Development team',
      facebookLink: '#',
      twitterLink: '#',
      githubLink: '#',
      instagramLink: '#'
    })
    showStatus('success', 'New team member added to local list! Save all changes to apply.')
  }

  const deleteTeamMember = (index: number) => {
    setData(prev => ({
      ...prev,
      team: {
        ...prev.team,
        members: prev.team.members.filter((_, i) => i !== index)
      }
    }))
    showStatus('success', 'Team member removed from local list! Save all changes to apply.')
  }

  const moveTeamMember = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= data.team.members.length) return
    const updatedMembers = [...data.team.members]
    const temp = updatedMembers[index]
    updatedMembers[index] = updatedMembers[targetIndex]
    updatedMembers[targetIndex] = temp
    setData(prev => ({
      ...prev,
      team: {
        ...prev.team,
        members: updatedMembers
      }
    }))
  }

  const handleSaveAll = async () => {
    setSaving(true)
    const result = await updateSiteSectionAction('about_page', data)
    setSaving(false)
    if (result.error) {
      showStatus('error', result.error)
    } else {
      showStatus('success', 'About Page CMS updated successfully!')
    }
  }

  // Filtered list of members to view
  const filteredMembers = data.team.members.map((m, originalIndex) => ({ ...m, originalIndex }))
    .filter(m => teamFilter === 'all' || m.type.toLowerCase() === teamFilter.toLowerCase())

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
            Apargo About Page Manager
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Modify any page element and click "Save All Changes" to instantly publish and rebuild the About page.
          </p>
        </div>
        <Button onClick={handleSaveAll} disabled={saving} className="rounded-xl w-full sm:w-auto px-6 font-semibold shadow-sm">
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving configs...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Save All Changes
            </>
          )}
        </Button>
      </div>

      {/* Modern High-fidelity Tabs Navigation */}
      <div className="flex border-b gap-1 bg-muted/10 p-1.5 rounded-xl border max-w-md">
        <button
          onClick={() => setActiveTab('hero')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'hero' 
              ? 'bg-background text-primary shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Award className="h-3.5 w-3.5" />
          Hero & Stats
        </button>
        <button
          onClick={() => setActiveTab('story')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'story' 
              ? 'bg-background text-primary shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <BookOpen className="h-3.5 w-3.5" />
          Company Story
        </button>
        <button
          onClick={() => setActiveTab('team')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'team' 
              ? 'bg-background text-primary shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Users className="h-3.5 w-3.5" />
          Team Members
        </button>
      </div>

      {/* TABS CONTENT PANELS */}
      
      {/* 1. HERO & STATS TAB */}
      {activeTab === 'hero' && (
        <div className="grid gap-6">
          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" /> Hero Text Elements
              </CardTitle>
              <CardDescription className="text-xs">
                Edit the main intro content displayed at the top of the About page.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1.5 md:col-span-1">
                  <Label htmlFor="hero-badge" className="text-xs font-semibold">Eyebrow Badge</Label>
                  <Input
                    id="hero-badge"
                    value={data.hero.badgeText}
                    onChange={(e) => updateHeroField('badgeText', e.target.value)}
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label htmlFor="hero-heading" className="text-xs font-semibold">Hero Title</Label>
                  <Input
                    id="hero-heading"
                    value={data.hero.heading}
                    onChange={(e) => updateHeroField('heading', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="hero-desc" className="text-xs font-semibold">Hero Description Paragraph</Label>
                <Textarea
                  id="hero-desc"
                  rows={3}
                  value={data.hero.description}
                  onChange={(e) => updateHeroField('description', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> Numeric Stats Counters
              </CardTitle>
              <CardDescription className="text-xs">
                Edit the three core counters displayed beside the hero intro.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              {data.hero.stats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-xl border bg-muted/10 space-y-3">
                  <span className="text-xs font-bold text-primary block">Stat Counter #{idx + 1}</span>
                  <div className="space-y-1">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Target Number</Label>
                    <Input
                      type="number"
                      value={stat.value}
                      onChange={(e) => updateHeroStat(idx, 'value', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Description Tag</Label>
                    <Input
                      value={stat.description}
                      onChange={(e) => updateHeroStat(idx, 'description', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* 2. STORY TAB */}
      {activeTab === 'story' && (
        <div className="grid gap-6">
          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" /> Story Header & Imagery
              </CardTitle>
              <CardDescription className="text-xs">
                Edit the story sections headers, the brand text, and story illustration.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1.5 col-span-1">
                  <Label htmlFor="story-badge" className="text-xs font-semibold">Story Badge</Label>
                  <Input
                    id="story-badge"
                    value={data.story.badgeText}
                    onChange={(e) => updateStoryField('badgeText', e.target.value)}
                  />
                </div>
                <div className="space-y-1.5 col-span-2">
                  <Label htmlFor="story-heading" className="text-xs font-semibold">Story Heading</Label>
                  <Input
                    id="story-heading"
                    value={data.story.heading}
                    onChange={(e) => updateStoryField('heading', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="story-desc" className="text-xs font-semibold">Short Summary / Description</Label>
                <Textarea
                  id="story-desc"
                  rows={2}
                  value={data.story.description}
                  onChange={(e) => updateStoryField('description', e.target.value)}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-4 items-end border-t pt-4">
                <div className="space-y-1.5 md:col-span-3">
                  <Label htmlFor="story-image" className="text-xs font-semibold flex items-center gap-1.5">
                    <ImageIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    Story Main Image URL
                  </Label>
                  <Input
                    id="story-image"
                    value={data.story.imageUrl}
                    onChange={(e) => updateStoryField('imageUrl', e.target.value)}
                  />
                </div>
                <div className="md:col-span-1 flex justify-center bg-muted/20 border border-dashed p-1.5 rounded-lg">
                  {data.story.imageUrl ? (
                    <img 
                      src={data.story.imageUrl} 
                      alt="Story preview" 
                      className="h-10 w-full object-cover rounded-md"
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                  ) : (
                    <span className="text-[10px] text-muted-foreground py-2">No preview</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" /> Story Detailed Paragraphs
                </CardTitle>
                <CardDescription className="text-xs">
                  Manage the full text story columns explaining the history and motivation.
                </CardDescription>
              </div>
              <Button onClick={addStoryParagraph} variant="outline" size="sm" className="gap-1 rounded-lg">
                <Plus className="h-3.5 w-3.5" /> Add Paragraph
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5 pb-2">
                <Label htmlFor="story-content-heading" className="text-xs font-semibold">Right Side Content Subhead</Label>
                <Input
                  id="story-content-heading"
                  value={data.story.contentHeading}
                  onChange={(e) => updateStoryField('contentHeading', e.target.value)}
                />
              </div>

              <div className="space-y-4 border-t pt-4">
                {data.story.paragraphs.map((para, idx) => (
                  <div key={idx} className="flex gap-3 items-start bg-muted/5 p-3 rounded-xl border">
                    <span className="text-xs font-bold text-muted-foreground shrink-0 mt-2.5 bg-muted size-5 rounded-full flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <Textarea
                        rows={2}
                        value={para}
                        onChange={(e) => updateStoryParagraph(idx, e.target.value)}
                        placeholder="Write paragraph content..."
                        className="bg-background resize-y text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-1 shrink-0 bg-background border rounded-lg p-0.5">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-7 hover:bg-muted"
                        disabled={idx === 0}
                        onClick={() => moveStoryParagraph(idx, 'up')}
                        title="Move up"
                      >
                        <ArrowUp className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-7 hover:bg-muted"
                        disabled={idx === data.story.paragraphs.length - 1}
                        onClick={() => moveStoryParagraph(idx, 'down')}
                        title="Move down"
                      >
                        <ArrowDown className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-7 hover:bg-red-500/10 text-muted-foreground hover:text-red-500"
                        onClick={() => deleteStoryParagraph(idx)}
                        title="Delete paragraph"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}

                {data.story.paragraphs.length === 0 && (
                  <div className="text-center py-8 border border-dashed rounded-xl bg-muted/10">
                    <p className="text-xs text-muted-foreground">No paragraphs added. Click "Add Paragraph" to create one.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 3. TEAM MEMBERS TAB */}
      {activeTab === 'team' && (
        <div className="grid gap-6">
          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" /> Team Section Heading
              </CardTitle>
              <CardDescription className="text-xs">
                Customize titles and descriptions on the team grid. Enclose words in **asterisks** to create highlighted emphasis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="team-heading" className="text-xs font-semibold">Team Section Heading</Label>
                <Input
                  id="team-heading"
                  value={data.team.heading}
                  onChange={(e) => updateTeamField('heading', e.target.value)}
                  placeholder="e.g. Introducing Our Team, the *Creators* Behind the Magic"
                />
                <span className="text-[10px] text-muted-foreground italic block mt-0.5">
                  Pro-tip: Wrapping text in single asterisks like <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-[9px]">*Creators*</code> gives it a premium gold/primary underline highlight on the website!
                </span>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="team-desc" className="text-xs font-semibold">Team Section Description</Label>
                <Input
                  id="team-desc"
                  value={data.team.description}
                  onChange={(e) => updateTeamField('description', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* TEAM MEMBERS GRID */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h4 className="text-sm font-bold flex items-center gap-2 text-foreground">
                  <Users className="h-4 w-4 text-primary" />
                  Active Team Members ({data.team.members.length})
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Add, edit, delete or change departments for company builders.
                </p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <select
                  value={teamFilter}
                  onChange={(e) => setTeamFilter(e.target.value)}
                  className="rounded-lg border bg-background px-3 py-1.5 text-xs font-semibold"
                >
                  <option value="all">All Departments</option>
                  <option value="management">Management</option>
                  <option value="design team">Design Team</option>
                  <option value="Development team">Development Team</option>
                  <option value="Marketing team">Marketing Team</option>
                </select>

                {!isAddingMember && (
                  <Button onClick={() => setIsAddingMember(true)} size="sm" className="gap-1 rounded-lg text-xs font-semibold ml-auto sm:ml-0">
                    <Plus className="h-3.5 w-3.5" /> Add Member
                  </Button>
                )}
              </div>
            </div>

            {/* ADD MEMBER DIALOG OR CARD */}
            {isAddingMember && (
              <Card className="border border-primary/20 bg-primary/5 rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-primary flex items-center gap-1.5">
                    <Plus className="h-4 w-4" /> Add New Team Member
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Populate details for the new staff card.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">Full Name</Label>
                      <Input
                        value={newMember.name}
                        placeholder="e.g. Jane Doe"
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">Role Title</Label>
                      <Input
                        value={newMember.title}
                        placeholder="e.g. Chief Product Officer"
                        onChange={(e) => setNewMember({ ...newMember, title: e.target.value })}
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">Department Type</Label>
                      <select
                        value={newMember.type}
                        onChange={(e) => setNewMember({ ...newMember, type: e.target.value })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="management">Management</option>
                        <option value="design team">Design Team</option>
                        <option value="Development team">Development Team</option>
                        <option value="Marketing team">Marketing Team</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1.5 md:col-span-2">
                      <Label className="text-xs font-semibold">Avatar Image URL</Label>
                      <Input
                        value={newMember.image}
                        placeholder="Image web URL"
                        onChange={(e) => setNewMember({ ...newMember, image: e.target.value })}
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-1">
                      <Label className="text-xs font-semibold block">Social Profile Tip</Label>
                      <span className="text-[10px] text-muted-foreground block mt-2">
                        Social links defaults to "#" (disabled icons). Link to real portfolios for live redirect.
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Short Bio / Description</Label>
                    <Textarea
                      value={newMember.description}
                      placeholder="e.g. Inspiring team builders focused on building beautiful interfaces..."
                      rows={2}
                      onChange={(e) => setNewMember({ ...newMember, description: e.target.value })}
                      className="bg-background"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-4 border-t pt-4">
                    <div className="space-y-1">
                      <Label className="text-[10px] uppercase font-bold">Facebook URL</Label>
                      <Input
                        value={newMember.facebookLink}
                        onChange={(e) => setNewMember({ ...newMember, facebookLink: e.target.value })}
                        className="bg-background h-8 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] uppercase font-bold">Twitter URL</Label>
                      <Input
                        value={newMember.twitterLink}
                        onChange={(e) => setNewMember({ ...newMember, twitterLink: e.target.value })}
                        className="bg-background h-8 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] uppercase font-bold">GitHub URL</Label>
                      <Input
                        value={newMember.githubLink}
                        onChange={(e) => setNewMember({ ...newMember, githubLink: e.target.value })}
                        className="bg-background h-8 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] uppercase font-bold">Instagram URL</Label>
                      <Input
                        value={newMember.instagramLink}
                        onChange={(e) => setNewMember({ ...newMember, instagramLink: e.target.value })}
                        className="bg-background h-8 text-xs"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 pb-4">
                  <Button onClick={() => setIsAddingMember(false)} variant="outline" size="sm" className="rounded-lg">
                    Cancel
                  </Button>
                  <Button onClick={addTeamMember} size="sm" className="rounded-lg">
                    Add Member
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* INTERACTIVE TEAM LIST */}
            <div className="grid gap-4">
              {filteredMembers.map((member) => {
                const idx = member.originalIndex
                return (
                  <Card key={idx} className="border border-border/60 rounded-2xl hover:shadow-sm transition-all overflow-hidden bg-background">
                    <CardContent className="p-4 md:p-6 space-y-4">
                      {/* Read & Write Controls Combo Panel */}
                      <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
                        <div className="flex gap-4 flex-1 items-start w-full">
                          {/* Image preview */}
                          <div className="relative shrink-0 mt-1">
                            {member.image ? (
                              <img
                                src={member.image}
                                alt={member.name}
                                className="size-16 rounded-xl border border-border/80 object-cover bg-muted"
                                onError={(e) => { e.currentTarget.style.display = 'none' }}
                              />
                            ) : (
                              <div className="size-16 rounded-xl border bg-muted flex items-center justify-center font-bold text-xs">
                                ??
                              </div>
                            )}
                          </div>

                          <div className="grid gap-3 flex-1 w-full">
                            <div className="grid gap-3 md:grid-cols-3">
                              <div className="space-y-1">
                                <Label className="text-[10px] uppercase font-bold text-muted-foreground">Full Name</Label>
                                <Input
                                  value={member.name}
                                  onChange={(e) => updateTeamMemberField(idx, 'name', e.target.value)}
                                  className="h-8 text-xs font-semibold"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-[10px] uppercase font-bold text-muted-foreground">Role Title</Label>
                                <Input
                                  value={member.title}
                                  onChange={(e) => updateTeamMemberField(idx, 'title', e.target.value)}
                                  className="h-8 text-xs"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-[10px] uppercase font-bold text-muted-foreground">Department Category</Label>
                                <select
                                  value={member.type}
                                  onChange={(e) => updateTeamMemberField(idx, 'type', e.target.value)}
                                  className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-xs focus-visible:outline-none focus-visible:ring-2"
                                >
                                  <option value="management">Management</option>
                                  <option value="design team">Design Team</option>
                                  <option value="Development team">Development Team</option>
                                  <option value="Marketing team">Marketing Team</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid gap-3 md:grid-cols-2">
                              <div className="space-y-1">
                                <Label className="text-[10px] uppercase font-bold text-muted-foreground">Avatar URL</Label>
                                <Input
                                  value={member.image}
                                  onChange={(e) => updateTeamMemberField(idx, 'image', e.target.value)}
                                  className="h-8 text-xs"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-[10px] uppercase font-bold text-muted-foreground">Bio Description</Label>
                                <Input
                                  value={member.description}
                                  onChange={(e) => updateTeamMemberField(idx, 'description', e.target.value)}
                                  className="h-8 text-xs"
                                />
                              </div>
                            </div>

                            {/* Socials toggle row */}
                            <div className="grid gap-2 grid-cols-4 border-t pt-2 mt-1">
                              <div className="space-y-1">
                                <span className="text-[9px] uppercase font-semibold text-muted-foreground block">Facebook</span>
                                <Input
                                  value={member.facebookLink}
                                  onChange={(e) => updateTeamMemberField(idx, 'facebookLink', e.target.value)}
                                  className="h-6 text-[10px] py-0 px-2"
                                />
                              </div>
                              <div className="space-y-1">
                                <span className="text-[9px] uppercase font-semibold text-muted-foreground block">Twitter</span>
                                <Input
                                  value={member.twitterLink}
                                  onChange={(e) => updateTeamMemberField(idx, 'twitterLink', e.target.value)}
                                  className="h-6 text-[10px] py-0 px-2"
                                />
                              </div>
                              <div className="space-y-1">
                                <span className="text-[9px] uppercase font-semibold text-muted-foreground block">GitHub</span>
                                <Input
                                  value={member.githubLink}
                                  onChange={(e) => updateTeamMemberField(idx, 'githubLink', e.target.value)}
                                  className="h-6 text-[10px] py-0 px-2"
                                />
                              </div>
                              <div className="space-y-1">
                                <span className="text-[9px] uppercase font-semibold text-muted-foreground block">Instagram</span>
                                <Input
                                  value={member.instagramLink}
                                  onChange={(e) => updateTeamMemberField(idx, 'instagramLink', e.target.value)}
                                  className="h-6 text-[10px] py-0 px-2"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action buttons panel */}
                        <div className="flex flex-row md:flex-col gap-1 items-center justify-end shrink-0 self-end md:self-start bg-muted/40 p-1.5 rounded-xl border mt-2 md:mt-0">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-7 hover:bg-background"
                            disabled={idx === 0}
                            onClick={() => moveTeamMember(idx, 'up')}
                            title="Move Up"
                          >
                            <ArrowUp className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-7 hover:bg-background"
                            disabled={idx === data.team.members.length - 1}
                            onClick={() => moveTeamMember(idx, 'down')}
                            title="Move Down"
                          >
                            <ArrowDown className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-7 hover:bg-red-500/10 text-muted-foreground hover:text-red-500"
                            onClick={() => deleteTeamMember(idx)}
                            title="Delete member"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

              {filteredMembers.length === 0 && (
                <div className="text-center py-12 border border-dashed rounded-2xl bg-muted/10 space-y-2">
                  <Users className="h-8 w-8 text-muted-foreground/40 mx-auto" />
                  <p className="text-sm font-semibold text-muted-foreground">No team members found</p>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    {teamFilter !== 'all' 
                      ? `No team members currently matched with department category "${teamFilter}".`
                      : 'Add organization team members to populate lists.'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
