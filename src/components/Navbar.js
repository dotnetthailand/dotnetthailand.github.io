import React from 'react'
import { Link } from 'gatsby';

const linkStyle = {
  color: '#00F0FF',
  fontSize: '24px',
  fontWeight: '600'
}

const activeStyle = {
  color: '#FFF'
}

const NavLink = ({ children, to }) => (
  <Link to={to} activeStyle={activeStyle} style={linkStyle}>
    {children}
  </Link>
)

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm " style={{ backgroundColor: "#00BCD4" }}>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="nav justify-content-center container">
          <li className="nav-item mr-5">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
          <li className="nav-item mr-5">
            <NavLink className="nav-link" to="/blog">Blog</NavLink>
          </li>
          <li className="nav-item mr-5">
            <NavLink className="nav-link" to="/tags">Tags</NavLink>
          </li>
          <li className="nav-item mr-5">
            <NavLink className="nav-link" to="/search">Search</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
