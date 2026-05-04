import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onOpen: () => void
}

export const EnvelopeScreen = ({ onOpen }: Props) => {
  const [phase, setPhase] = useState<'idle' | 'opening' | 'done'>('idle')

  const handleClick = () => {
    if (phase !== 'idle') return
    setPhase('opening')
    setTimeout(onOpen, 2200)
  }

  const isOpening = phase === 'opening' || phase === 'done'

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-cream via-petal/30 to-blush/20 select-none">

      {/* Floating background petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['🌸', '💌', '✨', '🌺', '💕', '🌸', '✨', '💌'].map((emoji, i) => (
          <span
            key={i}
            className="absolute text-lg opacity-30 animate-bounce"
            style={{
              left: `${8 + i * 11}%`,
              top: `${6 + (i % 3) * 10}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2.5 + i * 0.25}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      {/* Tagline above */}
      <AnimatePresence>
        {!isOpening && (
          <motion.p
            key="tagline"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.25 } }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-hand text-rose/70 text-lg mb-10 relative z-10"
          >
            có thư tới rồi~
          </motion.p>
        )}
      </AnimatePresence>

      {/* Envelope wrapper */}
      <motion.div
        className="relative z-10"
        style={{ cursor: phase === 'idle' ? 'pointer' : 'default' }}
        onClick={handleClick}
        animate={
          isOpening
            ? { scale: 1, y: 0 }
            : {
                y: [0, -10, 0],
                transition: {
                  y: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
                },
              }
        }
        whileHover={!isOpening ? { scale: 1.04 } : {}}
        whileTap={!isOpening ? { scale: 0.97 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        {/* Envelope container */}
        <div
          className="relative"
          style={{ width: 300, height: 210, perspective: '900px' }}
        >

          {/* ── Envelope back body ── */}
          <div
            className="absolute inset-0 rounded-2xl border border-blush/50"
            style={{
              background: 'linear-gradient(160deg, #FFF8F0 60%, #FFE8EF 100%)',
              boxShadow: '0 12px 40px -8px rgba(232,116,138,0.25), 0 4px 12px -4px rgba(232,116,138,0.12)',
              zIndex: 0,
            }}
          />

          {/* ── Inner fold — bottom triangle ── */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: '55%',
              clipPath: 'polygon(0 100%, 50% 0%, 100% 100%)',
              background: 'linear-gradient(180deg, #FFD6E0 0%, #FBBFCC 100%)',
              zIndex: 1,
            }}
          />

          {/* ── Inner fold — left triangle ── */}
          <div
            className="absolute top-0 left-0 bottom-0"
            style={{
              width: '52%',
              clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
              background: 'linear-gradient(90deg, #FFD6E0 0%, #FFE8EF 100%)',
              zIndex: 1,
            }}
          />

          {/* ── Inner fold — right triangle ── */}
          <div
            className="absolute top-0 right-0 bottom-0"
            style={{
              width: '52%',
              clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
              background: 'linear-gradient(270deg, #FFD6E0 0%, #FFE8EF 100%)',
              zIndex: 1,
            }}
          />

          {/* ── Letter — height fit trong phần thân phong bì, trượt lên tự nhiên ── */}
          <motion.div
            className="absolute left-3 right-3 rounded-xl overflow-hidden"
            style={{
              top: 'calc(54% + 4px)',
              height: 112,
              background: 'linear-gradient(160deg, #fffbf8 0%, #fff0f5 100%)',
              border: '1px solid rgba(255,183,197,0.55)',
              boxShadow: '0 4px 16px rgba(232,116,138,0.1)',
              zIndex: 2,
            }}
            initial={{ y: 0 }}
            animate={
              isOpening
                ? { y: -168, transition: { delay: 0.72, duration: 1.15, ease: [0.25, 1, 0.35, 1] } }
                : { y: 0 }
            }
          >
            <div className="flex flex-col items-center justify-center h-full gap-1">
              <span className="text-xl">🎂</span>
              <p className="font-hand text-rose text-base leading-tight">Chúc mừng</p>
              <p className="font-hand text-rose text-base font-semibold leading-tight">sinh nhật Bo!</p>
            </div>
          </motion.div>

          {/* ── Cover — che thư khi còn trong phong bì ── */}
          <div
            style={{
              position: 'absolute',
              top: 'calc(54% + 1px)',
              left: 3,
              right: 3,
              bottom: 3,
              background: 'linear-gradient(180deg, #FFD6E0 0%, #FBBFCC 100%)',
              borderRadius: '0 0 14px 14px',
              zIndex: 3,
              pointerEvents: 'none',
            }}
          />

          {/* ── Flap — trượt lên trên khi mở ── */}
          <motion.div
            className="absolute top-0 left-0 right-0"
            style={{ height: '54%', zIndex: 4 }}
            animate={
              isOpening
                ? {
                    y: -130,
                    opacity: 0,
                    transition: {
                      delay: 0.18,
                      duration: 0.85,
                      ease: [0.4, 0, 0.15, 1],
                    },
                  }
                : { y: 0, opacity: 1 }
            }
          >
            <div
              className="absolute inset-0"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                background: 'linear-gradient(180deg, #FFB7C5 0%, #FBBFCC 55%, #FFD6E0 100%)',
              }}
            />
          </motion.div>

          {/* ── Wax seal — độc lập, canh giữa đường fold line ── */}
          <motion.div
            className="absolute flex items-center justify-center"
            style={{
              top: 'calc(54% - 22px)',
              left: '50%',
              translateX: '-50%',
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #E8748A 0%, #C85070 100%)',
              boxShadow: '0 2px 8px rgba(200,80,112,0.4)',
              zIndex: 5,
            }}
            animate={
              isOpening
                ? { scale: 0, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }
                : { scale: 1, opacity: 1 }
            }
          >
            <span className="text-white text-lg leading-none">🌸</span>
          </motion.div>

          {/* ── Envelope front body (covers inner when closed) ── */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'transparent',
              border: '1.5px solid rgba(255,183,197,0.6)',
              zIndex: 3,
              pointerEvents: 'none',
            }}
            animate={
              isOpening
                ? { opacity: 0, transition: { delay: 0.9, duration: 0.35 } }
                : { opacity: 1 }
            }
          />

        </div>
      </motion.div>

      {/* Hint text below */}
      <AnimatePresence>
        {!isOpening && (
          <motion.div
            key="hint"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: [0.5, 1, 0.5], y: 0 }}
            exit={{ opacity: 0, y: 6, transition: { duration: 0.2 } }}
            transition={{
              opacity: { repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.8 },
              y: { delay: 0.5, duration: 0.5 },
            }}
            className="mt-10 font-hand text-rose/60 text-base relative z-10"
          >
            nhấn để mở nhé~
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
