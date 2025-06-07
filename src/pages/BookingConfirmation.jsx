import React from 'react'
import { Link } from 'react-router-dom'

const BookingConfirmation = () => {
  return (
    <div>
      <h3>Booking Confirmation</h3>
      <p>Your booking was successful. See your tickets <Link to="/tickets">here</Link></p>
    </div>
  )
}

export default BookingConfirmation