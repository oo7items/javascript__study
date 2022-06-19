'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

//////元素选择器
const header = document.querySelector('header');
const allSections = document.querySelectorAll('.section');
// NodeList被存储后，DOM发生变化，NodeList不会发生变化
console.log(allSections); // NodeList

document.getElementById('section--1');

// 如果DOM发生变化，集合也将发生变化
const allButtons = document.getElementsByTagName('button'); // HtmlCollection
console.log(document.getElementsByClassName('btn'));

// 创建和插入元素
const message = document.createElement('div');
message.classList.add('cookie-message');

// 添加文本
message.textContent =
  'We use cookied for improved functionality and analytics.';

// 添加HTML
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// 第一个子项之前插入一组 Node对象或DOMString对象Element。DOMString对象作为等效Text节点插入
// header.prepend(message);

// 最后一个子项之后插入一组Node对象或DOMString对象Element。DOMString对象作为等效Text节点插入
// header.append(message);

// // 复制元素 true代表包含所有子元素
// header.append(message.cloneNode(true));

// header.before(message);
header.after(message);

// 删除元素
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    // 旧方法 (从父元素中删除子元素)
    message.parentElement.removeChild(message);
  });

////////////////////////////////////////////////////  样式、属性和类
message.style.color = '#37383d';
message.style.width = '120%';

// 定义的属性值会存储在style内联样式中
console.log(message.style.backgroundColor); // nothings
console.log(message.style.color); // rgb(55 56, 61)

// 获取样式
console.log(getComputedStyle(message).backgroundColor);
console.log(getComputedStyle(message).color);

// 修改样式
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 300 + 'px';
console.log(document.documentElement);

// 修改属性样式
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

// Non-standard
console.log(logo.designer); // undefind
// getAttribute => 获取属性
console.log(logo.getAttribute('designer')); // John
logo.setAttribute('company', 'Bankist');

console.log(logo.src); // http://127.0.0.1:5500/img/logo.png 绝对位置
console.log(logo.getAttribute('src')); // img/logo.png 相对位置

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
// UI => data-version-number === JS => dataset.versionNumber
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');

// Don't use
// 这个会覆盖元素只保留一个样式
logo.className = 'joans';

//////////////////////////////////////////////////// 实现平滑滚动
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const test = document.querySelector('.test');

btnScrollTo.addEventListener('click', function (e) {
  // 相对视口位置
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // 获取边界客户端矩形
  const test1 = test.getBoundingClientRect();
  console.log(test1);
  // 如果是标准盒子模型，元素的尺寸等于width/height+ padding+border-width的总和。如果box-sizing: border-box，元素的的尺寸等于width/height
  console.log(e.target.getBoundingClientRect());

  // 相对页面位置
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  // 相对视口位置
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  ///// 旧方法
  // Scrolling
  // 注意滚动距离是相对于视口的，会根据视口进行变换
  window.scrollTo(s1coords.left, s1coords.top);
  // 视口距离+页面距离 => 需滚动距离
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
  ///// 新方法
  section1.scrollIntoView({ behavior: 'smooth' });
  // 这里的这些客户端高度和宽度不算在内与滚动条。这是观察口的尘土飞扬的尺寸 实际上可用于内容。
});

//////////////////////////////////////////////////// 事件类型和事件处理程序
const h1 = document.querySelector('h1');

// 第一个是它允许我们添加同一事件的多个事件侦听器
// 实际上可以删除一个事件处理程序以防我们不再需要它
const alertH1 = h1.addEventListener('mouseenter', function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
  h1.removeEventListener('mouseenter', alerttH1);
});

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};

h1.addEventListener('mouseenter', alertH1);
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// 如果我们对这个属性做同样的事情，那么第二个功能基本上会只需覆盖第一个
h1.onmouseenter = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};

