import Customer from "../model/Customer";
import mongoose from "mongoose";
export const CustomerAdd = async (req, res) => {

    const customerdata = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
    }
    )
    const customernew = await customerdata.save()
    res.send({ status: 200, message: "Customer added successfully", result: customernew })
};

export const customerlist = async (req, res) => {
    let customerlist = await Customer.find({})
    res.send({ status: 200, message: "customer list", result: customerlist })

}

export const updatecustomer = async (req, res) => {
    try {
        let jsondata = {}

        if (req.body.name) {
            jsondata.name = req.body.name
        }
        if (req.body.phone) {
            jsondata.phone = req.body.phone
        }
        if (req.body.email) {
            jsondata.email = req.body.email
        }
        Customer.updateOne({ _id: req.body._id },
            { $set: jsondata },
            { new: true },
            (err, result) => {
                if (err) {
                    res.send({ status: 404, message: "failed", result: err })
                } else {
                    res.send({ status: 200, message: "update successfully", result: result })
                }
            }

        )

    } catch (e) {
        return res.send({ status: false, message: "error", code: 400, result: e })
    }

}

export const getCustomerById = async (req, res) => {
    const { id } = req.params;
    const result = await Customer.findById({
        _id: id
    })

    if (result) {
        res.send({
            status: true,
            message: "Data fetched",
            result: result,
        });
    }
};

export const customerDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Customer.deleteOne({ _id: mongoose.Types.ObjectId(id) })
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