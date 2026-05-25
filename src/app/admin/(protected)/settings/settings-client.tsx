'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Lock, Users, Info, Check, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getRoleBadgeClasses, getRoleLabel, AdminRole } from '@/utils/roles'
import { updateRolePermissionsAction, updateUserRoleAction, updateUserPasswordAction, createAdminUserAction } from './actions'

const ROLES: { role: AdminRole; label: string; color: string; description: string }[] = [
  {
    role: 'super_admin',
    label: 'Super Admin',
    color: 'text-green-600',
    description: 'Full access to all pages, CMS sections, system settings, and user management.',
  },
  {
    role: 'admin',
    label: 'Admin',
    color: 'text-amber-600',
    description: 'Full CMS access including all page editors. Cannot access Common Sections or Settings.',
  },
  {
    role: 'editor',
    label: 'Editor',
    color: 'text-blue-600',
    description: 'Limited to writing Blogs, managing Testimonials, and viewing Inquiries only.',
  },
]

const PAGE_LABELS: Record<string, string> = {
  '/admin':                 'Dashboard',
  '/admin/inquiries':       'Inquiries',
  '/admin/blogs':           'Blogs / CMS',
  '/admin/testimonials':    'Testimonials CMS',
  '/admin/homepage':        'Home Page CMS',
  '/admin/about':           'About Page CMS',
  '/admin/services':        'Services CMS',
  '/admin/industries':      'Industries CMS',
  '/admin/technologies':    'Technologies CMS',
  '/admin/faq':             'FAQ CMS',
  '/admin/careers':         'Careers CMS',
  '/admin/contact':         'Contact CMS',
  '/admin/products':        'Products CMS',
  '/admin/products/ai-greentick': 'AI Greentick CMS',
  '/admin/common-sections': 'Common Sections',
  '/admin/settings':        'Settings & Users',
}

const ALL_PAGES = Object.keys(PAGE_LABELS)

interface SettingsClientProps {
  initialPermissions: { role: string; allowed_paths: string[] }[]
  initialUsers: { id: string; email: string; role: string; created_at: string }[]
}

