import nodemailer from 'nodemailer'
import 'dotenv/config';
import configvalue from '../config'

const path = require('path');

const emailData = require('../config').get(process.env.NODE_ENV).EMAIL

export const sendEmail = (from, to, subject, text,attachments) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailData.username,
            pass: emailData.password
        }
    });
    let mailOptions = {
        from: from, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: text, // plain text body
        attachments: [
            {
                filename: 'Invoice.pdf',           
                 path: ('output/Invoice.pdf'),         
                contentType: 'application/pdf'        }
        ]
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            return false
            // console.log(error);
        }else{
            return true
        // console.log("Message Sent" + info.response)
        }
    });
}




