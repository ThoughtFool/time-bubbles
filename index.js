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

let gamescreen = document.getElementById("game-screen");
let gamescreenCoords = gamescreen.getBoundingClientRect();

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
    deployed: 0,
    currentAmmo: {
        laser: {
            count: [],
            limit: 15,
            fired: []
        },
        bomb: {
            count: [],
            limit: 5,
            fired: []
        }
    },
    radsToDegs: function (rads) {
        let result = rads * (180/Math.PI);
        return result;
    },
    degsToRads: function (angle) {
        let result = angle / Math.PI * 180;
        return result;
    },
    fireProjectile: function () {
        let radians = degsToRads(this.angle);
        if (this.movingForward) {
            this.velX += Math.cos(radians) * this.speed;
            this.velY += Math.sin(radians) * this.speed;
        }
    },
    // let newX = oldX + cos(radians) * distance;
    // let newY = oldY + sin(radians) * distance;
    lives: 3,
    blaster: {
        id: "blaster",
        angle: 0,
        currentAmmo: {
            laser: {
                count: [],
                limit: 15,
                shots: []
            },
            bomb: {
                count: [],
                limit: 5,
                shots: []
            }
        },
        deg: 0,
        shots: [],
        noseX: gamescreenCoords.width / 2 + 15,
        noseY: gamescreenCoords.width / 2,
        radius: 15,
        left: gamescreenCoords.width / 2,
        top: gamescreenCoords.width / 2,
        rotateSpeed: 0.001
    },
    laserCount: 0,
    moveBlaster: function (direction) {
        let myBlaster = document.getElementById("blaster");

        // console.log("this.blasterCannon.rot");
        // console.log(this.blasterCannon.rot);
        console.log("this.blaster.angle");
        console.log(this.blaster.angle);

        let newDeg = this.radsToDegs(this.blaster.angle);
        let newDegY = this.radsToDegs(this.blaster.noseY);
        console.log("newDeg");
        console.log(newDeg);
        console.log("newDegY");
        console.log(newDegY);

        if (direction === "clockwise" || direction === -1) {
            // if (direction === "clockwise" && newDeg < 180) {
            myBlaster.style.transform = `rotate(${newDeg}deg)`;
            // this.blasterCannon.a += this.blasterCannon.rot;

        } else if (direction === "counter-clockwise" || direction === 1) {
            // } else if (direction === "counter-clockwise" && newDeg > 0) {
            myBlaster.style.transform = `rotate(${newDeg}deg)`;
            // this.blasterCannon.a += this.blasterCannon.rot;

        } else {
            console.log("error");
        };
    },
    rotateBlaster: function (dir) {
        console.log("this.blaster.rotateSpeed");
        console.log(this.blaster.rotateSpeed);
        this.blaster.angle += this.blaster.rotateSpeed * dir;
        console.log(this.blaster.angle);
        this.updateBlaster(dir);

    },
    updateBlaster: function (dir) {
        let rads = this.blaster.angle / Math.PI * 180;
        this.blaster.noseX = this.blaster.left - this.blaster.radius * Math.cos(rads);
        this.blaster.noseY = this.blaster.top - this.blaster.radius * Math.sin(rads);

        this.moveBlaster(dir);

    },
    shootBlaster: function (ammoString) {
        console.log("shooting laser");

        // TESTING ONLY:
        let index = 0;

        if (this.blaster.currentAmmo[ammoString].length > 0) {

            let projectile = this.blaster.currentAmmo[ammoString][index];
            this.blaster.shots.push(projectile);
            this.blaster.currentAmmo[ammoString].splice(index, 1);
    
            setInterval(this.updateLaser, 250);
        } else {
            console.log("no weapons");
        };

    },
    makeLaser: function (angle, ammoString) {
        let newProjectile;
        let xPos = this.blaster.noseX,
            yPos = this.blaster.noseY;

            console.log("this.blaster.currentAmmo");
            console.log(this.blaster.currentAmmo);
            console.log(ammoString);
        
        if (ammoString === "laser") {
            newProjectile = {
                xPos: xPos,
                yPos: yPos,
                angle: angle,
                height: 4,
                width: 4,
                speed: 5,
                xVel: 0,
                yVel: 0,
                type: ammoString
            };

        } else if (ammoString ==="bomb") {
            newProjectile = {
                xPos: xPos,
                yPos: yPos,
                angle: angle,
                height: 8,
                width: 8,
                speed: 2,
                xVel: 0,
                yVel: 0,
                type: ammoString
            };

        }
        this.blaster.currentAmmo[ammoString].count.push(newProjectile);
    },
    updateLaser: function () { // TODO: make loop for all projectiles:
        // console.log("this.blaster");
        // console.log(this.blaster);

        if (this.blaster.shots > 0) {
            let rads = this.blaster.shots[0].angle / Math.PI * 180;
            console.log("rads!");
            console.log(this.blaster.shots[0].xPos);
            console.log(this.blaster.shots[0].yPos);
            this.blaster.shots[0].xPos -= Math.cos(rads) * this.blaster.shots[0].speed;
            this.blaster.shots[0].yPos -= Math.sin(rads) * this.blaster.shots[0].speed;
        };
    },

        // let myBlaster = document.getElementById("blaster");
        // let computed = window.getComputedStyle(myBlaster, null);
        // let transformed = computed.getPropertyValue("transform");
        // let matrix = transformed.split('(')[1].split(')')[0].split(',');

        // let v1 = {
        //         x: matrix[0],
        //         y: matrix[1]
        //     },
        //     v2 = {
        //         x: matrix[2],
        //         y: matrix[3]
        //     },
        //     scale = Math.sqrt(v1.x * v1.x + v1.y * v1.y),
        //     sin = v1.y / scale,
        //     rads = Math.round(Math.atan(v1.y, v1.x)),
        //     angle = this.radsToDegs(rads);

        // console.log("angle:");
        // console.log(angle);

        // this.blaster.angle = angle;
        // this.blaster.v1 = v1;

        // {
        //     id: "blaster",
        //     angle: angle,
        //     deg: gameArrays.deg,
        //     currentAmmo: gameArrays.currentAmmo
        // };
    // },
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
            this.currentHordeArr.splice(indexToRemove, 1);

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
    enterLevel: function () {
        console.log(`Entering Level: ${this.currentLevel}.`);
        // alert(`Entering Level: ${level}.`);

        // TODO:
        // "hide" / "show", "end" / "begin"
        // this.displayMsg("show", "begin");

        // this.updateLevel(level);
        this.teleportedHordeArr = this.savedHorde;
        this.levelHordeArr = this.spawnHorde();
        console.log("this.levelHordeArr");
        console.log(this.levelHordeArr);
        this.combineHordes();
        console.log("this.currentHordeArr");
        console.log(this.currentHordeArr);
        this.savedHorde.length = 0;
        this.updateHistory();
        this.deployed = this.currentHordeArr.length;
        console.log(`deployed: ${this.deployed}, currentLevel: ${this.currentLevel}`);
        return this.deployed;
    },
    endLevel: function () {
        console.log(`Ending Level: ${this.currentLevel}.`);

        // alert(`You have completed level: ${this.currentLevel}. ${this.savedHorde.length} bubbles will be teleported to next level.`);
        this.displayMsg("show", "end");

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
        this.deployed = this.currentHordeArr.length;
        console.log(`deployed: ${gameArrays.deployed}, currentLevel: ${this.currentLevel}`);
        return this.deployed;
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
    },
    getCSS: function (id, prop) {
        let elem = document.getElementById(id);
        return window.getComputedStyle(elem, null).getPropertyValue(prop);
    },
    aimWeapon: function () {
        console.log("aimWeapon");
        // if (this.laserCount < 0) {
            
            // let blasterLeft = getCSS("blaster", "left");
            // let blasterTop = window.getComputedStyle(myBlaster, null).getPropertyValue("top");
            // console.log("computed");
            // console.log(computed);

            let rad = this.blaster.deg * (Math.PI / 180);
            // let coords = this.blaster.v1;


            let newX = Math.round(Math.sin(rad)) * 5;
            let newY = Math.round(Math.cos(rad)) * 5;

            let gamescreen = document.getElementById("game-screen");

            let laserBeam = document.createElement("div");
            laserBeam.className = "laser-beam";
            let laserID = `laser-${this.laserCount}`;
            laserBeam.id = laserID;
            gamescreen.append(laserBeam);

            let myLaser = document.getElementById(laserID);

            myLaser.style.position = "absolute"
            myLaser.style.left = `${this.getCSS("blaster", "left")}`;
            myLaser.style.top = `${this.getCSS("blaster", "top")}`;

            // console.log(`newX: ${newX}, newY: ${newY}`);
            // console.log("blasterLeft, blasterTop");
            // console.log(blasterLeft, blasterTop);

            // Sine(angle) = Y / 20 - > Y = Sine(angle) * 20
            // Cosine(angle) = X / 20 - > X = Cosine(angle) * 20

            // let distX = v1.x++;
            // let distY = v1.y++;
        // };
    },
    blasterCannon: {
        // x: canv.width / 2,
        // y: canv.height / 2,
        a: 90 / 180 * Math.PI, // convert to radians
        r: 150 / 2,
        blinkNum: Math.ceil(3 / 0.1),
        blinkTime: Math.ceil(3 * 30),
        canShoot: true,
        explodeTime: 0,
        lasers: [],
        rot: 0,
        thrusting: false,
        thrust: {
            x: 0,
            y: 0
        }
    },
    // fireLaser: function () {
    //     // create the laser object
    //     let myBlaster = document.getElementById("blaster");
    //     let blasterCoords = myBlaster.getBoundingClientRect();

    //     if (this.currentAmmo.laser.count.length > 0) {
    //         this.currentAmmo.laser.fired.push({
    //             x: blasterCoords.left - 100 * Math.cos(this.blasterCannon.a),
    //             y: blasterCoords.top - 100 * Math.sin(this.blasterCannon.a),
    //             xv: 500 * Math.cos(this.blasterCannon.a) / 30,
    //             yv: -500 * Math.sin(this.blasterCannon.a) / 30,
    //             dist: 0,
    //             explodeTime: 0
    //         });

    //         // let newX = this.currentAmmo.laser.fired[0].x;
    //         // let newY = this.currentAmmo.laser.fired[0].y;

    //         let gamescreen = document.getElementById("game-screen");

    //         let laserBeam = document.createElement("div");
    //         laserBeam.className = "laser-beam";
    //         let laserID = `laser-${this.laserCount}`;
    //         laserBeam.id = laserID;
    //         gamescreen.append(laserBeam);

    //         let myLaser = document.getElementById(laserID);

    //         myLaser.style.position = "absolute"
    //         myLaser.style.left = `${this.currentAmmo.laser.fired[0].x}px`;
    //         myLaser.style.top = `${this.currentAmmo.laser.fired[0].y}px`;

    //         setInterval(() => {
    //             console.log(this.currentAmmo.laser.fired[0].xv);
    //             let moveX = this.currentAmmo.laser.fired[0].x += this.currentAmmo.laser.fired[0].xv;
    //             let moveY = this.currentAmmo.laser.fired[0].y += this.currentAmmo.laser.fired[0].yv;
    //             myLaser.style.left = `${moveX}px`;
    //             myLaser.style.top = `${moveY}px`;
    //             console.log("moveX, moveY");
    //             console.log(moveX, moveY);

    //         }, 150);
    //     };
    // },
    // shootLaser: function () {

    //     // let myBlaster = document.getElementById("blaster");
    //     // let blasterCoords = myBlaster.getBoundingClientRect();
    //     // let rad = this.blaster.deg * (Math.PI / 180);

    //     if (this.currentAmmo.laser.count.length > 0) {
    //         // this.currentAmmo.laser.fired.push({
    //         //     x: blasterCoords.right + 4 / 3 * 25 * Math.cos(rad),
    //         //     y: blasterCoords.top - 4 / 3 * 25 * Math.sin(rad),
    //         //     xv: 100 * Math.cos(rad) / 30,
    //         //     yv: -100 * Math.sin(rad) / 30
    //         // });

    //         let newX = this.currentAmmo.laser.fired[0].x;
    //         let newY = this.currentAmmo.laser.fired[0].y;

    //         let gamescreen = document.getElementById("game-screen");

    //         let laserBeam = document.createElement("div");
    //         laserBeam.className = "laser-beam";
    //         let laserID = `laser-${this.laserCount}`;
    //         laserBeam.id = laserID;
    //         gamescreen.append(laserBeam);

    //         let myLaser = document.getElementById(laserID);

    //         myLaser.style.position = "absolute"
    //         myLaser.style.left = `${newX}px`;
    //         myLaser.style.top = `${newY}px`;

    //         setInterval(() => {
    //             console.log(this.currentAmmo.laser.fired[0].xv);
    //             let moveX = this.currentAmmo.laser.fired[0].x += this.currentAmmo.laser.fired[0].xv;
    //             let moveY = this.currentAmmo.laser.fired[0].y += this.currentAmmo.laser.fired[0].yv;
    //             myLaser.style.left = `${moveX}px`;
    //             myLaser.style.top = `${moveY}px`;
    //             console.log("moveX, moveY");
    //             console.log(moveX, moveY);

    //         }, 150);
            
    //     };
    // },
    fireWeapon: function (actionString, indexOfBubble) {
        if (actionString === "laser" && this.blaster.currentAmmo[actionString].count.length > 0) {
            this.updateHorde(indexOfBubble, "destroy");
            this.updateAmmo("remove", actionString);

        } else if (actionString === "bomb" && this.blaster.currentAmmo[actionString].count.length > 0) {
            this.updateHorde(indexOfBubble, "teleport");
            this.updateAmmo("remove", actionString);

        } else {
            console.log(`error: actionString not defined or ammo count below 0. Ammo: ${this.blaster.currentAmmo[actionString].length} `);
        };
    },
    updateAmmo: function (actionString, ammoString) {

        if (actionString === "remove") {
            this.blaster.currentAmmo[ammoString].count.pop();

        } else if (actionString === "add" && this.blaster.currentAmmo[ammoString].count.length < this.blaster.currentAmmo[ammoString].limit) {

            this.makeLaser(this.blaster.angle, ammoString);
            // this.blaster.currentAmmo[ammoString].count.push(ammoString);

        } else {
            console.log("error: actionString not defined");
        };
    },
    spawnAmmo: function (ammoString) {
        let ammo = document.createElement("div");
        ammo.style.position = "absolute";
        let xPosStart = this.blaster.xPos;
        let yPosStart = this.blaster.yPos;
        let angleFired = this.blaster.angle;
    },
    readyMsg: function () {
        let modal = document.getElementById("modal-bg");
        modal.style.display = "none";
        // this.enterLevel(this.currentLevel);
        startLevel(true);
    },
    doneMsg: function () {
        let modal = document.getElementById("modal-bg");
        modal.style.display = "none";
        // this.enterLevel(this.currentLevel);
        startLevel(false, "success");
    },
    playAgainMsg: function () {
        let modal = document.getElementById("modal-bg");
        modal.style.display = "none";
        // this.enterLevel(this.currentLevel);
        startLevel(false);
    },
    displayMsg: function (msgStatus, msgType) {
        let modal = document.getElementById("modal-bg");
        let modalText = document.querySelector(".modal-text");
        let readyModal = document.getElementById("ready-modal");
        let doneModal = document.getElementById("done-modal");
        let startBtn = document.querySelector(".startBtn");
        readyModal.addEventListener("click", this.readyMsg);
        doneModal.addEventListener("click", this.doneMsg);

        if (typeof msgStatus === "ready") {
            modal.style.display = "none";
            // this.enterLevel(this.currentLevel);
            startLevel(true);

        } else if (msgStatus === "show") {
            modal.style.display = "block";

            if (msgType === "end") {
                modalText.innerText = `You have completed level: ${this.currentLevel}. ${this.savedHorde.length} bubbles will be teleported to next level.`;
                doneModal.style.display = "block";
                readyModal.style.display = "none";

            } else if (msgType === "begin") {
                modalText.innerText = `Entering Level: ${this.currentLevel}. Ready?`;
                readyModal.style.display = "block";
                doneModal.style.display = "none";

            } else if ("play again") {
                modalText.innerText = `Game over! Want to play again?`;
                readyModal.style.display = "none";
                doneModal.style.display = "none";
                startBtn.style.display = "block";
            } else {
                console.log("error");
            };
        } else {
            console.log("error");
        };
    }
};


