import { BrowserRouter, Route, Routes } from "react-router-dom"
import Profile from "./Profile"
import Base from "./Base"
import Login from "./Login"

function App() {

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Base />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
