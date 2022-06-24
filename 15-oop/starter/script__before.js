'use strict';
// 什么是面向对象编程？ OOP
/************
  1. 面向对象编程（OOP）是一种基于对象概念的编程范式； (代码风格, “如何”编写和组织代码)
  2. 我们使用对象来建模（描述）现实世界或抽象特征；(例如. 用户或待办事项列表项)
  3. 对象可能包含数据（属性）和代码（方法）. 通过使用对象, 我们将数据和相应的行为打包成一个块；(例如 HTML 组件或数据结构)
  4. 在 OOP 中, 对象是独立的代码块/代码块；
  5. 对象是应用程序的构建块, 并相互交互；
  6. 交互通过公共接口（APl）发生：对象外部的代码可以访问并用于与对象通信的方法；
  7. OOP 的开发目标是组织代码, 使其更加灵活和易于维护（避免“意大利面条式代码”）. 
*/

/////////////////////// 类和实例（传统 O0P）
// 1. 只是一个表示, 不是实际的 Javascript 语法！ JavaScript 不支持真正的类, 如这里表示的
// 2. 就像我们可以创建新对象的蓝图
// 3. 从类创建的新对象. 就像从抽象蓝图创建的面积房子
// 4. 概念概述：它在 JavaScript 中的工作方式略有不同. 理解仍然很重要！👍

// 面向对象编程的 4 条基本原则
// 抽象 封装 继承 多态性
// “我们实际上如何设计课程？我们如何将真实世界的数据建模成类？”😎

// 细节已被抽象掉
// 抽象：忽略或隐藏无关紧要的细节, 使我们能够获得我们正在实施的事物的概览, 而不是混淆对我们的实施并不重要的细节.

// 封装
// 不能从课外访问！
// 仍然可以从课堂内访问！
// 同样, 实际上不是 JavaScript 语法（private 关键字不存在）
// 防止外部代码意外操作内部属性/状态
// 允许在不破坏外部代码的情况下更改内部实现
// 封装：在类内部保持属性和方法私有, 因此它们不能从类外部访问. 有些方法可以他公开为公共接口（api）

// 继承
// 自己的方法和属性
// 继承：使某个类的所有属性和方法可用到子类, 形成类之间的层次关系. 这使我们能够重用通用逻辑并对现实世界的关系进行建模.

// 动态化
// 自己的登录方式, 覆盖登录方式继承自用户
// 多态性：子类可以覆盖它从父类继承的方法[它更复杂, 但足以满足我们的目的].

/**** JavaScript中的面向对象编程 */
///////////////////////////// JAVASCRIPT 中的 OOP：原型
///// Class oop
// 对象《实例》是从类实例化, 其功能类似于蓝图；
// 行为（方法）从类复制到所有实例.

///// JAVASCRIPT 中的 OOP：原型
// 对象链接到原型对象；
// 原型继承：原型包含方法（所有链接到该原型的对象都可以访问的行为；
// 行为委托给链接原型对象.

///// 例子
// Array-prototype 是我们在 JavaScript 中创建的所有数组对象的原型 因此, 所有数组都必须使用 map 方法！

// 在 JAVASCRIPT 中实现原型继承的 3 种方法
// 1. 构造函数
// 从函数创建对象的技术；这就是数组、映射或集合(Array、Map、Set)等内置对象的实际实现方式

// 2. ES6 类
// 构造函数语法的现代替代品； “语法糖”：在幕后, ES6 类的工作方式与构造函数完全一样 ES6 类的行为不像“经典 OOP”中的类（最后一课）

// 3. object.create()
// 将对象链接到原型对象的最简单、最直接的方法

// 0OPare的4大支柱依然有效！
// 抽象 封装 继承 多态

// /******* 构造函数和新的运算符 */
// // 回调函数没有this关键字
// const Person = function (firstName, birthYear) {
//   // 实例属性
//   // Instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//   // Nerver to this
//   // 这个方法会指向所有对象, 会造成性能问题
//   // this.calcAge = function () {
//   //   console.log(2037 - this.birthYear);
//   // };
// };

