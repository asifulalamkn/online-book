"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    await authClient.signUp.email({
      email: formData.email.trim(),
      password: formData.password,
      name: formData.name,
      image: formData.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=000&color=fff`,
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
        onError: (ctx) => {
          setErrorMsg(ctx.error.message || "Registration failed. Try again.");
        },
      },
    });
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-white antialiased">
      <div className="w-full max-w-md">

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-[1000] text-black uppercase tracking-tighter leading-none mb-3">
            JOIN <span className="text-blue-600">US</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            Create your account in seconds
          </p>
        </div>

        {/* Display Error Message */}
        {errorMsg && (
          <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-2xl text-[10px] font-bold border border-red-100 text-center uppercase tracking-widest">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Social Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full mb-6 flex items-center justify-center gap-4 bg-white border-[3px] border-black py-4 rounded-[20px] font-black uppercase tracking-widest text-[11px] hover:bg-gray-50 transition-all active:scale-95 text-black"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-[2px] bg-black/10 flex-grow"></div>
          <span className="text-[10px] font-black text-gray-400 uppercase">OR</span>
          <div className="h-[2px] bg-black/10 flex-grow"></div>
        </div>

        {/* Registration Form */}
        <form
          onSubmit={handleRegister}
          className="bg-white border-[3px] border-black rounded-[32px] p-8 md:p-10 shadow-[8px_8px_0px_rgba(0,0,0,0.05)]"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-[9px] font-black uppercase tracking-widest text-black mb-1.5 ml-1">Full Name</label>
              <input
                type="text"
                placeholder="YOUR NAME"
                required
                className="w-full px-5 py-4 bg-white border-[3px] border-black rounded-[18px] text-sm font-bold outline-none focus:bg-blue-50 transition-all text-black"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-[9px] font-black uppercase tracking-widest text-black mb-1.5 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="EMAIL@EXAMPLE.COM"
                required
                className="w-full px-5 py-4 bg-white border-[3px] border-black rounded-[18px] text-sm font-bold outline-none focus:bg-blue-50 transition-all text-black"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-[9px] font-black uppercase tracking-widest text-black mb-1.5 ml-1">Photo URL (Optional)</label>
              <input
                type="url"
                placeholder="HTTPS://IMAGE-LINK.COM"
                className="w-full px-5 py-4 bg-white border-[3px] border-black rounded-[18px] text-sm font-bold outline-none focus:bg-blue-50 transition-all text-black"
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-[9px] font-black uppercase tracking-widest text-black mb-1.5 ml-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                required
                className="w-full px-5 py-4 bg-white border-[3px] border-black rounded-[18px] text-sm font-bold outline-none focus:bg-blue-50 transition-all text-black"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-5 rounded-[22px] font-black uppercase tracking-[0.2em] text-[11px] hover:bg-blue-600 transition-all active:scale-95 disabled:bg-gray-300 mt-4"
            >
              {loading ? "CREATING ACCOUNT..." : "REGISTER NOW"}
            </button>
          </div>

          <p className="text-center mt-8 text-[11px] font-bold uppercase tracking-tight text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-black font-black border-b-2 border-black hover:text-blue-600 hover:border-blue-600 transition-all pb-0.5">
              LOGIN HERE
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}