import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return Response.json(user);
}
