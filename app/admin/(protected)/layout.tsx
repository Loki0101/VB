import { ReactNode } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  ChevronRight,
  GraduationCap
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/admin/sign-out-button";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#050505] flex text-zinc-300">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 flex flex-col pt-8">
        <div className="px-6 mb-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/10">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-white font-bold leading-none">Visionary</h2>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          <Link 
            href="/admin" 
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-900 transition-colors group"
          >
            <LayoutDashboard className="w-5 h-5 text-zinc-500 group-hover:text-indigo-400" />
            <span className="font-medium">Dashboard</span>
            <ChevronRight className="ml-auto w-4 h-4 text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link 
            href="/admin/students" 
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-900 transition-colors group"
          >
            <Users className="w-5 h-5 text-zinc-500 group-hover:text-indigo-400" />
            <span className="font-medium">Students</span>
            <ChevronRight className="ml-auto w-4 h-4 text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="bg-zinc-900/50 rounded-2xl p-4 mb-4">
            <p className="text-xs text-zinc-500 mb-1">Signed in as</p>
            <p className="text-sm font-medium text-white truncate">{session.user?.email}</p>
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 border-b border-zinc-800 flex items-center justify-between px-8 bg-[#050505]/50 backdrop-blur-md">
           <h1 className="text-xl font-semibold text-white">Management Console</h1>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
