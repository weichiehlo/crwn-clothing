import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const onToken = token => {
    console.log(token);
    alert('Payment Successful')
}

const StripeCheckoutButton = ( {price} )=>{
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51H1IHZAeQxr5OAmthxyeGZakoiBI2mej7zsAQ3Zgqeo8h7y1TrvmNlVAS3z5brsa8zgO4PhsQZehTAcPUsiUGPmY00wcHMjGpD'
    return(
        <StripeCheckout
        label='Pay Now'
        name='CRWN Clothing Ltd'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        />
    )
};

export default StripeCheckoutButton