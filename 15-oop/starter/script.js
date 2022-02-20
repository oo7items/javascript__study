// /******************** 什么是面向对象编程？ OOP */
// /* 什么是面向对象编程？(有图)
//   1. 面向对象编程(OOP)是一种基于对象概念的编程范式; (代码风格，“如何”编写和组织代码)
//   2. 我们使用对象来建模(描述)现实世界或抽象特征; (例如. 用户或待办事项列表项)
//   3. 对象可能包含数据(属性)和代码(方法). 通过使用对象, 我们将数据和相应的行为打包成一个块; (例如HTML组件或数据结构)
//   4. 在OOP中, 对象是独立的代码块/代码块;
//   5. 对象是应用程序的构建块, 并相互交互;
//   6. 交互通过公共接口(API)发生：对象外部的代码可以访问并用于与对象通信的方法;
//   7. OOP的开发目标是组织代码, 使其更加灵活和易于维护(避免“意大利面条式代码”)
// */

// /* 类和实列(传统的OOP)(有图)
//   1. 只是一个表示, 不是实际的JavaScript语法！JavaScript不支持真正的类, 如这里表示的
//   2. 就像我们可以创建新对象的蓝图
//   3. 从类创建的新对象, 就像从抽象蓝图创建的面积房子
//   4. 概念概述: 它在JavaScript中的工作方式略有不同. 理解仍然很重要！👍
//  */

// /* 面对对象编程的 4 条基本原则(有图)
//   抽象 封装 继承 多态性
//   “我们实际上如何设计课程？我们如何将真实世界的数据建模成类？” 😎

//   1. 抽象
//     忽略或隐藏无关紧要的细节, 让我们对正在实现的事物有一个概览, 而不是与对我们的实现无关紧要的细节混为一谈
//   2. 封装
//     不能从Class外面访问, 仍然可以从课堂内部访问！
//     同样, 实际上不是JavaScript语法(private 关键字不存在)
//     为什么？
//     防止外部代码意外操作内部属性/状态
//     允许在不破坏外部代码的情况下更改内部实现
//     总结：
//     封装：在类内部保持属性和方法私有, 因此它们不能从类外部访问. 一些方法可以作为公共接口(API)公开.
//   3. 继承
//     自己的方法和属性
//     总结：
//     继承：使某个类的所有属性和方法可用到子类, 形成类之间的层次关系, 这使我们能够重用逻辑并对现实世界的关系进行建模.
//   4. 动态化
//     自己的登录方式, 覆盖登录方式继承自用户
//     总结：
//     多态性：子类可以覆盖它从父类继承的方法[它更复杂, 但足以满足我们的目的].
// */

// /******************** JavaScript中的面对对象编程 */
// /* JavaScript中的OOP：原型
//   1. 经典 OOP ：Classes
//     对象(实例)是从类实例化, 其功能类似于蓝图
//     行为(方法)从类复制到所有实例
//   2. JS 中的 OOP：原型
//     包含方法 -> 原型继承/代表团 -> 可以访问的方法
//     对象链接到原型对象;
//     原型继承：原型包含所有链接到该原型的对象都可以访问的方法(行为)
//     行为委托给链接原型对象
//   3. 例子：数组
//     Array-prototype是我们在JavaScript中创建的所有数组对象的原型, 因此, 所有数组都可以访问 map 方法！(因为map方法存在于Array的原型属性中)
// */
// /* 在JavaScript中实现原型继承的 3 种方法
//   我们实际上如何创建原型？我们如何将对象链接到原型？我们如何在没有类的情况下创建新对象？
//   1. 构造函数
//     从函数创建对象的技术
//     这就是数组、映射或集合(Array、Map、Set)等内置对象的实际实现方式
//   2. ES6 Classes
//     构造函数语法的现代替代品;
//     "语法糖"：在幕后, ES6类的工作方式与构造函数完全一样 ES6类的行为不像“经典 OOP” 中的类
//   3. object.create()
//     将对象链接到原型对象的最简单、最直接的方法
// */
// ///////////// Start /////////////
// /******************** 构造函数和新的运算符 */
// // 回调函数没有this关键字
// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//   // Nerver to this (永远不要使用)
//   // 这个方法会指向所有实例, 会造成性能问题
//   this.calcAge = function () {
//     console.log(2037 - this.birthYear);
//   };
// };
// const jonas = new Person('Jonas', 1991);
// console.log(jonas); // Person实例

