import  Express  from "express";
import {login,register,updateUserProfile,authenticateToken} from '../controllers/authControllers.js';


const router=Express.Router();
router.post('/register', register);
router.post('/login',login)
router.put('/profileupdate/:userId', updateUserProfile);

router.get('/admin', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') {
      return res.sendStatus(403);
    }
    res.send('Admin access granted');
  });

export default router;
