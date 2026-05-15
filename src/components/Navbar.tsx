import logoUrl from '../assets/logo_challenge.PNG'

export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="#inicio" className="navbar-brand">
        <img src={logoUrl} alt="logo" className="navbar-logo" />
        <span className="navbar-name">Challenge Insight</span>
      </a>
      <ul className="navbar-links">
        <li><a href="#servicios">Servicios</a></li>
        <li><a href="#metricas">Métricas</a></li>
        <li><a href="#nosotros">Nosotros</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
    </nav>
  )
}
