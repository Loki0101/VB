import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  req: Request,
  { params }: { params: any }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  const student = await prisma.student.findUnique({
    where: { id },
    include: { projects: true },
  });

  return NextResponse.json(student);
}

export async function PATCH(
  req: Request,
  { params }: { params: any }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const body = await req.json();
    const { name, slug, photo, bio, department, year, projects } = body;

    // Update student and sync projects
    const student = await prisma.student.update({
      where: { id },
      data: {
        name,
        slug,
        photo,
        bio,
        department,
        year,
        projects: {
          deleteMany: {},
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
    console.error("PATCH_STUDENT_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: any }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  try {
    await prisma.student.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
