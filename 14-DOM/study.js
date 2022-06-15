oo7items = (function () {
  ////////////////////////////////// 清除目标类名(公共功能)
  function clearAllClass(tar, classItem) {
    Array.from(document.querySelectorAll(`${tar},${tar} *`)).forEach(cur =>
      cur.classList.remove(classItem)
    );
  }
  ////////////////////////////////// 滑动轮播(简单版)
  /*
    HTML结构:
      <div class="container">
        <a class="link" href="#id1">1</a>
        <a class="link" href="#id2">2</a>
        <a class="link" href="#id3">3</a>
      </div> 
      <div id="id1">1</div>
      <div id="id2">2</div>
      <div id="id3">3</div>
    使用说明:
        0. 类名介绍
          a) container 事件监听目标
          b) link 事件监听目标元素
        1. 注意事项
          a) 通过href属性获取滚动目标id ----重点
          b) 注意对象属性的值不能为数字，除非使用map
        2. 知识点
          a) 运用新方法scrollIntoView({ behavior: "smooth"})
    */
  function smoothScroll(container, link) {
    document.querySelector(container).addEventListener('click', function (e) {
      e.preventDefault();
      if (e.target.classList.contains(link.substring(1))) {
        // 获取属性
        const id = e.target.getAttribute('href');
        console.log(id);
        // 滚动到视图
        document.querySelector(id).scrollIntoView({
          // 行为
          behavior: 'smooth',
        });
        ///// 旧方法
        // Scrolling
        // 获取滚动目标边界客户端矩形 ----重点
        // const s1coords = section1.getBoundingClientRect();
        // 注意滚动距离是相对于视口的，会根据视口进行变换
        // window.scrollTo(s1coords.left, s1coords.top);
        // 视口距离+页面距离 => 需滚动距离
        // window.scrollTo({
        //   left: s1coords.left + window.pageXOffset,
        //   top: s1coords.top + window.pageYOffset,
        //   behavior: "smooth",
        // });
      }
    });
  }

  ////////////////////////////////// 滚动监听(粘性导航)
  // Nav 导航 Header监听目标元素
  // section参数可以传入数组，如何分解数组并执行功能
  function scorllStickyNav(Nav, Header) {
    const nav = document.querySelector(Nav);
    const header = document.querySelector(Header);
    // 获取用户边界矩形信息 React 矩形 Bounding边界
    const navHeight = nav.getBoundingClientRect().height;

    const stickyNav = function (entries) {
      const [entry] = entries;
      // console.log(entry);
      // 开始isIntersecting: true因为我们监听header,header存在于开始的整个浏览器窗口，因此当我们完全离开header目标区域时，才会触发回调isIntersecting: true
      // 因此，当我们离开目标区域时，添加 ----重点
      // 进入目标区域时，删除
      console.log(entry);
      if (!entry.isIntersecting) nav.classList.add('sticky');
      else nav.classList.remove('sticky');
    };

    const headerObserver = new IntersectionObserver(stickyNav, {
      root: null, // 浏览器窗口
      threshold: 0, // 完全没有出现在全局中
      rootMargin: `-${navHeight}px`,
    });

    headerObserver.observe(header);
  }

  ////////////////////////////////// 慵懒加载图片
  function imgLoading(tar, className) {
    const imgTargets = document.querySelectorAll(tar);
    const imgHeight = document
      .querySelector(tar)
      .getBoundingClientRect().height;
    const loadImg = function (entries, observer) {
      const [entry] = entries;
      // 保护协议
      if (!entry.isIntersecting) return;
      // 替换图片
      entry.target.src = entry.target.dataset.src;
      window.addEventListener('load', function () {
        // 图片加载完毕后去掉模糊
        entry.target.classList.remove(className.substring(1));
      });
      // 关闭执行监听执行过的目标
      observer.unobserve(entry.target);
    };

    const imgObserver = new IntersectionObserver(loadImg, {
      root: null,
      threshold: 0,
      rootMargin: `-${imgHeight}px`,
    });

    imgTargets.forEach(img => imgObserver.observe(img));
  }

  ////////////////////////////////// 滚动监听(动画效果)
  /*
      HTML结构:
         <section class="section section--hidden"></section>
      Css结构:
          .section {
              transition: transform 1s linear, opacity 1s linear;
            }
            .section--hidden {
              opacity: 0;
              transform: translateY(8rem);
            }
      使用说明:
          0. 类名介绍
            a) sections 需要监听目标(可以是多个目标)
            b) className 动画类名(删除类名完成动画，不是添加类名完成动画)
          1. 扩展内容 -------- 重点 
            a) 无限监听动画效果
            b) 结合animate.css库实现滚动监听动画的多样性
          2. 知识点
            a) 此监听动画是通过删除类名的方式完成滚动监听动画效果
    */
  function scrollAnimation(sections, className) {
    const revealSections = function (entries, observer) {
      const [entry] = entries;

      console.log(entries, observer);
      // 保护协议 返回函数
      if (!entry.isIntersecting) return;
      entry.target.classList.remove(className.substring(1));

      // 执行完毕动画后我们将不在观察，避免重复返回回调
      observer.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(revealSections, {
      root: null,
      threshold: 0.15,
    });
    const allSections = document.querySelectorAll(sections);
    allSections.forEach(function (section) {
      sectionObserver.observe(section);
      section.classList.add(className.substring(1));
    });
  }

  ////////////////////////////////// 操作选项卡
  /*
      HTML解构:
          <section class="operations">
            <div class="operations">
              // 选择区域
              <div class="operations__tab-container">
                <a
                  href="#operations__content--1"
                  class="operations__tab operations__tab--active"
                >
                  产品1
                </a>
                <a href="#operations__content--2" class="operations__tab">
                  产品2
                </a>
              </div>
  
              // 内容区域
              <div
                class="operations__content operations__content--active"
                id="operations__content--1"
              >
                11111
              </div>
              <div class="operations__content" id="operations__content--2">
                22222
              </div>
            </div>
          </section>
      使用文档:
          0. 类名介绍
            a) container 操作标签容器
            b) tab 操作标签 (--active) 点击标签后显示状态样式
            c) content 操作标签内容(--active) 点击标签后显示内容状态
          1. 功能介绍
            0. 点击不同目标显示不同内容
          2. 注意事项
            0. 状态类名命名方式为('targetElement--active')后缀为--active
            1. 原版是data-tab dataset 进行选项卡操作，封装的是 href="xxx" getAttribute(结合eyou)
            2. 事件名可改为mouseover，悬停显示内容
          3. 知识点
            a) dataset和getAttribute的区别
              (1) .dataset专业操作data方式定义属性，而setAttribute()和getAttribute()操作所有的属性
              (2) .elem.dataset获取的属性是elem.attributes的子集
            b) tabs.substring(1)去掉(字符串第一位)类名前面的(.) tabs.substr(1)旧方式会被遗弃
            
    */
  function operationsTab(container, tab, content) {
    const tabsContainer = document.querySelector(container);
    const tabs = document.querySelectorAll(tab);
    const tabsContent = document.querySelectorAll(content);
    tabsContainer.addEventListener('click', function (e) {
      // 阻止默认事件
      e.preventDefault();
      // 防止点击点其他子元素
      const clicked = e.target.closest(tab);
      // 没有目标返回函数
      if (!clicked) return;
      // 初始化样式
      tabs.forEach(t => t.classList.remove(`${tab.substr(1)}--active`));
      tabsContent.forEach(c =>
        c.classList.remove(`${content.substr(1)}--active`)
      );
      // 添加样式
      clicked.classList.add(`${tab.substring(1)}--active`);
      document
        .querySelector(clicked.getAttribute('href'))
        .classList.add(`${content.substring(1)}--active`);
    });
  }
  ////////////////////////////////// 处理悬停(透明度变换)
  /*
      HTML解构:
        <nav class="nav">
          <img
            src="img/logo.png"
            alt="Bankist logo"
            class="nav__logo"
            id="logo"
          />
          <ul class="nav__links">
            <li class="nav__item">
              <a class="nav__link" href="#section--1">Features</a>
            </li>
            <li class="nav__item">
              <a class="nav__link" href="#section--2">Operations</a>
            </li>
            <li class="nav__item">
              <a class="nav__link" href="#section--3">Testimonials</a>
            </li>
            <li class="nav__item">
              <a class="nav__link nav__link--btn btn--show-modal" href="#"
                >Open account</a
              >
            </li>
          </ul>
        </nav>
      功能说明:
        0. 类名介绍
          a) nav 监听事件目标
          b) link 悬停目标元素
          c) img 导航栏LOGO
        1. 功能介绍
          a) 鼠标悬停与离开时会变换其它元素透明度
        2. 知识点
          a) closest自底向上选择，querySelector自上向下选择(DOM)
          b) 点击事件传递函数不能设置参数，采用bind()方法传递参数，内部通过this获取参数
          c) 将相同功能防止在一个函数中，分别用于悬停与离开两个事件监听中(代码编写简介)
    */
  function handleHover(nav, link, img) {
    const changeOpacity = function (e) {
      if (e.target.classList.contains(link.substring(1))) {
        const hover = e.target;
        console.log(hover);

        // 兄弟姐妹 --重点
        const siblings = hover.closest(nav).querySelectorAll(link);
        // const siblings = document.querySelectorAll(link);

        const logo = hover.closest(nav).querySelector(img);
        siblings.forEach(el => {
          if (el !== hover) el.style.opacity = this;
        });
        logo.style.opacity = this;
      }
    };
    document
      .querySelector(nav)
      .addEventListener('mouseover', changeOpacity.bind(0.5));
    document
      .querySelector(nav)
      .addEventListener('mouseout', changeOpacity.bind(1));
  }

  ////////////////////////////////// 下拉框
  /*
      HTML结构:
        <div class="operations__dropdown-container">
          <div class="operations__dropdown-header">
            <span class="operations__dropdown-title">产品一</span>
            <i class="fas fa-chevron-down operations__dropdown-icon"></i>
          </div>
          <div class="operations__dropdown-list">
            <a href="#operations__content--1" class="operations__dropdown">
              产品一
            </a>
            <a href="#operations__content--1" class="operations__dropdown">
              产品二
            </a>
            <a href="#operations__content--1" class="operations__dropdown">
              产品三
            </a>
            <a href="#operations__content--1" class="operations__dropdown">
              产品四
            </a>
          </div>
        </div>
      使用文档:
         类名介绍:
          0. container 下拉框容器
          1. list  下拉框列表 (--active) 点击后打开列表状态样式
          2. link 下拉框列表项目 (--active) 保持点击后显示状态样式
          3. title 下拉框标题
          4. icon 下拉框图标类名
          5. iconDown 外部图标类名
          6. iconDown 外部切换图标类名
          后续事项:
            0. 只能用于单选框
            1. 后续扩展为手风琴 ----重点
            
          知识点:
            0. 父元素添加点击事件，点击任何子元素都会触发toggle切换样式
            1. 不要忘记querySelect选择类名
            2. &__dropdown-list 中
              a) visibility: hidden; 隐藏元素，但占据空间
              b) overflow: hidden; 防止出现高度由底向上变化(重点-没有理解)
              c) 通过height进行下拉框变换 
            3. dropContainer.classList.toggle(`${container.substring(1)}--active`);
              a) 只切换主类名，通过主类名进行子元素的类名状态定义 ----(重点)
    */
  function dropdownBox(container, list, link, title, icon, iconDown, iconUp) {
    const dropContainer = document.querySelector(container);
    const dropList = document.querySelector(list);
    const dropLink = document.querySelectorAll(link);
    const dropTitle = document.querySelector(title);
    const dropIcon = document.querySelector(icon);
    dropContainer.addEventListener('click', function (e) {
      e.preventDefault();
      dropContainer.classList.toggle(`${container.substring(1)}--active`);
      dropList.classList.toggle(`${list.substring(1)}--active`);
      if (dropIcon.classList.contains(iconDown)) {
        dropIcon.classList.remove(iconDown);
        dropIcon.classList.add(iconUp);
      } else {
        dropIcon.classList.remove(iconUp);
        dropIcon.classList.add(iconDown);
      }
      // 替换列表文字
      const click = e.target.closest(link);
      if (!click) return;
      dropTitle.textContent = click.textContent;
      dropLink.forEach(el =>
        el.classList.remove(`${link.substring(1)}--active`)
      );
      click.classList.add(`${link.substring(1)}--active`);
    });
  }

  ////////////////////////////////// 保留样式
  function keepStyle(id, tarClassItem, addClassItem) {
    document.querySelector(id).addEventListener('mouseover', cur => {
      const btn = cur.target.closest(tarClassItem);
      if (!btn) return;
      clearAllClass(tarClassItem, addClassItem);
      btn.classList.add(addClassItem);
    });
  }

  return (oo7items = {
    operationsTab: (container, tab, content) =>
      operationsTab(container, tab, content),
    handleHover: (nav, link, img) => handleHover(nav, link, img),
    keepStyle: (id, tarClassItem, addClassItem) =>
      keepStyle(id, tarClassItem, addClassItem),
    dropdownBox: (container, list, link, title, icon, iconDown, iconUp) =>
      dropdownBox(container, list, link, title, icon, iconDown, iconUp),
    smoothScroll: (container, link, scroll) =>
      smoothScroll(container, link, scroll),
    scorllStickyNav: (Nav, Header) => scorllStickyNav(Nav, Header),
    scrollAnimation: (sections, className) =>
      scrollAnimation(sections, className),
    imgLoading: (tar, className) => imgLoading(tar, className),
  });
})();

// const allSections = document.querySelectorAll(".section");
// // 显示部分
// const revealSections = function (entries, observer) {
//   const [entry] = entries;
//   // console.log(entry); // IntersectionObserverEntry 交叉点观察者入口
//   // console.log(observer); // IntersectionObserver 路口观察员
//   // 开始时，是没有相交的，因此isIntersecting: false
//   // 添加一个保护协议，在没有相交时，我们返回函数
//   // 不添加，会出现无法触发第一个section监听
//   if (!entry.isIntersecting) return;
//   entry.target.classList.remove("section--hidden");
// };

// const sectionObserver = new IntersectionObserver(revealSections, {
//   root: null,
//   threshold: 0.15, // 1代表目标完全出现在浏览器窗口时触发，0代表目标完全不在浏览器窗口时触发, 0.15 代表目标出现比列占用窗口比例的百分之15时触发
// });

// allSections.forEach(function (section) {
//   sectionObserver.observe(section);
//   section.classList.add("section--hidden");
// });

// const section1 = document.querySelector("#section--1");
// const nav = document.querySelector(".nav");

// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords); // 相对于视口

// window.addEventListener("scroll", function () {
//   console.log(window.scrollY); // 相对于视口

//   //  事件监听和调用 Element.getBoundingClientRect() 都是在主线程上运行，因此频繁触发、调用可能会造成性能问题。这种检测方法极其怪异且不优雅
//   // 会不停的触发高度的变换，进行比较，会造成性能问题
//   if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });

/* 滑动轮播 
  
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
//   const slides = document.querySelectorAll(".slide");
//   const btnLeft = document.querySelector(".slider__btn--left");
//   const btnRight = document.querySelector(".slider__btn--right");
//   const dotContainer = document.querySelector(".dots");

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
//         "beforeend",
//         `<button class="dots__dot" data-slide="${i}"></button>`
//       );
//     });
//   };

//   const activateDot = function (slide) {
//     document
//       .querySelectorAll(".dots__dot")
//       .forEach((dot) => dot.classList.remove("dots__dot--active"));
//     // 重点
//     document
//       .querySelector(`.dots__dot[data-slide="${slide}"]`)
//       .classList.add("dots__dot--active");
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

//   btnLeft.addEventListener("click", prevSlide);
//   btnRight.addEventListener("click", nextSlide);

//   dotContainer.addEventListener("click", function (e) {
//     // 重点
//     // 添加if判断防止出现报错
//     if (e.target.classList.contains("dots__dot")) {
//       const { slide } = e.target.dataset;
//       goToSlide(slide);
//       activateDot(slide);
//       clearInterval(time);
//     }
//   });

//   document.addEventListener("keydown", function (e) {
//     if (e.key === "ArrowLeft") prevSlide();
//     e.key === "ArrowRight" && nextSlide();
//   });
// };
// slider();

// 导航栏动画
// const nav = document.querySelector(".nav");
// const handleHover = function (e) {
//   // 确定描点元素位置
//   if (e.target.classList.contains("nav__link")) {
//     const link = e.target;
//     // 兄弟姐妹 --重点
//     const siblings = link.closest(".nav").querySelectorAll(".nav__link");
//     const logo = link.closest(".nav").querySelector("img");
//     siblings.forEach((el) => {
//       if (el !== link) el.style.opacity = this;
//     });
//     logo.style.opacity = this;
//   }
// };

// nav.addEventListener("mouseover", handleHover.bind(0.5));
// nav.addEventListener("mouseout", handleHover.bind(1));

// 平滑滚动
// 1. 将事件侦听器添加到公共父元素
// 2. 确定是什么元素引发了事件
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
// 等待图片 --重点
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  // 获取边界客户端矩形; 相对于视口
  console.log(e.target.getBoundingClientRect());

  // 元素相对于页面滚动了多少元素
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  // 当前视口的整体宽度与高度
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  section1.scrollIntoView({ behavior: 'smooth' });
});

// const dropContainer = document.querySelector(".operations__dropdown-container");
// const drops = document.querySelectorAll(".operations__dropdown");
// const list = document.querySelector(".operations__dropdown-list");
// const header = document.querySelector(".operations__dropdown-header");
// const title = document.querySelector(".operations__dropdown-title");
// const icon = document.querySelector(".operations__dropdown-icon");

// dropContainer.addEventListener("click", function (e) {
//   // 阻止元素默认操作
//   e.preventDefault();
//   list.classList.toggle("operations__dropdown-list--active");
//   if (icon.classList.contains("fa-chevron-down")) {
//     icon.classList.remove("fa-chevron-down");
//     icon.classList.add("fa-chevron-up");
//   } else {
//     icon.classList.remove("fa-chevron-up");
//     icon.classList.add("fa-chevron-down");
//   }
// });
// list.addEventListener("click", function (e) {
//   e.preventDefault();
//   const click = e.target.closest(".operations__dropdown");
//   if (!click) return;
//   document.querySelector(".operations__dropdown-title").textContent =
//     click.textContent;
// });

// ////////////// 只能用于单个，后期扩展为多个(扩展为手风琴)
// const olink = document.querySelectorAll('.product__dropdown');
// const odiv = document.querySelectorAll('.product__dropdown-list');
// const title = document.querySelector('.product__dropdown-title');
// const link = document.querySelectorAll('.product__dropdown-link');
// const icon = document.querySelector('.product__dropdown-icon');

// // 获得元素索引
// for (i = 0; i < olink.length;i++) {
//     olink[i].index = i;
// }

// function Show_Hidden(obj) {
//     obj.classList.toggle("product__dropdown-list--active");
//         if (icon.classList.contains("fa-chevron-down")) {
//             icon.classList.remove("fa-chevron-down");
//             icon.classList.add("fa-chevron-up");
//         } else {
//             icon.classList.remove("fa-chevron-up");
//             icon.classList.add("fa-chevron-down");
//         }
//     stopBubble();
// }
// // 取消冒泡
// /*
// */
// function stopBubble(e){
//     if (e && e.stopPropagation){
//         e.stopPropagation();  //w3c
//     } else {
//         window.event.cancelBubble=true; //IE
//     }
// }

// olink.forEach(el => el.onclick = function(){
//     Show_Hidden(odiv[el.index]);

//     // window.onclick = function(){
//     //     odiv.forEach( el => el.classList.toggle("product__dropdown-list--active"));
//     //         document.onclick=null;
//     // }
// });

// link.forEach(el => el.onclick = function() {
//     title.textContent = `${el.textContent}`;
// });
