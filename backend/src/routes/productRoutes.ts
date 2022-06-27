import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct,
  updateImage
} from '../controllers/productController'



router.route('/')
            .get(getProducts)
            .post(createProduct)
router.route('/:id')
             .get(getProductById)
             .put(updateProduct)
             .delete(deleteProduct)

router.route('/:id/updateimage')
             .patch(updateImage)                

export default router
