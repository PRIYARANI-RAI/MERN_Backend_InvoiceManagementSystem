import jsPDF from "jspdf";

const pdf = new jsPDF ({
orientation:"portrait",
unit:"cm",
format:"a4"
})

const createPDF = async (data) => {
pdf.setTextColor(0,0,0);
pdf.setFontSize(25);
pdf.text("Invoice Date", 12 ,10);
pdf.setFontSize(18);
doc.text(60, 60, `Customer Name:${data.customername}`)
doc.text(60, 100, `Quantity:${data.email}`)
doc.text(60, 120, `Date:${data.date}`)
doc.text(60, 140, `Price:${data.status}`)
doc.text(60, 160, `Tax:${data.productname}`)
doc.text(60, 180, `Total:${data.price}`)
doc.save(`${data.customername}.pdf`)

const pdfOutput = pdf.output("dataurstring");
return pdfOutput;
};

const sendPDF = async () => {
    let pdfOutput = await createPDF();

    emailClient.sendEmail({
        from : "raipriyarani@gmail.com",
        to:"railalitpriyarani@gmail.com",
        subject:"Test",
        text:"Test",
        attachements:[{path: pdfOutput}]
    })
    console.log(sendPDF);
}