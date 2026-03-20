'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '../../components/Navbar'

const MOCK_STATUSES = [
  { id: 'DTA123456', status: 3, agent: 'Ravi K.', phone: '+91 9876501234', date: '2025-08-10', slot: '10:00 AM – 12:00 PM', items: 'Metal, Books, Plastic' },
  { id: 'DTA654321', status: 1, agent: 'Suresh M.', phone: '+91 9876509876', date: '2025-08-12', slot: '2:00 PM – 4:00 PM', items: 'E-Waste, Glass' },
]

const STATUS_STEPS = [
  { label: 'Booked', desc: 'Your pickup request is confirmed.' },
  { label: 'Agent Assigned', desc: 'A pickup agent has been assigned.' },
  { label: 'On the Way', desc: 'Your agent is heading to your location.' },
  { label: 'At Location', desc: 'Agent has arrived. Weighing in progress.' },
  { label: 'Completed', desc: 'Pickup done! Payment settled.' },
]

export default function TrackPage() {
  const [orderId, setOrderId] = useState('')
  const [phone, setPhone] = useState('')
  const [result, setResult] = useState(null)
  const [notFound, setNotFound] = useState(false)

  const handleTrack = () => {
    setNotFound(false)
    setResult(null)
    const found = MOCK_STATUSES.find(
      s => s.id.toLowerCase() === orderId.trim().toLowerCase()
    )
    if (found) {
      setResult(found)
    } else {
      setNotFound(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#111]">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 pt-28 pb-16">
        <Link href="/" className="font-mono text-xs text-[#555] hover:text-[var(--acid)] transition-colors inline-flex items-center gap-2 mb-8">
          ← Back to Home
        </Link>

        <div className="mb-10">
          <div className="tag text-[var(--muted)] border-[#333] mb-3">Live Status</div>
          <h1 className="font-display text-5xl md:text-6xl text-[var(--offwhite)] mb-2">
            TRACK YOUR<br />
            <span style={{ color: 'var(--acid)' }}>PICKUP</span>
          </h1>
        </div>

        {/* Search form */}
        <div className="card p-6 mb-8">
          <div className="flex flex-col gap-4">
            <div>
              <label className="font-mono text-xs text-[#888880] uppercase tracking-widest block mb-2">
                Order ID
              </label>
              <input
                className="input-field"
                placeholder="e.g. DTA123456"
                value={orderId}
                onChange={e => setOrderId(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleTrack()}
              />
            </div>
            <button onClick={handleTrack} className="btn-primary w-full justify-center">
              🔍 Track Pickup
            </button>
          </div>
          <p className="font-mono text-xs text-[#555] mt-3">
            Demo IDs: <span style={{ color: 'var(--acid)' }}>DTA123456</span> (in progress) · <span style={{ color: 'var(--acid)' }}>DTA654321</span> (assigned)
          </p>
        </div>

        {/* Not found */}
        {notFound && (
          <div className="border border-[var(--rust)] bg-[#1a0a0a] p-5 font-mono text-sm text-[var(--rust)]">
            ⚠️ No pickup found with that ID. Check the SMS you received, or{' '}
            <a href="tel:+919876543210" style={{ color: 'var(--acid)' }}>call support</a>.
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="animate-fade-in-up">
            <div className="card p-6 mb-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="font-mono text-xs text-[#555] mb-1">ORDER ID</div>
                  <div className="font-display text-2xl" style={{ color: 'var(--acid)' }}>{result.id}</div>
                </div>
                <div
                  className="tag text-sm px-3 py-2"
                  style={{ color: result.status >= 4 ? '#4ade80' : 'var(--acid)', borderColor: result.status >= 4 ? '#4ade80' : 'var(--acid)' }}
                >
                  {STATUS_STEPS[result.status].label}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="font-mono text-xs text-[#555] mb-1">DATE</div>
                  <div className="font-mono text-sm text-[var(--offwhite)]">{result.date}</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-[#555] mb-1">TIME SLOT</div>
                  <div className="font-mono text-sm text-[var(--offwhite)]">{result.slot}</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-[#555] mb-1">AGENT</div>
                  <div className="font-mono text-sm text-[var(--offwhite)]">{result.agent}</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-[#555] mb-1">AGENT PHONE</div>
                  <a href={`tel:${result.phone}`} className="font-mono text-sm transition-colors" style={{ color: 'var(--acid)' }}>
                    {result.phone}
                  </a>
                </div>
                <div className="col-span-2">
                  <div className="font-mono text-xs text-[#555] mb-1">ITEMS</div>
                  <div className="font-mono text-sm text-[var(--offwhite)]">{result.items}</div>
                </div>
              </div>

              {/* Progress track */}
              <div className="border-t border-[#222] pt-5">
                <div className="font-mono text-xs text-[#555] mb-4 uppercase tracking-widest">Pickup Progress</div>
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-[11px] top-3 bottom-3 w-px bg-[#222]" />

                  <div className="flex flex-col gap-5">
                    {STATUS_STEPS.map((s, i) => {
                      const done = i < result.status
                      const current = i === result.status
                      return (
                        <div key={s.label} className="flex items-start gap-4 relative z-10">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs"
                            style={{
                              background: done ? '#333' : current ? 'var(--acid)' : '#1a1a1a',
                              border: done ? '1px solid #444' : current ? '2px solid var(--acid)' : '1px solid #2a2a2a',
                              color: done ? '#555' : current ? '#111' : '#333',
                              boxShadow: current ? '0 0 12px rgba(212,255,0,0.4)' : 'none',
                            }}
                          >
                            {done ? '✓' : i + 1}
                          </div>
                          <div>
                            <div
                              className={`font-display text-lg ${current ? '' : done ? 'text-[#555]' : 'text-[#333]'}`}
                              style={{ color: current ? 'var(--acid)' : undefined }}
                            >
                              {s.label}
                            </div>
                            <div className="font-mono text-xs text-[#555]">{s.desc}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <a href={`tel:${result.phone}`} className="flex-1">
                <button className="btn-outline w-full justify-center text-sm py-3">
                  📞 Call Agent
                </button>
              </a>
              <Link href="/" className="flex-1">
                <button className="btn-primary w-full justify-center text-sm py-3">
                  ← Home
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
