'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
/******* 异步JavaScript */
/*
  0. 异步JavaScript的目标, 基本上是处理长时间运行的任务, 基本上在后台运行
  1. 以及异步JavaScript最常见的用例, 是从远程服务器获取数据, 在所谓的AJAX调用中
  2. Promises fetch async await和错误处理
*/

/** 异步 JavaScript、AJAX 和 API */

/*
 ////////// 图1
  1. 后台运行的任务完成后执行异步代码
  2. 异步代码是非阻塞的
  3. 执行不等待异步任务完成其工作 -- 重点
  4. 单独的回调函数不会使代码异步(回调不会自动使代码异步)

  5. 在一段时间内协调程序的行为

  ///////// 图2 (异步代码)
  1. 后台运行的任务完成后执行异步代码
  2. 异步代码是非阻塞的
  3. 执行不等待异步任务完成其工作 -- 重点
  4. 单独的回调函数不会使代码异步

  5. 回调函数在图片加载后执行
  6. addeventListener 不会自动使代码异步

  ///////// 图3 (异步代码)
  async JavaScript 和 xml：允许我们以异步方式与远程 Web 服务器通信. 通过ajax调用，我们可以动态地从Web服务器请求数据

  ///////// 图4
  1. 应用程序接口：一个软件，可以被另一个软件使用，以允许应用程序相互交谈
  2. Web开发中有很多类型的api(DOM API Geolocation API Own Class API "Online"API)
  3. online api：在服务器上运行的应用程序，它接收数据请求，并将数据作为响应发回
  4. 我们可以构建自己的 web apis（需要后端开发，例如使用 node.js）或使用 3rd-party APIs

  // 天气 国家 航班 货币转换 用于发送电子邮件或短信的 API 谷歌地图等

  */

/************** 异步JavaScript、AJAX 和 API */
alert('Please Clicked!');
console.log('loading');
setTimeout(function () {
  console.log('Wating 5s');
}, 5000);

// https://restcountries.com/v2/
/** 我们的第一个 AJAX 调用：XMLHttpRequest */
const getCountryDate = function (country) {
  // 1. XML HTTP请求函数
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    // responseText 响应文本
    // console.log(this.responseText);

    // 转换到一个实际的JavaScript对象，因为我们现在拥有的是JSON
    // JSON基本上是一大串文本, 我们需要做的就是转换它
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
    <article class="country">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${
          data.languages[0].currencies
        }</p>
      </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryDate('portugal');
getCountryDate('usa');

// 其原因基本上是 数据到达的时间略有不同, 每次我们加载页面时. 所以事实上，这真的表明 行动中的非阻塞行为. 所以当我们在葡萄牙调用 getCountryData 时, 第一次，它发送这个请求, 然后 JavaScript 立即在代码中移动. 所以它就在这里到下一行. 当然，这会触发另一个 AJAX 调用 就在葡萄牙的数据之前 其实已经到了。

// 再一次，我们将有两个 AJAX 调用 同时发生. 所以无论谁先到, 然后将首先触发加载事件. 所以如果第一个是 AJAX 呼叫美国, 那么第一个元素 当然会在这里打印 是来自美国的那个. 只有在此之后葡萄牙的数据才会到来. 然后这个回调函数在这里 用葡萄牙的数据调用. 当然，同样如此 不管其他要求如何，我们都会在这里开火. 让我们在这里说德国。

// 所以现在，我们实际上以相同的顺序获得了数据。但现在它实际上完全不同了。这证实了我之前解释的内容。现在，如果我们真的想要提出这些请求以特定的方式，比如预定义的顺序，那么我们基本上必须链接请求。这意味着提出第二个请求只有在第一个请求完成后。

/**[可选] Web 的工作原理：请求和响应 */
// 请求和响应如何在web上工作, 网络在幕后的实际运作方式

// 1. 每当我们尝试访问web服务器时, 浏览器，也就是客户端，向服务器发送请求，然后服务器将发回响应，并且该响应包含数据，或我们请求的网页

// 2. 没错，这个过程的工作方式完全相同 无论我们是否访问整个网页 或者只是来自 Web API 的一些数据. 而这整个过程其实有个名字 它被称为请求-响应模型 或者也是客户端 - 服务器架构。
// 3. 但无论如何，现在让我们更深入地研究一下. 所以让我们使用 URL 的例子 我们在上一个视频中实际访问的 获取我们国家的数据。
// 4. 现在，每个 URL 都有一个 HTTP 或 HTTPS, 这是为了协议 将用于此连接. 我们稍后会在视频中讨论这个问题. 然后我们有了域名, 在这种情况下是restcountries.eu。
// 5. 并且在斜线之后我们必须到所谓的资源 我们想要访问的. 在这种情况下，就是 /rest/V2 等等. 现在这个域名，restcountries.eu 实际上不是真实地址 我们尝试访问的服务器. 这真的只是一个好听的名字 这对我们来说很容易记住。但这意味着我们需要一种方式一种转换域名到服务器的真实地址。
// 6. 这通过所谓的 D-N-S 发生. 所以DNS代表域名服务器 域名服务器是一种特殊的服务器. 所以它们基本上就像互联网的电话簿. 所以当我们访问任何 Web 服务器时发生的第一步 是浏览器向 DNS 发出请求 然后这个特殊的服务器将 只需匹配网址 的URL到服务器的真实IP地址，好吧. 而实际上这一切都发生了 通过您的互联网服务提供商, 但完整的细节在这里并不重要. 您需要从第一部分中保留什么 是域不是真实地址 并且 DNS 将转换域 到真实IP地址。

/** 欢迎回到回调地狱 callback hell */
/*
  1. 当我们异步调用数据, 调用内容顺序会不同, 因为异步javaScript是不堵塞的, 第二个异步调用可能会提前完成
  2. 回调地狱 是当我们有很多嵌套回调时 以便按顺序执行异步任务
  3. 回调地狱的方式让我们的代码看起来很多, 难以维护
  4. ES6之后, 实际上有一种逃避回调地狱的方法, 通过使用一种叫做承诺的东西
*/

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.languages[0].currencies}</p>
    </div>
  </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    // AJAX render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;
    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      // alpha代表我们寻找国家代码, 所以国家代码是唯一的, 它们总是只能是一种结果
      // 回调地狱, 让我们的嵌套回调函数按照顺序执行
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('portugal');

