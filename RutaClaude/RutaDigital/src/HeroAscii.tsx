import { useEffect, useRef } from 'react'

/**
 * HeroAscii — Dashboard ASCII "live" que representa la operatoria de Ruta Digital.
 *
 * Widgets simultáneos que se actualizan frame a frame:
 *  · Terminal con líneas tipeándose (rotan)
 *  · Barra de crecimiento + %
 *  · Sparkline de conversiones
 *  · Embudo animado (Audiencia → Clicks → Leads → Ventas)
 *  · Pills de Agentes IA con estado parpadeante
 *  · Data stream con caracteres fluyendo
 *  · Reloj "uptime" en el header
 *
 * Props:
 *  - fps:       velocidad de refresco (frames por segundo). Default 18.
 *  - intensity: multiplicador global de amplitud (0.5 = calma, 1.5 = intenso). Default 1.
 *  - className: clase CSS extra para el contenedor <pre>.
 *
 * Colores: NUNCA hardcodeados. Se exponen 4 clases semánticas que
 * mapean a variables CSS definidas en App.css:
 *   .a-brand  → var(--brand)
 *   .a-cyan   → var(--cyan)
 *   .a-light  → var(--light)
 *   .a-dim    → var(--muted) con opacidad
 */

export type HeroAsciiProps = {
  fps?: number
  intensity?: number
  className?: string
}

type Color = 'brand' | 'cyan' | 'light' | 'dim'
type Cell = { c: string; k?: Color }

const W = 52
const H = 22

/* ── helpers de grilla ───────────────────────────── */

const makeGrid = (): Cell[][] =>
  Array.from({ length: H }, () => Array.from({ length: W }, () => ({ c: ' ' })))

function put(g: Cell[][], x: number, y: number, s: string, k?: Color) {
  const row = g[y]
  if (!row) return
  for (let i = 0; i < s.length; i++) {
    const col = x + i
    if (col < 0 || col >= row.length) continue
    row[col] = { c: s[i], k }
  }
}

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
      html += cur ? `<span class="a-${cur}">${escapeHtml(buf)}</span>` : escapeHtml(buf)
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

/* ── widgets ─────────────────────────────────────── */

function drawBorder(g: Cell[][]) {
  put(g, 0, 0, '╭' + '─'.repeat(W - 2) + '╮', 'dim')
  put(g, 0, H - 1, '╰' + '─'.repeat(W - 2) + '╯', 'dim')
  for (let y = 1; y < H - 1; y++) {
    put(g, 0, y, '│', 'dim')
    put(g, W - 1, y, '│', 'dim')
  }
  put(g, 0, 2, '├' + '─'.repeat(W - 2) + '┤', 'dim')
}

