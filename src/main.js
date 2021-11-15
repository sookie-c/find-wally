'use strict';

import Game from './game.js';
import PopUp from './popup.js';
import * as sound from './sound.js';

const game = new Game(120);
game.setGameStopListener((reason) => {
    let message;
    switch (reason) {
        case 'pass':
            message = 'Found it! Next Level?';
            break;
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
        game.init(game.level);
    } else {
        game.nextLevel();
        game.updateLevel();
        game.startTimer();
    }
    sound.playFound();
});