import Link from 'next/link';
import { useEffect, useState } from 'react';
import { loadCart } from '../lib/cart';

export default function Navbar(){
  const [count,setCount]=useState(0);
  useEffect(()=>{setCount(loadCart().reduce((s,i)=>s+i.qty,0));},[]);
  return(<header>
    <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <Link href="/"><b style={{color:'#10b981'}}>Good Morning Kitchen</b></Link>
      <nav style={{display:'flex',gap:10}}>
        <a href="https://wa.me/919846530615" className="btn">WhatsApp</a>
        <Link href="/order" className="btn secondary">Cart ({count})</Link>
      </nav>
    </div>
  </header>);
}
