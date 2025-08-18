export const PRODUCTS=[
 {id:'batter-1kg',name:'Idli & Dosa Batter',size:'1 kg',price:79},
 {id:'batter-2kg',name:'Idli & Dosa Batter',size:'2 kg',price:149}
];
export function loadCart(){if(typeof window==='undefined')return[];try{return JSON.parse(localStorage.getItem('cart')||'[]');}catch{return[];}}
export function saveCart(c){if(typeof window!=='undefined')localStorage.setItem('cart',JSON.stringify(c));}
export function addToCart(item){const c=loadCart();const ex=c.find(x=>x.id===item.id);if(ex)ex.qty+=item.qty;else c.push(item);saveCart(c);return c;}
export function updateQty(id,qty){const c=loadCart();const item=c.find(i=>i.id===id);if(item)item.qty=qty;saveCart(c);return c;}
export function removeItem(id){let c=loadCart().filter(i=>i.id!==id);saveCart(c);return c;}
export function clearCart(){saveCart([]);}
export function total(c){return c.reduce((s,i)=>s+i.price*i.qty,0);}
