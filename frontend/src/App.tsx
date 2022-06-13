import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Checkbox from '@mui/material/Checkbox';
import {BrowserRouter} from 'react-router-dom';
import Router from './router/router'
import {Person} from './interface/person';
import Context from './Context/context'
import AppContext from './interface/AppContext'
import Navigation from './Components/Navigation/Navigation';




function App() {

  
  const data = {}

  const personAction: AppContext = {
       data
  };

  return (
     <Context.Provider value={personAction}> 
          <BrowserRouter>
               <Navigation/>
               <Router /> 
         </BrowserRouter>
     </Context.Provider> 
 
  );
}

export default App;
