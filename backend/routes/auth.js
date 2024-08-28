import  Express  from "express";
import {login,register,updateUserProfile,authenticateToken} from '../controllers/authControllers.js';


const router=Express.Router();
router.post('/register', register);
router.post('/login',login)
router.put('/profileupdate/:userId', authenticateToken,updateUserProfile);



export default router;
