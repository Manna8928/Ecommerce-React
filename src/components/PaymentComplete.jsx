import React from 'react';

const PaymentComplete = () => {
  return (
    <div>
        <div className='paymentComplete'>Payment Complete!!!</div>
        <video autoPlay loop>
            <source src="./src/assets/PaymentDone.mp4" type="video/mp4"></source>
        </video>
    </div>
  )
}

export default PaymentComplete