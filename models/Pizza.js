const mongoose = require('mongoose');

const PizzaSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    isVeg:{type:Boolean,required:true},
    rating:{type:Number,required:true},
    img:{type:String,required:true}
},{
    timeStamps:true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  });

PizzaSchema.virtual('id').get(function () {
    return this._id;
  });

mongoose.models={};
const Pizza = mongoose.model("Pizza",PizzaSchema );
export default Pizza;