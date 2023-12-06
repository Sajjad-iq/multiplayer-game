import { Routes, Route } from "react-router-dom"
import { Game, Home } from "./Pages"

function App() {


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/lose" element={<h1>You Lose</h1>} />
      <Route path="/win" element={<h1>You Win</h1>} />
    </Routes>
  )
}

export default App