// /******************** 原型 */
// /* prototype与_proto的关系
//   1. prototype 是函数(function)的一个属性, 它指向函数的原型.
//   2. __proto__是对象的内部属性, 它指向构造器的原型, 对象依赖它进行原型链查询.
//   总结：
//   由上, prototype 只有函数才有, 其他(非函数)对象不具有该属性. 而 __proto__ 是对象的内部属性, 任何对象都拥有该属性.
// */

// const matilda = new Person('Matila', 2017);
// const jack = new Person('jack', 1975);
// console.log(matilda, jack);

// // instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上
// console.log(jonas instanceof Person); // true

// // 创建原型方法
// // 通过原型链继承的方式调用方法, 提升性能(实列本身没有此方法！)
// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// jonas.calcAge();
// matilda.calcAge();

// console.log(Person.prototype); // 原型属性
// console.log(jonas.__proto__); // 原型
// // 实列本身的原型 === 对象原型属性, 因此通过继承性, 我们可以使用 calcAge()方法
// console.log(Person.prototype === jonas.__proto__); // true

// // isPrototypeOf() 方法用于测试一个对象是否存在于另一个对象的原型链上
// console.log(Person.prototype.isPrototypeOf(jonas)); // true
// console.log(Person.prototype.isPrototypeOf(matilda)); // true
// console.log(Person.prototype.isPrototypeOf(Person)); // false

// // 创建原型属性
// Person.prototype.species = 'Homo Sapiens';
// console.log(jonas.species, matilda.species);

// // hasOwnProperty() 方法会返回一个布尔值, 指示对象自身属性中是否具有指定的属性(也就是，是否有指定的键)
// console.log(jonas.hasOwnProperty('firstName')); // true
// console.log(jonas.hasOwnProperty('species')); // false
// console.log(Person.prototype.hasOwnProperty('species')); // true

// /******************** 原型继承和原型链 */
// /*  原型继承/委托的工作原理(有图)
//     新的运营商(The new operator)
//     1. 创建了一个空对象
//     2. 构造函数调用中的 this 关键字设置为新对象
//     3. 新对象被链接（__proto__ 属性）到构造函数的prototype 属性
//     4. 新对象从构造函数调用返回
//     Prototype [Person.prototype]不是Person, 而是Person创建的对象
//     Object[jonas] __proto__: Person.prototype 总是指向一个对象的原型
//     如果就是函数构造函数和ES6类的工作方式
//     为什么构造函数Person可以是对象？
//     prototype是构造函数的属性, 而函数本身又是对象, 简单的来说一切皆为对象
// */
// /*  原型链(有图)
//     [Person.prototype] 这是一个对象本身！ 请记住，JavaScript 中的每个对象都有一个原型！

//     对象之间的一系列链接，通过原型链接(类似于作用域链)

//     对象的内置构造函数。当我们编写对象字面量时使用：{...} === new Object(...)

//     什么是字面量？
//     1. 示例：var test="hello world!"; "hello world!"就是字符串字面量，test是变量名

//     const { valueOf } = new Object().__proto__;
//     // console.log(valueOf); // [native code]
// */

// /******************** 内置对象的原型继承 */
// console.log(jonas.__proto__.__proto__);
// console.log(jonas.__proto__.__proto__.__proto__); // null
// console.dir(Person.prototype.constructor);

// // 数组原型、原型链和对象是一样的机制
// const arr = [3, 6, 6, 5, 6, 9, 9];
// console.log(arr);
// console.log(arr.__proto__);
// console.log(Array.prototype);
// console.log(arr.__proto__ === Array.prototype);

