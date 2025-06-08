import React from 'react'

const EventDetails = ({event}) => {
  return (
    <div className='event-details-wrapper'>
      <div className='event-details-card'>
        <div className='event-details-image-container'>
          <img src={event.eventImage}></img>
          <span>{event.eventType}</span>
        </div>
        <div className='event-details-info-container'>
          <div className='event-details-info'>
            <h2>{event.eventName}</h2>
            <div className='flex-space-between'>
              <div>
                <p className='event-date'><i className="fa-light fa-calendar"></i> {new Date(event.startDate).toLocaleString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}</p>
                <p className='event-address'><i className="fa-light fa-location-dot"></i> {event.address.location}, {event.address.city}, {event.address.state}</p>
              </div>
              <div>
                <p>Starts from</p>
                <p className='event-price'>${Math.min(...event.packages.map(pkg => pkg.price))}</p>
              </div>
            </div>

          </div>
          <div className='event-details-description'>
            <h5>About Event</h5>
            <p>{event.eventDescription}</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default EventDetails