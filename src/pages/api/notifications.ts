import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function Acknowledged(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json("Invalid Method");
  }

  const data = await prisma.notificationType.findMany();

  return res.status(400).json(data);
}
