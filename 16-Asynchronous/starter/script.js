/** Public

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.altSpellings[1]}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages.por}</p>
      <p class="country__row"><span>💰</span>${data.languages.zho}</p>
    </div>
  </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

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

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

 */

/************** 异步JavaScript */
/*
  1. 异步JavaScript的目标, 基本上是处理长时间运行的任务, 基本在后台运行
  2. 异步JavaScript最常见的用例, 是从远程服务器获取数据, 在所谓的AJAX调用中
  3. Promises fetch async await和错误处理
*/

/************** 异步JavaScript、AJAX 和 API */
/* 异步代码1 (有图)
  1. 后台运行的任务完成后执行异步代码
  2. 异步代码是非堵塞的
  3. 执行不等待异步任务完成其工作
  4. [1, 2, 3].map(v => v * 2); 这样的单独的回调函数不会使代码异步(回调不会自动使代码异步)
  5. 在一段时间内协调程序的行为
*/

/* 异步代码2 (有图)
  1.2.3.4 条定义同上
  5. 回调函数在图片加载后执行
  6. addEventListener不会自动使代码异步
*/

/* 什么是 AJAX 调用？ (有图)
  1. AJAX = Asynchronous JavaScript and XML (AJAX = 异步 JavaScript 和 XML)
  2. AJAX不是新的编程语言, 而是一种使用现有标准的新方法, AJAX是一种用于创建快速动态网页的技术
  3. 通过后台与服务器进行少量数据交换, AJAX可以使网页实现异步更新, 这意味着可以不重新加载整个网页的情况下, 对网页的某部分进行更新
  总结：
  async JavaScript 和 xml：允许我们以异步方式与远程web服务器通信, 通过ajax调用, 我们可以动态地从web服务器请求数据
*/

/* 什么是 API？
  1. 应用程序接口：一个软件, 可以被另一个软件使用, 以允许应用程序交谈
  2. web开发中有很多类型的api(1. DOM API 2. Geolocation(地理位置) API 3. Own Class API 4. "Online API")
  3. online api: 在服务器上运行的应用程序, 它接收数据请求, 并将数据作为响应发回
  4. 我们可以构建自己的web apis (需要后端开发, 例如使用node.js)或使用 3rd-party APIS
  // 天气 国家 航班 货币转换 用于发送电子邮件或短信的 API 谷歌地图等
*/

// alert('Please Clicked!');
// console.log('loading');
// setTimeout(function () {
//   console.log('Wating 5s');
// }, 5000);

/************** 我们第一个AJAX调用：XMLHttpRequest */

