import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import CreateInvoice from "./pages/CreateInvoice"; 
import PricingPage from "./pages/PricingPage";
import BusinessProfile from "./pages/BusinessProfile";

// --- DYNAMIC API BASE ---//
export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function App() {
  const [view, setView] = useState("landing"); 
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAuth = (e) => {
    e.preventDefault();
    setUser({ name: view === "signup" ? formData.fullName : formData.email.split('@')[0] });
    setView("dashboard");
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      
      {/* ----- Universal Navbar (Landing & Pricing) ----- */}
      {(view === "landing" || view === "pricing") && (
        <nav className="flex items-center justify-between px-10 py-6 sticky top-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-50">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView("landing")}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold italic shadow-lg shadow-blue-200">I</div>
            <span className="text-xl font-bold tracking-tighter">InvoiceAI</span>
          </div>
          <div className="flex items-center gap-8">
            <button onClick={() => setView("landing")} className={`text-sm font-bold ${view === 'landing' ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'}`}>Features</button>
            <button onClick={() => setView("pricing")} className={`text-sm font-bold ${view === 'pricing' ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'}`}>Pricing</button>
            <button onClick={() => setView("login")} className="text-sm font-bold text-gray-400 hover:text-blue-600">Log In</button>
            <button onClick={() => setView("signup")} className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">Get Started</button>
          </div>
        </nav>
      )}

      {/* 1. LANDING PAGE CONTENT */}
      {view === "landing" && (
        <header className="max-w-7xl mx-auto px-10 py-24 flex flex-col lg:flex-row items-center gap-20 animate-in fade-in duration-1000">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <h1 className="text-7xl lg:text-8xl font-black leading-[1] tracking-tighter text-gray-900 italic">Billing <br /><span className="text-blue-600 not-italic">Simplified.</span></h1>
              <p className="text-xl text-gray-400 max-w-lg font-medium leading-relaxed">Modern invoicing for modern teams. Start for free today.</p>
              <button onClick={() => setView("signup")} className="px-10 py-5 bg-blue-600 text-white font-black rounded-2xl shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all text-lg">Start Creating Free →</button>
            </div>
            <div className="flex-1 w-full relative">
                <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-12 transform rotate-2 hover:rotate-0 transition-all duration-700 max-w-lg mx-auto">
                    <div className="flex justify-between items-start mb-12">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black italic shadow-lg shadow-blue-200">i</div>
                            <div>
                                <h3 className="font-black text-xl text-gray-900 tracking-tight">InvoiceAI Inc.</h3>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">GST: 27AAAPL12C1ZV</p>
                            </div>
                        </div>
                        <div className="text-right text-gray-900 font-black">
                            <p className="text-[10px] text-gray-300 uppercase tracking-widest mb-1">Invoice</p>
                            <p className="text-xl">#INV-1024</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <p className="text-sm font-medium text-gray-600 italic">Web Design & AI Integration</p>
                        <p className="text-4xl font-black text-blue-600 tracking-tighter italic">₹21,830</p>
                    </div>
                </div>
            </div>
        </header>
      )}

      {/* 2. PRICING PAGE CONTENT */}
      {view === "pricing" && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <PricingPage setView={setView} />
        </div>
      )}

      {/* 3. AUTH VIEW */}
      {(view === "login" || view === "signup") && (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white p-12 rounded-[2.5rem] shadow-2xl border border-gray-100">
            <button onClick={() => setView("landing")} className="mb-6 text-sm font-black text-gray-300 hover:text-blue-600 uppercase italic tracking-widest transition">← Back</button>
            <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter">{view === "login" ? "Welcome." : "Get Started."}</h2>
            <form onSubmit={handleAuth} className="space-y-4">
              {view === "signup" && <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none font-medium" required />}
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none font-medium" required />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none font-medium" required />
              <button className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition shadow-xl mt-4 uppercase italic tracking-widest">Continue</button>
            </form>
          </div>
        </div>
      )}

      {/* 4. DASHBOARD VIEW (Sidebar & Main Content) */}
      {(view === "dashboard" || view === "create_invoice" || view === "business_profile") && (
        <div className="min-h-screen flex bg-white animate-in fade-in duration-500">
          <aside className="w-72 border-r border-gray-100 p-8 flex flex-col h-screen sticky top-0">
            <h1 className="text-2xl font-black text-blue-600 mb-12 tracking-tighter italic">InvoiceAI</h1>
            <nav className="space-y-3">
              <button onClick={() => setView("dashboard")} className={`w-full text-left p-4 rounded-2xl font-black text-xs uppercase italic transition ${view === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-50'}`}>Dashboard</button>
              <button onClick={() => setView("create_invoice")} className={`w-full text-left p-4 rounded-2xl font-black text-xs uppercase italic transition flex items-center gap-3 ${view === 'create_invoice' ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'text-gray-400 border-2 border-dashed border-gray-100 hover:border-blue-200'}`}>+ Create Invoice</button>
              <button onClick={() => setView("business_profile")} className={`w-full text-left p-4 rounded-2xl font-black text-xs uppercase italic transition ${view === 'business_profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-50'}`}>🏢 Business Profile</button>
            </nav>
            <div className="mt-auto pt-10 border-t border-gray-50">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2 italic">Logged in as</p>
                <p className="font-black text-gray-900 mb-4 tracking-tight">{user?.name || "User"}</p>
                <button onClick={() => { setUser(null); setView("landing"); }} className="text-gray-400 text-xs font-black hover:text-red-500 transition tracking-widest uppercase italic">Log Out</button>
            </div>
          </aside>
          <main className="flex-1 p-12 bg-gray-50/50 overflow-y-auto">
              {view === "dashboard" && <Dashboard API_BASE={API_BASE} />}
              {view === "create_invoice" && <CreateInvoice API_BASE={API_BASE} setView={setView} />}
              {view === "business_profile" && <BusinessProfile API_BASE={API_BASE} />}
          </main>
        </div>
      )}
    </div>
  );
}