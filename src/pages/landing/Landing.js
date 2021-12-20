import React from 'react'
import { Link } from 'react-router-dom'
import LandingFooter from '../../components/landing_footer/LandingFooter'
import LandingHeader from '../../components/landing_header/LandingHeader'
import { Button, Img, Main, MaxWidth, P, Title } from './landing_styles'

const Landing = () => {
  return (
    <>
      <LandingHeader />

      <MaxWidth>
        <Main>
          <Img src='/images/window-sensors.png' alt='' />
          <P style={{ color: '#0087FF', marginTop: '1em' }}>Functional Alpha Version</P>

          <Title>Image Based Sensor Setup</Title>
          <P>Setup virtual sensors directly from your phone!</P>

          <Link to='/lab'>
            <Button>
              <span>Try Our Demo</span>
            </Button>
          </Link>
        </Main>
      </MaxWidth>

      <LandingFooter />
    </>
  )
}

export default Landing
