import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-700 text-white p-4">
      <div className="container mx-auto">
        <div class="text-2xl font-bold">
          <Link href="/" className="mr-4">
            {process.env.SITE_NAME}
          </Link>
        </div>
        <nav className="mt-3">
          <Link href="/" className="mr-4">
            トップページ
          </Link>
        </nav>
      </div>
    </header>
  );
}