// // Logic Tests:
// //////////////////////// LEVEL 00 /////////////////////////////////
// gameArrays.enterLevel(0);
// gameArrays.updateHorde(3, "teleport");
// gameArrays.endLevel();

// //////////////////////// LEVEL 01 /////////////////////////////////
// gameArrays.enterLevel(1);
// gameArrays.updateHorde(4, "teleport");
// gameArrays.updateHorde(3, "teleport");
// gameArrays.updateHorde(3, "destroy");
// gameArrays.updateHorde(1, "teleport");
// gameArrays.endLevel();

// //////////////////////// LEVEL 02 /////////////////////////////////
// gameArrays.enterLevel(2);
// gameArrays.updateHorde(0, "teleport");
// gameArrays.updateHorde(2, "teleport");
// gameArrays.endLevel();

// //////////////////////// LEVEL 03 /////////////////////////////////
// gameArrays.enterLevel(3);
// gameArrays.updateHorde(0, "teleport");
// gameArrays.updateHorde(2, "teleport");

// //////////////////////// CHOOSE SAVED LEVEL /////////////////////////////////
// console.log("checkLevel function:");
// let timeSave = gameArrays.checkLevel("horde-0-3");
// let lastTimeSave = timeSave[timeSave.length - 1];
// console.log("lastTimeSave");
// console.log(lastTimeSave);

