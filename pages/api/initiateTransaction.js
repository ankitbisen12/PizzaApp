// const https = require("https");
// const PaytmChecksum = require("./PaytmChecksum"); //Checksum ensures that API requests and responses shared between your application and Paytm have not interfered at the time of communication between both systems.
const axios = require("axios");
import sha256 from "crypto-js/sha256";

export default async function handler(req, res) {
  if (req.method == "POST") {
    console.log(req.body);
    try {
      const data = {
        merchantId: process.env.NEXT_PUBLIC_M_ID,
        merchantTransactionId: "MT" + Math.floor(Math.random() * 100000),
        merchantUserId: "MUID123",
        name: req.body.address.name,
        amount: req.body.subTotal,
        redirectUrl: "http://localhost:3000/orders",
        redirectMode: "POST",
        callbackUrl: "http://localhost:3000/orders",
        mobileNumber: req.body.address.mobileNumber,
        items: req.body.cart,
        totalItems: req.body.totalItems,
        paymentInstrument: {
          type: "PAY_PAGE",
        },
      };

      const payload = JSON.stringify(data);
      const payloadMain = Buffer.from(payload).toString("base64");
      const string =
        payloadMain + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
      const dataSha256 = sha256(string);
      const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
      // console.log("checksum", checksum);
      const prod_URL =
        "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

      const response = await axios.post(
        prod_URL,
        {
          request: payloadMain,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-VERIFY": checksum,
          },
        }
      );

      const responseData =
        response.data.data.instrumentResponse.redirectInfo.url;
      res.status(200).json(responseData);
    } catch (error) {
      // console.log("Running Error");
      // console.log(error);
    }
  }
}