// const jonas = new Person('Jonas', 1991);
// console.log(jonas); // Person
// console.log(Person.prototype); // Object

// // 1. New {} is reated 创建一个空对象
// // 2. function is called, this = {} 函数被调用, this指向调用函数
// // 3. {} linked to prototype 链接到原型
// // 4. function automatically return {} 功能自动返回

// /********** 原型 */
const matilda = new Person('Matilda', 2017);
const jack = new Person('jack', 1975);
console.log(matilda, jack);

// instanceof => 实例
console.log(jonas instanceof Person); // true

// 原型属性
console.log(Person.prototype); // {constructor: ƒ}

// 创建一个副本存放这种方法, 随后创建的所有对象使用构造函数, 都可以复用这个功能
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

console.log(Person.__proto__); // ƒ () { [native code] } // 本机代码
jonas.calcAge();
matilda.calcAge();

// 打印原型, 注意不是原型属性
console.log(jonas.__proto__); // {calcAge: ƒ, constructor: ƒ}

// (为什么可以使用它)对于jonas对象的原型, 本质上是原型属性的构造函数 -----重点
console.log(jonas.__proto__ === Person.prototype); // true

// 内置方法 -- 测试这是否是另一个对象的原型
console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(matilda)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false
console.log(Person.__proto__);

// .prototyeOfLinkedObjects

Person.prototype.species = 'Homo Sapiens';
// 这个属性不在内部对象中, 而是在__photo__原型中
console.log(jonas.species, matilda.species);

// 检查属性是否在内部对象中
// hasOwnProperty 拥有自己的财产
console.log(jonas.hasOwnProperty('firstName')); // true
console.log(jonas.hasOwnProperty('species')); // false
console.log(Person.prototype.hasOwnProperty('species')); // true

// /************ 原型继承和原型链 */

// /************ 内置对象的原型继承 */
// console.log(jonas.__proto__.__proto__);
// console.log(jonas.__proto__.__proto__.__proto__);

// console.dir(Person.prototype.constructor);
// // 数组原型和原型链和对象是一样的机制
// const arr = [3, 6, 6, 5, 6, 9, 9];
// console.log(arr.__proto__);
// console.log(arr.__proto__ === Array.prototype); // true

// console.log(arr.__proto__.__proto__);

// // 在数组原型属性中添加方法
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };
// console.log(arr.unique()); // 输出方法结果 [3, 6, 5, 9]

// // 请不要使用它的原因
// // 1. 一个版本的 JavaScript 可能会添加一个同名的方法 我们正在添加, 例如这里的这个,  但它可能以不同的方式工作.
// // 2. 所以你的代码将使用那个新方法 请记住, 它的工作方式不同. 然后这可能会破坏您的代码.
// // 3. 你不应该这样做的第二个原因 因为当你在一个开发团队中工作时 那么这真的是个坏主意 因为如果多个开发人员实现相同的方法 用不同的名字 那么这只会产生很多错误 不值得这样做

// const h1 = document.querySelectorAll('h1'); // 原型链 =》HtmlCollection -> Element -> Node -> xxx -> xxx
// // 可以测试元素的原型
// console.dir(h1);
// // console.dir(h1.__proto__.__proto__.__proto__.__proto__.__proto__); // HTMLHeadingElement -> HTMLElement -> Element -> Node -> EventTarget
// // 函数本身也是一个对象
// console.dir(x => x + 1);

// /** 编码挑战1
//  *
//  *
//  *
//  1. 使用构造函数将电动汽车（称为EV）实现为 Car 的 CHILD“类”. 除了品牌和当前速度外, EV 还具有以 % 为单位的当前电池电量（'charge' 属性）；
//  2. 实现一个“chargeBattery”方法, 它接受一个参数“chargeTo”并将电池电量设置为“chargeTo”；
//  3. 实施“加速”方法, 将汽车的速度提高 20, 并减少 1% 的费用. 然后记录如下消息：“特斯拉以 140 公里/小时的速度行驶, 充电 22%”；
//  4. 创建一个电动汽车对象并尝试调用“加速”、“刹车”和“充电电池”（充电至 90%）. 注意当你“加速”时会发生什么！提示：复习一下多态的定义😉 数据车1：“特斯拉”时速120公里, 充电23% 祝你好运😀
// */

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };
// // 加速
// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };
// // 刹车
// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// console.log(Car.prototype); // 原型对象, 包括添加的函数和构造函数

