import Image from "next/image";
import Link from "next/link";
import contentfulClient from "../lib/contentful";
import { DateDot } from "./_utils/date-time-format";

export default async function Home() {
  const entries = await contentfulClient.getEntries({
    content_type: "blog",
  });
  const blogs = entries.items;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl text-center font-bold my-6">トップページ</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => {
          return (
            <article key={blog.sys.id} className="bg-white p-4 rounded shadow">
              <Link href={`/blog/${blog.fields.slug}`}>
                <Image
                  src={blog.fields.featuredImage[0].secure_url}
                  alt={blog.fields.title}
                  fill
                  className="!relative w-full !h-auto"
                />
              </Link>
              <h2 className="text-xl text-center font-bold my-4">
                <Link href={`/blog/${blog.fields.slug}`}>
                  {blog.fields.title}
                </Link>
              </h2>
              <div className="text-sm text-gray-500 text-left">
                <time dateTime={blog.fields.publishedAt}>
                  {DateDot(blog.fields.publishedAt)}
                </time>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
