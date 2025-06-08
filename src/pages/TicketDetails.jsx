import React from 'react'
import Restrictions from '../components/Restrictions'
import TermsAndConditions from '../components/TermsAndConditions'
import EVoucher from '../components/EVoucher'
import { useLocation } from 'react-router-dom'

const TicketDetails = () => {
  const { state } = useLocation()
  return (
    <div className='ticket-details-wrapper'>
      <EVoucher state={state}/>
      <TermsAndConditions />
      <Restrictions />
    </div>
  )
}

export default TicketDetails