'use strict';

import PopUp from './popup.js';
import * as sound from './sound.js';

const L1_WALDO_MIN_X = 610;
const L1_WALDO_MAX_X = 630;
const L1_WALDO_MIN_Y = 205;
const L1_WALDO_MAX_Y = 256;

const L2_WALDO_MIN_X = 750;
const L2_WALDO_MAX_X = 775;
const L2_WALDO_MIN_Y = 160;
const L2_WALDO_MAX_Y = 200;

const L3_WALDO_MIN_X = 55;
const L3_WALDO_MAX_X = 77;
const L3_WALDO_MIN_Y = 333;
const L3_WALDO_MAX_Y = 360;

const L4_WALDO_MIN_X = 560;
const L4_WALDO_MAX_X = 580;
const L4_WALDO_MIN_Y = 208;
const L4_WALDO_MAX_Y = 252;

const L5_WALDO_MIN_X = 22;
const L5_WALDO_MAX_X = 38;
const L5_WALDO_MIN_Y = 530;
const L5_WALDO_MAX_Y = 567;

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
        this.popUp = document.querySelector('.pop-up');
        this.icon = document.querySelector('.fas');

        this.started = false;
        this.level = 1;
        this.live = 5;
        this.timer = undefined;
        this.gameBtn.addEventListener('click', () => {
            this.start();
            sound.playFound();
        });
        this.gameBanner = new PopUp();
        this.gameField.addEventListener('click', this.onFieldClick);
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
        this.activePointer();
        sound.playBg();
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
                this.deactivePointer();
                sound.playAlert();
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
            this.deactivePointer();
            sound.playAlert();
        }
    }

    deactivePointer() {
        this.gameField.style.pointerEvents = 'none';
    }

    activePointer() {
        this.gameField.style.pointerEvents = 'auto';
    }

    finish(win) {
        this.started = false;
        this.stopTimer();
        this.onGameStop && this.onGameStop(win ? 'win' : 'lose');
        this.showReplayIcon();
        sound.stopBg();
    }

    init(failedLevel) {
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

    onFieldClick = (e) => {
        const clicked = e.target.className;
        const waldoX = e.offsetX;
        const waldoY = e.offsetY;

        if (clicked === 'game__field level--1') {
            if (waldoX > L1_WALDO_MIN_X && waldoX < L1_WALDO_MAX_X && waldoY >  L1_WALDO_MIN_Y && waldoY < L1_WALDO_MAX_Y) {
                this.level++;
                this.onGameStop && this.onGameStop('pass');
                this.stopTimer();
                sound.playFound();
                } else {
                    this.reduceLive();
                    sound.playWrong();
                }
        } else if (clicked === 'game__field level--2') {
            if (waldoX > L2_WALDO_MIN_X && waldoX < L2_WALDO_MAX_X && waldoY >  L2_WALDO_MIN_Y && waldoY < L2_WALDO_MAX_Y) {
                this.level++;
                this.onGameStop && this.onGameStop('pass');
                this.stopTimer();
                sound.playFound();
                } else {
                       this.reduceLive();
                       sound.playWrong();
                }
        } else if (clicked === 'game__field level--3') {
            if (waldoX > L3_WALDO_MIN_X && waldoX < L3_WALDO_MAX_X && waldoY >  L3_WALDO_MIN_Y && waldoY < L3_WALDO_MAX_Y) {
                this.level++;
                this.onGameStop && this.onGameStop('pass');
                this.stopTimer();
                sound.playFound();
            } else {
                   this.reduceLive();
                   sound.playWrong();
            }
        } else if (clicked === 'game__field level--4') {
            if (waldoX > L4_WALDO_MIN_X && waldoX < L4_WALDO_MAX_X && waldoY >  L4_WALDO_MIN_Y && waldoY < L4_WALDO_MAX_Y) {
                this.level++;
                this.onGameStop && this.onGameStop('pass');
                this.stopTimer();
                sound.playFound();
            } else {
                   this.reduceLive();
                   sound.playWrong();
            }
        } else if (clicked === 'game__field level--5') {
            if (waldoX > L5_WALDO_MIN_X && waldoX < L5_WALDO_MAX_X && waldoY >  L5_WALDO_MIN_Y && waldoY < L5_WALDO_MAX_Y) {
                    this.finish(true);
                    this.stopTimer();
                    sound.playWin();
            } else {
                   this.reduceLive();
                   sound.playWrong();
            }
        }
    }   
}