import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import NotFound404 from '../pages/NotFound404/NotFound404';
import Profile from '../pages/Profile/Profile';
import Register from '../pages/Register/Register';

function Router() {
  const user = useSelector((state) => state.auth.session);
  const userRoute = user?.username;
  return (
    <Routes>
      {user ? (
        <>
          <Route path="/login" element={<Navigate to={'/user/' + userRoute} />} />
          <Route path="/register" element={<Navigate to={'/user/' + userRoute} />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      )}
      <Route path="/user/:username" element={<Profile />} />
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}
export default Router;
