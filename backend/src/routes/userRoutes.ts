import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteProduct
} from '../controllers/userController'
import { protect } from '../middleware/authMiddleware'


router.route('/')
      .post(registerUser)
      .get(getUsers)
router.route('/:id').get(getUserById)
                    .put(updateUser)
                    .delete(deleteProduct)
router.post('/login', authUser)
router.route('/profile/myProfile').get(protect, getUserProfile)


export default router
