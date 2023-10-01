import Image from "next/image";
import Link from "next/link";
import contentfulClient from "../lib/contentful";

export default async function Home() {
  const entries = await contentfulClient.getEntries({
    content_type: "blog",
  });
  const blogs = entries.items;

  return (
    <main className="container mx-auto p-4">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((blog) => {
          return (
            <article
              key={blog.sys.id}
              className="bg-white p-4 rounded shadow hover:bg-gray-50 transition-colors duration-200"
            >
              <img
                src="/path-to-thumbnail.jpg"
                alt="Description of Image for Article"
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-bold mb-2">
                <Link
                  href={`/blog/${blog.fields.slug}`}
                  className="text-blue-600 hover:underline mt-2 block"
                >
                  {blog.fields.title}
                </Link>
              </h2>
              <p className="text-gray-700">
                Intro or snippet of the article...
              </p>
              <Link
                href={`/blog/${blog.fields.slug}`}
                className="text-blue-600 hover:underline mt-2 block"
              >
                詳しく読む
              </Link>
            </article>
          );
        })}
      </section>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </main>
  );
}
