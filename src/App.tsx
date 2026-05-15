import { useState, useEffect } from 'react'
import './index.css'
import { validateAccess } from './config'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Metrics from './components/Metrics'
import Pitch from './components/Pitch'
import Footer from './components/Footer'

export default function App() {
  const [authorized, setAuthorized] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    try {
      validateAccess()
      setAuthorized(true)
    } catch (e) {
      setAuthError(e instanceof Error ? e.message : 'Unauthorized')
    }
  }, [])

  if (authError) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a1a1a',
        color: '#f9f7fa',
        fontFamily: 'monospace',
        padding: '32px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '4rem', marginBottom: '16px' }}>⛔</p>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '12px', color: '#ff6b6b' }}>
          Error 401 — Unauthorized
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#aaa', maxWidth: '480px', lineHeight: 1.6 }}>
          {authError}
        </p>
        <p style={{ marginTop: '24px', fontSize: '0.82rem', color: '#666' }}>
          Revisa la configuración del proyecto antes de continuar.
        </p>
      </div>
    )
  }

  if (!authorized) return null

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Metrics />
        <Pitch />
      </main>
      <Footer />
    </>
  )
}
