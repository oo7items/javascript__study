const budget = [
  {
    value: 250,
    description: 'Sold old TV 📺',
    user: 'jonas',
  },
  {
    value: -45,
    description: 'Groceries 🥑',
    user: 'jonas',
  },
  {
    value: 3500,
    description: 'Monthly salary 👩‍💻',
    user: 'jonas',
  },
  {
    value: 300,
    description: 'Freelancing 👩‍💻',
    user: 'jonas',
  },
  {
    value: -1100,
    description: 'New iPhone 📱',
    user: 'jonas',
  },
  {
    value: -20,
    description: 'Candy 🍭',
    user: 'matilda',
  },
  {
    value: -125,
    description: 'Toys 🚂',
    user: 'matilda',
  },
  {
    value: -1800,
    description: 'New Laptop 💻',
    user: 'jonas',
  },
];
// 消费限额(限制对象)
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
const getLimit = (limit, user) => limit?.[user];
// 添加费用
const addExpenses = function (
  state,
  limit,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();
  return value <= getLimit(limit, cleanUser)
    ? [
        ...state,
        {
          value: -value,
          description,
          user,
        },
      ]
    : state;
};
const newBudget1 = addExpenses(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpenses(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpenses(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
console.log(newBudget3);
// 检查费用
const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? {
          ...entry,
          flag: 'limit ',
        }
      : entry
  );
const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);
// 记录大开支
const logBigExpenses = function (state, bigLimit) {
  // entry 输入 入口 条目
  const bigExpenses = state
    .filter(entry => entry.value <= bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' /');
  // 控制台输入输出会导致函数不纯, 但是这也是不可避免的, 因为我们要知道哪里做了些什么？
  console.log(bigExpenses);
};
logBigExpenses(finalBudget, 100); /* 知识点
  1. 增强的对象字面量语法
  2. 可选链接和合并运算符
  3. 表情占用两个字符串
*/

//# sourceMappingURL=index.36b6d3a3.js.map
