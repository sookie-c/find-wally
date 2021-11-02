'use strict';

const L1_WALDO_MIN_X = 610;
const L1_WALDO_MAX_X = 630;
const L1_WALDO_MIN_Y = 205;
const L1_WALDO_MAX_Y = 256;

const gameBtn = document.querySelector('.game__button');
const gameStart = document.querySelector('.game__start');
const gameHeader = document.querySelector('.game__header');
const gameField = document.querySelector('.game__field');
const gameLevel = document.querySelector('.game__level');
const gameLive = document.querySelector('.game__live');
const popUp = document.querySelector('.pop-up');
const popUpMessage = document.querySelector('.pop-up__message');
const icon = document.querySelector('.fas');

let started = false;
let level = 1;
let live = 5;

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
 
    if (clicked === 'game__field level--1') {
        if (waldoX > L1_WALDO_MIN_X && waldoX < L1_WALDO_MAX_X && waldoY > L1_WALDO_MIN_Y && waldoY < L1_WALDO_MAX_Y) {
            level++;
            showPopUpWithText('Found it! Next Stage?');
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