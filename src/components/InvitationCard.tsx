import React from 'react'
import { motion } from 'framer-motion'
import { Floating3DCard } from './ui/3d-card'
import { config } from '../data/config'

export const InvitationCard: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-cream via-petal/30 to-blush/20 px-4 py-10">

      {/* Floating confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {['🌸', '🎀', '✨', '🌺', '🎊', '💕', '🌸', '✨', '🎀', '💕'].map((emoji, i) => (
          <span
            key={i}
            className="absolute text-xl opacity-40 animate-bounce"
            style={{
              left: `${5 + i * 9}%`,
              top: `${4 + (i % 4) * 8}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2.2 + i * 0.2}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="relative z-10 text-center mb-6"
      >
        <p className="font-hand text-rose text-2xl">cà phê sữa gửi bé ✉️</p>
      </motion.div>

      {/* 3D Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-xl"
      >
        <Floating3DCard className="w-full max-w-xl rounded-3xl border border-blush/60 bg-white shadow-xl shadow-blush/20">
          {/* Card inner content */}
          <div className="p-5 flex flex-col gap-3">

            {/* Top decoration */}
            <div className="flex justify-center gap-2 text-2xl" style={{ transform: 'translateZ(40px)' }}>
              🌸 🎂 🌸
            </div>

            {/* Title */}
            <div className="text-center" style={{ transform: 'translateZ(50px)' }}>
              <h1 className="font-hand text-rose text-4xl font-bold leading-tight">
                Chúc mừng sinh nhật!
              </h1>
              <p className="font-serif italic text-ink/60 text-sm mt-1">
                một điều nho nhỏ dành riêng cho em~
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3" style={{ transform: 'translateZ(30px)' }}>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blush to-transparent" />
              <span className="text-blush text-sm">✿</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blush to-transparent" />
            </div>

            {/* Dear */}
            <p className="font-serif text-ink text-lg" style={{ transform: 'translateZ(50px)' }}>
              Dear <span className="text-rose font-semibold">{config.recipient}</span>,
            </p>

            {/* Message */}
            <p
              className="font-hand text-ink/70 text-lg leading-relaxed italic"
              style={{ transform: 'translateZ(45px)' }}
            >
              "{config.message}"
            </p>

            {/* Event details */}
            <div className="flex flex-col gap-2 bg-petal/30 rounded-2xl p-4" style={{ transform: 'translateZ(55px)' }}>
              <div className="flex items-center gap-3 text-sm">
                <div>
                  <p className="font-sans font-medium text-ink/80 text-xs uppercase tracking-wider">Ngày & Giờ</p>
                  <p className="font-serif text-ink">{config.eventDate} · {config.eventTime}</p>
                </div>
              </div>
            </div>

            {/* Itinerary */}
            <div style={{ transform: 'translateZ(40px)' }}>
              <p className="font-serif text-ink/60 text-xs uppercase tracking-widest mb-3">Kế hoạch nhỏ của chúng mình</p>
              <div className="flex flex-col gap-2">
                {config.itinerary.map((stop, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-base w-6 text-center flex-shrink-0">{stop.icon}</span>
                    <div className="flex-1 flex items-baseline gap-2">
                      <span className="font-sans text-ink/50 text-xs w-12 flex-shrink-0">{stop.time}</span>
                      <span className="font-serif text-ink/80 text-sm">{stop.activity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3" style={{ transform: 'translateZ(30px)' }}>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blush to-transparent" />
              <span className="text-blush text-sm">✿</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blush to-transparent" />
            </div>

            {/* Footer */}
            <div className="text-center" style={{ transform: 'translateZ(35px)' }}>
              <p className="font-hand text-rose text-xl">with love,</p>
              <p className="font-hand text-rose text-2xl font-semibold mt-0.5">{config.from} 💕</p>
            </div>
          </div>
        </Floating3DCard>
      </motion.div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="relative z-10 mt-6 text-ink/35 text-xs font-sans tracking-wide"
      >
        di chuột lên thiệp để xem phép màu nhỏ ✨
      </motion.p>
    </div>
  )
}
