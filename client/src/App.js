import './App.css';
import { Route, Routes } from "react-router-dom";
import React from 'react';
import Inicio from './Components/Inicio/inicio';
import Home from "./Components/home/home";
import RecipeDetail from './Components/RecipeDetail/recipeDetail';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/recipes/:id" element={<RecipeDetail/>}/>
    </Routes>
  );
}

export default App;
