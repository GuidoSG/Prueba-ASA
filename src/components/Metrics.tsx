import { useEffect, useState } from 'react'
import { calculateMetrics } from '../utils/excelReader'

interface Metrics {
  totalClients: number
  avgAge: number
  avgSalary: number
  totalSalary: number
  annualGrowth: number
}

export default function Metrics() {
  const [data, setData] = useState<Metrics | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    calculateMetrics().then(m => {
      setData(m)
    }).catch(e => {
      setErr('Error cargando datos')
      console.error(e)
    })
  }, [])

  if (err) return <section id="metricas" className="section metrics"><p className="metrics-loading">{err}</p></section>
  if (!data) return <section id="metricas" className="section metrics"><p className="metrics-loading">Cargando...</p></section>

  return (
    <section id="metricas" className="section metrics">
      <div className="section-header centered">
        <p className="section-label">Números que importan</p>
        <h2 className="section-title">Nuestra cartera en datos</h2>
        <p className="section-subtitle">Métricas reales de nuestra base de clientes activos.</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <p className="metric-label">Clientes activos</p>
          <p className="metric-value"><span className="accent">{data.totalClients}</span></p>
          <p className="metric-note">Base actual</p>
        </div>
        <div className="metric-card">
          <p className="metric-label">Edad promedio</p>
          <p className="metric-value"><span className="accent">{data.avgAge}</span></p>
          <p className="metric-note">Años promedio</p>
        </div>
        <div className="metric-card">
          <p className="metric-label">Ingreso mensual promedio</p>
          <p className="metric-value"><span className="accent">${data.avgSalary.toLocaleString('es-CL', { maximumFractionDigits: 0 })}</span></p>
          <p className="metric-note">USD por cliente</p>
        </div>
        <div className="metric-card">
          <p className="metric-label">Crecimiento anual</p>
          <p className="metric-value"><span className="accent">{data.annualGrowth}%</span></p>
          <p className="metric-note">2023–2024</p>
        </div>
      </div>
    </section>
  )
}