// // 数组原型案例(请勿使用!)
// // 1. 更新的JavaScript版本可能会添加一个同名的方法, 这可能会破坏你的代码
// // 2. 在开发团队中, 如果多个开发人员实现相同方法, 用不同的名字, 那么只会产生很多错误, 不值得这样做
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };
// console.log(arr.unique());

// // 查看元素原型
// const h1 = document.querySelector('h1');
// // HTMLHeadingElement -> HTMLElement -> Element -> Node -> EventTarget
// console.dir(h1.__proto__.__proto__.__proto__.__proto__.__proto__);
// // 函数本身也是一个对象
// console.dir(x => x + 1);
// ///////////// End /////////////

// /******************** 编码挑战1 */
// /*
// 1. 使用构造函数来实现Car, 汽车有品牌和速度属性, speed 属性是汽车的当前速度, 单位为km/h;
// 2.实现一个'accelerate'方法, 将汽车的速度提高10, 并将新的速度记录到控制台;
// 3.实现“刹车”方法, 将汽车速度降低5, 并将新速度记录到控制台;
// 4. 创建 2 个汽车对象并尝试对每个对象多次调用 'accelerate' 和 'brake'.

// DATA CAR 1：“BMW” 以120公里/小时的速度行驶
// DATA CAR 2：“Mercedes” 以 95 公里/小时的速度行驶

// 祝你好运😀
// */

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
// };

// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);

// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// bmw.accelerate();

// /******************** ES6 Classes */
// /* 概念
//     1. 实现带有构造函数的原型继承, 然后手动设置方法, ES6 Classes允许我们做完全相同的事情, 但使用更现代的语法
//     2. 使用这个语法, 我们不必手动弄乱原型属性, 在内部编写方法, 将自动添加到类的原型属性中, 我们也可以在类中使用手动设置方法
//     3. 方法之间不需要添加逗号
//     4. 静态方法不能被实例化
// */
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
//   // instance methods 实例方法
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hey ${this.fullName}`);
//   }
//   // 原型与实例都会添加一个age属性
//   get age() {
//     return 2037 - this.birthYear;
//   }

//   // 设置一个已经存在的属性
//   // 当我们传入jessica实例fullName的属性值时, jessica.fullName = name = 'Jessica Davis'
//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name!`);
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   // Static method(静态方法)
//   static hey() {
//     console.log('Hey there 👋');
//     console.log(this);
//   }
// }
// console.log(PersonCl.prototype);
// const jessica = new PersonCl('Jessica Davis', 1996);
// console.log(jessica);
// /*
//   PersonCl {_fullName: "Jessica Davis", birthYear: 1996}
//     birthYear: 1996
//     _fullName: "Jessica Davis"
//     age: 41
//     fullName: "Jessica Davis"
//     __proto__: Object
// */
// console.log(jessica.__proto__ === PersonCl.prototype); // true

// // 调用方法
// jessica.calcAge();
// jessica.greet();

// // 调用静态方法
// const walter = new PersonCl('Walter White', 1965);
// // walter.hey(); // walter.hey is not a function

// /* Class的原则
//   1. 类是不会被提升的
//   2. 类是一等公民
//   3. 类在严格的逻辑下执行
// */

// /******************** Setters and Getters */
// /* 重点
//   1. 在JavaScript中如果试着改变一个属性的值, 那么对应的setter和getter连用以创建一个伪属性. 不可能在具有真实值的属性上同时拥有一个setter器(也就是需要返回一个伪属性, 在内部属性的名称前加一个_下划线)
// */
// const account = {
//   owner: 'Jonas',
//   movements: [200, 530, 120, 300],

//   // 将数组最后一位提取出来
//   get latest() {
//     return this.movements.slice(-1).pop();
//   },

//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };

// console.log(account);
// account.latest = 50;
// console.log(account.movements);

