import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LockScreen } from './components/LockScreen'
import { InvitationCard } from './components/InvitationCard'
import { GiftCursor } from './components/GiftCursor'
import './index.css'

type Stage = 'lock' | 'invite'

function App() {
  const [stage, setStage] = useState<Stage>('lock')

  return (
    <div className="relative min-h-screen overflow-hidden font-sans" style={{ cursor: 'none' }}>
      <AnimatePresence mode="wait">
        {stage === 'lock' && (
          <motion.div
            key="lock"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <LockScreen onUnlock={() => setStage('invite')} />
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
    </div>
  )
}

export default App
