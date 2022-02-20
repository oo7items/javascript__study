/*
  封装功能为了重复使用、方便查看、积累经验、创新轮子
  坚持每天学习，可能无法改变自己，但一定不会浪费生命
*/
oo7items = function () {
  ////////////////////////////////// 滑动轮播

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
        a) 悬停导航时变换透明度
        b) 离开导航时恢复透明度
      2. 知识点
        a) 
  */
  function handleHover(nav, link, img) {
    const changeOpacity = function (e) {
      if (e.target.classList.contains(link.substring(1))) {
        const link = e.target;
        // 兄弟姐妹 --重点
        const siblings = link.closest(tar).querySelectorAll(link);
        const logo = link.closest(tar).querySelector(img);
        siblings.forEach(el => {
          if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
      }
    };
    nav.addEventListener('mouseover', changeOpacity.bind(0.5));
    nav.addEventListener('mouseout', changeOpacity.bind(1));
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
    功能说明:
        0. 类名介绍
          a) operations__tab-container 监听事件目标
          b) operations__tab 点击目标元素
          c) operations__content 目标内容
          d) operations__tab--active 点击目标状态样式
          e) operations__tab--active 目标内容状态样式
        1. 功能介绍
          0. 点击不同目标显示不同内容
        2. 注意事项
          0. 原版方法使用data-tab dataset 进行选项卡操作
          1. 封装方法使用 href="xxx" getAttribute 进行选项卡操作(为了结合eyoucms程序搭建)
        3. 知识点
          a) dataset和getAttribute的区别
            (1) .dataset专业操作data方式定义属性，而setAttribute()和getAttribute()操作所有的属性
            (2) .elem.dataset获取的属性是elem.attributes的子集
          
  */
  function operationsTab(tabsContainer, tabs, tabsContent) {
    document
      .querySelector(tabsContainer)
      .addEventListener('click', function (e) {
        // 阻止默认事件
        e.preventDefault();
        const clicked = e.target.closest(tabs);
        // 没有目标返回函数
        if (!clicked) return;
        // 初始化样式
        document
          .querySelectorAll(tabs)
          .forEach(t => t.classList.remove(`${tabs.substring(1)}--active`));
        document
          .querySelectorAll(tabsContent)
          .forEach(c =>
            c.classList.remove(`${tabsContent.substring(1)}--active`)
          );
        // 添加样式
        // tabs.substring(1)去掉(字符串第一位)类名前面的(.)
        // tabs.substr(1)旧方式会被遗弃
        clicked.classList.add(`${tabs.substring(1)}--active`);
        document
          .querySelector(clicked.getAttribute('href'))
          .classList.add(`${tabsContent.substring(1)}--active`);
      });
  }

  ////////////////////////////////// 滚动监听(Sticky)

  ////////////////////////////////// 保留样式
  function keepStyle(nav, link, addClass) {
    document.querySelector(nav).addEventListener('mouseover', cur => {
      const btn = cur.nav.closest(addClass);
      if (!btn) return;
      // clearAllClass(link, addClass);
      document
        .querySelectorAll(link)
        .forEach(l => l.classList.remove(addClass));
      btn.classList.add(addClass);
    });
  }

  ////////////////////////////////// 选择框

  return (oo7items = {
    operationsTab: (tabsContainer, tabs, tabsContent) =>
      operationsTab(tabsContainer, tabs, tabsContent),
    handleHover: (nav, link, img) => handleHover(nav, link, img),
    keepStyle: (nav, link, addClass) => keepStyle(nav, link, addClass),
  });
};
