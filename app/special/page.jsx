'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { brand, products } from '../../lib/brand';
import { useCart } from '../../lib/cart';
export default function SpecialPage(){
  const sizes=[{id:'s',label:'Small',price:29},{id:'m',label:'Medium',price:39},{id:'f',label:'Family',price:59}];
  const [size,setSize]=useState(sizes[1]); const [swaps,setSwaps]=useState(['heirloom','greens','eggs','honey']);
  const { add }=useCart(); const router=useRouter();
  function go(){ add({ id:'box', name:`Produce Box · ${size.label}`, price:size.price, img:products.find(p=>p.id==='box').img, qty:1, lineKey:`box-${size.id}`, meta:`Items: ${swaps.join(', ')}` }); router.push('/cart'); }
  return (
    <div className="gb-special">
      <header className="gb-special-hero">
        <p className="gb-shop-kicker">{brand.nav[1]} · harvest subscription</p>
        <h1 className="font-display">Weekly produce boxes</h1>
        <p className="text-muted mt-2">Farm-curated · swap until Friday noon.</p>
      </header>
      <div className="mt-8 grid gap-4 md:grid-cols-3">{sizes.map(s=><button key={s.id} onClick={()=>setSize(s)} className="card-soft p-6 text-left" style={{outline:size.id===s.id?'3px solid var(--brand)':undefined}}><p className="font-display text-2xl">{s.label}</p><p className="mt-2" style={{color:'var(--brand)'}}>${s.price}</p></button>)}</div>
      <p className="mt-8 font-semibold">This week&apos;s haul — tap to swap</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{products.filter(p=>p.cat==='Produce'||p.id==='eggs'||p.id==='honey').map(p=>{
        const on=swaps.includes(p.id);
        return <button key={p.id} onClick={()=>setSwaps(prev=>on?prev.filter(x=>x!==p.id):[...prev,p.id])} className="card-soft p-3 text-left" style={{outline:on?'3px solid var(--brand)':undefined}}>
          <img src={p.img} alt="" className="aspect-video w-full object-cover rounded-xl" /><p className="mt-2 text-sm font-semibold">{p.name}</p><p className="text-xs text-muted">{p.farm}</p>
        </button>;
      })}</div>
      <button className="btn-brand mt-8" onClick={go}>Subscribe · ${size.price}/wk</button>
    </div>
  );
}
