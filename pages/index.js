import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-cream min-h-screen text-brown">
      <Head>
        <title>Good Morning Kitchen</title>
        <meta name="description" content="Fresh Idli & Dosa Batter delivered every morning in Pune" />
      </Head>

      <header className="flex items-center justify-between p-4 bg-emerald text-white">
        <div className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Good Morning Kitchen" width={40} height={40} />
          <span className="font-bold">Good Morning Kitchen</span>
        </div>
        <nav className="space-x-4">
          <Link href="#products">Products</Link>
          <Link href="#whyus">Why Us</Link>
          <Link href="#faq">FAQ</Link>
          <Link href="#contact">Contact</Link>
        </nav>
      </header>

      <main>
        <section className="text-center py-12 bg-cream">
          <h1 className="text-4xl font-bold text-brown">Fresh Idli & Dosa Batter</h1>
          <p className="mt-2 text-lg text-olive">Delivered fresh every morning (6–8 AM)</p>
          <div className="mt-6">
            <Image src="/hero.png" alt="Dosa" width={400} height={250} className="mx-auto rounded" />
          </div>
          <a href="/order" className="mt-6 inline-block bg-orange text-white px-6 py-2 rounded-lg">Order Now</a>
        </section>

        <section id="products" className="py-12 px-6 grid md:grid-cols-2 gap-6 bg-white">
          <div className="p-6 border rounded shadow">
            <h2 className="text-xl font-semibold">1kg Batter</h2>
            <p className="mt-2">₹79</p>
            <button className="mt-4 bg-emerald text-white px-4 py-2 rounded">Add to Cart</button>
          </div>
          <div className="p-6 border rounded shadow">
            <h2 className="text-xl font-semibold">2kg Batter</h2>
            <p className="mt-2">₹149</p>
            <button className="mt-4 bg-emerald text-white px-4 py-2 rounded">Add to Cart</button>
          </div>
        </section>

        <section id="whyus" className="py-12 px-6 bg-cream text-center">
          <h2 className="text-2xl font-bold">Why Choose Us?</h2>
          <p className="mt-4 text-lg">Stone-ground · Zero shortcuts · Daily fresh</p>
        </section>

        <section id="faq" className="py-12 px-6 bg-white">
          <h2 className="text-2xl font-bold text-center">FAQ</h2>
          <div className="mt-6">
            <details className="mb-4">
              <summary>What time do you deliver?</summary>
              <p>Every morning between 6–8 AM.</p>
            </details>
            <details>
              <summary>Which areas do you serve?</summary>
              <p>Currently: 411060, 411028, 411048, Magarpatta, Amanora, and nearby.</p>
            </details>
          </div>
        </section>

        <section id="contact" className="py-12 px-6 bg-cream text-center">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p className="mt-2">📍 UG-18, Pragati Serene, Mohammedwadi/MahadevWadi, Pune – 411060</p>
          <p className="mt-2">📞 9846530615</p>
          <a href="https://wa.me/919846530615" className="mt-4 inline-block bg-emerald text-white px-6 py-2 rounded-lg">Chat on WhatsApp</a>
        </section>
      </main>

      <footer className="bg-brown text-white text-center py-4">
        © {new Date().getFullYear()} Good Morning Kitchen · Orders delivered fresh every morning (6–8 AM)
      </footer>
    </div>
  )
}