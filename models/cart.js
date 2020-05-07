module.exports = function Cart(oldCart) {
  const Product = require("../models/product");
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function (item, id) {
    // we want to group same items.
    // example: instead of having
    // 3 same items we will have
    // 1 item with the quntity of 3

    var storedItem = this.items[id];
    if (!storedItem) {
      // create the new item
      storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
    }
    storedItem.qty++;
    // storedItem.item.price
    storedItem.price = storedItem.item.price * storedItem.qty;
    this.totalQty++;
    this.totalPrice += item.price;
  };

  this.reduceByOne = function (id) {
    this.items[id].qty--;
    this.items[id].price -= this.items[id].item.price;
    this.totalQty--;
    this.totalPrice -= this.items[id].item.price;

    // if item quantity <=0, then remove it
    if (this.items[id].qty <= 0) {
      delete this.items[id];
    }
  };

  this.increaseByOne = function (id) {
    this.items[id].qty++;
    this.items[id].price += this.items[id].item.price;
    this.totalQty++;
    this.totalPrice += this.items[id].item.price;
  };

  // id - id of the item(product) we want to remove
  this.removeItem = function (id) {
    this.totalQty -= this.items[id].qty;
    this.totalPrice -= this.items[id].price;
    delete this.items[id];
  };

  // will give cart items as an array
  this.generateArray = async function (sessionCart) {
    let arr = [];
    let ttlQty = 0;
    let ttlPrice = 0;
    for (var id in this.items) {
      await Product.findOne({ _id: id }, (err, product) => {
        if (typeof (product) !== "undefined" && !product.isDeleted) {
          ttlQty += this.items[id].qty;
          ttlPrice += this.items[id].price;
          arr.push(this.items[id]);
        } else if (product.isDeleted) {
          for (let i = 0; i < this.items[id].qty; i++) {
            console.log(`i: ${i}, this.totalQty: ${this.totalQty}, this.totalPrice ${this.totalPrice}`);
            this.totalQty--;
            this.totalPrice -= this.items[id].item.price;
          }
          this.items[id].qty = 0;
          this.items[id].price = 0;
          delete this.items[id];
        }
      });
    }
    sessionCart.totalQty = ttlQty;
    sessionCart.totalPrice = ttlPrice;

    return arr;
  };
};
