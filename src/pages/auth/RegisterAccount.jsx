import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'

const RegisterAccount = () => {
  const { setUser } = useUser()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({email: ''})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const exists = await emailExists()
    if (!exists) {
      const sent = await sendVerificationCode()
      if (sent) {
        setUser({ email: formData.email })
        navigate("/verify")
      } else {
        setError("Something went wrong sending the verification code.")
      }
    } else {
      setError("Email already exists. Try to sign in instead.")
    }
  }

  const emailExists = async () => {
    const authBaseUrl = import.meta.env.VITE_AUTHSERVICE_BASEURL;
    const res = await fetch(`${authBaseUrl}/api/auth/exists`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formData.email})
    })
    return res.ok
  }

  const sendVerificationCode = async () => {
    const verificationBaseUrl = import.meta.env.VITE_VERIFICATIONSERVICE_BASEURL;
    const res = await fetch(`${verificationBaseUrl}/api/verifications/send`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formData.email})
    })
    return res.ok
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData(prev => ({...prev, [name]: value }))
  }

  return (
    <div>
      <h2 className='center'>Welcome to Ventixe</h2>
      <p className='center mb-2 mt-1'>To register, complete the following steps</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor='register-email'>Enter your email address</label>
        <input className='form-input' id='register-email' type='email' name='email' value={formData.email} onChange={handleChange} required></input>
        {error && <p>{error}</p>}
        <button type='submit' className='btn-primary mt-1'>Send Verification Code</button>
        <p>Already have an account? <Link to="/login">Sign In</Link></p>
      </form>
    </div>

  )
}

export default RegisterAccount