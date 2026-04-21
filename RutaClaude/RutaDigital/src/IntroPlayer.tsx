import { useEffect, useRef, useState } from 'react'
import { Player } from '@remotion/player'
import type { PlayerRef } from '@remotion/player'
import { MyComposition } from './VideoIntro'
import { MyCompositionMobile } from './VideoIntroMobile'

const DURATION_DESKTOP = 315
const DURATION_MOBILE  = 60   // 2 segundos a 30fps
const FPS              = 30

function getIsMobile() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 768px)').matches
}

export function IntroPlayer({ onComplete }: { onComplete: () => void }) {
  const playerRef = useRef<PlayerRef>(null)
  const [fading, setFading]   = useState(false)
  const [visible, setVisible] = useState(true)
  // Detectado una vez al montar — la intro no se re-renderiza entre breakpoints.
  const [isMobile] = useState(getIsMobile)

  useEffect(() => {
    const p = playerRef.current
    if (!p) return

    // Forzar play — autoPlay no siempre dispara en todos los navegadores
    p.play()

    const handleEnded = () => {
      setFading(true)
      setTimeout(() => {
        setVisible(false)
        onComplete()
      }, 600)
    }

    p.addEventListener('ended', handleEnded)
    return () => p.removeEventListener('ended', handleEnded)
  }, [onComplete])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      opacity: fading ? 0 : 1,
      transition: 'opacity 0.6s ease',
      // Fondo alineado a la composición que va a renderizar.
      background: isMobile ? '#1557FF' : '#080B12',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <Player
        ref={playerRef}
        component={isMobile ? MyCompositionMobile : MyComposition}
        durationInFrames={isMobile ? DURATION_MOBILE : DURATION_DESKTOP}
        fps={FPS}
        compositionWidth={1280}
        compositionHeight={720}
        style={{
          // Escala para cubrir el viewport manteniendo aspecto 16:9
          width: '100vw',
          height: '56.25vw',      // 1280/720 = 16:9
          minHeight: '100vh',
          minWidth: '177.78vh',   // inverso: 720/1280 * 100
        }}
        clickToPlay={false}
        controls={false}
      />
    </div>
  )
}
