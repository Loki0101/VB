import { prisma } from "@/lib/prisma";
    import Link from "next/link";
    import { Search, Plus, MoreVertical, Edit2, Trash2, ExternalLink } from "lucide-react";
    
export const dynamic = "force-dynamic";

interface StudentListItem {
  id: string;
  name: string;
  slug: string;
  photo: string | null;
  department: string | null;
  year: string | null;
  _count: {
    projects: number;
  };
  updatedAt: Date;
}

export default async function StudentListPage() {
  let students: StudentListItem[] = [];
  let error = false;

  try {
    const rawStudents = await prisma.student.findMany({
      include: { _count: { select: { projects: true } } },
      orderBy: { updatedAt: "desc" },
    });
    students = rawStudents as StudentListItem[];
  } catch (e) {
    console.error("Student list database error:", e);
    error = true;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm flex items-center gap-3">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
          <span>Error loading students. Verifying database connection...</span>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Students</h2>
              <p className="text-zinc-500 text-sm">Manage student profiles and portfolios</p>
            </div>
            <Link 
              href="/admin/students/new" 
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 w-fit shadow-lg shadow-indigo-500/10"
            >
              <Plus className="w-5 h-5" />
              Add Student
            </Link>
          </div>
    
          {/* Search Table Card */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="p-6 border-b border-zinc-800/50 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Search students by name or department..." 
                  className="w-full bg-zinc-800/30 border border-zinc-700/50 rounded-xl py-2.5 pl-10 pr-4 text-sm text-zinc-200 outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>
    
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800/50 bg-zinc-800/10">
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Department / Year</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-center">Projects</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {students.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                        No students found. Add your first student to get started.
                      </td>
                    </tr>
                  ) : (
                    students.map((student) => (
                      <tr key={student.id} className="hover:bg-zinc-800/20 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden flex-shrink-0">
                              {student.photo ? (
                                <img src={student.photo} alt={student.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-600 bg-zinc-800 text-xs font-bold uppercase">
                                  {student.name.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-white">{student.name}</p>
                              <p className="text-[10px] text-zinc-500 font-mono">/student/{student.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-zinc-400">
                          {student.department || "N/A"} · {student.year || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-md text-xs font-bold">
                            {student._count.projects}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-1.5 text-xs text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
                            Public
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <Link 
                                href={`/student/${student.slug}`} 
                                target="_blank"
                                className="p-2 text-zinc-500 hover:text-white transition-colors"
                                title="View live page"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Link>
                              <Link 
                                href={`/admin/students/${student.id}`} 
                                className="p-2 text-zinc-500 hover:text-indigo-400 transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </Link>
                              <button className="p-2 text-zinc-500 hover:text-red-400 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
    