const getCountryDate = function (country) {
  // 创建XMLHttp请求对象
  const request = new XMLHttpRequest();
  // 请求服务器数据
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  // 服务器发送请求数据
  request.send();

  request.addEventListener('load', function () {
    // 返回的响应文本
    console.log(this.responseText);
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

// getCountryDate('portugal');
// getCountryDate('usa');
/* 为什么获取两个国家的顺序不一致？
  1. 每次加载页面时, 数据到达的时间略有不同, 这表明行动中的非堵塞行为, 当我们第一个调用葡萄牙数据时, 它发送这个请求, 然后JavaScript立即在代码中移动, 因此到下一行, 这会触发另一个AJAX调用就在葡萄牙之前
  2. 我们将有两个AJAX调用同时发生, 无论谁先到, 首先触发加载事件, 所以如果第一个时AJAX呼叫美国, 那么第一个元素会显示打印来自美国,
  3. 我们实际上以相同的顺序获取了数据, 现在它实际上完全不同了, 这证实了我之前解释的内容, 现在, 如果我们真的想要提出这个请求以特定的方式, 比如预定义的顺序, 我们基本上必须链接请求, 这意味提出第二个请求只有在第一个请求完成后
*/

/************** web的工作原理：请求和响应 */
/*
    1. 每当我们尝试访问Web服务器时, 作为客户端的浏览器都会向服务器发送请求, 然后服务器发回响应, 该响应包含我们请求的数据或网页
    2. 无论我们是访问整个网页还是只是来自Web API的一些数据, 此过程的工作方式都完全相同, 这整个过程实际上有一个名字, 它被称为(请求-响应模型或客户端-服务器架构)
    深入研究(浏览器与服务器通信)
      1. 在上一个视频中, 我们实际访问URL的示例来获取国家/地区数据, 每个URL都会获得一个HTTP或HTTPS, 用于将在此连接上使用的协议(稍后讨论)
      2. restcountries.com(域名)/name/v2(资源), restcountries.com实际上不是我们试图访问的服务器的真实地址, 这只是一个好听的名字, 我们容易记住, 这意味着我们需要一种将域名转换为服务器真实地址的方法(DNS)
      3. DNS代表域名服务器, 域名服务器是一种特殊的服务器, 基本上就像互联网的电话簿, 所以当我们访问任何web服务器时发生的第一步是浏览器向DNS发出请求, 然后这个特殊服务器将简单地将URL的web地址与服务器的真实IP地址进行匹配, 这一切都是通过您的Internet服务提供商进行的, 但此处的完整细节并不重要
      4. 我们需要从第一部分保留的是, 域不是真实地址,DNS会将域转换为真实IP地址, 然后在将真实IP地址发送回浏览器后, 我们终于可以调用它了, 所以这就是真实地址的样子
      5. 它仍然有协议, 但随之而来的是IP地址, 还有我们在服务器上访问的端口, 这个端口号实际上只是为了识别在服务器上运行的特定服务, 所以你可以把它想象成一个子地址, 这个端口号与我们要访问的name/v2资源无关, 因此该资源实际上将在HTTP请求中发送, 我们稍后会看到
      6. 一旦我们有了真实的IP地址, 浏览器和服务器之间就建立了一个TCP套接字连接, 所以他们现在终于联系上了, 并且此连接通常在传输网站的所有文件或所有数据所需的整个时间内保持活动状态
    什么是TCP和IP？
      1. TCP是传输控制协议, IP是互联网协议, 他们共同构成了准确定义数据如何在web上传输的通信协议,  它们基本上是Internet的基本控制系统, 因为同样它们制定有关数据如何在Internet上移动的规则的人(这听起来令人困惑,请不要担心, 后续会有更多关于TCP/IP的知识)
      2. 我们发出的请求是一个HTTP请求, 其中HTTP代表超文本传输协议, 所以在TCP/IP之后, HTTP是另一种通信协议, 通信协议只是一个允许两方或更多方进行通信的规则系统, 现在就HTTP而言, 它只是一种允许客户端和Web服务器进行通信的协议
    HTTP请求和响应
      ///// 客户端请求
      1. 这通过从客户端向服务器发送请求和响应消息并返回来工作, 消息的开头是最重要的部分, 称为起始行, 这个包含请求中使用的HTTP方法, 然后请求目标和HTTP版本
      2. 关于HTTP方法, 有很多可用的方法, 最重要的是(GET, 简单请求数据, POST, 发送数据, PUT和PATCH, 基本修改数据), 所以你会看到对服务器的HTTP请求不仅是为了获取数据, 而且我们还可以发送数据
      3. 现在关于请求目标, 这是服务器被告知在这种情况下我们要访问name/v2资源的地方, 还记得吗？所以我们之前在URL中有这个, 现在它只是作为HTTP请求中的目标发送, 然后服务器可以弄清楚如何处理它
      4. 如果目标是空的, 所以如果只是一个斜线, 那么我们将访问网站的路由, 在这个例子中就是 restcountries.com 然后请求的下一部分是请求头, 它只是我们发送的关于请求本身的一些信息, 有大量的标头, 例如用于发出请求的浏览器、时间、用户的语言等等
      5. 现在终于, 在这种情况下, 我们将数据发送到服务器, 还有一个请求正文, 该正文将包含我们发送的数据, 例如, 来自HTML表单的数据, 这就是HTTP请求

      // Https和Http的区别
      6. 不是我们开发人员手动编写这些HTTP请求, 但是了解HTTP请求和响应是什么样的仍然很有帮助和有价值, 另外, 我想提一下, 你可能知道还有HTTPS, HTTP和HTTPS之间的主要区别在于, HTTPS是使用TLS或SSL加密的, 它们还有一些是协议, 但我不会让你感到厌烦, 但除此之外, HTTP请求和响应背后的逻辑仍然适用于HTTPS


      //// 服务器响应
      7. 我们请求形成, 现在它到达服务器, 然后服务器处理它, 直到它准备好我们的数据或网页发送回来, 一旦准备就绪, 它将使用您可以猜到的HTTP响应将其发回
      8. HTTP响应消息实际上看起来与请求非常相似, 起始行、标题和正文也是如此. 现在, 在这种情况下, 起始行除了版本之外还有状态代码和消息, 这些用于让客户知道请求是成功还是失败, 例如, 200表示可以, 404表示找不到页面
      9. 响应头是关于响应本身的信息, 所以就像以前一样, 有很多可用的, 我们实际上可以自己制作, 响应的最后一部分再次是正文, 它出现在大多数响应中, 该正文通常包含从API返回的JSON数据或我们请求的网页的HTML或类似内容, 我们弹得很详细, 关于这里最重要的部分, 即HTTP请求和响应

    获取json数据和网页数据的区别
      1. 在我们想象的例子中, 我们只对restcountries.com做了一个请求并得到了一个回复, 对吧？当我们所作的只是访问API时, 这就是它的工作方式
      2. 但是如果它是我们正在访问的网页, 那么将会有更多的请求和响应, 那是因为当我们执行第一个请求时, 我们返回的只是初始HTML文件。
      3. 然后, 该HTML文件被浏览器扫描以获取构建整个web页面(如JavaScript、CSS文件、图像文件或其他资产)所需的所有资产.
      3. 然后对于每个不同的文件, 都会向服务器发出一个新的HTTP请求, 所以基本上客户端和服务器之间的整个来回发生在网页中包含的每个文件中.
      4. 可以同时发送多个请求和响应, 但数量仍然有限, 否则连接会开始变慢, 但无论如何, 当我们所有文件最终到达时, 就可以根据您已经知道的HTML、CSS和JavaScript规范在浏览器呈现web页面
    TCP/IP这些请求和响应数据实际上是如何通过web发送的？
      1. 首先TCP的工作是将请求和响应分解成数千个小块, 称为数据包, 然后再发送, 一旦小数据包到达它们的最终目的地, TCP会将所有数据包重新组合成原始请求或响应
      2. 这是必要的, 以便每个数据包可以通过互联网采用不同的路由, 因为这样消息可以尽快到达目的地, 如果我们将整个数据作为一个大块发送, 这是不可能的
      3. 这就像试图用你能想象的最大的公共汽车一样穿过密集的交通, 所以可能不是一个好主意, 现在, 作为第二部分, IP协议的工作是通过Internet实际发送和路由这些数据包, 因此, 它确保他们应该去的目的地, 使用每个数据包的IP地址, 这就是web幕后发生的事情的广泛概述, 让我们回到JavaScript和AJAX调用
*/

/************** 欢迎回到回调地狱 callback hell(同上) */
/*
  1. 当我们异步调用数据, 调用内容顺序会不同, 因为异步JavaScript是不堵塞的, 第二个异步调用可能会提前完成
  2. 回调地狱是当我们有很多嵌套回调时, 以便按顺序执行异步任务
  3. 回调地狱的方式让我们的代码看起来很多, 难以维护
  4. ES6之后, 实际上有一种逃避回调地狱的方法, 通过使用一种叫做承诺的东西
*/
/*
  
*/

const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  // 1. 第一次执行异步函数
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
    // 2. 第二次执行异步函数
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('portugal');

/************** Promises 和 Fetch API */
/*
  1. 所以我们不要替换旧的 XML HTTP 请求函数, 以现代方式进行AJAX调用, 那就是使用 Fetch API
  2. Fetch API 发出简单的get请求, 真正需要的只是传入URL, 对于更复杂的AJAX调用, fetch函数可以向对象一样接受选项 
  3. fetch函数返回一个承诺, 如果返回的承诺是resolve, then()则执行方法中的函数, 处理API接收到的数据在函数中
*/

const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v2/name/${country}`);
request.send();

const request = fetch('https://restcountries.com/v2/name/portugal');
console.log(request); // Promises Response 回复

/* (有图)
  什么是承诺？
    1. Promise: 用作异步操作的未来结果的占位符对象
    2. Promise：异步传递值的容器
    3. 承诺：未来价值的容器 (示例：来自AJAX调用的响应)
  Promise是ES6的新特性, 它最大的优势是什么？
    我们不需要依赖给异步函数的事件和回调来处理异步结果, 代替嵌套回调, 我们可以将promise链接到一个异步操作序列：转义回调地狱
  承诺执行过程
    1. 答应我如果我才对了结果就收钱
    2. 我现在买彩票(承诺)
    3. 抽奖是异步发生的
    4. 如果结果正确, 我会收到钱, 因为这是承诺的
*/

/* 承诺的基本概念
  1. 所以一开始, 我们说承诺是未决的, 所以这是在任何由异步任务可用, 现在, 在这段时间里, 异步任务仍在做它的工作在后台, 可然后当任务最终完成时, 我们说承诺已经解决了, 是两种不同类型的已解决承诺和那是兑现的承诺和拒绝的承诺
  2. 所以一个实现的承诺是一个承诺, 成功地产生了我们期望的值, 例如, 当我们使用Promise来获取数据时, 来自API, 一个兑现的承诺成功地摧毁了这些数据, 现在可以使用了, 另一方面, 被拒绝的承诺意味着异步任务期间出现错误, 以及从API获取数据的示例, 当用户离线且无法连接到API服务器时
  3. 现在回到我们的彩票类比, 抽奖基本上异步任务, 这决定了结果, 一旦结果可用, 票就会被结算
  4. 如果我们猜对了结果, 彩票将兑现我们得到我们的钱, 然而如果我们猜错了, 然后票基本上被拒绝了, 而我们所作的只是浪费我们的钱, 现在这些不同的状态, 理解这一点非常重要, 因为当代码中使用Promise时, 我们将能够处理这些不同的状态结果做某事
  5. Promises时一个承诺只解决一次, 所以从那里开始, 国家将永远保持不变, 所以承诺要么被实现, 要么被拒绝, 但改变这种状态是不可能的, 现在, 我在这里向你展示的这些不同的状态
  6. 当我们使用承诺时是相关且有用的得到结果, 这被称为消费承诺, 所以我们消费了一个承诺, 例如：当我们已经有一个承诺时, 被退回的承诺从fetch函数, 就在这个视频的开头
  7. 记住, 但是为了让承诺首先存在, 它必须首先被建造, 所以必须在fetch API的情况下创建, 它是构建承诺的fetch函数, 并返回给我们消费, 所以在这种情况下, 我们不必自己建立承诺为了消耗它, 现在, 大多数时候我们实际上会只消费承诺, 这也是更容易和更有用的部分, 但有时我们也需要建立一个承诺和不只是消费它
 */

/* Promise API提出以下建议：
  1. 每个异步任务将返回一个Promise对象
  2. 每个Promise对象都有一个then函数, 可以接受两个参数, 一个success处理程序和一个error处理程序
  3. 异步任务完成后, 函数中的成功或错误处理程序then只能被调用一次
  4. 该then函数也将返回一个Promise, 以允许链接多个调用
  5. 每个处理程序(成功或错误)都可以返回一个value, 它将argument在promise链中作为一个传递给下一个函数
  6. 如果一个处理程序返回一个promise(发出另一个异步请求), 则只有在请求完成后才会调用下一个处理程序(成功或错误)
*/

/************** 消费承诺 */

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
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'));
};

getCountryData('portugal');

/* json()解析方法实际也是一个异步函数, 并且返回一个新的承诺
  1. 我们需要在响应上调用json方法, 好的, 所以json是一个可用的方法, 在fetch方法的所有响应上, jsons是一种可用的方法, 在所有即将到来的响应对象上
  2. 实际上, 这里的响应实际上是一个已解决的值, 因此它确实有附加到它的json方法, 这里的问题是这个json函数本身, 其实也是一个异步函数, 这意味着什么, 是它也会返回一个新的承诺, 这有点令人困惑, 但这就是它的工作原理
*/

/************** 处理被拒绝的承诺(v2 改为 v3解决响应一直返回true的问题) */
/*
  1. .then(err => alert(err)) 在回调中打印错误 
  2. .catch() 在全球范围内处理错误
  3. .finally()无论承诺发生什么, 都将始终被调用, 无论承诺兑现还是被拒绝, 我们定义的回调都会被调用
    a) 加载微调器, 就像你随处可见的这些旋转的圆圈, 在web应用程序种加载某些数据时
    b) 应用程序显示了一个微调器, 当异步操作开始时, 然后在操作完成后隐藏它
    c) 无论如何, 这都会发生操作成功与否, 因此这个方法是完美的
  4. err是一个JavaScript对象, 我们可以使用构造函数在JavaScript种创建错误, 就像map和set
*/

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3/name/${countrys}`)
    .then(response => {
      console.log(response);
      /*
          body: （…）
          bodyUsed: true
          headers: Headers {}
          ok: true
          redirected: false
          status: 200
          statusText: "OK"
          type: "cors"
          url: "https://restcountries.com/v3/name/portugal"
          [[Prototype]]: Response
        */
      if (!response.ok)
        // 拒绝响应信息时, 手动抛出一个错误对象
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => {
      console.log(data);

      /*
          {status: 404, message: 'Not Found'}
          message: "Not Found"
          status: 404
          [[Prototype]]: Object
        */
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) return;

      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      // Country not found (404) 😁😁😁
      console.error(`${err} 😁😁😁`);
      renderError(`Somethins went wrong 😁😁 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener('click', function () {
  getCountryData('portugalasdasda');
});

/************** 手动抛出错误 */
/*
  1. 检查堆栈追踪, 没有反应真正的错误, 这就是我们的API, 真正的错误当然不是我们无法读取未定义的标志, 404状态码
  2. fetch函数只拒绝当没有互联网连接时, 像这样404的错误不是真正的错误, 获取承诺仍然会得到满足, 所以没有拒绝, 因此我们无法捕获程序中真正的错误, 这样我们会返回很多错误, 但不知道究竟是哪里先出现了问题(重点)
  3. fetch函数仍然没有拒绝, 顺便说一下, 很多人包括我自己认为在这种情况下, 实际上应该立即拒绝承诺, 因为在这个回调中抛出一个错误, 这个then方法将立即拒绝这个承诺, 然后那个被拒绝的承诺会传播下去, 知道它最终在某个地方被抓住, 这种情况下, 它就在这里, 在这个catch处理程序中
*/

const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v3/name/${country}`, 'Country not found')
    .then(data => {
      console.log(data);
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://restcountries.com/v3/alpha/${neighbour}`,
        'Country not found'
      );
    })

    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('portugalsda');
});

getCountryData('australia');

/************** 编码挑战 #1  Coding Challenge #1 */
/*
  在这个挑战中，您将构建一个函数“whereAmI”，它仅根据 GPS 坐标呈现一个国家/地区。为此，您将使用第二个 API 对坐标进行地理编码。

  以下是您的任务：

  第1部分
  1. 创建一个函数“whereAmI”，它将纬度值 (lat) 和经度值 (lng) 作为输入（这些是 GPS 坐标，示例如下）。
  2. 对提供的坐标进行“反向地理编码”。反向地理编码意味着将坐标转换为有意义的位置，例如城市和国家/地区名称。使用此 API 进行反向地理编码：https://geocode.xyz/api。
  AJAX 调用将使用以下格式对 URL 进行：https://geocode.xyz/52.508,13.381?geoit=json。使用 fetch API 和 promise 来获取数据。不要使用我们创建的 getJSON 函数，这是作弊 😉
  3. 获得数据后，在控制台中查看它以查看您收到的有关所提供位置的所有属性。然后，使用这些数据，将这样的消息记录到控制台：“你在德国柏林”
  4. 将 .catch 方法链接到 promise 链的末尾并将错误记录到控制台
  5. 此 API 允许您每秒仅发出 3 个请求。如果您快速重新加载，您将收到代码 403 的此错误。这是请求的错误。请记住，在这种情况下， fetch() 不会拒绝承诺。因此，创建一个错误以拒绝承诺，并提供有意义的错误消息。

  第2部分
  6. 现在是时候使用接收到的数据来渲染一个国家了。所以从地理编码 API 结果中取出相关属性，将其插入到我们一直在使用的国家/地区 API 中。
  7.渲染国家并捕捉任何错误，就像我们在上一课中所做的一样（您甚至可以复制此代码，无需键入相同的代码）

  测试坐标 1：52.508、13.381（纬度、经度）
  测试坐标 2: 19.037, 72.873
  测试坐标 2：-33.933、18.474

  祝你好运😀
*/
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(res => {
      // 手动抛出错误信息, 并向下传递到catch方法
      if (!res.ok) throw new Error(`Country not found (${res.status})`);
      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.log(err);
      console.error(`${err.message} 💥 `);
    });
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);

