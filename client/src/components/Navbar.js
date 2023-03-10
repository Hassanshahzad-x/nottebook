import React from 'react'
import logo from '../assets/logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  let location = useLocation()
  let history = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    history("/login")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="Logo" width="40" height="40" className="d-inline-block align-text-top" /></a>
          <a className="navbar-brand" href="/">nottebook</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page">Home</Link>
              </li>

              <li className="nav-item">
                <Link to="/about" className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page">About</Link>
              </li>

            </ul>
            {!localStorage.getItem('token') ?
              <form className='d-flex'>
                <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
              </form> : <button onClick={handleLogout} className='btn btn-primary'>Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
