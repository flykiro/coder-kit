import React, { StrictMode } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store'
import Desktop from './pages/Desktop'
import { SnackbarProvider ,SnackbarProviderProps} from 'notistack';
import NavigationBar from './components/NavigationBar'

export default function App() {
  return <StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={8}>

        <NavigationBar/>

        <Router>
          <Route path="/desktop" component={Desktop} />
        </Router>
        
      </SnackbarProvider>
    </Provider>
  </StrictMode>
}