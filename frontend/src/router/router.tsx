import React, { useState } from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import { ROUTES } from '../enum/urls'
import CheckoutScreen from '../Screen/CheckoutScreen/CheckoutScreen'
import HomeScreen from '../Screen/HomeScreen/HomeScreen'
import MyOrderScreen from '../Screen/MyOrderScreen/MyOrderScreen'
import ProductScreen from '../Screen/ProductScreen/ProductScreen'
import SignInScreen from '../Screen/SignInScreen/SignInScreen'
import ThankYouScreen from '../Screen/ThankYouScreen/ThankYouScreen'



const Router = () => {

  
  
  return (
    <Routes>
          <Route path={ROUTES.HOME} element={<HomeScreen />} />
          <Route path={`${ROUTES.PRODUCT}/:id`} element={<ProductScreen />} />
          <Route path={ROUTES.CHECKOUT} element={<CheckoutScreen />} />
          <Route path={ROUTES.SIGN_IN} element={< SignInScreen/>} />
          <Route path={ROUTES.MY_ORDER} element={< MyOrderScreen/>} />
          <Route path={ROUTES.THANKS_PAGE} element={< ThankYouScreen/>} />
          <Route path={"*"}  element={<Navigate to={ROUTES.HOME} />} />
    </Routes>
  )
}

export default Router