/************** 幕后异步：事件循环 (Behind the scenes asynchrony: the event loop) */
/*
  前言
    我们了解了AJAX 和 API 是什么, 我们已经使用了一堆异步代码, 我们学习了所有关于承诺的知识, 但缺少的是最终了解所有它确实在JavaScript的幕后工作, 我们来了解一下, 首先我们快速回顾一下JavaScript运行时, 我们课堂中谈到的方式, 只是为了确保本讲座的其余部分将使感觉你, 因此, 
  幕后异步涉及内容介绍
    1. JavaScript运行时基本上是一个容器, 其中包括所有不同的部分, 这是执行JavaScript代码所必须的
    2. 现在, 每个JavaScript运行时的核心都是引擎, 所以, 这是实际执行代码的地方以及对象存储在内存中的位置, 所以，这两件事情发生在调用堆栈中并在堆中
    3. JavaScript只有一种执行威胁, 所以它一次只能做一件事, 绝对不会发生多任务处理, 在JavaScript本身中, 现在java等其他语言可以执行多个片段代码, 但是JavaScript是不可以的
    4. 但无论如何, 接下来我们有 web API环境, 这些是提供给引擎的一些API, 但实际上不属于JavaScript语言本身, 所以, 就像DOM计时器 fetch API、geolocation API等等.
    5. 接下来是回调队列, 这是一个包含所有准备好的数据结构, 要执行的回调函数到一些已经发生的事件, 最后, 每当调用堆栈为空时, 事件循环从回调队列中获取回调, 并将它们放入调用堆栈, 以便它们可以被执行, 因此事件循环是必不可少的, 使异步行为成为可能的部分, 在JavaScript中.
    6.这就是为什么我们可以拥有一个JavaScript中的非堵塞并发模型, 并发模型只是语言处理的方式多件事情同时发生, 但是现在怎么办, 非堵塞并发真的有效吗？为什么如此重要？
  事件循环运行部分研究
    1. web API 事件循环的调用堆栈并回调队列, 所以, 如你所知, 到目前位置, 已经构建了一个JavaScript引擎围绕单一威胁的想法, 但是如果引擎中只有一个执行线程, 那么如何执行异步代码以非堵塞方式？
    2. 基本上你会学到 JavaScript 并发模型是如何工作的 在幕后，使用所有部分 您已经知道的 JavaScript 运行时。 和往常一样，我们将通过查看来做到这一点 在一个真实的代码示例中。那么，让我们来看看代码行 按行，我会在我们进行时不断更新调用堆栈， 但是，您已经知道如何调用堆栈 
  Code、Web API、Callback Queue(回调队列)研究
      Code和web API
        1. 我们从选择这个图像元素开始, 然后在下一行, 我们将该图像的源属性设置为dog.jpg, 正如我们之前了解到的, 现在将开始加载此图像在后台异步, 这次我们将真正了解那个神秘的背景究竟是什么 (重点)
        2. 正如您已经知道与DOM相关的一切实际上并不是JavaScript的一部分, 而是web API的一部分, 所以它在一个web APIS环境中与DOM相关的异步任务将运行
        3. 事实上, 对于定时器AJAX调用也是如此, 以及所有其他异步任务, 所以, 同样, 这些异步任务都会运行在浏览器的web API环境中, 现在, 如果图像将以同步方式加载, 它会在调用堆栈中阻止其余代码的执行, 如我们了解的一样, 那将是可怕的
        4. 这就是为什么JavaScript中加载图像是异步的, 所以它不会发生在调用堆栈中, 所以, 不在执行的主线程中, 但实际上在web API环境中正如我之前提到的
        5. 现在, 如果我们想在图像之后做一些事情已完成加载, 然后我们需要监听load事件, 在这里我们附加一个事件监听器到该图像的加载事件并像往常一样传递一个回调函数
        6. 在实践中, 这意味着注册这个回调在web API环境中, 正是图像加载的位置, 并将回调留在那里, 直到发出load事件
      fetch函数和then方法
        1. 我们在这里处理异步行为, 就像我们之前学到的那样带有回调, 我们使用AJAX调用获取API, 和往常一样, 异步获取操作会发生在web API环境中, 否则我们会堵塞调用堆栈并在我们的应用程序中造成巨大的滞后
        2. 我们对返回的承诺使用then方法, 通过fetch函数, 这也将注册一个回调在web API环境中, 以便我们可以做出反应到承诺未来解决价值, 所以这个回调与一个Promise相关联, 即从API获取数据, 这以后会很重要
      回调队列与事件循环
        1. 所以, 有了这个, 我们现在已经执行了所有顶级代码, 所c以不在任何回调函数中的代码以异步方式, 我们还在后台加载图像以及从API获取一些数据, 现在非常有趣了, 当遇到多个不同类型异步任务应该如何执行？(重点)
        2.假设图像已经完成加载, 因此加载事件会在该图像上发出, 接下来这个事件的回调进入回调队列, 并且回调队列是一个有序列表, 所有回调函数中排队执行
        3. 如果已经有其他回调等待, 那么这个新回调当然会直接进入到队列的末尾, 它会耐心地坐在那里轮到它最后运行
          计时器案例说明
            1. 假设您将计时器设置为5 秒. 所以五秒钟后, 计时器的回调将被放置 在回调队列上, 对. 假设已经有其他回调在等待. 让我们也说它花了一秒钟 运行所有这些回调. 然后, 在这种情况下, 您的计时器回调只会运行 六秒后而不是五秒后. 所以, 这六秒就是过去的五秒 对于计时器, 加上它花费的一秒 运行已经在等待的所有其他回调 在你的计时器前排队. 所以, 这意味着计时器的持续时间 您定义的不是保证. 唯一的保证是定时器回调 不会在五秒前运行,  但它可能会在五秒钟过去后运行, 这一切都取决于回调队列的状态.
          DOM实际案例说明
            1. 有一件很重要的事情要在这里提及是回调队列还包含即将到来的回调来自DOM事件, 如点击或按键等。 现在, 我们之前了解到 DOM 事件并不是真的异步行为, 但他们仍然使用 回调队列运行其附加的回调。 因此, 如果单击发生在带有 addEventListener 的按钮上 那么将会发生的事情就像我在这里说明的那样与异步加载事件
          事件循环说明
            1. 查看调用堆栈并确定是否为空, 当然, 除了全球背景, 如果堆栈确实是空的, 这意味着当前没有正在执行的代码, 然后它将从回调队列中获取第一个回调, 并将其放在调用堆栈中, 两个将被执行, 这称为事件循环滴答
            2. 每次事件循环都有一个回调从回调队列, 我们说有一个事件循环滴答, 所以, 正如我们在这里看到的, 事件循环有着极其重要的任务, 调用堆栈之间的协调和回调队列中的回调
            3. 事件循环基本上由谁来决定, 当每个回调被执行时, 我们也可以说事件循环做了编排在整个JavaScript运行时, 从整个解释中, 可以清除地看出另一事件时JavaScript语言本身实际上具有没有时间感, 那是因为一切都是异步的, 不会发生在引擎中(重点)
            4. 管理所有异步行为的是运行时, 由事件循环决定接下来执行哪些代码, 但是引擎本身只是简单地执行它给出的代码(重点)
        
    课程回顾：
      好的，所以，这当然有很多东西要考虑。 因此，让我们尝试回顾一下这里发生的事情。 因此，图像开始异步加载 在 Web API 环境中 而不是在调用堆栈中，对。 然后我们使用 addEventListener 来附加 图像加载事件的回调函数。 而这个回调基本上还是异步代码 这是我们推迟到未来的代码 因为我们只想执行一次图像 已加载。 与此同时，其余的代码继续运行。 (现在addEventListener没有直接放回调 在回调队列中)。 它只是注册了回调，然后一直等待 在 Web API 环境中，直到加载事件 被解雇了。 只有这样，环境才将呼叫放回队列中。 然后在队列中回调一直在等待 让事件循环把它捡起来 并将其放在调用堆栈中。 一旦回调排在第一位，这就会发生 并且调用堆栈是空的。 而且，实际上就是这样。 所以，这一切都发生了，图像不必加载 在调用堆栈中，但在后台 以非阻塞方式。 因此，简而言之，Web API 环境， 回调队列 和事件循环一起，使它成为可能 异步代码可以以非阻塞方式执行 即使引擎中只有一个执行线程。 哇，已经明白了很多， 但我们还没有完成。因为我们还得获取 fetch 函数 在后台从 AJAX 调用中获取数据。 这基本上是在承诺的情况下发生的。 记住，现在有了 promises，事情就稍微变好了 不同的方式，这就是为什么我包含这个承诺示例 以及。 所以，假设数据现在终于到达了。 这样抓取就完成了。 现在，与承诺相关的回调 就像我们注册的这个 承诺then方法。 实际上不要进入回调队列。 所以，我们还有这个回调吗？ 来自承诺的不会被移动到 回调队列。 相反，(promise 的回调有一个特殊的队列 对于他们自己，这就是所谓的微任务队列)。 (现在，微任务队列的特别之处在于 它基本上优先于回调队列。) 因此，在事件循环滴答结束时， 所以在回调之后 从回调队列中，事件循环将检查 如果微任务队列中有任何回调。 (如果有，它将运行所有这些在它运行更多回调之前来自常规回调队列)。 而且，顺便说一下，我们称这些回调 来自承诺微任务。 因此名称微任务队列。 实际上还有其他微任务 但这在这里无关紧要。 回到我们的例子， 目前，我们确实有一个微任务坐 在微任务队列中，调用栈也是空的。 因此事件循环现在将接受这个回调 并将其放入调用堆栈中，就像它所做的那样 来自回调队列的回调。 回调队列是否为空并不重要。 所以，这会以完全相同的方式工作 即使回调队列中有一些回调。 再一次，那是(因为微任务总是具有优先权。 在实践中，这意味着微任务基本上可以 在所有其他常规回调之前排队)。 现在，如果一个微任务添加了一个新的微任务 然后那个新的微任务也被执行 在回调队列中的任何回调之前。 这意味着微任务队列 基本上可以使回调队列挨饿。 因为如果我们不断添加越来越多的微任务， 那么回调队列中的回调永远无法执行。 现在，这通常不是问题 但无论如何我只想在这里提到这种可能性， 谁知道这可能是一个面试问题 总有一天为了你。 如果是这样，你现在就知道答案了。 但无论如何，正如你希望看到的那样 使用常规回调运行异步代码 来自 promise 的微任务非常相似。 (唯一的区别是他们进入不同的队列 并且事件循环给予微任务优先权 通过常规回调。) 好了，终于到了。 这就是你需要知道的一切 异步 JavaScript 确实在幕后工作。 我相信这些知识将会是 对您非常有帮助和价值。 因为你会更有信心写作 现在异步代码。而且你会回答任何面试问题 关于异步 JavaScript。 实际上很多 JavaScript 开发人员不知道 关于这个的任何事情。 (所以，我相信这些知识会让你 进入前 10% 甚至前 5% 的 JavaScript 开发人员)。 这本身就很棒，对吧。 但无论如何，让我们在这里没有结束 并在实践中尝试一些这些东西
*/

