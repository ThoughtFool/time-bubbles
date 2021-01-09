const introMsgArr = [
    "Do not be fooled by their beauty or their charm.  These bubbles are not so innocent.",
    "They have evolved beyond your childish games and have come to claim this world as their own.",
    "Sealed in a tiny shuttle, you are armed only with a plasma cannon and some 'time' bombs.",
    "Use your bombs sparingly.",
    "These bombs capture enemy bubbles and catapult them forward in time.",
    "So, beware what you put off today.  They will be waiting for you, tomorrow!"
]

let msgCounter = 0;

function getMsg(msgCounter) {
    return introMsgArr[msgCounter];
};

function splashMsg() {
    let introMsgElem = document.getElementById("intro-msg");

    if (msgCounter < introMsgArr.length) {
        introMsgElem.innerText = getMsg(msgCounter);
        msgCounter++
    } else {
        clearInterval(msgInt);
        let enterBtn = document.querySelector(".enter-btn");
        enterBtn.style.display = "block";
    };
};

let msgInt = setInterval(splashMsg, 5000);
