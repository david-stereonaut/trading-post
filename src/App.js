import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Container from './components/Container';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Container />
      </div>
    </Router>
  );
}

export default App;