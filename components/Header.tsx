import Link from "next/link";

export default function Header() {
  return (
    <header className="p-4 bg-gray-100 text-center">
      <Link href="/" className="text-4xl font-semibold">
        CS392 Attendance App
      </Link>
    </header>
  );
}