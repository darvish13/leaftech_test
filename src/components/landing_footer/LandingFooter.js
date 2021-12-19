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
  Logo,
} from './landing_footer_styles'

const LandingFooter = () => {
  return (
    <>
      <FooterSection>
        <FooterMaxWidth>
          <FooterContent>
            <div>
              <span style={{ fontSize: '0.85em' }}>Powered By: </span>
              <Logo>LEAFTECH</Logo>
            </div>

            <Logos>
              <a
                href='https://www.facebook.com/leaftech.gmbh'
                target='_blank'
                rel='noreferrer'
              >
                <img src='images/facebook-logo.svg' alt='' />
              </a>

              <a
                href='https://twitter.com/leaftech_twitt?lang=en'
                target='_blank'
                rel='noreferrer'
              >
                <img src='images/twitter-logo.svg' alt='' />
              </a>

              <a
                href='https://www.linkedin.com/company/leaftech/'
                target='_blank'
                rel='noreferrer'
              >
                <img src='images/linkedin-logo.svg' alt='' />
              </a>
            </Logos>
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

export default LandingFooter
