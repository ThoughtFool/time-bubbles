class Bullet {
    constructor(id, xPos, yPos, angle, speed, ammoString, height, width, ready) {
        this.id = id;
        this.xPos = xPos;
        this.yPos = yPos;
        this.angle = angle;
        this.speed = speed;
        this.ammoString = ammoString;
        this.height = height;
        this.width = width;
        this.ready = ready;
        this.dx = 0.0;
        this.dy = 0.0;
        this.radius = 5.0;
    };

    tick() {
        this.xPos += this.dx;
        this.yPos += this.dy;

        let gamescreenCoords = gamescreen.getBoundingClientRect();
        let myLaser = document.getElementById(this.id);

        if (this.xPos + this.radius < 0.0 ||
            this.xPos - this.radius > gamescreenCoords.right ||
            this.yPos + this.radius < 0.0 ||
            this.yPos - this.radius > gamescreenCoords.bottom) {

            this.dx = 0.0;
            this.dy = 0.0;

            myLaser.parentNode.removeChild(myLaser);
            return "explode";
        } else {
            let laserCoords = myLaser.getBoundingClientRect();
            let arrayToCheck = gameArrays.currentHordeArr;
            // let itemBoxArray = document.querySelectorAll(".item-box");
            for (let i = 0; i < gameArrays.currentHordeArr.length; i++) {
                let arrElem = document.getElementById(`${gameArrays.currentHordeArr[i].id}`);
                let arrItem = arrElem.getBoundingClientRect();

                if (arrItem.left < laserCoords.right &&
                    arrItem.right > laserCoords.left &&
                    arrItem.top < laserCoords.bottom &&
                    arrItem.bottom > laserCoords.top) {
                    // return arrayToCheck[i].id;
                    removeElem(this.id);
                    this.dx = 0.0;
                    this.dy = 0.0;
                    // TODO: remove from array too!

                    gameArrays.updateHorde(i, "destroy");

                    return "explode";
                };
                // else if (arrItem.left < laserCoords.right &&
                //     arrItem.right > this.xPos &&
                //     arrItem.top < laserCoords.bottom &&
                //     arrItem.bottom > this.yPos) {
                //     // return arrayToCheck[i].id;
                //     return "explode";
                // };
            };
        };
        return " ";
    };
};

class Bomb {
    constructor(id, xPos, yPos, height, width, ammoString, ready) {
        this.id = id;
        this.xPos = xPos;
        this.yPos = yPos;
        this.ammoString = ammoString;
        this.height = height;
        this.width = width;
        this.ready = ready;
        this.radius = 5.0;
    };

    tick() {

        // let myBomb = document.getElementById(this.id);
        let shockwave = document.querySelector(".shockwave");
        let hitBox = document.querySelector(".hit-box");
        let result;
        let pathway;
        let coords;

        if (typeof (shockwave) != 'undefined' && shockwave != null) {
            coords = shockwave.getBoundingClientRect();
            pathway = "shockwave";
            result = "explode";

            // let hitBox = document.querySelector(".hit-box");
            // let hitBoxCoords = hitBox.getBoundingClientRect();
            let arrayToCheck = gameArrays.currentHordeArr;

            for (let i = 0; i < gameArrays.currentHordeArr.length; i++) {
                let arrElem = document.getElementById(`${gameArrays.currentHordeArr[i].id}`);
                let arrItem = arrElem.getBoundingClientRect();

                if (arrItem.left < coords.right &&
                    arrItem.right > coords.left &&
                    arrItem.top < coords.bottom &&
                    arrItem.bottom > coords.top) {

                    // removeElem(this.id):
                    // if (pathway === "shockwave") { // add teleports if(bomb):

                    gameArrays.currentHordeArr[i].dx = -gameArrays.currentHordeArr[i].dx;
                    gameArrays.currentHordeArr[i].dy = -gameArrays.currentHordeArr[i].dy;

                    gameArrays.currentHordeArr[i].xPos += (gameArrays.currentHordeArr[i].dx);
                    gameArrays.currentHordeArr[i].yPos += (gameArrays.currentHordeArr[i].dy);

                    gameArrays.updateHorde(i, "teleport");

                    // };
                    // else { // add hits:
                    //     gameArrays.health -= 20;
                    //     console.log(gameArrays.currentHordeArr[i].id);
                    //     gameArrays.currentHordeArr[i].dx = -this.dx;
                    //     gameArrays.currentHordeArr[i].dy = -this.dy;

                    //     alert(`Careful there! You health is now: ${gameArrays.health}.`);

                    //     // setTimeout(() => {

                    //     // }, 2000);
                    // };
                    return result;
                };
            };
        };
        return " ";
    };
};

