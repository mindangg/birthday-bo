import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export const GiftCursor = () => {
  const [visible, setVisible] = useState(false)
  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)
  const x = useSpring(rawX, { stiffness: 300, damping: 28 })
  const y = useSpring(rawY, { stiffness: 300, damping: 28 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const hide = () => setVisible(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', hide)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', hide)
    }
  }, [rawX, rawY, visible])

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] select-none"
      style={{ x, y, translateX: '-50%', translateY: '-50%', opacity: visible ? 1 : 0 }}
    >
      <img
        src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/gift-3.png"
        alt=""
        style={{ width: 48, height: 48, objectFit: 'contain' }}
      />
    </motion.div>
  )
}
