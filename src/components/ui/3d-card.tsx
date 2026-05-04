import React, { useRef } from 'react'

interface Floating3DCardProps {
  children: React.ReactNode
  className?: string
}

export const Floating3DCard: React.FC<Floating3DCardProps> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const { left, top, width, height } = card.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top
    const rotateX = ((y - height / 2) / height) * 12
    const rotateY = ((x - width / 2) / width) * -12
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return (
    <div style={{ perspective: '1000px' }} className="w-full flex justify-center px-4">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative transition-transform duration-300 ease-out ${className}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </div>
  )
}