// 所以在这里我们可能应该得到墨西哥或加拿大。确实，它就在这里。第二次 AJAX 调用是不可能的 没有第一个. 因为否则，我们怎么知道 第二个国家必须是加拿大吗？ 所以，再一次，我们在这里有一个 AJAX 调用 这取决于另一个. 所以我们这里有一个回调函数 在另一个里面. 所以你在这里看到，我们附加了第一个回调函数. 然后在里面，我们还有另一个. 所以换句话说，在这里，我们有嵌套的回调. 但是现在想象一下我们想要 依次执行更多请求, 像邻居的邻居的邻居, 并喜欢 10 倍以上. 所以在那种情况下，我们最终会 在回调中的回调中使用回调, 像10次. 实际上，对于这种结构. 对于这种行为，我们有一个特殊的名字. 这个特殊的名字是回调地狱. 所以基本上，回调地狱 是当我们有很多嵌套回调时 以便按顺序执行异步任务. 事实上，所有异步任务都会发生这种情况, 由回调处理. 而不仅仅是 AJAX 调用。

/** Promises 和 Fetch API 
    1. 所以我们不要替换旧的 XML HTTP 请求函数 以现代方式进行 AJAX 调用. 那是通过使用 Fetch API。
    2. Fetch API 发出简单的get请求, 真正需要的只是传入URL, 对于更复杂的AJAX调用, fetch函数可以向对象一样接收选项
*/

//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();
// const request = fetch('https://restcountries.com/v2/name/portugal');
// console.log(request); // Promises Response 回复

////////////// 图1
// Promise：用作异步操作的未来结果的占位符的对象。
// Promise：异步传递值的容器。
// 承诺：未来价值的容器。(示例：来自 AJAX 调用的响应)

// Promise是ES6的新特性, 它最大的优势是什么？
// 我们不再需要依赖传递给异步函数的事件和回调来处理异步结果；
// 代替嵌套回调，我们可以将 promise 链接到一个 异步操作序列：转义回调地狱岁

