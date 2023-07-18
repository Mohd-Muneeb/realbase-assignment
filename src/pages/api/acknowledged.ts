import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    id: number;
  };
}

export default async function Acknowledged(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return res.status(405).json("Invalid Method");
  }
  const updateUser = await prisma.notificationType.update({
    where: {
      id: req.body.id,
    },
    data: {
      acknowledged: true,
    },
  });
  return res.status(400).json(updateUser.acknowledged);
}
