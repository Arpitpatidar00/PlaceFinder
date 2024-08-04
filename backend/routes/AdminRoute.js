import express from 'express';
import { register, login } from '../controllers/admin/admin-registration.js'; // Adjust the path as needed

const router = express.Router();

router.post('/register', register);
router.post('/login', login);


export default router;
