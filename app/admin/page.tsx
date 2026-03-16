import { prisma } from "@/lib/prisma";
import { Plus, Users, BookOpen, GraduationCap } from "lucide-react";
import Link from "next/link";
    
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let studentCount = 0;
  let projectCount = 0;
  let error = false;

  try {
    studentCount = await prisma.student.count();
    projectCount = await prisma.project.count();
  } catch (e) {
    console.error("Dashboard database error:", e);
    error = true;
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm flex items-center gap-3">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
          <span>Unable to connect to database. Please check your DATABASE_URL environment variable.</span>
        </div>
      )}
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center text-indigo-500">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-zinc-500">Total Students</p>
              <h3 className="text-2xl font-bold text-white">{studentCount}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-600/10 rounded-xl flex items-center justify-center text-emerald-500">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-zinc-500">Total Projects</p>
              <h3 className="text-2xl font-bold text-white">{projectCount}</h3>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl backdrop-blur-sm sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-600/10 rounded-xl flex items-center justify-center text-amber-500">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-zinc-500">Quick Actions</p>
              <Link href="/admin/students/new" className="text-sm font-medium text-amber-500 hover:underline">
                Add New Student
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900/20 to-zinc-900/40 border border-zinc-800 p-6 sm:p-10 rounded-3xl">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Welcome to Visionary Burma</h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-8">
            Manage your student showcase with ease. This portal allows you to curate student profiles, showcase their best work, and automatically generate portfolio pages.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/admin/students" 
              className="w-full sm:w-auto text-center bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/20"
            >
              View Students
            </Link>
            <Link 
              href="/admin/students/new" 
              className="w-full sm:w-auto text-center bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              Add Profile
            </Link>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 -mr-10 -mb-10 pointer-events-none">
          <GraduationCap className="w-64 h-64" />
        </div>
      </div>
    </div>
  );
}
