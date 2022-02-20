// Exporting module
console.log('Exporting module');

const shippingCost = 10;
export const cart = [];
// if (true) {
// 必须在顶级范围
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};
// }

const totalPrice = 232;
const totalQuantity = 5;

// 注意需要使用花括号
export { totalPrice, totalQuantity as tq };

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
