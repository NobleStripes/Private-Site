import { PrismaClient } from "@prisma/client";
import GalleryClient from "./GalleryClient";

const prisma = new PrismaClient();

export default async function Home() {
  const images = await prisma.image.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <GalleryClient initialImages={images} />;
}
