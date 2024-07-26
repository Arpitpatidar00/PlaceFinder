import express from 'express';
import{
    
    deleteUser,
    getAllUsers,
    getSinleUser,
    updateUser,

} from "../controllers/userControllers.js";
const router =express.Router();

import{verifyUser} from '../utils/verifyToken.js';

router.put("/:id",verifyUser,updateUser);

router.delete("/:id",deleteUser);

router.get("/:id",getSinleUser);

router.get("/",getAllUsers);

export default router;



