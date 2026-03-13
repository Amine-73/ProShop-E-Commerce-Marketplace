import express from 'express';
const router =express.Router();
import {authUser, registerUser,updateUserProfile} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/login',authUser);
router.route('/').post(registerUser);//Post/api/users
router.route('/profile').put(protect,updateUserProfile);


export default router;