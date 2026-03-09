import './App.css';
import { useEffect } from "react";
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignUp from './components/SignUp';
import Login from './components/Login';
import PrivateComponent from './components/PrivateComponent';

import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateComponent';

import Dashboard from './components/dashboard/Dashboard';
import AttendancePage from './components/dashboard/AttendancePage';
import LeavePage from './components/dashboard/LeavePage';

import Cart from './components/Cart';
import Profile from './components/Profile';
import Orders from './components/Orders';
import Payment from './components/Payment';

import AddCategory from "./components/AddCategory";
import CategoryList from "./components/CategoryList";
import UpdateCategory from "./components/UpdateCategory";

function App() {

  useEffect(() => {

    const wakeBackend = async () => {
      try {
        await fetch("https://intern-e-comm1.onrender.com");
        console.log("Backend awake");
      } catch (err) {
        console.log("Backend waking...");
      }
    };

    wakeBackend();

  }, []);

  return (
    <div className="App">
      <BrowserRouter>

        <Nav />

        <Routes>

          <Route element={<PrivateComponent />}>

            <Route path="/" element={<Dashboard />} />

            <Route path="/products" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />

            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            
            <Route path="/profile" element={<Profile />} />

            <Route path="/categories" element={<CategoryList />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/update-category/:id" element={<UpdateCategory />} />

            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/leave" element={<LeavePage />} />

          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;