import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel'
import Order from '../models/orderModel'
import { RequestHandler } from 'express'

const protect = asyncHandler(async (req:any, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET ?? '') as  jwt.JwtPayload

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})


const protectDownload = asyncHandler(async (req, res, next) => {
  let token
  let orderId
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      orderId = req.params.id

      const decoded = jwt.verify(token, process.env.JWT_SECRET ?? '') as  jwt.JwtPayload

      const oredr = await Order.findById(orderId)

      if(!oredr) throw new Error('Not found, order')

      if(oredr.user.toString() !== decoded.id) throw new Error('Not match user')

      if(!oredr.isPaid) throw new Error('the order is not paid')

      next()
    } catch (error:any) {
      console.error(error)
      res.status(401)
      throw new Error(error.message)
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin: RequestHandler = (req:any, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin, protectDownload}
