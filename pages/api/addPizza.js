import connectDB from "@/middleware/mongoose";
import Pizza from "@/models/Pizza";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const pizza = await Pizza.create(req.body);
    res.status(200).json({
      status: "success",
      data: pizza,
    });
  } else {
    res.status(400).json({ status: "This method is not allowed" });
  }
};

export default connectDB(handler);
