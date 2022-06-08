import React, { useContext, useEffect, useState } from 'react'
import {Product} from '../../interface/Product'
import axios from 'axios'
import { BACKEND_URL } from '../../constants/urls'
import TextField from '@mui/material/TextField';

const HomeScreen = () => {
  

  const [products,setProducts] = useState<Product[]>([])
  
  useEffect(()=>{
     const fetData =async()=>{
          const {data} = await axios.get(`${BACKEND_URL}/products`)
          setProducts(data)
     }

     fetData()
  },[])

  const renderProducts = ()=> (
    products.map((product:Product) => {
          const {id,name,img,description,price} =product

          return (
          <div key={id} className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
          <div className="flex justify-center md:justify-end -mt-16">
            <img className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500" src={img} />
          </div>
          <div>
            <h2 className="text-gray-800 text-3xl font-semibold">{name}</h2>
            <p className="mt-2 text-gray-600">{description}</p>
          </div>
          <div className="flex justify-end mt-4">
            <span  className="text-xl font-medium text-indigo-500">{price}</span>
          </div>
        </div>
        )
    }
    )
  )




  return (
    <>
      <div className="flex">
        {renderProducts()}
      </div>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </>
  );
}

export default HomeScreen