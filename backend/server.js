require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// MongoDB Connection
const MONGO_URI = process.env.MONGODB_URL;
mongoose.connect(MONGO_URI)
    .then(() => console.log(" MongoDB Connected Successfully!"))
    .catch((err) => console.log(" MongoDB Error:", err.message));

// Invoice Schema
const invoiceSchema = new mongoose.Schema({
    invoiceNumber: String,
    client: { name: String, email: String, address: String, phone: String },
    items: [{ description: String, qty: Number, unitPrice: Number }],
    total: Number,
    status: { type: String, default: 'Draft' },
    issueDate: { type: Date, default: Date.now }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

// API Routes
app.post('/api/invoices', async (req, res) => {
    try {
        const newInvoice = new Invoice(req.body);
        await newInvoice.save();
        res.status(201).json(newInvoice);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.get('/api/invoices', async (req, res) => {
    try {
        const invoices = await Invoice.find().sort({ issueDate: -1 });
        res.json(invoices);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));