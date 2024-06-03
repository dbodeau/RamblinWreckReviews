import './css/App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Wrapper from './Wrapper';
import Login from './Login';

function App() {
  return (
  <Router>
    {/* Your application components and routes */}
    <Login />
    <Route path="/" element={<Login />} />
    <Route path="/" element={<Wrapper />} />
    <div className="App">
    </div>
  </Router>

  );
}

export default App;