// //////////////////////// RETURN TO LEVEL /////////////////////////////////
// gameArrays.returnLevel(lastTimeSave);
// gameArrays.updateHorde(0, "teleport");
// gameArrays.endLevel();

// //////////////////////// LEVEL 03 /////////////////////////////////
// gameArrays.enterLevel(3);
// gameArrays.updateHorde(5, "teleport");
// gameArrays.endLevel();

//////////////////////// Generate Bubbles /////////////////////////////////
let startBtn = document.querySelector(".startBtn");
startBtn.addEventListener("click", startGame);

async function naviCtrl(value) {

    if (value.key === "ArrowDown") {
        // gameArrays.blasterCannon.rot = 360 / 180 * Math.PI / 15;
        // console.log("rotation right:");
        // console.log(gameArrays.blasterCannon.rot);
        // gameArrays.moveBlaster("clockwise");
        gameArrays.rotateBlaster(-1);

    } else if (value.key === "ArrowUp") {
        // gameArrays.blasterCannon.rot = -360 / 180 * Math.PI / 15;
        // console.log("rotation left:");
        // console.log(gameArrays.blasterCannon.rot);
        // gameArrays.moveBlaster("counter-clockwise");
        gameArrays.rotateBlaster(1);

    } else if (value.key === "ArrowRight") {
        gameArrays.updateAmmo("add", "laser");

    } else if (value.key === "ArrowLeft") {
        gameArrays.updateAmmo("add", "bomb");

    } else if (value.key === "w" || value.key === "W") {
        gameArrays.endLevel();

    } else if (value.key === "s" || value.key === "S") {
        gameArrays.enterLevel(1);
        
    } else if (value.key === "a" || value.key === "A") {
        let ammoString = "laser";
        gameArrays.shootBlaster(ammoString);
        gameArrays.fireWeapon(ammoString, 0);

    } else if (value.key === "d" || value.key === "D") {
        let ammoString = "bomb";
        gameArrays.shootBlaster(ammoString);
        gameArrays.fireWeapon(ammoString, 0);

    } else {
        console.log(`value.key: ${value.key}`);

    };
};