//////////////////////////////////////////////////// 事件传播：冒泡和捕获
// 捕获阶段 => 事件一直向下传播，从文档路径到目标元素，当事件沿着树向下传播时，它将通过每个父元素目标元素
// 目标阶段 => 在目标处处理事件，事件监听器等待某个事件发生在某个元素上，一旦事件发生，它运行附加的回调函数
// 在这个例子中，它只会创建这个警报窗口，好吗？同样，这发生在目标阶段。好了，现在，到达目标后，该事件然后实际传播再次到达文档路径，在所谓的冒泡阶段
//冒泡阶段 => 事件冒泡了从目标到文档路径。就像在捕获阶段一样，事件通过其所有父元素，真的只是父母，所以不是通过任何兄弟元素
// 但是现在您可能想知道为什么这如此重要？为什么我们要了解所有这些细节？嗯，这确实非常重要，因为基本上，就好像这件事也发生了一样在每个父元素中。
// 当事件通过父元素冒泡时， 就好像这件事发生了一样 就在那个元素中。 这意味着如果我们附加 相同的事件侦听器，例如， 到 section 元素，然后我们会得到 部分元素的警报窗口也完全相同。
// 所以我们会处理完全相同的事件两次，一次在其目标，一次在其父元素之一。 而这种行为会让我们，实现真正强大的模式，

////////////////////////////////////////////////////  实践中的事件传播
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
console.log(randomInt(0, 255));
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  e.stopPropagation();
  // IE则是使用e.cancelBubble = true
});

document.querySelector('.nav__links').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('CONTAINER', e.target, e.currentTarget);
  },
  true
);

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  },
  true
);
// 然而，如果我们真的想捕捉事件 在捕获阶段， 我们可以定义第三个参数 在 addEventlistener 函数中。 例如这里， 我们可以将第三个参数设置为 true 或 false。 因此，让我们将其设置为 true。 所以在这种使用捕获参数的情况下 设置为真， 事件处理程序将不再监听冒泡事件， 而是捕获事件。

//////////////////////////////////////////////////// 事件委托：实现页面导航
// 1. 在描元素上附加一个事件处理程序 (面对多个元素时，会影响性能)
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth', // 行为：光滑的
    });
  });
});

// 2. 在父元素附加一个事件委托 (通过判断执行功能)
// 将事件侦听器添加到公共父元素
// 确定是什么元素引发了事件
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: smooth,
    });
  }
});

//////////////////////////////////////////////////// DOM 遍历
const h1 = document.querySelector('h1');
const title = document.querySelector('.header__title');
console.log(h1.querySelectorAll('.highlight')); // NodeList(2) [span.highlight, span.highlight]
console.log(h1.childNodes); // NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]
console.log(h1.children); // HTMLCollection(3) [span.highlight, br, span.highlight]

// 内部第一个子元素
h1.lastElementChild.style.color = 'orangered';

// 向上：父母
console.log(h1.parentNode);
console.log(h1.parentElement);

// querySelector是DOM深处寻找，closest是向DOM上处寻找父母
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';
title.closest('.header__title').style.background = 'var(--gradient-primary)';

// 横着走：兄弟姐妹

// 以前的元素兄弟姐妹
console.log(h1.previousElementSibling);
// 下一个元素兄弟姐妹
console.log(h1.nextElementSibling);

// 以前的兄弟姐妹
console.log(h1.previousSibling); // #test
// 下一个兄弟姐妹
console.log(h1.nextSibling); // #test

console.log(h1.parentElement.children); // HtmlCollection[p, p, h1, h4, button.btn--text.btn--scroll-to, div.test, img.header__img]

[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});

//////////////////////////////////////////////////// 构建选项卡式组件
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////////////////////////////////////////////////// 将参数传递给事件处理程序
// 1. 第一种方案
const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    // 目标链接
    const link = e.target;
    // 找寻哪个父元素下有此链接，防止多个类名重复造成性能问题
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');
    siblings.forEach(el => {
      console.log(el);
      if (el != link) el.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
});
nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    // 目标链接
    const link = e.target;
    // 找寻哪个父元素下有此链接，防止多个类名重复造成性能问题
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');
    siblings.forEach(el => {
      console.log(el);
      if (el != link) el.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
});

