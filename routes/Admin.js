import express from 'express';
import { adminLogin,getUserbyid } from '../controller/Admin';
import { invoiceData } from '../controller/Invoice';
import { upload } from '../Middleware/uploadfile';
const router = express.Router();
import {verifytoken} from '../Middleware/verifyToken'

router.post("/adminLogin",adminLogin);
router.get("/invoicedata", invoiceData)

export default router;