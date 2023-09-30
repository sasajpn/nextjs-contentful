import Image from 'next/image'
import Link from 'next/link'
import contentfulClient from '@/lib/contentful'
import RichText from '@/lib/RichText'

export async function generateStaticParams() {
  const entries = await contentfulClient.getEntries({
		content_type: 'blog'
	})
  const blogs = entries.items
  return blogs.map((blog) => ({ slug: blog.fields.slug }))
}
  


export default async function BlogPage({ params }) {

const entries = await contentfulClient.getEntries({
		content_type: 'blog',
    'fields.slug': params.slug,
	})

  const blog = entries.items[0]

  return(
<main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div>
      <p>{blog.fields.title}</p>
      <RichText document={blog.fields.body} />
    </div>
  </main>
  )

  
}