// 答应我如果我猜对了结果就收钱
// 我现在买彩票（承诺）
// 抽奖是异步发生的
// 如果结果正确，我会收到钱，因为这是承诺的

////////////// 图2
// 由于Promise可用于异步操作, 他们对时间很敏感. 它们会随着时间而改变，所以承诺可以处于不同的状态，这就是他们说的承诺周期，

// 所以一开始, 我们说承诺是未决的. 所以这是在任何由异步任务可用. 现在，在这段时间里, 异步任务仍在做它的工作在后台. 可然后当任务最终完成时, 我们说承诺已经解决了 是两种不同类型的已解决承诺和那是兑现的承诺和拒绝的承诺. 所以一个实现的承诺是一个承诺 成功地产生了我们期望的值. 例如，当我们使用promise来获取数据时 来自 API, 一个兑现的承诺成功地摧毁了这些数据,

// 现在以使用了. 另一方面, 被拒绝的承诺意味着 异步任务期间出现错误. 以及从 API 获取数据的示例, 一个错误是例如, 当用户离线且无法连接时 到 API 服务器. 现在回到我们的彩票类比, 抽奖基本上是异步任务, 这决定了结果. 然后一旦结果可用, 票会被结算. 那么如果我们猜对了结果, 彩票将兑现 我们得到我们的钱. 然而，如果我们猜错了, 然后票基本上被拒绝了. 而我们所做的只是浪费我们的钱. 现在这些不同的状态 理解这一点非常重要，因为 当我们在代码中使用 promise 时, 我们将能够处理这些不同的状态 结果做某事 成功的承诺或拒绝的承诺。

// 关于promises的另一个重要的事情是一个承诺只解决一次. 所以从那里开始， 国家将永远保持不变. 所以承诺要么被实现，要么被拒绝， 但改变这种状态是不可能的. 现在，我在这里向你展示的这些不同的状态 当我们使用承诺时是相关且有用的 得到结果， 这被称为消费承诺. 所以我们消费了一个承诺 例如，当我们已经有一个承诺时， 被退回的承诺 从 fetch 函数， 就在这个视频的开头，记住. 但是为了让承诺首先存在， 
它必须首先被建造. 所以必须在fetch API的情况下创建， 它是构建承诺的 fetch 函数 并返回给我们消费. 所以在这种情况下， 我们不必自己建立承诺 为了消耗它. 现在，大多数时候我们实际上会 只消费承诺， 这也是更容易和更有用的部分. 这就是我们要做的 在接下来的几个视频中. 但有时我们也需要建立一个承诺和 不只是消费它. 而且当然， 我们还将学习如何做 稍后。

/** 消费承诺
    1. 我们要访问body上面的数据时, 需要调用json.()方法
 */
const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) return;

      // Country 2
      // 因为无论我们从什么地方返回这里的这个承诺将成为实现的价值的承诺 --重点
      // 不要在return返回函数后面添加then方法，这样就重回回调炼狱的操作了(不推荐)
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);  
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'));
};
getCountryData('portugal');

// 简化版
// 我们需要在响应上调用 json 方法。 好的，所以 json 是一个可用的方法 在 fetch 方法的所有响应上。 所以我的意思是这个，所以响应点json。 再次，这里的json方法 是一种可用的方法 在所有即将到来的响应对象上 从 fetch 函数， 所以所有的解析值， 事实上，这里的这个响应实际上是一个已解决的值。 因此它确实有 附加到它的 json 方法。 现在，这里的问题是 这个json函数本身， 其实也是一个异步函数。 那么这意味着什么， 是它也会返回一个新的承诺。 这有点令人困惑 我真的不知道为什么它是这样实施的， 但这就是它的工作原理。
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => renderCountry(data[0]));
// };

/** 处理被拒绝的承诺
    1. .then() .catch() .finally() 三种方式
      a) .then(err => alert(err))
      b) .catch()在全球范围内处理错误
      c). finally方法无论承诺发生什么，都将始终被调用，无论承诺兑现还是被拒绝，我们定义的回调都会被调用
        (1) 加载微调器 就像你随处可见的这些旋转的圆圈 在 Web 应用程序中加载某些数据时。
        (2) 所以这些应用程序显示了一个微调器 当异步操作开始时 然后在操作完成后隐藏它。 
        (3) 无论如何，这都会发生 操作成功与否。 因此，最终方法是完美的。
    2. err是一个javaScript对象，我们可以使用构造函数在javaScript中创建错误，就像map和set

 */
