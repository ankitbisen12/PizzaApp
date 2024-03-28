const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    items: { type: mongoose.Schema.Types.Mixed, required: true },
    totalAmount: { type: Number },
    totalItems: { type: Number },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentMethod: { type: String },
    selectedAddress: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  }
);

OrderSchema.virtual("id").get(function () {
  return this._id;
});

mongoose.models = {};
const Orders = mongoose.model("Orders", OrderSchema);

module.exports = Orders;
