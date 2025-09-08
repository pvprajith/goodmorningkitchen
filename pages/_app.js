import '../styles/globals.css';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import MobileCartButton from '../components/MobileCartButton';

function loadCartCount() {
  if (typeof window === "undefined") return 0;
  try {
    const c = JSON.parse(localStorage.getItem('cart') || '[]');
    return c.reduce((s, i) => s + (i.qty || 0), 0);
  } catch {
    return 0;
  }
}

export default function MyApp({ Component, pageProps }) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(loadCartCount());
    const onStorage = () => setCartCount(loadCartCount());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <>
      <Header cartCount={cartCount} />
      <Component {...pageProps} />
      <MobileCartButton count={cartCount} />
    </>
  );
}
