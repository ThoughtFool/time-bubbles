// Arrays by level: ROYGBIV
// let levelData = {
//     "lvl-01" : {
//         hordeNum: 5,
//         level: 1
//     },
//     "lvl-02": {
//         hordeNum: 10,
//         level: 2
//     },
//     "lvl-03": {
//         hordeNum: 15,
//         level: 3
//     },
//     "lvl-04": {
//         hordeNum: 20,
//         level: 4
//     },
//     "lvl-05": {
//         hordeNum: 25,
//         level: 5
//     },
// };
// let currentLevel = 1;

let levelData = [{
        hordeNum: 5,
        level: 0
    },
    {
        hordeNum: 5,
        level: 1
    },
    {
        hordeNum: 10,
        level: 2
    },
    {
        hordeNum: 15,
        level: 3
    },
    {
        hordeNum: 20,
        level: 4
    },
    {
        hordeNum: 25,
        level: 5
    },
];

let savedHorde = [];
let currentHordeArr = [];
let levelHordeArr = [];
let teleportedHordeArr = [];

//  TODO: Make a class with methods:
let gameArrays = {
    levelData: [{
            hordeNum: 5,
            level: 0
        },
        {
            hordeNum: 5,
            level: 1
        },
        {
            hordeNum: 10,
            level: 2
        },
        {
            hordeNum: 15,
            level: 3
        },
        {
            hordeNum: 20,
            level: 4
        },
        {
            hordeNum: 25,
            level: 5
        },
    ],
    currentLevel: 0,
    savedHorde: [],
    currentHordeArr: [],
    levelHordeArr: [],
    teleportedHordeArr: [],
    history: {
        0: {},
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
    },
    // currentLevel: levelHordeArr.level,
    updateHistory: function () {
        this.history[this.currentLevel].hordeArr = this.currentHordeArr;
    },
    updateLevel: function (currentLevel) {
        this.currentLevel = currentLevel;
    },
    spawnHorde: function () {
        // function spawnHorde(hordeNum, level, levelHordeArr, teleHordeArr, ammoArr) {
        let hordeArr = [];
        for (let i = 0; i < this.levelData[this.currentLevel].hordeNum; i++) {
            let monster = {
                id: `horde-${this.currentLevel}-${i}`,
                currentLevel: this.currentLevel,
                levelsLived: []
            };
            hordeArr.push(monster);
        };
        return hordeArr;
    },
    updateHorde: function (indexToRemove, teleportOrDestroyString) {
        if (teleportOrDestroyString === "destroy") {
            this.currentHordeArr.splice(indexToRemove, 1);

        } else if (teleportOrDestroyString === "teleport") {
            this.savedHorde.push(this.currentHordeArr[indexToRemove]);

        } else {
            console.log("Action is undefined!");
        };
    },
    combineHordes: function () {
        let combinedArr = this.levelHordeArr.concat(this.teleportedHordeArr);
        // return combinedArr;
        this.currentHordeArr = combinedArr;
    },
    // Enter new level:
    enterLevel: function (level) {
        console.log(`Entering Level: ${level}.`);

        this.updateLevel(level);
        this.teleportedHordeArr = this.savedHorde;
        this.levelHordeArr = this.spawnHorde();
        console.log("this.levelHordeArr");
        console.log(this.levelHordeArr);
        this.combineHordes();
        console.log("this.currentHordeArr");
        console.log(this.currentHordeArr);
        this.updateHistory();
    },
    endLevel: function () {
        console.log(`Ending Level: ${this.currentLevel}.`);

        this.savedHorde = this.teleportedHordeArr;
        console.log("this.savedHorde");
        console.log(this.savedHorde);
        this.addLevelsLived();
        // this.currentLevel;
    },
    returnLevel: function (level) {
        console.log(`Returning to Level: ${level}.`);

        this.updateLevel(level);
        this.currentHordeArr = this.history[level].hordeArr;
        this.removeSavePoint();
        console.log("this.currentHordeArr");
        console.log(this.currentHordeArr);
        this.teleportedHordeArr = [];
        this.levelHordeArr = [];
        this.updateHistory();
    },
    addLevelsLived: function () {
        for (let i = 0; i < this.savedHorde.length; i++) {
            this.savedHorde[i].levelsLived.push(this.currentLevel);
        };
    },
    checkLevel: function (monsterID) {
        for (let i = 0; i < this.currentHordeArr.length; i++) {
            // console.log(this.currentHordeArr[i]);
            if (this.currentHordeArr[i].id === monsterID && this.currentHordeArr[i].levelsLived.length >= 1) {
                return this.currentHordeArr[i].levelsLived;
            };
        };
    },
    removeSavePoint: function () {
        for (let i = 0; i < this.currentHordeArr.length; i++) {
            // console.log(this.currentHordeArr[i]);
            if (this.currentHordeArr[i].levelsLived.length >= 1) {
                let index = this.currentHordeArr[i].levelsLived.indexOf(this.currentLevel);
                this.currentHordeArr[i].levelsLived.splice(index, 1);
            };
        };
    }
};

