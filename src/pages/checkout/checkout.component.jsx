import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector} from 'reselect'
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component'
import {CheckoutPageContainer,CheckoutHeaderContainer,CheckoutBlockContainer,TotalContainer,TestWarningContainerContainer} from './checkout.styles'

const CheckoutPage = ({cartItems, total}) =>(
    <CheckoutPageContainer>
        <CheckoutHeaderContainer>
            <CheckoutBlockContainer>
                <span>Product</span>
            </CheckoutBlockContainer>
            <CheckoutBlockContainer>
                <span>Description</span>
            </CheckoutBlockContainer>
            <CheckoutBlockContainer>
                <span>Quantity</span>
            </CheckoutBlockContainer>
            <CheckoutBlockContainer>
                <span>Price</span>
            </CheckoutBlockContainer>
            <CheckoutBlockContainer>
                <span>Remove</span>
            </CheckoutBlockContainer>
        </CheckoutHeaderContainer>

        {
            cartItems.map(cartItem=>
                <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
            )
        }
        <TotalContainer>
            <span>TOTAL: ${total}</span>
        </TotalContainer>

        <TestWarningContainerContainer>
            *Please use the following test credit card for payments*
            <br/>
            4242 4242 4242 4242 - Exp: 01/21 - CVV:123
        </TestWarningContainerContainer>

        <StripeCheckoutButton price={total}/>
    </CheckoutPageContainer>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage)