// const renderCountry = function (data, className = '') {
//   const html = `
//             <article class="country ${className}">
//             <img class="country__img" src="${data.flag}" />
//             <div class="country__data">
//               <h3 class="country__name">${data.name}</h3>
//               <h4 class="country__region">${data.region}</h4>
//               <p class="country__row"><span>👫</span>${(
//                 +data.population / 1000000
//               ).toFixed(1)} people</p>
//               <p class="country__row"><span>🗣️</span>${
//                 data.languages[0].name
//               }</p>
//               <p class="country__row"><span>💰</span>${
//                 data.currencies[0].name
//               }</p>
//             </div>
//           </article>
//             `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   // countriesContainer.style.opacity = 1;
// };

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      console.log(response);
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) return;

      // Country 2
      // 因为无论我们从什么地方返回这里的这个承诺将成为实现的价值的承诺 --重点
      // 不要在return返回函数后面添加then方法，这样就重回回调炼狱的操作了(不推荐)
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 😁😁😁`);
      renderError(`Something went wrong 😁😁 ${err.message}. Try again!`);
    })
    .finally(() => {
      // 容器淡出是我们必要条件, 无论失败还是成功
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener('click', function () {
  getCountryData('portugals');
});

/**  手动抛出错误
  1. 检查堆栈追踪，没有反应真正的错误，这就是我们的API，真正的错误当然不是我们无法读取未定义的标志，404状态码
  2. fetch函数只拒绝当没有互联网连接时，像这样404的错误不是真正的错误，获取承诺任然会得到满足，所以没有拒绝，因此我们无法捕获程序中真正的错误
  3. fetch函数仍然没有拒绝，顺便说一下，很多人包括我自己认为在这种情况下，实际上应该立即拒绝承诺    
  4. 因为在这个回调函数中抛出一个错误 这个 then 方法将立即拒绝这个承诺。 然后那个被拒绝的承诺会传播下去 链，直到它最终在某个地方被抓住。 再次，在这种情况下，它就在这里 在这个 catch 处理程序中。---- 非常重要
    */

// const renderCountry = function (data, className = '') {
//   const html = `
//     <article class="country ${className}">
//       <img class="country__img" src="${data.flag}" />
//       <div class="country__data">
//         <h3 class="country__name">${data.name}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1000000
//         ).toFixed(1)} people</p>
//         <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//       </div>
//     </article>
//     `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
//   countriesContainer.style.opacity = 1;
// };
/////// 1.
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/names/${country}`)
    .then(response => {
      console.log(response);
      if (!response.ok)
        // 1. throw 关键字会立即终止当前功能，就像return一样，现在创造的效果，并在这些then方法中的任何一个中抛出错误，是承诺立即拒绝
        // 2. 所以在任何then处理程序中，将立即终止，然后处理程序并将向下传播，到这里的catch方法，然后在那里，处理那个错误，因此可以显示处理的那个错误
        // 3. 我们只是在创造我们自己的错误基本上是故意拒绝承诺，这样我们就可以处理链中的错误，所以在这个catch方法中
        throw new Error(`Country not found ${response.status}`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      // const neighbour = data[0].borders[0];
      const neighbour = 'dadsdad';

      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.come/v2/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json;
    })
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('sdasdasd');
});

/////// 2.
// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
//     return response.json();
//   });
// };

// const getCountryData = function (country) {
//   getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];
//       const neighbour = undefined;
//       // 当没有邻国时，抛出一个错误，用于catch方法中
//       // getJSON是检测web API数据是否正确
//       if (!neighbour) throw new Error('No neighbour found!');

//       // Country 2
//       return getJSON(
//         `https://restcountries.com/v2/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

// getCountryData('australia');

