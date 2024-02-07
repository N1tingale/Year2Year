import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Profile from "./components/Profile";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Home}>
          text
        </Route>
        <Route path="/login" Component={Login}>
          Log In
        </Route>
        <Route path="signup" Component={SignUp}>
          Sign Up
        </Route>
        <Route path="/profile" Component={Profile}>
          Profile
        </Route>
      </Routes>
    </div>
  );
}

export default App;
