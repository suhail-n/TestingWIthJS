module.exports = class Checkout {
  constructor() {
    this.prices = {};
    this.items = {};
    this.discounts = {};
  }
  addItemPrice(item, price) {
    this.prices[item] = price;
  }
  addItem(item) {
    if (!this.prices[item]) throw `Item ${item} does not have a price defined`;
    this.items[item] = 1 + (this.items[item] || 0);
  }
  calculateTotal() {
    let total = 0;
    for (let item in this.items) {
      total += this.calculateItemTotal(item);
    }
    return total;
  }
  calculateItemTotal(item) {
    let total = 0;
    let discount = this.discounts[item];
    if (discount !== undefined) {
      total += this.calculateDiscount(item, this.items[item], discount);
    } else {
      total += this.prices[item] * this.items[item];
    }
    return total;
  }
  calculateDiscount(item, itemCnt, discount) {
    let total = 0;
    let numOfDiscounts = Math.floor(itemCnt / discount.cnt);
    total += numOfDiscounts * discount.price;
    let remainder = itemCnt % discount.cnt;
    total += remainder * this.prices[item];
    return total;
  }
  addDiscount(item, itemCount, discountPrice) {
    this.discounts[item] = {
      cnt: itemCount,
      price: discountPrice
    };
  }
};
