'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Update the allowed paths for a specific role.
 * Only callable by users who are super_admin.
 */
export async function updateRolePermissionsAction(role: string, allowedPaths: string[]) {
  try {
    const supabase = await createClient()

    // 1. Authenticate user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { error: 'Unauthorized: Admin authentication required.' }
    }

    // 2. Authorize user (must be super_admin)
    const userRole = user.user_metadata?.role || 'admin'
    if (userRole !== 'super_admin') {
      return { error: 'Access Denied: Only Super Admins can modify permissions.' }
    }

    // 3. Prevent locking Super Admin out of settings/dashboard
    if (role === 'super_admin') {
      if (!allowedPaths.includes('/admin/settings')) {
        allowedPaths.push('/admin/settings')
      }
      if (!allowedPaths.includes('/admin')) {
        allowedPaths.push('/admin')
      }
    }

    // 4. Update role_permissions table
    const { error } = await supabase
      .from('role_permissions')
      .upsert({ role, allowed_paths: allowedPaths }, { onConflict: 'role' })

    if (error) {
      console.error(`Error updating role permissions for [${role}]:`, error)
      return { error: `Database error: ${error.message}` }
    }

    revalidatePath('/admin/settings')
    return { success: true }
  } catch (err: any) {
    console.error('Server action updateRolePermissionsAction failed:', err)
    return { error: err.message || 'An unexpected error occurred.' }
  }
}

/**
 * Assign a role to a user.
 * Only callable by users who are super_admin.
 */
export async function updateUserRoleAction(userId: string, newRole: string) {
  try {
    const supabase = await createClient()

    // 1. Authenticate user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { error: 'Unauthorized: Admin authentication required.' }
    }

    // 2. Authorize user (must be super_admin)
    const userRole = user.user_metadata?.role || 'admin'
    if (userRole !== 'super_admin') {
      return { error: 'Access Denied: Only Super Admins can assign user roles.' }
    }

    // 3. Call the RPC function we defined
    const { error } = await supabase.rpc('update_user_role', {
      target_user_id: userId,
      new_role: newRole,
    })

    if (error) {
      console.error(`Error updating role for user [${userId}] to [${newRole}]:`, error)
      return { error: `Database error: ${error.message}` }
    }

    revalidatePath('/admin/settings')
    return { success: true }
  } catch (err: any) {
    console.error('Server action updateUserRoleAction failed:', err)
    return { error: err.message || 'An unexpected error occurred.' }
  }
}

/**
 * Update a user's password.
 * Only callable by users who are super_admin.
 */
export async function updateUserPasswordAction(userId: string, newPassword: string) {
  try {
    const supabase = await createClient()

    // 1. Authenticate user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { error: 'Unauthorized: Admin authentication required.' }
    }

    // 2. Authorize user (must be super_admin)
    const userRole = user.user_metadata?.role || 'admin'
    if (userRole !== 'super_admin') {
      return { error: 'Access Denied: Only Super Admins can update passwords.' }
    }

    // 3. Call the RPC function we defined
    const { error } = await supabase.rpc('update_user_password', {
      target_user_id: userId,
      new_password: newPassword,
    })

    if (error) {
      console.error(`Error updating password for user [${userId}]:`, error)
      return { error: `Database error: ${error.message}` }
    }

    return { success: true }
  } catch (err: any) {
    console.error('Server action updateUserPasswordAction failed:', err)
    return { error: err.message || 'An unexpected error occurred.' }
  }
}

/**
 * Create a new admin user.
 * Only callable by users who are super_admin.
 */
export async function createAdminUserAction(email: string, password: string, role: string) {
  try {
    const supabase = await createClient()

    // 1. Authenticate user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { error: 'Unauthorized: Admin authentication required.' }
    }

    // 2. Authorize user (must be super_admin)
    const userRole = user.user_metadata?.role || 'admin'
    if (userRole !== 'super_admin') {
      return { error: 'Access Denied: Only Super Admins can create new users.' }
    }

    // 3. Call the RPC function
    const { data: newUserId, error } = await supabase.rpc('create_admin_user', {
      new_email: email,
      new_password: password,
      new_role: role,
    })

    if (error) {
      console.error(`Error creating user [${email}]:`, error)
      return { error: `Database error: ${error.message}` }
    }

    revalidatePath('/admin/settings')
    return { success: true, userId: newUserId }
  } catch (err: any) {
    console.error('Server action createAdminUserAction failed:', err)
    return { error: err.message || 'An unexpected error occurred.' }
  }
}

