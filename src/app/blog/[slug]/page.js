import Image from "next/image";
import Link from "next/link";
import contentfulClient from "@/lib/contentful";
import RichText from "@/lib/RichText";

export async function generateStaticParams() {
  const entries = await contentfulClient.getEntries({
    content_type: "blog",
  });
  const blogs = entries.items;
  return blogs.map((blog) => ({ slug: blog.fields.slug }));
}

export default async function BlogPage({ params }) {
  const entries = await contentfulClient.getEntries({
    content_type: "blog",
    "fields.slug": params.slug,
  });

  const { title, slug, body } = entries.items[0].fields;

  return (
    <main className="container mx-auto p-4 mt-8">
      <article className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <div className="mb-4 text-gray-600">
          Published on <time dateTime="2023-10-01">October 1, 2023</time>
        </div>
        <Image
          src=""
          alt="Vercel Logo"
          className="w-full h-auto mb-8 rounded"
          priority
        />
        <div>
          <RichText document={body} />
        </div>
      </article>
    </main>
  );
}
