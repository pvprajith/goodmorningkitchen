import Navbar from '../components/Navbar';
import { loadCart, updateQty, removeItem, total, clearCart } from '../lib/cart';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';

export default function Order(){
  const [cart,setCart]=useState([]);
  const [form,setForm]=useState({name:'',phone:'',address:'',pincode:'',payment:'COD'});
  useEffect(()=>{setCart(loadCart());},[]);
  const amount=total(cart);
  const handleQty=(id,qty)=>{setCart(updateQty(id,parseInt(qty)));};
  const remove=(id)=>{setCart(removeItem(id));};
  const placeOrder=(e)=>{
    e.preventDefault();
    const text=encodeURIComponent(
      `New order:\n${cart.map(i=>`${i.size} x${i.qty} = ₹${i.price*i.qty}`).join('\n')}\nTotal ₹${amount}\nName: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}\nPincode: ${form.pincode}\nPayment: ${form.payment}`
    );
    clearCart();
    window.location.href=`https://wa.me/919846530615?text=${text}`;
  };
  return(<>
    <Navbar/>
    <main className="container">
      <h1>Checkout</h1>
      <div className="card">
        {cart.length===0?'Cart empty':cart.map(i=>(
          <div key={i.id}>
            {i.size} × <input type="number" min="1" value={i.qty} onChange={e=>handleQty(i.id,e.target.value)} style={{width:50}}/>
            = ₹{i.price*i.qty} <button onClick={()=>remove(i.id)}>Remove</button>
          </div>
        ))}
        <div><b>Total: ₹{amount}</b></div>
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
      {form.payment==='UPI'&&amount>0&&(
        <div className="card">
          <h3>Pay by UPI</h3>
          <QRCode value={`upi://pay?pa=gmkgpay@upi&pn=GoodMorningKitchen&am=${amount}&tn=GMK%20Order&cu=INR`} size={200}/>
          <div><a className="btn" href={`upi://pay?pa=gmkgpay@upi&pn=GoodMorningKitchen&am=${amount}&tn=GMK%20Order&cu=INR`}>Pay ₹{amount}</a></div>
        </div>
      )}
    </main>
    <footer>
      Good Morning Kitchen · UG-18, Pragati Serene, Mohammedwadi/MahadevWadi, Pune – 411060<br/>
      Orders delivered fresh every morning (6–8 AM)
    </footer>
  </>);
}
