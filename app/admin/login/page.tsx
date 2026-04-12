"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials");
      } else {
        toast.success("Logged in successfully");
        router.push("/admin/dashboard");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
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
          <h1 className="font-display text-4xl font-bold tracking-tighter text-white">
            Admin Access.
          </h1>
          <p className="mt-4 text-white/50 font-tech text-xs uppercase tracking-widest italic">
            Delta Impex Industrial Portal
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/70 text-xs uppercase tracking-widest font-tech">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@deltaimpex.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-14 rounded-xl focus-visible:ring-white/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/70 text-xs uppercase tracking-widest font-tech">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white h-14 rounded-xl focus-visible:ring-white/20"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 rounded-xl bg-white text-foreground hover:bg-white/90 font-bold uppercase tracking-widest text-xs transition-all duration-300"
            >
              {isLoading ? "Authenticating..." : "Enter Portal"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
