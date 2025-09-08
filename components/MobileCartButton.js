import Link from "next/link";

export default function MobileCartButton({ count = 0 }) {
  return (
    <div className="md:hidden fixed bottom-6 right-4 z-50">
      <Link href="/order" className="flex items-center gap-3 px-4 py-2 rounded-full shadow-lg" style={{ background: "#689f38", color: "white" }}>
        <span className="font-semibold">Cart</span>
        <span className="bg-white text-green-700 rounded-full px-2 py-0.5 text-sm font-bold">{count}</span>
      </Link>
    </div>
  );
}
