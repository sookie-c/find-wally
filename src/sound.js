const bgSound = new Audio('sound/bg.mp3');
const foundSound = new Audio('./sound/found.mp3');
const wrongSound = new Audio('./sound/wrong.mp3');
const alertSound = new Audio('./sound/alert.wav');
const winSound = new Audio('./sound/game_win.mp3');

export function playBg() {
    playSound(bgSound);
}

export function playFound() {
    playSound(foundSound);
}

export function playWrong() {
    playSound(wrongSound);
}

export function playAlert() {
    playSound(alertSound);
}

export function playWin() {
    playSound(winSound);
}

export function stopBg() {
    stopSound(bgSound);
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}