function drawHeader(g: Cell[][], t: number, fps: number) {
  put(g, 2, 1, 'RUTA.DIGITAL', 'brand')
  put(g, 15, 1, '› LIVE METRICS', 'dim')

  const blink = Math.floor(t / 6) % 2 === 0 ? '●' : '○'
  put(g, W - 16, 1, blink, 'cyan')
  put(g, W - 14, 1, 'ON', 'light')

  const seconds = Math.floor(t / fps)
  const hh = Math.floor(seconds / 3600) % 24
  const mm = Math.floor(seconds / 60) % 60
  const ss = seconds % 60
  const clock = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`
  put(g, W - 10, 1, clock, 'dim')
}

const TERMINAL_LINES = [
  '> init route.agent',
  '> scanning audiencia…',
  '> 127 leads captured',
  '> embudo +300% pace',
  '> agent.IA.01 online',
  '> deploy landing.v3',
  '> sync meta + google',
]

function drawTerminal(g: Cell[][], t: number, x: number, y: number) {
  const CYCLE = 48
  const idx = Math.floor(t / CYCLE) % TERMINAL_LINES.length
  const line = TERMINAL_LINES[idx]
  const local = t % CYCLE
  const holdStart = 18
  const typed = local < holdStart ? Math.min(line.length, Math.ceil(local * 1.8)) : line.length
  const visible = line.slice(0, typed)
  put(g, x, y, '> ', 'cyan')
  put(g, x + 2, y, visible.slice(2), 'light')
  if (Math.floor(t / 5) % 2 === 0 && typed < line.length + 2) {
    put(g, x + visible.length, y, '█', 'cyan')
  }
}

function drawProgressBar(g: Cell[][], t: number, x: number, y: number, intensity: number) {
  const barW = 20
  put(g, x, y, 'CRECIMIENTO', 'dim')
  const raw = 0.5 + 0.45 * intensity * Math.sin(t / 22)
  const pct = Math.max(0.05, Math.min(1, raw))
  const filled = Math.floor(pct * barW)
  put(g, x, y + 1, '█'.repeat(filled), 'brand')
  put(g, x + filled, y + 1, '░'.repeat(barW - filled), 'dim')
  const pctStr = `${Math.floor(pct * 100).toString().padStart(3, ' ')}%`
  put(g, x + barW + 2, y + 1, pctStr, 'cyan')
}

function drawSparkline(g: Cell[][], t: number, x: number, y: number, intensity: number) {
  put(g, x, y, 'CONVERSIONES', 'dim')
  const chars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█']
  const sparkX = x + 15
  const sparkW = 20
  for (let i = 0; i < sparkW; i++) {
    const v =
      0.5 +
      0.5 *
        intensity *
        Math.sin((t + i * 3) / 9 + Math.sin((t + i * 2) / 13) * 0.9)
    const clamped = Math.max(0, Math.min(0.999, v))
    const ch = chars[Math.floor(clamped * chars.length)]
    put(g, sparkX + i, y, ch, i > sparkW - 4 ? 'cyan' : 'brand')
  }
}

const FUNNEL_ROWS = [
  { label: 'AUDIENCIA', max: 22, base: 18 },
  { label: 'CLICKS', max: 15, base: 12 },
  { label: 'LEADS', max: 10, base: 7 },
  { label: 'VENTAS', max: 5, base: 3 },
]

function drawFunnel(g: Cell[][], t: number, x: number, y: number, intensity: number) {
  put(g, x, y, 'EMBUDO', 'dim')
  FUNNEL_ROWS.forEach((r, i) => {
    const pulse = 1 + 0.22 * intensity * Math.sin((t + i * 9) / 7)
    const len = Math.max(2, Math.min(r.max, Math.floor(r.base * pulse)))
    put(g, x, y + 1 + i, '▓'.repeat(len), i === 0 ? 'brand' : i === 3 ? 'cyan' : 'brand')
    put(g, x + r.max + 2, y + 1 + i, r.label, 'light')
  })
}

function drawAgents(g: Cell[][], t: number, x: number, y: number) {
  put(g, x, y, 'AGENTES IA', 'dim')
  const names = ['CL.01', 'CL.02', 'CL.03', 'CL.04']
  let cx = x
  names.forEach((n, i) => {
    const active = Math.floor(t / 14 + i * 1.7) % 3 !== 0
    put(g, cx, y + 1, '[ ', 'dim')
    put(g, cx + 2, y + 1, n, active ? 'cyan' : 'dim')
    put(g, cx + 2 + n.length, y + 1, ' ]', 'dim')
    cx += n.length + 5
  })
}

function drawDataStream(g: Cell[][], t: number, x: number, y: number) {
  const charset = '░▒▓█▪●•·▫◆◇'
  put(g, x, y, 'data.stream', 'dim')
  const startX = x + 13
  const streamW = W - startX - 2
  for (let i = 0; i < streamW; i++) {
    const n = Math.floor(
      (Math.sin((i + t * 1.8) / 2.7) + 1) * 5 + ((i * 7 + t * 3) % charset.length)
    )
    const ch = charset[Math.abs(n) % charset.length]
    const hot = Math.sin((i + t) / 4) > 0.55
    put(g, startX + i, y, ch, hot ? 'cyan' : 'brand')
  }
}

/* ── compose ─────────────────────────────────────── */

function composeFrame(t: number, fps: number, intensity: number): string {
  const g = makeGrid()
  drawBorder(g)
  drawHeader(g, t, fps)
  drawTerminal(g, t, 2, 3)
  drawProgressBar(g, t, 2, 5, intensity)
  drawSparkline(g, t, 2, 8, intensity)
  drawFunnel(g, t, 2, 10, intensity)
  drawAgents(g, t, 2, 16)
  drawDataStream(g, t, 2, 19)
  return gridToHtml(g)
}

/* ── componente ──────────────────────────────────── */

export function HeroAscii({ fps = 18, intensity = 1, className = '' }: HeroAsciiProps) {
  const preRef = useRef<HTMLPreElement>(null)
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef(0)
  const tRef = useRef(0)

  useEffect(() => {
    const interval = 1000 / fps

    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop)
      if (now - lastRef.current < interval) return
      lastRef.current = now
      tRef.current += 1
      if (preRef.current) {
        preRef.current.innerHTML = composeFrame(tRef.current, fps, intensity)
      }
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [fps, intensity])

  return <pre ref={preRef} className={`hero-ascii ${className}`.trim()} aria-hidden="true" />
}

/* ── ejemplo de uso ──────────────────────────────────
 *
 *   import { HeroAscii } from './HeroAscii'
 *
 *   // calmo
 *   <HeroAscii fps={14} intensity={0.7} />
 *
 *   // default
 *   <HeroAscii />
 *
 *   // intenso
 *   <HeroAscii fps={24} intensity={1.4} />
 *
 * ─────────────────────────────────────────────────── */
