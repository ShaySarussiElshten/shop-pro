import React,{useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Router from './router/router'
import Context from './Context/context'
import AppContext from './interface/AppContext'
import Navigation from './Components/Navigation/Navigation';
import { ProductCart } from './interface/ProductCart';
import ModalAddProduct from './Components/ModalAddProduct/ModalAddProduct'



function App() {

  const [cart,setCart] = useState<ProductCart[]>([])

  const changeCart =(cartArr : ProductCart[])=>{
     setCart(cartArr)
  }

  const storeAction: AppContext = {
     cart,
     changeCart
  };

  useEffect(() => {
     
   const cartItemsFromStorage = localStorage.getItem('cartItems')
   ? JSON.parse(localStorage.getItem('cartItems') || "")
   : []
    setCart(cartItemsFromStorage)
  },[])


  return (
     <Context.Provider value={storeAction}> 
          <BrowserRouter>
               <Navigation/>
               <Router /> 
         </BrowserRouter>
     </Context.Provider> 

   // <ModalAddProduct />
  );
}

export default App;
