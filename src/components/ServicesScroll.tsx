import { useEffect, useRef, useState } from 'react'

const services = [
  {
    icon: '📊',
    title: 'Análisis de Datos',
    desc: 'Convertimos datos crudos en insights accionables. Identificamos patrones, tendencias y oportunidades que tu negocio todavía no está viendo.',
    image: 'https://images.pexels.com/photos/20232209/pexels-photo-20232209.jpeg',
  },
  {
    icon: '⚡',
    title: 'Automatización',
    desc: 'Eliminamos tareas repetitivas de tus procesos. Desde reportes automáticos hasta flujos de trabajo inteligentes que trabajan por ti.',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=1600&q=80',
  },
  {
    icon: '🤖',
    title: 'IA Aplicada',
    desc: 'Modelos de inteligencia artificial adaptados a tu industria y escala. Soluciones prácticas, no tecnología por tecnología.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
  },
  {
    icon: '📈',
    title: 'Dashboards',
    desc: 'Visualizaciones claras e interactivas para que puedas tomar decisiones en tiempo real, sin depender de terceros.',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1600&q=80',
  },
]

export default function ServicesScroll() {
  const [activo, setActivo] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const { top, height } = sectionRef.current.getBoundingClientRect()
      const scrollProgress = -top / (height - window.innerHeight)
      const index = Math.min(
        services.length - 1,
        Math.max(0, Math.floor(scrollProgress * services.length))
      )
      setActivo(index)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="servicios" ref={sectionRef}
      style={{ height: `${services.length * 100}vh`, position: 'relative', borderBottom: '3px solid #00e676' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '0 5%',
      }}>

        {/* Imágenes de fondo */}
        {services.map((s, i) => (
          <div key={i} style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${s.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === activo ? 1 : 0,
            transition: 'opacity 0.8s ease',
            zIndex: 0,
          }} />
        ))}

        {/* Overlay oscuro */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10, 15, 30, 0.6)',
          zIndex: 1,
        }} />

        {/* Contenido con cuadro sutil */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(8px)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '48px 56px',
          maxWidth: '680px',
        }}>
          <p style={{
            fontSize: '0.72rem',
            fontWeight: 'bold',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#00e676',
            marginBottom: '24px',
          }}>
            Lo que hacemos
          </p>

          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>
            {services[activo].icon}
          </div>

          <h2 style={{
            fontSize: '2.2rem',
            fontWeight: 900,
            color: '#ffffff',
            marginBottom: '16px',
          }}>
            {services[activo].title}
          </h2>

          <p style={{
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.7,
            marginBottom: '32px',
          }}>
            {services[activo].desc}
          </p>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {services.map((_, i) => (
              <div key={i} style={{
                width: i === activo ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === activo ? '#00e676' : 'rgba(255,255,255,0.2)',
                transition: 'all 0.4s ease',
              }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}