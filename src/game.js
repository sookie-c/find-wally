'use strict';

export default class Game {
    constructor(gameDuration) {
        this.gameDuration = gameDuration;
        
        this.gameBtn = document.querySelector('.game__button');
        this.gameStart = document.querySelector('.game__start');
        this.gameHeader = document.querySelector('.game__header');
        this.gameLevel = document.querySelector('.game__level');
        this.gameLive = document.querySelector('.game__live');
        this.gameTimer = document.querySelector('.game__timer');
        this.gameField = document.querySelector('.game__field');
        this.icon = document.querySelector('.fas');

        this.started = false;
        this.level = 1;
        this.live = 5;
        this.timer = undefined;
        this.gameBtn.addEventListener('click', () => {
            this.start();
            //playSound(foundSound);
        });
    }

    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }
    
    start() {
        this.started = true;
        this.hideStartPage();
        this.showHeader();
        this.showLive();
        this.showLevel();
        this.startTimer();
        console.log('started');
        //playSound(bgSound);
    }

    showStartPage() {
        this.gameStart.style.display = 'flex';
        this.gameHeader.style.display = 'none';
    }

    hideStartPage() {
        this.gameStart.style.display = 'none';
    }

    showHeader() {
        this.gameHeader.style.display = 'flex';
    }

    showLive() {
        this.gameLive.textContent = `♥️ x ${this.live}`;
    }
    
    showLevel() {
        this.gameLevel.innerText = `Level ${this.level}`;
    }

    updateLevel() {
        this.gameLevel.innerText = `Level ${this.level}`;
    }

    nextLevel() {
        this.gameField.classList.remove(`level--${this.level-1}`);
        this.gameField.classList.add(`level--${this.level}`);
    }
    
    startTimer () {
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval( () => {
            if (remainingTimeSec <= 0) {
                clearInterval(this.timer);
                this.finish(false);
                //playSound(alertSound);
                return;
            }
            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    updateTimerText(time) {
        let minute = Math.floor(time / 60);
        let second = time % 60;
        if (second >= 0 && second < 10) {
            second = '0' + second;
        }
        this.gameTimer.innerText = `${minute}:${second}`;
    }

    reduceLive() {
        this.live--;
        this.showLive();
        if (this.live <= 0) {
            this.started = false;
            this.finish(false);
            //showWithText('lose');
            //this.onGameStop && this.onGameStop('lose');
            //playSound(alertSound);
        }
    }

    finish(win) {
        this.started = false;
        this.stopTimer();
        this.onGameStop && this.onGameStop(win ? 'win' : 'lose');
        this.showReplayIcon();
        //stopSound(bgSound);
    }

    initGame(failedLevel) {
        this.level = 1;
        this.live = 5;
        this.gameField.classList.remove(`level--${failedLevel}`);
        this.gameField.classList.add('level--1');
        this.showStartPage();
        this.showPlayIcon();
    }

    showPlayIcon() {
        this.icon.classList.add('fa-play');
        this.icon.classList.remove('fa-undo-alt');
    }

    showReplayIcon() {
        this.icon.classList.add('fa-undo-alt');
        this.icon.classList.remove('fa-play');
    }
}