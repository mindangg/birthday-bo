import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LockScreen } from './components/LockScreen'
import { EnvelopeScreen } from './components/EnvelopeScreen'
import { InvitationCard } from './components/InvitationCard'
import { GiftCursor } from './components/GiftCursor'
import './index.css'

type Stage = 'lock' | 'envelope' | 'invite'

function App() {
  const [stage, setStage] = useState<Stage>('lock')
  const [musicStarted, setMusicStarted] = useState(false)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const startMusic = () => {
    if (!audioRef.current || musicStarted) return
    audioRef.current.play().then(() => {
      setMusicStarted(true)
    }).catch(console.error)
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !audioRef.current.muted
    setMuted(prev => !prev)
  }

  return (
    <div className="relative min-h-screen overflow-hidden font-sans" style={{ cursor: 'none' }}>
      <audio ref={audioRef} src="/music.MP3" loop preload="auto" />
      <AnimatePresence mode="wait">
        {stage === 'lock' && (
          <motion.div
            key="lock"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <LockScreen onUnlock={() => setStage('envelope')} onMusicStart={startMusic} />
          </motion.div>
        )}

        {stage === 'envelope' && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.55 }}
            className="absolute inset-0"
          >
            <EnvelopeScreen onOpen={() => setStage('invite')} />
          </motion.div>
        )}

        {stage === 'invite' && (
          <motion.div
            key="invite"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 overflow-y-auto"
          >
            <InvitationCard />
          </motion.div>
        )}
      </AnimatePresence>
      <GiftCursor />
      {musicStarted && (
        <button
          onClick={toggleMute}
          className="fixed bottom-4 right-4 z-50 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-lg shadow-lg hover:bg-white/30 transition-colors"
          style={{ cursor: 'default' }}
          aria-label={muted ? 'Bật nhạc' : 'Tắt nhạc'}
        >
          {muted ? '🔇' : '🎵'}
        </button>
      )}
    </div>
  )
}

export default App
