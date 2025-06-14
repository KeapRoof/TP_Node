
import express from 'express';
import { Signup,DeleteUser,UpdateUser,Login } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { checkRole } from '../middlewares/role.middleware.js';

const router = express.Router();

router
    .route('/signup')
    .post(Signup);

router
    .route('/login')
    .post(Login);

router
    .route('/:id')
    .delete(verifyToken, DeleteUser)
    .put(verifyToken, UpdateUser);

export default router;