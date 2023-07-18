import { type NextApiRequest, type NextApiResponse } from "next";
// import data from "~/db";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: string;
}

interface IDVariable {
  id: number;
}

export default function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const NotifID: IDVariable = JSON.parse(req.body);

    console.log(NotifID);

    // data.forEach((elem) => {
    //   if (elem.id === NotifID.id) {
    //     elem.acknowledged = true;
    //   }
    // });
    res.send(200);
  } else {
    return null;
  }
}
