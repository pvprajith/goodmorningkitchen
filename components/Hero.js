import Image from "next/image";

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
      
      <div>
        <h1 className="text-5xl font-extrabold text-choco leading-tight">
          Fresh Idli & Dosa Batter,{" "}
          <span className="text-brand">Delivered Daily</span>
        </h1>

        <p className="mt-5 text-lg text-choco/70">
          Freshly made. Naturally fermented. Soft idlis, crisp dosas—without
          the hassle.
        </p>

        {/* Contact + Buttons */}
        <div className="mt-7">
          
          {/* Contact Number */}
          <div>
            <p className="text-lg font-semibold text-gray-800">
              📞 Order on Call or WhatsApp
            </p>

            <a
              href="tel:+919823552444"
              className="text-3xl font-extrabold text-brand hover:underline"
            >
              +91 98235 52444
            </a>
          </div>

          {/* Buttons */}
          <div className="mt-5 flex gap-3">
            
            <a
              href="#products"
              className="px-4 py-2 rounded-lg text-sm font-medium text-white shadow-none transition-all hover:scale-105"
              style={{ background: "#689f38" }}
            >
              Shop Now
            </a>

            <a
              href="https://wa.me/919823552444"
              className="px-4 py-2 rounded-lg border border-brand text-brand text-sm font-medium transition-all hover:scale-105"
            >
              WhatsApp
            </a>

          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div>
        <Image
          src="/hero.png"
          alt="Idli and dosa"
          width={900}
          height={700}
          className="rounded-3xl shadow-2xl w-full h-auto"
        />
      </div>

    </section>
  );
}
