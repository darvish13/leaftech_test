import React from 'react'
import { Switch, Route, NavLink, useLocation } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import { MaxWidth } from '../../styles/globalStyles'
import AddSensor from './AddSensor'
import { Main, Tab, Tabs } from './lab_styles'
import Sensors from './Sensors'

const Lab = () => {
  const { pathname } = useLocation()

  return (
    <>
      <Header />

      <MaxWidth>
        <Main>
          <Tabs>
            <NavLink to='/lab/add-sensor'>
              <Tab active={pathname == '/lab/add-sensor'}>Add Sensor</Tab>
            </NavLink>

            <NavLink to='/lab/sensors'>
              <Tab active={pathname == '/lab/sensors'}>Sensors List</Tab>
            </NavLink>
          </Tabs>

          <Switch>
            <Route path='/lab/add-sensor'>
              <AddSensor />
            </Route>

            <Route path='/lab/sensors'>
              <Sensors />
            </Route>
          </Switch>
        </Main>
      </MaxWidth>

      <Footer />
    </>
  )
}

export default Lab
