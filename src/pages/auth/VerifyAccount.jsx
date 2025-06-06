import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'

const VerifyAccount = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({ code: ''})

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData(prev => ({...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    const success = await verifyCode()
    if (success) {
      navigate("/setPassword")
    } else {
      setError("The verification code was incorrect.")
      setTimeout(() => {
        navigate("/register")
      }, 5000);
    }
  }

  const verifyCode = async () => {
    const verificationBaseUrl = import.meta.env.VITE_VERIFICATIONSERVICE_BASEURL;
    const res = await fetch(`${verificationBaseUrl}/api/verifications/verify`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, code: formData.code })
    })
    return res.ok
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='verify-code'>Enter the code that was sent to your email address</label>
      <input className='form-input' id='verify-code' type='text' name='code' value={formData.code} onChange={handleChange} required></input>
      {error && <p>{error}</p>}
      <button type='submit' className='btn-primary mt-1'>Verify Code</button>
    </form>
  )
}

export default VerifyAccount