export default function SettingsClient({ initialPermissions, initialUsers }: SettingsClientProps) {
  const router = useRouter()

  // Set up default role paths if database doesn't have them yet
  const defaultPermissions = [
    {
      role: 'super_admin',
      allowed_paths: ['/admin', '/admin/inquiries', '/admin/blogs', '/admin/testimonials', '/admin/homepage', '/admin/about', '/admin/services', '/admin/industries', '/admin/technologies', '/admin/faq', '/admin/careers', '/admin/contact', '/admin/products', '/admin/products/ai-greentick', '/admin/common-sections', '/admin/settings'],
    },
    {
      role: 'admin',
      allowed_paths: ['/admin', '/admin/inquiries', '/admin/blogs', '/admin/testimonials', '/admin/homepage', '/admin/about', '/admin/services', '/admin/industries', '/admin/technologies', '/admin/faq', '/admin/careers', '/admin/contact', '/admin/products', '/admin/products/ai-greentick'],
    },
    {
      role: 'editor',
      allowed_paths: ['/admin', '/admin/inquiries', '/admin/blogs', '/admin/testimonials'],
    }
  ]

  const mergedPermissions = defaultPermissions.map(def => {
    const existing = initialPermissions.find(p => p.role === def.role)
    return existing ? { ...def, allowed_paths: existing.allowed_paths } : def
  })

  // Local States
  const [permissions, setPermissions] = useState(mergedPermissions)
  const [users, setUsers] = useState(initialUsers)
  
  const [isSavingPermissions, setIsSavingPermissions] = useState(false)
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // Password reset states
  const [editingPasswordUserId, setEditingPasswordUserId] = useState<string | null>(null)
  const [newPassword, setNewPassword] = useState('')
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

  // Create User States
  const [createEmail, setCreateEmail] = useState('')
  const [createPassword, setCreatePassword] = useState('')
  const [createRole, setCreateRole] = useState('editor')
  const [isCreatingUser, setIsCreatingUser] = useState(false)

  // Sync users state when initialUsers prop changes
  useEffect(() => {
    setUsers(initialUsers)
  }, [initialUsers])

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4000)
  }

  // Check if permissions state has changes compared to database prop
  const hasPermissionChanges = JSON.stringify(permissions) !== JSON.stringify(mergedPermissions)

  // Toggle permission checked state
  const handlePermissionToggle = (role: string, path: string) => {
    // Failsafe: Cannot lock super_admin out of dashboard or settings
    if (role === 'super_admin' && (path === '/admin' || path === '/admin/settings')) {
      return
    }

    setPermissions(prev => prev.map(p => {
      if (p.role === role) {
        const exists = p.allowed_paths.includes(path)
        const newPaths = exists 
          ? p.allowed_paths.filter(x => x !== path) 
          : [...p.allowed_paths, path]
        return { ...p, allowed_paths: newPaths }
      }
      return p
    }))
  }

  // Save modified role permissions matrix
  const handleSavePermissions = async () => {
    setIsSavingPermissions(true)
    let successCount = 0
    let lastError = ''

    for (const perm of permissions) {
      const initialPerm = mergedPermissions.find(p => p.role === perm.role)
      // Only call DB if permissions changed for this role
      if (!initialPerm || JSON.stringify(initialPerm.allowed_paths) !== JSON.stringify(perm.allowed_paths)) {
        const res = await updateRolePermissionsAction(perm.role, perm.allowed_paths)
        if (res.error) {
          lastError = res.error
        } else {
          successCount++
        }
      }
    }

    setIsSavingPermissions(false)

    if (lastError) {
      showNotification(`Saved partial changes. Error: ${lastError}`, 'error')
    } else {
      showNotification('Role permissions matrix saved successfully!')
      router.refresh()
    }
  }

  // Assign user roles
  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdatingUserId(userId)
    const result = await updateUserRoleAction(userId, newRole)
    setUpdatingUserId(null)

    if (result.error) {
      showNotification(result.error, 'error')
    } else {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u))
      showNotification('User role updated successfully!')
      router.refresh()
    }
  }

  // Update user password
  const handleUpdatePassword = async (userId: string) => {
    if (newPassword.length < 6) {
      showNotification('Password must be at least 6 characters long.', 'error')
      return
    }
    setIsUpdatingPassword(true)
    const result = await updateUserPasswordAction(userId, newPassword)
    setIsUpdatingPassword(false)

    if (result.error) {
      showNotification(result.error, 'error')
    } else {
      showNotification('User password updated successfully!')
      setEditingPasswordUserId(null)
      setNewPassword('')
    }
  }

  // Create New User
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (createPassword.length < 6) {
      showNotification('Password must be at least 6 characters long.', 'error')
      return
    }
    setIsCreatingUser(true)
    const result = await createAdminUserAction(createEmail, createPassword, createRole)
    setIsCreatingUser(false)

    if (result.error) {
      showNotification(result.error, 'error')
    } else {
      showNotification('User created successfully!')
      // Optimistically append new user to the list
      const newUserObj = {
        id: result.userId || Math.random().toString(),
        email: createEmail,
        role: createRole,
        created_at: new Date().toISOString()
      }
      setUsers(prev => [...prev, newUserObj])
      // Reset form fields
      setCreateEmail('')
      setCreatePassword('')
      setCreateRole('editor')
      router.refresh()
    }
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b pb-5">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Settings & User Roles</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Manage dynamic page-level access permissions and assign roles to your team members.
        </p>
      </div>

      {/* User Directory Section */}
      <Card className="border shadow-none">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Assign Roles
          </CardTitle>
          <CardDescription>
            Modify CMS access permissions for registered admin panel users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">User Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground w-40">Role</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground w-56">Actions / Password</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground w-40">Created At</th>
                  <th className="text-right px-4 py-3 font-semibold text-muted-foreground w-20">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user.id} className={cn('border-b last:border-0', idx % 2 === 0 ? 'bg-background' : 'bg-muted/20')}>
                    <td className="px-4 py-3 font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs select-none">
                          {user.email ? user.email.charAt(0).toUpperCase() : '?'}
                        </div>
                        {user.email}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <select
                          value={user.role}
                          disabled={updatingUserId === user.id}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className="bg-background border border-input rounded-md px-2 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="super_admin">Super Admin</option>
                          <option value="admin">Admin</option>
                          <option value="editor">Editor</option>
                        </select>
                        {updatingUserId === user.id && (
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {editingPasswordUserId === user.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="password"
                            placeholder="Min 6 chars"
                            value={newPassword}
                            disabled={isUpdatingPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="flex h-8 w-32 rounded-md border border-input bg-background px-2 py-1 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          />
                          <button
                            disabled={isUpdatingPassword || newPassword.length < 6}
                            onClick={() => handleUpdatePassword(user.id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-green-600 hover:bg-green-700 text-white shadow transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Save password"
                          >
                            {isUpdatingPassword ? (
                              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            ) : (
                              <Check className="h-3.5 w-3.5" />
                            )}
                          </button>
                          <button
                            disabled={isUpdatingPassword}
                            onClick={() => {
                              setEditingPasswordUserId(null)
                              setNewPassword('')
                            }}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
                            title="Cancel"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingPasswordUserId(user.id)
                            setNewPassword('')
                          }}
                          className="inline-flex items-center justify-center rounded-md text-xs font-semibold h-8 border border-input bg-background hover:bg-muted text-muted-foreground px-3.5 py-1.5 transition-colors cursor-pointer"
                        >
                          Change Password
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(user.created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold bg-green-500/10 text-green-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600 animate-pulse" />
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add New User Form */}
          <div className="mt-6 pt-6 border-t">
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
              <Users className="h-4 w-4 text-primary" />
              Create New Admin User
            </h4>
            <form onSubmit={handleCreateUser} className="grid gap-4 sm:grid-cols-4 items-end bg-muted/20 p-4 rounded-lg border border-dashed border-input">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@apargo.com"
                  value={createEmail}
                  onChange={(e) => setCreateEmail(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Initial Password</label>
                <input
                  type="password"
                  required
                  placeholder="Min 6 characters"
                  value={createPassword}
                  onChange={(e) => setCreatePassword(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Role</label>
                <select
                  value={createRole}
                  onChange={(e) => setCreateRole(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
                >
                  <option value="super_admin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isCreatingUser}
                  className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary text-primary-foreground font-semibold text-sm shadow hover:bg-primary/95 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreatingUser ? (
                    <>
                      Creating...
                      <span className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    </>
                  ) : (
                    'Create User'
                  )}
                </button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>

      {/* Role Matrix */}
      <Card className="border shadow-none">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Role Permissions Matrix
          </CardTitle>
          <CardDescription>
            Tick and untick checkmarks to grant or restrict access to CMS paths.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground w-48">Page / Section</th>
                  {ROLES.map((r) => (
                    <th key={r.role} className="text-center px-4 py-3 font-semibold">
                      <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs', getRoleBadgeClasses(r.role))}>
                        <Shield className="h-3 w-3" />
                        {r.label}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ALL_PAGES.map((path, idx) => (
                  <tr key={path} className={cn('border-b last:border-0', idx % 2 === 0 ? 'bg-background' : 'bg-muted/20')}>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {PAGE_LABELS[path] || path}
                    </td>
                    {ROLES.map((r) => {
                      const roleConfig = permissions.find(p => p.role === r.role)
                      const allowed = roleConfig ? roleConfig.allowed_paths.includes(path) : false
                      const isRequired = r.role === 'super_admin' && (path === '/admin' || path === '/admin/settings')

                      return (
                        <td key={r.role} className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center">
                            <input
                              type="checkbox"
                              checked={allowed}
                              disabled={isRequired || isSavingPermissions}
                              onChange={() => handlePermissionToggle(r.role, path)}
                              className={cn(
                                "h-4.5 w-4.5 rounded border-input text-primary focus:ring-ring focus:ring-1 bg-background accent-primary transition-all cursor-pointer",
                                isRequired && "opacity-50 cursor-not-allowed"
                              )}
                              title={isRequired ? "Required for Super Admin" : "Toggle access"}
                            />
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSavePermissions}
              disabled={!hasPermissionChanges || isSavingPermissions}
              className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-semibold px-4 py-2 bg-primary text-primary-foreground shadow transition-colors hover:bg-primary/95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                isSavingPermissions && "relative pr-9"
              )}
            >
              {isSavingPermissions ? (
                <>
                  Saving...
                  <span className="absolute right-3 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                </>
              ) : (
                'Save Permissions Matrix'
              )}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Role Descriptions */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Role Overview Descriptions
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {ROLES.map((r) => {
            const roleConfig = permissions.find(p => p.role === r.role)
            const allowedPagesList = roleConfig ? roleConfig.allowed_paths : []

            return (
              <Card key={r.role} className="border shadow-none">
                <CardHeader className="pb-3">
                  <span className={cn('inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold w-fit', getRoleBadgeClasses(r.role))}>
                    <Shield className="h-3 w-3" />
                    {r.label}
                  </span>
                  <CardDescription className="mt-2 text-[13px] leading-relaxed">
                    {r.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Accessible pages ({allowedPagesList.length})</p>
                  <ul className="space-y-1">
                    {ALL_PAGES.map((p) => {
                      const hasAccess = allowedPagesList.includes(p)
                      if (!hasAccess) return null
                      return (
                        <li key={p} className="flex items-center gap-2 text-xs text-foreground/80">
                          <Check className="h-3 w-3 text-green-500 shrink-0" />
                          {PAGE_LABELS[p] || p}
                        </li>
                      )
                    })}
                    {allowedPagesList.length === 0 && (
                      <li className="text-xs text-muted-foreground italic flex items-center gap-2">
                        <Lock className="h-3 w-3 text-muted-foreground/50 shrink-0" />
                        No pages selected
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Floating Toast Notification */}
      {notification && (
        <div 
          className={cn(
            "fixed bottom-4 right-4 z-50 flex items-center gap-2.5 rounded-lg px-4 py-3 text-sm shadow-lg border animate-in slide-in-from-bottom-5 duration-300",
            notification.type === 'success' 
              ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-850/30 dark:text-emerald-300"
              : "bg-destructive/10 border-destructive/20 text-destructive"
          )}
        >
          {notification.type === 'success' ? (
            <Check className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
          )}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}
    </div>
  )
}
