'use client';
import Link from 'next/link';
import { brand, products } from '../lib/brand';
import { useEffect, useState } from 'react';

function Stars({ n }) {
  return <span className="stars">{'★'.repeat(Math.round(n))}{'☆'.repeat(5 - Math.round(n))}</span>;
}

const farms = [...new Set(products.map((p) => p.farm).filter(Boolean))];

export default function HomePage() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 2800);
    return () => clearInterval(t);
  }, []);
  const live = typeof brand.stats[0].value === 'number' ? brand.stats[0].value + (tick % 7) : brand.stats[0].value;
  const stalls = products.filter((p) => p.cat !== 'Boxes').slice(0, 6);

  return (
    <>
      <section className="vec-hero">
        <video autoPlay muted loop playsInline poster={brand.poster} className="vec-film">
          <source src={brand.video} type="video/mp4" />
        </video>
        <div className="vec-film-veil" aria-hidden="true" />
        <svg className="vec-shapes" viewBox="0 0 1200 800" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <circle className="vec-orb vec-orb-a" cx="180" cy="160" r="90" />
          <ellipse className="vec-orb vec-orb-b" cx="980" cy="220" rx="140" ry="110" />
          <path className="vec-leaf" d="M640 120c80 40 120 120 80 200-60-20-120-80-140-160 40-20 40-40 60-40z" />
          <rect className="vec-crate" x="90" y="520" width="160" height="100" rx="18" />
          <rect className="vec-crate" x="980" y="540" width="140" height="90" rx="16" />
        </svg>
        <div className="vec-market">
          <p className="vec-brand reveal-up">{brand.name}</p>
          <h1 className="vec-headline reveal-up delay-1">{brand.tagline}</h1>
          <p className="vec-lead reveal-up delay-2">{brand.description}</p>
          <div className="vec-cta reveal-up delay-3">
            <Link href="/shop" className="btn-brand">Shop aisles</Link>
            <Link href="/special" className="btn-ghost">Produce boxes</Link>
          </div>
        </div>
      </section>

      <section className="vec-aisle-band" aria-label="Live aisle pulse">
        <div className="vec-aisle-inner">
          {brand.stats.map((s, i) => (
            <div key={s.label} className="vec-stat float-soft" style={{ animationDelay: `${i * 0.2}s` }}>
              <p className="vec-stat-val">{i === 0 ? live : s.value}</p>
              <p className="vec-stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="vec-stalls-wrap">
        <div className="vec-section-head">
          <h2 className="font-display">Sunny stall row</h2>
          <p className="text-muted">Farm-stamped picks with harvest windows still warm.</p>
        </div>
        <div className="vec-stalls">
          {stalls.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`} className="vec-stall">
              <img src={p.img} alt={p.name} />
              <p className="mt-3 font-bold">{p.name}</p>
              <p className="text-sm" style={{ color: '#5a6d60' }}>{p.farm || p.cat}</p>
              <p className="vec-fresh">{p.freshness}</p>
              <p className="mt-1 font-black" style={{ color: 'var(--brand)' }}>${p.price}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="farms" className="vec-farms">
        <div className="vec-section-head">
          <h2 className="font-display">{brand.nav[2]}</h2>
          <p className="text-muted">Partners within a day’s drive — provenance on every SKU.</p>
        </div>
        <div className="vec-farm-rail">
          {farms.map((f) => (
            <div key={f} className="vec-farm-chip">
              <span className="vec-farm-dot" aria-hidden="true" />
              {f}
            </div>
          ))}
        </div>
      </section>

      <section id="recipes" className="vec-recipes">
        <div className="vec-recipe-card">
          <h2 className="font-display">Friday night haul</h2>
          <p className="text-muted mt-2">Heirloom tomatoes, greens, and honey — tossed warm with olive oil. Swap in the weekly box until Friday noon.</p>
          <Link href="/special" className="btn-brand mt-6">Build a box</Link>
        </div>
        <div className="vec-recipe-card alt">
          <h2 className="font-display">Cold-chain promise</h2>
          <p className="text-muted mt-2">Same-day metro windows when you order by 11am. Regenerative & USDA Organic filters live on the aisle map.</p>
          <Link href="/shop" className="btn-ghost mt-6">Browse aisles</Link>
        </div>
      </section>

      <section id="reviews" className="vec-reviews">
        {brand.reviews.map((r) => (
          <blockquote key={r.name} className="card-soft p-5">
            <Stars n={r.stars} />
            <p className="mt-3 font-medium">&ldquo;{r.text}&rdquo;</p>
            <footer className="mt-3 text-sm font-bold">{r.name}</footer>
          </blockquote>
        ))}
      </section>
    </>
  );
}
