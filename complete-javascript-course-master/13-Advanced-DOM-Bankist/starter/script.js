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



// btnScrollTo.addEventListener('click', function(e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);

//   console.log(e.target.getBoundingClientRect());

//   console.log('Current scroll (x/y)', window.pageXOffset, window.pageYOffset);

//   console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth)

//   console.log(section1.left)
// })

    const btnScrollTo = document.querySelector('.btn--scroll-to');
    const section1 = document.querySelector('#section--1');

    btnScrollTo.addEventListener('click', function (e) {
      const s1coords = section1.getBoundingClientRect();
      console.log(s1coords);

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