function bubbleBuilder(id_, currentLevel, levelsLived, xPos, yPos, radius, dx, dy, id, e, mass, color, size) {
    this.id_ = id_;
    this.currentLevel = currentLevel;
    this.levelsLived = levelsLived;
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.dx = dx; // left or right
    this.dy = dy; // up or down
    this.id = id;
    this.e = -e;
    this.mass = mass;
    this.color = color;
    this.size = size;
    this.drawn = false;
    this.gravity = 9.81;
    this.friction = .5;
    this.area = (Math.PI * radius * radius) / 10000;
    this.bubbleElem = "";
    this.updatePos = function (elemIDTouched, elemIDTouched2, tempField, tempFieldActive) {

        if (tempFieldActive == true) {
            elemIDTouched2 = tempField;
        };

        let elemTouched = document.getElementById(elemIDTouched);
        let elemCoords = elemTouched.getBoundingClientRect();

        let elemTouched2 = document.getElementById(elemIDTouched2);
        let elemCoords2 = elemTouched2.getBoundingClientRect();

        let bubbleElem = document.getElementById(this.id);

        if (this.xPos + this.dx < this.radius || this.xPos + this.dx > elemCoords.width - this.radius) {
            this.dx = -this.dx;
        };

        if (this.yPos + this.dy < this.radius || this.yPos + this.dy > elemCoords.height - this.radius) {
            this.dy = -this.dy;
        };

        if (this.xPos < elemCoords2.right - this.radius &&
            this.xPos + this.size > elemCoords2.left + this.radius &&
            this.yPos < elemCoords2.bottom - this.radius &&
            this.yPos + this.size > elemCoords2.top + this.radius) {

            if (tempFieldActive !== true) {

                if (gameArrays.health <= 0) {
                    gameArrays.health = 100;
                    gameArrays.lives--;
                    alert(`Warning! You only have ${gameArrays.lives} left.`);

                } else {
                    gameArrays.health -= 5;
                };

                let forceField = document.querySelector(".force-field");
                forceField.classList.add("collision-detected");

                // let gamescreen = document.querySelector("gamescreen");
                gamescreen.classList.add("color-flash");

                setTimeout(() => {
                    forceField.classList.remove("collision-detected");
                    gamescreen.classList.remove("color-flash");
                    // bubbleElem.classList.remove("collision-detected");
                }, 500);

                updateStats();
            };

            this.dx = -this.dx;
            this.dy = -this.dy;
        };

        this.xPos += this.dx;
        this.yPos += this.dy;

        this.movePos();
    };
    this.movePos = function () {
        this.bubbleElem = document.getElementById(this.id);
        if (typeof (this.bubbleElem) != 'undefined' && this.bubbleElem != null) {
            this.bubbleElem.style.left = `${this.xPos}px`;
            this.bubbleElem.style.top = `${this.yPos}px`;
        };
    };
    // check bubble collisions with laser array:
    this.coordChecker = function (elemID, arrayToCheck) {
        let elem = document.getElementById(elemID);
        console.log("elemID");
        console.log(elemID);
        if (typeof (elem) != 'undefined' && elem != null && arrayToCheck.length > 0) {
            let elemCoords = elem.getBoundingClientRect();
            // let itemBoxArray = document.querySelectorAll(".item-box");
            for (let i = 0; i < arrayToCheck.length; i++) {

                let arrElem = document.getElementById(`${arrayToCheck[i].id}`);
                let arrItem = arrElem.getBoundingClientRect();

                if (arrItem.left < elemCoords.right &&
                    arrItem.right > elemCoords.left &&
                    arrItem.top < elemCoords.bottom &&
                    arrItem.bottom > elemCoords.top) {
                    console.log(arrayToCheck[i].id);
                    return "explode";
                };
            };
        };
    };
    this.wallChecker = function (boundaryID) {
        let boundaryElem = document.getElementById(boundaryID);
        let boundaryCoords = boundaryElem.getBoundingClientRect();
        if (this.xPos + this.radius < 0.0 ||
            this.xPos - this.radius > boundaryCoords.right ||
            this.yPos + this.radius < 0.0 ||
            this.yPos - this.radius > boundaryCoords.bottom) {

            this.dx = 0.0;
            this.dy = 0.0;

            let myLaser = document.getElementById(this.id);
            myLaser.parentNode.removeChild(myLaser);
            return false;
        }
    };
};

const quotes = [{
        author: "Abraham Lincoln",
        text: "You cannot escape the respnsibility of tomorrow by evading it today.",
        race: "human"
    },
    {
        author: "Janet Dailey",
        text: "Someday is not a day of the week.",
        race: "human"
    },
    {
        author: "Charles Dickens",
        text: "Procrastination is the theif of time.",
        race: "human"
    },
    {
        author: "Leonardo da Vinci",
        text: "It is easier to resist at the beginning than at the end.",
        race: "human"
    },
    {
        author: "Israelmore Ayivor",
        text: "The day you procratinate, you loose that day's sucess.",
        race: "human"
    },
    {
        author: "Bejanmin Franklin",
        text: "Never leave till tomorrow that which you can do today.",
        race: "human"
    }
];

function getQuote() {
    let randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
};

let rotatePointer;

