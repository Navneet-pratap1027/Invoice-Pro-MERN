import React from "react";
import { Link } from "react-router-dom";

const PricingPage = () => {
  const plans = [
    { 
      name: "Starter", 
      price: "₹0", 
      features: ["5 Invoices/mo", "Basic PDF", "Email Support"], 
      btn: "Get Started", 
      highlight: false 
    },
    { 
      name: "Pro Business", 
      price: "₹999", 
      features: ["Unlimited Invoices", "AI Auto-Fill", "Custom Branding", "Priority Support"], 
      btn: "Start Free Trial", 
      highlight: true 
    },
    { 
      name: "Enterprise", 
      price: "Custom", 
      features: ["Multiple Users", "API Access", "Dedicated Manager"], 
      btn: "Contact Sales", 
      highlight: false 
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBFCFE] py-24 px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest italic border border-blue-100 mb-4 inline-block">
            Pricing Plans
          </span>
          <h1 className="text-6xl font-black text-slate-900 mb-6 italic tracking-tight">
            Simple, <span className="text-blue-600">Fair Pricing</span>
          </h1>
          <p className="text-xl text-slate-400 font-bold italic max-w-2xl mx-auto">
            Choose the plan that works best for your business growth. No hidden fees.
          </p>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((p, i) => (
            <div 
              key={i} 
              className={`bg-white p-12 rounded-[3rem] border transition-all duration-300 hover:-translate-y-3 ${
                p.highlight 
                ? 'border-blue-500 shadow-2xl shadow-blue-100 relative ring-8 ring-blue-50' 
                : 'border-slate-100 shadow-sm'
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-widest italic shadow-lg">
                  Most Popular
                </span>
              )}
              
              <h3 className="text-2xl font-black text-slate-800 mb-4 italic uppercase tracking-wider">{p.name}</h3>
              
              <div className="flex items-baseline gap-1 mb-10">
                <span className="text-6xl font-black text-slate-900 italic tracking-tighter">{p.price}</span>
                {p.price !== "Custom" && <span className="text-slate-400 font-black italic text-sm">/month</span>}
              </div>

              <ul className="space-y-6 mb-12">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-4 text-slate-600 font-bold italic text-sm">
                    <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center border border-green-100">
                      <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <Link 
                to="/create"
                className={`block w-full py-5 rounded-2xl font-black text-center text-sm uppercase tracking-widest italic transition-all border-b-4 ${
                  p.highlight 
                  ? 'bg-blue-600 text-white border-blue-800 shadow-xl shadow-blue-200 hover:bg-blue-700' 
                  : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200'
                }`}
              >
                {p.btn}
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom Footer Section */}
        <div className="mt-24 text-center">
            <p className="text-slate-400 font-bold italic text-sm">
                Have questions? <span className="text-blue-600 cursor-pointer hover:underline">Contact our sales team</span>
            </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage; 