import React, { useContext, createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

export const UserContext = createContext()
export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
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

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUser(prev => ({
          ...prev, userId: decoded.sub, email: decoded.email
        }))
      } catch(err) {
        console.error("Invalid token", err)
      }
    }
  }, [])
  
  
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}