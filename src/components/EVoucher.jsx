import React from 'react'


const EVoucher = () => {
  return (
    <div className='e-voucher'>

      <div className='e-voucher-event-details'>
        <div>
          <img></img>
          <p>Event Name</p>
        </div>
      </div>

      <div className='e-voucher-info'>
        <div className='e-voucher-customer-info'>
          <div>
            <h6>Name</h6>
            <p>XXXX XXX</p>
          </div>
          <div>
            <h6>Invoice Id</h6>
            <p>XXXX XXX</p>
          </div>
          <div>
            <h6>Ticket Category</h6>
            <p>XXXX XXX</p>
          </div>
        </div>

        <div className='e-voucher-location-info'>
          <div>
            <h6>Location</h6>
            <p>XXXXX</p>
          </div>
          <div>
            <h6>Date</h6>
            <p>XXXXX</p>
          </div>
          <div>
            <h6>Time</h6>
            <p>XXXXX</p>
          </div>
        </div>
      </div>

      <div className='e-voucher-scanning'>
        <h5>Scan to Enter</h5>
        <div>
          <img src='/bar-code.svg'></img>
        </div>

        <div className='e-voucher-scanning-text'>
          <p>Thank you for your purchase!</p>
          <p>Enjoy the festival and experience<br/>the rhythm like never before</p>
        </div>
      </div>

    </div>
  )
}

export default EVoucher