function afterLoading() {

    let myTestBlaster = document.getElementById("blaster");
    let myTestBlasterCoords = myTestBlaster.getBoundingClientRect();

    let mouseX = 0.0;
    let mouseY = 0.0;

    console.log("myTestBlasterCoords");
    console.log(myTestBlasterCoords);

    let blasterObj = {
        x: (myTestBlasterCoords.width * 0.5) | 0,
        y: (myTestBlasterCoords.height) | 0,
        dx: 0.0,
        dy: 0.0,
        angle: 0.0,
        radius: 17.5,

        tick: function (angle) {
            this.angle = angle;
            myTestBlaster.style.transform = `translate(${50}px, ${-50}px)`;

            // this.angle = Math.atan2(mouseY - this.y, mouseX - this.x);
            // coordChecker(this.id, arrayToCheck)
        },
        update: function (mouseX, mouseY) {
            var dx = mouseX - this.x;
            var dy = mouseY - this.y;
            this.angle = Math.atan2(dy, dx);
        }
    };

    function updateBeam(projectile) {
        // TODO: make loop for all projectiles or make a method of laser/bomb:
        let ammoString = "laser";
        gameArrays.fireWeapon(ammoString);

        let gamescreen = document.getElementById("game-screen");
        let laserBeam = document.createElement("div");
        laserBeam.className = "laser-beam";

        let laserID = projectile.id;
        laserBeam.id = laserID;
        gamescreen.append(laserBeam);

        let myLaser = document.getElementById(laserID);
        console.log(myLaser);

        myLaser.style.position = "absolute";

        myLaser.style.left = `${projectile.xPos}px`;
        myLaser.style.top = `${projectile.yPos}px`;

        let exists = " ";
        let bubbleBlasted = "";

        console.log("projectile");
        console.log(projectile);

        function loop() {

            if (exists != "explode") {

                let myLaser = document.getElementById(laserID);
                let myLaserCoords = myLaser.getBoundingClientRect();

                let newPosX = myLaserCoords.left += projectile.dx;
                let newPosY = myLaserCoords.top += projectile.dy;

                myLaser.style.left = `${newPosX}px`;
                myLaser.style.top = `${newPosY}px`;

                // bullet.render();
                // player.render();

                exists = projectile.tick();

                if (exists === "explode") {
                    console.log();
                    let indexToRemove = gameArrays.blaster.currentAmmo.laser.shots.findIndex(val => val.id === laserID);
                    gameArrays.blaster.currentAmmo.laser.shots.splice(indexToRemove, 0);
                };
                requestAnimationFrame(loop);
            };
        };
        loop();
    };

    ////////////////////////////////////////////////////////////////////////////////////////

    let centerPoint = window.getComputedStyle(myTestBlaster).transformOrigin,
        centers = centerPoint.split(" ");

    function rotatePointer(e) {
        let myTestBlaster = document.getElementById("blaster");
        let myTestBlasterCoords = myTestBlaster.getBoundingClientRect();

        let pointerEvent = e;
        if (e.targetTouches && e.targetTouches[0]) {
            e.preventDefault();
            pointerEvent = e.targetTouches[0];
            mouseX = pointerEvent.pageX;
            mouseY = pointerEvent.pageY;
        } else {
            mouseX = e.clientX,
                mouseY = e.clientY;
        };

        let centerY = myTestBlasterCoords.top + parseInt(centers[1] + (myTestBlasterCoords.width / 2)),
            centerX = myTestBlasterCoords.left + parseInt(centers[0] + (myTestBlasterCoords.width / 2)),

            // is this reversed?
            radians = Math.atan2(mouseX - centerX, mouseY - centerY),
            degrees = (radians * (180 / Math.PI) * -1) + 180;

        blasterObj.tick(radians);

        //////////////////////////////////////// above code centers blaster ////////////////////////////////////////////////

        // var center_x = (myTestBlasterCoords.left) + (myTestBlasterCoords.width / 2);
        // var center_y = (myTestBlasterCoords.top) + (myTestBlasterCoords.height / 2);
        // var mouse_x = e.pageX;
        // var mouse_y = e.pageY;
        // var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
        // var degrees = (radians * (180 / Math.PI) * -1) + 90;

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        let crossHair = document.getElementById("cross-hair");
        let myTurret = document.querySelector(".turret");
        let wing = document.querySelector(".wing");

        myTestBlaster.style.transform = `rotate(${degrees}deg)`;
        myTurret.style.transform = `rotate(${degrees}deg)`;
        wing.style.transform = `rotate(${degrees}deg)`;
    };
    gamescreen.addEventListener('mousemove', rotatePointer);
    gamescreen.addEventListener('touchmove', rotatePointer);
    gamescreen.addEventListener('touchstart', rotatePointer);
    gamescreen.addEventListener('mousedown', launcher);

    function launcher(e) {

        if (e.which === 1) {

            let ammoString = "laser";

            if (gameArrays.blaster.currentAmmo[ammoString].count.length >= 1) {

                // removes from storage to ready status: 
                let ammoStatus = gameArrays.shootBlaster(ammoString);
                console.log(ammoStatus);

                let myTestBlaster = document.getElementById("blaster");
                let myTestBlasterCoords = myTestBlaster.getBoundingClientRect();

                console.log("myTestBlasterCoords");
                console.log(myTestBlasterCoords);

                // The mouse pos - the myTestBlasterCoords pos gives a vector
                // that points from the myTestBlasterCoords toward the mouse
                let x = mouseX - myTestBlasterCoords.x;
                let y = mouseY - myTestBlasterCoords.y;

                // (the length of the vector)
                let vectorLength = Math.sqrt(x * x + y * y);

                // Dividing by the distance gives a normalized vector whose length is 1
                x = x / vectorLength;
                y = y / vectorLength;

                let indexReady = gameArrays.blaster.currentAmmo[ammoString].shots.findIndex(isReady);
                // let laserID = gameArrays.blaster.currentAmmo[ammoString].shots[indexReady].id;

                // gameArrays.blaster.currentAmmo[ammoString].shots[indexReady].id = laserID;
                gameArrays.blaster.currentAmmo[ammoString].shots[indexReady].ready = false;
                gameArrays.blaster.currentAmmo[ammoString].shots[indexReady].xPos = myTestBlasterCoords.x;
                gameArrays.blaster.currentAmmo[ammoString].shots[indexReady].yPos = myTestBlasterCoords.y;

                // Get the bullet to travel towards the mouse pos with a new speed of 10.0 (you can change this)
                gameArrays.blaster.currentAmmo[ammoString].shots[indexReady].dx = x * 10.0;
                gameArrays.blaster.currentAmmo[ammoString].shots[indexReady].dy = y * 10.0;

                updateBeam(gameArrays.blaster.currentAmmo[ammoString].shots[indexReady]);

            } else {
                alert("You don't have any ammo!");
            };
        };
    };
};

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
console.log(gamescreenCoords.width / 2 + 15);
console.log(gamescreenCoords.height / 2);

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
    health: 100,
    enemyCount: 0,
    currentLevel: 0,
    gameStatus: "success",
    savedHorde: [],
    currentHordeArr: [],
    levelHordeArr: [],
    teleportedHordeArr: [],
    globalCount: 0,
    fieldActive: true,
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
        let result = rads * (180 / Math.PI);
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
    lives: 3,
    blaster: {
        id: "blaster",
        angle: 60,
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
        // shots: [],
        noseX: gamescreenCoords.width / 2 + 15,
        noseY: gamescreenCoords.height / 2,
        radius: 15,
        left: gamescreenCoords.width / 2,
        top: gamescreenCoords.height / 2,
        rotateSpeed: 0.001
    },
    laserCount: 0,
    bombCount: 0,
    moveBlaster: function (direction) {
        let myBlaster = document.getElementById("blaster");
        myBlaster.style.position = "absolute";

        // console.log("this.blasterCannon.rot");
        // console.log(this.blasterCannon.rot);
        console.log("this.blaster.angle");
        console.log(this.blaster.angle);

        let newDeg = this.radsToDegs(this.blaster.angle);
        // let newDegY = this.radsToDegs(this.blaster.noseY);
        console.log("newDeg");
        console.log(newDeg);
        let rads = this.blaster.angle / Math.PI * 180;
        console.log(90 + rads * 360);

        // console.log("newDegY");
        // console.log(newDegY);

        if (direction === "clockwise" || direction === 1) {
            // if (direction === "clockwise" && newDeg < 180) {
            myBlaster.style.transform = `rotate(${90 + rads * 360}deg)`;
            // this.blasterCannon.a += this.blasterCannon.rot;

        } else if (direction === "counter-clockwise" || direction === -1) {
            // } else if (direction === "counter-clockwise" && newDeg > 0) {
            myBlaster.style.transform = `rotate(${90 + rads * 360}deg)`;
            // this.blasterCannon.a += this.blasterCannon.rot;

        } else {
            console.log("error");
        };
    },
    rotateBlaster: function (dir) {

        this.blaster.angle += this.blaster.rotateSpeed * dir;

        console.log(this.blaster.angle);
        this.updateBlaster(dir);
    },
    updateBlaster: function (dir) {
        console.log("noseX");
        console.log(this.blaster.noseX);

        let myBlaster = document.getElementById("blaster");
        let myBlasterCoords = myBlaster.getBoundingClientRect();
        this.blaster.left = myBlasterCoords.left;
        this.blaster.top = myBlasterCoords.top;

        let rads = this.blaster.angle * Math.PI / 180;
        console.log("rads");
        console.log(rads);

        let xVel = Math.cos(rads) * 10;
        let yVel = Math.sin(rads) * 10;
        this.blaster.noseX = this.blaster.left + this.blaster.radius * Math.cos(rads);
        this.blaster.noseY = this.blaster.top - this.blaster.radius * Math.sin(rads);

        console.log("xVel");
        console.log(xVel);
        console.log(yVel);
        console.log(this.blaster.noseX);

        this.moveBlaster(dir);
    },
    shootBlaster: function (ammoString) {
        console.log("weapons system is armed");

        // testing ONLY:
        // let index = projectileCount;
        let index = 0;
        let indexReady;
        if (this.blaster.currentAmmo[ammoString].count.length > 0) {
            if (ammoString === "laser") {

                let projectile = this.blaster.currentAmmo[ammoString].count[index];
                this.blaster.currentAmmo[ammoString].shots.push(projectile);
                console.log("shots.push");
                console.log(this.blaster.currentAmmo[ammoString].shots);
                this.blaster.currentAmmo[ammoString].count.splice(index, 1);
                console.log("count.splice");
                console.log(this.blaster.currentAmmo[ammoString].count);

            } else if (ammoString === "bomb") {
                // updateBeam(this.blaster.currentAmmo[ammoString].shots[indexReady]);

                let projectile = this.blaster.currentAmmo[ammoString].count[index];
                this.blaster.currentAmmo[ammoString].shots.push(projectile);
                console.log("shots.push");

                indexReady = this.blaster.currentAmmo[ammoString].shots.findIndex(isReady);
                this.blaster.currentAmmo[ammoString].shots[indexReady].ready = false;
                this.blaster.currentAmmo[ammoString].count.splice(index, 1);
                console.log("count.splice");
            };
            updateStats();

            // this.fireWeapon(ammoString, 0);
            return indexReady;
            return "locked & loaded";

        } else {
            console.log("no weapons");
        };

    },
    makeAmmo: function (angle, ammoString) {
        let xPos = this.blaster.noseX,
            yPos = this.blaster.noseY;

        if (ammoString === "laser") {
            let laserID = `${ammoString}-${this.laserCount}`;
            let newLaser = new Bullet(laserID, xPos, yPos, angle, 25, ammoString, 4, 4, true);
            this.blaster.currentAmmo[ammoString].count.push(newLaser);

            console.log("count.push");
            console.log(this.blaster.currentAmmo[ammoString].count);

            // TODO: make loop for all projectiles or make a method of laser/bomb:
            this.laserCount++;

        } else if (ammoString === "bomb") {
            let bombID = `${ammoString}-${this.bombCount}`;
            let hitBox = document.querySelector(".hit-box");
            let hitBoxCoords = hitBox.getBoundingClientRect();
            let newBomb = new Bomb(bombID, hitBoxCoords.left, hitBoxCoords.top, hitBoxCoords.height, hitBoxCoords.width, ammoString, true);

            this.blaster.currentAmmo[ammoString].count.push(newBomb);

            console.log("count.push (bomb)");
            console.log(this.blaster.currentAmmo[ammoString].count);

            this.bombCount++;
        };
        // this.blaster.currentAmmo[ammoString].count.push(newProjectile);
    },
    updateLaser: function () {
        // TODO: make loop for all projectiles or make a method of laser/bomb:
    },
    updateHistory: function () {
        this.history[this.currentLevel].hordeArr = this.currentHordeArr;
    },
    updateLevel: function (currentLevel) {
        this.currentLevel = currentLevel;
    },
    randomNumber: function (min, max, skipRange) {
        let randomRange = Math.floor(Math.random() * (max - min) + min);
        let negSpace = max - skipRange;
        let dividedNegSpace = Math.floor(negSpace / 2);
        let startSkipRange = dividedNegSpace;
        let endSkipRange = dividedNegSpace + skipRange;

        if (randomRange > startSkipRange && randomRange < endSkipRange) {
            this.randomNumber(min, max, skipRange);
        } else {
            return randomRange;
        };
    },
    randRange: function (min, max, minRange, maxRange) {

        let randomRange1 = Math.floor(Math.random() * (maxRange - min) + min);
        let randomRange2 = Math.floor(Math.random() * (max - minRange) + minRange);
        let rangeArr = [randomRange1, randomRange2];
        let coinFlip = Math.floor(Math.random() * 2);

        return rangeArr[coinFlip];
    },
    spawnHorde: function () {
        let hordeArr = [];
        let ceilCount = this.levelData[this.currentLevel].hordeNum + this.globalCount;
        let tempField = document.getElementById("temp-field");

        let tempFieldCoords = tempField.getBoundingClientRect();
        let gamescreenCoords = gamescreen.getBoundingClientRect();
        // let random_xPos = this.randomNumber(gamescreenCoords.left, gamescreenCoords.right, 300);
        // let random_yPos = this.randomNumber(gamescreenCoords.left, gamescreenCoords.right, 300);

        for (let i = 0; i < this.levelData[this.currentLevel].hordeNum; i++) {
            let size = Math.random() * 30 + 15;
            // let left = Math.random() * 600 + 40;
            // let top = Math.random() * 500 + 40;

            // let left = this.randomNumber(gamescreenCoords.left + size, gamescreenCoords.right - size, 150);
            // let top = this.randomNumber(gamescreenCoords.top + size, gamescreenCoords.bottom - size, 150);

            let left = this.randRange(gamescreenCoords.left + size / 2, gamescreenCoords.right - size / 2, tempFieldCoords.left - size / 2, tempFieldCoords.right + size / 2);
            let top = this.randRange(gamescreenCoords.top + size / 2, gamescreenCoords.bottom - size / 2, tempFieldCoords.top - size / 2, tempFieldCoords.bottom + size / 2);

            console.log(`left: ${left}, top: ${top}`)
            // let dx = Math.floor(Math.random() * 10) + 5;
            // let dy = Math.floor(Math.random() * 10) + 5;
            let dx = this.randomDirection(-25, 25);
            let dy = this.randomDirection(-25, 25);
            let color = "#" + Math.floor(Math.random() * 16777215).toString(16).slice(2, 8).toUpperCase();
            let bubbleID = `bubble-${this.currentLevel}-${i}`;
            let id_ = `horde-${this.currentLevel}-${i}`;
            let currentLevel = this.currentLevel;
            let levelsLived = [];

            let monsterBubbleObj = new bubbleBuilder(id_, currentLevel, levelsLived, left, top, size / 2, dx, dy, bubbleID, 0.7, 10, color, size);
            bubbleArray.push(monsterBubbleObj);
            hordeArr.push(monsterBubbleObj);
            this.globalCount = i;
        };
        return hordeArr;
    },
    updateHorde: function (indexToRemove, teleportOrDestroyString) {
        // TODO: use removeItemFromArr() for actions below:
        // also merge destroy and teleport to single if(teleport){savedHorde.push}

        let elemID = this.currentHordeArr[indexToRemove].id;
        let elem = document.getElementById(elemID);

        if (teleportOrDestroyString === "destroy") {

            elem.parentNode.removeChild(elem);
            this.currentHordeArr.splice(indexToRemove, 1);

        } else if (teleportOrDestroyString === "teleport") {
            this.savedHorde.push(this.currentHordeArr[indexToRemove]);
            elem.parentNode.removeChild(elem);
            this.currentHordeArr.splice(indexToRemove, 1);

        } else {
            console.log("Action is undefined!");
        };

        this.enemyCount = this.currentHordeArr.length;
        updateStats();
    },
    combineHordes: function () {
        let combinedArr = this.levelHordeArr.concat(this.teleportedHordeArr);
        this.currentHordeArr = combinedArr;
    },
    // Enter new level:
    enterLevel: function () {
        console.log(`Entering Level: ${this.currentLevel}.`);

        hideBlaster(false);

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

        hideBlaster(true);
        console.log(`Ending Level: ${this.currentLevel}.`);
        this.displayMsg("show", "end");

        this.savedHorde = this.teleportedHordeArr;
        console.log("this.savedHorde");
        console.log(this.savedHorde);
        this.addLevelsLived();
    },
    returnLevel: function (level) {
        console.log(`Returning to Level: ${level}.`);

        hideBlaster(false);

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
            if (this.currentHordeArr[i].id === monsterID && this.currentHordeArr[i].levelsLived.length >= 1) {
                return this.currentHordeArr[i].levelsLived;
            };
        };
    },
    removeSavePoint: function () {
        for (let i = 0; i < this.currentHordeArr.length; i++) {
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

        let rad = this.blaster.deg * (Math.PI / 180);

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
    },
    blasterCannon: {

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
    // TODO: merge laser/bomb:
    fireWeapon: function (actionString) {
        if (actionString == "laser" && this.blaster.currentAmmo[actionString].count.length > 0) {
            // TODO: move updateHorde to collison detection:
            // this.updateHorde(indexOfBubble, "destroy");

            this.updateAmmo("remove", actionString);

        } else if (actionString == "bomb" && this.blaster.currentAmmo[actionString].count.length > 0) {
            // TODO: move updateHorde to collison detection && edit updateHorde string some you can REMOVE "else if" (redundant)
            // "bomb" == "teleport" && "laser" == "destroy"
            // this.updateHorde(indexOfBubble, "teleport");

            this.updateAmmo("remove", actionString);

        } else {
            console.log(`error: actionString not defined or ammo count is below 0. Ammo: ${this.blaster.currentAmmo[actionString].count.length} `);
        };
    },
    updateAmmo: function (actionString, ammoString) {

        if (actionString === "remove") {
            let notReadyIndex = this.blaster.currentAmmo[ammoString].shots.findIndex(isLaunched);
            this.blaster.currentAmmo[ammoString].shots.splice(notReadyIndex, 0);
            // this.blaster.currentAmmo[ammoString].count.pop();

        } else if (actionString === "add" && this.blaster.currentAmmo[ammoString].count.length < this.blaster.currentAmmo[ammoString].limit) {

            this.makeAmmo(this.blaster.angle, ammoString);
            // this.blaster.currentAmmo[ammoString].count.push(ammoString);

        } else {
            console.log("error: actionString not defined");
        };
        updateStats();

    },
    spawnAmmo: function (ammoString) {
        let ammo = document.createElement("div");
        ammo.style.position = "absolute";
        let xPosStart = this.blaster.xPos;
        let yPosStart = this.blaster.yPos;
        let angleFired = this.blaster.angle;
    },
    randomDirection: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    readyMsg: function () {
        let modal = document.getElementById("modal-bg");
        modal.style.display = "none";
        // this.enterLevel(this.currentLevel);
        startLevel(0, "start fresh");
        // let timeSave = gameArrays.checkLevel(gameArrays.currentLevel);
        // let lastTimeSave = timeSave[timeSave.length - 1];
        // gameArrays.returnLevel(lastTimeSave);
    },
    continueMsg: function () {
        let modal = document.getElementById("modal-bg");
        modal.style.display = "none";
        // gameArrays.enterLevel(gameArrays.currentLevel);
        startLevel(0, "continue");
    },
    returnMsg: function () {
        let modal = document.getElementById("modal-bg");
        modal.style.display = "none";
        startLevel(0, "return");
    },
    tryAgainMsg: function () {
        let modal = document.getElementById("modal-bg");
        modal.style.display = "none";
        // this.enterLevel(this.currentLevel);
        startLevel(0, "start fresh");
    },
    doneMsg: function () {
        let modal = document.getElementById("modal-bg");
        modal.style.display = "none";
        // this.enterLevel(this.currentLevel);
        startLevel(2);
    },
    displayMsg: function (msgStatus, msgType) {
        let modal = document.getElementById("modal-bg");
        let modalText = document.querySelector(".modal-text");
        let readyModal = document.getElementById("ready-modal");
        let continueModal = document.getElementById("continue-modal");
        let returnModal = document.getElementById("return-modal");
        let doneModal = document.getElementById("done-modal");
        let startBtn = document.querySelector(".startBtn");
        readyModal.addEventListener("click", this.readyMsg);
        continueModal.addEventListener("click", this.continueMsg);
        returnModal.addEventListener("click", this.returnMsg);
        doneModal.addEventListener("click", this.doneMsg);

        if (msgStatus === "ready") {
            modal.style.display = "none";
            // this.enterLevel(this.currentLevel);
            // startLevel(0);

        } else if (msgStatus === "show") {
            modal.style.display = "block";

            if (msgType === "end") {
                modalText.innerText = `You have completed level: ${this.currentLevel}. 
                ${this.savedHorde.length} bubble(s) will be teleported to next level.`;
                doneModal.style.display = "block";
                readyModal.style.display = "none";
                continueModal.style.display = "none";
                returnModal.style.display = "none";

            } else if (msgType === "begin") {
                modalText.innerText = `Entering Level: ${this.currentLevel}. Ready?`;
                readyModal.style.display = "block";
                doneModal.style.display = "none";
                continueModal.style.display = "none";
                returnModal.style.display = "none";

            } else if (msgType === "continue") {
                let newQuote = getQuote();
                modalText.innerText = `Entering Next Level: ${this.currentLevel}. Ready?
                
                ${newQuote.text}
                ~ ${newQuote.author}`;

                readyModal.style.display = "none";
                doneModal.style.display = "none";
                continueModal.style.display = "block";
                returnModal.style.display = "none";

            } else if (msgType === "return") {
                modalText.innerText = `Time Warp! Returning to Level: ${level}.`;
                readyModal.style.display = "none";
                doneModal.style.display = "none";
                continueModal.style.display = "none";
                returnModal.style.display = "block";

            } else if ("play again") {
                modalText.innerText = `Game over! Want to play again?`;
                readyModal.style.display = "none";
                doneModal.style.display = "none";
                startBtn.style.display = "block";
                continueModal.style.display = "none";
                returnModal.style.display = "none";

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

let startBtn = document.querySelector(".startBtn");
startBtn.addEventListener("click", launchSequence);

async function naviCtrl(value) {

    if (value.key === "ArrowRight") {
        gameArrays.updateAmmo("add", "laser");

    } else if (value.key === "ArrowLeft") {
        gameArrays.updateAmmo("add", "bomb");

    } else if (value.key === "w" || value.key === "W") {
        gameArrays.endLevel();

    } else if (value.key === "s" || value.key === "S") {

    } else if (value.key === " " || value.key === "Spacebar") {

        let ammoString = "bomb";

        if (gameArrays.blaster.currentAmmo[ammoString].count.length > 0) {

            let indexReady = gameArrays.shootBlaster(ammoString);
            let hitBox = document.querySelector(".hit-box");
            let exists = " ";

            hitBox.classList.add("shockwave");

            function bombLoop() {
                if (exists != "explode") {
                    gameArrays.blaster.currentAmmo[ammoString].shots[indexReady].tick();
                };
                requestAnimationFrame(bombLoop);
            };
            setTimeout(() => {
                hitBox.classList.remove("shockwave");
                exists = "explode";
                gameArrays.fireWeapon(ammoString);
            }, 1000);
            bombLoop();
        } else {
            alert("You don't have any ammo!");
        };
    } else {
        console.log(`value.key: ${value.key}`);
    };
};

const bubbleArray = [];
const weaponArray = [];
let currentLevel = 0;

function launchSequence() {
    startBtn.style.display = "none";
    let count = 0;
    let numCounterArr = [3, 2, 1];
    let numSeq = document.getElementById("num-seq");
    numSeq.style.display = "block";

    function countdown() {

        if (count < numCounterArr.length) {
            numSeq.innerText = numCounterArr[count];
            count++
        } else {
            clearInterval(liftOff);
            numSeq.style.display = "none";

            startGame();
        };
    };

    let liftOff = setInterval(countdown, 1000);
};

// testing event loop:
function startGame() {
    let currentLevel = 0;

    // get level from local storage?
    startBtn.style.display = "none";

    afterLoading();
    gameArrays.updateLevel(currentLevel);
    gameArrays.displayMsg("show", "begin");
    // ("show", "end"):
    document.addEventListener("keydown", naviCtrl, false);
};

let levelLoop;

function startLevel(levelOver, pathString) {

    if (levelOver == 0) {

        let myBlaster = document.getElementById("blaster");
        myBlaster.style.display = "block";
        let myBlasterCoords = myBlaster.getBoundingClientRect();
        console.log("myBlasterCoords: start");
        console.log(myBlasterCoords);

        // let turret = document.querySelector(".turret");
        // turret.style.display = "block";

        // let crossHair = document.querySelector("#cross-hair");
        // crossHair.style.display = "block";

        // let wing = document.querySelector(".wing");
        // wing.style.display = "block";

        // let hitBox = document.querySelector(".hit-box");
        // hitBox.style.display = "block";

        let count = 0;
        let deployed;

        if (pathString === "start fresh") {
            gameArrays.gameStatus = "success";
            deployed = gameArrays.enterLevel();

        } else if (pathString === "continue") {
            gameArrays.gameStatus = "success";
            deployed = gameArrays.enterLevel();

        } else if (pathString === "return") {
            gameArrays.gameStatus = "success";
            let timeSave = gameArrays.checkLevel(gameArrays.currentLevel);
            let lastTimeSave = timeSave[timeSave.length - 1];
            deployed = gameArrays.returnLevel(lastTimeSave);

        };

        //////////////////////// Generate Bubbles /////////////////////////////////

        function bubbleBlower() {

            // TODO: add globalCount to track previous bubbles:
            if (count < gameArrays.currentHordeArr.length) {

                let gamescreen = document.querySelector("#game-screen");
                let bubble = document.createElement("div");
                let bubbleID = gameArrays.currentHordeArr[count].id;
                bubble.id = bubbleID;
                bubble.classList.add("enemy", "bubble");

                gamescreen.append(bubble);

                let newBubble = document.getElementById(bubbleID);
                newBubble.style.height = `${gameArrays.currentHordeArr[count].size}px`;
                newBubble.style.width = `${gameArrays.currentHordeArr[count].size}px`;
                newBubble.style.left = `${gameArrays.currentHordeArr[count].xPos}px`;
                newBubble.style.top = `${gameArrays.currentHordeArr[count].yPos}px`;
                newBubble.style.backgroundColor = gameArrays.currentHordeArr[count].color;
                gameArrays.currentHordeArr[count].drawn = true;

                gameArrays.enemyCount = count + 1; // adding 1 (index count starts at zero)
                updateStats();

                count++

            } else {
                clearInterval(gameLoop);

                let hitBox = document.querySelector(".hit-box");
                hitBox.style.display = "block";

                let touchShip = document.getElementById("touch-ship");
                touchShip.style.display = "block";

                gameArrays.fieldActive = false;
                let tempField = document.getElementById("temp-field");
                tempField.style.display = "none";
            };
        };
        let gameLoop = setInterval(bubbleBlower, 1000);

        //////////////////////////////////////////////////////////////

        // TODO: add bombs/lasers to currentAmmo object based on level selected and saved ammo from previous levels
        // TODO: add ammo counts based on relived/relaunched levels

        async function gameLoopTest() { // draw()

            // TODO: check if bubbles are all destroyed or lives used
            if (gameArrays.currentHordeArr.length != 0 && gameArrays.gameStatus !== "failure") {

                for (let i = 0; i < gameArrays.currentHordeArr.length; i++) {
                    if (gameArrays.currentHordeArr[i].drawn === true) {
                        let indexToMove = i;

                        // await gameArrays.currentHordeArr[i].coordChecker(gameArrays.currentHordeArr[i].id, gameArrays.blaster.currentAmmo.laser.count);

                        await gameArrays.currentHordeArr[i].updatePos("game-screen", "touch-ship", "temp-field", gameArrays.fieldActive);
                        // await gameArrays.currentHordeArr[i].movePos();
                        // await gameArrays.currentHordeArr[i].updatePos("hit-box");
                        // await gameArrays.currentHordeArr[i].movePos();
                    };
                };
            } else if (gameArrays.currentHordeArr.length <= 0 && gameArrays.gameStatus === "success") {
                console.log("Congrats, you won!");
                startLevel(1, gameArrays.gameStatus);
            } else {
                console.log("Sorry, you lost!");
                gameArrays.gameStatus = "failure";
                gameArrays.lives--;
                startLevel(1, "failure");
            };
        };
        levelLoop = setInterval(gameLoopTest, 150);

    } else if (levelOver == 1) {

        let gamescreen = document.getElementById("game-screen");
        // removes all bubble elements from gamescreen:
        gamescreen.innerHTML = "";
        clearInterval(levelLoop);

        gameArrays.endLevel();

    } else {

        if (gameArrays.gameStatus === "success") {
            gameArrays.currentLevel++;
            // currentLevel++;
            gameArrays.updateLevel(gameArrays.currentLevel);
            gameArrays.displayMsg("show", "continue");

        } else if (gameArrays.lives != 0) {
            gameArrays.displayMsg("show", "return");

        } else {
            currentLevel = 0;
            this.globalCount = 0;
            gameArrays.updateLevel(currentLevel);
            gameArrays.displayMsg("show", "play again");
        };
    };
};

// TODO: make generic function that passes in elem or id/class:
function hideBlaster(bool) {
    if (bool === true) {
        let turret = document.querySelector(".turret");
        turret.style.display = "none";

        let crossHair = document.querySelector("#cross-hair");
        crossHair.style.display = "none";

        let wing = document.querySelector(".wing");
        wing.style.display = "none";

        let hitBox = document.querySelector(".hit-box");
        hitBox.style.display = "none";

        let fixedInfo = document.querySelectorAll(".fixed-info");
        fixedInfo[0].style.display = "none";
        fixedInfo[1].style.display = "none";

        let touchShip = document.getElementById("touch-ship");
        touchShip.style.display = "none";

    } else {
        gameArrays.fieldActive = true;

        let tempField = document.getElementById("temp-field");
        tempField.style.display = "block";

        let turret = document.querySelector(".turret");
        turret.style.display = "block";

        let crossHair = document.querySelector("#cross-hair");
        crossHair.style.display = "block";

        let wing = document.querySelector(".wing");
        wing.style.display = "block";

        let hitBox = document.querySelector(".hit-box");
        hitBox.style.display = "block";

        let fixedInfo = document.querySelectorAll(".fixed-info");
        fixedInfo[0].style.display = "flex";
        fixedInfo[1].style.display = "flex";

        updateStats();

    };
};

function removeElem(elemID) {
    let elem = document.getElementById(elemID);
    elem.parentNode.removeChild(elem);

};

function getArrayItemById(elemID, arrayToSearch) {
    arrayToSearch.filter(function (element) {
        return element.id = elemID;
    });
};

function isReady1(bool, arrayToSearch) {
    arrayToSearch.filter(function (element) {
        console.log("element");
        console.log(element);
        return element.ready = bool;
    });
};

function isReady(element) {
    return element.ready == true;
};

function isLaunched(element) {
    return element.ready == false;
};

function removeItemFromArr(index, arrayToRemoveFrom) {
    arrayToRemoveFrom.splice(index, 1);
};

function coordChecker(elemID, arrayToCheck) {
    let elem = document.getElementById(elemID);
    if (typeof (elem) != 'undefined' && elem != null) {
        let elemCoords = elem.getBoundingClientRect();
        // let itemBoxArray = document.querySelectorAll(".item-box");
        for (let i = 0; i < arrayToCheck.length; i++) {
            let arrElem = document.getElementById(`${arrayToCheck[i].id}`);
            let arrItem = arrElem.getBoundingClientRect();

            if (arrItem.left < elemCoords.right &&
                arrItem.right > elemCoords.left &&
                arrItem.top < elemCoords.bottom &&
                arrItem.bottom > elemCoords.top) {
                // return arrayToCheck[i].id;
                return "explode";
            };
        };
    };
};

function updateStats() {
    let healthStats = document.getElementById("health-status");
    healthStats.innerText = gameArrays.health;

    let enemyCount = document.getElementById("enemy-count");
    enemyCount.innerText = gameArrays.enemyCount;

    let plasmaCount = document.getElementById("plasma-ball-count");
    plasmaCount.innerText = gameArrays.blaster.currentAmmo.laser.count.length;

    let bombCount = document.getElementById("time-bomb-count");
    bombCount.innerText = gameArrays.blaster.currentAmmo.bomb.count.length;

    let lifeCount = document.getElementById("life-count");
    lifeCount.innerText = gameArrays.lives;
};