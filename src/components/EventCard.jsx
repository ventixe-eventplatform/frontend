import React from 'react'
import { Link } from 'react-router-dom'

const EventCard = ({event}) => {
  return (
    <Link to={`/events/${event.eventId}`}>
      <div className='event-card'>
        <div className='event-image-container'>
          <img></img>
          <p>{event.eventType}</p>
        </div>

        <div className='flex-space-between'>
          <div className='event-info'>
            <p className='event-date'>{new Date(event.startDate).toLocaleString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })}</p>
            <h3 className='mt-05'>{event.eventName}</h3>
            <p className='event-address'>{event.address.location}, {event.address.city}, {event.address.state}</p>
          </div>
          <div className='event-price'>
            <p>${Math.min(...event.packages.map(pkg => pkg.price))}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default EventCard