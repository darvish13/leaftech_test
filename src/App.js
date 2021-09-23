import Home from './pages/home/Home'
import { Switch, Route } from 'react-router-dom'
import Lab from './pages/lab/Lab'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

function App() {
  return (
    <>
      <Header />

      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>

        <Route path='/lab'>
          <Lab />
        </Route>
      </Switch>

      <Footer />
    </>
  )
}

export default App
