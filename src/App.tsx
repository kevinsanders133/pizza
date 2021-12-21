import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/App.css';
import Navigation from './components/Navigation';
import routes from './config/routes';

const HomeProps         = routes[0];
const CartProps         = routes[1];
const HelloProps        = routes[2];
const ClientsListProps  = routes[3];
const AboutUsProps      = routes[4];
const WorkingHoursProps = routes[5];
const ClickerProps      = routes[6];
const FormProps         = routes[7];

const App = () => {
  return (
    <BrowserRouter>
      <header className="header">
        <Navigation />
      </header>
      <main className="main">
          <Routes>
            <Route path={HomeProps.path} element={<HomeProps.element />} />
            <Route path={CartProps.path} element={<CartProps.element />} />
            <Route path={HelloProps.path} element={<HelloProps.element />} />
            <Route path={ClientsListProps.path} element={<ClientsListProps.element />} />
            <Route path={AboutUsProps.path} element={<AboutUsProps.element />} />
            <Route path={WorkingHoursProps.path} element={<WorkingHoursProps.element />} />
            <Route path={ClickerProps.path} element={<ClickerProps.element />} />
            <Route path={FormProps.path} element={<FormProps.element />} />
          </Routes>
      </main>
      <footer className="footer">
        <Navigation />
      </footer>
    </BrowserRouter>
  );
}

export default App;
