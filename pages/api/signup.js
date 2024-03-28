import connectDB from "@/middleware/mongoose";
import User from "../../models/User";

var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    // console.log(req.body);
    const { email,name ,password} = req.body;
    const user = await User.create({
      email,
      name,
      password: CryptoJS.AES.encrypt(
        password,
        process.env.SECRET_KEY
      ).toString(),
    });
    res.status(200).json({ success: true, status: "success", user });
  } else {
    res
      .status(400)
      .json({ success: false, status: "This method is not allowed" });
  }
};

export default connectDB(handler);
