'use babel';

let lastMoveTime = 999999999999999;
let timeSwitch = false;
let hideTime = 3;

let refreshConfig = () => {
    hideTime = atom.config.get('mouse-autohide.hideTime');
}

function time() {
    if (new Date().getTime() - hideTime * 1000 > lastMoveTime) {
        document.body.classList.add("mouse-autohide");
        timeSwitch = false;
    } else {
        setTimeout(time, 100);
    }
}

function onMouseMove() {
    document.body.classList.remove("mouse-autohide");
    lastMoveTime = new Date().getTime();
    if (!timeSwitch) {
        timeSwitch = true;
        time();
    }
}

export default {
    activate(state) {
        document.body.addEventListener("mousemove", onMouseMove);
        refreshConfig();
        atom.config.observe('mouse-autohide', (newValue, previous) => refreshConfig());
    },
    config: {
        hideTime: {
            title: 'hide time in seconds',
            order: 1,
            type: 'integer',
            default: 3,
            minimum: 1
        }
    }
};
