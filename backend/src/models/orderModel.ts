import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  id: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  orderItems: [
    {
      name: { type: String, required: true },
      version: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
    },
  ],
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  orderNumber: {
    type: String,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paidAt: {
    type: Date,
  },
},
  {
    timestamps: true,
  })

  orderSchema.pre('save', async function (next) {
    if(this._id !== this.id){
       this.id = this._id
    }
    next()
  })

const Order = mongoose.model('Order', orderSchema)

export default Order
