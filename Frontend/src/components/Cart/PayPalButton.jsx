import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          'AWOaf9MyV0bq8y9VVYB1UgKAak9wSCoyJUFSPfYRCCD9_mwSK-SknMnWRrccPCKGYdILIvqCX24lU41i'
      }}
    >
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: amount } }]
          })
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess)
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  )
}

export default PayPalButton
