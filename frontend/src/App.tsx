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
import { Product } from './interface/Product';
import { Console } from 'console';
import { ProductCart } from './interface/ProductCart';




function App() {

  const [cart,setCart] = useState<ProductCart[]>([])

  const changeCart =(cartArr : ProductCart[])=>{
     setCart(cartArr)
  }

  const storeAction: AppContext = {
     cart,
     changeCart
  };


  return (
     <Context.Provider value={storeAction}> 
          <BrowserRouter>
               <Navigation/>
               <Router /> 
         </BrowserRouter>
     </Context.Provider> 
 
  );
}

export default App;
