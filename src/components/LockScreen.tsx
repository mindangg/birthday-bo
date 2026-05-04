import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { config } from '../data/config'

interface LockScreenProps {
  onUnlock: () => void
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [digits, setDigits] = useState<number[]>([0, 0, 0, 0])
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle')
  const [shakeKey, setShakeKey] = useState(0)

  const adjust = useCallback((index: number, delta: number) => {
    if (status !== 'idle') return
    setDigits(prev => {
      const next = [...prev]
      next[index] = (next[index] + delta + 10) % 10
      return next
    })
  }, [status])

  const checkCode = useCallback(() => {
    const entered = digits.join('')
    if (entered === config.lockCode) {
      setStatus('correct')
      setTimeout(() => onUnlock(), 2200)
    } else {
      setShakeKey(k => k + 1)
      setStatus('wrong')
      setTimeout(() => {
        setDigits([0, 0, 0, 0])
        setStatus('idle')
      }, 700)
    }
  }, [digits, onUnlock])

  const isCorrect = status === 'correct'

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-cream via-petal/40 to-blush/30 px-4">

      {/* Floating petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['🌸', '🌺', '✿', '🌸', '✿', '🌺'].map((p, i) => (
          <span
            key={i}
            className="absolute text-2xl opacity-30 animate-bounce"
            style={{
              left: `${10 + i * 15}%`,
              top: `${8 + (i % 3) * 12}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2 + i * 0.3}s`,
            }}
          >
            {p}
          </span>
        ))}
      </div>

      {/* Lock assembly */}
      <motion.div
        key={shakeKey}
        animate={status === 'wrong' ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col items-center"
      >
        {/* Outer wrapper — positions shackle + heart together */}
        <div className="relative" style={{ width: 360, height: 390 }}>

          {/* Shackle — legs reach absolute y≈112 (heart valley), arc shows above heart top (absolute y≈38) */}
          <motion.div
            className="absolute"
            style={{
              top: 0,
              left: '50%',
              x: '-50%',
              originX: '50%',
              originY: '100%',
              zIndex: 1,
            }}
            animate={
              isCorrect
                ? { rotate: -55, y: -18, opacity: 0 }
                : { rotate: 0, y: 0, opacity: 1 }
            }
            transition={
              isCorrect
                ? { duration: 1, ease: [0.4, 0, 0.2, 1] }
                : { duration: 0.2 }
            }
          >
            {/* Height 116px: legs at y=112 → absolute y=112 matches heart valley */}
            <svg width="96" height="116" viewBox="0 0 96 116" fill="none">
              <path
                d="M14 112 C14 16, 82 16, 82 112"
                stroke="#E8748A"
                strokeWidth="14"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </motion.div>

          {/* Heart SVG — zIndex 2 so it covers shackle legs */}
          <div className="absolute left-0 right-0" style={{ top: 38, bottom: 0, zIndex: 2 }}>
            <svg
              viewBox="0 0 360 352"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              style={{ filter: 'drop-shadow(0 10px 28px rgba(232,116,138,0.38))' }}
            >
              <defs>
                <linearGradient id="hg" x1="0%" y1="0%" x2="60%" y2="100%">
                  <stop offset="0%" stopColor="#F9A8B8" />
                  <stop offset="58%" stopColor="#E8748A" />
                  <stop offset="100%" stopColor="#C0506A" />
                </linearGradient>
                <radialGradient id="hglow" cx="38%" cy="32%" r="52%">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
              </defs>
              <path
                d="M180 330 C88 272, 10 212, 10 130 C10 75, 48 36, 104 36 C133 36, 158 50, 180 74 C202 50, 227 36, 256 36 C312 36, 350 75, 350 130 C350 212, 272 272, 180 330Z"
                fill="url(#hg)"
              />
              <path
                d="M180 330 C88 272, 10 212, 10 130 C10 75, 48 36, 104 36 C133 36, 158 50, 180 74 C202 50, 227 36, 256 36 C312 36, 350 75, 350 130 C350 212, 272 272, 180 330Z"
                fill="url(#hglow)"
              />
            </svg>
          </div>

          {/* Content overlay */}
          <div className="absolute left-0 right-0 flex flex-col items-center gap-4" style={{ top: 110, bottom: 0, zIndex: 3 }}>
            <p className="font-serif text-white/90 text-base text-center leading-snug tracking-wide drop-shadow-sm">
              Ngày bé chào đời
            </p>

            {/* Digit inputs */}
            <div className="flex gap-3">
              {digits.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <button
                    onClick={() => adjust(i, 1)}
                    className="text-white/80 hover:text-white transition-colors text-lg leading-none"
                    aria-label="tăng"
                  >
                    ▲
                  </button>
                  <div
                    className="w-12 bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/40 shadow-inner"
                    style={{ height: '3.25rem' }}
                  >
                    <span className="font-serif font-bold text-white text-2xl leading-none">
                      {d}
                    </span>
                  </div>
                  <button
                    onClick={() => adjust(i, -1)}
                    className="text-white/80 hover:text-white transition-colors text-lg leading-none"
                    aria-label="giảm"
                  >
                    ▼
                  </button>
                </div>
              ))}
            </div>

            {/* Status */}
            <div className="h-6 flex items-center">
              <AnimatePresence mode="wait">
                {status === 'correct' && (
                  <motion.p
                    key="correct"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white text-xs font-hand font-semibold"
                  >
                    🔓 Đúng rồi! Đang mở...
                  </motion.p>
                )}
                {status === 'wrong' && (
                  <motion.p
                    key="wrong"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white/90 text-xs font-hand font-semibold"
                  >
                    Sai rồi, thử lại nha~ 🙈
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Unlock button */}
        <motion.button
          onClick={checkCode}
          disabled={status !== 'idle'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-4 px-8 py-2.5 bg-rose text-white font-serif text-sm rounded-full shadow-lg hover:bg-rose/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Mở khóa 🔑
        </motion.button>

        {/* Hint */}
        <p className="mt-3 text-ink/40 text-xs font-sans tracking-widest">
          Gợi ý: ngày babi ra đời (DDMM)
        </p>
      </motion.div>
    </div>
  )
}
