import React, { useContext, useEffect, useState } from 'react'
import {Product} from '../../interface/Product'
import axios from 'axios'
import { BACKEND_URL } from '../../constants/urls'
import TextField from '@mui/material/TextField';
import Styled from './HomeScreen.style'

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
          <Styled.CardContainer key={id}>
                <Styled.ImgWaraaper>
                    <Styled.MainImg src={img} />
                </Styled.ImgWaraaper>
                <Styled.TextInfo>
                  <Styled.HeaderText>{name}</Styled.HeaderText>
                  <Styled.DescriptionText>{description}</Styled.DescriptionText>
                </Styled.TextInfo>
                <Styled.BottemWaraaper>
                  <Styled.PriceHeader>{price}</Styled.PriceHeader>
                </Styled.BottemWaraaper>
          </Styled.CardContainer >
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