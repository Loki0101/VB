import { prisma } from "@/lib/prisma";
import { Plus, Users, BookOpen, GraduationCap } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const studentCount = await prisma.student.count();
  const projectCount = await prisma.project.count();

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl backdrop-blur-sm">
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
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900/20 to-zinc-900/40 border border-zinc-800 p-10 rounded-3xl">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">Welcome to Visionary Burma</h2>
          <p className="text-zinc-400 leading-relaxed mb-8">
            Manage your student showcase with ease. This portal allows you to curate student profiles, showcase their best work, and automatically generate portfolio pages.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/admin/students" 
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/20"
            >
              View Students
            </Link>
            <Link 
              href="/admin/students/new" 
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
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
