import { useState, useEffect } from 'react'
import React from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import TermsAndConditions from '../components/TermsAndConditions'
import EventDetails from '../components/EventDetails'
import EventPackages from '../components/EventPackages'

const EventBooking = () => {

  const [event, setEvent] = useState({})
  const { id } = useParams()


  const getEvent = async () => {
    const eventBaseUrl = import.meta.env.VITE_EVENTSERVICE_BASEURL;
    const res = await fetch(`${eventBaseUrl}/api/events/${id}`)
    if (!res.ok) throw new Error("Network response not ok")
    const data = await res.json()
    setEvent(data)
  }

  useEffect(() => {
    getEvent()
  }, [id])
  
  return (
    <div className='event-booking-wrapper'>
        {event && event.address && (
          <EventDetails event={event} />
        )}
        {event && event.packages && (
          <EventPackages event={event} />
        )}
      <TermsAndConditions />
    </div>
  )
}

export default EventBooking