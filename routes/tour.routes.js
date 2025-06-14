
import express from 'express';
import {getTours,getTourById,updateTourById,deleteTourById} from '../controllers/tour.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { checkRole } from '../middlewares/role.middleware.js';

const router = express.Router();

router
    .route('/')
    .get(getTours)

router
    .route('/:id')
    .get(getTourById)
    .put(verifyToken, checkRole('admin'), updateTourById)
    .delete(verifyToken, checkRole('admin'), deleteTourById);

export default router;