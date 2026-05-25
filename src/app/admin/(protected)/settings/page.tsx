import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { canAccess } from '@/utils/roles'
import SettingsClient from './settings-client'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const userRole: string = user.user_metadata?.role || 'admin'

  // Hard guard: only super_admin can access this page
  if (!canAccess(userRole, '/admin/settings')) {
    redirect('/admin?unauthorized=1')
  }

  // Fetch role permissions
  const { data: permissions } = await supabase
    .from('role_permissions')
    .select('*')

  // Fetch users via RPC
  const { data: users } = await supabase.rpc('get_users')

  return (
    <SettingsClient 
      initialPermissions={permissions || []} 
      initialUsers={users || []} 
    />
  )
}