// const bmw = new Car('BMW', 120);
// const merceded = new Car('Mercedes', 95);

// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// bmw.accelerate();

/** ES6 Classes */
// 例外：RangeError：Object.get fullName [as fullName] (http://127.0.0.1:5500/starter/script.js:233:17) 处的最大调用堆栈大小超出

/*
  基础概念:
      0. 实现带有构造函数的原型继承, 然后手动设置方法, ES6 Classes允许我们做完全相同的事情, 但使用更现代的语法
      1. 使用这个语法, 我们不必手动弄乱原型属性, 在内部编写方法, 将自动添加到类的原型属性中, 我们也可以在类中使用手动设置方法
      2. 方法之前不需使用逗号
      3. 静态方法不能被实例化
*/

// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   // Instance methods 实例方法
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hey ${this.fullName}`);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   // 开始时fullName属性值是未定义的, 返回Undefined
//   // name = jessica.fullName = this.fullName , setter中的参数复制方式就是左边这样, 因此name的值等于创建实例传入的fullName值
//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name!`);
//   }

//   // get fullName() {
//   //   // Uncaught RangeError: 超出最大调用堆栈大小
//   //   // 返回属性名称不能和内部名称一样
//   //   return this._fullName;
//   // }

//   // 静态方法
//   static hey() {
//     console.log('Hey there 👏');
//     console.log(this);
//   }
// }

// console.log(PersonCl.prototype);
// const jessica = new PersonCl('Jessica Davis', 1996);
// console.log(jessica);
// console.log(jessica.__proto__ === PersonCl.prototype); // true

// jessica.calcAge();
// jessica.greet();

// const walter = new PersonCl('Walter White', 1965);
// PersonCl.hey();

// 函数声明提升不会被变量声明覆盖, 但会被变量赋值覆盖 https://segmentfault.com/a/1190000013562979
// 1. 类是不会被提升的
// 2. 类是一等公民
// 3. 类在严格的逻辑下执行

/** Setters and Getters
    getter and setter:
        设置一个已经存在的属性
          0. 在 javascript中如果试着改变一个属性的值, 那么对应的setter 将被执行.setter 经常和getter连用以创建一个伪属性.不可能在具有真实值的属性上同时拥有一个setter器
 */
// const account = {
//   owner: 'Jonas',
//   movements: [200, 530, 120, 300],

//   get latest() {
//     return this.movements.slice(-1).pop();
//   },

//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };

// // 这可能非常有用, 将某物读作属性时, 之前还需要做一些计算
// console.log(account.latest);

// account.latest = 50;
// console.log(account.movements);

/**************************************** 静态方法 */
// 重点是这个来自方法here真的是一个附加的方法到数组构造函数.
// 所以我们不能在数组上使用from方法. 所以这是行不通的.
// 好的, 所以from不是一个函数. 这是因为这里的方法真正依附于整个构造函数, 所以数组构造函数而不是构造函数的原型属性. 好的, 因此所有的数组都不会继承这个方法. 再次因为它不在他们的原型上. 它只是简单地附加到构造函数本身. 所以Array.from这里基本上只是一个简单的函数, 但它是一个附加到Array构造函数的函数. 原因很简单, 以便开发人员知道它与Arrays有关. 我们也说 from方法在Array命名空间中.

// 查询器不会返回nodeList
// Array.from(document.querySelector('h1')); // []

// Array.from(document.querySelectorAll('h1')); // [h1]

// [1, 2, 3].from(); // 报错不是一个函数

// Number.parseFloat(12); // 12

