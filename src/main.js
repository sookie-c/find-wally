'use strict';

import Game from './game.js';

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

const gameField = document.querySelector('.game__field');
const popUp = document.querySelector('.pop-up');
const popUpRefresh = document.querySelector('.pop-up__refresh');
const popUpMessage = document.querySelector('.pop-up__message');
const icon = document.querySelector('.fas');

const bgSound = new Audio('sound/bg.mp3');
const foundSound = new Audio('./sound/found.mp3');
const wrongSound = new Audio('./sound/wrong.mp3');
const alertSound = new Audio('./sound/alert.wav');
const winSound = new Audio('./sound/game_win.mp3');

let popUpOn = false;

const game = new Game(120);
game.setGameStopListener(reason => {
    console.log(reason);
})

gameField.addEventListener('click', onFieldClick);

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}

function onFieldClick(e) {
    const clicked = e.target.className;
    const waldoX = e.offsetX;
    const waldoY = e.offsetY;

    if (popUpOn) {
        return;
    }
    if (clicked === 'game__field level--1') {
        if (waldoX > L1_WALDO_MIN_X && waldoX < L1_WALDO_MAX_X && waldoY > L1_WALDO_MIN_Y && waldoY < L1_WALDO_MAX_Y) {
            game.level++;
            showPopUpWithText('Found it! Next Stage?');
            game.stopTimer();
            playSound(foundSound);
            } else {
                game.reduceLive();
                playSound(wrongSound);
            }
    } else if (clicked === 'game__field level--2') {
        if (waldoX > L2_WALDO_MIN_X && waldoX < L2_WALDO_MAX_X && waldoY > L2_WALDO_MIN_Y && waldoY < L2_WALDO_MAX_Y) {
            game.level++;
            showPopUpWithText('Found it! Next Stage?');
            game.stopTimer();
            playSound(foundSound);
            } else {
                   game.reduceLive();
                   playSound(wrongSound);
            }
    } else if (clicked === 'game__field level--3') {
        if (waldoX > L3_WALDO_MIN_X && waldoX < L3_WALDO_MAX_X && waldoY > L3_WALDO_MIN_Y && waldoY < L3_WALDO_MAX_Y) {
            game.level++;
            showPopUpWithText('Found it! Next Stage?');
            game.stopTimer();
            playSound(foundSound);
        } else {
               game.educeLive();
               playSound(wrongSound);
        }
    } else if (clicked === 'game__field level--4') {
        if (waldoX > L4_WALDO_MIN_X && waldoX < L4_WALDO_MAX_X && waldoY > L4_WALDO_MIN_Y && waldoY < L4_WALDO_MAX_Y) {
            game.level++;
            showPopUpWithText('Found it! Next Stage?');
            game.stopTimer();
            playSound(foundSound);
        } else {
               game.reduceLive();
               playSound(wrongSound);
        }
    } else if (clicked === 'game__field level--5') {
        if (waldoX > L5_WALDO_MIN_X && waldoX < L5_WALDO_MAX_X && waldoY > L5_WALDO_MIN_Y && waldoY < L5_WALDO_MAX_Y) {
                game.finish(true);
                game.stopTimer();
                playSound(winSound);
        } else {
               game.reduceLive();
               playSound(wrongSound);
        }
    }
}

function showPopUpWithText(text) {
    popUpOn = true;
    popUpMessage.innerText = text;
    popUp.classList.remove('pop-up--hide');
    if (game.started) {
        showPlayButton();
    } else {
        showReplayButton();
    }
    game.stopTimer();
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
    if (game.started) {
        updateLevel();
        nextLevel();
        hidePopUp();
        game.startTimer();
    } else {
        hidePopUp();
        initGame(game.level);

    }
    playSound(foundSound);
});

function initGame(failedLevel) {
    game.level = 1;
    game.live = 5;
    gameField.classList.remove(`level--${failedLevel}`);
    gameField.classList.add('level--1');
    game.showStartPage();
}

function nextLevel() {
    gameField.classList.remove(`level--${game.level-1}`);
    gameField.classList.add(`level--${game.level}`);
}

function updateLevel() {
    game.gameLevel.innerText = `Level ${game.level}`;
}