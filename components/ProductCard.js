export default function ProductCard({p, onAdd}){
  return (
    <article className="bg-white rounded-2xl border p-6 shadow-card hover:shadow-xl transition">
      <h3 className="text-lg font-semibold text-choco">{p.size} {p.name}</h3>
      <ul className="mt-2 text-sm text-choco/70 list-disc pl-5">
        {p.usp.map((u,i)=>(<li key={i}>{u}</li>))}
      </ul>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <div className="line-through text-slate-400 text-xs">₹{p.mrp}</div>
          <div className="text-2xl font-extrabold text-brand">₹{p.price}</div>
        </div>
        <button onClick={()=>onAdd(p)} className="px-5 py-2 rounded-xl text-choco font-semibold" style={{background:"#fbc02d"}}>Add</button>
      </div>
    </article>
  );
}
