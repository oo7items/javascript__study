// var budget = [
//   { value: 250, description: "Sold old TV 📺", user: "jonas" },
//   { value: -45, description: "Groceries 🥑", user: "jonas" },
//   { value: 3500, description: "Monthly salary 👩‍💻", user: "jonas" },
//   { value: 300, description: "Freelancing 👩‍💻", user: "jonas" },
//   { value: -1100, description: "New iPhone 📱", user: "jonas" },
//   { value: -20, description: "Candy 🍭", user: "matilda" },
//   { value: -125, description: "Toys 🚂", user: "matilda" },
//   { value: -1800, description: "New Laptop 💻", user: "jonas" },
// ];

// import { entries } from 'core-js/core/array';

// // 受限对象数组
// var limits = {
//   jonas: 1500,
//   matilda: 100,
// };

// var add = function (value, description, user) {
//   if (!user) user = "jonas";
//   user = user.toLowerCase();

//   var lim;
//   if (limits[user]) {
//     lim = limits[user];
//   } else {
//     lim = 0;
//   }

//   if (value <= lim) {
//     budget.push({
//       value: -value,
//       description: description,
//       user: user,
//     });
//   }
// };

// // 表情占用两个字符串
// add(10, "pizza 🍕");
// add(100, "Going to movies 🍿", "Matilda");
// add(200, "Stuff", "Jay");
// console.log(budget);

///////////////////// 修改后
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// 消费限额(Object.freeze：冻结数组(浅度冻结))
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

// 无法添加属性
// spendingLimits.jay = 200;
// console.log(spendingLimits);

// const limit = spendingLimits[user] ? spendingLimits[user] : 0;
const getLimit = (limits, user) => limits?.[user] ?? 0; // 这里不是很懂

// 纯函数
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  // 为了避免这些数据冲突, 应该创建一个新的变量
  const cleanUser = user.toLowerCase();
  // 试图操纵外部数据对象, 它是一个不纯的函数, 因此我们应该总是传递所有的数据函数依赖于函数, 这样它就不必进入外部范围, 所以这是第一个好的做法
  // 1. 创建一个副本然后返回该状态的副本
  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

// const checkExpenses2 = function (state, limits) {
//   return state.map(entry => {
//     return entry.value < -getLimit(limits, entry.user)
//       ? { ...entry, flag: 'limit' }
//       : entry;
//   });
//   // for (const entry of newBudget3)
//   //   if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit';
// };

const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

// 不纯的(记录大开支)
const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' /');
  console.log(bigExpenses);
  // 这是一个不纯的函数, 因为它会产生副作用通过在此处执行此控制台点日志, 所以事实上, 所有的控制台点日志都在这里, 当然是不纯的, 因为他们做了一些事情, 所以在这种情况下, 他们在控制台中创建了一些东西, 所以他们创造了输入输出
  // 但是当然任何程序都需要有一些副作用, 因为否则我们怎么会知道这个程序首先是跑步吗？
};

logBigExpenses(finalBudget, 500);

// 增强的对象字面量语法
// 可选链接和合并运算符
// 表情占用两个字符串
