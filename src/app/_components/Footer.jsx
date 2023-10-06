import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        © {new Date().getFullYear()} {process.env.SITE_NAME}
      </div>
    </footer>
  );
}
