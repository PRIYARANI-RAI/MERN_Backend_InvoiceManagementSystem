import express from 'express';
import { CustomerAdd, customerlist, getCustomerById, updatecustomer,customerDelete } from '../controller/Customer';

const router = express.Router();

router.post("/customeradd",CustomerAdd);
router.get("/customerlist",customerlist)
router.put("/updatecustomer",updatecustomer)
router.get("/getCustomerById/:id",getCustomerById)
router.delete("/customerDelete/:id", customerDelete)


export default router;