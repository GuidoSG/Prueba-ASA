import logoUrl from '../assets/logo_challenge.PNG'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contacto" className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={logoUrl} alt="logo" className="footer-logo" />
            <span className="footer-name">Challenge Insight</span>
          </div>
          <p className="footer-desc">
            Consultora de datos, automatización e inteligencia artificial aplicada.
          </p>

          <div className="footer-links">
            <div className="footer-col">
              <h4>Servicios</h4>
              <ul>
                <li><a href="#servicios">Análisis de Datos</a></li>
                <li><a href="#servicios">Automatización</a></li>
                <li><a href="#servicios">IA Aplicada</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Empresa</h4>
              <ul>
                <li><a href="#nosotros">Nosotros</a></li>
                <li><a href="#metricas">Resultados</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© {year} Challenge Insight. Todos los derechos reservados.</p>
          <p className="footer-tagline">Datos · Automatización · IA</p>
        </div>
      </div>
    </footer>
  )
}
