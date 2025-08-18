import Link from "next/link";
import Image from "next/image";

export default function Navbar({count=0}){
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="GMK logo" width={36} height={36} className="rounded-lg" />
          <span className="font-semibold text-choco">Good Morning Kitchen</span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm text-choco/80">
          <a href="#products">Products</a>
          <a href="#why">Why Us</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
          <Link href="/order" className="px-3 py-1.5 rounded-lg border border-brand text-brand font-semibold">Cart ({count})</Link>
        </nav>
      </div>
    </header>
  );
}
