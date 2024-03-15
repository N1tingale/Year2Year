import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ForgotPassword from "./components/ForgotPassword";
import Tutors from "./components/Tutors";
import ReportUser from "./components/ReportUser";
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
        <Route path="/forgotpassword" Component={ForgotPassword}>
          Forgot Password
        </Route>
        <Route path="tutors-list" Component={Tutors}>
          Tutors list
        </Route>
        <Route path="report-user/:idBeingReported" Component={ReportUser}>
          Report User
        </Route>
      </Routes>
    </div>
  );
}

export default App;
