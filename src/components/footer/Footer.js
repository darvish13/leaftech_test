import React from 'react'
import { MaxWidth } from '../../styles/globalStyles'
import {
  Copyright,
  CopyrightWrapper,
  FooterContent,
  FooterLinks,
  FooterMaxWidth,
  FooterSection,
  LinksCol,
  Logos,
  MainLink,
  SubLink,
  Logo
} from './Footer_styles'

const Footer = () => {
  return (
    <>
      <FooterSection>
        <FooterMaxWidth>
          <FooterContent>
            <Logo>LEAFTECH</Logo>

            <FooterLinks>
              <LinksCol>
                <MainLink>Home</MainLink>
              </LinksCol>

              <LinksCol>
                <MainLink>Services</MainLink>

                <SubLink>Shading automation</SubLink>
                <SubLink>Shading automation</SubLink>
                <SubLink>Building energy forecast</SubLink>
              </LinksCol>

              <LinksCol>
                <MainLink>The Lab</MainLink>

                <SubLink>Photovoltaics</SubLink>
                <SubLink>Improved planning</SubLink>
                <SubLink>Certification support</SubLink>
                <SubLink>Wind profile Analysis</SubLink>
                <SubLink>Feedback and Info App</SubLink>
              </LinksCol>

              <LinksCol>
                <MainLink>Follow us</MainLink>

                <Logos>
                  <img src='images/facebook-logo.svg' alt='' />
                  <img src='images/twitter-logo.svg' alt='' />
                  <img src='images/linkedin-logo.svg' alt='' />
                </Logos>
              </LinksCol>
            </FooterLinks>
          </FooterContent>
        </FooterMaxWidth>
      </FooterSection>

      <FooterMaxWidth>
        <CopyrightWrapper>
          <Copyright>
            <span>Privacy Policy & Terms of service</span>
            <span>Illustrations by www.freepik.com</span>
            <span>Copyright 2020 Leaftech Gmbh</span>
          </Copyright>
        </CopyrightWrapper>
      </FooterMaxWidth>
    </>
  )
}

export default Footer
