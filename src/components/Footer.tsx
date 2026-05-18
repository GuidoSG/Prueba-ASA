import logoUrl from '../assets/logo_challenge.PNG'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer id="contacto" className="footer">
      <div className="footer-inner">

        <div className="footer-brand-wrap">
          <div className="footer-brand">
            <img src={logoUrl} alt="logo" className="footer-logo" />
            <span className="footer-name">Challenge Insight</span>
          </div>
          <p className="footer-desc">
            Consultora de datos, automatización e inteligencia artificial aplicada.
          </p>
        </div>

        <div className="footer-middle">
          <div className="footer-col">
            <h4>Servicios</h4>
            <ul>
              <li><a href="#servicios">Análisis de Datos</a></li>
              <li><a href="#servicios">Automatización</a></li>
              <li><a href="#servicios">IA Aplicada</a></li>
              <li><a href="#servicios">Dashboards</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Empresa</h4>
            <ul>
              <li><a href="#nosotros">Nosotros</a></li>
              <li><a href="#metricas">Resultados</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contacto</h4>
            <ul>
              <li><a href="mailto:contacto@challengeinsight.cl">contacto@challengeinsight.cl</a></li>
              <li><a href="tel:+56912345678">+56 9 1234 5678</a></li>
            </ul>
          </div>
          <div className="footer-form-wrap">
            <h4>Escríbenos</h4>
            <div className="footer-form">
              <div className="footer-form-row">
                <input type="text" placeholder="Tu nombre" className="footer-input" />
                <input type="email" placeholder="Tu email" className="footer-input" />
              </div>
              <textarea placeholder="¿En qué podemos ayudarte?" className="footer-textarea" rows={3} />
              <button className="footer-form-btn">Enviar mensaje</button>
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