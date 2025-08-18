export async function getServerSideProps({res}){
  const baseUrl='https://goodmorningkitchen.com';
  const pages=['/','/order'];
  const urls=pages.map(u=>`<url><loc>${baseUrl}${u}</loc></url>`).join('');
  const sitemap=`<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  res.setHeader('Content-Type','text/xml');res.write(sitemap);res.end();
  return{props:{}};
}
export default function SiteMap(){return null;}
