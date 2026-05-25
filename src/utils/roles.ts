/**
 * Role-based access control utilities for the Apargo Admin Panel.
 *
 * Roles (in order of privilege):
 *   super_admin  - Full access to everything including user/role management
 *   admin        - Full CMS access, no user management
 *   editor       - Limited to Blogs, Testimonials, and Inquiries only
 */

export type AdminRole = 'super_admin' | 'admin' | 'editor'

/** What each nav item requires — list of allowed roles */
export const NAV_PERMISSIONS: Record<string, AdminRole[]> = {
  '/admin':               ['super_admin', 'admin', 'editor'],
  '/admin/inquiries':     ['super_admin', 'admin', 'editor'],
  '/admin/blogs':         ['super_admin', 'admin', 'editor'],
  '/admin/testimonials':  ['super_admin', 'admin', 'editor'],
  '/admin/homepage':      ['super_admin', 'admin'],
  '/admin/about':         ['super_admin', 'admin'],
  '/admin/services':      ['super_admin', 'admin'],
  '/admin/industries':    ['super_admin', 'admin'],
  '/admin/technologies':  ['super_admin', 'admin'],
  '/admin/faq':           ['super_admin', 'admin'],
  '/admin/careers':       ['super_admin', 'admin'],
  '/admin/contact':       ['super_admin', 'admin'],
  '/admin/products':      ['super_admin', 'admin'],
  '/admin/products/ai-greentick': ['super_admin', 'admin'],
  '/admin/common-sections': ['super_admin'],
  '/admin/settings':      ['super_admin'],
}

/** Check if a role can access a specific admin path */
export function canAccess(
  role: string,
  path: string,
  dynamicPermissions?: { role: string; allowed_paths: string[] }[]
): boolean {
  // Normalize: strip trailing slash
  const normalized = path.endsWith('/') ? path.slice(0, -1) : path

  // Failsafe: Super Admin must always have access to dashboard and settings
  if (role === 'super_admin') {
    if (normalized === '/admin' || normalized === '/admin/settings' || normalized.startsWith('/admin/settings/')) {
      return true
    }
  }

  // If dynamic permissions are passed, search within them
  if (dynamicPermissions && dynamicPermissions.length > 0) {
    const roleConfig = dynamicPermissions.find(p => p.role === role)
    if (roleConfig) {
      const matchingKey = roleConfig.allowed_paths
        .sort((a, b) => b.length - a.length) // longest match first
        .find(key => normalized === key || normalized.startsWith(key + '/'))
      return !!matchingKey
    }
  }

  // Find the matching permission entry
  const matchingKey = Object.keys(NAV_PERMISSIONS)
    .sort((a, b) => b.length - a.length) // longest match first
    .find(key => normalized === key || normalized.startsWith(key + '/'))

  if (!matchingKey) return false
  return (NAV_PERMISSIONS[matchingKey] as string[]).includes(role)
}

/** Get human-readable role label */
export function getRoleLabel(role: string): string {
  switch (role) {
    case 'super_admin': return 'Super Admin'
    case 'admin':       return 'Admin'
    case 'editor':      return 'Editor'
    default:            return 'Unknown'
  }
}

/** Get role badge color classes */
export function getRoleBadgeClasses(role: string): string {
  switch (role) {
    case 'super_admin': return 'bg-green-500/10 text-green-600 border border-green-500/20'
    case 'admin':       return 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
    case 'editor':      return 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
    default:            return 'bg-muted text-muted-foreground border'
  }
}
