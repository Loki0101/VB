import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { 
  GraduationCap, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  Github, 
  Globe,
  Briefcase
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StudentPublicPage({
  params,
}: {
  params: any;
}) {
  const { slug } = await params;
  const student = await prisma.student.findUnique({
    where: { slug },
    include: { projects: { orderBy: { createdAt: "desc" } } },
  });

  if (!student) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-indigo-500/30">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden border-b border-zinc-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-600 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
            {/* Profile Photo */}
            <div className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-[#050505] overflow-hidden bg-zinc-900 shadow-2xl">
                {student.photo ? (
                  <img 
                    src={student.photo} 
                    alt={student.name} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold bg-zinc-800 text-zinc-700">
                    {student.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left pt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6">
                <GraduationCap className="w-3.5 h-3.5" />
                Featured Student
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4 uppercase">
                {student.name}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-zinc-400 font-medium mb-8">
                <div className="flex items-center gap-2 bg-zinc-900/50 backdrop-blur-md px-4 py-2 rounded-xl border border-zinc-800/50">
                  <Briefcase className="w-4 h-4 text-indigo-500" />
                  {student.department || "Independent Researcher"}
                </div>
                <div className="flex items-center gap-2 bg-zinc-900/50 backdrop-blur-md px-4 py-2 rounded-xl border border-zinc-800/50">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  Class of {student.year || "2024"}
                </div>
              </div>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl font-light">
                {student.bio || "Passionate student dedicated to creating impactful solutions and exploring the intersections of technology and design."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-32 bg-[#080808]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col mb-20">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
              Selected Projects
              <span className="w-12 h-px bg-indigo-500 hidden md:block"></span>
            </h2>
            <p className="text-zinc-500 max-w-xl">
              Focusing on quality, research-driven outcomes, and aesthetic implementation across various disciplines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {student.projects.length === 0 ? (
              <div className="col-span-full py-20 bg-zinc-900/40 rounded-3xl border border-zinc-800/50 border-dashed text-center">
                <p className="text-zinc-600 font-medium italic">Projects are currently being curated...</p>
              </div>
            ) : (
              student.projects.map((project, idx) => (
                <div key={idx} className="group bg-zinc-900/30 border border-zinc-800/60 rounded-[2.5rem] overflow-hidden hover:border-indigo-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/5">
                  <div className="aspect-[16/10] overflow-hidden bg-zinc-800 relative">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-800/50">
                        <Globe className="w-12 h-12 text-zinc-700" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-60"></div>
                  </div>
                  <div className="p-10">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-500 leading-relaxed mb-8 line-clamp-3">
                      {project.description || "A comprehensive exploration into professional implementation and modern design principles."}
                    </p>
                    <div className="flex items-center gap-4">
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all"
                        >
                          View Case Study
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-zinc-900 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-zinc-600 text-sm font-medium tracking-wide">
            © {new Date().getFullYear()} VISIONARY BURMA SHOWCASE · ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>
    </div>
  );
}
