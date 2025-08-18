import Navbar from '../components/Navbar';
import { PRODUCTS, addToCart } from '../lib/cart';
import { useState } from 'react';

export default function Home() {
  const [pin,setPin]=useState('');
  const delivers = ['411060','411028','411048'].some(p=> pin.startsWith(p)) || /magarpatta|amanora/i.test(pin);
  return (
    <>
      <Navbar />
      <main className="container">
        <h1>Fresh Idli & Dosa Batter, Daily.</h1>
        <p>Stone-ground · Naturally fermented · Delivered in Pune (411060, 411028, 411048, Magarpatta, Amanora)</p>
        <section className="card">
          <h3>Check Delivery</h3>
          <input value={pin} onChange={e=>setPin(e.target.value)} placeholder="Enter pincode/area" />
          <div>{pin ? (delivers ? 'We deliver!' : 'Coming soon') : 'Type pincode above'}</div>
        </section>
        <h2>Products</h2>
        {PRODUCTS.map(p=>(
          <div key={p.id} className="card">
            <b>{p.size}</b> — ₹{p.price}
            <button className="btn" onClick={()=>{addToCart({...p,qty:1}); alert('Added!')}}>Add to Cart</button>
          </div>
        ))}
      </main>
    </>
  );
}
