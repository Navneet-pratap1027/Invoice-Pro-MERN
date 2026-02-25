import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateInvoice() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [invoice, setInvoice] = useState({
        invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
        client: { name: '', email: '', address: '', phone: '' },
        items: [{ description: '', qty: 1, unitPrice: 0 }],
        status: 'Unpaid'
    });

    // Items handle 
    const updateItem = (index, field, value) => {
        const newItems = [...invoice.items];
        newItems[index][field] = field === 'description' ? value : Number(value);
        setInvoice({ ...invoice, items: newItems });
    };

    const addItem = () => {
        setInvoice({ ...invoice, items: [...invoice.items, { description: '', qty: 1, unitPrice: 0 }] });
    };

    // Save Function
    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Total calculate 
        const total = invoice.items.reduce((acc, item) => acc + (item.qty * item.unitPrice), 0);
        
        try {
            await axios.post('http://localhost:5000/api/invoices', { ...invoice, total });
            alert(" Invoice Created Successfully!");
            navigate('/dashboard');
        } catch (err) {
            alert(" Error saving invoice");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black italic text-slate-800 tracking-tight">Generate New Invoice</h2>
                <button 
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest italic shadow-xl shadow-blue-100 hover:bg-blue-700 transition border-b-4 border-blue-800"
                >
                    {loading ? "Saving..." : "Save Invoice ⊕"}
                </button>
            </div>

            <form className="space-y-8">
                {/* Client Details */}
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                    <h3 className="text-[10px] font-black uppercase text-slate-400 italic mb-6 tracking-widest">Bill To (Client)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input 
                            placeholder="Client Name" 
                            className="bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none focus:border-blue-500 font-bold italic text-sm"
                            onChange={e => setInvoice({...invoice, client: {...invoice.client, name: e.target.value}})} 
                        />
                        <input 
                            placeholder="Client Email" 
                            className="bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none focus:border-blue-500 font-bold italic text-sm"
                            onChange={e => setInvoice({...invoice, client: {...invoice.client, email: e.target.value}})} 
                        />
                    </div>
                </div>

                {/* Items Section */}
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                    <h3 className="text-[10px] font-black uppercase text-slate-400 italic mb-6 tracking-widest">Items & Services</h3>
                    {invoice.items.map((item, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end">
                            <div className="md:col-span-2">
                                <input 
                                    placeholder="Description" 
                                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl font-bold italic text-sm"
                                    value={item.description}
                                    onChange={e => updateItem(index, 'description', e.target.value)}
                                />
                            </div>
                            <input 
                                type="number" 
                                placeholder="Qty" 
                                className="bg-slate-50 border border-slate-100 p-4 rounded-xl font-bold italic text-sm"
                                value={item.qty}
                                onChange={e => updateItem(index, 'qty', e.target.value)}
                            />
                            <input 
                                type="number" 
                                placeholder="Price" 
                                className="bg-slate-50 border border-slate-100 p-4 rounded-xl font-bold italic text-sm"
                                value={item.unitPrice}
                                onChange={e => updateItem(index, 'unitPrice', e.target.value)}
                            />
                        </div>
                    ))}
                    <button 
                        type="button" 
                        onClick={addItem}
                        className="mt-4 text-blue-600 font-black text-[10px] uppercase italic hover:underline"
                    >
                        + Add Another Item
                    </button>
                </div>
            </form>
        </div>
    );
}