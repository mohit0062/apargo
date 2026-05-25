import { createClient } from '@/utils/supabase/server'
import BlogsManagerClient from './blogs-manager-client'

export const revalidate = 0

export default async function AdminBlogsPage() {
  const supabase = await createClient()

  // Fetch all blogs (including draft & trash statuses) to let the client do tabs and counts
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="rounded-md bg-destructive/15 p-4 text-sm text-destructive border border-destructive/20 font-medium">
        Error loading blogs from Supabase: {error.message}
      </div>
    )
  }

  // Cast tags & categories arrays safely for TypeScript
  const safeBlogs = (blogs || []).map(blog => ({
    ...blog,
    tags: Array.isArray(blog.tags) ? blog.tags : [],
    categories: Array.isArray(blog.categories) ? blog.categories : []
  }))

  return <BlogsManagerClient initialBlogs={safeBlogs} />
}

