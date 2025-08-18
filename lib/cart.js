export const BRAND = {
  name: "Good Morning Kitchen",
  tagline: "Stone‑ground. Fermented right. Fresh daily.",
  phone: "9846530615",
  whatsapp: "919846530615",
  email: "orders@gmkitchen.in",
  city: "Pune",
  serviceAreas: ["411060","411028","411048","Magarpatta","Amanora"],
  upiVPA: "gmkgpay@upi" // placeholder
};

export const PRODUCTS = [
  { id:"idli-1kg", name:"Idli & Dosa Batter", size:"1 kg", mrp: 90, price:79, usp:["No preservatives","Wet‑grinder texture","Naturally fermented"] },
  { id:"idli-2kg", name:"Idli & Dosa Batter", size:"2 kg (family pack)", mrp:170, price:149, usp:["Best value","Fluffy idlis","Crisp dosas"] },
];

export function loadCart(){ if(typeof window==='undefined') return []; try{ return JSON.parse(localStorage.getItem('cart')||'[]'); }catch{ return []; } }
export function saveCart(c){ if(typeof window!=='undefined') localStorage.setItem('cart', JSON.stringify(c)); }
export function addToCart(item){ const c=loadCart(); const ex=c.find(i=>i.id===item.id); if(ex) ex.qty+=1; else c.push({...item, qty:1}); saveCart(c); return c; }
export function removeFromCart(id){ const c=loadCart().filter(i=>i.id!==id); saveCart(c); return c; }
export function clearCart(){ saveCart([]); }
export function total(c){ return c.reduce((s,i)=> s + i.price*i.qty, 0); }
