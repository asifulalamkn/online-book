"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [mounted, setMounted] = useState(false); 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          
          setErrorMsg(ctx.error.message || "Invalid email or password.");
          setLoading(false);
        },
      },
    });
  };

  
  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-[32px] p-10 shadow-sm">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-[900] uppercase tracking-tighter text-black">
            Welcome <span className="text-blue-600">Back</span>
          </h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
            Login to your account
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-[11px] font-bold mb-6 border border-red-100 text-center uppercase tracking-wide">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-blue-100 transition-all text-black text-sm"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-blue-100 transition-all text-black text-sm"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-blue-600 transition-all active:scale-95 disabled:bg-gray-200 disabled:text-gray-400 shadow-xl shadow-black/5"
          >
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
          <p className="text-[11px] font-bold uppercase tracking-tight text-gray-400">
            Don't have an account? 
            <Link href="/register" className="ml-2 text-blue-600 font-black hover:underline">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}