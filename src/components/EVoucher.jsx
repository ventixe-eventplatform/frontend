import React, { useEffect, useState } from 'react'


const EVoucher = ({data}) => {
  const { ticket, eventId } = data
  const [event, setEvent] = useState({})

  useEffect(() => {
    getEvent(eventId)
  }, [eventId])
  
  const getEvent = async (eventId) => {
    try {
      const eventBaseUrl = import.meta.env.VITE_EVENTSERVICE_BASEURL;
      const res = await fetch(`${eventBaseUrl}/api/events/${eventId}`)
      if (!res.ok) throw new Error("Network response not ok")
      const data = await res.json()
      setEvent(data)
    } catch (error) {
      console.error("Error fetching data", error)
    }
  }
  
  return (
    <div className='e-voucher'>

      <div className='e-voucher-event-details'>
        <div>
          <img>{event?.eventImage}</img>
          <p>{event.eventName}</p>
        </div>
      </div>

      <div className='e-voucher-info'>
        <div className='e-voucher-customer-info'>
          <div>
            <h6>Name</h6>
            <p>{ticket.holderFirstName} {ticket.holderLastName}</p>
          </div>
          <div>
            <h6>E-Voucher Id</h6>
            <p>{ticket.eVoucher}</p>
          </div>
          <div>
            <h6>Ticket Category</h6>
            <p>{ticket.type}</p>
          </div>
        </div>

        <div className='e-voucher-location-info'>
          <div>
            <h6>Location</h6>
            <p>{event.address?.location}</p>
          </div>
          <div>
            <h6>Date</h6>
            <p>{new Date(event.startDate).toLocaleDateString()}</p>
          </div>
          <div>
            <h6>Time</h6>
            <p>{new Date(event.startDate).toLocaleDateString([], { hour: '2-digit', minute: '2-digit'})}</p>
          </div>
        </div>
      </div>

      <div className='e-voucher-scanning'>
        <h5>Scan to Enter</h5>
        <div>
          <img src='/bar-code.svg'></img>
        </div>

        <div className='e-voucher-scanning-text'>
          <p>Thank you for your purchase!</p>
          <p>Enjoy the festival and experience<br/>the rhythm like never before</p>
        </div>
      </div>

    </div>
  )
}

export default EVoucher