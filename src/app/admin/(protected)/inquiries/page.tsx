import { createClient } from '@/utils/supabase/server'
import InquiriesTable from './inquiries-table'

export default async function InquiriesPage() {
  const supabase = await createClient()

  // Fetch inquiries from Supabase
  const { data: inquiries, error } = await supabase
    .from('contact_inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="rounded-md bg-destructive/15 p-4 text-sm text-destructive">
        Error loading inquiries: {error.message}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Contact Inquiries</h2>
        <p className="text-muted-foreground">
          View and manage messages sent from the website contact form.
        </p>
      </div>

      <InquiriesTable inquiries={inquiries || []} />
    </div>
  )
}
