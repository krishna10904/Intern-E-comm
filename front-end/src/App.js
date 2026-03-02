import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateComponent';
import Dashboard from './components/dashboard/Dashboard';
import AttendancePage from './components/dashboard/AttendancePage';
import LeavePage from './components/dashboard/LeavePage';
import Cart from './components/Cart';
import Profile from './components/Profile';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />

        <Routes>

          {/* 🔒 Private Routes */}
          <Route element={<PrivateComponent />}>

            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/cart" element={<Cart />} />

            {/* Attendance & Leave */}
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/leave" element={<LeavePage />} />

          </Route>

          {/* 🔓 Public Routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </BrowserRouter>

    
    </div>
  );
}

export default App;