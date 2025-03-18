import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Home from './Pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './Pages/Users';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/users' element={<Users/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
