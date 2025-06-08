import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Logout } from './Logout'
import { useUser } from '../contexts/UserContext'

const Nav = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const location = useLocation()
  const [tokenExpired, setTokenExpired] = useState(false)

  useEffect(() => {
    const expiresAt = localStorage.getItem("expiresAt")
    if (!expiresAt) {
      setTokenExpired(true)
      return
    }
    const expiryTime = new Date(expiresAt)
    const isExpired = Date.now() > expiryTime.getTime()
    setTokenExpired(isExpired)
  }, [location.pathname, user.userId])

  const isLoggedIn = !!user.userId

  return (
    <nav className='nav-links'>
      <div className='nav-link-container'>
        <NavLink to='/events' className='nav-link-ventixe flex'><img src="/ventixe-logo.svg" alt='Ventixe'></img><span>Ventixe</span></NavLink>
        <NavLink to='/events' className={({ isActive }) => `nav-link flex ${isActive ? 'active' : ''}`}><i className="fa-light fa-ticket-perforated"></i><span>Events</span></NavLink>
        <NavLink to='/tickets' className={({ isActive }) => `nav-link flex ${isActive ? 'active' : ''}`}><i className="fa-light fa-square-check"></i><span>Tickets</span></NavLink>
      </div>
      {isLoggedIn && !tokenExpired ? (
        <Logout />
      ) : (
        <div onClick={() => navigate("/login")} className='flex btn-signout'>
          <i className="fa-light fa-arrow-right-from-bracket"></i>
          <p>Sign In</p>
        </div>
      )}
    </nav>
  )
}

export default Nav