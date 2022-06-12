'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

// 账户
const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');

const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');

const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');

const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');

const inputLoanAmount = document.querySelector('.form__input--loan-amount');

const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal__content');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// 货币
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// 动作
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  // 必须要加slice，因为sort会直接改变movements数组
  const movs = sort ? movements.sort((a, b) => a - b) : movements;

  movs.forEach(mov => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
          <div class="movements__row">
            <div class="movements__type movements__type--${type}">2 deposit</div>
            <div class="movements__value">${Math.abs(mov)}€</div>
          </div>
        `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUsernames = function (accs) {
  accs.map(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .slice(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
console.log(accounts);
const calceDisplaySummary = function (acc) {
  labelSumIn.textContent = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur);

  labelSumOut.textContent = Math.abs(
    acc.movements.filter(mov => mov < 0).reduce((acc, cur) => acc + cur)
  );

  labelSumInterest.textContent = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur * 0.01);
};

const calceDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur);
  labelBalance.textContent = `${acc.balance}€`;
};

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calceDisplaySummary(acc);
  calceDisplayBalance(acc);
};

createUsername(accounts);
console.log(accounts);

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 100;
    displayMovements(currentAccount.movements);
    calceDisplaySummary(currentAccount);
    calceDisplayBalance(currentAccount);
  }
  inputLoginUsername.value = inputLoginPin.value = '';
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const receiver = accounts.find(acc => acc.username === inputTransferTo.value);
  const amount = Number(inputTransferAmount.value);
  if (
    receiver &&
    receiver.username !== currentAccount.username &&
    amount < currentAccount.balance
  ) {
    receiver.movements.push(amount);
    currentAccount.movements.push(-amount);
    updateUI(currentAccount);
  }
  inputTransferTo.value = inputTransferAmount.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  // input[number] 默认值为0
  if (amount > 0 && currentAccount.movements.some(mov => mov > amount * 0.1)) {
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const index = accounts.findIndex(
    acc => acc.username === currentAccount.username
  );
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