/*************  手动抛出错误
    1. 我们检查堆栈追踪，没有反应真正的错误，这就是我们的API，真正的错误当然不是 我们无法读取未定义的标志 但实际上是我们的API找不到任何国家。 这在此处通过状态代码 404 反映出来
    2. (fetch 承诺只拒绝当没有互联网连接时)， 但是像这样的 404 错误并不是真正的错误 但它有点是。 但无论如何，使用这个 404 获取承诺 仍然会得到满足。 所以没有拒绝，所以我们的捕获处理程序 无法解决此错误。 它确实发现了另一个错误，所以在这个错误中， 但这不是我们真正想要处理的
    3. 所以无论如何，这里的错误很奇怪 它并没有真正反映真正的错误 这就是我们的 API 找不到任何具有此名称的国家/地区。 所以真正的错误当然不是 我们无法读取未定义的标志 但实际上是我们的API找不到任何国家。 这在此处通过状态代码 404 反映出来。 
    4. 然而，正如我一开始所说的 fetch 承诺只拒绝 当没有互联网连接时， 但是像这样的 404 错误并不是真正的错误 但它有点是。 但无论如何，使用这个 404 获取承诺 仍然会得到满足。 所以没有拒绝，所以我们的捕获处理程序 无法解决此错误。 它确实发现了另一个错误，所以在这个错误中， 但这不是我们真正想要处理的。 在这种情况下，我们真的想告诉用户 没有发现有这个名字的国家。
    5. fetch函数仍然没有拒绝，顺便说一下，很多人包括我自己认为在这种情况下，实际上应该立即拒绝承诺


     6. 为什么我们还要费心去处理所有这些错误？这不就是一堆工作和浪费时间吗？嗯，首先，处理这些错误是唯一的方法我们实际上可以在其中显示这样的错误消息在用户的屏幕上，但更重要的是，这只是一种非常糟糕的做法留下这些被拒绝的承诺，闲逛而不处理它们。所以不要那样做，总是使用catch，如果有必要，你也可以使用finally，好吧。现在，再一次，如果有这个承诺没有错误吗？所以如果我们在这里没有问题，但是我们在第二次获取时遇到了问题。所以让我们说，我们不这样做，所以我们有一个合理的国家，当我们点击按钮时是葡萄牙，但是在这里，让我们说邻居不是这个人，但是这个国家代码，我确定它不存在。所以现在会有一个拒绝在这个承诺，对。所以我们在这里得到另一个错误。
*/

///////////////////////////////////////
// Coding Challenge #1

/* 编码挑战1
在这个挑战中，您将构建一个函数“whereAmI”，它仅根据 GPS 坐标呈现一个国家/地区。 为此，您将使用第二个 API 对坐标进行地理编码。

以下是您的任务：

PART 1
1. 创建一个函数“whereAmI”，它将纬度值 (lat) 和经度值 (lng) 作为输入（这些是 GPS 坐标，示例如下）。
2. 对提供的坐标进行“反向地理编码”。反向地理编码意味着将坐标转换为有意义的位置，例如城市和国家/地区名称。使用此 API 进行反向地理编码：https://geocode.xyz/api。
AJAX 调用将对具有以下格式的 URL 执行：https://geocode.xyz/52.508,13.381?geoit=json。使用 fetch API 和 promise 来获取数据。不要使用我们创建的 getJSON 函数，这是作弊 😉
3. 获得数据后，在控制台中查看它以查看您收到的有关所提供位置的所有属性。然后，使用这些数据，将这样的消息记录到控制台：“你在德国柏林”
4. 将 .catch 方法链接到 promise 链的末尾并将错误记录到控制台
5. 此 API 允许您每秒仅发出 3 个请求。如果您快速重新加载，您将收到代码 403 的此错误。这是请求的错误。请记住，在这种情况下， fetch() 不会拒绝承诺。因此，创建一个错误以拒绝承诺，并提供有意义的错误消息。

PART 2
6. 现在是时候使用接收到的数据来渲染一个国家了。 所以从地理编码 API 结果中取出相关属性，将其插入到我们一直在使用的国家/地区 API 中。
7.渲染国家并捕捉任何错误，就像我们在上一课中所做的一样（您甚至可以复制此代码，无需键入相同的代码）

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/
// 使用GPS就可以定位国家
// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(res => {
//       console.log(res);
//       if (!res.ok) throw new Error(`Problem with gecoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     // 捕获所有承诺拒绝
//     .catch(err => console.error(`${err.message} 💥`));
// };
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

/** 幕后异步：事件循环  
    1. “容器”，包括所有的碎片 执行 JavaScript 代码所必需的 
    2. “听到+”的运行时
*/

