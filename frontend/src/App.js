import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage, SignupPage, ActivationPage } from './Routes.js';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="/activation/:activation_token" element={<ActivationPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;