import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navigation from './components/Navigation';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Hello from './components/Hello';
import ClientsList from './components/ClientsList';
import AboutUs from './pages/AboutUs';
import WorkingHours from './pages/WorkingHours';
import Clicker from './pages/Clicker';
import Form from './pages/Form';
import './styles/App.css';

const App = () => {

  const imagesFolder: __WebpackModuleApi.RequireContext = require.context('./public/svg', true);
  const cartImage: string = imagesFolder('./cart.svg').default;

  return (
    <BrowserRouter>
      <header className="header">
        <Navigation />
        <Link to="/cart">
          <div className="header__cart">
            <div className="header__cart-container">
              <div className="header__cart-price">
                100$
              </div>
              <div className="header__cart-divider"></div>
              <div className="header__cart-quantity-container">
                <img src={cartImage} alt="" className="header__cart-image" />
                <div className="header__cart-quantity">4</div>
              </div>
            </div>
          </div>
        </Link>
      </header>
      <main className="main">
          <Routes>
            <Route path="/home" element={<Home name="Home" />} />
            <Route path="/cart" element={<Cart name="Cart" />} />
            <Route path="/hello" element={<Hello />} />
            <Route path="/clients-list" element={<ClientsList />} />
            <Route path="/about" element={<AboutUs name="AboutUs" />} />
            <Route path="/working-hours" element={<WorkingHours />} />
            <Route path="/clicker" element={<Clicker />} />
            <Route path="/form" element={<Form />} />
          </Routes>
      </main>
      <footer className="footer">
        <Navigation />
      </footer>
    </BrowserRouter>
  );
}

export default App;
