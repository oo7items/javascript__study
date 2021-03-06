// var budget = [
//   { value: 250, description: "Sold old TV ðº", user: "jonas" },
//   { value: -45, description: "Groceries ð¥", user: "jonas" },
//   { value: 3500, description: "Monthly salary ð©âð»", user: "jonas" },
//   { value: 300, description: "Freelancing ð©âð»", user: "jonas" },
//   { value: -1100, description: "New iPhone ð±", user: "jonas" },
//   { value: -20, description: "Candy ð­", user: "matilda" },
//   { value: -125, description: "Toys ð", user: "matilda" },
//   { value: -1800, description: "New Laptop ð»", user: "jonas" },
// ];

// import { entries } from 'core-js/core/array';

// // åéå¯¹è±¡æ°ç»
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

// // è¡¨æå ç¨ä¸¤ä¸ªå­ç¬¦ä¸²
// add(10, "pizza ð");
// add(100, "Going to movies ð¿", "Matilda");
// add(200, "Stuff", "Jay");
// console.log(budget);

///////////////////// ä¿®æ¹å
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV ðº', user: 'jonas' },
  { value: -45, description: 'Groceries ð¥', user: 'jonas' },
  { value: 3500, description: 'Monthly salary ð©âð»', user: 'jonas' },
  { value: 300, description: 'Freelancing ð©âð»', user: 'jonas' },
  { value: -1100, description: 'New iPhone ð±', user: 'jonas' },
  { value: -20, description: 'Candy ð­', user: 'matilda' },
  { value: -125, description: 'Toys ð', user: 'matilda' },
  { value: -1800, description: 'New Laptop ð»', user: 'jonas' },
]);

// æ¶è´¹éé¢(Object.freezeï¼å»ç»æ°ç»(æµåº¦å»ç»))
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

// æ æ³æ·»å å±æ§
// spendingLimits.jay = 200;
// console.log(spendingLimits);

// const limit = spendingLimits[user] ? spendingLimits[user] : 0;
const getLimit = (limits, user) => limits?.[user] ?? 0; // è¿éä¸æ¯å¾æ

// çº¯å½æ°
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  // ä¸ºäºé¿åè¿äºæ°æ®å²çª, åºè¯¥åå»ºä¸ä¸ªæ°çåé
  const cleanUser = user.toLowerCase();
  // è¯å¾æçºµå¤é¨æ°æ®å¯¹è±¡, å®æ¯ä¸ä¸ªä¸çº¯çå½æ°, å æ­¤æä»¬åºè¯¥æ»æ¯ä¼ éææçæ°æ®å½æ°ä¾èµäºå½æ°, è¿æ ·å®å°±ä¸å¿è¿å¥å¤é¨èå´, æä»¥è¿æ¯ç¬¬ä¸ä¸ªå¥½çåæ³
  // 1. åå»ºä¸ä¸ªå¯æ¬ç¶åè¿åè¯¥ç¶æçå¯æ¬
  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza ð');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies ð¿',
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

// ä¸çº¯ç(è®°å½å¤§å¼æ¯)
const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' /');
  console.log(bigExpenses);
  // è¿æ¯ä¸ä¸ªä¸çº¯çå½æ°, å ä¸ºå®ä¼äº§çå¯ä½ç¨éè¿å¨æ­¤å¤æ§è¡æ­¤æ§å¶å°ç¹æ¥å¿, æä»¥äºå®ä¸, ææçæ§å¶å°ç¹æ¥å¿é½å¨è¿é, å½ç¶æ¯ä¸çº¯ç, å ä¸ºä»ä»¬åäºä¸äºäºæ, æä»¥å¨è¿ç§æåµä¸, ä»ä»¬å¨æ§å¶å°ä¸­åå»ºäºä¸äºä¸è¥¿, æä»¥ä»ä»¬åé äºè¾å¥è¾åº
  // ä½æ¯å½ç¶ä»»ä½ç¨åºé½éè¦æä¸äºå¯ä½ç¨, å ä¸ºå¦åæä»¬æä¹ä¼ç¥éè¿ä¸ªç¨åºé¦åæ¯è·æ­¥åï¼
};

logBigExpenses(finalBudget, 500);

// å¢å¼ºçå¯¹è±¡å­é¢éè¯­æ³
// å¯éé¾æ¥ååå¹¶è¿ç®ç¬¦
// è¡¨æå ç¨ä¸¤ä¸ªå­ç¬¦ä¸²