/************** 实践中的事件循环 */
// 实践中的事件循环就是按照此顺序一一进行的
// // 1
// console.log('Test start');
// // 5
// setTimeout(() => console.log('0 sec timer'), 5000);
// // 3
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// // 4
// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000; i++) {
//     console.log(res);
//   }
// });
// // 2
// console.log('Test end');

/************** 构建一个简单的Promise */
/*
  1. 太好了, 这就是我们以封装的方式将异步行为转化为承诺, 所以我们如何以一种非常好的方式抽象出来, 就像我们这里所做的一样
*/
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happening 😀');

  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You win $$$');
    } else {
      reject(new Error('You lost your money!!'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// 如何通过承诺设置计时器
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// 每一个then方法都返回一个计时器承诺, 然后通过then再消费承诺
// wait(1)
//   .then(() => {
//     console.log('I waited for 1 seconds');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 3 seconds');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 4 seconds');
//   });

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

// 承诺中的静态方法
// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject('abc').catch(x => console.error(x));

/************** 承诺 Geolocation API */

// 导航器地理位置获取当前位置
// 第一个参数：成功得到位置信息时的回调函数，使用Position 对象作为唯一的参数
// 第二个参数：获取位置信息失败时的回调函数，使用 PositionError 对象作为唯一的参数，这是一个可选项

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );
// getPosition().then(pos => console.log(pos));

// 建立一个承诺未来获取当前地理位置的经纬度
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(res => {
//       console.log(res);
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v3/name/china`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message}`));
// };

// btn.addEventListener('click', whereAmI);

/************** Coding Challenge #2 (编码挑战#2) */
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
//     currentImg.style.opacity = 0;
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.opacity = 0;
//   })
//   .catch(err => console.error(err));

/************** 使用 Async/Await 消费 Promise */
/*
  1. async时一种特殊的函数, 同步功能添加async后, 函数是一个异步函数, 在这之前我们可以通过回调地狱和then()方法消耗前提完成异步回调处理
  2. await关键字基本上等待这个前提结果, 所以基本上await将在此停止解码执行函数的点, 直到满足前提, 该关键字await使 JavaScript 等待，直到该承诺解决并返回其结果
  3. 你可能认为没有停止代码, 阻止执行？ 嗯, 这是一个很好的问题, 但答案实际上是否定的, 在这种情况下, 因为在同步函数中停止执行, 这就是我这里所拥有的实际上不是问题, 因为此函数在后台异步运行
  4. 因此, 它没有阻止主要威胁执行, 所以它不会堵塞调用堆栈, 事实上, 那是一次等待有什么特别之处, 所以事实是它使我们代码看起来像常规在幕后同步代码, 一切实际上都是异步的
  5. 无论如何, 只要这里的这个前提解决了, 那么我们拥有的整个await表达式的值, 这里将是前提的解析值, 所以我们可以简单地将它存储到一个(变量中), 我们称之为response(重点)
*/

// const whereAmI = async function () {
//   // 地理位置
//   const pos = await getPosition();
//   const { latitude: lat, longitude: lng } = pos.coords;
//   console.log(lat, lng);
//   // 反向编码
//   const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//   console.log(resGeo);
//   const dataGeo = await resGeo.json();
//   console.log(dataGeo);

//   const res = await fetch(
//     `https://restcountries.com/v2/name/${dataGeo.country}`
//   );
//   console.log(res);
//   const data = await res.json();
//   console.log(data);
//   renderCountry(data[0]);
// };

// whereAmI();
// console.log('FIRST');

/************** 使用 try ...catch 处理错误 */
/*
  1. async异步函数无法使用catch方法

  2. 对于fetch承诺, 只会拒绝当互联网没有连接时, 出现的404, 403错误会获取承诺不会拒绝, 我们需要手动完成, 也在这里
  3. try...catch语句标记要尝试的语句块，并指定应引发异常的响应

*/

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();
    console.log(dataGeo.country);

    // Country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );

    // BUG in video:
    // if (!resGeo.ok) throw new Error('Problem getting country');

    // FIX:
    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();
    console.log(data[0]);
    renderCountry(data[0]);
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);
  }
};
whereAmI();
whereAmI();
whereAmI();
console.log('FIRST');
try {
  let y = 1;
  const x = 2;
  y = 3;
} catch (err) {
  alert(err.message);
}

