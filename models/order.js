const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  // store an id, but be aware that this
  // id links to the Users collection
  user: { type: Schema.Types.ObjectId, ref: "User" },
  cart: { type: Object, required: true },
  address: { type: String, required: true },
  createdOn: { type: Date, required: true },
  // person's name
  name: { type: String, required: true },

  // https://dashboard.stripe.com/test/payments/ch_1GbTYSDv9UmNgIoZgQUnb6Jc
  // paymentId example: ch_1GbTxzDv9UmNgIoK4YuiXvb1
  paymentId: { type: String, required: true },
});

module.exports = mongoose.model("Order", schema);