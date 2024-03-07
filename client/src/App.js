import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/AuthLayout/Login";
import Signup from './pages/AuthLayout/Signup';
import Home from './pages/AppLayout/Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
