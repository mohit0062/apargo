'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { updateSiteSectionAction } from '../cms-actions'
import { Check, Loader2, Plus, Trash2, ArrowUp, ArrowDown, X, Edit2, Quote, Globe } from 'lucide-react'

interface TestimonialItem {
  avatar: string
  fallback: string
  name: string
  handle: string
  platform: 'linkedin' | 'twitter' | string
  date: string
  content: string
}

interface TestimonialsClientProps {
  initialData: { items: TestimonialItem[] } | TestimonialItem[]
}

export default function TestimonialsClient({ initialData }: TestimonialsClientProps) {
  // Safe extraction of initial list
  const initialList = Array.isArray(initialData)
    ? initialData
    : (initialData?.items || [])

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialList)
  const [saving, setSaving] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  // Status notification banner
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // State for new testimonial form
  const [isAdding, setIsAdding] = useState(false)
  const [newTestimonial, setNewTestimonial] = useState<TestimonialItem>({
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
    fallback: '',
    name: '',
    handle: '',
    platform: 'linkedin',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    content: ''
  })

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text })
    setTimeout(() => {
      setStatusMsg(null)
    }, 5000)
  }

  const handleSave = async () => {
    setSaving(true)
    const result = await updateSiteSectionAction('testimonials', { items: testimonials })
    setSaving(false)
    if (result.error) {
      showStatus('error', result.error)
    } else {
      showStatus('success', 'Testimonials updated successfully!')
    }
  }

  const handleAdd = () => {
    if (!newTestimonial.name.trim() || !newTestimonial.content.trim()) {
      showStatus('error', 'Name and review content are required!')
      return
    }

    // Auto generate fallback if empty
    const fallback = newTestimonial.fallback.trim() 
      ? newTestimonial.fallback 
      : newTestimonial.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()

    setTestimonials([...testimonials, { ...newTestimonial, fallback }])
    setIsAdding(false)
    setNewTestimonial({
      avatar: `https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-${Math.floor(Math.random() * 30) + 1}.png`,
      fallback: '',
      name: '',
      handle: '',
      platform: 'linkedin',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      content: ''
    })
    showStatus('success', 'Testimonial added to list! Save changes to apply to website.')
  }

  const handleDelete = (index: number) => {
    const updated = testimonials.filter((_, i) => i !== index)
    setTestimonials(updated)
    if (editingIndex === index) {
      setEditingIndex(null)
    } else if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1)
    }
    showStatus('success', 'Testimonial removed! Save changes to apply to website.')
  }

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= testimonials.length) return

    const updated = [...testimonials]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp

    setTestimonials(updated)
    if (editingIndex === index) {
      setEditingIndex(targetIndex)
    } else if (editingIndex === targetIndex) {
      setEditingIndex(index)
    }
  }

  const handleFieldChange = (index: number, field: keyof TestimonialItem, value: string) => {
    const updated = [...testimonials]
    updated[index] = {
      ...updated[index],
      [field]: value
    }
    setTestimonials(updated)
  }

  return (
    <div className="space-y-6">
      {/* Status Msg Banner */}
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

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Quote className="h-5 w-5 text-primary" />
            Client Reviews ({testimonials.length})
          </h3>
          <p className="text-muted-foreground text-xs mt-1">
            Drag, edit or reorder the testimonial block configurations. Changes take effect on the frontend home page after saving.
          </p>
        </div>
        <div className="flex gap-2">
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)} variant="outline" className="gap-2 rounded-lg">
              <Plus className="h-4 w-4" /> Add Testimonial
            </Button>
          )}
          <Button onClick={handleSave} disabled={saving} className="gap-2 rounded-lg px-6">
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            Save All Changes
          </Button>
        </div>
      </div>

      {/* ADD TESTIMONIAL VIEW */}
      {isAdding && (
        <Card className="border border-primary/20 bg-primary/5 rounded-2xl shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-md font-bold text-primary flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add New Testimonial
            </CardTitle>
            <CardDescription className="text-xs">
              Add a brand new customer review card to the dynamic list.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="new-name">Full Name</Label>
                <Input
                  id="new-name"
                  placeholder="e.g. Mohit Sharma"
                  value={newTestimonial.name}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-handle">Handle / Designation</Label>
                <Input
                  id="new-handle"
                  placeholder="e.g. @mohit · Founder, Apargo"
                  value={newTestimonial.handle}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, handle: e.target.value })}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-platform">Platform / Source</Label>
                <select
                  id="new-platform"
                  value={newTestimonial.platform}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, platform: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="linkedin">LinkedIn</option>
                  <option value="twitter">Twitter / X</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="new-avatar">Avatar Image URL</Label>
                <Input
                  id="new-avatar"
                  placeholder="e.g. https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png"
                  value={newTestimonial.avatar}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, avatar: e.target.value })}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-fallback">Avatar Fallback Initials (Optional)</Label>
                <Input
                  id="new-fallback"
                  placeholder="e.g. MS (Leave blank to auto-generate)"
                  maxLength={2}
                  value={newTestimonial.fallback}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, fallback: e.target.value })}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-date">Date Tag</Label>
                <Input
                  id="new-date"
                  placeholder="e.g. Mar 10 2025"
                  value={newTestimonial.date}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, date: e.target.value })}
                  className="bg-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-content">Testimonial Review Content</Label>
              <Textarea
                id="new-content"
                placeholder="Write client's review here..."
                rows={3}
                value={newTestimonial.content}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                className="bg-background"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 pb-4">
            <Button onClick={() => setIsAdding(false)} variant="outline" className="rounded-lg">
              Cancel
            </Button>
            <Button onClick={handleAdd} className="rounded-lg">
              Add to List
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* TESTIMONIALS INTERACTIVE LIST */}
      <div className="grid gap-4">
        {testimonials.map((item, index) => {
          const isEditing = editingIndex === index
          return (
            <Card
              key={index}
              className={`border border-border/60 hover:shadow-md transition-all rounded-2xl overflow-hidden ${
                isEditing ? 'border-primary/30 ring-1 ring-primary/20 bg-muted/10' : ''
              }`}
            >
              <CardContent className="p-4 md:p-6 space-y-4">
                {isEditing ? (
                  // EDIT MODE FORM
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <h4 className="text-sm font-bold text-primary">Editing Testimonial #{index + 1}</h4>
                      <Button onClick={() => setEditingIndex(null)} size="sm" className="gap-1 rounded-lg">
                        <Check className="h-3.5 w-3.5" /> Done Editing
                      </Button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold">Name</Label>
                        <Input
                          value={item.name}
                          onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold">Handle / Designation</Label>
                        <Input
                          value={item.handle}
                          onChange={(e) => handleFieldChange(index, 'handle', e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold">Platform</Label>
                        <select
                          value={item.platform}
                          onChange={(e) => handleFieldChange(index, 'platform', e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <option value="linkedin">LinkedIn</option>
                          <option value="twitter">Twitter / X</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold">Avatar Image URL</Label>
                        <Input
                          value={item.avatar}
                          onChange={(e) => handleFieldChange(index, 'avatar', e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold">Fallback Initials</Label>
                        <Input
                          value={item.fallback}
                          onChange={(e) => handleFieldChange(index, 'fallback', e.target.value)}
                          maxLength={2}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold">Date</Label>
                        <Input
                          value={item.date}
                          onChange={(e) => handleFieldChange(index, 'date', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs font-semibold">Review Content</Label>
                      <Textarea
                        value={item.content}
                        onChange={(e) => handleFieldChange(index, 'content', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                ) : (
                  // READ MODE CARD
                  <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
                    <div className="flex gap-4 flex-1 items-start">
                      {/* Avatar preview */}
                      <div className="relative shrink-0 mt-1">
                        {item.avatar ? (
                          <img
                            src={item.avatar}
                            alt={item.name}
                            className="size-12 rounded-full border border-border/80 object-cover"
                            onError={(e) => {
                              // If image fails, hide it and rely on fallback style
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        ) : (
                          <div className="size-12 rounded-full border bg-muted flex items-center justify-center font-bold text-xs">
                            {item.fallback || '??'}
                          </div>
                        )}
                        <span className="absolute -bottom-1 -right-1 bg-background p-0.5 rounded-full border shadow-sm">
                          {item.platform === 'linkedin' ? (
                            <Globe className="h-3 w-3 text-blue-600" />
                          ) : (
                            <Quote className="h-3 w-3 text-sky-500" />
                          )}
                        </span>
                      </div>

                      <div className="space-y-1 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <h4 className="font-bold text-foreground text-sm">{item.name}</h4>
                          <span className="text-xs text-muted-foreground">{item.handle}</span>
                          <span className="text-[10px] bg-muted/60 border border-border/50 text-muted-foreground rounded px-1.5 py-0.2 shrink-0">{item.date}</span>
                        </div>
                        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed italic font-serif">
                          "{item.content}"
                        </p>
                      </div>
                    </div>

                    {/* Action Panel */}
                    <div className="flex items-center gap-1 shrink-0 self-end md:self-center bg-muted/30 p-1 rounded-xl border border-border/40">
                      <Button
                        onClick={() => setEditingIndex(index)}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-background text-muted-foreground hover:text-foreground rounded-lg"
                        title="Edit testimonial"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        onClick={() => handleMove(index, 'up')}
                        disabled={index === 0}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-background text-muted-foreground disabled:opacity-40 rounded-lg"
                        title="Move up"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        onClick={() => handleMove(index, 'down')}
                        disabled={index === testimonials.length - 1}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-background text-muted-foreground disabled:opacity-40 rounded-lg"
                        title="Move down"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(index)}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 rounded-lg"
                        title="Delete testimonial"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}

        {testimonials.length === 0 && (
          <div className="text-center py-12 border border-dashed rounded-2xl bg-muted/10 space-y-2">
            <Quote className="h-8 w-8 text-muted-foreground/40 mx-auto" />
            <p className="text-sm font-semibold text-muted-foreground">No testimonials found</p>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Add client reviews using the button above to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