// Logic Tests:
//////////////////////// LEVEL 00 /////////////////////////////////
gameArrays.enterLevel(0);
gameArrays.updateHorde(3, "teleport");
gameArrays.endLevel();

//////////////////////// LEVEL 01 /////////////////////////////////
gameArrays.enterLevel(1);
gameArrays.updateHorde(4, "teleport");
gameArrays.updateHorde(3, "teleport");
gameArrays.updateHorde(3, "destroy");
gameArrays.updateHorde(1, "teleport");
gameArrays.endLevel();

//////////////////////// LEVEL 02 /////////////////////////////////
gameArrays.enterLevel(2);
gameArrays.updateHorde(0, "teleport");
gameArrays.updateHorde(2, "teleport");
gameArrays.endLevel();

//////////////////////// LEVEL 03 /////////////////////////////////
gameArrays.enterLevel(3);
gameArrays.updateHorde(0, "teleport");
gameArrays.updateHorde(2, "teleport");

//////////////////////// CHOOSE SAVED LEVEL /////////////////////////////////
console.log("checkLevel function:");
let timeSave = gameArrays.checkLevel("horde-0-3");
let lastTimeSave = timeSave[timeSave.length - 1];
console.log("lastTimeSave");
console.log(lastTimeSave);

//////////////////////// RETURN TO LEVEL /////////////////////////////////
gameArrays.returnLevel(lastTimeSave);
gameArrays.updateHorde(0, "teleport");
gameArrays.endLevel();

//////////////////////// LEVEL 03 /////////////////////////////////
gameArrays.enterLevel(3);
gameArrays.updateHorde(5, "teleport");
gameArrays.endLevel();

//////////////////////// Generate Bubbles /////////////////////////////////
let startBtn = document.querySelector(".startBtn");
startBtn.addEventListener("click", startLevel);
const bubbleArray = [];

