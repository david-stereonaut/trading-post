import { createMuiTheme, ThemeProvider } from '@material-ui/core';
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
      main: "#2F3061"
    }
  }
})

function App() {
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
}

export default App;