import { useState, useMemo } from "react";
import { BRAND } from "../lib/cart";

export default function DeliveryCheck(){
  const [pin,setPin]=useState("");
  const delivers = useMemo(()=> BRAND.serviceAreas.some(a=> pin.toLowerCase().includes(a.toLowerCase().replace(/\s/g,''))), [pin]);
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h3 className="text-2xl font-bold text-choco">Check Delivery</h3>
      <div className="mt-4 flex gap-3">
        <input value={pin} onChange={e=>setPin(e.target.value)} placeholder="Enter pincode or area"
          className="border rounded-xl px-4 py-3 w-72 bg-white shadow-sm"/>
        {pin && <div className="px-5 py-3 rounded-xl text-white font-semibold" style={{background: delivers? '#689f38' : '#ef4444'}}>
          {delivers ? 'Available' : 'Not yet'}
        </div>}
      </div>
      <p className="text-sm text-choco/60 mt-2">Current areas: 411060, 411028, 411048, Magarpatta, Amanora</p>
    </section>
  );
}