const bubbleArray = [];
let currentLevel = 0;

// testing event loop:
function startGame() {

    // get level from local storage?

    startBtn.style.display = "none";
    gameArrays.updateLevel(currentLevel);
    gameArrays.displayMsg("show", "begin");
    // ("show", "end"):
    document.addEventListener("keydown", naviCtrl, false);
};

let levelLoop;

function startLevel(levelOver, gameStatus) {

    if (levelOver != false) {

        let myBlaster = document.getElementById("blaster");
        myBlaster.style.display = "block";
        let turret = document.querySelector(".turret");
        turret.style.display = "block";

        let count = 0,
            deployed = gameArrays.enterLevel();
        console.log(deployed);

        // TODO: add bombs/lasers to currentAmmo object based on level selected and saved ammo from previous levels
        // TODO: add ammo counts based on relived/relaunched levels

        let gameLoop = setInterval(bubbleBlower, 1000);

        function randomDirection(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        function bubbleBlower() {

            if (count < deployed) {

                let size = Math.random() * 30 + 15;
                let left = Math.random() * 600 + 40;
                let top = Math.random() * 500 + 40;
                // let dx = Math.floor(Math.random() * 10) + 5;
                // let dy = Math.floor(Math.random() * 10) + 5;
                let dx = randomDirection(-25, 25);
                let dy = randomDirection(-25, 25);
                let color = "#" + Math.floor(Math.random() * 16777215).toString(16).slice(2, 8).toUpperCase();

                console.log("color");
                console.log(color);

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
                let bubbleObject = new bubbleBuilder(left, top, size / 2, dx, dy, bubbleID, 0.7, 10);
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
            this.friction = .5;
            this.area = (Math.PI * radius * radius) / 10000;
            this.bubbleElem = "";
            this.updatePos = function (elemIDTouched) {
                let elemTouched = document.getElementById(elemIDTouched);
                let elemCoords = elemTouched.getBoundingClientRect();



                // this.xPos += this.dx; 
                // this.yPos += this.dy;

                // console.log(this.xPos);
                // console.log(this.yPos);
                // console.log("elemCoords");
                // console.log(elemCoords);

                if (this.xPos + this.dx < this.radius || this.xPos + this.dx > elemCoords.width - this.radius) {
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



                        // if (this.xPos + this.radius + (bubbleArrElem.width / 2) > bubbleArrElem.left &&
                        //     this.xPos < bubbleArrElem.left + this.radius + (bubbleArrElem.width / 2) &&
                        //     this.yPos + this.radius + (bubbleArrElem.height / 2) > bubbleArrElem.top &&
                        //     this.yPos < bubbleArrElem.top + this.radius + (bubbleArrElem.height / 2)) {

                        // //         //pythagoras 
                        // //     var distX = this.xPos - bubbleArrElem.left;
                        // //     var distY = this.yPos - bubbleArrElem.top;
                        // //     var d = Math.sqrt((distX) * (distX) + (distY) * (distY));

                        // //     //checking circle vs circle collision 
                        // //     if (d < this.radius + (bubbleArrElem.width / 2)) {
                        // //         var nx = (bubbleArrElem.left - this.xPos) / d;
                        // //         var ny = (bubbleArrElem.top - this.yPos) / d;
                        // //         var p = 2 * (this.dx * nx + this.dy * ny - b2.velocity.x * nx - b2.velocity.y * ny) / (b1.mass + b2.mass);

                        // //         // calulating the point of collision 
                        // //         var colPointX = ((this.xPos * (bubbleArrElem.width / 2)) + (bubbleArrElem.left * this.radius)) / (this.radius + (bubbleArrElem.width / 2));
                        // //         var colPointY = ((this.yPos * (bubbleArrElem.width / 2)) + (bubbleArrElem.top * this.radius)) / (this.radius + (bubbleArrElem.width / 2));

                        // //         //stoping overlap 
                        // //         this.xPos = colPointX + this.radius * (this.xPos - bubbleArrElem.left) / d;
                        // //         this.yPos = colPointY + this.radius * (this.yPos - bubbleArrElem.top) / d;
                        // //         bubbleArrElem.left = colPointX + (bubbleArrElem.width / 2) * (bubbleArrElem.left - this.xPos) / d;
                        // //         bubbleArrElem.top = colPointY + (bubbleArrElem.width / 2) * (bubbleArrElem.top - this.yPos) / d;

                        // //         //updating velocity to reflect collision 
                        // //         this.dx -= p * this.mass * nx;
                        // //         this.dy -= p * this.mass * ny;
                        // //         // b2.velocity.x += p * b2.mass * nx;
                        // //         // b2.velocity.y += p * b2.mass * ny;
                        // //     };
                        // // };



                        // // if (bubbleArrElem.left < bubbleCoords.right + this.radius + (bubbleArrElem.width / 2) &&
                        // // if (bubbleArrElem.left < bubbleCoords.right &&
                        // //     bubbleArrElem.right > bubbleCoords.left &&
                        // //     bubbleArrElem.top < bubbleCoords.bottom &&
                        // //     bubbleArrElem.bottom > bubbleCoords.top) {
                        //         // this.dx *= -1;
                        //         // this.dy *= -1;
                        //         // return otherBubblesArr[i].id;
                        // // };

                        // if ((this.dx == 1)) {
                        //     if ((bubbleCoords.right == bubbleArrElem.left)) {
                        //         if ((bubbleCoords.top <= bubbleArrElem.top) && (bubbleCoords.bottom >= bubbleArrElem.top) ||
                        //             ((bubbleCoords.bottom >= bubbleArrElem.bottom) && (bubbleCoords.top <= bubbleArrElem.bottom))) {
                        //             this.dx = -this.dx;
                        //         };
                        //     };
                        // } else if ((this.dx == -1)) {
                        //     if ((bubbleCoords.left == bubbleArrElem.right)) {
                        //         if ((bubbleCoords.top <= bubbleArrElem.top) && (bubbleCoords.bottom >= bubbleArrElem.top) ||
                        //             ((bubbleCoords.bottom >= bubbleArrElem.bottom) && (bubbleCoords.top <= bubbleArrElem.bottom))) {
                        //             this.dx = -this.dx;
                        //         };
                        //     };
                        // };

                        // if ((this.dy == 1)) {
                        //     if ((bubbleCoords.bottom == bubbleArrElem.top)) {
                        //         if ((bubbleCoords.left <= bubbleArrElem.left) && (bubbleCoords.right >= bubbleArrElem.left) ||
                        //             ((bubbleCoords.right >= bubbleArrElem.right) && (bubbleCoords.left <= bubbleArrElem.right))) {
                        //             this.dy = -this.dy;
                        //         };
                        //     };
                        // } else if ((this.dy == -1)) {
                        //     if ((bubbleCoords.top == bubbleArrElem.bottom)) {
                        //         if ((bubbleCoords.left <= bubbleArrElem.left) && (bubbleCoords.right >= bubbleArrElem.left) ||
                        //             ((bubbleCoords.right >= bubbleArrElem.right) && (bubbleCoords.left <= bubbleArrElem.right))) {
                        //             this.dy = -this.dy;
                        //         };
                        //     };
                        // };

                        ///////////////////////////////////////////////////////////////////////

                        // if ((Math.abs(this.xPos - bubbleArrElem.left) < (this.radius + (bubbleArrElem.width / 2))) && (Math.abs(this.yPos - bubbleArrElem.top) < (this.radius + (bubbleArrElem.width / 2)))) {
                        //     //reverse ball one
                        //     this.dx *= -1;
                        //     this.dy *= -1;

                        //     let ballObj = bubbleArray.find(bubble => bubble.id === otherBubblesArr[i].id);
                        //     console.log("ballObj");
                        //     console.log(ballObj);

                        //     //reverse ball two
                        //     ballObj.dx *= -1;
                        //     ballObj.dy *= -1;

                        //     ballObj.movePos();

                        //     // let reboundBall = document.getElementById(otherBubblesArr[i].id);
                        //     // bubbleArray.findOne
                        //     // reboundBall.style.left = `${this.xPos}px`;
                        //     // reboundBall.style.top = `${this.yPos}px`;
                        // };
                    };
                };
                this.movePos();
                // this.bubbleElem = document.getElementById(this.id);
                // this.bubbleElem.style.left = `${this.xPos}px`;
                // this.bubbleElem.style.top = `${this.yPos}px`;
            };
        };

        // let bubbleObject = new bubbleBuilder(10, 10, 5, 2, -2, "bubble-0");
        // console.log(bubbleObject);

        async function gameLoopTest() { // draw() 
            // draw the dom elems:
            let gamescreen = document.getElementById("game-screen");
            let gamescreenCoords = gamescreen.getBoundingClientRect();

            // let xPos = gamescreenCoords.width / 2;
            // let yPos = gamescreenCoords.height - 30;

            // TODO: check if bubbles are all destroyed or lives used
            // if (bubbleArray.length > 0) {

            for (let i = 0; i < bubbleArray.length; i++) {
                // console.log("bubbleArray[i].updatePos('game-screen')");
                await bubbleArray[i].updatePos("game-screen");
                await bubbleArray[i].coordChecker();
                await bubbleArray[i].movePos();
            };

            // gameArrays.updateBlaster();


            // cartesian coors:
        };
        levelLoop = setInterval(gameLoopTest, 150);
    } else {

        let gamescreen = document.getElementById("game-screen");
        gamescreen.innerHTML = "";
        clearInterval(levelLoop);
        if (gameStatus === "success") {
            // gameArrays.currentLevel++;
            currentLevel++;
            gameArrays.updateLevel(currentLevel);
            gameArrays.displayMsg("show", "begin");

        } else {
            currentLevel = 0;
            gameArrays.updateLevel(currentLevel);
            gameArrays.displayMsg("show", "play again");
        }
    };
};