// components/ProductCard.js
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ p, onAdd }) {
  return (
    <article className="bg-white rounded-2xl border p-6 shadow-sm">
      <div className="flex items-start gap-6">
        {/* optional thumbnail if you add one later */}
        <div className="w-24 h-24 rounded-md overflow-hidden bg-slate-50 flex-shrink-0">
          {/* placeholder: replace with real image if available */}
          <div className="w-full h-full flex items-center justify-center text-slate-300">Img</div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-choco">{p.size} {p.name}</h3>
          <ul className="mt-2 text-sm text-slate-600 list-disc pl-5">
            {p.usp?.map((u, i) => <li key={i}>{u}</li>)}
          </ul>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="line-through text-slate-400 text-xs">₹{p.mrp}</div>
              <div className="text-xl font-bold text-choco">₹{p.launchPrice}</div>
            </div>

            <div className="flex gap-3 items-center">
              <button
                onClick={() => onAdd(p)}
                className="px-4 py-2 rounded-xl text-white"
                style={{ background: "#f7b500" }} // use your accent or BRAND.accentHex
              >
                Add
              </button>

              <Link
                href={{
                  pathname: "/bulk",
                  query: { productId: p.id, suggestedKg: 50 } // suggestedKg optional; change as needed
                }}
              >
                <a className="px-4 py-2 rounded-xl border text-sm" style={{ borderColor: "#689f38", color: "#333" }}>
                  Bulk
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