// testing event loop:
function startLevel() {
    let count = 0,
        deployed = 10;

    let gameLoop = setInterval(bubbleBlower, 1000);

    function bubbleBlower() {

        if (count < deployed) {

            let size = Math.random() * 30 + 15;
            let left = Math.random() * 600 + 40;
            let top = Math.random() * 500 + 40;
            let color = "#" + Math.floor(Math.random() * 16777215).toString(16).slice(2, 8).toUpperCase();

            let gamescreen = document.querySelector("#game-screen");
            let bubble = document.createElement("div");
            let bubbleID = `bubble-${count}`;
            bubble.id = bubbleID;
            bubble.classList.add("enemy", "bubble");

            gamescreen.append(bubble);

            let newBubble = document.getElementById(bubbleID);
            newBubble.style.height = `${size}px`;
            newBubble.style.width = `${size}px`;
            newBubble.style.left = `${left}px`;
            newBubble.style.top = `${top}px`;
            newBubble.style.backgroundColor = color;

            // (xPos, yPos, radius, dx, dy, id)
            let bubbleObject = new bubbleBuilder(left, top, size / 2, 5, 5, bubbleID, 0.7, 10);
            bubbleArray.push(bubbleObject);

            console.log("bubbleObject");
            console.log(bubbleObject);

            count++

        } else {
            clearInterval(gameLoop);
            // alert("Done!");
        };
    };
    // };

    // gameArrays.updateLevel(1);
    // gameArrays.levelHordeArr = gameArrays.spawnHorde();
    // console.log(gameArrays.levelHordeArr);

    // Create level horde and assign data in gameArrays:
    // let hordeArr = spawnHorde(levelData[1].hordeNum, levelData[1].level);
    // gameArrays.levelHordeArr = hordeArr;
    // console.log(hordeArr);

    // gameArrays.teleportedHordeArr = gameArrays.savedHorde;
    // Combine level array with teleported array and assign to the current array:
    // gameArrays.currentHordeArr = gameArrays.combineHordes(gameArrays.levelHordeArr, gameArrays.teleportedHordeArr);

    // function spawnHorde(hordeNum, level) {
    // // function spawnHorde(hordeNum, level, levelHordeArr, teleHordeArr, ammoArr) {
    //     let hordeArr = [];
    //     for (let i = 0; i < hordeNum; i++) {
    //         let monster = {
    //             id: `horde-${level}-${i}`,
    //             level, level,
    //             levelsLived:[
    //                 level
    //             ]
    //         };
    //         hordeArr.push(monster);
    //     };
    //     return hordeArr;
    // };

    // function updateHorde(currentHordeArr, indexToRemove, teleportOrDestroyString) {
    // function updateHorde(indexToRemove, teleportOrDestroyString) {
    //     if("destroy") {

    //     } else if ("teleport") {

    //     } else {
    //         console.log("Action is undefined!"); 
    //     };
    // };

    // function destroy(hordeArr, indexToDestroy) {

    // };

    // function teleport(currentHordeArr, indexToTeleport) {
    //     let teleportedHorde = [];

    //     return teleportedHorde;
    // };

    // function combineHordes(levelHordeArr, teleportedHordeArr) {
    //     let combinedArr = levelHordeArr.concat(teleportedHordeArr);
    //     return combinedArr;
    // };
    // levelHordeArr = newHorde;

    function bubbleBuilder(xPos, yPos, radius, dx, dy, id, e, mass) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;
        this.dx = dx; // left or right
        this.dy = dy; // up or down
        this.id = id;
        this.e = -e;
        this.mass = mass;
        this.gravity = 9.81;
        this.area = (Math.PI * radius * radius) / 10000;
        this.bubbleElem = "";
        this.updatePos = function (elemIDTouched) {
            let elemTouched = document.getElementById(elemIDTouched);
            let elemCoords = elemTouched.getBoundingClientRect();

            

            // this.xPos += this.dx; 
            // this.yPos += this.dy;

            console.log(this.xPos);
            console.log(this.yPos);
            console.log("elemCoords");
            console.log(elemCoords);

            if(this.xPos + this.dx < this.radius || this.xPos + this.dx > elemCoords.width - this.radius) {
                this.dx = -this.dx;
            };

            if (this.yPos + this.dy < this.radius || this.yPos + this.dy > elemCoords.height - this.radius) {
                this.dy = -this.dy;
            };

            // if (this.xPos + this.dx > elemCoords.width - this.radius || this.xPos + this.dx < this.radius) {
            //     this.dx = -this.dx;
            // };
            // if (this.yPos + this.dy > elemCoords.height - this.radius || this.yPos + this.dy < this.radius) {
            //     this.dy = -this.dy;
            // };
            // if (this.yPos + this.radius >= elemCoords.height) {
            //     this.dy *= -1;
            //     // this.yPos += this.dy;
            // };

            // velocity:
            this.xPos += this.dx;
            this.yPos += this.dy;
        };
        this.movePos = function () {
            this.bubbleElem = document.getElementById(this.id);
            this.bubbleElem.style.left = `${this.xPos}px`;
            this.bubbleElem.style.top = `${this.yPos}px`;
        };
        this.coordChecker = function () {
            this.bubbleElem = document.getElementById(this.id);
            // updateCoords method
            let bubbleCoords = this.bubbleElem.getBoundingClientRect();
            // updateElemArray method
            let otherBubblesArr = document.querySelectorAll(".bubble");
            // loop through elemArray and getCoords
            for (let i = 0; i < otherBubblesArr.length; i++) {
                // compare elemCoords and elemArray[index].coords
                if (this.id != otherBubblesArr[i].id) {

                    let bubbleArrElem = otherBubblesArr[i].getBoundingClientRect();

                    if (this.xPos + this.radius + (bubbleArrElem.width / 2) > bubbleArrElem.left &&
                        this.xPos < bubbleArrElem.left + this.radius + (bubbleArrElem.width / 2) &&
                        this.yPos + this.radius + (bubbleArrElem.height / 2) > bubbleArrElem.top &&
                        this.yPos < bubbleArrElem.top + this.radius + (bubbleArrElem.height / 2)) {
                        
                    //         //pythagoras 
                    //     var distX = this.xPos - bubbleArrElem.left;
                    //     var distY = this.yPos - bubbleArrElem.top;
                    //     var d = Math.sqrt((distX) * (distX) + (distY) * (distY));

                    //     //checking circle vs circle collision 
                    //     if (d < this.radius + (bubbleArrElem.width / 2)) {
                    //         var nx = (bubbleArrElem.left - this.xPos) / d;
                    //         var ny = (bubbleArrElem.top - this.yPos) / d;
                    //         var p = 2 * (this.dx * nx + this.dy * ny - b2.velocity.x * nx - b2.velocity.y * ny) / (b1.mass + b2.mass);

                    //         // calulating the point of collision 
                    //         var colPointX = ((this.xPos * (bubbleArrElem.width / 2)) + (bubbleArrElem.left * this.radius)) / (this.radius + (bubbleArrElem.width / 2));
                    //         var colPointY = ((this.yPos * (bubbleArrElem.width / 2)) + (bubbleArrElem.top * this.radius)) / (this.radius + (bubbleArrElem.width / 2));

                    //         //stoping overlap 
                    //         this.xPos = colPointX + this.radius * (this.xPos - bubbleArrElem.left) / d;
                    //         this.yPos = colPointY + this.radius * (this.yPos - bubbleArrElem.top) / d;
                    //         bubbleArrElem.left = colPointX + (bubbleArrElem.width / 2) * (bubbleArrElem.left - this.xPos) / d;
                    //         bubbleArrElem.top = colPointY + (bubbleArrElem.width / 2) * (bubbleArrElem.top - this.yPos) / d;

                    //         //updating velocity to reflect collision 
                    //         this.dx -= p * this.mass * nx;
                    //         this.dy -= p * this.mass * ny;
                    //         // b2.velocity.x += p * b2.mass * nx;
                    //         // b2.velocity.y += p * b2.mass * ny;
                    //     };
                    // };

                    if ((Math.abs(this.xPos - bubbleArrElem.left) < (this.radius + (bubbleArrElem.width / 2))) && (Math.abs(this.yPos - bubbleArrElem.top) < (this.radius + (bubbleArrElem.width / 2)))) {
                        //reverse ball one
                        this.dx = -this.dx;
                        this.dy = -this.dy;

                        let ballObj = bubbleArray.find(bubble => bubble.id === otherBubblesArr[i].id);

                        //reverse ball two
                        ballObj.dx = -ballObj.dx;
                        ballObj.dy = -ballObj.dy;

                        ballObj.movePos();

                        // let reboundBall = document.getElementById(otherBubblesArr[i].id);
                        // bubbleArray.findOne
                        // reboundBall.style.left = `${this.xPos}px`;
                        // reboundBall.style.top = `${this.yPos}px`;
                    };

                    // if (bubbleArrElem.left < bubbleCoords.right + this.radius + (bubbleArrElem.width / 2) &&
                    // if (bubbleArrElem.left < bubbleCoords.right &&
                    //     bubbleArrElem.right > bubbleCoords.left &&
                    //     bubbleArrElem.top < bubbleCoords.bottom &&
                    //     bubbleArrElem.bottom > bubbleCoords.top) {
                            // this.dx *= -1;
                            // this.dy *= -1;
                            // return otherBubblesArr[i].id;
                    };
                };
            };
            this.bubbleElem = document.getElementById(this.id);
            this.bubbleElem.style.left = `${this.xPos}px`;
            this.bubbleElem.style.top = `${this.yPos}px`;
        };
    };

    // let bubbleObject = new bubbleBuilder(10, 10, 5, 2, -2, "bubble-0");
    // console.log(bubbleObject);

    async function gameLoopTest() { // draw() 
        // draw the dom elems:
        let gamescreen = document.getElementById("game-screen");
        let gamescreenCoords = gamescreen.getBoundingClientRect();

        let xPos = gamescreenCoords.width / 2;
        let yPos = gamescreenCoords.height - 30;


        for (let i = 0; i < bubbleArray.length; i++) {
            console.log("bubbleArray[i].updatePos('game-screen')");
            await bubbleArray[i].updatePos("game-screen");
            await bubbleArray[i].coordChecker();
            await bubbleArray[i].movePos();
        };

        // cartesian coors:
    };

    setInterval(gameLoopTest, 150);
};