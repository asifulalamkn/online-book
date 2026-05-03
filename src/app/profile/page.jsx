"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isPending && !session) {
      router.push("/login");
    }
    if (session) {
      setNewName(session.user.name || "");
      setNewImage(session.user.image || "");
    }
  }, [session, isPending, router]);

  const handleUpdate = async () => {
    setLoading(true);
    const { data, error } = await authClient.updateUser({
      name: newName,
      image: newImage,
    });

    if (error) {
      alert(error.message || "Update failed");
    } else {
      alert("Profile updated successfully!");
      setIsEditing(false);
      router.refresh();
    }
    setLoading(false);
  };

  if (isPending || !mounted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) return null;
  const { user } = session;


  const displayImage = isEditing 
    ? (newImage || `https://ui-avatars.com/api/?name=${user.name}&background=000&color=fff`)
    : (user.image || `https://ui-avatars.com/api/?name=${user.name}&background=000&color=fff`);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-2xl mx-auto">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-black">
            My <span className="text-blue-600">Profile</span>
          </h1>
        </div>

        <div className="bg-white border-[3px] border-black rounded-[32px] p-8 md:p-12 shadow-[8px_8px_0px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col items-center">
            
            {/* 🖼️ Profile Image Section */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 mb-8 border-[3px] border-black rounded-full overflow-hidden p-1 bg-white">
              <img
                src={displayImage}
                className="w-full h-full object-cover rounded-full"
                alt="profile"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${user.name}&background=2563eb&color=fff`;
                }}
              />
            </div>

            <div className="w-full space-y-5">
              {/* Name Section */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-5 py-4 bg-gray-50 border-[3px] border-black rounded-[18px] font-bold outline-none focus:bg-blue-50 text-black"
                  />
                ) : (
                  <div className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-[18px] font-bold text-black">{user.name}</div>
                )}
              </div>

              {/* Email Section (Read Only) */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Email Address</label>
                <div className="w-full px-5 py-4 bg-gray-100 border border-gray-200 rounded-[18px] font-bold text-gray-500 italic">{user.email}</div>
              </div>

              {/* Photo URL Section (Only shows when editing) */}
              {isEditing && (
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">New Photo URL</label>
                  <input
                    type="text"
                    value={newImage}
                    placeholder="https://image-link.com/photo.jpg"
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full px-5 py-4 bg-gray-50 border-[3px] border-black rounded-[18px] font-bold outline-none focus:bg-blue-50 text-black"
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-10 w-full flex flex-col gap-3">
              {isEditing ? (
                <div className="flex gap-3">
                  <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="flex-grow bg-blue-600 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-blue-700 transition-all active:scale-95"
                  >
                    {loading ? "SAVING..." : "SAVE CHANGES"}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-8 bg-gray-200 text-gray-600 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-gray-300 transition-all"
                  >
                    CANCEL
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-blue-600 transition-all active:scale-95"
                >
                  Edit Profile Details
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}