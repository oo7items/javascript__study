'use strict';
// 操纵类实际上是我们操作网页的主要方式
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    const btnCloseModal = document.querySelector('.close-modal');
    const btnsOpenModal = document.querySelectorAll('.show-modal');

    for(let i = 0; i < btnsOpenModal.length; i++) {
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

    const openModal = function () {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    }

    const closeModal = function () {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    }

    for (let i = 0; i < btnsOpenModal.length; i++) {
        btnsOpenModal[i].addEventListener('click', openModal);
    }

    overlay.addEventListener('click', closeModal);
    btnCloseModal.addEventListener('click', closeModal);

    document.addEventListener('keydown', function(e) {
        console.log(e);
    })