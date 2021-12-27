import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  return (
    <BrowserRouter>
      <header className="header">
        <Navigation />
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
