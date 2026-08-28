'use client'

import { useState } from 'react'
import { createOrder } from '@/app/auth/actions'

const PROPERTY_SIZES = [
  { id: 'small', label: 'Up to 1,500 sq ft', multiplier: 1 },
  { id: 'medium', label: '1,500 - 2,500 sq ft', multiplier: 1.3 },
  { id: 'large', label: '2,500 - 4,000 sq ft', multiplier: 1.6 },
]

export default function CheckoutClient({ tier }: { tier: any }) {
  const [size, setSize] = useState(PROPERTY_SIZES[0])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  
  // Promo code state
  const [promoCode, setPromoCode] = useState('')
  const [promoError, setPromoError] = useState<string | null>(null)
  const [discountPercent, setDiscountPercent] = useState(0)
  
  // Price calculations
  const basePrice = Math.round(tier.price * size.multiplier)
  const discountAmount = Math.round(basePrice * discountPercent)
  const finalPrice = basePrice - discountAmount

  const handleApplyPromo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault() // Prevent form submission
    setPromoError(null)
    
    if (promoCode.trim().toUpperCase() === 'WELCOME30') {
      setDiscountPercent(0.30) // 30% discount
    } else {
      setDiscountPercent(0)
      setPromoError('Invalid or expired promo code.')
    }
  }

  const formAction = async (formData: FormData) => {
    setErrorMessage(null)
    const result = await createOrder(formData)
    
    if (result?.error) {
      setErrorMessage(result.error)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
      {/* Left Column (Detailed Service Inclusions) remains exactly the same */}
      <div>
        <h1 className="text-3xl font-black tracking-tight mb-4">{tier.name}</h1>
        <p className="text-gray-500 mb-8">{tier.description}</p>
        
        <div className="bg-[#F0FDF4]/50 border border-[#bbf7d0] rounded-2xl p-6 mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#166534] mb-4">Treatment Inclusions</h3>
          <ul className="space-y-3">
            {tier.inclusions?.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#171717]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[#4ADE80] shrink-0">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Covered Pests</h3>
          <p className="text-sm font-medium text-gray-600">{tier.pests}</p>
        </div>
      </div>
      
      {/* Right Column: Dynamic Pricing & Form */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] h-fit">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#166534] mb-6">Property Size & Booking</h3>
        
        {/* Size Selectors */}
        <div className="mb-8 space-y-3">
          {PROPERTY_SIZES.map((p) => (
            <label key={p.id} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${size.id === p.id ? 'border-[#166534] bg-[#F0FDF4] shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}>
              <div className="flex items-center gap-3">
                <input 
                  type="radio" 
                  name="propertySize" 
                  checked={size.id === p.id} 
                  onChange={() => setSize(p)}
                  className="w-4 h-4 text-[#166534] focus:ring-[#166534]" 
                />
                <span className="text-sm font-bold text-[#171717]">{p.label}</span>
              </div>
            </label>
          ))}
        </div>

        {/* Promo Code Input */}
        <div className="mb-6">
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Promo Code" 
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#166534] outline-none uppercase"
            />
            <button 
              onClick={handleApplyPromo}
              className="px-6 py-3 bg-[#171717] text-white rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-[#166534] transition-colors"
            >
              Apply
            </button>
          </div>
          {promoError && <p className="text-[#9B1C1C] text-xs font-medium mt-2">{promoError}</p>}
          {discountPercent > 0 && <p className="text-[#166534] text-xs font-bold mt-2">Promo code applied successfully!</p>}
        </div>

        {/* Price Breakdown */}
        <div className="pt-6 border-t border-gray-100 mb-8 space-y-2">
          {discountPercent > 0 && (
            <div className="flex justify-between items-end text-sm">
              <span className="font-bold text-gray-500">Subtotal</span>
              <span className="font-medium text-gray-500">${basePrice}</span>
            </div>
          )}
          {discountPercent > 0 && (
            <div className="flex justify-between items-end text-sm">
              <span className="font-bold text-[#166534]">Discount (30%)</span>
              <span className="font-medium text-[#166534]">-${discountAmount}</span>
            </div>
          )}
          <div className="flex justify-between items-end pt-2">
            <span className="text-sm font-bold text-gray-500">Total</span>
            <span className="text-4xl font-black text-[#171717]">${finalPrice}</span>
          </div>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="mb-6 px-4 py-3 bg-[#FFF0F0] border border-[#FECDCD] text-[#9B1C1C] rounded-lg text-sm font-medium">
            {errorMessage}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="serviceId" value={tier.id} />
          <input type="hidden" name="finalPrice" value={finalPrice} />
          
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="firstName" placeholder="First Name" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#166534] outline-none" />
            <input type="text" name="lastName" placeholder="Last Name" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#166534] outline-none" />
          </div>

          <input type="text" name="address" placeholder="Service Address" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#166534] outline-none" />
          <input type="date" name="scheduledDate" required min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#166534] outline-none cursor-pointer" />
          
          <button type="submit" className="w-full py-4 mt-2 rounded-xl font-bold text-sm uppercase tracking-widest bg-[#171717] text-white hover:bg-[#166534] transition-colors">
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  )
}