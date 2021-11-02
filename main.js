'use strict';

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

const GAME_DURATION_SEC = 120;

const gameBtn = document.querySelector('.game__button');
const gameStart = document.querySelector('.game__start');
const gameHeader = document.querySelector('.game__header');
const gameField = document.querySelector('.game__field');
const gameLevel = document.querySelector('.game__level');
const gameLive = document.querySelector('.game__live');
const gameTimer = document.querySelector('.game__timer');
const popUp = document.querySelector('.pop-up');
const popUpRefresh = document.querySelector('.pop-up__refresh');
const popUpMessage = document.querySelector('.pop-up__message');
const icon = document.querySelector('.fas');

let started = false;
let level = 1;
let live = 5;
let popUpOn = false;
let timer = undefined;

gameBtn.addEventListener('click', () => {
    startGame();
});

function startGame() {
    started = true;
    hideStartPage();
    showGameHeader();
    showLive();
    showLevel();
    startGameTimer();
}

function finishGame(win) {
    started = false;
    showPopUpWithText(win ? 'Congrats! You completed' : 'Game Over');
    stopGameTimer();
}

function showGameHeader() {
    gameHeader.style.display = 'flex';
}

function showLive() {
    gameLive.textContent = `♥️ x ${live}`;
}

function showLevel() {
    gameLevel.innerText = `Level ${level}`;
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval( () => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(false);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(time) {
    let minute = Math.floor(time / 60);
    let second = time % 60;
    if (second >= 0 && second < 10) {
        second = '0' + second;
    }
    gameTimer.innerText = `${minute}:${second}`;
}

function showStartPage() {
    gameStart.style.display = 'flex';
    gameHeader.style.display = 'none';
}

function hideStartPage() {
    gameStart.style.display = 'none';
}

gameField.addEventListener('click', onFieldClick);

function onFieldClick(e) {
    const clicked = e.target.className;
    const waldoX = e.offsetX;
    const waldoY = e.offsetY;

    if (popUpOn) {
        return;
    }
    if (clicked === 'game__field level--1') {
        if (waldoX > L1_WALDO_MIN_X && waldoX < L1_WALDO_MAX_X && waldoY > L1_WALDO_MIN_Y && waldoY < L1_WALDO_MAX_Y) {
            level++;
            showPopUpWithText('Found it! Next Stage?');
            stopGameTimer();
            } else {
                reduceLive();
            }
    } else if (clicked === 'game__field level--2') {
        if (waldoX > L2_WALDO_MIN_X && waldoX < L2_WALDO_MAX_X && waldoY > L2_WALDO_MIN_Y && waldoY < L2_WALDO_MAX_Y) {
            level++;
            showPopUpWithText('Found it! Next Stage?');
            stopGameTimer();
            } else {
                   reduceLive();
            }
    } else if (clicked === 'game__field level--3') {
        if (waldoX > L3_WALDO_MIN_X && waldoX < L3_WALDO_MAX_X && waldoY > L3_WALDO_MIN_Y && waldoY < L3_WALDO_MAX_Y) {
            level++;
            showPopUpWithText('Found it! Next Stage?');
            stopGameTimer();
        } else {
               reduceLive();
        }
    } else if (clicked === 'game__field level--4') {
        if (waldoX > L4_WALDO_MIN_X && waldoX < L4_WALDO_MAX_X && waldoY > L4_WALDO_MIN_Y && waldoY < L4_WALDO_MAX_Y) {
            level++;
            showPopUpWithText('Found it! Next Stage?');
            stopGameTimer();
        } else {
               reduceLive();
        }
    } else if (clicked === 'game__field level--5') {
        if (waldoX > L5_WALDO_MIN_X && waldoX < L5_WALDO_MAX_X && waldoY > L5_WALDO_MIN_Y && waldoY < L5_WALDO_MAX_Y) {
                finishGame(true);
                stopGameTimer();
        } else {
               reduceLive();
        }
    }
}

function reduceLive() {
    live--;
    showLive();
    if (live <= 0) {
        started = false;
        showPopUpWithText('Game Over');
    }
}

function showPopUpWithText(text) {
    popUpOn = true;
    popUpMessage.innerText = text;
    popUp.classList.remove('pop-up--hide');
    if (!started) {
        showReplayButton();
    } else {
        showPlayButton();
    }
    stopGameTimer();
}

function hidePopUp() {
    popUpOn = false;
    popUp.classList.add('pop-up--hide');
}

function showReplayButton() { 
    icon.classList.remove('fa-play'); 
    icon.classList.add('fa-undo-alt');
}

function showPlayButton() {
    icon.classList.remove('fa-undo-alt'); 
    icon.classList.add('fa-play');
}

popUpRefresh.addEventListener('click', () => {
    if (!started) {
        hidePopUp();
        initGame(level);
    } else {
        updateLevel();
        nextLevel();
        hidePopUp();
        startGameTimer();
    }
});

function initGame(failedLevel) {
    level = 1;
    live = 5;
    gameField.classList.remove(`level--${failedLevel}`);
    gameField.classList.add('level--1');
    showStartPage();
}

function nextLevel() {
    gameField.classList.remove(`level--${level-1}`);
    gameField.classList.add(`level--${level}`);
}

function updateLevel() {
    gameLevel.innerText = `Level ${level}`;
}