"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  ChevronRight,
  GraduationCap,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] flex text-zinc-300 relative overflow-x-hidden">
      {/* Mobile Menu Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 border-r border-zinc-800 bg-[#050505] flex flex-col pt-8 z-50 
        transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-auto
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="px-6 mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/10">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-white font-bold leading-none">Visionary</h2>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Admin Panel</p>
            </div>
          </div>
          <button 
            className="lg:hidden p-2 hover:bg-zinc-900 rounded-lg"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          <Link 
            href="/admin" 
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-900 transition-colors group"
          >
            <LayoutDashboard className="w-5 h-5 text-zinc-500 group-hover:text-indigo-400" />
            <span className="font-medium">Dashboard</span>
            <ChevronRight className="ml-auto w-4 h-4 text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link 
            href="/admin/students" 
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-900 transition-colors group"
          >
            <Users className="w-5 h-5 text-zinc-500 group-hover:text-indigo-400" />
            <span className="font-medium">Students</span>
            <ChevronRight className="ml-auto w-4 h-4 text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="bg-zinc-900/50 rounded-2xl p-4 mb-4">
            <p className="text-xs text-zinc-500 mb-1">Authenticated</p>
            <p className="text-sm font-medium text-white truncate text-indigo-400">Admin Session</p>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-colors group"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b border-zinc-800 flex items-center justify-between px-4 sm:px-8 bg-[#050505]/50 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-zinc-900 rounded-lg text-zinc-400 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg sm:text-xl font-semibold text-white">Management Console</h1>
          </div>
          <div className="hidden sm:block">
            {/* Optional header actions */}
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
