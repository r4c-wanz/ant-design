import Link from "next/link";

export default function About() {
  return (
    <nav className="p-6 flex items-center shadow-sm gap-6">
      <Link href={"#"} className="font-bold text-2xl">
        Management
      </Link>
      <div className="flex gap-3 font-semibold">
        <Link href={"/"}>Home</Link>
      </div>
    </nav>
  );
}
