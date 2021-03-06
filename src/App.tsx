import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navigation from './components/Navigation';
import Cart from './pages/Cart';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import WorkingHours from './pages/WorkingHours';
import OrderInfo from './pages/OrderInfo';
import Confirm from './pages/Confirm';
import './styles/App.css';

interface IData {
  id: string;
  quantity: string;
  size: string;
  extrasIds: Array<string>;
  defaultPrice: string;
  finalPrice: string;
}

const App = () => {

  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const imagesFolder: __WebpackModuleApi.RequireContext = require.context('./public/svg', true);
  const cartImage: string = imagesFolder('./cart.svg').default;

  const updateCart = () => {
    const cartString: string | null = localStorage.getItem('cart') ?? null;
    if (cartString) {
      const arr: Array<IData> = JSON.parse(cartString);
      setQuantity(arr.length);

      let price = 0;
      arr.forEach((e: IData) => {
        price += Number(e.finalPrice);
      });
      setPrice(Number(price.toFixed(2)));
    } else {
      setPrice(0);
      setQuantity(0);
    }
  }

  useEffect(() => {
    updateCart();
  }, []);

  return (
    <BrowserRouter>
      <header className="header">
        <div className="logo">PIZZA SHOP</div>
        <Navigation />
        <Link to="/cart">
          <div className="header__cart">
            <div className="header__cart-container">
              <div className="header__cart-price">
                {price}$
              </div>
              <div className="header__cart-divider"></div>
              <div className="header__cart-quantity-container">
                <img src={cartImage} alt="" className="header__cart-image" />
                <div className="header__cart-quantity">{quantity}</div>
              </div>
            </div>
          </div>
        </Link>
      </header>
      <main className="main">
          <Routes>
          <Route path="/" element={<Home updateCart={updateCart} />} />
            <Route path="/home" element={<Home updateCart={updateCart} />} />
            <Route path="/cart" element={<Cart updateCart={updateCart} />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/working-hours" element={<WorkingHours />} />
            <Route path="/order-info" element={<OrderInfo />} />
            <Route path="/confirm" element={<Confirm />} />
          </Routes>
      </main>
      {/* <footer className="footer">
        <Navigation />
      </footer> */}
    </BrowserRouter>
  );
}

export default App;
