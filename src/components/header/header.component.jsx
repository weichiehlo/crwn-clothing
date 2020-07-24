import React from 'react'

import {HeaderContrainer,LogoContainer,OptionsContainer,OptionLink} from './header.styles'

import { ReactComponent as Logo } from '../../assets/crown.svg'
import { auth } from '..//../firebase/firebase.utils'
import { connect } from 'react-redux'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from '../../redux/user/user.selector'
import { selectCartHidden } from '../../redux/cart/cart.selectors'


const Header = ( { currentUser, hidden } )=>(
    <HeaderContrainer>
        <LogoContainer to="/">
            <Logo className='logo'/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/shop'>
                CONTACT
            </OptionLink>
            {
                currentUser ?
                <OptionLink as='div' onClick={()=>auth.signOut()}> SIGN OUT </OptionLink>
                :
                <OptionLink to='/signin'>
                    SINGIN
                </OptionLink>
            }
            <CartIcon/>
        </OptionsContainer>
        {
            hidden? null:<CartDropdown/>
            
        }
        
    </HeaderContrainer>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);