import { useEffect, useRef, useState } from 'react'

/**
 * SalesChartAscii — Gráfico ASCII de ventas en subida.
 *
 * Renderiza un bar-chart con tendencia ascendente:
 *  · Barras cuyo alto crece de izquierda a derecha (curva potencia → "hockey stick").
 *  · Ondulaciones sinusoidales sutiles para dar vida a cada columna.
 *  · Línea de tendencia (puntos) sobre las puntas de las barras.
 *  · Bordes superiores en cyan (acento), cuerpo en brand.
 *
 * Pensado para usarse como **fondo decorativo** detrás de secciones —
 * por eso no incluye texto ni ejes ni leyenda.
 *
 * Props (todas opcionales):
 *  - fps:       frames por segundo de la animación (default 12).
 *  - intensity: multiplicador de amplitud de las ondas (default 1).
 *  - cols:      cantidad de columnas del gráfico (default 140).
 *  - rows:      cantidad de filas del gráfico (default 50).
 *  - className: clase CSS extra.
 *
 * Cleanup: el RAF se cancela al desmontar. Sin timers propios.
 * Colores: via CSS vars — ver `.sales-chart-ascii .sc-{brand,cyan,dim}` en App.css.
 */

export type SalesChartAsciiProps = {
  fps?: number
  intensity?: number
  cols?: number
  rows?: number
  className?: string
}

type Color = 'brand' | 'cyan' | 'dim'
type Cell = { c: string; k?: Color }

const makeGrid = (w: number, h: number): Cell[][] =>
  Array.from({ length: h }, () => Array.from({ length: w }, () => ({ c: ' ' })))

function escapeHtml(s: string): string {
  return s.replace(/[&<>]/g, (c) =>
    c === '&' ? '&amp;' : c === '<' ? '&lt;' : '&gt;'
  )
}

function gridToHtml(g: Cell[][]): string {
  const rows: string[] = []
  for (const row of g) {
    let html = ''
    let buf = ''
    let cur: Color | undefined
    const flush = () => {
      if (!buf) return
      html += cur ? `<span class="sc-${cur}">${escapeHtml(buf)}</span>` : escapeHtml(buf)
      buf = ''
    }
    for (const cell of row) {
      if (cell.k !== cur) {
        flush()
        cur = cell.k
      }
      buf += cell.c
    }
    flush()
    rows.push(html)
  }
  return rows.join('\n')
}

function composeFrame(
  t: number,
  intensity: number,
  cols: number,
  rows: number
): string {
  const g = makeGrid(cols, rows)

  // 1) Calcular altura de cada columna — tendencia ascendente con ondas
  const heights: number[] = new Array(cols)
  for (let x = 0; x < cols; x++) {
    const progress = x / (cols - 1) // 0 → 1
    // Base: curva potencia (hockey stick). Empieza bajo (~12%) y sube a ~88%.
    const base = 0.12 + Math.pow(progress, 0.7) * 0.76
    // Ondas sinusoidales desfasadas para darle vida
    const w1 = Math.sin((x - t * 0.55) / 7)  * 0.045 * intensity
    const w2 = Math.sin((x - t * 0.30) / 14) * 0.030 * intensity
    const w3 = Math.sin((x + t * 0.12) / 23) * 0.020 * intensity
    const v = Math.max(0.05, Math.min(0.97, base + w1 + w2 + w3))
    heights[x] = Math.round(v * (rows - 1))
  }

  // 2) Dibujar barras (densidad del glifo según distancia al top)
  for (let x = 0; x < cols; x++) {
    const h = heights[x]
    const topY = rows - h
    for (let y = topY; y < rows; y++) {
      const fromTop = h === 0 ? 0 : (y - topY) / h
      let ch = '█'
      let k: Color = 'brand'
      if (fromTop < 0.06) {
        ch = '▄' // borde superior fino
        k = 'cyan'
      } else if (fromTop < 0.35) {
        ch = '█'
      } else if (fromTop < 0.68) {
        ch = '▓'
      } else {
        ch = '▒'
        k = 'dim'
      }
      g[y][x] = { c: ch, k }
    }
  }

  // 3) Línea de tendencia (puntos) sobre las puntas
  for (let x = 0; x < cols; x++) {
    const h = heights[x]
    const y = rows - h - 1
    if (y >= 0 && y < rows) {
      g[y][x] = { c: '•', k: 'cyan' }
    }
  }

  return gridToHtml(g)
}

export function SalesChartAscii({
  fps = 12,
  intensity = 1,
  cols: colsProp,
  rows: rowsProp,
  className = '',
}: SalesChartAsciiProps) {
  const preRef = useRef<HTMLPreElement>(null)
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef(0)
  const tRef = useRef(0)
  // Cols/rows adaptados al tamaño real del contenedor (si no vienen por props).
  const [dims, setDims] = useState<{ cols: number; rows: number }>({
    cols: colsProp ?? 140,
    rows: rowsProp ?? 50,
  })

  // Si el usuario pasó cols/rows explícitos, los respetamos.
  // Si no, medimos el contenedor y calculamos cuántos chars entran según el font-size.
  useEffect(() => {
    if (colsProp != null && rowsProp != null) return
    const pre = preRef.current
    const parent = pre?.parentElement
    if (!pre || !parent) return

    const measure = () => {
      const rect = parent.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      // Medir un char real con la fuente/tamaño actual del <pre>
      const cs = getComputedStyle(pre)
      const probe = document.createElement('span')
      probe.style.fontFamily = cs.fontFamily
      probe.style.fontSize = cs.fontSize
      probe.style.fontWeight = cs.fontWeight
      probe.style.letterSpacing = cs.letterSpacing
      probe.style.visibility = 'hidden'
      probe.style.position = 'absolute'
      probe.style.whiteSpace = 'pre'
      probe.textContent = '0'.repeat(100)
      document.body.appendChild(probe)
      const box = probe.getBoundingClientRect()
      const charW = box.width / 100
      const charH = box.height
      document.body.removeChild(probe)

      if (!charW || !charH) return
      const nextCols = Math.max(30, Math.floor(rect.width / charW))
      const nextRows = Math.max(8, Math.floor(rect.height / charH))
      setDims((prev) =>
        prev.cols === nextCols && prev.rows === nextRows
          ? prev
          : { cols: nextCols, rows: nextRows }
      )
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(parent)
    return () => ro.disconnect()
  }, [colsProp, rowsProp])

  // Loop de dibujado
  useEffect(() => {
    const interval = 1000 / fps

    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop)
      if (now - lastRef.current < interval) return
      lastRef.current = now
      tRef.current += 1
      if (preRef.current) {
        preRef.current.innerHTML = composeFrame(
          tRef.current,
          intensity,
          dims.cols,
          dims.rows
        )
      }
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [fps, intensity, dims.cols, dims.rows])

  return (
    <pre
      ref={preRef}
      className={`sales-chart-ascii ${className}`.trim()}
      aria-hidden="true"
    />
  )
}

/* ── ejemplo de uso ──────────────────────────────────
 *
 *   import { SalesChartAscii } from './SalesChartAscii'
 *
 *   // Default — 140 cols × 50 rows, 12fps
 *   <SalesChartAscii />
 *
 *   // Más denso (desktop)
 *   <SalesChartAscii cols={200} rows={70} fps={14} />
 *
 *   // Versión calma
 *   <SalesChartAscii intensity={0.5} fps={8} />
 *
 * ─────────────────────────────────────────────────── */
