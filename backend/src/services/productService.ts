import Product from '../models/productModel'
import mongoose from 'mongoose'



const getProducts = async (_end:any,_start:any,q:any) => {
    
  
    if(!_end) _end =  await Product.count({})
    if(!_start) _start = 0
  
    
    const keyword = q ? {
          name: {
            $regex: q,
            $options: 'i',
          },
        }
    : {}
  
    const recordes = _end - _start
    if(recordes <= 0) {
      throw new Error('somthing went wrong with end & start')
    } 
    const skiping = _start / recordes
    const products = await Product.find({...keyword})
                            .limit(recordes)
                            .skip(skiping * recordes)
  
    const count = await Product.count({})

    return {count,products}
}

const getProductById = async (paramId:any) => {
    const product = await Product.findById(paramId)
  
    if (product) {
      return product
    } else {
      throw new Error('Product not found')
    }
}

const updateProduct = async (productItem:any,paramId:any) => {
    const {
      years,
      price,
      name,
      musicPlayer,
      image,
      contery,
      category,
      description,
      typeOfStyle,
      versions,
      date
    } = productItem
  
  
    const product = await Product.findById(paramId)
  
    if (product) {
      product.years = years
      product.price = price
      product.name = name
      product.musicPlayer = musicPlayer
      product.image = image
      product.contery = contery
      product.category = category
      product.description = description
      product.typeOfStyle = typeOfStyle
      product.versions = versions
      product.date = date
  
      const updatedProduct = await product.save()
      return updatedProduct
    } else {
      throw new Error('Product not found')
    }
}


const createProduct = async (productItem:any) => {
    const {
      years,
      price,
      name,
      musicPlayer,
      image,
      contery,
      category,
      description,
      typeOfStyle,
      versions,
      date
    } = productItem
  
    const product = new Product({
      years,
      price,
      id:'000',
      user: new mongoose.mongo.ObjectId(), //ww need to fix this with token -<<<<<<<<<<<<<<<
      name,
      musicPlayer,
      image,
      contery,
      category,
      description,
      typeOfStyle,
      versions,
      date
    })
  
    const createdProduct = await product.save()
    return createdProduct
}

const deleteProduct = async (paramId:any) => {
    const product = await Product.findById(paramId)
  
    if (product) {
      await product.remove()
      return { message: 'Product removed' }
    } else {
      throw new Error('Product not found')
    }
}


const updateImage = async (paramId:any,image:any) => {
     
    const product = await Product.findById(paramId)
  
    if (product) {
      product.image = image
      const updatedProduct = await product.save()
      return updatedProduct
    } else {
      throw new Error('Product not found')
    }
}

export default {
    createProduct,
    getProducts, 
    getProductById,
    updateProduct,
    deleteProduct,
    updateImage
}