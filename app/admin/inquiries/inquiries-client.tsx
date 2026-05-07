"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Mail, Calendar, User, MessageSquare, Trash2, CheckCircle, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export function InquiriesClient() {
  const { status } = useSession();
  const router = useRouter();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      setInquiries(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to load inquiries");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchInquiries();
    }
  }, [status]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    
    try {
      const res = await fetch(`/api/inquiries?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries(inquiries.filter(i => i._id !== id));
        if (selectedInquiry?._id === id) setSelectedInquiry(null);
        toast.success("Inquiry deleted");
      }
    } catch (error) {
      toast.error("Failed to delete inquiry");
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-xs font-bold uppercase tracking-[0.3em] text-accent animate-pulse">
          Accessing Communication Logs...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-border pb-8 mt-4 lg:mt-8">
        <div>
          <h1 className="text-3xl font-bold text-primary uppercase tracking-tighter">Inquiries</h1>
          <p className="text-xs font-bold text-accent uppercase tracking-[0.3em] mt-2">Client Communication Hub</p>
        </div>
        <div className="mt-4 md:mt-0">
          <span className="text-[10px] font-bold text-muted-foreground uppercase">Total Received: {inquiries.length}</span>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Inquiry List */}
        <div className="lg:col-span-5 space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {inquiries.length === 0 ? (
              <div className="p-12 text-center border-2 border-dashed border-border rounded-2xl">
                <Mail className="w-8 h-8 text-muted-foreground mx-auto mb-4 opacity-20" />
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">No inquiries yet</p>
              </div>
            ) : (
              inquiries.map((inquiry, i) => (
                <motion.div
                  key={inquiry._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedInquiry(inquiry)}
                  className={`p-6 border transition-all cursor-pointer group relative ${
                    selectedInquiry?._id === inquiry._id
                      ? "bg-primary border-primary text-white shadow-xl translate-x-2"
                      : "bg-white border-border hover:border-accent"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-bold uppercase tracking-tight truncate max-w-[200px] ${
                      selectedInquiry?._id === inquiry._id ? "text-white" : "text-primary"
                    }`}>
                      {inquiry.name}
                    </h3>
                    <span className="text-[9px] font-bold opacity-60 flex items-center gap-1">
                      <Calendar size={10} />
                      {format(new Date(inquiry.createdAt), "MMM dd")}
                    </span>
                  </div>
                  <p className={`text-[10px] uppercase tracking-widest font-bold truncate ${
                    selectedInquiry?._id === inquiry._id ? "text-white/60" : "text-accent"
                  }`}>
                    {inquiry.company || "General Inquiry"}
                  </p>
                  <p className={`text-xs mt-3 line-clamp-2 italic ${
                    selectedInquiry?._id === inquiry._id ? "text-white/80" : "text-muted-foreground"
                  }`}>
                    "{inquiry.message}"
                  </p>
                  
                  {inquiry.type === 'product_search' && (
                    <div className="absolute top-0 right-0 p-1">
                       <span className="bg-accent text-white text-[7px] font-black uppercase px-2 py-0.5">Sourcing</span>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Inquiry Detail */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {selectedInquiry ? (
              <motion.div
                key={selectedInquiry._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-border p-10 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl" />
                
                <div className="relative z-10 space-y-10">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-2">Inquiry Details</p>
                      <h2 className="text-3xl font-bold text-primary tracking-tighter uppercase">{selectedInquiry.name}</h2>
                      <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground pt-2">
                        <span className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full">
                          <Mail size={12} /> {selectedInquiry.email}
                        </span>
                        {selectedInquiry.company && (
                          <span className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full">
                            <User size={12} /> {selectedInquiry.company}
                          </span>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDelete(selectedInquiry._id)}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <MessageSquare size={16} className="text-accent" />
                       <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary">Technical Message</h4>
                       <div className="h-px flex-1 bg-border" />
                    </div>
                    <div className="bg-slate-50 p-8 border-l-4 border-accent italic text-slate-700 leading-relaxed font-sans whitespace-pre-wrap">
                      {selectedInquiry.message}
                    </div>
                  </div>

                  {selectedInquiry.type === 'product_search' && selectedInquiry.searchQuery && (
                    <div className="bg-primary p-6 text-white space-y-2">
                      <p className="text-[8px] font-bold uppercase tracking-widest text-white/40">Product Search Context</p>
                      <p className="text-sm font-bold italic">User was searching for: "{selectedInquiry.searchQuery}"</p>
                    </div>
                  )}

                  <div className="pt-8 border-t border-border flex flex-wrap gap-4">
                    <a 
                      href={`mailto:${selectedInquiry.email}?subject=Response to your inquiry - Delta Impex`}
                      className="flex-1 bg-primary text-white py-4 font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-accent transition-all shadow-xl"
                    >
                      <Mail size={14} /> Send Email Response
                    </a>
                    <button 
                      onClick={() => toast.info("Marking as responded...")}
                      className="px-8 border border-border font-bold uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all"
                    >
                      Mark Responded
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-border rounded-3xl bg-slate-50/50 p-12 text-center">
                <div className="w-20 h-20 bg-white shadow-xl flex items-center justify-center text-accent mb-6 rounded-2xl">
                  <Mail size={32} />
                </div>
                <h3 className="text-xl font-bold text-primary uppercase tracking-tight">Select an Inquiry</h3>
                <p className="text-xs text-muted-foreground max-w-xs mt-2 italic">Choose a client message from the left to view technical details and response options.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