/** 实践中的事件循环 */
// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 5000);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000; i++) {
//     console.log(res);
//   }
// });
// console.log('Test end');

/** 构建一个简单的 Promise */
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happening 😀');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You win $$$');
    } else {
      reject(new Error('You lost your money!!!'));
    }
  }, 2000);
});

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
// 太好了，这就是我们封装的方式将任何异步行为转化为承诺。所以我们如何以一种非常好的方式抽象出来，就像我们在这里所做的一样。然后我们                      所要做的就是像这样消费那个承诺

// 同伙承诺的方式处理多个计数器回调函数
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('I waited for 1 seconds');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 3 seconds');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 4 seconds');
  });

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// // 静态方法立即返回承诺
// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject('abc').catch(x => console.error(x));

/** 承诺 Geolocation API */
// const renderCountry = function (data, className = '') {
//   const html = `
//     <article class="country ${className}">
//     <img class="country__img" src="${data.flag}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(
//         +data.population / 1000000
//       ).toFixed(1)} people</p>
//       <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//       <p class="country__row"><span>💰</span>${data.languages[0].currencies}</p>
//     </div>
//   </article>
//     `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// 导航器地理位置获取当前位置

navigator.geolocation.getCurrentPosition(
  position => console.log(position),
  err => console.error(err)
);

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => console.log(position),
    //   err => console.error(err)
    // );
    // 1. 导航器地理定位 (获取当前位置)
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      // 2. 根据纬度获取国家信息
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      console.log(res);
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      // 3.
      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);
      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message}`));
};

btn.addEventListener('click', whereAmI);

/* 
构建我刚刚在屏幕上向您展示的图像加载功能。

这次的任务不是超级描述性的，所以你可以自己弄清楚一些东西。假装你在自己工作😉

第1部分
1. 创建一个函数“createImage”，它接收 imgPath 作为输入。此函数返回一个创建新图像的承诺（使用 document.createElement('img')）并将 .src 属性设置为提供的图像路径。图像加载完成后，将其附加到具有“图像”类的 DOM 元素，并解析承诺。满足的值应该是图像元素本身。如果加载图像时出错（'error' 事件），则拒绝承诺。

如果这部分对您来说太棘手，请观看解决方案的第一部分。

第2部分
2. 使用 .then 接受 promise 并添加错误处理程序；
3. 图像加载完成后，使用我们之前创建的等待函数暂停执行 2 秒；
4. 2 秒过去后，隐藏当前图像（设置 display 为 'none'），并加载第二个图像（提示：使用 createImage 承诺返回的图像元素隐藏当前图像。您将需要一个全局变量 😉);
5.第二张图片加载完毕后，再次暂停执行2秒；
6. 2 秒过后，隐藏当前图像。

测试数据：img 文件夹中的图像。通过传递错误的图像路径来测试错误处理程序。在开发工具网络选项卡中将网络速度设置为“Fast 3G”，否则图像加载速度过快。

祝你好运😀
*/
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image not found'));
//     });
//   });
// };

// let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-22.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

/**  
    1. async是一种特殊的函数，这是一个同步功能
    2. 添加async后，函数是一个异步函数
    3. 在这之前我们可以通过回调地狱和then()方法消耗前提完成异步回调处理

    // await 关键字基本上等待这个前提结果，所以基本上await将在此停止解码执行函数的点，直到满足前提
    // 你可能认为并没有停止代码， 阻止执行？ 嗯，这是一个很好的问题， 但答案实际上是否定的，在这种情况下， 因为在同步函数中停止执行， 这就是我们这里所拥有的实际上不是问题，因为 此函数在后台异步运行。
    // 因此，它并没有阻止主要威胁执行。 所以它不会阻塞调用堆栈。事实上，那是， 一次等待有什么特别之处。 所以事实是它使我们的代码看起来像常规在幕后同步代码。一切实际上都是异步的。 好的。 但无论如何，只要这里的这个前提解决了， 那么我们拥有的整个 await 表达式的值 这里将是前提的解析值。 所以我们可以简单地将它存储到一个变量中。 所以我们称之为 res 为回应。
*/

// const renderCountry = function (data, className = '') {
//   const html = `
//             <article class="country ${className}">
//             <img class="country__img" src="${data.flag}" />
//             <div class="country__data">
//               <h3 class="country__name">${data.name}</h3>
//               <h4 class="country__region">${data.region}</h4>
//               <p class="country__row"><span>👫</span>${(
//                 +data.population / 1000000
//               ).toFixed(1)} people</p>
//               <p class="country__row"><span>🗣️</span>${
//                 data.languages[0].name
//               }</p>
//               <p class="country__row"><span>💰</span>${
//                 data.currencies[0].name
//               }</p>
//             </div>
//           </article>
//             `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => console.log(position),
    //   err => console.error(err)
    // );
    // 1. 导航器地理定位 (获取当前位置)
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  // 地理位置
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;
  console.log(lat, lng);
  // 反向编码
  const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  console.log(resGeo);
  const dataGeo = await resGeo.json();
  console.log(dataGeo);

  const res = await fetch(
    `https://restcountries.com/v2/name/${dataGeo.country}`
  );
  console.log(res);
  const data = await res.json();
  console.log(data);
  renderCountry(data[0]);
};

