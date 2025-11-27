import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const data = await req.json();

  await prisma.user.update({
    where: { id: userId },
    data,
  });

  return Response.json({ success: true });
}

// import { prisma } from "@/prisma";
// import { auth } from "@clerk/nextjs/server";

// export async function POST(req: Request) {
//   const { userId } = await auth();
//   if (!userId) return new Response("Unauthorized", { status: 401 });

//   const data = await req.json();

//   const updatedUser = await prisma.user.update({
//     where: { id: userId },
//     data,
//   });

//   return Response.json({ success: true, user: updatedUser });
// }

