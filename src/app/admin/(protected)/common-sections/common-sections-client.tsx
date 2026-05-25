'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { updateSiteSectionAction } from '../cms-actions'
import { DEFAULT_LINK_COLUMNS, DEFAULT_BOTTOM_LINKS } from '@/components/shadcn-studio/blocks/footer-component-05/footer-component-05'
import { Check, Loader2, Plus, X, Globe, Mail, Phone, MapPin, Search, ArrowUp, ArrowDown, Trash2, Image as ImageIcon } from 'lucide-react'

interface CommonSectionsClientProps {
  initialNavbar: any
  initialFooter: any
  initialCta: any
  initialSeo: any
}

export default function CommonSectionsClient({
  initialNavbar,
  initialFooter,
  initialCta,
  initialSeo,
}: CommonSectionsClientProps) {
  // State for Navbar
  const [navbar, setNavbar] = useState(navbarDataWithFallback(initialNavbar))
  const [savingNavbar, setSavingNavbar] = useState(false)
  const [newLinkTitle, setNewLinkTitle] = useState('')
  const [newLinkHref, setNewLinkHref] = useState('')
  
  // Helper to ensure standaloneLinks fallback is set safely
  function navbarDataWithFallback(data: any) {
    if (!data) return {}
    return {
      ...data,
      standaloneLinks: (data.standaloneLinks && data.standaloneLinks.length > 0) 
        ? data.standaloneLinks 
        : [
            { title: "Home", href: "/" },
            { title: "Technologies", href: "/technologies" },
            { title: "Blog", href: "/blog" },
            { title: "Careers", href: "/careers" },
            { title: "Contact", href: "/contact" }
          ]
    }
  }

  // State for Footer
  const [footer, setFooter] = useState(footerDataWithFallback(initialFooter))
  const [savingFooter, setSavingFooter] = useState(false)
  const [newFooterColTitle, setNewFooterColTitle] = useState('')
  const [newBottomLinkTitle, setNewBottomLinkTitle] = useState('')
  const [newBottomLinkHref, setNewBottomLinkHref] = useState('')

  function footerDataWithFallback(data: any) {
    if (!data) return {}
    return {
      ...data,
      linkColumns: (data.linkColumns && data.linkColumns.length > 0) 
        ? data.linkColumns 
        : DEFAULT_LINK_COLUMNS,
      bottomLinks: (data.bottomLinks && data.bottomLinks.length > 0) 
        ? data.bottomLinks 
        : DEFAULT_BOTTOM_LINKS
    }
  }

  // State for CTA
  const [cta, setCta] = useState(initialCta)
  const [savingCta, setSavingCta] = useState(false)
  const [newServiceTag, setNewServiceTag] = useState('')

  // State for SEO
  const [seo, setSeo] = useState(initialSeo || {})
  const [savingSeo, setSavingSeo] = useState(false)
  const [newMetaName, setNewMetaName] = useState('')
  const [newMetaContent, setNewMetaContent] = useState('')

  // Notification states
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text })
    setTimeout(() => {
      setStatusMsg(null)
    }, 5000)
  }

  const handleSaveNavbar = async () => {
    setSavingNavbar(true)
    const result = await updateSiteSectionAction('navbar', navbar)
    setSavingNavbar(false)
    if (result.error) {
      showStatus('error', result.error)
    } else {
      showStatus('success', 'Navbar configuration updated successfully!')
    }
  }

  const handleSaveFooter = async () => {
    setSavingFooter(true)
    const result = await updateSiteSectionAction('footer', footer)
    setSavingFooter(false)
    if (result.error) {
      showStatus('error', result.error)
    } else {
      showStatus('success', 'Footer configuration updated successfully!')
    }
  }

  const handleSaveCta = async () => {
    setSavingCta(true)
    const result = await updateSiteSectionAction('cta', cta)
    setSavingCta(false)
    if (result.error) {
      showStatus('error', result.error)
    } else {
      showStatus('success', 'Global CTA configuration updated successfully!')
    }
  }

  const handleSaveSeo = async () => {
    setSavingSeo(true)
    const result = await updateSiteSectionAction('seo', seo)
    setSavingSeo(false)
    if (result.error) {
      showStatus('error', result.error)
    } else {
      showStatus('success', 'SEO configuration updated successfully!')
    }
  }

  // CTA Service tag managers
  const addServiceTag = () => {
    if (!newServiceTag.trim()) return
    const tags = cta.services || []
    if (tags.includes(newServiceTag.trim())) return
    setCta({
      ...cta,
      services: [...tags, newServiceTag.trim()],
    })
    setNewServiceTag('')
  }

  const removeServiceTag = (tagToRemove: string) => {
    const tags = cta.services || []
    setCta({
      ...cta,
      services: tags.filter((t: string) => t !== tagToRemove),
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

      <Tabs defaultValue="navbar" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-xl bg-muted/60 p-1 rounded-xl">
          <TabsTrigger value="navbar" className="rounded-lg py-2">Navbar</TabsTrigger>
          <TabsTrigger value="footer" className="rounded-lg py-2">Footer</TabsTrigger>
          <TabsTrigger value="cta" className="rounded-lg py-2">Global CTA</TabsTrigger>
          <TabsTrigger value="seo" className="rounded-lg py-2">SEO</TabsTrigger>
        </TabsList>

        {/* NAVBAR TAB CONTENT */}
        <TabsContent value="navbar" className="mt-6">
          <Card className="border border-border/50 bg-background/50 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
              <CardTitle className="text-xl font-semibold">Navbar Config</CardTitle>
              <CardDescription>
                Customize brand text, logo branding, and navigation control paths.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="logoText">Logo / Brand Text</Label>
                  <Input
                    id="logoText"
                    value={navbar.logoText || ''}
                    onChange={(e) => setNavbar({ ...navbar, logoText: e.target.value })}
                    placeholder="Apargo"
                    className="bg-muted/30 focus-visible:ring-primary/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logoImageUrl">Logo Image URL</Label>
                  <Input
                    id="logoImageUrl"
                    value={navbar.logoImageUrl || ''}
                    onChange={(e) => setNavbar({ ...navbar, logoImageUrl: e.target.value })}
                    placeholder="/group-2.svg"
                    className="bg-muted/30 focus-visible:ring-primary/30"
                  />
                </div>
              </div>

              <div className="border-t border-border/30 pt-6">
                <h4 className="text-sm font-semibold text-foreground mb-1">Standalone Navigation Links</h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Add, edit, reorder, or remove navigation tabs/links.
                </p>

                {/* Links List */}
                <div className="space-y-3 mb-4">
                  {(navbar.standaloneLinks || []).map((link: any, index: number) => (
                    <div key={index} className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-muted/20 border border-border/50 rounded-xl">
                      <div className="grid grid-cols-2 gap-3 w-full sm:flex-1">
                        <div className="space-y-1">
                          <Label className="text-[10px] text-muted-foreground uppercase font-semibold">Link Title</Label>
                          <Input
                            value={link.title || ''}
                            onChange={(e) => {
                              const updated = [...(navbar.standaloneLinks || [])]
                              updated[index] = { ...updated[index], title: e.target.value }
                              setNavbar({ ...navbar, standaloneLinks: updated })
                            }}
                            placeholder="Title"
                            className="bg-background h-9 text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] text-muted-foreground uppercase font-semibold">Destination (Href)</Label>
                          <Input
                            value={link.href || ''}
                            onChange={(e) => {
                              const updated = [...(navbar.standaloneLinks || [])]
                              updated[index] = { ...updated[index], href: e.target.value }
                              setNavbar({ ...navbar, standaloneLinks: updated })
                            }}
                            placeholder="e.g. /careers"
                            className="bg-background h-9 text-sm"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={index === 0}
                          onClick={() => {
                            const updated = [...(navbar.standaloneLinks || [])]
                            const temp = updated[index]
                            updated[index] = updated[index - 1]
                            updated[index - 1] = temp
                            setNavbar({ ...navbar, standaloneLinks: updated })
                          }}
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          title="Move Up"
                        >
                          ↑
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={index === (navbar.standaloneLinks || []).length - 1}
                          onClick={() => {
                            const updated = [...(navbar.standaloneLinks || [])]
                            const temp = updated[index]
                            updated[index] = updated[index + 1]
                            updated[index + 1] = temp
                            setNavbar({ ...navbar, standaloneLinks: updated })
                          }}
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          title="Move Down"
                        >
                          ↓
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const updated = (navbar.standaloneLinks || []).filter((_: any, i: number) => i !== index)
                            setNavbar({ ...navbar, standaloneLinks: updated })
                          }}
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                          title="Delete Link"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {(navbar.standaloneLinks || []).length === 0 && (
                    <p className="text-xs text-muted-foreground italic text-center p-4 bg-muted/10 border border-dashed rounded-xl">
                      No standalone navigation links defined. Add one below!
                    </p>
                  )}
                </div>

                {/* Add Link Sub-Form */}
                <div className="flex flex-col sm:flex-row items-end gap-3 p-3 bg-primary/5 border border-primary/20 rounded-xl max-w-2xl">
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="space-y-1">
                      <Label htmlFor="newLinkTitle" className="text-xs">New Title</Label>
                      <Input
                        id="newLinkTitle"
                        value={newLinkTitle}
                        onChange={(e) => setNewLinkTitle(e.target.value)}
                        placeholder="e.g. Careers"
                        className="bg-background h-9 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="newLinkHref" className="text-xs">New Destination</Label>
                      <Input
                        id="newLinkHref"
                        value={newLinkHref}
                        onChange={(e) => setNewLinkHref(e.target.value)}
                        placeholder="e.g. /careers"
                        className="bg-background h-9 text-sm"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={() => {
                      if (!newLinkTitle.trim() || !newLinkHref.trim()) return
                      const updated = [...(navbar.standaloneLinks || []), { title: newLinkTitle.trim(), href: newLinkHref.trim() }]
                      setNavbar({ ...navbar, standaloneLinks: updated })
                      setNewLinkTitle('')
                      setNewLinkHref('')
                    }}
                    className="w-full sm:w-auto h-9 shrink-0 gap-1.5 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4" /> Add Link
                  </Button>
                </div>
              </div>

              <div className="border-t border-border/30 pt-6">
                <h4 className="text-sm font-medium text-foreground mb-4">Demo Call-To-Action Button</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="demoBtnText">Button Label</Label>
                    <Input
                      id="demoBtnText"
                      value={navbar.demoBtnText || ''}
                      onChange={(e) => setNavbar({ ...navbar, demoBtnText: e.target.value })}
                      placeholder="Book a Demo"
                      className="bg-muted/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demoBtnLink">Button Route / Destination</Label>
                    <Input
                      id="demoBtnLink"
                      value={navbar.demoBtnLink || ''}
                      onChange={(e) => setNavbar({ ...navbar, demoBtnLink: e.target.value })}
                      placeholder="/contact?intent=demo"
                      className="bg-muted/30"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-border/30 pt-6">
                <h4 className="text-sm font-medium text-foreground mb-4">Consultation Action Button</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="consultBtnText">Button Label</Label>
                    <Input
                      id="consultBtnText"
                      value={navbar.consultBtnText || ''}
                      onChange={(e) => setNavbar({ ...navbar, consultBtnText: e.target.value })}
                      placeholder="Book a Free Consultation"
                      className="bg-muted/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="consultBtnLink">Button Route / Destination</Label>
                    <Input
                      id="consultBtnLink"
                      value={navbar.consultBtnLink || ''}
                      onChange={(e) => setNavbar({ ...navbar, consultBtnLink: e.target.value })}
                      placeholder="/contact?intent=consultation"
                      className="bg-muted/30"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/50 bg-muted/20 px-6 py-4 flex justify-end">
              <Button onClick={handleSaveNavbar} disabled={savingNavbar} className="gap-2 px-6 rounded-lg">
                {savingNavbar && <Loader2 className="h-4 w-4 animate-spin" />}
                Save Navbar Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* FOOTER TAB CONTENT */}
        <TabsContent value="footer" className="mt-6">
          <Card className="border border-border/50 bg-background/50 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
              <CardTitle className="text-xl font-semibold">Footer Config</CardTitle>
              <CardDescription>
                Customize dynamic footer elements, brand descriptions, copyright info, and social connections.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="footerDescription">Footer Brand Description</Label>
                <Textarea
                  id="footerDescription"
                  value={footer.description || ''}
                  onChange={(e) => setFooter({ ...footer, description: e.target.value })}
                  placeholder="Product engineering and AI services. Builders of AI Greentick."
                  className="bg-muted/30 min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="footerCopyright">Copyright Attribution</Label>
                <Input
                  id="footerCopyright"
                  value={footer.copyright || ''}
                  onChange={(e) => setFooter({ ...footer, copyright: e.target.value })}
                  placeholder="Apargo. All rights reserved."
                  className="bg-muted/30"
                />
              </div>

              <div className="border-t border-border/30 pt-6">
                <h4 className="text-sm font-medium text-foreground mb-4">Contact Info & Social Connections</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="socialGlobe" className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" /> Website URL
                    </Label>
                    <Input
                      id="socialGlobe"
                      value={footer.socialLinks?.globe || ''}
                      onChange={(e) => setFooter({
                        ...footer,
                        socialLinks: { ...footer.socialLinks, globe: e.target.value }
                      })}
                      placeholder="https://apargo.com"
                      className="bg-muted/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="socialMail" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" /> Support Email
                    </Label>
                    <Input
                      id="socialMail"
                      value={footer.socialLinks?.mail || ''}
                      onChange={(e) => setFooter({
                        ...footer,
                        socialLinks: { ...footer.socialLinks, mail: e.target.value }
                      })}
                      placeholder="hello@apargo.com"
                      className="bg-muted/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="socialPhone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" /> Contact Phone / Backup Email
                    </Label>
                    <Input
                      id="socialPhone"
                      value={footer.socialLinks?.phone || ''}
                      onChange={(e) => setFooter({
                        ...footer,
                        socialLinks: { ...footer.socialLinks, phone: e.target.value }
                      })}
                      placeholder="hello@apargo.com"
                      className="bg-muted/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="socialMap" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" /> Pin / Location / Map Route
                    </Label>
                    <Input
                      id="socialMap"
                      value={footer.socialLinks?.mapPin || ''}
                      onChange={(e) => setFooter({
                        ...footer,
                        socialLinks: { ...footer.socialLinks, mapPin: e.target.value }
                      })}
                      placeholder="/contact"
                      className="bg-muted/30"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-border/30 pt-6">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-foreground">Footer Logo Image</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Image path or URL for the footer brand mark.</p>
                <Input
                  value={footer.logoImageUrl || ''}
                  onChange={(e) => setFooter({ ...footer, logoImageUrl: e.target.value })}
                  placeholder="/group-2.svg"
                  className="bg-muted/30 max-w-md"
                />
              </div>

              {/* Footer Link Columns Editor */}
              <div className="border-t border-border/30 pt-6">
                <h4 className="text-sm font-semibold text-foreground mb-1">Footer Link Columns</h4>
                <p className="text-xs text-muted-foreground mb-4">Manage entire link groups shown in the footer (e.g. Services, Products, Company).</p>

                <div className="space-y-6">
                  {(footer.linkColumns || []).map((col: any, colIdx: number) => (
                    <div key={colIdx} className="p-4 bg-muted/15 border border-border/50 rounded-xl space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 space-y-1">
                          <Label className="text-[10px] uppercase font-semibold text-muted-foreground">Column Heading</Label>
                          <Input
                            value={col.title || ''}
                            onChange={(e) => {
                              const cols = [...(footer.linkColumns || [])]
                              cols[colIdx] = { ...cols[colIdx], title: e.target.value }
                              setFooter({ ...footer, linkColumns: cols })
                            }}
                            placeholder="e.g. Services"
                            className="bg-background h-9 text-sm font-medium"
                          />
                        </div>
                        <div className="flex items-center gap-1 shrink-0 self-end">
                          <Button type="button" variant="ghost" size="icon" disabled={colIdx === 0}
                            onClick={() => {
                              const cols = [...(footer.linkColumns || [])]
                              const tmp = cols[colIdx]; cols[colIdx] = cols[colIdx - 1]; cols[colIdx - 1] = tmp
                              setFooter({ ...footer, linkColumns: cols })
                            }}
                            className="h-8 w-8" title="Move Column Up">↑</Button>
                          <Button type="button" variant="ghost" size="icon" disabled={colIdx === (footer.linkColumns || []).length - 1}
                            onClick={() => {
                              const cols = [...(footer.linkColumns || [])]
                              const tmp = cols[colIdx]; cols[colIdx] = cols[colIdx + 1]; cols[colIdx + 1] = tmp
                              setFooter({ ...footer, linkColumns: cols })
                            }}
                            className="h-8 w-8" title="Move Column Down">↓</Button>
                          <Button type="button" variant="ghost" size="icon"
                            onClick={() => {
                              const cols = (footer.linkColumns || []).filter((_: any, i: number) => i !== colIdx)
                              setFooter({ ...footer, linkColumns: cols })
                            }}
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/10" title="Delete Column">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Links inside column */}
                      <div className="space-y-2 pl-2">
                        {(col.links || []).map((link: any, linkIdx: number) => (
                          <div key={linkIdx} className="flex items-center gap-2">
                            <Input
                              value={link.title || ''}
                              onChange={(e) => {
                                const cols = [...(footer.linkColumns || [])]
                                const links = [...(cols[colIdx].links || [])]
                                links[linkIdx] = { ...links[linkIdx], title: e.target.value }
                                cols[colIdx] = { ...cols[colIdx], links }
                                setFooter({ ...footer, linkColumns: cols })
                              }}
                              placeholder="Link title"
                              className="bg-background h-8 text-xs flex-1"
                            />
                            <Input
                              value={link.href || ''}
                              onChange={(e) => {
                                const cols = [...(footer.linkColumns || [])]
                                const links = [...(cols[colIdx].links || [])]
                                links[linkIdx] = { ...links[linkIdx], href: e.target.value }
                                cols[colIdx] = { ...cols[colIdx], links }
                                setFooter({ ...footer, linkColumns: cols })
                              }}
                              placeholder="/path"
                              className="bg-background h-8 text-xs flex-1"
                            />
                            <Button type="button" variant="ghost" size="icon"
                              onClick={() => {
                                const cols = [...(footer.linkColumns || [])]
                                const links = (cols[colIdx].links || []).filter((_: any, i: number) => i !== linkIdx)
                                cols[colIdx] = { ...cols[colIdx], links }
                                setFooter({ ...footer, linkColumns: cols })
                              }}
                              className="h-7 w-7 text-red-500 hover:bg-red-500/10 shrink-0">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                        <Button type="button" variant="ghost" size="sm"
                          onClick={() => {
                            const cols = [...(footer.linkColumns || [])]
                            const links = [...(cols[colIdx].links || []), { title: '', href: '' }]
                            cols[colIdx] = { ...cols[colIdx], links }
                            setFooter({ ...footer, linkColumns: cols })
                          }}
                          className="h-7 text-xs text-primary gap-1">
                          <Plus className="h-3 w-3" /> Add Link
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Column */}
                <div className="flex items-end gap-3 mt-4 max-w-sm">
                  <div className="flex-1 space-y-1">
                    <Label className="text-xs">New Column Title</Label>
                    <Input
                      value={newFooterColTitle}
                      onChange={(e) => setNewFooterColTitle(e.target.value)}
                      placeholder="e.g. Resources"
                      className="bg-background h-9 text-sm"
                    />
                  </div>
                  <Button type="button" onClick={() => {
                    if (!newFooterColTitle.trim()) return
                    const cols = [...(footer.linkColumns || []), { title: newFooterColTitle.trim(), links: [] }]
                    setFooter({ ...footer, linkColumns: cols })
                    setNewFooterColTitle('')
                  }} className="h-9 gap-1.5 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shrink-0">
                    <Plus className="h-4 w-4" /> Add Column
                  </Button>
                </div>
              </div>

              {/* Footer Bottom Legal Links */}
              <div className="border-t border-border/30 pt-6">
                <h4 className="text-sm font-semibold text-foreground mb-1">Bottom Bar Links</h4>
                <p className="text-xs text-muted-foreground mb-4">Legal and utility links shown at the very bottom of the footer (e.g. Privacy Policy, Terms).</p>

                <div className="space-y-2 mb-4">
                  {(footer.bottomLinks || []).map((link: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input
                        value={link.title || ''}
                        onChange={(e) => {
                          const links = [...(footer.bottomLinks || [])]
                          links[idx] = { ...links[idx], title: e.target.value }
                          setFooter({ ...footer, bottomLinks: links })
                        }}
                        placeholder="Link title"
                        className="bg-muted/30 h-9 text-sm flex-1"
                      />
                      <Input
                        value={link.href || ''}
                        onChange={(e) => {
                          const links = [...(footer.bottomLinks || [])]
                          links[idx] = { ...links[idx], href: e.target.value }
                          setFooter({ ...footer, bottomLinks: links })
                        }}
                        placeholder="/privacy-policy"
                        className="bg-muted/30 h-9 text-sm flex-1"
                      />
                      <Button type="button" variant="ghost" size="icon"
                        onClick={() => {
                          const links = (footer.bottomLinks || []).filter((_: any, i: number) => i !== idx)
                          setFooter({ ...footer, bottomLinks: links })
                        }}
                        className="h-8 w-8 text-red-500 hover:bg-red-500/10 shrink-0">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex items-end gap-3 max-w-lg">
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <div className="space-y-1">
                      <Label className="text-xs">Title</Label>
                      <Input value={newBottomLinkTitle} onChange={(e) => setNewBottomLinkTitle(e.target.value)} placeholder="e.g. Sitemap" className="bg-background h-9 text-sm" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Href</Label>
                      <Input value={newBottomLinkHref} onChange={(e) => setNewBottomLinkHref(e.target.value)} placeholder="/sitemap" className="bg-background h-9 text-sm" />
                    </div>
                  </div>
                  <Button type="button" onClick={() => {
                    if (!newBottomLinkTitle.trim() || !newBottomLinkHref.trim()) return
                    const links = [...(footer.bottomLinks || []), { title: newBottomLinkTitle.trim(), href: newBottomLinkHref.trim() }]
                    setFooter({ ...footer, bottomLinks: links })
                    setNewBottomLinkTitle(''); setNewBottomLinkHref('')
                  }} className="h-9 gap-1.5 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shrink-0">
                    <Plus className="h-4 w-4" /> Add
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/50 bg-muted/20 px-6 py-4 flex justify-end">
              <Button onClick={handleSaveFooter} disabled={savingFooter} className="gap-2 px-6 rounded-lg">
                {savingFooter && <Loader2 className="h-4 w-4 animate-spin" />}
                Save Footer Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* CTA TAB CONTENT */}
        <TabsContent value="cta" className="mt-6">
          <Card className="border border-border/50 bg-background/50 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
              <CardTitle className="text-xl font-semibold">Global CTA Config</CardTitle>
              <CardDescription>
                Modify the global bottom CTA layout to drive lead collection and capture inquiries.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="ctaHeading">Heading Title</Label>
                <Input
                  id="ctaHeading"
                  value={cta.heading || ''}
                  onChange={(e) => setCta({ ...cta, heading: e.target.value })}
                  placeholder="How We Work at Grow"
                  className="bg-muted/30 font-semibold"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ctaDescription">Description Text</Label>
                <Textarea
                  id="ctaDescription"
                  value={cta.description || ''}
                  onChange={(e) => setCta({ ...cta, description: e.target.value })}
                  placeholder="Our process turns complex marketing data into clear insights that drive growth."
                  className="bg-muted/30 min-h-[80px]"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2 border-t border-border/30 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="ctaButtonText">Primary Button Label</Label>
                  <Input
                    id="ctaButtonText"
                    value={cta.buttonText || ''}
                    onChange={(e) => setCta({ ...cta, buttonText: e.target.value })}
                    placeholder="Get Started - Free"
                    className="bg-muted/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ctaButtonHref">Primary Button Route</Label>
                  <Input
                    id="ctaButtonHref"
                    value={cta.buttonHref || ''}
                    onChange={(e) => setCta({ ...cta, buttonHref: e.target.value })}
                    placeholder="/contact"
                    className="bg-muted/30"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ctaSecButtonText">Secondary Button Label (Optional)</Label>
                  <Input
                    id="ctaSecButtonText"
                    value={cta.secondaryButtonText || ''}
                    onChange={(e) => setCta({ ...cta, secondaryButtonText: e.target.value })}
                    placeholder="Book a Demo"
                    className="bg-muted/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ctaSecButtonHref">Secondary Button Route (Optional)</Label>
                  <Input
                    id="ctaSecButtonHref"
                    value={cta.secondaryButtonHref || ''}
                    onChange={(e) => setCta({ ...cta, secondaryButtonHref: e.target.value })}
                    placeholder="/contact?intent=demo"
                    className="bg-muted/30"
                  />
                </div>
              </div>

              <div className="border-t border-border/30 pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showServiceTags" className="font-medium">Show Service Badges</Label>
                    <p className="text-xs text-muted-foreground">Toggle visibility of the service tags below the CTA button</p>
                  </div>
                  <input
                    type="checkbox"
                    id="showServiceTags"
                    checked={!!cta.showServiceTags}
                    onChange={(e) => setCta({ ...cta, showServiceTags: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/30"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Service Badges / Tags List</Label>
                  <div className="flex flex-wrap gap-2 p-3 bg-muted/20 border border-border/50 rounded-xl min-h-[50px]">
                    {(cta.services || []).map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full border border-primary/20"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeServiceTag(tag)}
                          className="hover:bg-primary/20 text-primary rounded-full p-0.5 shrink-0 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                    {(cta.services || []).length === 0 && (
                      <span className="text-xs text-muted-foreground italic my-auto">No services added yet.</span>
                    )}
                  </div>
                  
                  <div className="flex gap-2 max-w-sm">
                    <Input
                      value={newServiceTag}
                      onChange={(e) => setNewServiceTag(e.target.value)}
                      placeholder="Add custom service tag..."
                      className="bg-muted/30 shrink"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addServiceTag()
                        }
                      }}
                    />
                    <Button type="button" onClick={addServiceTag} variant="secondary" className="gap-1 shrink-0 rounded-lg">
                      <Plus className="h-4 w-4" /> Add
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/50 bg-muted/20 px-6 py-4 flex justify-end">
              <Button onClick={handleSaveCta} disabled={savingCta} className="gap-2 px-6 rounded-lg">
                {savingCta && <Loader2 className="h-4 w-4 animate-spin" />}
                Save CTA Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* SEO TAB CONTENT */}
        <TabsContent value="seo" className="mt-6">
          <Card className="border border-border/50 bg-background/50 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" /> Global SEO Settings
              </CardTitle>
              <CardDescription>
                Control site-wide SEO meta tags, Open Graph tags, Twitter cards, robots directives, keywords, and search engine verification codes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Basic SEO */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="seoSiteTitle">Site Title</Label>
                  <Input
                    id="seoSiteTitle"
                    value={seo.siteTitle || ''}
                    onChange={(e) => setSeo({ ...seo, siteTitle: e.target.value })}
                    placeholder="Apargo"
                    className="bg-muted/30"
                  />
                  <p className="text-[10px] text-muted-foreground">Main brand title used across the site.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seoTitleTemplate">Title Template</Label>
                  <Input
                    id="seoTitleTemplate"
                    value={seo.titleTemplate || ''}
                    onChange={(e) => setSeo({ ...seo, titleTemplate: e.target.value })}
                    placeholder="%s | Apargo"
                    className="bg-muted/30"
                  />
                  <p className="text-[10px] text-muted-foreground">Use <code className="bg-muted px-1 rounded">%s</code> as the placeholder for the page-specific title.</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoDefaultDescription">Default Meta Description</Label>
                <Textarea
                  id="seoDefaultDescription"
                  value={seo.defaultDescription || ''}
                  onChange={(e) => setSeo({ ...seo, defaultDescription: e.target.value })}
                  placeholder="Apargo — Product engineering and AI services..."
                  className="bg-muted/30 min-h-[80px]"
                />
                <p className="text-[10px] text-muted-foreground">Shown in search engine results when no page-specific description is set.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoKeywords">Global Keywords</Label>
                <Textarea
                  id="seoKeywords"
                  value={seo.keywords || ''}
                  onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
                  placeholder="product engineering, AI services, custom software, SaaS..."
                  className="bg-muted/30 min-h-[60px]"
                />
                <p className="text-[10px] text-muted-foreground">Comma-separated keywords. While Google no longer weights this tag, Bing and others still consider it.</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="seoRobots">Robots Directive</Label>
                  <Input
                    id="seoRobots"
                    value={seo.robots || ''}
                    onChange={(e) => setSeo({ ...seo, robots: e.target.value })}
                    placeholder="index, follow"
                    className="bg-muted/30"
                  />
                  <p className="text-[10px] text-muted-foreground">Controls how search engines crawl and index your site (e.g. <code className="bg-muted px-1 rounded">index, follow</code>).</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seoCanonicalBase">Canonical Base URL</Label>
                  <Input
                    id="seoCanonicalBase"
                    value={seo.canonicalBase || ''}
                    onChange={(e) => setSeo({ ...seo, canonicalBase: e.target.value })}
                    placeholder="https://apargo.com"
                    className="bg-muted/30"
                  />
                  <p className="text-[10px] text-muted-foreground">The primary domain used to generate canonical URLs and prevent duplicate indexing.</p>
                </div>
              </div>

              {/* Open Graph */}
              <div className="border-t border-border/30 pt-6">
                <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-500" /> Open Graph (OG) Tags
                </h4>
                <p className="text-xs text-muted-foreground mb-4">Controls how your site appears when shared on Facebook, LinkedIn, WhatsApp, etc.</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="seoOgSiteName">OG Site Name</Label>
                    <Input id="seoOgSiteName" value={seo.ogSiteName || ''} onChange={(e) => setSeo({ ...seo, ogSiteName: e.target.value })} placeholder="Apargo" className="bg-muted/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seoOgType">OG Type</Label>
                    <Input id="seoOgType" value={seo.ogType || ''} onChange={(e) => setSeo({ ...seo, ogType: e.target.value })} placeholder="website" className="bg-muted/30" />
                    <p className="text-[10px] text-muted-foreground">Usually <code className="bg-muted px-1 rounded">website</code> for the homepage, <code className="bg-muted px-1 rounded">article</code> for blog posts.</p>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="seoOgImage" className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-muted-foreground" /> Default OG Image URL
                  </Label>
                  <Input id="seoOgImage" value={seo.ogImage || ''} onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })} placeholder="/og-image.png" className="bg-muted/30" />
                  <p className="text-[10px] text-muted-foreground">Recommended 1200×630px. Used as the share preview image across social platforms.</p>
                </div>
              </div>

              {/* Twitter Card */}
              <div className="border-t border-border/30 pt-6">
                <h4 className="text-sm font-semibold text-foreground mb-1">Twitter / X Card Tags</h4>
                <p className="text-xs text-muted-foreground mb-4">Controls how your site appears in tweets and X card previews.</p>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="seoTwitterCard">Card Type</Label>
                    <Input id="seoTwitterCard" value={seo.twitterCard || ''} onChange={(e) => setSeo({ ...seo, twitterCard: e.target.value })} placeholder="summary_large_image" className="bg-muted/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seoTwitterSite">@Site Handle</Label>
                    <Input id="seoTwitterSite" value={seo.twitterSite || ''} onChange={(e) => setSeo({ ...seo, twitterSite: e.target.value })} placeholder="@apargo" className="bg-muted/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seoTwitterCreator">@Creator Handle</Label>
                    <Input id="seoTwitterCreator" value={seo.twitterCreator || ''} onChange={(e) => setSeo({ ...seo, twitterCreator: e.target.value })} placeholder="@founder" className="bg-muted/30" />
                  </div>
                </div>
              </div>

              {/* Verification Codes */}
              <div className="border-t border-border/30 pt-6">
                <h4 className="text-sm font-semibold text-foreground mb-1">Search Engine Verification</h4>
                <p className="text-xs text-muted-foreground mb-4">Paste verification codes from Google Search Console and Bing Webmaster Tools.</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="seoGoogleVerification">Google Verification Code</Label>
                    <Input id="seoGoogleVerification" value={seo.googleVerification || ''} onChange={(e) => setSeo({ ...seo, googleVerification: e.target.value })} placeholder="Paste verification string" className="bg-muted/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seoBingVerification">Bing Verification Code</Label>
                    <Input id="seoBingVerification" value={seo.bingVerification || ''} onChange={(e) => setSeo({ ...seo, bingVerification: e.target.value })} placeholder="Paste verification string" className="bg-muted/30" />
                  </div>
                </div>
              </div>

              {/* Additional Meta Tags */}
              <div className="border-t border-border/30 pt-6">
                <h4 className="text-sm font-semibold text-foreground mb-1">Additional Custom Meta Tags</h4>
                <p className="text-xs text-muted-foreground mb-4">Add extra meta tags that will be injected into the page head (e.g. author, theme-color, etc.).</p>

                <div className="space-y-2 mb-4">
                  {(seo.additionalMetaTags || []).map((tag: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input
                        value={tag.name || ''}
                        onChange={(e) => {
                          const tags = [...(seo.additionalMetaTags || [])]
                          tags[idx] = { ...tags[idx], name: e.target.value }
                          setSeo({ ...seo, additionalMetaTags: tags })
                        }}
                        placeholder="name (e.g. author)"
                        className="bg-muted/30 h-9 text-sm flex-1"
                      />
                      <Input
                        value={tag.content || ''}
                        onChange={(e) => {
                          const tags = [...(seo.additionalMetaTags || [])]
                          tags[idx] = { ...tags[idx], content: e.target.value }
                          setSeo({ ...seo, additionalMetaTags: tags })
                        }}
                        placeholder="content (e.g. Apargo Team)"
                        className="bg-muted/30 h-9 text-sm flex-1"
                      />
                      <Button type="button" variant="ghost" size="icon"
                        onClick={() => {
                          const tags = (seo.additionalMetaTags || []).filter((_: any, i: number) => i !== idx)
                          setSeo({ ...seo, additionalMetaTags: tags })
                        }}
                        className="h-8 w-8 text-red-500 hover:bg-red-500/10 shrink-0">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex items-end gap-3 max-w-lg">
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <div className="space-y-1">
                      <Label className="text-xs">Meta Name</Label>
                      <Input value={newMetaName} onChange={(e) => setNewMetaName(e.target.value)} placeholder="e.g. author" className="bg-background h-9 text-sm" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Meta Content</Label>
                      <Input value={newMetaContent} onChange={(e) => setNewMetaContent(e.target.value)} placeholder="e.g. Apargo Team" className="bg-background h-9 text-sm" />
                    </div>
                  </div>
                  <Button type="button" onClick={() => {
                    if (!newMetaName.trim() || !newMetaContent.trim()) return
                    const tags = [...(seo.additionalMetaTags || []), { name: newMetaName.trim(), content: newMetaContent.trim() }]
                    setSeo({ ...seo, additionalMetaTags: tags })
                    setNewMetaName(''); setNewMetaContent('')
                  }} className="h-9 gap-1.5 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shrink-0">
                    <Plus className="h-4 w-4" /> Add
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/50 bg-muted/20 px-6 py-4 flex justify-end">
              <Button onClick={handleSaveSeo} disabled={savingSeo} className="gap-2 px-6 rounded-lg">
                {savingSeo && <Loader2 className="h-4 w-4 animate-spin" />}
                Save SEO Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
