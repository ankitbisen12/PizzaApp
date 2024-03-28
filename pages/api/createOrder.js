import connectDB from "@/middleware/mongoose";
import Orders from "@/models/Orders";
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const {
      token,
      items,
      totalAmount,
      totalItems,
      paymentMethod,
      selectedAddress,
    } = req.body;
    // console.log("req.body",req.body);

    try {
      let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      // console.log("decodeToken", decodedToken);
      let userId = decodedToken.userId;

      // console.log("userid", userId);
      const order = await Orders.create({
        items,
        totalAmount,
        totalItems,
        user: userId,
        paymentMethod,
        selectedAddress,
      });

      res.status(200).json({ success: true, orders:order });
    } catch (error) {
      res
        .status(500)
        .json({ error, success: false, error: "Failed to create order" });
    }
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
};

export default connectDB(handler);
