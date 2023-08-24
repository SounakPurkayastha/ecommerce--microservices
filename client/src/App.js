import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Success from "./pages/Success";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Register from "./pages/Register";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/auth-context";
import { DropdownContext } from './contexts/dropdown-context';



function App() {

  const dropdownCtx = useContext(DropdownContext);

  useEffect(() => {
    document.body.addEventListener('click', () => dropdownCtx.onUserClick(false));
  })

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/placeOrder" element={<PlaceOrder />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/register" element={ <Register/> }/>
      </Routes>
    </div>
  );
}

export default App;
