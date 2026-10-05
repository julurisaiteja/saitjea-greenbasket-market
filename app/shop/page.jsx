'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { brand, products } from '../../lib/brand';
import { useCart } from '../../lib/cart';

export default function ShopPage() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [sort, setSort] = useState('featured');
  const { toggleWish, wish } = useCart();
  const cats = ['All', ...Array.from(new Set(products.map((p) => p.cat)))];

  const list = useMemo(() => {
    let out = products.filter((p) => {
      const hay = (p.name + ' ' + p.blurb + ' ' + (p.farm || '') + ' ' + (p.tags || []).join(' ')).toLowerCase();
      return (cat === 'All' || p.cat === cat) && hay.includes(q.toLowerCase());
    });
    if (sort === 'price-asc') out = [...out].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') out = [...out].sort((a, b) => b.price - a.price);
    if (sort === 'rating') out = [...out].sort((a, b) => b.rating - a.rating);
    return out;
  }, [q, cat, sort]);

  const grouped = useMemo(() => {
    const map = new Map();
    list.forEach((p) => {
      const key = p.cat;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(p);
    });
    return [...map.entries()];
  }, [list]);

  return (
    <div className="gb-shop">
      <header className="gb-shop-hero">
        <p className="gb-shop-kicker">Open-air aisle map</p>
        <h1 className="font-display">{brand.nav[0]}</h1>
        <p className="text-muted mt-2">Sunny stall rows · farm filters · harvest windows still printed on the crate.</p>
        <div className="gb-shop-controls">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search produce, farms, tags…"
            className="gb-shop-input"
            aria-label="Search aisles"
          />
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="gb-shop-input" aria-label="Filter aisle">
            {cats.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="gb-shop-input" aria-label="Sort">
            <option value="featured">Featured</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
        <div className="gb-aisle-tabs" role="tablist" aria-label="Aisle shortcuts">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={cat === c}
              className={`gb-aisle-tab ${cat === c ? 'is-active' : ''}`}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </header>

      <div className="gb-shop-floor">
        {grouped.map(([aisle, items]) => (
          <section key={aisle} className="gb-aisle-row">
            <div className="gb-aisle-sign">
              <h2 className="font-display">{aisle}</h2>
              <span>{items.length} crates</span>
            </div>
            <div className="gb-crate-grid">
              {items.map((p) => (
                <article key={p.id} className="gb-crate">
                  <Link href={`/product/${p.id}`} className="gb-crate-media">
                    <img src={p.img} alt={p.name} />
                    <span className="gb-crate-fresh">{p.freshness || p.cat}</span>
                  </Link>
                  <div className="gb-crate-body">
                    <div className="flex justify-between gap-2">
                      <Link href={`/product/${p.id}`} className="font-semibold hover:opacity-80">{p.name}</Link>
                      <button type="button" onClick={() => toggleWish(p.id)} aria-label="Wishlist" className="text-lg">
                        {wish.includes(p.id) ? '♥' : '♡'}
                      </button>
                    </div>
                    <p className="text-sm text-muted mt-1">{p.farm || p.blurb}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-black" style={{ color: 'var(--brand)' }}>${p.price}</span>
                      <span className="text-xs text-muted">★ {p.rating}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
        {!list.length && <p className="mt-10 text-muted">No matches — try another stall filter.</p>}
      </div>
    </div>
  );
}
