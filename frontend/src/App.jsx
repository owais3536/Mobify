import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import Home from "./pages/Home";
import Categories from "./pages/Categories";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BasicNavbar from "./components/BasicNavbar";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./store/userSlice";
import AddPost from './pages/AddPost';
import PostDetails from './pages/PostDetails';
import Profile from './pages/Profile';
import PostEdit from './pages/PostEdit';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        <BasicNavbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="categories" element={<Categories />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path='/post' element={<AddPost />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/post-details/:postID' element={<PostDetails />} />
          <Route path='/edit-post/:id' element={<PostEdit />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
