// components/Header.js
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/logo.png"; // ensure this exists

const BRAND = {
  name: "Good Morning Kitchen",
  tagline: "Stone-ground. Fresh. Naturally Fermented.",
  primaryHex: "#689f38",
};

export default function Header({ cartCount = 0 }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo + Brand (text vertically centered) */}
        <Link href="/" className="flex items-center gap-4">
          <Image
            src={Logo}
            alt="Good Morning Kitchen Logo"
            width={90}
            height={90}
            className="rounded-lg"
            priority
          />

          {/* center the text vertically relative to the logo */}
          <div className="flex flex-col justify-center">
            <div className="font-extrabold text-xl text-slate-800">{BRAND.name}</div>
            <div className="text-sm text-slate-600 mt-2">{BRAND.tagline}</div>
          </div>
        </Link>

        {/* Right: Navigation */}
        <nav className="hidden md:flex gap-8 text-base font-medium text-slate-700">
          <a href="#products" className="hover:text-green-700">Products</a>
          <a href="#why" className="hover:text-green-700">Why Us</a>
          <a href="#faq" className="hover:text-green-700">FAQ</a>
          <a href="#contact" className="hover:text-green-700">Contact</a>

          <Link
            href="/order"
            className="relative px-4 py-2 border rounded-lg hover:bg-green-50 flex items-center gap-2"
            style={{ borderColor: BRAND.primaryHex }}
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