/******************************** 对象创建 */
// 实现原型继承或委托
// 使用Object.create, 仍然有原型继承的想法. 但是, 不涉及原型属性. 也没有构造函数, 也没有new运算符
// 因此, 我们可以使用Object.create基本上手动设置对象的原型, 到我们想要的任何其他对象
// 好的, 所以如果我们可以将原型设置为任何对象, 让我们实际创建一个对象我们想成为所有person对象的原型

// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },
//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// // Object.create创建一个新对象, 以及那个对象的原型将是我们传入的对象
// const steven = Object.create(PersonProto);
// console.log(steven);
// steven.name = 'Steven';
// steven.birthYear = 2002;
// steven.calcAge();

// console.log(steven.__photo__ === PersonProto.prototype); // true

// const sarah = Object.create(PersonProto);
// sarah.init('Sarah', 1979);
// sarah.calcAge();

// 当我们实现真正的类继承时,

/************************** 编码挑战2
 1. 重新创建挑战 1, 但这次使用 ES6 类；
 2. 添加一个名为“speedUS”的 getter, 它以 mi/h 为单位返回当前速度（除以 1.6）；
 3. 添加一个名为“speedUS”的设置器, 它以 mi/h 为单位设置当前速度（但在存储值之前将其转换为 km/h, 通过将输入乘以 1.6）；
 4. 创造一辆新车并试验加速和制动方法, 以及吸气剂和二传手. 
 数据车 1：“福特”以 120 公里/小时的速度行驶
*/

// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }
//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
//   }

//   brake() {
//     this.speed -= 5;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
//   }

//   get speedUS() {
//     this.speed / 1.6;
//   }
//   set speedUS() {

//   }
// }

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };
// // 加速
// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };
// // 刹车
// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// console.log(Car.prototype); // 原型对象, 包括添加的函数和构造函数

// const bmw = new Car('BMW', 120);
// const merceded = new Car('Mercedes', 95);

// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// bmw.accelerate();

/** “类”之间的继承：构造函数 */
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // 这里看起来很糟糕, 我们一直在重复代码！
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  // 报错, 我们不能简单地调用Person函数, 我们还需要手动设置this关键字
  // Person(firstName, birthYear); // 无法设置未定义的属性“firstName”
  // 使用call指定this关键字
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// 1. Student.prototype.__proto__ = Person.prototype
Student.prototype = Object.create(Person.prototype);
// Student.prototype = Person.prototype;

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();
console.log(mike);
console.log(Student.prototype);

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student); // true
console.log(mike instanceof Person); // true
console.log(mike instanceof Object); // true

// 2. 实际上我们应该使用控制台点目录, 所以你现在看到JavaScript, 认为学生或原型的构造函数是这里的人. 原因是我们设置学生的原型属性使用对象点创建. 所以这使它如此学生点原型的构造函数 还是人.
console.dir(Student.prototype.constructor);

// 3. 将学生原型的构造函数改为学生
// Student.prototype.constructor = Student;

console.log(Student.prototype);
console.log(mike.__proto__); // Person
console.log(mike.__proto__.__proto__); // Person
console.log(mike.__proto__ === Student.prototype); // true
console.log(Student.prototype.__proto__ === Person.prototype); // true

