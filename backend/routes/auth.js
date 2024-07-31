import  Express  from "express";
import {login,register,updateUserProfile} from '../controllers/authControllers.js';


const router=Express.Router();
router.post('/register', register);
router.post('/login',login)
router.put("/update", updateUserProfile);


export default router;
