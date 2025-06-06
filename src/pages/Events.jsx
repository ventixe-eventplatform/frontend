import React, { useEffect, useState } from 'react'
import EventCard from '../components/EventCard'

const Events = () => {
  const [events, setEvents] = useState([])

  const getEvents = async () => {
    try {
      const eventBaseUrl = import.meta.env.VITE_EVENTSERVICE_BASEURL;
      const res = await fetch(`${eventBaseUrl}/api/events`)
      if (!res.ok) throw new Error("Network response not ok")
      const data = await res.json()
      setEvents(data)
    }
    catch {
      console.error("Error fetching data")
    }
  }

  useEffect(() => {
    getEvents()
  }, [])
  
  return (
    <div className='event-cards'>
      {
        events.map(event => (
          <EventCard key={event.eventId} event={event} />
        ))
      }
    </div>
  )
}

export default Events