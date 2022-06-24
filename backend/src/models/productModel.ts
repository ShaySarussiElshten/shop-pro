import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)


const versionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true }
  },
  {
    timestamps: true,
  }
)



const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    id: {
      type: String
    },
    name: {
      type: String,
      required: true,
    },
    musicPlayer: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: 'https://thumbs.dreamstime.com/b/new-product-stamp-round-grunge-sign-label-181923461.jpg',
    },
    description: {
      type: String,
      required: true,
    },
    category:{
      type: String,
      required: true,
    },
    contery:{
      type: String,
      required: true,
    },  
    typeOfStyle: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    poplar: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    years: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    date: { 
      type: String, 
      default: Date 
    },
    versions:[versionSchema]
  },
  {
    timestamps: true,
  }
)


productSchema.pre('save', async function (next) {
  if(this._id !== this.id){
     this.id = this._id
  }
  next()
})


const Product = mongoose.model('Product', productSchema)



export default Product
