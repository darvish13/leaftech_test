import React from 'react'
import { Link } from 'react-router-dom'
import { MaxWidth } from '../../styles/globalStyles'
import {
  HeaderLinks,
  HeaderWrapper,
  HLink,
  Logo,
  MenuIcon,
} from './landing_header_styles'

const LandingHeader = () => {
  return (
    <>
      <MaxWidth>
        <HeaderWrapper>
          <Link to='/'>
            <Logo>LEAFTECH</Logo>
          </Link>

          <MenuIcon src='images/menu.svg' />
        </HeaderWrapper>
      </MaxWidth>
    </>
  )
}

export default LandingHeader
