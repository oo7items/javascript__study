'strict mode';
// Importing module
// 1. 命名导入
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// console.log('Importing module');
// addToCart('bread', 5);
// console.log(price, tq);
// import * as shoppingCart from './shoppingCart.js';
// shoppingCart.addToCart('bread', 5);

// import { cart } from './shoppingCart';

// import shoppingCart from './shoppingCart';

// 2. 默认导入
// import add from './shoppingCart.js';
// add('bread', 5);
// console.log(shippingCost);
// 混合导入(一般不会使用)
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// add('bread', 5);
// console.log(price, tq);
// addToCart('bread', 5);

// 3. 生活联系
import add, { cart } from './shoppingCart.js';
/* 虽然我们
[]
0: {product: "bread", quantity: 5}
1: {product: "bread", quantity: 5}
2: {product: "bread", quantity: 5}
length: 3
__proto__: Array(0)
*/
add('bread', 5);
add('bread', 5);
add('bread', 5);
console.log(cart);

///////////////////// 模块的工作模式
// const ShoppingCart2 = (function () {
//   const cart = [];
//   // 私有变量
//   const shoppingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(
//       `${quantity} ${product} added to cart (sipping cost is ${shoppingCost})`
//     );
//   };

//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

// ShoppingCart2.addToCart('bread', 5);
// ShoppingCart2.addToCart('pizza', 5);
// console.log(ShoppingCart2);

// // 报错
// console.log(ShoppingCart2.shoppingCost); // undefined

// ////// commonJS
// // export.addTocart = function (product, quantity) {

// // }

// // Import
// const { addTocart } = require('./shoppingCart');

///////////////////// 深度克隆
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

// 浅度克隆, 当改变对象属性时, 会同步发生变化
const stateClone = Object.assign({}, state);
// 深度克隆, 当改变对象属性时, 不会同步发生变化
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;

// stateDeepClone.user.loggedIn = false;

console.log(state);
console.log(stateClone);
console.log(stateDeepClone);

////////// 更改模块热工作模式, 修改为保持状态
if (module.hot) {
  module.hot.accept();
}

///////////////////// babel预设转换
class Person {
  #greeting = 'hey';

  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas');

console.log(jonas);
console.log('Jonas' ?? null);

console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));

// 将最新ES6语法转换为ES5
// 这会填充所有ES5的方法, 加大了捆绑的大小
import 'core-js/stable';
// 因此我们要指定填充方法
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';
import 'regenerator-runtime/runtime';
