import { useEffect, useState, useRef } from 'react'
import { calculateMetrics } from '../utils/excelReader'

interface Metrics {
  totalClients: number
  avgAge: number
  avgSalary: number
  annualGrowth: number
}

interface MetricItemProps {
  label: string
  finalValue: number
  note: string
  prefix?: string
  suffix?: string
  decimals?: number
}

function MetricItem({ label, finalValue, note, prefix = '', suffix = '', decimals = 0 }: MetricItemProps) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    if (finalValue === 0) return

    const animate = () => {
      if (animated.current) return
      animated.current = true
      const duration = 1500
      const steps = 60
      const interval = duration / steps
      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps
        const current = finalValue * progress
        if (step >= steps) {
          setDisplay(decimals > 0 ? finalValue.toFixed(decimals) : Math.round(finalValue).toLocaleString('es-CL'))
          clearInterval(timer)
        } else {
          setDisplay(decimals > 0 ? current.toFixed(decimals) : Math.floor(current).toLocaleString('es-CL'))
        }
      }, interval)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [finalValue])

  return (
    <div className="metric-card-new" ref={ref}>
      <p className="metric-label-new">{label}</p>
      <p className="metric-value-new">{prefix}{display}{suffix}</p>
      <p className="metric-note-new">{note}</p>
    </div>
  )
}

export default function Metrics() {
  const [data, setData] = useState<Metrics | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    calculateMetrics().then(m => setData(m)).catch(e => {
      setErr('Error cargando datos')
      console.error(e)
    })
  }, [])

  if (err) return (
    <section id="metricas" className="section metrics">
      <p className="metrics-loading">{err}</p>
    </section>
  )

  if (!data) return (
    <section id="metricas" className="section metrics">
      <p className="metrics-loading">Cargando...</p>
    </section>
  )

  return (
    <section id="metricas" className="section metrics">
      <div className="metrics-header">
        <p className="section-label">Números que importan</p>
        <h2 className="section-title" style={{ color: 'var(--white)' }}>
          Nuestra cartera en datos
        </h2>
        <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Métricas reales de nuestra base de clientes activos.
        </p>
      </div>

      <div className="metrics-grid-new">
        <MetricItem
          label="Clientes activos"
          finalValue={data.totalClients}
          note="Base actual"
        />
        <MetricItem
          label="Edad promedio"
          finalValue={data.avgAge}
          note="Años promedio"
          suffix=" años"
          decimals={1}
        />
        <MetricItem
          label="Ingreso mensual promedio"
          finalValue={Math.round(data.avgSalary)}
          note="USD por cliente"
          prefix="$"
        />
        <MetricItem
          label="Crecimiento anual"
          finalValue={data.annualGrowth}
          note="2023–2024"
          suffix="%"
        />
      </div>
    </section>
  )
}