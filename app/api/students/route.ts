import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  const students = await prisma.student.findMany({
    include: { projects: true },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(students);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const body = await req.json();
    const { name, slug, photo, bio, department, year, projects } = body;

    const student = await prisma.student.create({
      data: { 
        name, 
        slug, 
        photo, 
        bio, 
        department, 
        year,
        projects: {
          create: projects.map((p: any) => ({
            title: p.title,
            description: p.description,
            image: p.image,
            link: p.link,
          })),
        },
      },
    });

    return NextResponse.json(student);
  } catch (error) {
    console.error("POST_STUDENT_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
