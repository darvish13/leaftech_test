import React from 'react'
import { MaxWidth } from '../../styles/globalStyles'
import { HeaderLinks, HeaderWrapper, HLink, Logo, MenuIcon } from './Header_styles'

const Header = () => {
  return (
    <>
      <MaxWidth>
        <HeaderWrapper>
          <Logo>LEAFTECH</Logo>

          <HeaderLinks>
            <HLink>Home</HLink>
            <HLink active>Services</HLink>
            <HLink>The Lab</HLink>
            <HLink>Contact us</HLink>
          </HeaderLinks>

          <MenuIcon src='images/menu.svg' />
        </HeaderWrapper>
      </MaxWidth>
    </>
  )
}

export default Header
