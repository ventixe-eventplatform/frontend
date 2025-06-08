import React, { useState } from 'react'
import { useUser } from '../contexts/UserContext'

export const Logout = () => {
  const { setUser } = useUser()
  const [error, setError] = useState('')

  const signOut = async () => {
    try {
      setError('')
      const token = localStorage.getItem("token")
      const authBaseUrl = import.meta.env.VITE_AUTHSERVICE_BASEURL;
      const res = await fetch(`${authBaseUrl}/api/auth/signout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },     
      })
      if (res.ok) {
        localStorage.removeItem("token")
        localStorage.removeItem("expiresAt")

        setUser({
          userId: '',
          email: '',
          firstName: '',
          lastName: '',
          streetName: '',
          streetNumber: '',
          postalCode: '',
          city: '',
          country: '',
        })
      } else {
        setError("Could not sign out.")
      }
    } catch {
      setError("An unexpected error occured.")
    }
  }
  
  return (
    <div>
      {error && <p>{error}</p>}
      <div onClick={signOut} className='flex btn-signout'>
        <i className="fa-light fa-arrow-right-from-bracket"></i>
        <p>Sign Out</p>
      </div>
    </div>
  )
}
