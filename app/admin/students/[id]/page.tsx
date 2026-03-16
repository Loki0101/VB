import StudentForm from "@/components/admin/student-form";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditStudentPage({
  params,
}: {
  params: any;
}) {
  const { id } = await params;
  const student = await prisma.student.findUnique({
    where: { id },
    include: { projects: true },
  });

  if (!student) {
    notFound();
  }

  return <StudentForm initialData={student} />;
}
