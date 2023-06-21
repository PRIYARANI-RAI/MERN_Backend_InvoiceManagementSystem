import invoice from "../model/Invoice";
import Customer from "../model/Customer";
import mongoose from "mongoose";
import jsPDF from "jspdf";
import "jspdf-autotable"
import { sendEmail } from '../Middleware/sendEmail';
import Admin from "../model/Admin";
import { output } from "pdfkit";

export const addinvoice = async (req, res) => {
  try {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });
    pdf.setFontSize(18);
    const title = "Invoice Details";
    const headers = [["Sr. No.", "Customer Name", "Status", "Grand Total"]]
    const data = req.body.item.map((data, index) => [
      index + 1,
      req.body.customername,
      req.body.status,
      req.body.grandtotal,
    ]);
    let content = {
      startY: 50,
      theme: "grid",
      head: headers,
      body: data,
    }

    pdf.autoTable(content);
    // const invoicefilename = `output/${req.body.customername}.pdf`
    // pdf.save(invoicefilename);
    const date = Date.now();
    // console.log(date);
    const fileName = date + "Invoice.pdf";
    const path = "output/" + fileName;
    // pdf.save(`output/${fileName}`)

    // const arr = result.item.map((data)=>{
    //   return `<div>
    //     <table border="1">
    //       <thead>
    //         <tr>
    //           <th>productname</th>
    //           <th>price</th>
    //           <th>quantity</th>
    //           <th>tax</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr>
    //           <td>${data.productname}</td>
    //           <td>${data.price}</td>
    //           <td>${data.quantity}</td>
    //           <td>${data.tax}</td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>`
    // })

    const addinvoicenew = new invoice({
      customer_id: req.body.customer_id,
      customername: req.body.customername,
      email: req.body.email,
      date: req.body.date,
      status: req.body.status,
      item: req.body.item,
      grandtotal: req.body.grandtotal,
      invoice_url: path
    });
    const result = await addinvoicenew.save();
    pdf.save(`output/${fileName}`)
    const arr = result.item.map((data) => {
      return `<div>
      <table border="1">
        <thead>
          <tr>
            <th>productname</th>
            <th>price</th>
            <th>quantity</th>
            <th>tax</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${data.productname}</td>
            <td>${data.price}</td>
            <td>${data.quantity}</td>
            <td>${data.tax}</td>
          </tr>
        </tbody>
      </table>
    </div>`
    })

    sendEmail(
      'raipriyarani@gmail.com',
      req.body.email,
      `Welcome ${req.body.customername}`,
      `Invoice data
        Status:${result.status}
        ${arr}`
    );
    res.send({
      status: true,
      message: "add Successfull",
      result: result,
    });
  } catch (err) {
    console.log(err);
  }
};
export const invoiceget = async (req, res) => {
  // const result = await invoice.find({},{customername:1,status:1});
  const result = await invoice.find();
  // console.log(result)
  if (result) {
    res.send({
      status: true,
      message: "All data fetched",
      result: result
    })
  }
}
//   export const invoiceget = async (req, res) => {
//     try {
//         let invoicedata = await invoice.aggregate(
//             [
//                {
//                   $lookup:{
//                       from:"Customer",
//                       localField:"_id",
//                       foreignField:"customer_id",
//                       as:"invoicedata"
//                            }
//                 },

//                 {$project:{
//                     customername:1,
//                     item:{total:1},
//                     status:1
//                     }
//                 }

//                 ]
//         )
//         console.log("invoicedata=========>",invoicedata)
//         res.send({ status: 200, message: "Invoice List", result: invoicedata })
//     }
//     catch (e) {
//         return res.send({ status: false, message: "error", code: 400,result:e })
//     }
// }


// export const deleteinvoice=async(req,res)=>{

//   console.log(req.body._id)

//     const deleteApp = await invoice.deleteOne({
//         _id:mongoose.Types.ObjectId(req.body._id)
//     });
//     res.send({
//         status:true,
//         message:"Deleted Successfully"
//     })
// }
export const invoiceDelete = async (req, res) => {
  try {
    var id = req.params.id;
    console.log(id)
    const result = await invoice.deleteOne({ _id: mongoose.Types.ObjectId(id) })
    if (result) {
      res.send({ status: 200, "message": "Deleted", result: result })
    }
    else {
      res.send({ status: 400, "message": "something went wrong" })
    }
  } catch (e) {
    return res.send({ status: false, message: "error", code: 400, result: e })
  }

}

export const UpdateInvoice = async (req, res) => {

  try {
    let jsondata = {};

    if (req.body.customername) {
      jsondata.customername = req.body.customername;
    }
    if (req.body.status) {
      jsondata.status = req.body.status;
    }
    if (req.body.email) {
      jsondata.email = req.body.email;
    }
    if (req.body.item) {
      jsondata.item = req.body.item;
    }
    if (req.body.grandtotal) {
      jsondata.grandtotal = req.body.grandtotal;
    }
    invoice.updateOne({ _id: req.body._id },

      { $set: jsondata },
      { new: true },
      (err, updatedlist) => {
        if (err) {
          res.send({ status: 404, message: "Failed", result: err })
        } else {
          res.send({ status: 200, message: "Updated Successfully", result: updatedlist })
        }
      })
  }
  catch (e) {
    console.log(e);
    return res.send({ status: false, message: "error", code: 400, result: e })
  }
}


export const getpaid = async (req, res) => {
  const result = await invoice.find({ status: "Paid" })
  if (result) {
    res.send({
      status: true,
      message: "status paid",
      result: result
    })
  }
}


export const getunpaid = async (req, res) => {
  const result = await invoice.find({ status: "Unpaid" })
  if (result) {
    res.send({
      status: true,
      message: "status unpaid",
      result: result
    })
  }
}


export const invoiceData = async (req, res) => {
  try {
    let invoicedetail = await Customer.find({});
    const estimate = await Customer.estimatedDocumentCount();
    const estimated = await invoice.estimatedDocumentCount();
    const countpaid = await invoice.countDocuments({ status: "unpaid" });

    res.send({
      status: 200, message: "Invoice data ", result: estimate, data: estimated,
      paid: countpaid, unpaid: countpaid
    })

  }
  catch (e) {

  }
}

export const getInvoiceById = async (req, res) => {
  const { id } = req.params;
  const result = await invoice.findById({
    _id: id
  })
  if (result) {
    res.send({
      status: true,
      message: " Invoice Data fetched",
      result: result,
    });
  }
};

