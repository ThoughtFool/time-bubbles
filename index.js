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
gameArrays.enterLevel(0);
gameArrays.updateHorde(3, "teleport");
gameArrays.endLevel();

gameArrays.enterLevel(1);
gameArrays.updateHorde(4, "teleport");
gameArrays.updateHorde(3, "teleport");
gameArrays.updateHorde(3, "destroy");
gameArrays.updateHorde(1, "teleport");
gameArrays.endLevel();

gameArrays.enterLevel(2);
gameArrays.updateHorde(0, "teleport");
gameArrays.updateHorde(2, "teleport");
gameArrays.endLevel();

gameArrays.enterLevel(3);
gameArrays.updateHorde(0, "teleport");
gameArrays.updateHorde(2, "teleport");

console.log("checkLevel function:");
let timeSave = gameArrays.checkLevel("horde-0-3");
let lastTimeSave = timeSave[timeSave.length - 1];
console.log("lastTimeSave");
console.log(lastTimeSave);

gameArrays.returnLevel(lastTimeSave);
gameArrays.updateHorde(0, "teleport");
gameArrays.endLevel();

gameArrays.enterLevel(2);
gameArrays.updateHorde(5, "teleport");
gameArrays.endLevel();

let startBtn = document.querySelector(".startBtn");
startBtn.addEventListener("click", startLevel);
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
    
                let gamescreen = document.querySelector(".game-screen");
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
    
                count++

            } else {
                clearInterval(gameLoop);
                alert("Done!");
            };
        };
    };

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