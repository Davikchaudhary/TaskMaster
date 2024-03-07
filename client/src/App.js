import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/AuthLayout/Login";
import Signup from './pages/AuthLayout/Signup';
import Home from './pages/AppLayout/Home';


function App() {
  const loggedIn = localStorage.getItem('loggedIn');
  console.log(loggedIn);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={loggedIn ? <Home /> : <Login />} />
        <Route path='/login' element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
