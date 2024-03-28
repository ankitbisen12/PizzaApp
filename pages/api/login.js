import connectDB from "@/middleware/mongoose";
import Users from "../../models/User";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await Users.findOne({ email: req.body.email });
    // let { email, name, password } = user;

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    // console.log("decrypted data",decryptedData);
    // console.log(user);

    if (user) {
      let { email, password, name } = user;
      if (
        req.body.email === user.email &&
        req.body.password === decryptedData
      ) {
        var token = jwt.sign(
          { userId: user._id, email: user.email, name: user.name },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );
        res.status(200).json({ success: true, token });
      }
      else{
          res.status(400).json({success:false,error:'Invalid credentials'});
      }
    } else {
      res.status(400).json({ success: false, error: "User not found" });
    }
  } else {
    res
      .status(400)
      .json({ success: false, status: "This method is not allowed" });
  }
};

export default connectDB(handler);