// /******************** 静态方法 static methods */
// /*
//   1. 数组原型中有from方法, 我们可以用来返回nodeList对吧
//   2. 但是我们不能在[1, 2, 3]上面使用from方法, 因为from是一个静态方法, 只能用于Array原型的构造函数中
//   3. from不是一个函数, 这是因为这里的方法真正依附于整个构造函数, 所以是数组构造函数而不是构造函数的原型属性, 因此所有的数组都不会继承这个方法, 因为from方法不在对象实列的原型上, 它只是简单地附加到构造函数本身.
//   4. 所以Array.from这里基本上只是一个简单的函数, 但它是一个附加到Array构造函数的函数. 原因很简单, 以便开发人员知道它与Arrays有关, 我们也说from方法在Array命名空间中.
// */
// Array.from(document.querySelector('h1')); // []
// Array.from(document.querySelectorAll('h1')); // [h1]

// // [1, 2, 3].from(); // [1,2,3].from is not a function at

// // Number.parseFloat(12); // 12

// /******************** 对象创建Object.create */
// /*
//   1. 使用原型继承或委托, 使用Object.create, 仍然有原型继承的想法, 但是, 不涉及原型属性.
//   2. 没有构造函数, 也没有new运算符, 因此我们可以使用Object.create基本上手动设置对象的原型, 到我们想要的任何其他对象
//   3. 如果我们可以将原型设置为任何对象, 让我们实际创建一个对象成为所有Person对象的原型
// */
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
// steven.init('Steven', 2002);
// steven.calcAge();
// console.log(steven);
// console.log(PersonProto);
// console.log(steven.__photo__ === PersonProto.prototype); // true

// /******************** 编码挑战2 */
// /**
//   1. 重新创建挑战 1，但这次使用 ES6 类；
//   2. 添加一个名为“speedUS”的 getter，它以 mi/h 为单位返回当前速度（除以 1.6）；
//   3. 添加一个名为“speedUS”的设置器，它以 mi/h 为单位设置当前速度（但在存储值之前将其转换为 km/h，通过将输入乘以 1.6）；
//   4. 创造一辆新车并试验加速和制动方法，以及吸气剂和二传手。

//   数据车 1：“福特”以 120 公里/小时的速度行驶
// */

// class CarCl {
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

//   // 根据正常速度返回美国速度speedUS
//   get speedUS() {
//     return this.speed / 1.6;
//   }

//   // 根据美国速度替换到内部正常速度speed
//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// const ford = new CarCl('Ford', 120);
// console.log(ford.speedUS);
// ford.accelerate();
// ford.accelerate();
// ford.brake();
// ford.speedUS = 50;
// console.log(ford);

// /******************** “类”之间的继承：构造函数 */
// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// console.log(Person.prototype);

// const Student = function (firstName, birthYear, course) {
//   /*
//   // 一直重复代码
//   this.firstName = firstName;
//   this.birthYear = birthYear;
//   // 直接调用Person构造函数(报错！)
//   Person(firstName, birthYear);
//   */
//   // 使用call方法指定this关键字对象(正确选择 ✔)
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// };

// console.log(Student.prototype);
// /*
//   1. 许多人会认为这样做更合乎逻辑, 但事实上, 这根本行不通, 因为, 如果我们做Student.prototype === Person.prototype, 那么我们最终不会得到我们需要的原型链, 相反, 我们最终会获得完全错误的原型链
//   2. 因为我们实际上是说Student.prototype和Person.prototype应该是完全相同的对象. 事实上, 这并不是我们想要的, 我们想要的是(Person.prototype === Student.prototype.__proto__), 所以我们想继承它, 但它不应该是完全相同的对象. 这就是为什么我们实际上需要使用object.create
// */
// // Student.prototype.__proto__ === Person.prototype
// Student.prototype = Object.create(Person.prototype);

// Student.prototype.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };

// const mike = new Student('Mike', 2020, 'Computer Science');
// mike.introduce();
// mike.calcAge();
// console.log(mike);
// console.log(Student.prototype);

// console.dir(Student.prototype.constructor);
// // 因为我们是学生的原型

// /******************** 编码挑战2 */
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };
// EV.prototype = Object.create(Car.prototype);
// EV.prototype.constructor = EV;
// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };

// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge--;
//   console.log(
//     `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`
//   );
// };

// const tesla = new EV('Tesla', 120, 23);
// tesla.chargeBattery(90);
// tesla.brake();
// tesla.accelerate();
// console.log(tesla);

// /******************** “类”之间的继承：ES6类 */
// /*
//   1. Class继承了原型后, 如果子类没有添加任何内部属性, 那么可以不需要编写构造函数
//   2. super()用于继承类中的构造函数, 相当于使用call方法
//   3. 类和object.create继承的区别是, extends继承原型不会将构造函数指向继承原型对象, object.create会将构造函数指向继承原型对象
// */
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
//   // 将判断后的_fullName伪属性传递给fullName内部属性, 如果是全名将输出全名, 如果不是将返回undefined
//   get fullName() {
//     return this._fullName;
//   }

//   static hey() {
//     console.log('Hey there 👏');
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
// /******************** 银行应用程序类实例 */
// class Account {
//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     this.pin = pin;
//     this.movements = [];
//     this.locale = navigator.language;

//     console.log(`Thanks for opening an account, ${this.owner}`);
//   }
//   // 存款
//   deposit(val) {
//     this.movements.push(val);
//   }
//   // 支出
//   withdraw(val) {
//     this.movements.push(-val);
//   }
//   // 批准贷款
//   approveLoan(val) {
//     return true;
//   }
//   // 请求贷款
//   requestLoan(val) {
//     if (this.approveLoan(val)) {
//       this.deposit(val);
//       console.log(`Loan approved`);
//     }
//   }
// }
// // 请尽量不要使用属性进行交互, 创建方法要好的多
// // acc1.movements.push(250);
// // acc1.movements.push(-250);

// const acc1 = new Account('Jonas', 'EUR', 1111);
// acc1.deposit(250);
// acc1.deposit(140);

// acc1.requestLoan(1000);
// // 我们应该禁止访问此方法
// // acc1.approveLoan(1000);
// console.log(acc1);

/******************** 封装：受保护的属性和方法 */
/* 面向对象特征之封装-Es6中Class私有和受保护的属性及方法
  1. 公共字段 私有字段 公共方法 私有方法
  2. 公共的：随处都可访问, 它们包含外部接口, 我们在开发中一直常用的也就是公共的属性和方法了
  3. 私有的: 仅在类的内部可访问, 主要用于内部接口
  总结：
  1. 面向对象编程最重要的原则之一, 从外部接口划分内部接口, 这就涉及到属性和方法的可访问范围度
  2. 在面对对象编程中, 可通过private(私人的)、protected(受保护的)、public(公共的)来对类的属性和方法进行限制, 例如你从你父亲哪里继承了一些属性, 但你父亲其他属性不想你被继承等
  3. 在JavaScript中，受保护的属性和方法名以_开头, 私有的属性和方法名以#开头
  4. 面对对象编程的一个较大的好处之一是我们不必理解其内部实现, 依然可以很好地去进行编程开发, 例如：一个U盘, 我们想要将电脑中的某些文件拷贝到那里进行存储, 这时候我们并不关心U盘内部是这样形成的, 我们只知道通过usb口插入即可完成拷贝的工作
*/

class Account {
  // 公共字段是一个实例属性, 它只是使用字段定义而不是通过赋值创建的, 除了它们的创建方式之外, 它们完全相同
  locale = navigator.language;
  // 私有字段不是属性, 因此构造函数使用私有字段时, 外部必须有一个私有字段(this关键字赋值是私有字段会报错)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    console.log(`Thanks for opening an account, ${owner}`);
  }

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
    // if (this.#_approveLoan(val)) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
      return this;
    }
  }

  static helper() {
    console.log('Helper');
  }

  // 私有方法()
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
// Accoacc1unt.helper();

// 未捕获的语法错误：必须在封闭类中声明私有字段“#pin”
// console.log(acc1.#pin);

/******************** 链接方法(同上) */
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());
console.log(acc1);

