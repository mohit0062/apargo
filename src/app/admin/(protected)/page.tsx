import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, Users, FileText, ShieldX } from 'lucide-react'

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const supabase = await createClient()
  const params = await searchParams
  const showUnauthorized = params?.unauthorized === '1'

  // Fetch quick stats
  const { count: inquiryCount } = await supabase
    .from('contact_inquiries')
    .select('*', { count: 'exact', head: true })

  const { count: blogCount } = await supabase
    .from('blogs')
    .select('*', { count: 'exact', head: true })

  return (
    <div className="space-y-6">
      {/* Unauthorized Alert Banner */}
      {showUnauthorized && (
        <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-red-600">
          <ShieldX className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold">Access Denied</p>
            <p className="text-xs text-red-500/80 mt-0.5">
              You don't have permission to access that page. Contact a Super Admin to update your role.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inquiryCount || 0}</div>
            <p className="text-xs text-muted-foreground">From contact form</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Blogs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogCount || 0}</div>
            <p className="text-xs text-muted-foreground">Managed via Supabase CMS</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Admin accounts</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
