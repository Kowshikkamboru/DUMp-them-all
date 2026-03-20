import Link from 'next/link'
import Navbar from '../components/Navbar'

const CATEGORIES = [
  {
    icon: '📚',
    name: 'Books & Paper',
    desc: 'Old textbooks, newspapers, notebooks, cardboard — all graded by weight.',
    rate: '₹8–14 / kg',
    tag: 'BY WEIGHT',
    tagColor: '#4ade80',
    examples: ['Textbooks', 'Newspapers', 'Cardboard', 'Magazines'],
  },
  {
    icon: '🔩',
    name: 'Metal & Steel',
    desc: 'Utensils, pipes, rods, tins, aluminum cans, copper wire, iron frames.',
    rate: '₹22–60 / kg',
    tag: 'BY WEIGHT',
    tagColor: '#4ade80',
    examples: ['Steel utensils', 'Copper wire', 'Iron rods', 'Aluminium'],
  },
  {
    icon: '🧴',
    name: 'Plastic & PET',
    desc: 'Bottles, containers, buckets, pipes, PVC, hard and soft plastics.',
    rate: '₹6–18 / kg',
    tag: 'BY WEIGHT',
    tagColor: '#4ade80',
    examples: ['PET bottles', 'PVC pipes', 'Buckets', 'Packaging'],
  },
  {
    icon: '📱',
    name: 'E-Waste',
    desc: 'Phones, laptops, TVs, PCBs, cables, batteries — proper certified disposal.',
    rate: '₹50–800 / item',
    tag: 'BY ITEM',
    tagColor: '#60a5fa',
    examples: ['Phones', 'Laptops', 'PCBs', 'Cables & chargers'],
  },
  {
    icon: '💎',
    name: 'Valuables / Pawn',
    desc: 'Jewelry, cameras, watches, antiques. We assess on-spot, you choose to sell or hold.',
    rate: 'Market Price',
    tag: 'ON REQUEST',
    tagColor: '#f59e0b',
    examples: ['Gold/silver', 'Cameras', 'Watches', 'Antiques'],
  },
  {
    icon: '🪟',
    name: 'Glass & Rubber',
    desc: 'Glass bottles, window panes, tyres, rubber mats. Collected & recycled.',
    rate: '₹3–10 / kg',
    tag: 'BY WEIGHT',
    tagColor: '#4ade80',
    examples: ['Glass bottles', 'Window panes', 'Tyres', 'Rubber mats'],
  },
]

const STEPS = [
  {
    num: '01',
    title: 'List Your Stuff',
    desc: 'Select the categories you want to dump. Rough estimate is fine — no need to weigh anything yourself.',
  },
  {
    num: '02',
    title: 'Pick a Slot',
    desc: 'Choose a date & time. We operate 7 days, 8AM–6PM. Our guy shows up at your door.',
  },
  {
    num: '03',
    title: 'We Weigh It',
    desc: 'Our agent brings a certified scale. Items are weighed, counted, and assessed on-site. Transparent process.',
  },
  {
    num: '04',
    title: 'Get Paid',
    desc: 'Cash, UPI, or bank transfer — your choice. For valuables, you get a quote and decide. No pressure.',
  },
]

const NOT_ACCEPTED = [
  '🚫 General dust & floor sweepings',
  '🚫 Vegetable & fruit peels',
  '🚫 Kitchen cooking waste',
  '🚫 Disposable napkins / diapers',
  '🚫 Wet bio-waste',
  '🚫 Chemical / medical waste',
]