whereAmI();
console.log('FIRST');

/** 使用 try...catch 处理错误
  1. async异步函数无法使用 catch方法
  2. 但正如我们已经知道的，事实并非如此 对于来自 fetch 的承诺。 所以这个承诺只会被拒绝 当用户没有互联网连接时。 但是在出现四、三错误或 404 错误的情况下， 获取承诺不会拒绝。 再一次，我们在这里手动完成， 也在这里。
  3. 手动设置代码fetch函数错误不会触发对应位置的catch -------- 重点
 */
// const renderCountry = function (data, className = '') {
//   const html = `
//             <article class="country ${className}">
//             <img class="country__img" src="${data.flag}" />
//             <div class="country__data">
//               <h3 class="country__name">${data.name}</h3>
//               <h4 class="country__region">${data.region}</h4>
//               <p class="country__row"><span>👫</span>${(
//                 +data.population / 1000000
//               ).toFixed(1)} people</p>
//               <p class="country__row"><span>🗣️</span>${
//                 data.languages[0].name
//               }</p>
//               <p class="country__row"><span>💰</span>${
//                 data.currencies[0].name
//               }</p>
//             </div>
//           </article>
//             `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
//   countriesContainer.style.opacity = 1;
// };

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    // console.log(resGeo);
    // 获取不到api数据时
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    if (!resGeo.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);

    // Reject promise returned from async function
    // 拒绝异步函数返回的promise
    // 重新抛出错误
    throw err;
  }
};

// whereAmI();
// whereAmI();
// whereAmI();
// console.log('FIRST');
// // try {
// //   let y = 1;
// //   const x = 2;
// //   x = 3;
// // } catch (err) {
// //   console.error(err.message);
// // }

/** 从异步函数返回值(同上一起) */
console.log('1: Will get location');
// 没有阻止代码在这里，不知道返回什么，实际返回一个承诺
const city = whereAmI();
console.log(city);
whereAmI().then(city => console.log(city));
console.log('3: Finished getting location');

whereAmI()
  // 这意味着即使有错误在异步函数中，它返回的承诺仍然兑现
  .then(city => console.log(`2: ${city}`))
  .catch(err => console.error(`2: ${err.message} 💥`))
  .finally(() => console.log('3: Finished getting location'));

