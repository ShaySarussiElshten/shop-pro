import React, { useState } from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import HomeScreen from '../Screen/HomeScreen/HomeScreen'




const Router = () => {

  
  
  return (
    <Routes>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="*"  element={<Navigate to="/home" />} />
    </Routes>
  )
}

export default Router