const REVIEWS = [
  {
    name: "Sarah Jenkins",
    role: "GM, The Rustic Spoon",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    text: "The digital booking is flawless. No sales calls, just immediate service. Our restaurant has never been cleaner, and the digital logs make health inspections a breeze."
  },
  {
    name: "David Chen",
    role: "Homeowner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    text: "Worth every penny. The technician was incredibly professional, and the transparent flat-rate pricing saved us from the usual industry upsells."
  },
  {
    name: "Elena Rostova",
    role: "Property Manager",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
    text: "Enterprise-grade reporting is a game changer for our property management firm. I can track treatments across 14 properties from one dashboard."
  },
  {
    name: "Marcus Thorne",
    role: "Operations Director",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    text: "We switched our entire corporate campus to NestGuard. The micro-encapsulation tech actually works without the toxic smell of traditional sprays."
  },
  {
    name: "Jessica L.",
    role: "Mother of 3",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
    text: "Finally, a pest control company that understands eco-safe treatments. My kids and dog are completely safe, and the ants are completely gone."
  }
]

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-[#FFFDF7] overflow-hidden relative">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          will-change: transform;
        }
        .pause-marquee:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-6 mb-14 text-center">
        <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-[#166534] mb-3">
          Client Feedback
        </p>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#171717]">
          Trusted by properties nationwide
        </h2>
      </div>

      <div className="relative w-full flex overflow-x-hidden pause-marquee">
        <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-[#FFFDF7] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-[#FFFDF7] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee space-x-6 px-3 py-4">
          {[...REVIEWS, ...REVIEWS].map((review, i) => (
            <div key={i} className="w-[340px] md:w-[420px] bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-[0_12px_30px_-8px_rgba(22,101,52,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col shrink-0">
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, starIndex) => (
                  <svg key={starIndex} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#F59E0B]">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-500 text-[0.95rem] leading-relaxed mb-8 flex-grow">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#F0FDF4]" />
                <div>
                  <h4 className="text-[0.95rem] font-bold text-[#171717]">{review.name}</h4>
                  <p className="text-[0.8rem] font-medium text-[#166534]">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}