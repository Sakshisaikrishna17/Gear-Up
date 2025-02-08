import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './pages/signup';
import Login from './pages/login';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<SignUp/>} />
      <Route path='/login' element={<Login/>} />
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
