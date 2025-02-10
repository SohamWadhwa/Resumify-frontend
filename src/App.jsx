import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Tips from './pages/Tips';
import Aboutme from './pages/About';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tips" element={<Tips />} />
          <Route path='/about-me' element={<Aboutme />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
