const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var random = require('mongoose-simple-random');

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  type: [{ type: String }],
  imagePath: { type: String, required: true },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

productSchema.plugin(random);

module.exports = mongoose.model("Product", productSchema);