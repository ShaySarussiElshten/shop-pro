import React, { useContext, useEffect, useState } from 'react'
import {Product} from '../../interface/Product'
import axios from 'axios'
import { BACKEND_URL } from '../../constants/urls'
import TextField from '@mui/material/TextField';
import Styled from './HomeScreen.style'
import useFetch from '../../hooks/useFetch';
import Spinner from '../../Components/Form/Spinner/Spinner';

const HomeScreen = () => {
  
  const {data:products,isLoading} = useFetch({
    method: 'get',
    url:`${BACKEND_URL}/products`
  })

  
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
       {isLoading ? 
         <Spinner />
       :
       <>
         <div className="flex">
          {renderProducts()}
        </div>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </>
       }
    </>
  );
}

export default HomeScreen