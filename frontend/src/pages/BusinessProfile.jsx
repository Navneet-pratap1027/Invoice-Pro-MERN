import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BusinessProfile() {
  const [profile, setProfile] = useState({
    businessName: "",
    email: "",
    address: "",
    phone: "",
    gst: "",
    logo: null,
  });
  const [loading, setLoading] = useState(false);

  // Profile loading
  useEffect(() => {
    axios.get("http://localhost:5000/api/profile") // Simple GET call
      .then(res => setProfile(res.data))
      .catch(err => console.log("Profile not found or error"));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/profile", profile);
      alert(" Profile Updated!");
    } catch (err) {
      alert(" Save Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black italic text-slate-800 tracking-tight">Business Profile</h2>
        <button 
          onClick={handleSave}
          className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest italic shadow-xl shadow-blue-100 hover:bg-blue-700 transition border-b-4 border-blue-800"
        >
          {loading ? "Saving..." : "Update Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Info Inputs */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-[10px] font-black uppercase text-slate-400 italic mb-2 tracking-widest">General Info</h3>
            <input 
              placeholder="Business Name" 
              className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl font-bold italic text-sm outline-none focus:border-blue-500"
              value={profile.businessName}
              onChange={e => setProfile({...profile, businessName: e.target.value})}
            />
            <input 
              placeholder="Business Email" 
              className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl font-bold italic text-sm outline-none focus:border-blue-500"
              value={profile.email}
              onChange={e => setProfile({...profile, email: e.target.value})}
            />
            <textarea 
              placeholder="Address" 
              rows="3"
              className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl font-bold italic text-sm outline-none focus:border-blue-500"
              value={profile.address}
              onChange={e => setProfile({...profile, address: e.target.value})}
            />
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-[10px] font-black uppercase text-slate-400 italic mb-2 tracking-widest">Tax & Contact</h3>
            <input 
              placeholder="GST Number" 
              className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl font-bold italic text-sm outline-none focus:border-blue-500"
              value={profile.gst}
              onChange={e => setProfile({...profile, gst: e.target.value})}
            />
            <input 
              placeholder="Phone Number" 
              className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl font-bold italic text-sm outline-none focus:border-blue-500"
              value={profile.phone}
              onChange={e => setProfile({...profile, phone: e.target.value})}
            />
          </div>
        </div>

        {/* Right: Branding (Logo) */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm text-center">
            <h3 className="text-[10px] font-black uppercase text-slate-400 italic mb-6 tracking-widest text-left">Logo</h3>
            <div className="w-32 h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl mx-auto flex items-center justify-center text-slate-300 mb-4 overflow-hidden">
               {profile.logo ? <img src={profile.logo} alt="Logo" className="w-full h-full object-contain" /> : "No Logo"}
            </div>
            <input 
              type="text" 
              placeholder="Logo URL (e.g. https://...)" 
              className="w-full bg-slate-50 border border-slate-100 p-2 rounded-lg text-[10px] font-bold italic outline-none"
              onChange={e => setProfile({...profile, logo: e.target.value})}
            />
          </div>
        </div>
      </div>
    </div>
  );
}