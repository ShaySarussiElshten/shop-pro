import Order from '../models/orderModel'
import {changekeysfromSongIdToProduct} from '../utils/orderUtiles'
import { v4 as uuidv4 } from 'uuid';




const addOrder = async (orderItemsArr:any,paymentMethod:any,totalPrice:any,userId:any) => {
    
  
    if (orderItemsArr && orderItemsArr.length === 0) {
      throw new Error('No order items')
    } else {
      
      const newOrderItems = changekeysfromSongIdToProduct(orderItemsArr)
  
      let orderNum = uuidv4()
      
      const order = new Order({
        orderItems:newOrderItems,
        user: userId,
        orderNumber: orderNum.slice(orderNum.length-6,orderNum.length-1),
        paymentMethod,
        totalPrice:Number(totalPrice),
      })
  
      
      const createdOrder = await order.save()

      return createdOrder
    }
}


const getMyOrders = async (_end:any, _start:any,userId:any) => {

    
    if(!_end) _end =  await Order.count({user: userId})
    if(!_start) _start = 0
  
    
    const recordes = _end - _start
    if(recordes <= 0) {
      throw new Error('somthing went wrong with end & start')
    } 
    const skiping = _start / recordes
    const orders = await Order.find({user: userId})
                            .limit(recordes)
                            .skip(skiping * recordes)
    
    const count = await Order.count({user: userId})                  
    
    return {count,orders}
}

const updateOrderToPaid = async (paramId:any,id:any,status:any,update_time:any,payer:any) => {
    const order = await Order.findById(paramId)
    
    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id,
        status,
        update_time,
        email_address: payer.email_address,
      }
  
      const updatedOrder = await order.save()
  
      return updatedOrder
    } else {
      throw new Error('Order not found')
    }
}

const getDownloadDetails = async (paramId:any) => {
    const order = await Order.findById(paramId)
    await order.populate('orderItems.product').execPopulate()
  
    const songLinks = []
    for(let i = 0; i < order.orderItems.length;i++){
       const versionName = order.orderItems[i].version
       songLinks.push(
         {
           link:order.orderItems[i].product.versions.find((version:any) => version.name === versionName).link,
           name:order.orderItems[i].name,
           version:order.orderItems[i].version,
           id:i+1
        })
    }
  
    return songLinks
}
  

export default {
    addOrder,
    getMyOrders,
    updateOrderToPaid,
    getDownloadDetails
}