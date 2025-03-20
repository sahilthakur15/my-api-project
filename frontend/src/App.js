import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/Admindash';
import UsersList from './pages/Userslist';
import Movies from './pages/Movieslist';
import UserDash from './pages/Userdash';
import MovieDetail from './pages/Moviedetail';
import OrderPage from './pages/Orderpage';
import ProfilePage from './pages/Profilepage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup/>} />
        <Route path= "/AdminDashboard" element= {<AdminDashboard/>} />
        <Route path= "/users-list" element= {<UsersList/>} />
        <Route path= "/movies-list" element= {<Movies/>} />
        <Route path= "/UserDashboard" element= {<UserDash/>} />
        <Route path= "/movie-details/:_id" element= {<MovieDetail/>} />
        <Route path= "/orders" element= {<OrderPage/>} />
        <Route path= "/profile" element= {<ProfilePage/>} />
        
        

      </Routes>
    </Router>
  );
}

export default App;
