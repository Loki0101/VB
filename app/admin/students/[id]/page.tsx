import StudentForm from "@/components/admin/student-form";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditStudentPage({
  params,
}: {
  params: any;
}) {
  const { id } = await params;
  let student = null;
  let error = false;

  try {
    student = await prisma.student.findUnique({
      where: { id },
      include: { projects: true },
    });
  } catch (e) {
    console.error("Edit student database error:", e);
    error = true;
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-8 rounded-3xl text-center">
        <h2 className="text-xl font-bold mb-2">Connection Error</h2>
        <p>Unable to retrieve student data. Please check your database connection.</p>
      </div>
    );
  }

  if (!student) {
    notFound();
  }

  return <StudentForm initialData={student} />;
}
