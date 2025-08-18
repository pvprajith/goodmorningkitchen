export default function FAQ(){
  const faqs=[
    {q:'How long does the batter last?', a:'3 days refrigerated (0–4°C).'},
    {q:'Ingredients?', a:'Rice, Urad dal, Fenugreek, RO water. No preservatives.'},
    {q:'Delivery window?', a:'Every morning 6–8 AM.'},
  ];
  return (
    <section id="faq" className="bg-white border-y">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-choco">FAQ</h3>
        <div className="mt-8 grid gap-4">
          {faqs.map((f,i)=>(
            <details key={i} className="bg-cream rounded-xl p-4 border">
              <summary className="cursor-pointer font-semibold text-choco">{f.q}</summary>
              <p className="mt-2 text-choco/80">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
