"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
    if (session) {
      setNewName(session.user.name);
      setNewImage(session.user.image || "");
    }
  }, [session, isPending, router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await authClient.updateUser({
      name: newName,
      image: newImage,
    });

    if (error) {
      alert(error.message || "Failed to update information");
    } else {
      alert("Information updated successfully!");
      router.push("/profile");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white border-[3px] border-black rounded-[32px] p-10 shadow-[8px_8px_0px_rgba(0,0,0,0.1)]">
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-8 text-center">
          Update <span className="text-blue-600">Info</span>
        </h1>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Full Name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border-[3px] border-black rounded-[18px] font-bold outline-none focus:bg-blue-50 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Photo URL</label>
            <input
              type="url"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border-[3px] border-black rounded-[18px] font-bold outline-none focus:bg-blue-50 transition-all"
              placeholder="https://example.com/photo.jpg"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-5 rounded-[20px] font-black uppercase tracking-widest text-[11px] hover:bg-blue-600 transition-all active:scale-95 disabled:bg-gray-300"
          >
            {loading ? "Updating..." : "Update Information"}
          </button>
        </form>
      </div>
    </div>
  );
}