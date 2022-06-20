import React, { useState } from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import { URLS } from '../enum/urls'
import CheckoutScreen from '../Screen/CheckoutScreen/CheckoutScreen'
import HomeScreen from '../Screen/HomeScreen/HomeScreen'
import ProductScreen from '../Screen/ProductScreen/ProductScreen'



const Router = () => {

  
  
  return (
    <Routes>
          <Route path={URLS.HOME} element={<HomeScreen />} />
          <Route path={`${URLS.PRODUCT}/:id`} element={<ProductScreen />} />
          <Route path={URLS.CHECKOUT} element={<CheckoutScreen />} />
          <Route path={"*"}  element={<Navigate to={URLS.HOME} />} />
    </Routes>
  )
}

export default Router