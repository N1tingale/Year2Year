import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp"
import Home from "./pages/Home/Home"

// Main App component, holds the routes that lead to other pages
function App() {

  return (
    <Routes>
      <Route path='/' Component={Home}></Route>
      <Route path='/login' Component={Login}></Route>
      <Route path='/signup' Component={SignUp}></Route>
    </Routes>
  )
}

export default App
