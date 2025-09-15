// pages/bulk.js
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { PRODUCTS } from "../lib/cart"; // uses your existing PRODUCTS array

const BRAND = { name: "Good Morning Kitchen", whatsapp: "919846530615" };

export default function BulkOrder() {
  const router = useRouter();
  const { productId: qpProductId, suggestedKg: qpSuggestedKg } = router.query;

  const [productId, setProductId] = useState(PRODUCTS[0]?.id || "");
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0] || { name: "", price: 0 };

  const [kg, setKg] = useState(50);
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (typeof qpProductId === "string") {
      const found = PRODUCTS.find((p) => p.id === qpProductId);
      if (found) setProductId(found.id);
    }
    if (qpSuggestedKg) {
      const n = Number(qpSuggestedKg);
      if (!isNaN(n) && n > 0) setKg(n);
    }
  }, [qpProductId, qpSuggestedKg]);

  const total = (product?.launchPrice || product.price || 0) * (kg || 0);

  async function requestQuote(e) {
    e?.preventDefault();
    if (!company || !phone || !kg) {
      setMessage({ type: "error", text: "Please fill company, phone and qty (kg)." });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/bulk-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          kg,
          unitPrice: product.launchPrice ?? product.price,
          total,
          company,
          contactPerson: contact,
          phone,
          email,
          address,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Request failed");
      setMessage({ type: "success", text: data?.message || "Bulk request received. We'll contact you shortly." });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to send request." });
    } finally {
      setLoading(false);
    }
  }

  function openWhatsApp() {
    if (!company || !phone || !kg) {
      setMessage({ type: "error", text: "Please fill company, phone and qty before opening WhatsApp." });
      return;
    }
    const lines = [
      `Good Morning Kitchen — Bulk order request`,
      `Company: ${company}`,
      contact ? `Contact: ${contact}` : "",
      `Phone: ${phone}`,
      `Product: ${product.name}`,
      `Qty (kg): ${kg}`,
      `Unit price: ₹${product.launchPrice ?? product.price}`,
      `Total: ₹${total}`,
      address ? `Address: ${address}` : "",
      notes ? `Notes: ${notes}` : "",
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${BRAND.whatsapp}?text=${text}`;
    window.open(url, "_blank");
  }

  return (
    <>
      <Head>
        <title>Bulk Order — {BRAND.name}</title>
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/"><a className="text-sm underline">← Back to home</a></Link>
        <h1 className="text-3xl font-bold mt-6">Bulk Order / B2B — Request a Quote</h1>

        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <form onSubmit={requestQuote} className="space-y-4">
            <label className="block">Product</label>
            <select value={productId} onChange={(e) => setProductId(e.target.value)} className="w-full p-3 border rounded">
              {PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.size} {p.name} — ₹{p.launchPrice ?? p.mrp}</option>)}
            </select>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Qty (kg)</label>
                <input type="number" min="1" value={kg} onChange={(e) => setKg(Number(e.target.value || 0))} className="w-full p-3 border rounded" />
              </div>
              <div>
                <label>Estimated total</label>
                <div className="p-3 font-bold">₹{total}</div>
              </div>
            </div>

            <label>Company / Organisation *</label>
            <input value={company} onChange={(e)=>setCompany(e.target.value)} className="w-full p-3 border rounded" />

            <label>Contact person</label>
            <input value={contact} onChange={(e)=>setContact(e.target.value)} className="w-full p-3 border rounded" />

            <label>Phone (WhatsApp number) *</label>
            <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="w-full p-3 border rounded" />

            <label>Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-3 border rounded" />

            <label>Address</label>
            <textarea value={address} onChange={(e)=>setAddress(e.target.value)} className="w-full p-3 border rounded" rows={3} />

            <label>Notes</label>
            <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} className="w-full p-3 border rounded" rows={2} />

            <div className="flex gap-3 mt-4">
              <button type="button" onClick={openWhatsApp} className="flex-1 bg-green-600 text-white p-3 rounded">Order via WhatsApp</button>
              <button type="submit" disabled={loading} className="flex-1 bg-yellow-500 text-white p-3 rounded">{loading ? "Sending..." : "Request Quote (API)"}</button>
            </div>

            {message && (
              <div className={`mt-3 ${message.type==="error" ? "text-red-600":"text-green-700"}`}>
                {message.text}
              </div>
            )}
          </form>
        </div>
      </main>
    </>
  );
}