/************** 从异步函数返回值(返回承诺) */
/*
  1. 函数返回的所有内容是一个承诺。现在我们从异步函数返回的值，再说一次，这是这里的字符串将成为承诺的实现价值由函数返回。所以理解这一点很重要。再一次，我们在这里看到的这个承诺，该承诺的实现价值将是这里的字符串，因为那是我们返回的值从异步函数而至少如果这里没有错误发生在函数中，但现在，让我们再次假设这里的成功
  2. (但现在让我们考虑一下错误。 因此，如果此 try 块中出现任何错误， 那么永远不会到达这里的返回) 因为代码会立即跳转 到了 catch 块，对吧？ 所以让我们试着在这里创建一些错误。 我就在这里换一个 所以现在什么都行不通， 所以让我们等待吧
*/
// const whereAmI = async function () {
//   try {
//     // Geolocation
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // Reverse gecoding
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     const dataGeo = await resGeo.json();
//     // console.log(resGeo);
//     // 发生错误时, 打印error对象
//     /*
//       {success: false, error: {…}}
//       error:
//       code: "006"
//       message: "Request Throttled. Over Rate limit: up to 0 per sec. See geocode.xyz/pricing"
//       requests: "2"
//       [[Prototype]]: Object
//       success: false
//       [[Prototype]]: Object
//     */
//     // console.log(dataGeo);
//     // Country data
//     const res = await fetch(
//       `https://restcountries.com/v3.1/name/${dataGeo.country}`
//     );
//     // console.log(res);

