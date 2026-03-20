'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{ borderBottom: '1px solid #222' }} className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div
            className="w-8 h-8 flex items-center justify-center text-[#0d0d0d] font-display text-lg"
            style={{ background: 'var(--acid)', clipPath: 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)' }}
          >
            D
          </div>
          <span className="font-display text-2xl tracking-widest text-offwhite">
            DUMP<span style={{ color: 'var(--acid)' }}>them</span>all
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'Categories', href: '#categories' },
            { label: 'Rates', href: '#rates' },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-sm text-[#888880] hover:text-[var(--acid)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/track">
            <button className="btn-outline text-sm py-2 px-5 font-display">
              Track Pickup
            </button>
          </Link>
          <Link href="/schedule">
            <button className="btn-primary text-sm py-2 px-5 font-display">
              Schedule Pickup →
            </button>
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2"
        >
          <span className={`block w-6 h-[2px] bg-[var(--offwhite)] transition-all ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-[2px] bg-[var(--offwhite)] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[2px] bg-[var(--offwhite)] transition-all ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#222] bg-[#0d0d0d] px-6 py-6 flex flex-col gap-5">
          {[
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'Categories', href: '#categories' },
            { label: 'Rates', href: '#rates' },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-sm text-[#888880] hover:text-[var(--acid)]"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link href="/schedule" onClick={() => setMenuOpen(false)}>
            <button className="btn-primary w-full justify-center">
              Schedule Pickup →
            </button>
          </Link>
        </div>
      )}
    </nav>
  )
}
