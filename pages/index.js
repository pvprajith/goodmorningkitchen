import { useEffect, useState } from "react";
//import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import DeliveryCheck from "../components/DeliveryCheck";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import { PRODUCTS, addToCart, loadCart } from "../lib/cart";

export default function Home(){
  const [count,setCount]=useState(0);
  useEffect(()=>{ setCount(loadCart().reduce((s,i)=>s+i.qty,0)); },[]);

  const onAdd=(p)=>{ addToCart(p); setCount(c=>c+1); };

  return (<>
    //<Header cartCount={count} />
    <Hero/>
    <section id="products" className="bg-cream border-y">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-choco">Our Products</h2>
        <div className="mt-10 grid sm:grid-cols-2 gap-8">
          {PRODUCTS.map(p => <ProductCard key={p.id} p={p} onAdd={onAdd}/>)}
        </div>
      </div>
    </section>
    <DeliveryCheck/>
    <FAQ/>
    <Footer/>
  </>);
}
