import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { listImages } from "@/lib/drive";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    if (!folderId) throw new Error("Missing GOOGLE_DRIVE_FOLDER_ID in environment variables.");
    
    const driveFiles = await listImages(folderId);
    
    let newCount = 0;
    for (const file of driveFiles) {
      if (!file.id) continue;
      const existing = await prisma.image.findUnique({ where: { driveId: file.id } });
      if (!existing) {
        await prisma.image.create({
          data: {
            driveId: file.id,
            title: file.name,
          }
        });
        newCount++;
      }
    }
    
    return NextResponse.json({ success: true, added: newCount, totalFound: driveFiles.length });
  } catch (error: any) {
    console.error("Sync error:", error);
    return new NextResponse(error.message || "Failed to sync", { status: 500 });
  }
}