//     // BUG in video
//     if (!resGeo.ok) throw new Error('Problem getting location data');

//     // FIX:
//     if (!res.ok) throw new Error('Problem getting country');

//     const data = await res.json();

//     renderCountry(data[0]);
//     return `You are in ${dataGeo.city}, ${dataGeo.country}`;
//   } catch (err) {
//     console.error(`${err} 💥`);
//     renderError(`💥 ${err.message}`);
//     // Reject promise returned from async function
//     throw err;
//   }
// };
// whereAmI();
// whereAmI();
// whereAmI();

// 1.
// console.log('1: Will get location');
// const city = whereAmI();
// console.log(city);
/* 异步函数始终返回一个异步函数
  Promise {<pending>}
  [[Prototype]]: Promise
  [[PromiseState]]: "fulfilled"
  [[PromiseResult]]: undefined

*/
// console.log('3: Finished getting location');

// 2.
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location'));

// 3.
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.log(`2: ${err.message} 💥`);
  }
  console.log('3: Finished getting location');
})();

/************** 并行运行Promise.all */
/*
  1. Promise是构造函数, .call一种辅助函数, 是静态方法接受一系列承诺, 组合函数与组合器
  2. 同一时间处理数据, 如果其中一个承诺被拒绝, 那么整个Promise.all实际上也拒绝了, 所以我们说Promise.all短路
  3. .call同一时间处理数据, 按照异步回调顺序显示数据
*/

