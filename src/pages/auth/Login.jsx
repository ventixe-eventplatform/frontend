import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'

const Login = () => {
  const navigate = useNavigate()
  const { user, setUser } = useUser()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const authBaseUrl = import.meta.env.VITE_AUTHSERVICE_BASEURL;
      const res = await fetch(`${authBaseUrl}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      
      if (res.ok) {
        const { token, email, expiresAt, userId } = data
        setUser({userId, email })
        localStorage.setItem("expiresAt", expiresAt)
        localStorage.setItem("token", token)
        const exists = await profileExists(data.userId)
        navigate(exists ? "/events" : "/completeProfileInfo")
      } else {
        setError(data.error || 'Login failed.')
      }
    } catch (err) {
      console.log("Login error: ", err)
      setError('An unexpected error occured.')
    }
  }

  const profileExists = async (userId) => {
    // const accountProfileBaseUrl = import.meta.env.VITE_ACCOUNTPROFILESERVICE_BASEURL;
    const res = await fetch('/accountProfiles/exists', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: userId})
    })
    const exists = await res.json()
    return exists.data === true
  }

  return (
    <div>
      <h2 className='center'>Sign in to Ventixe</h2>
      <form onSubmit={handleSubmit}>
        <label>Enter your email address</label>
        <input className='form-input' type='email' name='email' value={formData.email} onChange={handleChange} required />

        <label>Enter your password</label>
        <input className='form-input' type='password' name='password' value={formData.password} onChange={handleChange} required />

        {error && <p>{error}</p>}

        <button type='submit'>Sign In</button>

        <p>Don't have an account yet? <Link to="/register">Sign Up</Link></p>
      </form>
    </div>

  )
}

export default Login
