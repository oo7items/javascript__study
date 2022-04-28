'use strict';
// 操纵类实际上是我们操作网页的主要方式
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    const btnCloseModal = document.querySelectorAll('.close-modal');
    const btnsOpenModal = document.querySelectorAll('.show-modal');

    for(let i = 0; i < btnsOpenModal.length; i++) {
        // console.log(btnsOpenModal[i].textContent);
        btnsOpenModal[i].addEventListener('click',function() {
            console.log('Button clicked!');
            modal.classList.remove('hidden');
            overlay.classList.remove('hidden');
        });
    }

    for(let i = 0; i < btnCloseModal.length; i++) {
        btnCloseModal[i].addEventListener('click', function() {
            modal.classList.add('hidden');
            overlay.classList.add('hidden');
        })
    }