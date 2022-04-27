'use strict';
    let secretNumber = Math.trunc(Math.random() * 20) + 1;
    let score = 20;
    let highScore = 0;
    document.querySelector('.score').textContent = score;

    const displayMessage = function(message) {
        document.querySelector('.message').textContent = message;
    }

    document.querySelector('.check').addEventListener('click',function() {
        // 转换为数字类型
        const guess = Number(document.querySelector('.guess').value);
        console.log(guess, typeof guess);
        if (!guess) {
            displayMessage('No number!');
        } else if (guess === secretNumber) {
            displayMessage('Correct Number!');
            document.querySelector('.number').textContent = secretNumber;
        }
         else if (guess !== secretNumber) {
            if (score > 1) {
                displayMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
                score--;
                document.querySelector('.score').textContent = score;
            } else {
                displayMessage('You lost game!');
                document.querySelector('.score').textContent = 0;
            }
        }
    });


    document.querySelector('.again').addEventListener('click', function() {
        score = 20;
        secretNumber = Math.trunc(Math.random() * 20) + 1;
        displayMessage('Start guessing...');
        document.querySelector('body').style.backgroundColor = '#222';
        document.querySelector('.number').textContent = '?';
        document.querySelector('.number').style.width = '15rem';
        document.querySelector('.guess').value = '';
    });