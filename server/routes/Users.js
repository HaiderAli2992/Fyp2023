import express from 'express'
import {googlesignUpController,updatePassword, logInController, resetPassword,signUpController,googlelogInController,forgotPasswordController } from '../controllers/auth.js'
import { getAllUsers, updateProfile } from '../controllers/users.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/signup', signUpController)
router.post('/login', logInController)
router.post('/googlelogin',googlelogInController)
router.post('/googlesignup',googlesignUpController)
router.post('/forgot-password',forgotPasswordController)
router.get('/getAllUsers', getAllUsers)
router.patch('/update/:id', auth, updateProfile)
router.get('/validateResetRequest/:id/:token',resetPassword)
router.post('/updatepassword/:id/:token',updatePassword)


export default router