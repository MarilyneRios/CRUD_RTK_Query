
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './Components/User';
import Header from './Components/Header';
import CreateUser from './Components/CreateUser';
import EditUser from './Components/EditUser';


function App() {

  return (
    <BrowserRouter>
      <Header/>
    <Routes>
      <Route path="/" element={<Users/>} ></Route>
      <Route path="/create" element={<CreateUser/>} ></Route>
      <Route path="/edit/:id" element={<EditUser/>} ></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
