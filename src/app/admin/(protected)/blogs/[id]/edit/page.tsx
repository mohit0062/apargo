import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import BlogForm from '../../blog-form'
import { updateBlog } from '../../actions'

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const { id } = resolvedParams

  const supabase = await createClient()

  // Fetch current blog content
  const { data: blog, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !blog) {
    notFound()
  }

  // Pre-bind the id so the update action knows which record to update
  const updateBlogWithId = updateBlog.bind(null, id)

  return (
    <BlogForm
      title="Edit Article"
      description={`Make adjustments to: "${blog.title}"`}
      initialData={{
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        description: blog.description || '',
        content: blog.content || '',
        author: blog.author || '',
        author_role: blog.author_role || '',
        author_avatar: blog.author_avatar || '',
        category: blog.category || '',
        read_time: blog.read_time || '',
        image_url: blog.image_url || '',
        status: blog.status || 'published',
        meta_title: blog.meta_title || '',
        meta_description: blog.meta_description || '',
        focus_keyword: blog.focus_keyword || '',
        seo_score: blog.seo_score || 0,
        tags: blog.tags || [],
        categories: blog.categories || [],
      }}
      onSubmitAction={updateBlogWithId}
    />
  )
}
