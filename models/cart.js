module.exports = function Cart(oldCart) {
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
  this.generateArray = function () {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};
