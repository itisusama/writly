import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Name from './pages/Name'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/name" element={<Name />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App