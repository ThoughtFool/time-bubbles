const introMsgArr = [
    "Do not be fooled by their beauty or their charm.  These bubbles are not so innocent.",
    "They have evolved beyond your childish games and have come to claim this world as their own.",
    "Sealed in a tiny shuttle, you are armed only with a plasma cannon and some 'time' bombs.",
    "Use your bombs sparingly.",
    "These bombs capture enemy bubbles and catapult them forward in time.",
    "Beware what you put off today.  It may haunt your tomorrows!",
    // "Beware what you put off today.  They will be waiting for you, tomorrow!",
];

let msgCounter = 0;

function getMsg(msgCounter) {
    return introMsgArr[msgCounter];
}

let introMsgElem = document.getElementById("intro-msg");
function splashMsg() {

    if (msgCounter < introMsgArr.length) {
        introMsgElem.innerText = getMsg(msgCounter);
        msgCounter++;
    } else {
        clearInterval(msgInt);
        skipBtn.style.display = "none";
        skipBtn.removeEventListener("click", skipIntroMsg);

        let enterBtn = document.querySelector(".enter-btn");
        enterBtn.style.display = "block";
    }
}

let skipBtn = document.querySelector(".skip-btn");
skipBtn.addEventListener("click", skipIntroMsg);

let msgInt = setInterval(splashMsg, 4000);

function skipIntroMsg() {
    clearInterval(msgInt);
    introMsgElem.innerText = getMsg(introMsgArr.length - 1);

    let enterBtn = document.querySelector(".enter-btn");
    skipBtn.removeEventListener("click", skipIntroMsg);

    skipBtn.style.display = "none";
    enterBtn.style.display = "block";
}
