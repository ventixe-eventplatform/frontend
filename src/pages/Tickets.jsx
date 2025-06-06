import React, { useState, useEffect } from 'react'
import { useUser } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

const Tickets = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])

  const getBookings = async () => {
    const customerId = user.userId
    console.log(customerId)
    try {
      const token = localStorage.getItem("token")
      const bookingBaseUrl = import.meta.env.VITE_BOOKINGSERVICE_BASEURL;
      const res = await fetch(`${bookingBaseUrl}/api/bookings/customer/${customerId}`, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`} 
      })
      if (!res.ok) throw new Error("Network response not ok")
      const data = await res.json()
      setBookings(data)
    }
    catch (error) {
      console.error("Error fetching data", error)
    }
  }
  
  useEffect(() => {
    getBookings()
  }, [user.userId])

  const navigateToDetails = () => {
    navigate("/ticketDetails")
  }

  return (
    <div> 
      <h3>Your Tickets</h3>
      <div className='ticket-table'>
        <table>
          <thead>
            <tr>
              <th>Booking Date</th>
              <th>Name</th>
              <th>Event</th>
              <th>Ticket Category</th>
              <th>Price</th>
              <th>E-Voucher</th>
            </tr>
          </thead>

          <tbody>
          {
            bookings.map(booking => {
              return booking.tickets.map((ticket, i) => (
                <tr key={`${booking.bookingId}-${i}`} onClick={navigateToDetails}>
                  <td>{booking.bookingDate}</td>
                  <td>{ticket.holderFirstName} {ticket.holderLastName}</td>
                  <td>{booking.eventName}</td>
                  <td>{ticket.type}</td>
                  <td>${ticket.price}</td>
                  <td>{ticket.eVoucher}</td>
                </tr>
              ))
            })
          }
          </tbody>

        </table>
      </div>

    </div>
  )
}

export default Tickets