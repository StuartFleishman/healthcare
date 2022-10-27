import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import CoachSignUp from './components/CoachSignUp/CoachSignUp';
import CoachLogin from './components/CoachLogin/CoachLogin';
import CoachHome from './components/CoachHome/CoachHome';
import CoachProfile from './components/CoachProfile/CoachProfile';
import UserRegister from './components/UserRegister/UserRegister';
import UserLogin from './components/UserLogin/UserLogin';
import UserHome from './components/UserHome/UserHome';
import UserProfile from './components/UserProfile/UserProfile';
import UserAppointments from './components/UserAppointments/UserAppointments';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element={<Home/>} />
        <Route path = "/home" element = {<Home/>}/>
        <Route path = "/coachsignup" element = {<CoachSignUp/>} />
        <Route path = "/coachlogin" element = {<CoachLogin/>} />
        <Route path = "/coachHome" element = {<CoachHome/>}/>
        <Route path = "/coachschedules" element = {<CoachHome/>}/>
        <Route path = "/coachviewprofile" element = {<CoachProfile/>}/>
        <Route path = "/usersignup" element = {<UserRegister/>} />
        <Route path = "/userlogin" element = {<UserLogin/>} />
        <Route path = "/userhome" element = {<UserHome/>} />
        <Route path = "/userviewprofile" element = {<UserProfile/>} />
        <Route path = "/userappointments" element = {<UserAppointments/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
