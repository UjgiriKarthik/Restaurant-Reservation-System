import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import dotenv from 'dotenv';
dotenv.config({ path: "./config/config.env" });


export const sendReservation = async (req, res, next) => {
    const { firstName, lastName, email, phone, time, date } = req.body;

    console.log({ firstName, lastName, email, phone, date, time });

    if (!firstName || !lastName || !email || !phone || !time || !date) {
        return next(new ErrorHandler("Please fill full reservation form!", 400));
    }

    try {
        // Save reservation
        const reservation = await Reservation.create({
            firstName,
            lastName,
            email,
            phone,
            time,
            date,
        });

        // Create folder if not exists
        const folderPath = path.resolve("reservations");
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        // Generate PDF
        const pdfPath = `${folderPath}/${reservation._id}.pdf`;
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(pdfPath));

        doc.fontSize(20).text("Reservation Confirmation", { align: "center" });
        doc.moveDown(1.5);
        doc.fontSize(14);
        doc.text(`Reservation ID: ${reservation._id}`);
        doc.text(`Name: ${firstName} ${lastName}`);
        doc.text(`Email: ${email}`);
        doc.text(`Phone: ${phone}`);
        doc.text(`Date: ${date}`);
        doc.text(`Time: ${time}`);
        doc.moveDown();
        doc.text("Thank you for your reservation. We look forward to serving you!");
        doc.end();

        // Email setup
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Karthik's Restaurant" <${process.env.MAIL_USER}>`,
            to: email,
            subject: "Reservation Confirmation",
            text: `Hi ${firstName}, your reservation has been confirmed. Please find the attached confirmation PDF.`,
            attachments: [
                {
                    filename: "Reservation.pdf",
                    path: pdfPath,
                },
            ],
        };

        await transporter.sendMail(mailOptions);

        // Optional: Delete the PDF file after sending
        fs.unlinkSync(pdfPath);

        res.status(200).json({
            success: true,
            message: "Reservation sent and confirmation email delivered successfully",
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const ValidationErrors = Object.values(error.errors).map(
                (err) => err.message
            );
            return next(new ErrorHandler(ValidationErrors.join(" , "), 400));
        }
        return next(error);
    }
};
console.log("MAIL_USER:", process.env.MAIL_USER);
console.log("MAIL_PASS:", process.env.MAIL_PASS);


// Get all reservations
export const getAllReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find().sort({ date: -1, time: 1 });
        res.status(200).json({
            success: true,
            reservations,
        });
    } catch (error) {
        return next(error);
    }
};