const get3Countries = async function (c1, c2, c3) {
  try {
    // 旧方法
    // const [data1] = await getJSON(`https://restcountries.com/v3/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3/name/${c3}`);
    // console.log(data1.capital, data2.capital, data3.capital);
    // 新方法
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3/name/${c1}`),
      getJSON(`https://restcountries.com/v3/name/${c2}`),
      getJSON(`https://restcountries.com/v3/name/${c3}`),
    ]);
    console.log(data);

    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.log(err);
  }
};

// get3Countries('portugal', 'canada', 'tanzania');

/************** Promise race*/
/*
  Promise race
    1. Promise race 其实很有用, 防止永无止境的承诺, 或者是非常长期的承诺, 例如有一个非常糟糕的互联网连接, 然后再你的应用程序中获取请求, 可能需要很长时间才能真正有用
    2. 所以我们可以创建一个特殊的超时承诺, 经过一段时间自动拒绝
    3. 如果网址是错误的, 我们不会报错, 会显示undefined
    4. 结果返回最快响应的API数据, 如果输入API地址错误, 那么会显示undefined不会影响使用
    5. 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝，只有一个承诺会被解决，那个快返回哪个(重点)
*/
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
// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request took too lang!'));
//     }, sec * 1000);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.com/v3/name/tanzania`),
//   timeout(1),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