// 2. 第二种方案
const nav = document.querySelector('.nav');
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    // 目标链接
    const link = e.target;
    // 找寻哪个父元素下有此链接，防止多个类名重复造成性能问题
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');
    siblings.forEach(el => {
      console.log(el);
      if (el != link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

// 3. 第三种方案
const nav = document.querySelector('.nav');
const handleHover = function (e) {
  console.log(e); // MouseEvent {isTrusted: true, screenX: 2831, screenY: 358, clientX: 911, clientY: 39, …}
  console.log(this, e.currentTarget); // 0.5 <nav class=​"nav">​…​</nav>​flex
  if (e.target.classList.contains('nav__link')) {
    // 目标链接
    const link = e.target;
    // 找寻哪个父元素下有此链接，防止多个类名重复造成性能问题
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');
    siblings.forEach(el => {
      if (el != link) el.style.opacity = this;
    });
    logo.style.this = this;
  }
};
// 将参数传递给处理程序
// 用bind方法实现了参数传递，正常addEventListener是需要一个函数不能传递参数
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//////////////////////////////////////////////////// 实现粘性导航：滚动事件
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords); // 相对于视口

window.addEventListener('scroll', function () {
  console.log(window.scrollY); // 相对于视口
  //  事件监听和调用 Element.getBoundingClientRect() 都是在主线程上运行，因此频繁触发、调用可能会造成性能问题。这种检测方法极其怪异且不优雅
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

//////////////////////////////////////////////////// 更好的方法：Intersection Observer API
// 1.
// 观察某个目标元素的方式变化 与另一个元素相交，或方式
// 所以这里的回调函数将被调用每次观察到的元素，所以我们这里的目标元素是相交的我们定义的阈值处的根元素
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const obsCallback = function (entries, abserver) {
  // 条目 观察者
  // isIntersecting => 是相交的 isVisible => 是可见的
  entries.forEach(entry => console.log(entry));
};
const obsOptions = {
  // 指定根(root)元素，用于检查目标的可见性。必须是目标元素的父级元素。如果未指定或者为null，则默认为浏览器视窗
  root: null,
  // 阈值为1.0意味着目标元素完全出现在root选项指定的元素中可见时，回调函数将会被执行
  // 阈值为0意味着目标元素完全未出现在root选项指定的元素中可见时，回调函数将会被执行
  // 阈值为0.1意味着目标元素完全出现在root选项指定的元素中百分之10 可见时，回调函数将会被执行
  threshold: 0,
};
const observer = new IntersectionObserver(obsCallback, obsOptions); // 路口观察员
// 目标元素
observer.observe(header);

// 2.
const nav = document.querySelector('.nav');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const navHeight = header.get;
const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: '-90px',
});
headerObserver.observe(header);

//////////////////////////////////////////////////// 显示卷轴元素scroll(滚动监听动画)
const allSections = document.querySelectorAll('.section');
const revealSections = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  // 第一个section不会触发删除元素
  // 我们需要添加一个保护协议，在isIntersecting为true时触发
  if (!entry.isIntersecting) return; // isIntersecting为false时返回函数
  entry.target.classList.remove('section--hidden');

  // 关闭观察
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//////////////////////////////////////////////////// 模糊图片动画
// 在性能优化中，图片的占比是非常大的
const imgTargets = document.querySelectorAll('.features__img');
const loadImg = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  // 图片下载完毕后去掉模糊效果
  // Network -> slow模式下查看
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//////////////////////////////////////////////////// 滚动轮播组件1
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  slides.forEach(
    (slide, index) => (slide.style.transform = `translateX(${index * 100}%)`)
  );

  const maxSlide = slides.length;
  let curSlide = 0;

  const gotoSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  // 运行结果
  // 0. 0 100 200
  // -100 0 100
  // -200 -100 0
  // 计算步骤(注意curSlide是全部变量用于存储当前幻灯片位置变量)
  //  curSlide = 0 => 100 * ([0, 1, 2] - 0) = 0 100 200
  //  curSlide = 1 => 100 * ([0, 1, 2] - 1) = -100 0 100
  //  curSlide = 2 => 100 * ([0, 1, 2] - 2) = -200 -100 0
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    gotoSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    // 轮播图开始无法左移动！
    // if (curSlide === 0) return;
    if (curSlide === 0) {
      curSlide = 3;
    }
    curSlide--;
    console.log(curSlide);
    gotoSlide(curSlide);
    activateDot(curSlide);
  };
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    // 属性选择器
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      //  e.target = {
      //   dataset : '0',
      //   dataset : '1',
      //   dataset : '2',
      // }
      const { slide } = e.target.dataset;
      console.log(typeof slide);
      // gotoSlide(e.target.dataset.slide);
      gotoSlide(slide);
      activateDot(slide);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
    activateDot(curSlide);
  });

  const init = function () {
    gotoSlide(0);
    createDots();
    activateDot(0);
  };
  init();
};
slider();

//////////////////////////////////////////////////// 滑动轮播2
/*
      功能介绍:
              1. 自动循环轮播(新增)
              2. 按钮、黑点、键盘控制方向
              3. 无限循环切换
      需要扩展:
              1. 动画效果(fade渐变效果(思路: 轮播图需要在同一位置))
              2. 有限切换(到达最后一张停止切换)
              3. 黑点进行动画计时 ----待完成
*/

