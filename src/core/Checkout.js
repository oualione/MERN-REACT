import React, { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuth } from '../auth/helpers'
import DropIn from "braintree-web-drop-in-react";
import { getBraintreeToken, processPayment } from './ApiCore'

function Checkout({products}) {

  const [braintreeData, setBraintreeData] = useState({
    braintreeToken : null,
    error : null,
    instance : {}
  })

const userId = isAuth() && isAuth().user._id;
const Auth_token = isAuth() && isAuth().token;


useEffect(()=>{
  getBraintreeToken(userId,Auth_token)
  .then(res => {
    setBraintreeData({braintreeToken : res.token})
    })
.catch(err => setBraintreeData({error : err}))
    

},[])




     const totalCart = (products) => {

        return products.reduce((total, product) => total + (product.price * product.count), 0)

    }

    const dropIn = () => (
      
         <div>
          {braintreeData.braintreeToken !== null && products.length > 0 && (

            <DropIn
            options={{ authorization : braintreeData.braintreeToken, paypal : {flow : "vault"} }}
            onInstance={instance => (braintreeData.instance = instance)}
          />
          )}
         </div>
              )

    const buyNow = () => {
      braintreeData.instance.requestPaymentMethod()
                  .then(data => {
                    let paymentData = {
                      amount : totalCart(products),
                      paymentMethodNonce : data.nonce
                    }
                    processPayment(userId, Auth_token, paymentData)
                            .then(res => console.log(res))
                            .catch(err => console.log(err))
                    
                  })
    }
    

    const checkOutButton = () => {
        if(isAuth()){
            return (
              <>
                {dropIn()}
                <button onClick={buyNow} type="button" className="btn btn-success btn-rounded">
                   <i className="fas fa-credit-card mx-2"></i> 
                    PAY
                    </button>
              </>
                
            )
        }
         return (
            <Link to="/login">
                <button type="button" className="btn btn-warning btn-rounded">
                   <i className="fas fa-sign-in-alt mx-2"></i>
                    SIGN IN
                    </button>
            </Link>
         )
    }

    

  return (
    <div>
        <h2><span className="badge badge-secondary">TOTAL : {totalCart(products)}</span></h2>
        <hr />
        {checkOutButton()}

    </div>
  )
}

export default Checkout