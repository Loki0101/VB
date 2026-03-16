"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Link as LinkIcon,
  Loader2,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

interface Project {
  id?: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

interface StudentFormProps {
  initialData?: any;
}

export default function StudentForm({ initialData }: StudentFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [student, setStudent] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    bio: initialData?.bio || "",
    department: initialData?.department || "",
    year: initialData?.year || "",
    photo: initialData?.photo || "",
  });

  const [projects, setProjects] = useState<Project[]>(
    initialData?.projects || []
  );

  useEffect(() => {
    // Auto-generate slug from name if it's empty
    if (!initialData && student.name && !student.slug) {
      setStudent(s => ({ 
        ...s, 
        slug: s.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") 
      }));
    }
  }, [student.name, initialData]);

  const addProject = () => {
    setProjects([
      ...projects,
      { title: "", description: "", image: "", link: "" }
    ]);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setProjects(updatedProjects);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = initialData 
        ? `/api/students/${initialData.id}` 
        : "/api/students";
      
      const method = initialData ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...student, projects }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/admin/students");
          router.refresh();
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/students" 
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="text-2xl font-bold text-white">
            {initialData ? "Edit Student" : "New Student"}
          </h2>
        </div>
        <button
          type="submit"
          disabled={isLoading || isSuccess}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isSuccess ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {isSuccess ? "Saved!" : "Save Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl space-y-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white border-b border-zinc-800 pb-4">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Full Name</label>
                <input 
                  required
                  value={student.name}
                  onChange={e => setStudent({...student, name: e.target.value})}
                  className="w-full bg-zinc-800/30 border border-zinc-700/50 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Public Slug</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 text-sm italic">/student/</span>
                  <input 
                    required
                    value={student.slug}
                    onChange={e => setStudent({...student, slug: e.target.value})}
                    className="w-full bg-zinc-800/30 border border-zinc-700/50 rounded-xl py-3 pl-20 pr-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono text-sm"
                    placeholder="john-doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Department</label>
                <input 
                  value={student.department}
                  onChange={e => setStudent({...student, department: e.target.value})}
                  className="w-full bg-zinc-800/30 border border-zinc-700/50 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="Computer Science"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Year</label>
                <input 
                  value={student.year}
                  onChange={e => setStudent({...student, year: e.target.value})}
                  className="w-full bg-zinc-800/30 border border-zinc-700/50 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="Senior (2024)"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Biography</label>
              <textarea 
                rows={4}
                value={student.bio}
                onChange={e => setStudent({...student, bio: e.target.value})}
                className="w-full bg-zinc-800/30 border border-zinc-700/50 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                placeholder="Tell something about the student..."
              />
            </div>
          </div>

          {/* Projects Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Student Projects</h3>
              <button 
                type="button"
                onClick={addProject}
                className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            </div>

            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl relative group backdrop-blur-sm animate-in fade-in slide-in-from-top-4">
                  <button 
                    type="button"
                    onClick={() => removeProject(index)}
                    className="absolute top-4 right-4 p-2 text-zinc-600 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Project Title</label>
                        <input 
                          required
                          value={project.title}
                          onChange={e => handleProjectChange(index, "title", e.target.value)}
                          className="w-full bg-zinc-800/30 border border-zinc-700/50 rounded-xl py-2.5 px-4 text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
                          placeholder="E-commerce App"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Description</label>
                        <textarea 
                          rows={2}
                          value={project.description}
                          onChange={e => handleProjectChange(index, "description", e.target.value)}
                          className="w-full bg-zinc-800/30 border border-zinc-700/50 rounded-xl py-2.5 px-4 text-sm focus:ring-1 focus:ring-indigo-500 outline-none resize-none"
                          placeholder="Brief project details..."
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Image URL</label>
                        <div className="relative">
                          <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                          <input 
                            value={project.image}
                            onChange={e => handleProjectChange(index, "image", e.target.value)}
                            className="w-full bg-zinc-800/30 border border-zinc-700/50 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
                            placeholder="https://images.unsplash.com/..."
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Project Link</label>
                        <div className="relative">
                          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                          <input 
                            value={project.link}
                            onChange={e => handleProjectChange(index, "link", e.target.value)}
                            className="w-full bg-zinc-800/30 border border-zinc-700/50 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
                            placeholder="https://github.com/..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {projects.length === 0 && (
                <div className="border-2 border-dashed border-zinc-800 rounded-2xl p-10 text-center">
                  <p className="text-zinc-500 text-sm">No projects added yet.</p>
                  <button 
                    type="button"
                    onClick={addProject}
                    className="text-indigo-400 hover:text-indigo-300 font-medium text-sm mt-2"
                  >
                    Click to add your first project
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-indigo-400" />
              Profile Photo
            </h3>
            <div className="space-y-4">
              <div className="aspect-square bg-zinc-800/50 rounded-2xl border border-zinc-700/50 overflow-hidden flex items-center justify-center relative group">
                {student.photo ? (
                  <img src={student.photo} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-12 h-12 text-zinc-700" />
                )}
              </div>
              <input 
                value={student.photo}
                onChange={e => setStudent({...student, photo: e.target.value})}
                className="w-full bg-zinc-800/30 border border-zinc-700/50 rounded-xl py-2.5 px-4 text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                placeholder="Paste photo URL here..."
              />
              <p className="text-[10px] text-zinc-500 leading-tight">
                Recommended: Square image, transparent background or high quality portrait.
              </p>
            </div>
          </div>

          <div className="bg-indigo-600/5 border border-indigo-500/10 p-6 rounded-2xl">
            <h3 className="text-sm font-semibold text-indigo-400 mb-2">Portfolio Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Live Status</span>
                <span className="text-emerald-400 font-bold tracking-widest uppercase">Public</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">SEO Optimized</span>
                <span className="text-emerald-400 font-bold tracking-widest uppercase">Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
