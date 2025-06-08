import React from 'react'
import { useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()

  const getHeader = () => {
    if (location.pathname.startsWith("/events")) return "Events"
    if (location.pathname.startsWith("/tickets")) return "Tickets"
    return "Ventixe"
  }
  return (
    <header>
      <h1>{getHeader()}</h1>
    </header>
  )
}

export default Header