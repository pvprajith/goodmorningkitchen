import Navbar from '../components/Navbar';
import { loadCart, total, clearCart } from '../lib/cart';
import { useEffect, useState } from 'react';

export default function Order() {
  const [cart,setCart] = useState([]);
  const [form,setForm]=useState({name:'',phone:'',address:'',pincode:'',payment:'COD'});
  useEffect(()=>{ setCart(loadCart()); },[]);
  const amount = total(cart);
  const placeOrder=(e)=>{
    e.preventDefault();
    const text=encodeURIComponent(`New order:\n${cart.map(i=>`${i.size} x${i.qty} = ₹${i.price*i.qty}`).join('\n')}\nTotal ₹${amount}\nName: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}\nPincode: ${form.pincode}\nPayment: ${form.payment}`);
    clearCart();
    window.location.href=`https://wa.me/919846530615?text=${text}`;
  };
  return (
    <>
      <Navbar/>
      <main className="container">
        <h1>Checkout</h1>
        <div className="card">
          {cart.length===0? 'Cart empty': cart.map(i=>(<div key={i.id}>{i.size} × {i.qty} = ₹{i.price*i.qty}</div>))}
          <div>Total: ₹{amount}</div>
        </div>
        <form onSubmit={placeOrder} className="card">
          <input placeholder="Name" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <input placeholder="Phone" required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
          <textarea placeholder="Address" required value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/>
          <input placeholder="Pincode" required value={form.pincode} onChange={e=>setForm({...form,pincode:e.target.value})}/>
          <select value={form.payment} onChange={e=>setForm({...form,payment:e.target.value})}>
            <option>COD</option><option>UPI</option>
          </select>
          <button className="btn" type="submit">Place Order via WhatsApp</button>
        </form>
      </main>
    </>
  );
}