/******************** 类总结 */
/* 公共字段和实例属性的区别 
  ///// 课内资源
  1. 我们有一个实例属性, 因此就像公共字段一样, 该属性可用于每个创建的对象
  2. 实例属性和公共字段区别在于我们构造函数是输入数据来设置实例属性的, 所以基本上这些属性对于每个对象都是更加个性化和独特, 而字段通常用于所有对象公有的东西(公共, 私有 区域)
  3. 私人领域对每个学生来说应该是独一无二的, 所以我们创建了没有任何价值的私有字段, 然后这里我们只是将它重新定义为进入构造函数的值 
  ///// 课外资源
  1. 公共字段是一个实例属性, 它只是使用字段定义而不是通过赋值创建的, 除了它们的创建方式之外, 它们完全相同, 使用术语“字段”, 因此它可以涵盖公共和私有(因为私有字段不是属性)
  2. 属性公开字段, 字段(几乎总是)因该对类保持私有, 并可以通过get和set属性对其进行访问。属性提供了一个抽象级别, 允许您更改字段, 而又不影响使用类的事物访问字段的外部方法
*/
/*封装和接口
  1. 正如我们已经知道的, 这是一个普通的公共方法, 在这里, 我们引用了一个私有字段和一个私有方法, 关于私有方法, 这就是它们的样子(#运行于谷歌浏览器较新的版本)
*/
/* getter和setter方法
  1. getter方法基本上是为了让我们可以通过简单地编写属性而不是编写方法来从对象中获取值.
  2. 简单的编写student.testScore, 然后运行getter和setter方法, 因此在这种情况下应该使用一种约定, 在同名的getter中, 您还需要返回该新属性
*/
/* setter和getter的区别
(自动创建一个Number()对象，然后把”number“赋给对象的name属性，但是这条语句执行完之后马上就销毁，所以并不能继续访问或者操作a.name)
  1. set可以直接修改变量, 有且仅有一个参数, 参数就是你外部修改时传进来的值, 他被放在一个临时变量里存储, 这个临时变量一般不会暴露在外部中, 只要当你的这个值发生改变, 他就会自动调用set中的函数，所以可以在set中写入函数方便我们使用，如果一个对象中写入了set方法，那么这个值就只写属性, 无法获取
  2. get可以直接获取这个变量值, 从临时变量中取出这个值, get方法不允许写入任何参数. 如果一个对象中仅有get方法时, 那么这个属性就相当于一个(只读属性)
  3. set和get的主要缺点就是当使用一个数组或者对象来作为临时变量时, 当数组和对象中的内容改变但是引用地址没有发生改变时, set不会执行, set认为你这个引用地址没有变化，所以即使你内容变化了也无法触发set函数, 此时只能外部定义一个新数组或者对象每次传进来修改这个变量的引用地址才可以执行set
*/
/* 静态方法
  1. 编写静态方法的方式并且静态方法仅在类上可用. 所以它不能访问实例属性和方法, 但只有静态的.
  2. 我们在顶部定义的静态公共字段当然可以在静态方法中访问. 通常我们使用这些静态方法作为类的辅助方法,
  3. 使用new运算符创建新对象的方式, 实例访问原型中的静态方法时, 回返回undefined

*/
/* ES6 Class总结：
  1. extends关键字会自动为我们建立原型链, 我们不需要手动做任何事情
  2. 公共字段与我们在构造函数中定义的属性非常相似, 因此它在每个创建的对象上都可用
  3. 我们也有私有字段, 它们与公共字段几乎相同, 但它们不能在类之外访问
  4. 静态公共字段, 这些字段或类似的属性仅在课堂上可用
  5. 构造函数方法, 由new操作符自动调用, 每当我们创建类的新实例时, 基本是创建一个新的对象
  6. 这个构造方法在任何常规类中都是强制性的, 但如果我们希望它具有完全相同的参数名称, 则可以在子类中省略它
  7. 在构造函数内部调用父类, 这就是超类, super() ===ParentElement.call(this, xxx,xxx);
  8. 当然只有在编写子类时才需要, 当我们使用extend关键字时, 请记住, 这需要我们访问构造函数中的disc关键字之前发生.
*/

