const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//function para limitar a 10 itens
function arrayLimit(arr) {
  return arr.length <= 10;
}

const coffeeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    trim: true,
  },
  roast: {
    type: String,
    enum: ["Blond Roast", "Medium Roast", "Dark Roast"],
    required: true,
  },
  storageType: {
    type: String,
    enum: ["Beans", "Grinded"],
    required: true,
    default: "Beans",
  },
  price: { type: Number, required: true },
  stok: { type: Number, required: true, default: 0 },
  // Limitar quantidade de itens na array
  sensoryNotes: {
    type: [{ type: String, maxlength: 64 }],
    validate: [arrayLimit, "Array maior que o esperado."],
  },
  producerInstagram: { type: String, maxlength: 64, match: /^[@]/gm },
  acidity: { type: Number, min: 1, max: 5, default: 3 },
  sweetness: { type: Number, min: 1, max: 5, default: 3 },
  bitterness: { type: Number, min: 1, max: 5, default: 3 },
  orderList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

module.exports = mongoose.model("Coffee", coffeeSchema);
