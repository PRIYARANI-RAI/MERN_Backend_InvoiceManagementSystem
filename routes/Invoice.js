import express from "express";
import {addinvoice,invoiceget,invoiceDelete, getpaid, getunpaid,UpdateInvoice,getInvoiceById} from '../controller/Invoice';

const router = express.Router();

router.post("/addinvoice",addinvoice)
router.get("/invoiceget",invoiceget)
router.delete("/deletinvoice/:id",invoiceDelete)
router.get("/getpaid",getpaid)
router.get("/getunpaid",getunpaid)
router.put("/updateinvoice", UpdateInvoice)
router.get("/getInvoiceById/:id",getInvoiceById)
export default router;