import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import AdminSidebar from './admin-sidebar'
import { canAccess } from '@/utils/roles'

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  // Read role from user_metadata (set via Supabase dashboard)
  const userRole: string = user.user_metadata?.role || 'admin'

  // Fetch role permissions from database
  let permissions: any[] = []
  try {
    const { data } = await supabase.from('role_permissions').select('*')
    if (data) permissions = data
  } catch (err) {
    console.error('Error fetching role permissions in layout:', err)
  }

  const roleConfig = permissions.find(p => p.role === userRole)
  const allowedPaths = roleConfig ? roleConfig.allowed_paths : []

  // Server-side path guard — get current request path
  const headersList = await headers()
  const requestPath = headersList.get('x-next-path') || headersList.get('x-pathname') || ''

  // Only check non-root admin paths
  if (requestPath && requestPath !== '/admin' && !canAccess(userRole, requestPath, permissions)) {
    redirect('/admin?unauthorized=1')
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      <AdminSidebar 
        userEmail={user.email || ''} 
        userRole={userRole} 
        allowedPaths={allowedPaths} 
      />

      {/* Main Content */}
      <main className="flex flex-1 flex-col sm:pl-64">
        {/* Top header */}
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <h1 className="text-lg font-semibold md:text-xl">Admin Panel</h1>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email || ''}</span>
          </div>
        </header>

        <div className="flex-1 p-4 lg:p-6">{children}</div>
      </main>
    </div>
  )
}
