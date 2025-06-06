import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Events from '../pages/Events'
import Login from '../pages/auth/Login'
import PortalLayout from '../layouts/PortalLayout'
import CenterLayout from '../layouts/CenterLayout'
import EventBooking from '../pages/EventBooking'
import ConfirmBooking from '../pages/ConfirmBooking'
import Tickets from '../pages/Tickets'
import RegisterAccount from '../pages/auth/RegisterAccount'
import VerifyAccount from '../pages/auth/VerifyAccount'
import SelectPassword from '../pages/auth/SelectPassword'
import CreateProfile from '../pages/auth/CreateProfile'
import BookingConfiormation from '../pages/BookingConfirmation'
import TicketDetails from '../pages/TicketDetails'
import CompleteProfileInfo from '../pages/auth/CompleteProfileInfo'

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
        
      <Route element={<CenterLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<RegisterAccount />} />
        <Route path='verify' element={<VerifyAccount/> } />
        <Route path='setPassword' element={<SelectPassword />} />
        <Route path='createProfile' element={<CreateProfile />} />
        <Route path='completeProfileInfo' element={<CompleteProfileInfo/>} />
      </Route>

      <Route element={<PortalLayout />}>
        <Route path='/events' element={<Events />} />
        <Route path='/events/:id' element={<EventBooking />} />
        <Route path='/events/:id/book' element={<ConfirmBooking />} />
        <Route path='/bookingConfirmation' element={<BookingConfiormation />} />
        <Route path='/tickets' element={<Tickets />} />

        <Route path='/ticketDetails' element={<TicketDetails />} />
      </Route>

    </Routes>
  )
}

export default Routing