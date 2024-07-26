import express from "express";
import { postReview } from '../controllers/reviwControllers.js';

const router = express.Router();

router.post('/reviews', postReview);

export default router;
