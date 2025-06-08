import React, { useState, useEffect } from 'react'
import { useUser } from '../contexts/UserContext'
import { useNavigate, Link } from 'react-router-dom'

const Tickets = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [tokenExpired, setTokenExpired] = useState(false)

  useEffect(() => {
    const expiresAt = localStorage.getItem("expiresAt")
    if (!expiresAt) {
      setTokenExpired(true)
      return
    }
    const expiryTime = new Date(expiresAt)
    const isExpired = Date.now() > expiryTime.getTime()
    setTokenExpired(isExpired)

    if (!isExpired && user.userId) {
      getBookings()
    }
  }, [location.pathname, user.userId])

  const getBookings = async () => {
    const customerId = user.userId
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
    } finally {
      setLoading(false)
    }
  }

  const navigateToDetails = (ticket, booking) => {
    navigate("/ticketDetails", {
      state: { ticket, eventId: booking.eventId}
    })
  }

  if (tokenExpired || !user?.userId) {
    return <p>Sign in to see the tickets for your booked events.<Link to="/login"> Sign in here.</Link></p>
  }

  return (
    <div> 
      <h3 className='pl-1 mb-1'>Your Tickets</h3>
      {loading && <p className='pl-1'>Loading...</p>}
      <div className='ticket-table'>
        <table>
          <thead>
            <tr>
              <th>Booking Date</th>
              <th>Name</th>
              <th>Event</th>
              <th>Ticket Category</th>
              <th>Price</th>
              <th>E-Voucher Code</th>
            </tr>
          </thead>
          <tbody>
          {
            bookings.map(booking => {
              return booking.tickets.map((ticket, i) => (
                <tr key={`${booking.bookingId}-${i}`} onClick={() => navigateToDetails(ticket, booking)}>
                  <td>{new Date(booking.bookingDate).toLocaleDateString([], { year: '2-digit', month: '2-digit', day: '2-digit' })}</td>
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