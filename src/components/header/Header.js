import React from 'react'
import { Link } from 'react-router-dom'
import { MaxWidth } from '../../styles/globalStyles'
import {
  HeaderLinks,
  HeaderWrapper,
  HLink,
  Logo,
  MenuIcon,
} from './Header_styles'

const Header = () => {
  return (
    <>
      <MaxWidth>
        <HeaderWrapper>
          <Link to='/'>
            <Logo>LEAFTECH</Logo>
          </Link>

          <HeaderLinks>
            {/* <Link to='/'>
              <HLink>Home</HLink>
            </Link> */}

            <Link to='/lab'>
              <HLink active>Lab</HLink>
            </Link>

            {/* <Link to='/sandbox'>
              <HLink active>Sandbox</HLink>
            </Link> */}

            {/* <HLink>Services</HLink>
            <HLink>Contact us</HLink> */}
          </HeaderLinks>

          <MenuIcon src='images/menu.svg' />
        </HeaderWrapper>
      </MaxWidth>
    </>
  )
}

export default Header
