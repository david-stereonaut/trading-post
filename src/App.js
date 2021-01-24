import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Container from './components/Container';
import Navbar from './components/Navbar/Navbar';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#59B192'
    },
    secondary: {
      main: "#EFC7C2"
    },
    tags: {
      main: '#7D82B8'
    }
  }
})

const App = inject('UserStore', 'SearchStore')(observer((props) => {

  const { UserStore, SearchStore } = props

  useEffect(() => {
    UserStore.fetchUser()
    SearchStore.initialSearch()
  }, [])

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Navbar />
          <Container />
        </div>
      </ThemeProvider>
    </Router>
  );
}))

export default App;