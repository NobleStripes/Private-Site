import { getDriveClient } from "@/lib/drive";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  try {
    const drive = await getDriveClient();
    const file = await drive.files.get({ fileId: id, alt: "media" }, { responseType: "stream" });
    
    // Convert Node stream to Web ReadableStream
    const nodeStream = file.data as any;
    const webStream = new ReadableStream({
      start(controller) {
        nodeStream.on('data', (chunk: any) => controller.enqueue(chunk));
        nodeStream.on('end', () => controller.close());
        nodeStream.on('error', (err: any) => controller.error(err));
      }
    });

    return new NextResponse(webStream, {
      headers: {
        "Content-Type": file.headers["content-type"] || "image/jpeg",
        "Cache-Control": "public, max-age=86400" // Cache images for 24h
      }
    });
  } catch (error) {
    console.error("Error fetching image from Drive:", error);
    return new NextResponse("Error fetching image", { status: 500 });
  }
}
