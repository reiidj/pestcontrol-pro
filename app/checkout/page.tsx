import { redirect } from 'next/navigation'
import Navbar from '@/components/NavBar'
import CheckoutClient from './CheckoutClient'

// Expanded Tier Data
const SERVICE_TIERS = [
  {
    id: '11111111-1111-4111-8111-111111111111',
    name: 'Exterior Perimeter Shield',
    description: 'A highly effective exterior barrier designed to keep pests from entering your home in the first place.',
    price: 89,
    inclusions: [
      'Exterior foundation barrier treatment (up to 3ft up, 3ft out)',
      'Wasp and hornet nest removal (first floor eaves)',
      'Basic yard perimeter inspection',
      'Spider web sweeping (eaves and lower windows)'
    ],
    pests: 'Ants, Spiders, Wasps, Millipedes, Crickets'
  },
  {
    id: '22222222-2222-4222-8222-222222222222',
    name: 'Complete Home Protection',
    description: 'Comprehensive interior and exterior coverage for standard residential properties.',
    price: 129,
    inclusions: [
      'Everything in Tier 01 Exterior Shield',
      'Interior baseboard and entry-point treatment',
      'Rodent monitoring and bait stations',
      'Targeted roach and ant gel baits in kitchen/baths'
    ],
    pests: 'Tier 1 + Mice, Rats, Roaches, Silverfish'
  },
  {
    id: '33333333-3333-4333-8333-333333333333',
    name: 'Premium Eco-Guard',
    description: 'Maximum protection utilizing eco-botanical formulas, safe for families and heavy foliage properties.',
    price: 189,
    inclusions: [
      'Everything in Tier 02 Complete Protection',
      'Mosquito and Tick yard fogging',
      'Eco-botanical indoor misting',
      'Attic and crawlspace preventative dusting'
    ],
    pests: 'Tier 2 + Mosquitoes, Ticks, Fleas, Carpet Beetles'
  }
]

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ serviceId?: string }>
}) {
  const params = await searchParams
  const serviceId = params.serviceId

  const selectedTier = SERVICE_TIERS.find(t => t.id === serviceId)

  if (!selectedTier) {
    redirect('/#services')
  }

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#171717] font-sans">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-24 pt-32">
        <CheckoutClient tier={selectedTier} />
      </main>
    </div>
  )
}