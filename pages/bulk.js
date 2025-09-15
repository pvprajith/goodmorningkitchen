// pages/bulk.js
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

const BRAND = {
  name: "Good Morning Kitchen",
  whatsapp: "919846530615",
};

const SAMPLE_PRODUCTS = [
  { id: "idli-1kg", name: "Idli & Dosa Batter — 1 kg", price: 79 },
  { id: "idli-2kg", name: "Idli & Dosa Batter — 2 kg", price: 149 },
];

export default function BulkOrder() {
  const [productId, setProductId] = useState(SAMPLE_PRODUCTS[0].id);
  const product = SAMPLE_PRODUCTS.find((p) => p.id === productId);
  const [kg, setKg] = useState(10);
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const total = (product ? product.price : 0) * (kg || 0);

  async function requestQuote(e) {
    e?.preventDefault();
    if (!company || !phone || !kg) {
      setMessage({ type: "error", text: "Please fill company, phone and kg." });
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
          unitPrice: product.price,
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
      if (!res.ok) throw new Error(data.error || "Request failed");
      setMessage({ type: "success", text: data.message || "Request recorded." });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed" });
    } finally {
      setLoading(false);
    }
  }

  function openWhatsApp() {
    if (!company || !phone || !kg) {
      setMessage({ type: "error", text: "Please fill company, phone and kg before opening WhatsApp." });
      return;
    }
    const lines = [
      `Good Morning Kitchen — Bulk order request`,
      `Company: ${company}`,
      contact ? `Contact: ${contact}` : "",
      `Phone: ${phone}`,
      `Product: ${product.name}`,
      `Qty (kg): ${kg}`,
      `Unit price: ₹${product.price}`,
      `Total: ₹${total}`,
      address ? `Address: ${address}` : "",
      notes ? `Notes: ${notes}` : "",
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join("\n"));
    // Whatsapp number should be in international format (no +)
    const url = `https://wa.me/${BRAND.whatsapp}?text=${text}`;
    window.open(url, "_blank");
  }

  return (
    <>
      <Head>
        <title>Bulk Order — Good Morning Kitchen</title>
      </Head>

      <main style={{ maxWidth: 900, margin: "30px auto", padding: "0 20px" }}>
        <Link href="/"><a style={{ display: "inline-block", marginBottom: 20 }}>← Back</a></Link>
        <h1>Bulk Order / B2B — Request a Quote</h1>

        <div style={{ background: "#fff", padding: 20, borderRadius: 10, boxShadow: "0 6px 18px rgba(0,0,0,.06)" }}>
          <form onSubmit={requestQuote}>
            <label style={{ display: "block", marginBottom: 8 }}>Product</label>
            <select value={productId} onChange={(e) => setProductId(e.target.value)} style={{ width: "100%", padding: 10 }}>
              {SAMPLE_PRODUCTS.map((p) => <option key={p.id} value={p.id}>{p.name} — ₹{p.price}/kg</option>)}
            </select>

            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <div style={{ flex: 1 }}>
                <label>Qty (kg)</label>
                <input type="number" min="1" value={kg} onChange={(e) => setKg(Number(e.target.value || 0))} style={{ width: "100%", padding: 10 }} />
              </div>
              <div style={{ flex: 1 }}>
                <label>Estimated total</label>
                <div style={{ padding: 10, fontWeight: 700 }}>₹{total}</div>
              </div>
            </div>

            <hr style={{ margin: "16px 0" }} />

            <label>Company / Organisation *</label>
            <input value={company} onChange={(e) => setCompany(e.target.value)} style={{ width: "100%", padding: 10, marginTop: 6 }} />

            <label style={{ marginTop: 10 }}>Contact person</label>
            <input value={contact} onChange={(e) => setContact(e.target.value)} style={{ width: "100%", padding: 10, marginTop: 6 }} />

            <label style={{ marginTop: 10 }}>Phone (WhatsApp number) *</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: "100%", padding: 10, marginTop: 6 }} />

            <label style={{ marginTop: 10 }}>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: 10, marginTop: 6 }} />

            <label style={{ marginTop: 10 }}>Address</label>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3} style={{ width: "100%", padding: 10, marginTop: 6 }} />

            <label style={{ marginTop: 10 }}>Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} style={{ width: "100%", padding: 10, marginTop: 6 }} />

            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <button type="button" onClick={openWhatsApp} style={{ background: "#2ea44f", color: "#fff", padding: "10px 18px", borderRadius: 8 }}>
                Order via WhatsApp
              </button>

              <button type="submit" disabled={loading} style={{ background: "#ef9a1a", color: "#fff", padding: "10px 18px", borderRadius: 8 }}>
                {loading ? "Requesting..." : "Request Quote (API)"}
              </button>
            </div>

            {message && (
              <div style={{ marginTop: 12, color: message.type === "error" ? "#c62828" : "#2e7d32" }}>
                {message.text}
              </div>
            )}
          </form>
        </div>
      </main>
    </>
  );
}
