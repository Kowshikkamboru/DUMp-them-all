'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '../../components/Navbar'

const CATEGORIES = [
  { id: 'books', icon: '📚', name: 'Books & Paper', unit: 'kg', hint: 'Est. weight in kg' },
  { id: 'metal', icon: '🔩', name: 'Metal & Steel', unit: 'kg', hint: 'Est. weight in kg' },
  { id: 'plastic', icon: '🧴', name: 'Plastic & PET', unit: 'kg', hint: 'Est. weight in kg' },
  { id: 'ewaste', icon: '📱', name: 'E-Waste', unit: 'items', hint: 'No. of items' },
  { id: 'valuables', icon: '💎', name: 'Valuables / Pawn', unit: 'items', hint: 'No. of items' },
  { id: 'glass', icon: '🪟', name: 'Glass & Rubber', unit: 'kg', hint: 'Est. weight in kg' },
  { id: 'other', icon: '🗂️', name: 'Other', unit: 'kg', hint: 'Describe in notes' },
]

const TIME_SLOTS = ['8:00 AM – 10:00 AM', '10:00 AM – 12:00 PM', '12:00 PM – 2:00 PM', '2:00 PM – 4:00 PM', '4:00 PM – 6:00 PM']

const PAYMENT_METHODS = [
  { id: 'cash', label: '💵 Cash', desc: 'Handed on the spot' },
  { id: 'upi', label: '📲 UPI', desc: 'Instant transfer' },
  { id: 'bank', label: '🏦 Bank Transfer', desc: 'Same day NEFT' },
]

function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className={`step-dot ${i < current ? 'done' : i === current ? 'active' : ''}`} />
          {i < total - 1 && (
            <div className={`h-px w-12 transition-colors ${i < current ? 'bg-[#555]' : 'bg-[#222]'}`} />
          )}
        </div>
      ))}
      <span className="font-mono text-xs text-[#555] ml-2">Step {current + 1} of {total}</span>
    </div>
  )
}