// const slider = function () {
//   const slides = document.querySelectorAll('.slide');
//   const btnLeft = document.querySelector('.slider__btn--left');
//   const btnRight = document.querySelector('.slider__btn--right');
//   const dotContainer = document.querySelector('.dots');

//   let curSlide = 0;
//   const maxSlide = slides.length;
//   // 初始动画效果
//   // slides.forEach((s) => (s.style.opacity = 0));
//   const goToSlide = function (slide) {
//     slides.forEach(
//       // 重点
//       (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
//     );
//   };

//   const createDots = function () {
//     slides.forEach(function (_, i) {
//       // 重点
//       dotContainer.insertAdjacentHTML(
//         'beforeend',
//         `<button class="dots__dot" data-slide="${i}"></button>`
//       );
//     });
//   };

//   const activateDot = function (slide) {
//     document
//       .querySelectorAll('.dots__dot')
//       .forEach(dot => dot.classList.remove('dots__dot--active'));
//     // 重点
//     document
//       .querySelector(`.dots__dot[data-slide="${slide}"]`)
//       .classList.add('dots__dot--active');
//   };

//   const prevSlide = function () {
//     // [0,1,2]
//     if (curSlide === 0) {
//       curSlide = maxSlide - 1;
//     } else {
//       curSlide--;
//     }
//     goToSlide(curSlide);
//     activateDot(curSlide);
//     clearInterval(time);
//   };

//   const nextslide = function () {
//     if (curSlide === maxSlide - 1) {
//       curSlide = 0;
//     } else {
//       curSlide++;
//     }
//     goToSlide(curSlide);
//     activateDot(curSlide);
//   };

//   const nextSlide = function () {
//     nextslide();
//     clearInterval(time);
//   };

//   const time = setInterval(() => {
//     nextslide();
//   }, 3000);

//   const init = function () {
//     goToSlide(0);
//     createDots();
//     activateDot(0);
//   };
//   init();

//   btnLeft.addEventListener('click', prevSlide);
//   btnRight.addEventListener('click', nextSlide);

//   dotContainer.addEventListener('click', function (e) {
//     // 重点
//     // 添加if判断防止出现报错
//     if (e.target.classList.contains('dots__dot')) {
//       const { slide } = e.target.dataset;
//       goToSlide(slide);
//       activateDot(slide);
//       clearInterval(time);
//     }
//   });

//   document.addEventListener('keydown', function (e) {
//     if (e.key === 'ArrowLeft') prevSlide();
//     e.key === 'ArrowRight' && nextSlide();
//   });
// };
// slider();

// 当我们说生命周期时， 我们的意思是从那一刻开始 该页面首先被访问，直到用户离开它。
// 让我们在此文件的末尾执行此操作。 现在，我们需要谈论的第一个事件 被称为 DOM 内容加载。
// 这个事件是由文档触发的 一旦 HTML 被完全解析， 这意味着 HTML 已被下载 并被转换为 DOM 树。
// 此外，必须下载并执行所有脚本 在 DOM 内容加载事件发生之前。 当然，我们可以收听那个事件， 并且因为它发生在文档上， 我们在文档上调用 add 事件监听器方法。 然后事件的名称是，正如我提到的， DOM 内容已加载。

// 现在这个事件实际上不等待图像和其他 要加载的外部资源。 好的。所以只需要加载 HTML 和 JavaScript。 所以现在让我们来看看这个事件或者基本上只是 将某些东西锁定到控制台。 所以 HTML、解析和 DOM 树
document.addEventListener('DOMContentLoaded', function (e) {
  // 解析 HTML 并构建 DOM 树！
  console.log('HTML parsed and DOM tree built!', e);
});
// 接下来还有加载事件，加载事件是 被窗户发射。一旦不仅解析了 HTML， 还有所有的图像和外部资源，比如 CSS 文件也被加载。
window.addEventListener('load', function (e) {
  // 页面完全加载
  console.log('Page fully loaded', e);
});

// 卸载前 弹出窗口
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });


    document.addEventListener('DOMContentLoaded', function (e) {
      console.log('HTML parsed and DOM tree built!', e);
    });

    window.addEventListener('load', function (e) {
      console.log('Page fully loaded', e);
    });

    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      console.log(e);
      e.returnValue = '';
    });

