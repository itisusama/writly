import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Name from './pages/Name'
import Bio from './pages/Bio'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/name" element={<Name />} />
          <Route path="/bio" element={<Bio />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App