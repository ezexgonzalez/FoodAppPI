import './App.css';
import { Route, Routes } from "react-router-dom";
import React from 'react';
import Inicio from './Components/Inicio/inicio';
import Home from "./Components/home/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio/>}/>
      <Route path="/home" element={<Home/>} />
    </Routes>
  );
}

export default App;
