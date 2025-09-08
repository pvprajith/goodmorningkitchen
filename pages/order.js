import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { loadCart, total, clearCart, removeFromCart, BRAND } from "../lib/cart";

export default function Order(){
  const [cart,setCart]=useState([]);
  const [form,setForm]=useState({name:'',phone:'',address:'',pincode:'',payment:'COD'});
  useEffect(()=>{ setCart(loadCart()); },[]);
  const amount = total(cart);
  const placeOrder=(e)=>{
    e.preventDefault();
    const lines = cart.map(i=>`• ${i.size||''} ${i.name} x${i.qty} = ₹${i.price*i.qty}`).join('%0A');
    const text = `New order:%0A${lines}%0ATotal: ₹${amount}%0AName: ${form.name}%0APhone: ${form.phone}%0AAddress: ${form.address}%0APincode: ${form.pincode}%0APayment: ${form.payment}`;
    window.location.href = `https://wa.me/${BRAND.whatsapp}?text=${text}`;
  };
  const upiLink = `upi://pay?pa=${BRAND.upiVPA}&pn=GoodMorningKitchen&am=${amount}&tn=GMK%20Order&cu=INR`;

  return (<>
    <Navbar count={cart.reduce((s,i)=>s+i.qty,0)}/>
    <main className="max-w-6xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold text-choco">Checkout</h1>
      <section className="mt-6 bg-white rounded-2xl border p-6 shadow-card">
        {cart.length===0 ? <p>Your cart is empty.</p> :
          <ul className="space-y-2">{cart.map(i=>(
            <li key={i.id} className="flex justify-between border-b py-2">
              <span>{i.size} {i.name} × {i.qty}</span>
              <span>₹{i.price*i.qty}</span>
            </li>
          ))}</ul>
        }
        <div className="text-right font-extrabold text-brand mt-3">Total: ₹{amount}</div>
      </section>

      <form onSubmit={placeOrder} className="mt-6 bg-white rounded-2xl border p-6 shadow-card grid gap-3">
        <input placeholder="Name" required className="border rounded-xl px-4 py-3" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input placeholder="Phone" required className="border rounded-xl px-4 py-3" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
        <textarea placeholder="Address" required className="border rounded-xl px-4 py-3" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/>
        <input placeholder="Pincode" required className="border rounded-xl px-4 py-3" value={form.pincode} onChange={e=>setForm({...form,pincode:e.target.value})}/>
        <select className="border rounded-xl px-4 py-3" value={form.payment} onChange={e=>setForm({...form,payment:e.target.value})}>
          <option>COD</option>
          <option>UPI</option>
        </select>
        <button className="px-5 py-3 rounded-xl text-white font-semibold" style={{background:'#689f38'}}>Place Order via WhatsApp</button>
        {form.payment==='UPI' && amount>0 && (
          <a className="px-5 py-3 rounded-xl border border-brand text-brand font-semibold text-center" href={upiLink}>Tap to Pay UPI ₹{amount}</a>
        )}
      </form>
    </main>
    <Footer/>
  </>);
}