/* 编码挑战3
1. 使用构造函数将电动汽车（称为 EV）实现为 Car 的 CHILD“类”. 除了品牌和当前速度外, EV 还具有以 % 为单位的当前电池电量（'charge' 属性）;
2. 实现一个“chargeBattery”方法, 它接受一个参数“chargeTo”并将电池电量设置为“chargeTo”;
3. 实施 “加速” 方法, 将汽车的速度提高20, 并将电荷降低 1%. 然后记录如下消息：“特斯拉以 140 公里/小时的速度行驶, 充电 22%”；
4. 创建一个电动汽车对象并尝试调用 'accelerate'、'brake' 和 'chargeBattery'（充电到 90%）. 注意当你“加速”时会发生什么！ 提示：复习一下多态的定义😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
EV.prototype = Object.create(Car.prototype);

// 因为EV就是一个单纯的构造函数, 没有在对象中, 因此需要添加到原型属性里
EV.prototype.constructor = EV;
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

console.log(EV.prototype);
// 原型链中具有相同属性名称的方法时, 子类会覆盖父类的方法, 作用域也是如此
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`
  );
};

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
tesla.brake();
tesla.accelerate();
console.log(tesla);

/** 类”之间的继承：ES6 类
    0. 类中继承了原型后, 如何子类没有需要添加的内部属性, 那么可以不需要编写constructor()构造函数
    1. super()用于继承类中的构造函数
    2. 类和object.create继承的区别是, 类继承后的原型
属性中包含构造函数, 而对象创建没有构造函数 ------- 不理解 
*/
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   // Instance methods 实例方法
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hey ${this.fullName}`);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name!`);
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   static hey() {
//     console.log('Hey there 👏');
//     console.log(this);
//   }
// }

// class StudentCl extends PersonCl {
//   constructor(fullName, birthYear, course) {
//     super(fullName, birthYear);
//     this.course = course;
//   }

//   introduce() {
//     console.log(`My name is ${this.fullName} and I study ${this.course}`);
//   }
// }

// const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
// martha.introduce();
// martha.calcAge();
// console.log(StudentCl.prototype);

/***************** “类”之间的继承：Object.create */
// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);
// const StudentProto = Object.create(PersonProto);

// StudentProto.init = function (firstName, birthYear, course) {
//   PersonProto.init.call(this, firstName, birthYear);
//   this.course = course;
// };

// StudentProto.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };
// const jay = Object.create(StudentProto);
// jay.init('Jay', 2010, 'Computer Science');
// jay.introduce();
// jay.calcAge();

/**************** 银行应用程序类示例
 * 0
 *
 */
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${this.owner}`);
  }

  deposit(val) {
    this.movements.push(val);
  }

  withdraw(val) {
    this.movements.push(-val);
  }

  approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
  }
}
// 尽量不要使用属性进行交互, 创建方法要好的多
// acc1.movements.push(250);
// acc1.movements.push(-250);

const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.deposit(250);
acc1.deposit(140);

acc1.requestLoan(1000);
// 我们不应该允许访问这种方法
acc1.approveLoan(1000);

/********* 封装：受保护的属性和方法 */
// 1) 公共字段
// 2) 私有字段
// 3) 公共方法
// 4) 私有方法
// (there is also the static version)

class Account {
  // 1) 公共字段(在实例上, 不在原型上)
  locale = navigator.language;

  // 2) 私有字段(实例)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    // 受保护财产
    // this._movements = [];
    // this.locale = navigator.language; // zh-cn
    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3) 公共方法
  // 公共接口
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    // if (this.#approveLoan(val)) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }

  static helper() {
    console.log('Helper');
  }

  // 4) 私有方法
  // #approveLoan(val) {
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());
console.log(acc1);
Account.helper();

// 未捕获的语法错误：必须在封闭类中声明私有字段“#pin”
// console.log(acc1.#pin);

// /*********** 链接方法 */
// acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
// console.log(acc1.getMovements());
// console.log(acc1);
// // 只是我们在构造函数中定义的属性. 所以它在每个创建的对象上都可用. 所以在这个类创建的每个实例上. 那么当然, 我们也有私有字段他们几乎和公共领域一样, 但它们在课堂之外是不可访问的.
// console.log(Account.prototype);

/******** 总结 */
//////////////// extends关键字
// extends关键字会自动为我们建立原型链, 我们不需要手动做任何事情

// 所以请记住, 公共字段与我们在构造函数中定义的属性非常相似.
// 所以它在每个创建的对象上都可用.
// 所以在这个类创建的每个实例上.
// 当然, 我们也有私有字段, 它们与公共字段几乎相同, 但它们不能在类之外访问.

// 静态公共字段, 这些字段或类似的属性仅在课堂上可用

// 构造函数方法, 由new操作符自动调用, 每当我们创建类的新实例时, 每当我们创建新实例时, 基本是创建一个新的对象

// 这个构造方法在任何常规类中都是强制性的, 但如果我们希望它具有完全相同的数量和完全相同的参数名称, 则可以在子类中省略它.

// 然后在构造函数内部调用父类, 这就是超类. super() === ParentElement.call(this, xxx, xxx);

// 这当然只有在我们编写子类时才需要. 所以当我们使用 extend 关键字时. 请记住, 这需要在我们访问构造函数中的 disc 关键字之前发生.

//////////// 公共字段和实列属性的区别
// 那么这里我们有一个实例属性. 因此, 就像公共字段一样, 该属性也可用于每个创建的对象.
// 但是这个和public字段的区别在于我们是根据构造函数的输入数据来设置这些实例属性的. 所以基本上这些属性对于每个对象都更加个性化和独特, 而字段通常用于所有对象共有的东西.
// 这就是我们对银行账户示例中的 pin 所做的, 对吗？所以这个私人领域对于每个学生来说应该是独一无二的. 所以我们创建了没有任何价值的私有字段. 然后在这里我们只是将它重新定义为进入构造函数的值.

//////////// 封装和接口
// 那么这里, 正如我们已经知道的, 是一个普通的公共方法. 在这里, 我们引用了一个私有字段和一个私有方法. 关于私有方法, 这就是它们的样子. 但正如我所提到的, 它们可能还不能在您的浏览器中运行.

///////////// getter和setter方法
// 接下来, 这就是 getter 方法的样子. 请记住, getter 方法基本上是为了让我们可以通过简单地编写属性而不是编写方法来从对象中获取值.
// 所以在这种情况下, 我们可以简单地编写 student.testscore , 然后运行这个 getter 方法和 setter 方法.
// 因此, 在这种情况下, 我们可以通过将其设置为某个值而不是调用测试分数方法来简单地定义测试分数.
// 请记住, 如果您有一个已在构造函数中定义的属性的 setter, 那么您基本上需要创建一个新的属性, 该属性前面带有下划线. 同样, 这是您在这种情况下应该使用的一种约定. 然后在同名的 getter 中, 您还需要返回该新属性.

///////////// 静态方法
// 当我们对名称进行名称验证时那被传递给构造函数. 还记得吗？接下来, 这就是您编写静态方法的方式并且静态方法仅在类上可用. 所以它不能访问实例属性和方法, 但只有静态的.
// 例如, 我们在顶部定义的静态公共字段当然可以在静态方法中访问. 通常我们使用这些静态方法作为类的辅助方法. 最后, 这就是使用 new 运算符创建新对象的方式. 所以在这一点上这对你来说应该不是什么新鲜事.
// 实例访问原型中的静态方法时, 会返回undefined

///////////// 类
// 类是不会被提升的, 类是一等公民, 类始终以严格模式执行

class Person {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
}

class Student extends Person {
  university = 'University of Lishon';
  #studyHours = 0;
  #course;
  static numSubjects = 10;

  constructor(fullName, birthYear, startYear, course) {
    super(fullName, birthYear);
    this.startYear = startYear;
    this.#course = course;
  }
  introduce() {
    console.log(`I study ${this.#course} at ${this.university}`);
  }

  study(h) {
    this.#makeCoffe();
    this.#studyHours += h;
  }

  #makeCoffe() {
    return this._testScore;
  }

  set testScore(score) {
    this._testScore = score <= 20 ? score : 0;
  }

  //
  static printCurriculum() {
    console.log(`There are ${this.numSubjects} subjects`);
  }
}

const student = new Student('Jonas', 2020, 2037, 'Medicine');
student.study(3);
Student.printCurriculum();

///////////////////////////////////////
// Coding Challenge #4

/* 
1. 重新创建挑战 #3，但这次使用 ES6 类：创建“CarCl”类的“EVCl”子类
2. 将“收费”财产设为私有；
3. 实现链接此类的“accelerate”和“chargeBattery”方法的能力，并更新“CarCl”类中的“brake”方法. 他们尝试用chining！

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
// console.log(rivian.#charge);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery()
  .accelerate();

console.log(rivian.speedUS);