const STATS = [
  { num: '12,000+', label: 'Pickups done' },
  { num: '480 T', label: 'Scrap recycled' },
  { num: '4.8★', label: 'Avg rating' },
  { num: '2–4 hrs', label: 'Avg response time' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#111]">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-0 overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#D4FF00 1px, transparent 1px), linear-gradient(90deg, #D4FF00 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Big decorative text */}
        <div
          className="absolute right-[-2%] top-16 font-display text-[22vw] leading-none select-none pointer-events-none"
          style={{ color: 'transparent', WebkitTextStroke: '1px rgba(212,255,0,0.06)' }}
        >
          JUNK
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="tag text-[var(--acid)] border-[var(--acid)] mb-6 inline-block">
              🗑️ Doorstep Scrap Pickup · Hyderabad & Beyond
            </div>

            <h1 className="font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] mb-6">
              <span style={{ color: 'var(--acid)' }}>DUMP</span>
              <br />
              <span className="text-[var(--offwhite)]">THEM</span>
              <br />
              <span className="text-[var(--offwhite)]">ALL.</span>
            </h1>

            <p className="font-mono text-[#888880] text-base md:text-lg max-w-xl leading-relaxed mb-8">
              We come to your door, weigh your scrap, and pay you cash.
              Books, metal, plastic, e-waste, even valuables — if it's
              unwanted, we take it. No hassle, no middleman.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link href="/schedule">
                <button className="btn-primary pulse-glow text-lg">
                  📦 Schedule Free Pickup
                </button>
              </Link>
              <a href="#how-it-works">
                <button className="btn-outline text-lg">
                  See How It Works
                </button>
              </a>
            </div>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-3">
              {['✅ Free pickup', '⚖️ Certified weighing', '💸 Instant payment', '♻️ Eco-certified'].map(chip => (
                <span
                  key={chip}
                  className="font-mono text-xs text-[#888880] bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-1.5"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Hero visual — rate cards */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-[#222]">
            {STATS.map((s) => (
              <div key={s.label} className="bg-[#111] py-8 px-6 text-center">
                <div className="counter-num">{s.num}</div>
                <div className="font-mono text-xs text-[#888880] mt-1 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ───────────────────────────────────────────────── */}
      <div
        className="overflow-hidden py-3 border-y border-[#222] mt-0"
        style={{ background: '#0d0d0d' }}
      >
        <div className="ticker-inner flex gap-0">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex items-center">
              {['OLD BOOKS', 'STEEL UTENSILS', 'PLASTIC BOTTLES', 'E-WASTE', 'COPPER WIRE', 'NEWSPAPERS', 'ALUMINIUM', 'OLD PHONES', 'RUBBER TYRES', 'GOLD & SILVER', 'CARDBOARD'].map((item) => (
                <span key={item} className="font-display text-sm tracking-widest text-[#888880] px-6 flex items-center gap-4">
                  {item}
                  <span style={{ color: 'var(--acid)', fontSize: '10px' }}>✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
          <div>
            <div className="tag text-[var(--muted)] border-[#333] mb-3">Process</div>
            <h2 className="font-display text-6xl md:text-8xl text-[var(--offwhite)]">
              HOW IT<br />
              <span style={{ color: 'var(--acid)' }}>WORKS</span>
            </h2>
          </div>
          <p className="font-mono text-sm text-[#888880] max-w-xs">
            Four steps from door to cash. Average pickup takes 20–40 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#222]">
          {STEPS.map((step, i) => (
            <div key={step.num} className="bg-[#111] p-8 hover-lift group">
              <div
                className="font-display text-6xl mb-6 transition-colors"
                style={{ color: i === 0 ? 'var(--acid)' : '#2a2a2a' }}
              >
                {step.num}
              </div>
              <h3 className="font-display text-2xl text-[var(--offwhite)] mb-3 group-hover:text-[var(--acid)] transition-colors">
                {step.title}
              </h3>
              <p className="font-mono text-sm text-[#888880] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────── */}
      <section id="categories" className="py-24 border-t border-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="tag text-[var(--muted)] border-[#333] mb-3">What We Accept</div>
            <h2 className="font-display text-6xl md:text-8xl text-[var(--offwhite)]">
              THE<br />
              <span style={{ color: 'var(--acid)' }}>CATEGORIES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className="card p-6 hover-lift group relative overflow-hidden"
              >
                {/* Corner accent */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'linear-gradient(135deg, transparent 50%, rgba(212,255,0,0.06) 50%)',
                  }}
                />

                <div className="flex items-start justify-between mb-4">
                  <div className="cat-icon text-2xl">{cat.icon}</div>
                  <span
                    className="tag text-[10px]"
                    style={{ color: cat.tagColor, borderColor: cat.tagColor, opacity: 0.8 }}
                  >
                    {cat.tag}
                  </span>
                </div>

                <h3 className="font-display text-2xl text-[var(--offwhite)] mb-2 group-hover:text-[var(--acid)] transition-colors">
                  {cat.name}
                </h3>
                <p className="font-mono text-xs text-[#888880] mb-4 leading-relaxed">
                  {cat.desc}
                </p>

                <div
                  className="font-display text-2xl mb-4"
                  style={{ color: 'var(--acid)' }}
                >
                  {cat.rate}
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.examples.map((ex) => (
                    <span
                      key={ex}
                      className="font-mono text-[10px] text-[#555] border border-[#2a2a2a] px-2 py-1"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOT ACCEPTED ──────────────────────────────────────────── */}
      <section className="py-16 border-t border-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">⚠️</span>
              <h3 className="font-display text-3xl text-[var(--offwhite)]">
                WE DON'T TAKE THESE
              </h3>
            </div>
            <p className="font-mono text-sm text-[#888880] mb-8 max-w-xl">
              To keep things clean and safe, we skip general household bio-waste and anything that belongs in your municipal bin.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {NOT_ACCEPTED.map((item) => (
                <div
                  key={item}
                  className="font-mono text-sm text-[#888880] bg-[#111] border border-[#222] px-4 py-3"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RATES TABLE ──────────────────────────────────────────── */}
      <section id="rates" className="py-24 border-t border-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="tag text-[var(--muted)] border-[#333] mb-3">Pricing</div>
            <h2 className="font-display text-5xl md:text-7xl text-[var(--offwhite)]">
              TODAY'S <span style={{ color: 'var(--acid)' }}>RATES</span>
            </h2>
            <p className="font-mono text-xs text-[#888880] mt-2">
              Updated weekly. Final price after on-site weighing.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ borderBottom: '1px solid #2a2a2a' }}>
                  {['Material', 'Pricing Mode', 'Rate Range', 'Notes'].map((h) => (
                    <th
                      key={h}
                      className="font-mono text-xs text-[#888880] text-left py-3 px-4 uppercase tracking-widest"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Books / Paper', 'Weight', '₹8 – 14 / kg', 'Dry only'],
                  ['Newspaper', 'Weight', '₹10 – 14 / kg', 'Bundled preferred'],
                  ['Steel / Iron', 'Weight', '₹22 – 35 / kg', 'Clean metal'],
                  ['Copper / Brass', 'Weight', '₹280 – 480 / kg', 'High value'],
                  ['Aluminium', 'Weight', '₹85 – 120 / kg', 'Sheets, cans, pots'],
                  ['Hard Plastic', 'Weight', '₹8 – 15 / kg', 'PVC, HDPE'],
                  ['PET Bottles', 'Weight', '₹6 – 12 / kg', 'Crushed ok'],
                  ['Smartphones', 'Per Item', '₹100 – 800', 'Working adds value'],
                  ['Laptops', 'Per Item', '₹200 – 2000', 'Assessed on-site'],
                  ['Gold / Silver', 'Market Rate', 'Live spot price', 'Karatmeter tested'],
                  ['Glass', 'Weight', '₹3 – 8 / kg', 'No broken fine glass'],
                  ['Car Tyres', 'Per Item', '₹20 – 80 / tyre', 'Size dependent'],
                ].map(([mat, mode, rate, note], i) => (
                  <tr
                    key={mat}
                    className="border-b border-[#1a1a1a] hover:bg-[#171717] transition-colors"
                  >
                    <td className="font-mono text-sm text-[var(--offwhite)] py-3 px-4">{mat}</td>
                    <td className="py-3 px-4">
                      <span
                        className="tag text-[10px]"
                        style={{
                          color: mode === 'Weight' ? '#4ade80' : mode === 'Per Item' ? '#60a5fa' : '#f59e0b',
                          borderColor: mode === 'Weight' ? '#4ade80' : mode === 'Per Item' ? '#60a5fa' : '#f59e0b',
                          opacity: 0.7,
                        }}
                      >
                        {mode}
                      </span>
                    </td>
                    <td className="font-display text-lg py-3 px-4" style={{ color: 'var(--acid)' }}>
                      {rate}
                    </td>
                    <td className="font-mono text-xs text-[#555] py-3 px-4">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────── */}
      <section className="py-24 border-t border-[#1f1f1f] stripe-bg">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="tag text-[var(--acid)] border-[var(--acid)] mb-6 inline-block">
            Zero fees. Zero haggling.
          </div>
          <h2 className="font-display text-6xl md:text-9xl text-[var(--offwhite)] mb-6">
            READY TO<br />
            <span style={{ color: 'var(--acid)' }}>DUMP IT?</span>
          </h2>
          <p className="font-mono text-sm text-[#888880] max-w-md mx-auto mb-10">
            Takes 2 minutes to schedule. We handle the rest.
            Minimum pickup: 5 kg or any e-waste / valuables item.
          </p>
          <Link href="/schedule">
            <button className="btn-primary text-xl px-12 py-5 pulse-glow">
              📦 Schedule Your Free Pickup →
            </button>
          </Link>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="border-t border-[#1f1f1f] bg-[#0d0d0d] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="font-display text-2xl tracking-widest mb-3">
                DUMP<span style={{ color: 'var(--acid)' }}>them</span>all
              </div>
              <p className="font-mono text-xs text-[#555] leading-relaxed">
                India's cleanest scrap pickup service. We recycle responsibly.
              </p>
            </div>
            <div>
              <div className="font-display text-sm text-[#555] mb-3 tracking-widest">COMPANY</div>
              {['About Us', 'Careers', 'Blog', 'Press'].map(l => (
                <div key={l} className="font-mono text-xs text-[#888880] hover:text-[var(--acid)] py-1 cursor-pointer transition-colors">{l}</div>
              ))}
            </div>
            <div>
              <div className="font-display text-sm text-[#555] mb-3 tracking-widest">SERVICES</div>
              {['Home Pickup', 'Office Pickup', 'Bulk / Corporate', 'E-Waste Disposal', 'Pawn Valuation'].map(l => (
                <div key={l} className="font-mono text-xs text-[#888880] hover:text-[var(--acid)] py-1 cursor-pointer transition-colors">{l}</div>
              ))}
            </div>
            <div>
              <div className="font-display text-sm text-[#555] mb-3 tracking-widest">CONTACT</div>
              <div className="font-mono text-xs text-[#888880] py-1">📞 +91 98765 43210</div>
              <div className="font-mono text-xs text-[#888880] py-1">✉️ hello@dumpthemall.in</div>
              <div className="font-mono text-xs text-[#888880] py-1">📍 Hyderabad, Telangana</div>
              <div className="flex gap-3 mt-4">
                {['Instagram', 'Twitter', 'WhatsApp'].map(s => (
                  <div key={s} className="tag text-[10px] text-[#555] border-[#333] cursor-pointer hover:text-[var(--acid)] hover:border-[var(--acid)] transition-colors">{s}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-[#1a1a1a] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-mono text-xs text-[#444]">© 2025 DumpThemAll. All junk reserved.</span>
            <span className="font-mono text-xs text-[#444]">Made with ♻️ in Hyderabad</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
