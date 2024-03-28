// import connectDB from "@/middleware/mongoose";
// import Orders from "@/models/Orders";
// var jwt = require("jsonwebtoken");


// const handler = async (req, res) => {
//     let token = localStorage.getItem("token");
//     let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
//     console.log("decodeToken", decodedToken);
//     let userId = decodedToken.userId;
//     console.log("UserId",userId);

//     let orders = await Orders.find({ user: userId }).populate("User");

//     res.status(200).json({ success: true, orders });
// };

// export default connectDB(handler);
