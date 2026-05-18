"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/admin/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);
    const toastId = toast.loading("Verifying credentials...");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials", { id: toastId });
        setIsLoading(false);
      } else {
        toast.success("Access Granted", { id: toastId });
        // Trigger a full browser refresh to ensure session and middleware sync perfectly
        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 500);
      }
    } catch (error) {
      toast.error("Authentication failed", { id: toastId });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-foreground px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-8">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tighter text-white uppercase">
            Admin Portal.
          </h1>
          <p className="mt-4 text-white/50 font-tech text-[10px] uppercase tracking-[0.3em] italic">
            Delta Impex Industrial Intelligence
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <Label htmlFor="email" className="text-white/60 text-[9px] uppercase tracking-[0.2em] font-tech font-bold ml-1">
                Security Identity (Email)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@deltaimpex.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/20 h-14 rounded-2xl focus-visible:ring-white/20 transition-all focus:bg-white/[0.07]"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-white/60 text-[9px] uppercase tracking-[0.2em] font-tech font-bold ml-1">
                Access Token (Password)
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/[0.03] border-white/10 text-white h-14 rounded-2xl focus-visible:ring-white/20 pr-12 transition-all focus:bg-white/[0.07]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 rounded-2xl bg-white text-foreground hover:bg-accent hover:text-white font-tech font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-500 shadow-xl active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
                  Decrypting...
                </div>
              ) : "Initialize Session"}
            </Button>
          </form>
        </div>
        
        <p className="text-center text-[9px] text-white/20 uppercase tracking-widest font-tech">
          Authorized Personnel Only • All Access Logged
        </p>
      </div>
    </div>
  );
}
