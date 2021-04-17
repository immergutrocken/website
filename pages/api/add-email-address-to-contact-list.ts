import { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/shared/mailjetClient";
import sha256 from "crypto-js/sha256";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { eMailAddress, sha } = JSON.parse(req.body);
  const fixedEmail = eMailAddress.replace(" ", "+");

  if (sha256(fixedEmail.replace(" ", "+")).toString() === sha) {
    const addToContactList = client.post("listrecipient").request({
      ContactAlt: fixedEmail,
      ListID: process.env.MAILJET_LIST_ID,
    });
    await addToContactList
      .then(() => {
        res.status(200).json({});
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  } else {
    res.status(403).json({
      message: "E-Mail address is not valid",
    });
  }
};
