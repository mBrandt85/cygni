import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, useLocation, Switch, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AnimatePresence } from 'framer-motion'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'

import theme from './util/theme'
import State, { useArtist } from './state'
import Search from './routes/Search'
import Artist from './routes/Artist'

function App() {
  const { init } = useArtist()
  const location = useLocation()

  return init ? (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        <Route exact path='/' component={Search} />
        <Route path='/artist/:id' component={Artist} />
      </Switch>
    </AnimatePresence>
  ) : null
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <State>
            <App />
          </State>
        </ThemeProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)