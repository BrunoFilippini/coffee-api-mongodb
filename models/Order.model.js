const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Coffee = require("./Coffee.model");

const OrderSchema = new Schema({
  coffee: { type: mongoose.Schema.Types.ObjectId, ref: "Coffee" },
  quantityPurchased: { type: Number, required: true, default: 1 },
  totalAmount: { type: Number },
  data: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  deletedDate: { type: Date },
});

module.exports = mongoose.model("Order", OrderSchema);
