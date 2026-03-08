import './App.css';
import { useEffect } from "react";
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateComponent';
import Dashboard from './components/dashboard/Dashboard';

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
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;