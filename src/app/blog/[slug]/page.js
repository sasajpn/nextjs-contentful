import Image from "next/image";
import Link from "next/link";
import contentfulClient from "@/lib/contentful";
import RichText from "@/lib/RichText";
import styles from "@/app/blogContent.module.css";
import { DateDot } from "../../_utils/date-time-format";

export async function generateMetadata({ params }) {
  const entries = await contentfulClient.getEntries({
    content_type: "blog",
    "fields.slug": params.slug,
  });

  const {
    seoFields: {
      fields: { pageTitle, pageDescription, index, follow },
    },
  } = entries.items[0].fields;

  return {
    title: pageTitle,
    description: pageDescription,
    robots: {
      index: index,
      follow: follow,
    },
  };
}

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

  const { title, slug, body, featuredImage, publishedAt, updatedAt } =
    entries.items[0].fields;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    image: [featuredImage[0].secure_url],
    datePublished: publishedAt,
  };

  if (typeof updatedAt !== "undefined") {
    jsonLd.dateModified = updatedAt;
  }

  return (
    <main className="container mx-auto p-4 mt-8">
      <article className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <div className="flex items-center">
          <div className="mb-4 text-gray-600 mr-4">
            公開日：
            <time dateTime={publishedAt}>
              {DateDot(publishedAt)}
            </time>
          </div>
          {typeof updatedAt !== "undefined" && (
            <>
              <div className="mb-4 text-gray-600">
                更新日：
                <time dateTime={updatedAt}>
                  {DateDot(updatedAt)}
                </time>
              </div>
            </>
          )}
        </div>
        <Image
          src={featuredImage[0].secure_url}
          alt={title}
          fill
          className="!relative object-contain"
        />
        <div className={styles.blogContent}>
          <RichText document={body} />
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
