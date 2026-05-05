"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Avatar } from "@heroui/react";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsMenuOpen(false);
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/books" },
    ...(session ? [{ name: "My Profile", href: "/profile" }] : []),
  ];

  if (!mounted) return <div className="h-20 bg-white" />;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 antialiased">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-black w-10 h-10 flex items-center justify-center rounded-xl group-hover:rotate-6 transition-all shadow-lg shadow-black/10">
            <span className="text-xl">📚</span>
          </div>
          <span className="text-xl font-[1000] uppercase tracking-tighter text-black">
            BOOK<span className="text-blue-600">FLOW</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-bold uppercase text-[12px] tracking-widest text-gray-600">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-blue-600 transition-all relative group">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            {isPending ? (
              <div className="w-24 h-10 bg-gray-100 animate-pulse rounded-xl"></div>
            ) : session ? (
              <div className="flex items-center gap-5">
                <Link href={'/profile'}>
                  <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-full">
                    <Avatar>
                      <Avatar.Image alt={session.user.name} src={session.user.image} />
                      <Avatar.Fallback>{session.user.name.split[0]}</Avatar.Fallback>
                    </Avatar>
                    <span className="text-[11px] font-black uppercase text-gray-700">{session.user.name.split(' ')[0]}</span>
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase hover:bg-red-600 hover:text-white transition-all active:scale-95 border border-red-100"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-blue-600/20 active:scale-95"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className={`w-6 h-0.5 bg-black mb-1.5 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-black mb-1.5 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-black transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Content */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-white ${isMenuOpen ? 'max-h-screen border-t border-gray-100 shadow-xl' : 'max-h-0'}`}>
        <div className="flex flex-col items-center gap-6 py-10 px-6">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-black uppercase tracking-tighter text-gray-800 hover:text-blue-600 transition-all"
            >
              {link.name}
            </Link>
          ))}

          {!session && (
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center bg-blue-600 text-white py-4 rounded-xl font-black uppercase text-sm"
            >
              Sign In
            </Link>
          )}

          {session && (
            <button
              onClick={handleLogout}
              className="w-full bg-red-50 text-red-600 py-4 rounded-xl font-black uppercase text-sm border border-red-100"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}