export default function SchedulePage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    address: '', city: '', pincode: '',
    items: {},
    notes: '',
    date: '',
    timeSlot: '',
    payment: 'upi',
    orderId: '',
  })
  const [errors, setErrors] = useState({})

  const today = new Date()
  const minDate = new Date(today)
  minDate.setDate(minDate.getDate() + 1)
  const maxDate = new Date(today)
  maxDate.setDate(maxDate.getDate() + 30)
  const formatDate = d => d.toISOString().split('T')[0]

  const updateForm = (key, val) => setForm(prev => ({ ...prev, [key]: val }))
  const updateItem = (id, val) => setForm(prev => ({
    ...prev,
    items: { ...prev.items, [id]: val },
  }))

  const validateStep = () => {
    const e = {}
    if (step === 0) {
      if (!form.name.trim()) e.name = 'Name required'
      if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Valid 10-digit mobile required'
      if (!form.address.trim()) e.address = 'Address required'
      if (!form.pincode.match(/^\d{6}$/)) e.pincode = 'Valid 6-digit pincode required'
    }
    if (step === 1) {
      const hasItem = Object.values(form.items).some(v => v && Number(v) > 0)
      if (!hasItem) e.items = 'Select at least one category with an estimate'
    }
    if (step === 2) {
      if (!form.date) e.date = 'Please pick a date'
      if (!form.timeSlot) e.timeSlot = 'Please pick a time slot'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const nextStep = () => {
    if (validateStep()) {
      if (step === 3) {
        // Submit
        const id = 'DTA' + Date.now().toString().slice(-6)
        updateForm('orderId', id)
        setStep(4)
      } else {
        setStep(s => s + 1)
      }
    }
  }

  const prevStep = () => setStep(s => Math.max(0, s - 1))

  const selectedCats = CATEGORIES.filter(c => form.items[c.id] && Number(form.items[c.id]) > 0)

  return (
    <div className="min-h-screen bg-[#111]">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 pt-28 pb-16">

        {/* Header */}
        {step < 4 && (
          <div className="mb-10">
            <Link href="/" className="font-mono text-xs text-[#555] hover:text-[var(--acid)] transition-colors inline-flex items-center gap-2 mb-6">
              ← Back to Home
            </Link>
            <div className="tag text-[var(--muted)] border-[#333] mb-3">Free Pickup</div>
            <h1 className="font-display text-5xl md:text-6xl text-[var(--offwhite)] mb-2">
              SCHEDULE<br />
              <span style={{ color: 'var(--acid)' }}>YOUR DUMP</span>
            </h1>
            <p className="font-mono text-xs text-[#888880]">Takes 2 minutes. We come to you.</p>
          </div>
        )}

        {step < 4 && <StepIndicator current={step} total={4} />}

        {/* ── STEP 0: Personal Details ── */}
        {step === 0 && (
          <div className="animate-fade-in-up">
            <h2 className="font-display text-3xl text-[var(--offwhite)] mb-6">YOUR DETAILS</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="font-mono text-xs text-[#888880] uppercase tracking-widest block mb-2">Full Name *</label>
                <input
                  className="input-field"
                  placeholder="Koushik Amboru"
                  value={form.name}
                  onChange={e => updateForm('name', e.target.value)}
                />
                {errors.name && <span className="font-mono text-xs text-[var(--rust)] mt-1 block">{errors.name}</span>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs text-[#888880] uppercase tracking-widest block mb-2">Phone *</label>
                  <input
                    className="input-field"
                    placeholder="9876543210"
                    maxLength={10}
                    value={form.phone}
                    onChange={e => updateForm('phone', e.target.value.replace(/\D/g, ''))}
                  />
                  {errors.phone && <span className="font-mono text-xs text-[var(--rust)] mt-1 block">{errors.phone}</span>}
                </div>
                <div>
                  <label className="font-mono text-xs text-[#888880] uppercase tracking-widest block mb-2">Email (optional)</label>
                  <input
                    className="input-field"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => updateForm('email', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-xs text-[#888880] uppercase tracking-widest block mb-2">Pickup Address *</label>
                <textarea
                  className="input-field resize-none"
                  rows={3}
                  placeholder="House no., Street, Landmark..."
                  value={form.address}
                  onChange={e => updateForm('address', e.target.value)}
                />
                {errors.address && <span className="font-mono text-xs text-[var(--rust)] mt-1 block">{errors.address}</span>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs text-[#888880] uppercase tracking-widest block mb-2">City</label>
                  <input
                    className="input-field"
                    placeholder="Hyderabad"
                    value={form.city}
                    onChange={e => updateForm('city', e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-[#888880] uppercase tracking-widest block mb-2">Pincode *</label>
                  <input
                    className="input-field"
                    placeholder="500032"
                    maxLength={6}
                    value={form.pincode}
                    onChange={e => updateForm('pincode', e.target.value.replace(/\D/g, ''))}
                  />
                  {errors.pincode && <span className="font-mono text-xs text-[var(--rust)] mt-1 block">{errors.pincode}</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 1: Select Items ── */}
        {step === 1 && (
          <div className="animate-fade-in-up">
            <h2 className="font-display text-3xl text-[var(--offwhite)] mb-2">WHAT ARE YOU DUMPING?</h2>
            <p className="font-mono text-xs text-[#888880] mb-6">
              Rough estimate is fine — we'll weigh on-site. Enter 0 to skip.
            </p>

            {errors.items && (
              <div className="font-mono text-xs text-[var(--rust)] mb-4 border border-[var(--rust)] border-opacity-30 p-3 bg-[#1a0a0a]">
                {errors.items}
              </div>
            )}

            <div className="flex flex-col gap-3">
              {CATEGORIES.map(cat => {
                const isSelected = form.items[cat.id] && Number(form.items[cat.id]) > 0
                return (
                  <div
                    key={cat.id}
                    className={`flex items-center gap-4 p-4 border transition-all ${isSelected ? 'border-[var(--acid)] bg-[#161a0d]' : 'border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#3a3a3a]'}`}
                  >
                    <div className="text-2xl w-10 text-center flex-shrink-0">{cat.icon}</div>
                    <div className="flex-1">
                      <div className={`font-display text-lg ${isSelected ? 'text-[var(--acid)]' : 'text-[var(--offwhite)]'}`}>
                        {cat.name}
                      </div>
                      <div className="font-mono text-xs text-[#555]">{cat.hint}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        className="input-field w-24 text-center text-sm"
                        placeholder="0"
                        value={form.items[cat.id] || ''}
                        onChange={e => updateItem(cat.id, e.target.value)}
                      />
                      <span className="font-mono text-xs text-[#555] w-8">{cat.unit}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6">
              <label className="font-mono text-xs text-[#888880] uppercase tracking-widest block mb-2">
                Special Notes / Valuables Description
              </label>
              <textarea
                className="input-field resize-none"
                rows={3}
                placeholder="E.g. 'I have a gold chain (~10g) and an old Canon camera'..."
                value={form.notes}
                onChange={e => updateForm('notes', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* ── STEP 2: Date & Time ── */}
        {step === 2 && (
          <div className="animate-fade-in-up">
            <h2 className="font-display text-3xl text-[var(--offwhite)] mb-6">PICK A SLOT</h2>

            <div className="mb-6">
              <label className="font-mono text-xs text-[#888880] uppercase tracking-widest block mb-2">Pickup Date *</label>
              <input
                type="date"
                className="input-field"
                min={formatDate(minDate)}
                max={formatDate(maxDate)}
                value={form.date}
                onChange={e => updateForm('date', e.target.value)}
              />
              {errors.date && <span className="font-mono text-xs text-[var(--rust)] mt-1 block">{errors.date}</span>}
              <p className="font-mono text-xs text-[#555] mt-2">Available: Tomorrow – 30 days out. 7 days a week.</p>
            </div>

            <div>
              <label className="font-mono text-xs text-[#888880] uppercase tracking-widest block mb-3">Time Slot *</label>
              <div className="grid grid-cols-1 gap-2">
                {TIME_SLOTS.map(slot => (
                  <button
                    key={slot}
                    onClick={() => updateForm('timeSlot', slot)}
                    className={`text-left px-5 py-4 border font-mono text-sm transition-all ${form.timeSlot === slot
                      ? 'border-[var(--acid)] bg-[#161a0d] text-[var(--acid)]'
                      : 'border-[#2a2a2a] text-[#888880] hover:border-[#444]'
                      }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {errors.timeSlot && <span className="font-mono text-xs text-[var(--rust)] mt-2 block">{errors.timeSlot}</span>}
            </div>
          </div>
        )}

        {/* ── STEP 3: Payment & Review ── */}
        {step === 3 && (
          <div className="animate-fade-in-up">
            <h2 className="font-display text-3xl text-[var(--offwhite)] mb-6">REVIEW & PAYMENT PREFERENCE</h2>

            {/* Summary card */}
            <div className="card p-6 mb-6">
              <div className="font-display text-sm text-[#555] tracking-widest mb-4">PICKUP SUMMARY</div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="font-mono text-xs text-[#555] mb-1">NAME</div>
                  <div className="font-mono text-sm text-[var(--offwhite)]">{form.name}</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-[#555] mb-1">PHONE</div>
                  <div className="font-mono text-sm text-[var(--offwhite)]">{form.phone}</div>
                </div>
                <div className="col-span-2">
                  <div className="font-mono text-xs text-[#555] mb-1">ADDRESS</div>
                  <div className="font-mono text-sm text-[var(--offwhite)]">{form.address}, {form.city} – {form.pincode}</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-[#555] mb-1">DATE</div>
                  <div className="font-mono text-sm" style={{ color: 'var(--acid)' }}>{form.date}</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-[#555] mb-1">TIME SLOT</div>
                  <div className="font-mono text-sm" style={{ color: 'var(--acid)' }}>{form.timeSlot}</div>
                </div>
              </div>

              <div className="border-t border-[#2a2a2a] pt-4">
                <div className="font-mono text-xs text-[#555] mb-3">ITEMS TO DUMP</div>
                <div className="flex flex-col gap-2">
                  {selectedCats.map(cat => (
                    <div key={cat.id} className="flex items-center justify-between">
                      <span className="font-mono text-sm text-[var(--offwhite)]">{cat.icon} {cat.name}</span>
                      <span className="font-mono text-sm text-[#888880]">~{form.items[cat.id]} {cat.unit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {form.notes && (
                <div className="border-t border-[#2a2a2a] pt-4 mt-4">
                  <div className="font-mono text-xs text-[#555] mb-1">NOTES</div>
                  <div className="font-mono text-xs text-[#888880]">{form.notes}</div>
                </div>
              )}
            </div>

            {/* Payment method */}
            <div>
              <label className="font-mono text-xs text-[#888880] uppercase tracking-widest block mb-3">
                Preferred Payment Method
              </label>
              <div className="grid grid-cols-3 gap-3">
                {PAYMENT_METHODS.map(pm => (
                  <button
                    key={pm.id}
                    onClick={() => updateForm('payment', pm.id)}
                    className={`text-center px-3 py-4 border transition-all ${form.payment === pm.id
                      ? 'border-[var(--acid)] bg-[#161a0d]'
                      : 'border-[#2a2a2a] hover:border-[#444]'
                      }`}
                  >
                    <div className="font-mono text-sm text-[var(--offwhite)] mb-1">{pm.label}</div>
                    <div className="font-mono text-[10px] text-[#555]">{pm.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 border border-[#222] bg-[#141414]">
              <p className="font-mono text-xs text-[#888880]">
                ⚠️ Final payout is determined after on-site weighing and inspection. No upfront charges. You can decline any item valuation on the spot.
              </p>
            </div>
          </div>
        )}

        {/* ── STEP 4: Confirmation ── */}
        {step === 4 && (
          <div className="animate-fade-in-up text-center py-8">
            <div
              className="w-20 h-20 mx-auto mb-6 flex items-center justify-center text-4xl"
              style={{ background: 'var(--acid)', clipPath: 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)' }}
            >
              ✅
            </div>
            <div className="tag text-[var(--acid)] border-[var(--acid)] mb-4 inline-block">
              Pickup Booked!
            </div>
            <h2 className="font-display text-5xl text-[var(--offwhite)] mb-2">
              YOU'RE ALL SET,
              <br />
              <span style={{ color: 'var(--acid)' }}>{form.name.split(' ')[0].toUpperCase()}!</span>
            </h2>

            <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 my-8 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-mono text-xs text-[#555] mb-1">ORDER ID</div>
                  <div className="font-display text-xl" style={{ color: 'var(--acid)' }}>{form.orderId || 'DTA' + Date.now().toString().slice(-6)}</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-[#555] mb-1">PAYMENT</div>
                  <div className="font-mono text-sm text-[var(--offwhite)]">{PAYMENT_METHODS.find(p => p.id === form.payment)?.label}</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-[#555] mb-1">PICKUP DATE</div>
                  <div className="font-mono text-sm text-[var(--offwhite)]">{form.date}</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-[#555] mb-1">TIME SLOT</div>
                  <div className="font-mono text-sm text-[var(--offwhite)]">{form.timeSlot}</div>
                </div>
              </div>
            </div>

            <p className="font-mono text-sm text-[#888880] max-w-sm mx-auto mb-8">
              You'll receive an SMS confirmation on <span style={{ color: 'var(--acid)' }}>+91 {form.phone}</span> within 30 minutes. Our agent will call 1 hour before arrival.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/track">
                <button className="btn-outline">
                  📍 Track My Pickup
                </button>
              </Link>
              <Link href="/">
                <button className="btn-primary">
                  ← Back to Home
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#222]">
            {step > 0 ? (
              <button onClick={prevStep} className="btn-outline text-sm py-3 px-6">
                ← Back
              </button>
            ) : (
              <div />
            )}
            <button onClick={nextStep} className="btn-primary text-sm py-3 px-8">
              {step === 3 ? '✅ Confirm Pickup' : 'Next →'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
