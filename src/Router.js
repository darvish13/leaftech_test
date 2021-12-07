import { Switch, Route } from 'react-router-dom'
import React from 'react'
import Lab from './pages/lab/Lab'
import Sandbox from './pages/sandbox/Sandbox'
import Home from './pages/home/Home'

const Router = () => {
  return (
    <>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>

        <Route path='/lab'>
          <Lab />
        </Route>

        <Route path='/sandbox'>
          <Sandbox />
        </Route>
      </Switch>
    </>
  )
}

export default Router
