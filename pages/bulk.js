// pages/bulk.js
import { useState, useMemo } from "react";
import Head from "next/head";
import Header from "../components/Header"; // adjust if your header file is elsewhere
import Link from "next/link";

const BULK = {
  productId: "idli-dosa-bulk",
  name: "Idli & Dosa Batter (Bulk)",
  pricePerKg: 70,   // ₹ per kg bulk price
  minKg: 10,
  leadTime: "48-72 hours",
  whatsappNumber: "919846530615", // full international format without +
};

export default function BulkPage() {
  const [company, setCompany] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [kg, setKg] = useState(BULK.minKg);
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState("");

  const total = useMemo(() => (Number(kg || 0) * BULK.pricePerKg), [kg]);

  function openWhatsapp() {
    const lines = [
      `Bulk Order: ${BULK.name}`,
      `Qty: ${kg} kg`,
      `Approx Amount: ₹${total}`,
      `Company: ${company}`,
      `Contact: ${contactPerson}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Address: ${address}`,
      `Notes: ${notes}`,
    ].join("%0A");
    window.open(`https://wa.me/${BULK.whatsappNumber}?text=${encodeURIComponent(lines)}`, "_blank");
  }

  async function handleRequestQuote(e) {
    e.preventDefault();
    if (!company || !phone || kg < BULK.minKg) {
      setMsg(`Please provide company, phone and at least ${BULK.minKg} kg.`);
      return;
    }
    setSending(true);
    setMsg("");
    try {
      const res = await fetch("/api/bulk-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: BULK.productId,
          productName: BULK.name,
          kg,
          total,
          company,
          contactPerson,
          phone,
          email,
          address,
          notes,
        }),
      });
      const j = await res.json();
      if (res.ok) {
        setMsg("✅ Quote requested — our sales team will contact you shortly.");
      } else {
        setMsg(j.error || "❌ Something went wrong. Try WhatsApp instead.");
      }
    } catch (err) {
      setMsg("❌ Network error. Try WhatsApp instead.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <Head>
        <title>Bulk Orders — Good Morning Kitchen</title>
        <meta
          name="description"
          content="Bulk orders for idli & dosa batter — Good Morning Kitchen supplies canteens, corporates and restaurants in Pune."
        />
      </Head>

      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Bulk Orders (B2B)</h1>
        <p className="mt-2 text-sm text-slate-600">
          Minimum order: {BULK.minKg} kg. Lead time: {BULK.leadTime}.
        </p>

        <section className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold">Request a Bulk Order</h2>
          <div className="mt-3 grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm">Company / Institution</label>
              <input className="w-full border rounded px-3 py-2" value={company} onChange={(e)=>setCompany(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm">Contact person</label>
              <input className="w-full border rounded px-3 py-2" value={contactPerson} onChange={(e)=>setContactPerson(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm">Phone</label>
              <input className="w-full border rounded px-3 py-2" value={phone} onChange={(e)=>setPhone(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm">Email (optional)</label>
              <input className="w-full border rounded px-3 py-2" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm">Delivery Address</label>
              <textarea className="w-full border rounded px-3 py-2" rows={3} value={address} onChange={(e)=>setAddress(e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm">Quantity (kg)</label>
              <input type="number" min={BULK.minKg} className="w-40 border rounded px-3 py-2"
                value={kg}
                onChange={(e)=>setKg(Math.max(BULK.minKg, Number(e.target.value || 0)))} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm">Notes / Special instructions</label>
              <textarea className="w-full border rounded px-3 py-2" rows={2} value={notes} onChange={(e)=>setNotes(e.target.value)} />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-600">Price per kg: ₹{BULK.pricePerKg}</div>
              <div className="text-lg font-bold mt-1">Estimated total: ₹{total}</div>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-3 bg-yellow-500 text-white rounded" onClick={openWhatsapp}>
                Order via WhatsApp
              </button>
              <button className="px-5 py-3 bg-green-600 text-white rounded" onClick={handleRequestQuote} disabled={sending}>
                {sending ? "Requesting..." : "Request Quote"}
              </button>
            </div>
          </div>

          {msg && <div className="mt-4 text-sm text-slate-700">{msg}</div>}
        </section>

        <section className="mt-6 text-sm text-slate-500">
          <p>
            <strong>Note:</strong> Bulk prices are indicative. Our sales team will confirm final price, delivery and payment terms.  
            For recurring B2B orders, please contact <a href="mailto:sales@goodmorningkitchen.com" className="underline">sales@goodmorningkitchen.com</a>.
          </p>
        </section>
      </main>
    </>
  );
}
