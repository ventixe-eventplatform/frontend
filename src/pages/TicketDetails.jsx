import React from 'react'
import Restrictions from '../components/Restrictions'
import TermsAndConditions from '../components/TermsAndConditions'
import EVoucher from '../components/EVoucher'

const TicketDetails = () => {
  return (
    <div className='ticket-details-wrapper'>
      <EVoucher />
      <TermsAndConditions />
      <Restrictions />
    </div>
  )
}

export default TicketDetails