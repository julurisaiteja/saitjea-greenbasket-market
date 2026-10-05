'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { brand } from '../lib/brand';
import { useCart } from '../lib/cart';
import AIAssistant from './AIAssistant';

const links = [
  { href: '/shop', label: brand.nav[0] },
  { href: '/special', label: brand.nav[1] },
  { href: '/#farms', label: brand.nav[2] },
  { href: '/#recipes', label: brand.nav[3] },
];

export default function Shell({ children }) {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <div data-diamond="batch-1" className="gb-shell">
      <a href="#main" className="skip-link">Skip to market floor</a>
      <div className="gb-ticker offer-banner" role="status">
        <span className="gb-ticker-track">
          {brand.offer.label} · <strong>{brand.offer.code}</strong> — {brand.offer.detail} · Cold-chain bags on every drop · Same-day if ordered by 11am
        </span>
      </div>
      <header className="gb-header">
        <div className="gb-header-inner">
          <Link href="/" className="gb-mark" aria-label={`${brand.name} home`}>
            <span className="gb-mark-leaf" aria-hidden="true" />
            <span className="font-display gb-mark-name">{brand.name}</span>
          </Link>
          <nav className="gb-nav" aria-label="Primary">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="gb-nav-link">{l.label}</Link>
            ))}
            <Link href="/cart" className="btn-brand gb-cart">
              Basket{count > 0 ? ` · ${count}` : ''}
            </Link>
          </nav>
          <div className="gb-mobile-actions">
            <Link href="/cart" className="btn-brand !py-2 !px-3 text-sm">Basket {count || ''}</Link>
            <button type="button" className="gb-burger" aria-expanded={open} aria-controls="gb-drawer" onClick={() => setOpen((v) => !v)}>
              <span /><span /><span />
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>
        <div id="gb-drawer" className={`gb-drawer ${open ? 'is-open' : ''}`} hidden={!open}>
          <nav aria-label="Mobile">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
            ))}
            <Link href="/cart" onClick={() => setOpen(false)}>Basket{count > 0 ? ` · ${count}` : ''}</Link>
          </nav>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="gb-footer">
        <div className="gb-footer-grid">
          <div>
            <p className="font-display gb-footer-brand">{brand.name}</p>
            <p className="text-muted mt-2 max-w-md">{brand.description}</p>
            <p className="gb-footer-stamp mt-4">Farm-stamped · harvest-window honest</p>
          </div>
          <div>
            <p className="gb-footer-h">Aisle map</p>
            <ul className="gb-footer-list">
              <li><Link href="/shop">{brand.nav[0]}</Link></li>
              <li><Link href="/special">{brand.nav[1]}</Link></li>
              <li><Link href="/#farms">{brand.nav[2]}</Link></li>
              <li><Link href="/#recipes">{brand.nav[3]}</Link></li>
            </ul>
          </div>
          <div>
            <p className="gb-footer-h">Market desk</p>
            <ul className="gb-footer-list">
              <li>Secure checkout UI (demo)</li>
              <li>Wishlist & loyalty stamps</li>
              <li>{brand.aiName} shopping help</li>
            </ul>
          </div>
          <div>
            <p className="gb-footer-h">Harvest notes</p>
            <form className="gb-newsletter" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email for farm drops" aria-label="Email for farm drops" />
              <button type="submit" className="btn-brand !py-2">Join</button>
            </form>
          </div>
        </div>
        <p className="gb-footer-legal">Demo storefront · no real payments · {brand.name}</p>
      </footer>
      <div className="sticky-cta md:hidden">
        <Link href="/shop" className="btn-brand !py-2 !px-4 text-sm">{brand.nav[0]}</Link>
        <Link href="/special" className="btn-ghost !py-2 !px-4 text-sm">{brand.nav[1]}</Link>
      </div>
      <AIAssistant />
    </div>
  );
}
