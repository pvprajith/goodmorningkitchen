import Image from "next/image";

export default function Hero(){
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h1 className="text-5xl font-extrabold text-choco leading-tight">
          Fresh Idli & Dosa Batter, <span className="text-brand">Delivered Daily</span>
        </h1>
        <p className="mt-5 text-lg text-choco/70">
          Stone‑ground. Naturally fermented. Soft idlis, crisp dosas—without the hassle.
        </p>
        <div className="mt-7 flex gap-3">
        <div className="mt-6">
  <p className="text-lg font-semibold text-gray-800">
    📞 Call / WhatsApp Orders
  </p>

  <a
    href="tel:+91XXXXXXXXXX"
    className="text-3xl font-extrabold text-brand hover:underline"
  >
    +91 XXXXX XXXXX
  </a>
</div>
          <a href="#products" className="px-6 py-3 rounded-xl text-white font-medium shadow-lg" style={{background:"#689f38"}}>Shop Now</a>
          <a href="https://wa.me/919823552444" className="px-6 py-3 rounded-xl border border-brand text-brand font-semibold">WhatsApp</a>
        </div>
      </div>
      <div>
        <Image src="/hero.png" alt="Idli and dosa" width={900} height={700} className="rounded-3xl shadow-2xl w-full h-auto" />
      </div>
    </section>
  );
}
