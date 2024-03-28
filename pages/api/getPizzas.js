import connectDB from "@/middleware/mongoose";
import Pizza from "@/models/Pizza";


const handler = async(req,res)=>{
    let pizza = await Pizza.find({});
    res.status(200).json(pizza);
}

export default connectDB(handler);

