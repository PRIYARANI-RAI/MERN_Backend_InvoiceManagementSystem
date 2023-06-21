import express from 'express';
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
import admin from './routes/Admin'
import customer from './routes/Customer'
import invoice from './routes/Invoice'
app.use(cors({ origin: "*" }));
app.use("/upload",express.static("output"))
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json())
import {mongoconnection} from './db'

mongoconnection()

app.use("/admin",admin)
app.use("/customer",customer)
app.use("/invoice",invoice)
export default app;