import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EventPackages = ({event}) => {

  const [selectedPackages, setSelectedPackages] = useState([])
  const navigate = useNavigate()

  const handleQuantityChange = (packageId, quantity) => {
    setSelectedPackages(prev => {
      const exists = prev.find(p => p.packageId === packageId)

      if (exists) {
        return prev.map(p => p.packageId === packageId ? {...prev, quantity: Number(quantity)} : prev)
      } else {     
        return [...prev, {packageId, quantity: Number(quantity) }]
      }
    })
  }

  const selectedFullPackages = selectedPackages
    .filter(p => p.quantity > 0)
    .map(p => {
      const fullPkg = event.packages.find(pkg => pkg.packageId === p.packageId)
      return {
        packageId: p.packageId,
        quantity: p.quantity,
        packageType: fullPkg.packageType,
        price: fullPkg.price
      }
    })

  return (
    <div className='wrapper packages-wrapper'>
      <h3 className='package-header mt-1'>Packages</h3>
      <p>Select package(s) to proceed to the booking page</p>
      <div className='package-container'>
        {
          event.packages.map(pkg => (
            <div className='package-item' key={pkg.packageId}>
              <div className='flex-space-between'>
                <div>
                  <h4>{pkg.packageType}</h4>
                  <div className='package-content'>
                    <p><i className="fa-thin fa-circle-check"></i> {pkg.seating}</p>
                    <p><i className="fa-thin fa-circle-check"></i> {pkg.viewType}</p>
                  </div>
                </div>
                <p className='package-price'>${pkg.price}</p>
              </div>
              <select className='form-select' onChange={e => handleQuantityChange(pkg.packageId, e.target.value)}>
                {[...Array(20)].map((_, i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
          ))
        }
      </div>
      <button className='btn-primary mt-2' onClick={() => navigate(`/events/${event.eventId}/book`, {
        state: {
          eventId: event.eventId,
          eventName : event.eventName,
          selectedPackages: selectedFullPackages
        }
      })}>Book Event</button>
    </div>
  )
}

export default EventPackages