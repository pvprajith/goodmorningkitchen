import Navbar from '../components/Navbar';
import { PRODUCTS, addToCart } from '../lib/cart';
import { useState } from 'react';

export default function Home(){
  const [pin,setPin]=useState('');
  const delivers=['411060','411028','411048'].some(p=>pin.startsWith(p))||/magarpatta|amanora/i.test(pin);
  return(<>
    <Navbar/>
    <main className="container">
      <h1>Fresh Idli & Dosa Batter, Daily.</h1>
      <p>Stone-ground · Naturally fermented · Orders delivered fresh every morning (6–8 AM).</p>
      <section className="card">
        <h3>Check Delivery</h3>
        <input value={pin} onChange={e=>setPin(e.target.value)} placeholder="Enter pincode/area"/>
        <div>{pin?(delivers?'We deliver!':'Coming soon'):'Type pincode above'}</div>
      </section>
      <h2>Products</h2>
      {PRODUCTS.map(p=>(
        <div key={p.id} className="card">
          <b>{p.size}</b> — ₹{p.price}
          <div style={{float:'right'}}>
            <button className="btn" onClick={()=>{addToCart({...p,qty:1});alert('Added!')}}>Add</button>
          </div>
        </div>
      ))}
    </main>
    <footer>
      Good Morning Kitchen · UG-18, Pragati Serene, Mohammedwadi/MahadevWadi, Pune – 411060<br/>
      Orders delivered fresh every morning (6–8 AM)
    </footer>
  </>);
}
