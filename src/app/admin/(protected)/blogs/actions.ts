'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function deleteBlog(id: string) {
  const supabase = await createClient()

  // Make sure user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Not authenticated')
  }

  // Fetch current status and slug
  const { data: currentBlog } = await supabase
    .from('blogs')
    .select('status, slug')
    .eq('id', id)
    .single()

  if (currentBlog?.status === 'trash') {
    // Delete permanently
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(`Failed to permanently delete blog: ${error.message}`)
    }
  } else {
    // Soft delete to Trash
    const { error } = await supabase
      .from('blogs')
      .update({ status: 'trash' })
      .eq('id', id)

    if (error) {
      throw new Error(`Failed to move blog to trash: ${error.message}`)
    }
  }

  revalidatePath('/admin/blogs')
  if (currentBlog?.slug) {
    revalidatePath(`/blog/${currentBlog.slug}`)
  }
  revalidatePath('/blog')
  revalidatePath('/')
}

export async function restoreBlog(id: string) {
  const supabase = await createClient()

  // Make sure user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Not authenticated')
  }

  const { error } = await supabase
    .from('blogs')
    .update({ status: 'draft' }) // Restore as draft
    .eq('id', id)

  if (error) {
    throw new Error(`Failed to restore blog: ${error.message}`)
  }

  revalidatePath('/admin/blogs')
  revalidatePath('/blog')
  revalidatePath('/')
}

export async function duplicateBlog(id: string) {
  const supabase = await createClient()

  // Make sure user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Not authenticated')
  }

  // Fetch target blog
  const { data: blog, error: fetchErr } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single()

  if (fetchErr || !blog) {
    throw new Error('Blog not found to duplicate')
  }

  // Generate unique slug
  const baseSlug = `${blog.slug}-copy`
  
  const { error: insertErr } = await supabase
    .from('blogs')
    .insert([{
      title: `${blog.title} (Copy)`,
      slug: baseSlug,
      description: blog.description,
      content: blog.content,
      author: blog.author,
      author_role: blog.author_role,
      author_avatar: blog.author_avatar,
      category: blog.category,
      read_time: blog.read_time,
      image_url: blog.image_url,
      status: 'draft', // Duplicate as draft
      meta_title: blog.meta_title ? `${blog.meta_title} (Copy)` : null,
      meta_description: blog.meta_description,
      focus_keyword: blog.focus_keyword,
      seo_score: blog.seo_score,
      tags: blog.tags || [],
      categories: blog.categories || [blog.category].filter(Boolean)
    }])

  if (insertErr) {
    throw new Error(`Failed to duplicate blog: ${insertErr.message}`)
  }

  revalidatePath('/admin/blogs')
  revalidatePath('/blog')
  revalidatePath('/')
}

export async function quickUpdateBlog(
  id: string,
  data: {
    title: string
    slug: string
    status: string
    category: string
    tags: string[]
  }
) {
  const supabase = await createClient()

  // Make sure user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Not authenticated')
  }

  const { error } = await supabase
    .from('blogs')
    .update({
      title: data.title,
      slug: data.slug,
      status: data.status,
      category: data.category,
      tags: data.tags
    })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/blogs')
  revalidatePath(`/blog/${data.slug}`)
  revalidatePath('/blog')
  revalidatePath('/')
  return { success: true }
}

export async function createBlog(formData: FormData) {
  const supabase = await createClient()

  // Make sure user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Not authenticated')
  }

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const content = formData.get('content') as string
  const author = formData.get('author') as string
  const author_role = formData.get('author_role') as string
  const author_avatar = formData.get('author_avatar') as string
  const category = formData.get('category') as string
  const read_time = formData.get('read_time') as string
  const image_url = formData.get('image_url') as string
  
  // New WordPress & SEO fields
  const status = (formData.get('status') as string) || 'published'
  const meta_title = formData.get('meta_title') as string
  const meta_description = formData.get('meta_description') as string
  const focus_keyword = formData.get('focus_keyword') as string
  const seo_score = parseInt((formData.get('seo_score') as string) || '0', 10)
  
  const tagsString = formData.get('tags') as string
  const tags = tagsString ? tagsString.split(',').map(t => t.trim()).filter(Boolean) : []
  
  const categoriesString = formData.get('categories') as string
  const categories = categoriesString ? categoriesString.split(',').map(c => c.trim()).filter(Boolean) : [category].filter(Boolean)

  const { error } = await supabase
    .from('blogs')
    .insert([{
      title,
      slug,
      description,
      content,
      author,
      author_role,
      author_avatar,
      category,
      read_time,
      image_url,
      status,
      meta_title: meta_title || null,
      meta_description: meta_description || null,
      focus_keyword: focus_keyword || null,
      seo_score,
      tags,
      categories
    }])

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/blogs')
  revalidatePath('/blog')
  revalidatePath('/')
  redirect('/admin/blogs')
}

export async function updateBlog(id: string, formData: FormData) {
  const supabase = await createClient()

  // Make sure user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Not authenticated')
  }

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const content = formData.get('content') as string
  const author = formData.get('author') as string
  const author_role = formData.get('author_role') as string
  const author_avatar = formData.get('author_avatar') as string
  const category = formData.get('category') as string
  const read_time = formData.get('read_time') as string
  const image_url = formData.get('image_url') as string
  
  // New WordPress & SEO fields
  const status = (formData.get('status') as string) || 'published'
  const meta_title = formData.get('meta_title') as string
  const meta_description = formData.get('meta_description') as string
  const focus_keyword = formData.get('focus_keyword') as string
  const seo_score = parseInt((formData.get('seo_score') as string) || '0', 10)
  
  const tagsString = formData.get('tags') as string
  const tags = tagsString ? tagsString.split(',').map(t => t.trim()).filter(Boolean) : []
  
  const categoriesString = formData.get('categories') as string
  const categories = categoriesString ? categoriesString.split(',').map(c => c.trim()).filter(Boolean) : [category].filter(Boolean)

  const { error } = await supabase
    .from('blogs')
    .update({
      title,
      slug,
      description,
      content,
      author,
      author_role,
      author_avatar,
      category,
      read_time,
      image_url,
      status,
      meta_title: meta_title || null,
      meta_description: meta_description || null,
      focus_keyword: focus_keyword || null,
      seo_score,
      tags,
      categories
    })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/blogs')
  revalidatePath(`/blog/${slug}`)
  revalidatePath('/blog')
  revalidatePath('/')
  redirect('/admin/blogs')
}

