import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StatCard = ({ label, value, subtext, icon, color, trend }) => (
  <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm flex-1 min-w-[250px]">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${color} text-white shadow-lg`}>{icon}</div>
      <span className="bg-green-50 text-green-500 text-[10px] font-black px-2 py-1 rounded-full border border-green-100 italic">{trend}</span>
    </div>
    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1 italic">{label}</p>
    <h3 className="text-2xl font-black text-slate-900 tracking-tight italic">{value}</h3>
    <p className="text-[10px] text-slate-400 mt-2 font-bold italic">{subtext}</p>
  </div>
);

export default function Dashboard() {
  const [invoices, setInvoices] = useState([]);
  const [stats, setStats] = useState({ totalPaid: 0, totalUnpaid: 0 });

  useEffect(() => {
    axios.get('http://localhost:5000/api/invoices')
      .then(res => {
        setInvoices(res.data);
        const paid = res.data.filter(i => i.status === 'Paid').reduce((s, i) => s + (i.total || 0), 0);
        const unpaid = res.data.filter(i => i.status !== 'Paid').reduce((s, i) => s + (i.total || 0), 0);
        setStats({ totalPaid: paid, totalUnpaid: unpaid });
      }).catch(err => console.log(err));
  }, []);

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900 italic">Welcome Back, InvoiceAI </h1>
          <p className="text-slate-400 text-sm font-bold italic">Ready to create amazing invoices?</p>
        </div>
        <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-black text-xs border border-blue-100 italic uppercase">NP</div>
      </div>

      <div className="flex flex-wrap gap-8">
        <StatCard label="Total Invoices" value={invoices.length} subtext="○ Active invoices" icon="📄" color="bg-purple-500" trend="+ 8.5%" />
        <StatCard label="Total Paid" value={`₹${stats.totalPaid.toLocaleString()}`} subtext="○ Received amount" icon="₹" color="bg-green-500" trend="+ 12.2%" />
        <StatCard label="Total Unpaid" value={`₹${stats.totalUnpaid.toLocaleString()}`} subtext="○ Outstanding balance" icon="🕒" color="bg-orange-500" trend="+ 3.1%" />
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
        <h3 className="font-black text-slate-800 italic uppercase text-[10px] tracking-widest mb-8">Recent Invoices</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] text-slate-400 font-black uppercase tracking-widest border-b border-slate-50">
              <th className="pb-4">Client & ID</th>
              <th className="pb-4">Amount</th>
              <th className="pb-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {invoices.map((inv, i) => (
              <tr key={inv._id || i} className="hover:bg-slate-50 transition-colors">
                <td className="py-5">
                  <p className="font-black text-slate-800 text-xs italic">{inv.client?.name || "No Client Name"}</p>
                  <p className="text-[9px] text-slate-400 font-bold">{inv.invoiceNumber}</p>
                </td>
                <td className="font-black text-slate-800 text-xs italic">₹{Number(inv.total || 0).toLocaleString()}</td>
                <td><span className={`px-3 py-1 rounded-full text-[9px] font-black italic uppercase ${inv.status === 'Paid' ? 'bg-green-50 text-green-500' : 'bg-orange-50 text-orange-500'}`}>{inv.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}