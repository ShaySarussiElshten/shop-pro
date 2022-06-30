import React, { useState } from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import { ROUTES } from '../enum/urls'
import CheckoutScreen from '../Screen/CheckoutScreen/CheckoutScreen'
import HomeScreen from '../Screen/HomeScreen/HomeScreen'
import ProductScreen from '../Screen/ProductScreen/ProductScreen'
import SignInScreen from '../Screen/SignInScreen/SignInScreen'



const Router = () => {

  
  
  return (
    <Routes>
          <Route path={ROUTES.HOME} element={<HomeScreen />} />
          <Route path={`${ROUTES.PRODUCT}/:id`} element={<ProductScreen />} />
          <Route path={ROUTES.CHECKOUT} element={<CheckoutScreen />} />
          <Route path={ROUTES.SIGN_IN} element={< SignInScreen/>} />
          <Route path={"*"}  element={<Navigate to={ROUTES.HOME} />} />
    </Routes>
  )
}

export default Router