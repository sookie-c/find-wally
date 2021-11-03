'use strict';

export default class PopUp {
    constructor() {
        this.popUp = document.querySelector('.pop-up');
        this.popUpRefresh = document.querySelector('.pop-up__refresh');
        this.popUpMessage = document.querySelector('.pop-up__message');
        this.popUpOn = false;
        this.popUpRefresh.addEventListener('click', () => {
            this.hide();
            this.onClick && this.onClick();
        });
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    }

    showWithText(text) {
        this.popUpOn = true;
        this.popUpMessage.innerText = text;
        this.popUp.classList.remove('pop-up--hide');
    }

    hide() {
        this.popUpOn = false;
        this.popUp.classList.add('pop-up--hide');
    }
}