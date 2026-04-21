import { motion, useScroll, useSpring } from 'motion/react'

/**
 * ScrollProgress — Barra fina fija en el top que indica progreso de scroll.
 * Colores 100% via CSS vars en App.css (.scroll-progress).
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
    restDelta: 0.001,
  })

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}
