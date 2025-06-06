import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'

const CreateProfile = () => {
  const { user, setUser } = useUser()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    userId: user.userId,
    firstName: '',
    lastName: '',
    phone: '',
    streetName: '',
    streetNumber: '',
    postalCode: '',
    city: '',
    country: ''
  })

  const handleChange = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const updatedFormData = {
      userId: user.userId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      contactInfoModels: [
      {contactTypeId: 1, value: user.email },
      {contactTypeId: 2, value: formData.phone}
      ],
      addressInfoModels: [{
        addressTypeId: 1,
        streetName: formData.streetName,
        streetNumber: formData.streetNumber,
        postalCode: formData.postalCode,
        city: formData.city,
        country: formData.country
      }]
    }

    try {
      const accountProfileBaseUrl = import.meta.env.VITE_ACCOUNTPROFILESERVICE_BASEURL;
      const res = await fetch(`${accountProfileBaseUrl}/api/accountProfiles/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedFormData)
      })

      const data = await res.json()
      if (res.ok) {
        setUser(prev => ({...prev, 
          firstName: formData.firstName,
          lastName: formData.lastName,
          streetName: formData.streetName, 
          streetNumber: formData.streetNumber, 
          postalCode: formData.postalCode, 
          city: formData.city, 
          country: formData.country})
        )
        navigate("/events")
      } else {
        setError(data.error || "Failed to save profile information.")
      }

    } catch {
      setError("An unexpected error occured.")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>First name</label>
      <input className='form-input' type='text' name='firstName' value={formData.firstName} onChange={handleChange} required></input>

      <label>Last name</label>
      <input className='form-input' type='text' name='lastName' value={formData.lastName} onChange={handleChange} required></input>

      <label>Phone number</label>
      <input className='form-input' type='tel' name='phone' value={formData.phone} onChange={handleChange} required></input>

      <label>Street name</label>
      <input className='form-input' type='text' name='streetName' value={formData.streetName} onChange={handleChange} required></input>

      <label>Street number</label>
      <input className='form-input' type='text' name='streetNumber' value={formData.streetNumber} onChange={handleChange} required></input>

      <label>Postal code</label>
      <input className='form-input' type='text' name='postalCode' value={formData.postalCode} onChange={handleChange} required></input>

      <label>City</label>
      <input className='form-input' type='text' name='city' value={formData.city} onChange={handleChange} required></input>

      <label>Country</label>
      <input className='form-input' type='text' name='country' value={formData.country} onChange={handleChange} required></input>
      
      {error && <p>{error}</p>}

      <button type='submit' className='btn-primary mt-1'>Complete registration</button>
    </form>
  )
}

export default CreateProfile