import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

interface IdOfRequest {
  id: number;
}

export default async function Acknowledged(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return res.status(405).json("Invalid Method");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { id } = req.body as IdOfRequest;

  const updateUser = await prisma.notificationType.update({
    where: {
      id: id,
    },
    data: {
      acknowledged: true,
    },
  });
  return res.status(400).json(updateUser.acknowledged);
}
