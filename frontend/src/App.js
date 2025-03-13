import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/Admindash';
import UsersList from './pages/Userslist';
import Movies from './pages/Movieslist';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup/>} />
        <Route path= "/AdminDashboard" element= {<AdminDashboard/>} />
        <Route path= "/users-list" element= {<UsersList/>} />
        <Route path= "/movies-list" element= {<Movies/>} />
        

      </Routes>
    </Router>
  );
}

export default App;
