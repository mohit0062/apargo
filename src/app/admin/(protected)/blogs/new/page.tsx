import BlogForm from '../blog-form'
import { createBlog } from '../actions'

export default function NewBlogPage() {
  return (
    <BlogForm
      title="Write New Article"
      description="Publish a fresh piece of insight to your audience."
      onSubmitAction={createBlog}
    />
  )
}
