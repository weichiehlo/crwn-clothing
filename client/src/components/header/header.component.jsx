import React from 'react'

import {HeaderContrainer,LogoContainer,OptionsContainer,OptionLink} from './header.styles'

import { ReactComponent as Logo } from '../../assets/crown.svg'
import { connect } from 'react-redux'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from '../../redux/user/user.selector'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { signOutStart }from '../../redux/user/user.action'


const Header = ( { currentUser, hidden, signOutStart } )=>(
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
                <OptionLink as='div' onClick={signOutStart}> SIGN OUT </OptionLink>
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

const mapDispatchToProps = dispatch=>({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps,mapDispatchToProps)(Header);