/************** Promise allSettled*/
/*
  1. 方法返回一个承诺，该承诺在所有给定的承诺已完成或被拒绝后解析，并带有一个对象数组，每个对象描述每个承诺的结果(重点)
  2. 类似于Promise.all, 返回所有结果数组, 但不同的是Promise.all承诺一拒绝就会短路, 但是Promise.allSettled根本不会短路, 它会简单地返回所有承诺的所有结果
*/
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ]).then(res => console.log(res));

// // 发生短路, 抛出错误
// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

/************** Promise any (ES2021)*/
/*
  1. 接收一个Promise可迭代对象, 只要其中的一个promise成功, 就返回那个已经成功的promise
  2. 如果可迭代对象中没有一个 promise 成功(即所有的promises都失败/拒绝), 就返回一个失败的promise和AggregateError类型的实例, 它是Error的一个子类, 用于把单一的错误集合在一起 AggregateError: All promises were rejected
  3. 本质上这个方法和Promise.all()是相反的
*/

// const test = function () {
//   return new Promise(function (resolve) {
//     setTimeout(resolve);
//   });
// };

// Promise.any([
//   Promise.reject('Success'),
//   Promise.reject('ERROR'),
//   Promise.reject('Another success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

/************** 编码挑战 #3 */
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

/*
  1. 异步函数将始终返回一个承诺
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
//     return wait(1);
//   })
//   .then(() => {
//     currentImg.style.opacity = 0;
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(1);
//   })
//   .then(() => {
//     currentImg.style.opacity = 0;
//   })
//   .catch(err => {
//     console.error(`${err}`);
//   });

// PART 1
// const loadNpause = async function () {
//   try {
//     // load image 1
//     let img = await createImage('img/img-1.jpg');
//     console.log('Image 1 loaded');
//     await wait(1);
//     img.style.opacity = 0;

//     img = await createImage('img/img-2.jpg');
//     console.log('Image 2 loaded');
//     await wait(1);
//     img.style.opacity = 0;
//   } catch (err) {
//     console.error(`${err}`);
//   }
// };
// loadNpause();

// PART 2
const loadAll = async function (imgArr) {
  try {
    /*
      1. 异步函数将始终返回一个承诺
      2. async img(代表这是一个异步函数) => (箭头相当于return) await createImage(img)()
      3. async function(img) = { await createImage(img) }
      4.这里我们想要返回的值将成为承诺的实现价值, 异步函数返回
    */
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs);
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch {
    console.error(`${err}`);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