class Person {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
}

class Student extends Person {
  university = 'University of Lishon';

  // 学习时间
  #studyHours = 0;
  // 课程
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

  // 学习时间
  study(h) {
    this.#makeCoffe();
    this.#studyHours += h;
  }
  // 咖啡
  #makeCoffe() {
    return this._testScore;
  }

  // 测试分数
  set testScore(score) {
    this._testScore = score <= 20 ? score : 0;
  }

  // 印刷课程
  static printCurriculum() {
    console.log(`There are ${this.numSubjects} subjects`);
  }
}

const student = new Student('Jonas', 2020, 2037, 'Medicine');
student.study(3);
student.testScore = 25;

Student.printCurriculum();
console.log(student);

/******************** 编码挑战4 */
/*
  1. 重新创建挑战 #3，但这次使用 ES6 类：创建“CarCl”类的“EVCl”子类
  2. 将“收费”财产设为私有；
  3. 实现链接此类的“accelerate”和“chargeBattery”方法的能力，并更新“CarCl”类中的“brake”方法。 他们尝试用chining！

  数据车 1：“Rivian”以 120 公里/小时的速度行驶，充电 23%

  祝你好运😀
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
  // 收费
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  // 充电电池(充电至)
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
rivian.speedUS = 150;
console.log(rivian.speed);
console.log(rivian.speedUS);

rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery()
  .accelerate();

/* js函数中声明提升与变量提升
  js在编译阶段, 函数声明和变量声明都会被先处理置于执行环境的顶部, 且赋值会被留在原地, 这个过程称之为提升
  // 源代码
  console.log(i);
    var i = 1;
  function fn () {
    console.log(2);
  }
  // 提升后
  function fn () {
    console.log(2);
  }
  var i;
  console.log(i);
  i = 1;

  1. 变量提升 (变量声明在编译阶段被处理，而变量赋值则留在原地等待执行)
  // 源代码
  console.log(i) // undefined;
  var i = 1;
  console.log(i); // 1
  // 提升后
  var i;
  console.log(i);
  i = 1;
  console.log(i);

  测试题：
  // 源代码
  var age = 10;
  function person () {
      age = 100;
      console.log(age);  // 100
      var age;
      console.log(age)  // 100
  }
  person();
  console.log(age);   // 10
  // 提升后
  function person () {
    var age;
    age = 100;
    console.log(age); // 100
    console.log(age); // 100
  }
  var age;
  age = 10;
  person();
  console.log(age);

  2. 函数提升
  解析器在解析时对函数声明与函数表达式有着不同的优先级, 实际上编译阶段函数声明被提升, 并使其在执行任何代码之前可访问, 函数表达式实际上时变量声明的一种, 因此函数声明提升优于函数表达式
  // 源代码
  console.log(fn(1));
  var fn = function (a) {
    return a;
  }
  // 提升后
  var fn;
  console.log(fn(1));
  fn = function (a) {
    return a;
  }
  // fn is not a function
  上面例子之所以报错, 是因为变量fn声明后还未对函数引用
  另外函数提升不会被变量声明覆盖, 但会被变量赋值覆盖
  function fn() {
    console.log(1);
  }
  var fn;
  console.log(fn); // 由于后一个fn只声明未赋值, 因此输出的是函数fn

  源代码
  function fn() {
    console.log(1);
  }
  var fn = function () {
    console.log(2);
  }
  fn(); // 2
  // 提升后
  function fn() {
    console.log(1);
  }
  var fn;
  fn = function() {
    console.log(2);
  }
  fn(); // 2
  // 源代码
  fn();
  var fn = function() {
    console.log(1);
  }
  fn();
  function fn () {
    console.log(2);
  }
  var fn
  fn();
  // 提升后
  function fn () {
    console.log(2);
  }
  var fn;
  var fn;
  fn();
  fn = function() {
    console.log(1);
  }
  fn();
  fn();
  // 2 1 1
*/
