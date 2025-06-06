import React, { useState } from 'react'
import { useUser } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

const SelectPassword = () => {
  const { user, setUser } = useUser()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: user.email,
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(JSON.stringify(formData))
      
      const authBaseUrl = import.meta.env.VITE_AUTHSERVICE_BASEURL;
      const res = await fetch(`${authBaseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (res.ok) {
        const { token, expiresAt, userId } = data
        localStorage.setItem("expiresAt", expiresAt)
        localStorage.setItem("token", token)
        setUser(prev => ({ ...prev, userId }))
        navigate("/createProfile")
      } else {
        setError(data.error || "Setting password failed")
      }
    } catch {
      console.error("Error submitting form.", error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Select your password</label>
      <input className='form-input' type='password' name='password' value={formData.password} onChange={handleChange} required></input>
      <label>Confirm password</label>
      <input className='form-input' type='password' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} required></input>
      {error && <p>{error}</p>}
      <button type='submit' className='btn-primary mt-1'>Continue</button>
    </form>
  )
}

export default SelectPassword