// 异步函数
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message} 💥`);
  }
  console.log('3: Finished getting location');
})();

/** 并行运行Promise */

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const get3Countries = async function (c1, c2, c3) {
  try {
    // 异步运行()
    // 按照顺序一一处理数据
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
    // console.log(data1.capital, data2.capital, data3.capital);

    // 并行运行
    // Promise是构造函数，.call一种辅助函数(静态方法，接受一系列承诺)(组合函数，组合器)
    // 同一时间处理数据
    // 如果其中一个承诺被拒绝，那么整个promise.all实际上也拒绝了，所以我们说promise.all短路，
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');

/** 其他 Promise Combinators：race、allSettled 和 any
  一共四个Promise组合器
*/

// 1. Promise race
// Promise race其实很有用，防止永无止境的承诺，或者也是非常长期的承诺
// 例如有一个非常糟糕的互联网连接，然后再你的应用程序中获取请求，可能需要很长事件才能真正有用。所以我们可以创建一个特殊的超时承诺，经过一段时间后自动拒绝

// 如果网址是错的，那么将会报错，但是自己运行时，代码回复undefined(出现错误没有触发getJSON函数里抛出的错误信息)
// 正常情况下，返回加载最快的那一条数据
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};
(async function () {
  try {
    const res = await Promise.race([
      getJSON(`https://restcountries.com/v2/name/italy`),
      getJSON(`https://restcountries.com/v2/name/egypt`),
      getJSON(`https://restcountries.com/v2/name/mexico`),
    ]);
    console.log(res[0]);
  } catch (err) {
    console.log(err);
  }
})();

// 创建一个特殊超时承诺
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too lang!'), sec * 1000);
    });
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v2/name/tanzania`),
  timeout(1),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// 2. Promise.allSettled(ES2020)
// 类似于Promise.all，返回所有结果的数组，但不同的是Promise.all承诺一拒绝就会短路，但是Promise.allSettled根本不会短路，它会简单地返回所有承诺的所有结果
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// 3. Promise.any(ES2021)
// 接受一个数组多个承诺，然后这个将返回第一个兑现的承诺，它只会忽略被拒绝的承诺，所以基本上
const test = function (sec) {
  return new Promise(function (resolve) {
    setTimeout(resolve);
  });
};

Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

///////////////////////////////////////
// 编码挑战 #3

/* 
PART 1
编写一个异步函数 'loadNPause' 来重新创建 Coding Challenge #2，这次使用 async/await（仅使用 Promise 的部分）。 比较两个版本，想想最大的不同，看看你更喜欢哪一个。
不要忘记测试错误处理程序，并在开发工具网络选项卡中将网络速度设置为“Fast 3G”。

PART 2
1. 创建一个异步函数“loadAll”，它接收一组图像路径“imgArr”；
2. 使用 .map 循环遍历数组，使用 'createImage' 函数加载所有图像（调用结果数组 'imgs'）
3.查看控制台中的'imgs'数组！ 和你预期的一样吗？
4.使用promise组合器函数从数组中实际获取图像😉
5. 将'parallell' 类添加到所有图像（它有一些CSS 样式）。

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/
// 创建 创建图片承诺与倒计时承诺，依次计时显示对应图片
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    // 图片加载完毕后，插入容器中
    img.addEventListener('load', function () {
      imgContainer.append(img);
      // 传递正确img图像元素
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

// 当前的图片元素
let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// PART 1
// const loadNPause = async function () {
//   try {
//     // Load image 1
//     let img = await createImage('img/img-1.jpg');
//     console.log('Image 1 loaded');
//     await wait(2);
//     img.style.display = 'none';

//     // Load image2
//     img = await createImage('img/img-2.jpg');
//     console.log('Image 2 loaded');
//     await wait(2);
//     img.style.display = 'none';
//   } catch (err) {
//     console.error(err);
//   }
// };
// loadNPause();
// PART 2 (加载所有)

const loadAll = async function (imgArr) {
  try {
    // 返回三个承诺，而不是图像本身
    // 异步函数将始终返回一个承诺，而不是我们想要返回的值，将成为承诺的实现价值，异步函数返回

    // 1. 在这个循环中，await关键字完成了它的工作，暂停函数的执行，对吗？
    // 3. 一旦需要使用 async await在这种map方法中，那么你最终会得到一系列的承诺，然后你可以作为下一步处理这样的事情，所以使用Promise.all组合器函数，所以现在下一步实际上很容易
    const imgs = imgArr.map(async img => await createImage(img));
    // 在幕后，图像已经被加载，所以我们基本上没问题，所以我们现在需要做的就是得到这些图像元素本身就出于诺言
    // 我们可以从数组中取出每个Promise然后手动等待，但这没有多大意义，首先是因为我们会有额外的工作，因为那样工作不会并行发生，我们希望它同行发生

    // 2. 然后我们做了Promise.all来实际得到承诺数组中的图像元素
    const imgsEl = await Promise.all(imgs);
    console.log(imgs);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.err(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
