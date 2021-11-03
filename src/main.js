'use strict';

import Game from './game.js';
import PopUp from './popup.js';

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

const bgSound = new Audio('sound/bg.mp3');
const foundSound = new Audio('./sound/found.mp3');
const wrongSound = new Audio('./sound/wrong.mp3');
const alertSound = new Audio('./sound/alert.wav');
const winSound = new Audio('./sound/game_win.mp3');

const game = new Game(120);
game.setGameStopListener((reason) => {
    console.log(reason);
    let message;
    switch (reason) {
        case 'win':
            message = 'Congrats, You completed!';
            break;
        case 'lose':
            message = 'Game Over..';
            break;
        default:
            throw new Error('not valid reason');
    }
    gameBanner.showWithText(message);
})

const gameBanner = new PopUp();
gameBanner.setClickListener(() => {
    if (!game.started) {
        game.initGame(game.level);
    } else {
        game.updateLevel();
        game.nextLevel();
        game.startTimer();
    }
    playSound(foundSound);
});

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

    if (gameBanner.popUpOn) {
        return;
    }
    if (clicked === 'game__field level--1') {
        if (waldoX > L1_WALDO_MIN_X && waldoX < L1_WALDO_MAX_X && waldoY > L1_WALDO_MIN_Y && waldoY < L1_WALDO_MAX_Y) {
            game.level++;
            gameBanner.showWithText('Found it! Next Stage?');
            game.stopTimer();
            playSound(foundSound);
            } else {
                game.reduceLive();
                playSound(wrongSound);
            }
    } else if (clicked === 'game__field level--2') {
        if (waldoX > L2_WALDO_MIN_X && waldoX < L2_WALDO_MAX_X && waldoY > L2_WALDO_MIN_Y && waldoY < L2_WALDO_MAX_Y) {
            game.level++;
            gameBanner.showWithText('Found it! Next Stage?');
            game.stopTimer();
            playSound(foundSound);
            } else {
                   game.reduceLive();
                   playSound(wrongSound);
            }
    } else if (clicked === 'game__field level--3') {
        if (waldoX > L3_WALDO_MIN_X && waldoX < L3_WALDO_MAX_X && waldoY > L3_WALDO_MIN_Y && waldoY < L3_WALDO_MAX_Y) {
            game.level++;
            gameBanner.showWithText('Found it! Next Stage?');
            game.stopTimer();
            playSound(foundSound);
        } else {
               game.reduceLive();
               playSound(wrongSound);
        }
    } else if (clicked === 'game__field level--4') {
        if (waldoX > L4_WALDO_MIN_X && waldoX < L4_WALDO_MAX_X && waldoY > L4_WALDO_MIN_Y && waldoY < L4_WALDO_MAX_Y) {
            game.level++;
            gameBanner.showWithText('Found it! Next Stage?');
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