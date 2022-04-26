'use strict';
    let secretNumber = Math.trunc(Math.random() * 20) + 1;
    let score = 20;
    let highScore = 0;
    document.querySelector('.score').textContent = score;

    document.querySelector('.check').addEventListener('click',function() {
        // 转换为数字类型
        const guess = Number(document.querySelector('.guess').value);
        console.log(guess, typeof guess);
        if (!guess) {
            document.querySelector('.message').textContent = '⛔️ No number!';
        } else if (guess !== secretNumber) {
            if (score > 1) {
                document.querySelector('.message').textContent = guess > secretNumber ? 'Too high!' : 'Too low!';
                score--;
                document.querySelector('.score').textContent = score;
            } else {
                document.querySelector('.message').textContent = 'You lost game!';
                document.querySelector('.score').textContent = 0;
            }
        }
        // } else if (guess === secretNumber) {
        //     document.querySelector('.message').textContent = 'Correct Number!';
        //     // CSS中两个属性的 需要使用驼峰表示法
        //     document.querySelector('body').style.backgroundColor = '#60b347';
        //     // CSS属性单位 需要使用字符串形式,且不可以忽略单位
        //     document.querySelector('.number').style.width = '30rem';
            
        //     // 如果得分大于最高分，将修改得分
        //     if(score > highScore) {
        //         document.querySelector('.highscore').textContent = score;
        //     } 
        // } else if (guess > secretNumber) {
        
        //     if (score > 1) {
        //         document.querySelector('.message').textContent = 'Too high!';
        //         score--;
        //         document.querySelector('.score').textContent = score;
        //     } else {
        //         document.querySelector('.message').textContent = 'You lost the game!';
        //         document.querySelector('.score').textContent = 0;
        //     }
        // } else if (guess < secretNumber) {
        //     if (score > 1) {
        //         document.querySelector('.message').textContent = '📉Too low!';
        //         score--;
        //         document.querySelector('.score').textContent = score;
        //     } else {
        //         document.querySelector('.message').textContent = 'You lost the game!';
        //         document.querySelector('.score').textContent = 0;
        //     }
        // }
    });


    document.querySelector('.again').addEventListener('click', function() {
        score = 20;
        secretNumber = Math.trunc(Math.random() * 20) + 1;
        document.querySelector('.message').textContent = 'Start guessing...';
        document.querySelector('body').style.backgroundColor = '#222';
        document.querySelector('.number').textContent = '?';
        document.querySelector('.number').style.width = '15rem';
        document.querySelector('.guess').value = '';
    });