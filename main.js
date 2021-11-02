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

const gameBtn = document.querySelector('.game__button');
const gameStart = document.querySelector('.game__start');
const gameHeader = document.querySelector('.game__header');
const gameField = document.querySelector('.game__field');
const gameLevel = document.querySelector('.game__level');
const gameLive = document.querySelector('.game__live');
const popUp = document.querySelector('.pop-up');
const popUpRefresh = document.querySelector('.pop-up__refresh');
const popUpMessage = document.querySelector('.pop-up__message');
const icon = document.querySelector('.fas');

let started = false;
let level = 1;
let live = 5;
let popUpOn = false;

gameBtn.addEventListener('click', () => {
    startGame();
});

function startGame() {
    started = true;
    hideStartPage();
    showGameHeader();
    showLive();
    showLevel();
}

function showLive() {
    gameLive.textContent = `♥️ x ${live}`;
}

function showLevel() {
    gameLevel.innerText = `Level ${level}`;
}

function showGameHeader() {
    gameHeader.style.display = 'flex';
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
            } else {
            reduceLive();
            }
    }
    if (clicked === 'game__field level--2') {
        if (waldoX > L2_WALDO_MIN_X && waldoX < L2_WALDO_MAX_X && waldoY > L2_WALDO_MIN_Y && waldoY < L2_WALDO_MAX_Y) {
            level++;
            showPopUpWithText('Found it! Next Stage?');
            } else {
                   reduceLive();
            }
    }
     if (clicked === 'game__field level--3') {
        if (waldoX > L3_WALDO_MIN_X && waldoX < L3_WALDO_MAX_X && waldoY > L3_WALDO_MIN_Y && waldoY < L3_WALDO_MAX_Y) {
            level++;
            showPopUpWithText('Found it! Next Stage?');
        } else {
               reduceLive();
        }
    }
    if (clicked === 'game__field level--4') {
        if (waldoX > L4_WALDO_MIN_X && waldoX < L4_WALDO_MAX_X && waldoY > L4_WALDO_MIN_Y && waldoY < L4_WALDO_MAX_Y) {
            level++;
            showPopUpWithText('Found it! Next Stage?');
        } else {
               reduceLive();
        }
    }
    if (clicked === 'game__field level--5') {
        if (waldoX > L5_WALDO_MIN_X && waldoX < L5_WALDO_MAX_X && waldoY > L5_WALDO_MIN_Y && waldoY < L5_WALDO_MAX_Y) {
                stopGame();
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
        showPopUpWithText('You lost..');
    }
}

function showPopUpWithText(text) {
    popUpMessage.innerText = text;
    popUp.classList.remove('pop-up--hide');
    if (!started) {
        showReplayButton();
    } else {
        showPlayButton();
    }
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
    } else {
        updateLevel();
        nextLevel();
        hidePopUp();
    }
});

function hidePopUp() {
    popUpOn = false;
    popUp.classList.add('pop-up--hide');
}

function nextLevel() {
    gameField.classList.remove(`level--${level-1}`);
    gameField.classList.add(`level--${level}`);
}

function updateLevel() {
    gameLevel.innerText = `Level ${level}`;
}