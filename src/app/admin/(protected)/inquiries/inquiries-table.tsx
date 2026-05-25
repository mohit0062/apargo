'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { MessageSquare, Calendar, User, Mail, Building, Globe, Phone, Coins, Info } from 'lucide-react'

interface Inquiry {
  id: string
  created_at: string
  name: string
  email: string
  company?: string
  country?: string
  help_type?: string
  budget?: string
  message?: string
  source?: string
}

export default function InquiriesTable({ inquiries }: { inquiries: Inquiry[] }) {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)

  return (
    <>
      <div className="rounded-md border bg-background overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Help Type</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No inquiries found.
                </TableCell>
              </TableRow>
            ) : (
              inquiries.map((inquiry) => (
                <TableRow key={inquiry.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                    {new Date(inquiry.created_at).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-foreground">{inquiry.name}</div>
                    <div className="text-xs text-muted-foreground">{inquiry.email}</div>
                  </TableCell>
                  <TableCell className="text-sm font-medium">{inquiry.company || '-'}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize bg-secondary/60 font-medium">
                      {inquiry.help_type?.replace('-', ' ') || 'General'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-foreground">{inquiry.budget || '-'}</TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={() => setSelectedInquiry(inquiry)}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      View Details
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Inquiry Detail Sheet */}
      <Sheet open={selectedInquiry !== null} onOpenChange={(open) => !open && setSelectedInquiry(null)}>
        {selectedInquiry && (
          <SheetContent className="w-full data-[side=right]:w-full sm:max-w-lg data-[side=right]:sm:max-w-md overflow-y-auto">
            <SheetHeader className="px-6 pb-4 border-b">
              <SheetTitle className="flex items-center gap-2 text-xl">
                <MessageSquare className="h-5 w-5 text-primary" />
                Inquiry Details
              </SheetTitle>
              <SheetDescription>
                Submitted on {new Date(selectedInquiry.created_at).toLocaleString()}
              </SheetDescription>
            </SheetHeader>

            <div className="px-6 py-6 space-y-6">
              {/* Contact Info Group */}
              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact Info</h4>
                <div className="grid gap-3.5">
                  <div className="flex items-start gap-3">
                    <User className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div>
                      <div className="text-sm font-semibold break-words">{selectedInquiry.name}</div>
                      <div className="text-xs text-muted-foreground">Full Name</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div>
                      <a href={`mailto:${selectedInquiry.email}`} className="text-sm font-semibold text-primary hover:underline break-all">
                        {selectedInquiry.email}
                      </a>
                      <div className="text-xs text-muted-foreground">Email Address</div>
                    </div>
                  </div>
                  {selectedInquiry.company && (
                    <div className="flex items-start gap-3">
                      <Building className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                      <div>
                        <div className="text-sm font-semibold break-words">{selectedInquiry.company}</div>
                        <div className="text-xs text-muted-foreground">Company Name</div>
                      </div>
                    </div>
                  )}
                  {selectedInquiry.country && (
                    <div className="flex items-start gap-3">
                      {selectedInquiry.country.includes('+') || /\d/.test(selectedInquiry.country) ? (
                        <>
                          <Phone className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                          <div>
                            <div className="text-sm font-semibold break-words">{selectedInquiry.country}</div>
                            <div className="text-xs text-muted-foreground">Phone Number</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <Globe className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                          <div>
                            <div className="text-sm font-semibold break-words">{selectedInquiry.country}</div>
                            <div className="text-xs text-muted-foreground">Country / Region</div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Requirement Group */}
              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Requirements</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-lg border bg-muted/20 p-3 space-y-1">
                    <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">Help Type</span>
                    <Badge variant="secondary" className="capitalize text-xs font-medium">
                      {selectedInquiry.help_type?.replace('-', ' ') || 'General'}
                    </Badge>
                  </div>
                  <div className="rounded-lg border bg-muted/20 p-3 space-y-1">
                    <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">Budget Range</span>
                    <span className="text-sm font-semibold">{selectedInquiry.budget || 'Not specified'}</span>
                  </div>
                </div>
              </div>

              {/* Message Group */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Message Outline</h4>
                <Card className="shadow-none bg-muted/30 border border-dashed">
                  <CardContent className="p-4 text-sm leading-relaxed whitespace-pre-wrap text-foreground font-sans">
                    {selectedInquiry.message || <em className="text-muted-foreground">No message outline provided.</em>}
                  </CardContent>
                </Card>
              </div>

              {/* Additional Meta Group */}
              {selectedInquiry.source && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground border-t pt-4">
                  <Info className="h-3.5 w-3.5 shrink-0" />
                  <span>Referrer Source: <strong>{selectedInquiry.source}</strong></span>
                </div>
              )}
            </div>
          </SheetContent>
        )}
      </Sheet>
    </>
  )
}
