let mainDiv, inp1, inp2, sbmt, user, regField, tableDiv, table;
let players=[],
    scores=[];

var firebaseConfig = {
    apiKey: "AIzaSyB8C3EIpC3rCmuZARmZr0yf1IpHWu6pdkE",
    authDomain: "fd-2-project.firebaseapp.com",
    databaseURL: "https://fd-2-project.firebaseio.com",
    projectId: "fd-2-project",
    storageBucket: "fd-2-project.appspot.com",
    messagingSenderId: "48043057662",
    appId: "1:48043057662:web:409028d626814b57c1e0af",
    measurementId: "G-15S6MBZYJM"
    };

    // Initialize Firebase
firebase.initializeApp(firebaseConfig);    
var database = firebase.database();

function addToRealtimeDatabase(player, scoring){
    let sett=database.ref('users/').child(player);
    sett.set({
        score:scoring
    });
}

function updateInRealtimeDatabase(player, scoring){
    let sett=database.ref('users/').child(player);
    sett.update({
        score:scoring
    });
}

function getDatabase(){
    players=[];
    scores=[];
    let sor=database.ref('users/');
    sor.orderByChild('score').on('child_added', (data)=>{
      players.push(data.key);
      scores.push(data.val().score);
    });
    window.setTimeout(()=>{
        players.reverse();
        scores.reverse();
    }, 2000)
}

function mainMenu() {
    mainDiv=document.createElement('div');
    document.body.append(mainDiv);
    mainDiv.classList.add('main_div');

    let menuDiv=document.createElement('div');
    mainDiv.append(menuDiv);
    menuDiv.classList.add('menu_div');
    let backgroundMenuImage=new Image();
    backgroundMenuImage.src='images/menu/Main.png';

    let name=document.createElement('div');
    menuDiv.append(name);
    name.classList.add('name');
    name.textContent='Зомби-шутер';

    let playDiv=document.createElement('div');
    menuDiv.append(playDiv);
    playDiv.classList.add('play-div');
    playDiv.textContent='Начать';

    let reg=document.createElement('div');
    menuDiv.append(reg);
    reg.classList.add('registr');
    reg.textContent='Регистрация';

    let records=document.createElement('div');
    menuDiv.append(records);
    records.classList.add('records');
    records.textContent='Рекорды';

    playDiv.addEventListener('click', turnOnGame);
    reg.addEventListener('click', ()=>{
        regField.classList.remove('close');
    });
    records.addEventListener('click', ()=>{
        getDatabase();
        tableDiv.classList.remove('close');
        let table=document.querySelector('.table_dark');
        window.setTimeout(()=>{
            for (let i = 1; i < table.children.length; i++){
                        table.children[i].firstElementChild.textContent=players[i-1];
                        table.children[i].lastElementChild.textContent=scores[i-1];
                    }
        }, 2000)
        
    });    

}

//создаем регистрацию
function reistrField() {
    regField=document.createElement('div');
    mainDiv.append(regField);
    regField.classList.add('close');
    regField.classList.add('reg-field');
    let p=document.createElement('p');
    regField.append(p);
    p.textContent='Введите никнейм';
    p.classList.add('p');
    let inputNick=document.createElement('input');
    regField.append(inputNick);
    inputNick.classList.add('input');

    let divBut=document.createElement('div');
    regField.append(divBut);
    divBut.classList.add('submit-style');
    
    let sumbit=document.createElement('button');
    divBut.append(sumbit);
    sumbit.classList.add('bttr');
    sumbit.innerHTML='Сохранить';
    sumbit.id='submit';

    let escape=document.createElement('button');
    divBut.append(escape);
    escape.classList.add('bttr');
    escape.innerHTML='Закрыть';
    escape.id='escape';

    let descr=document.createElement('div');
    regField.append(descr);
    descr.classList.add('descr');
    descr.innerHTML='Перед тобой стоит задача убить как можно больше зомби. За каждого дают 20 очков. Управление главным героем осуществляется стрелками на клавиатуре, выстрел - нажатой клавишей "Пробел". Если введешь свой ник, то сможешь сохранить свой рекорд для других пользователей. Не промахнись! Желаю удачи!';

    sumbit.addEventListener('click', loginUser);
    escape.addEventListener('click', ()=>{
        regField.classList.add('close');
    });

    function loginUser() {
        if(inputNick.value==''){
            alert('Поле не должно быть пустым');
        } else{
            user=inputNick.value;
            regField.classList.add('close');
        }   
    }
}

//список рекодов
function topScoresList() {
    tableDiv=document.createElement('div');
    mainDiv.append(tableDiv);
    tableDiv.classList.add('table-div');
    tableDiv.classList.add('close');
    table=document.createElement('table');
    tableDiv.append(table);
    table.classList.add('table_dark');
    let head=document.createElement('tr');
    table.append(head);
    for (let i = 0; i <= 1; i++) {
        let th=document.createElement('th');
        head.append(th);
    }
    table.children[0].firstElementChild.textContent='Игрок';
    table.children[0].lastElementChild.textContent='Очки';
    for (let i = 0; i <=9; i++) {
        let row=document.createElement('tr');
        table.append(row);
        let td=document.createElement('td');
        row.append(td);
        td.textContent=players[i];
        let td1=document.createElement('td');
        row.append(td1);
        td1.textContent=scores[i];
    }

    let closeTab=document.createElement('button');
    tableDiv.append(closeTab);
    closeTab.classList.add('bttr');
    closeTab.classList.add('sizes-reg');
    closeTab.innerHTML='Закрыть';

    closeTab.addEventListener('click', ()=>{
        tableDiv.classList.add('close');
    })
}

function turnOnGame() {
    mainDiv.classList.add('close');
    mainGame();
}

mainMenu();
reistrField();
topScoresList();

//для загрузки спрайтов из папки
function getImage(directory, male, stay, index) {
    let img=new Image(100, 100);
    img.src=directory+'/'+male+'/'+stay+'/'+stay+'_0'+index+'.png';
    return img;
}

var mainCharacters;
function createMainCharacters() {
    mainCharacters={
        male:{
            stayPos:{
                gun:{
                    0:getImage('images','Man', 'Idle_gun', '00'),
                    1:getImage('images','Man', 'Idle_gun', '01'),
                    2:getImage('images','Man', 'Idle_gun', '02'),
                    3:getImage('images','Man', 'Idle_gun', '03'),
                    4:getImage('images','Man', 'Idle_gun', '04'),
                    5:getImage('images','Man', 'Idle_gun', '05'),
                    6:getImage('images','Man', 'Idle_gun', '06'),
                    7:getImage('images','Man', 'Idle_gun', '07'),
                }
            },
            walkPos:{
                gun:{
                    0:getImage('images','Man', 'Walk_gun', '00'),
                    1:getImage('images','Man', 'Walk_gun', '01'),
                    2:getImage('images','Man', 'Walk_gun', '02'),
                    3:getImage('images','Man', 'Walk_gun', '03'),
                    4:getImage('images','Man', 'Walk_gun', '04'),
                    5:getImage('images','Man', 'Walk_gun', '05'),
                }

            },
            deadPos:{
                0: getImage('images', 'Man', 'death', '00'),
                1: getImage('images', 'Man', 'death', '01'),
                2: getImage('images', 'Man', 'death', '02'),
                3: getImage('images', 'Man', 'death', '03'),
                4: getImage('images', 'Man', 'death', '04'),
                5: getImage('images', 'Man', 'death', '05'),
            }
        }
    };
}
createMainCharacters();

//для загрузки зомби из папки
function getZombImage(directory, folder, lvl, male, stay, stayPos, index) {
    let img=new Image();
    img.src=directory+'/'+folder+'/'+lvl+'/'+male+'/'+stay+'/'+stayPos+'_0'+index+'.png';
    return img;
}

var mainZombies;
function createZombies() {
    mainZombies={
        level_1: {
            male: {
                zombie_1: {
                    attack:{
                        0:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Attack', 'Attack', '00'),
                        1:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Attack', 'Attack', '01'),
                        2:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Attack', 'Attack', '02'),
                        3:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Attack', 'Attack', '03'),
                        4:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Attack', 'Attack', '04'),
                        5:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Attack', 'Attack', '05'),
                        6:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Attack', 'Attack', '06'),
                        7:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Attack', 'Attack', '07'),
                        8:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Attack', 'Attack', '08')
                    },
                    walk:{
                        0:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'walk', 'walk', '00'),
                        1:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'walk', 'walk', '01'),
                        2:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'walk', 'walk', '02'),
                        3:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'walk', 'walk', '03'),
                        4:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'walk', 'walk', '04'),
                        5:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'walk', 'walk', '05'),
                        6:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'walk', 'walk', '06'),
                        7:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'walk', 'walk', '07'),
                        8:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'walk', 'walk', '08')
                    }
                }
            }
        }
    }
}

createZombies();

function mainGame() {

    const FPS = 30; // frames per second
    const ZOMBIES_NUM=2; //количество зомби сначала
    const ZOMBIES_SPEED=100; //скорость в пикселях
    const ZOMBIES_SIZE=100; //размер в пикселях
    const PERS_MOVE_SPEED = 5; // acceleration of the ship in pixels per second per second
    const TURN_SPEED = 360; // turn speed in degrees per second
    const PERS_SIZE = 50; // ship height in pixels
    const PERS_DEAD_DUR=2; // время показа спрайтов dead
    const PERS_INV_DUR=3; // время неуязвимости на старте для главного героя
    const PERS_BLINK_DUR=0.1; // время мигания на старте для главного героя
    const BULLET_MAX=10; // максимальное количество пуль
    const BULLET_SPEED=500; // скорость пули
    const BULLET_DIST=0.2; // дальность полета пули по отношению к размерам канваса
    const TEXT_FADE_TIME=2.5; // время затухания текста в секундах
    const TEXT_SIZE=40; // высота текста в пикселях
    const GAME_LIVES=3; // жизни героя
    const ZOMB_POINTS=20; // сколько очков дается за одного зомби
    const KEY_SCORE='highscore'; // ключ для localstorage
    let SOUND_ON=true; // звук
    let MUSIC_ON=true; // музыка


    const SHOW_BOUNDING=false; //показать границы

    /** @type {HTMLCanvasElement} */

    var canv = document.createElement('canvas');
    document.body.append(canv);
    var ctx = canv.getContext("2d");

    canv.width=window.innerWidth;
    canv.height=window.innerHeight;

//звук и эффекты
    let soundGun=new Sound('sound/gunshot.wav', 5, 0.5);

//музыка
    let musicGame=new Audio('sound/gaming.wav');

//параметры игры
    let level, zombies, pers, text, textAlpha, lives, score, scoreHigh;
    newGame();

// set up event handlers
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);

// resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);
    function resizeCanvas() {}
    resizeCanvas();


// set up the game loop
    let gameInterv=setInterval(update1, 1000 / FPS);

//создаем зомби
    function createZombies() {
        zombies=[];
        var x, y, s, h, w;

        //split canvas-field on square sectors
        var arrayOfSectors = [],
            column = canv.width/(ZOMBIES_SIZE+50) | 0,
            row = canv.height/(ZOMBIES_SIZE+50) | 0,
            length = column * row,
            sectorWidth = canv.width / column,
            sectorHeight = canv.height / row;
            console.log(sectorWidth, sectorHeight);

        //get the numbers row
        if (!arrayOfSectors.length) {
            arrayOfSectors = Array.from({
                length
            }, (v, t) => t);
        }

        for (let i=0; i<ZOMBIES_NUM + level; i++){
            do {
                //рандомные координаты по канвасу
                // x=Math.floor((Math.random() * canv.width));
                // y=Math.floor((Math.random() * canv.height));
                s = arrayOfSectors.splice((Math.random() * arrayOfSectors.length | 0), 1)[0];
                h = s / row | 0;
                w = s % column;
                x=sectorWidth*w;
                y=sectorHeight*h;
            } while (distBetween(pers.x, pers.y, x, y) < ZOMBIES_SIZE);//делаем так чтобы зомби на страте не достигали героя
            zombies.push(newZombie(x, y));
        }
    }

    function distBetween(x1, y1, x2, y2) {//расстояние прямой
        return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
    }

    function deadPers() {//гейм овер игрока
        pers.deadTime = Math.ceil(PERS_DEAD_DUR *FPS);
    }

    function gameOver() {
        pers.dead=true;
        text='Игра окончена';
        textAlpha=1.0;
        //результат заносим в realtime database
        addToRealtimeDatabase(user, score);
    }

    function keyDown(/** @type {KeyboardEvent} */ ev) {
        switch(ev.keyCode) {
            case 32: // space bar (выстрел)
                shootBullet();
                break;
            case 37: // left arrow (rotate left)
                pers.rot = -TURN_SPEED / 180 * Math.PI / FPS;
                break;
            case 38: // up arrow (thrust the forward)
                pers.moveUp = true;
                //pers.moveSpeed+=PERS_MOVE_SPEED;
                break;
            case 39: // right arrow (rotate right)
                pers.rot = TURN_SPEED / 180 * Math.PI / FPS;
                break;
            case 40:
                pers.moveDown = true;
                //pers.moveSpeed=-PERS_MOVE_SPEED;
                break;
        }
    }

    function keyUp(/** @type {KeyboardEvent} */ ev) {

        switch(ev.keyCode) {
            case 32: // space bar (отмена выстрела)
                pers.canShoot=true;
                break;
            case 37: // left arrow (stop rotating left)
                pers.rot = 0;
                break;
            case 38: // up arrow
                pers.moveUp = false;
                break;
            case 39: // right arrow (stop rotating right)
                pers.rot = 0;
                break;
            case 40:
                pers.moveDown = false;
                break;
        }
    }

//новый зомби его св-ва
    function newZombie(x,y) {
        let lvlMult=1 + 0.1 * level; //увелеичиваем скорость с увеличением уровня
        let zombie = {
            x: x,
            y: y,
            xSpeed: Math.random() * ZOMBIES_SPEED *lvlMult / FPS * (Math.random() < 0.5 ? 1 : -1),
            ySpeed: Math.random() * ZOMBIES_SPEED *lvlMult / FPS * (Math.random() < 0.5 ? 1 : -1),
            r: ZOMBIES_SIZE / 2,
            a: (Math.floor(Math.random() * 360)) * Math.PI/180, //в радианы,
            toAttack: false
        };
        return zombie;
    }

    function newGame() {//новая игра
        level=0;// нач уровень
        lives=GAME_LIVES;
        score=0;
        pers = newPers();

        //получаем рекорд из localstorage
        let scoreStr=localStorage.getItem(KEY_SCORE);
        if (scoreStr==null){
            scoreHigh=0
        } else {
            scoreHigh=parseInt(scoreStr);
        }
        newLevel();
    }

    function newLevel() {
        text = 'Уровень ' + (level+1);
        textAlpha = 1.0;
        createZombies();
        if (MUSIC_ON) musicGame.play();

    }

    function newPers (){//главный персонаж со свойствами
        return {
            r: PERS_SIZE/2,  //радиус игрока
            x: canv.width/2,
            y: canv.height/2,
            a: 0 / 180 * Math.PI, // convert to radians
            rot: 0,
            moveUp: false,
            moveDown: false,
            moveSpeed:0,
            enemy:0,// выбор оружия
            deadTime:0,//время показа слайдов dead
            blinkNum: Math.ceil(PERS_INV_DUR/PERS_INV_DUR),//мигания кол-во
            blinkTime: Math.ceil(PERS_BLINK_DUR*FPS),//мигания
            canShoot: true,//возможность стрелять
            bullets: [],//пули
            dead: false

        }
    }

    function shootBullet(){
        //создаем св-ва пули
        if (pers.canShoot && pers.bullets.length<BULLET_MAX){
            pers.bullets.push({
                x: pers.x,
                y: pers.y  ,
                xv:BULLET_SPEED*Math.sin(pers.a)/FPS,
                yv:BULLET_SPEED*Math.cos(pers.a)/FPS,
                dist: 0
            });
            soundGun.play();
        }
        //запрещаем стрельбу
        pers.canShoot=false;
    }

//звук
    function Sound(src, maxStreams=1, vol=0.8){
        this.streamNum=0;
        this.streams=[];
        for (let i=0; i<maxStreams; i++){
            this.streams.push(new Audio(src));
            this.streams[i].volume=vol;
        }

        this.play = function () {
            if (SOUND_ON){
                this.streamNum = (this.streamNum+1)%maxStreams;
                this.streams[this.streamNum].play();
            }
        }
    }

//рисуем зомби
    let indexZomb=0,
        tickCountZomb=0;

    function drawZomb(position, hor, vert, a){
        let zombLength=Object.keys(mainZombies.level_1.male.zombie_1[position]).length;//текущий спрайт
        if (indexZomb<zombLength){
            if (tickCountZomb>5){
                indexZomb++;
                tickCountZomb=0;
            }
            if (indexZomb>zombLength-1)indexZomb=0;
            let currentZomb=mainZombies.level_1.male.zombie_1[position][index];//текущий спрайт
            ctx.save();
            ctx.translate(hor, vert);
            ctx.rotate(a);
            ctx.drawImage(currentZomb, -ZOMBIES_SIZE/2, -ZOMBIES_SIZE/2, ZOMBIES_SIZE, ZOMBIES_SIZE);
            ctx.restore();
            tickCountZomb++;
        }
    }

    let indexDeadPers=0,//номер спрайта
        tickCountDeadPers=0;//счётчик плавности изменения спрайта
    //рисуем персонаж
    function drawDeadPers(position, x, y, a) {
        let indexLength=Object.keys(mainCharacters.male[position]).length;
        if (indexDeadPers<indexLength){
            if (tickCountDeadPers>10){
                indexDeadPers++;
                tickCountDeadPers=0;
            }
            if (indexDeadPers>indexLength-1)indexDeadPers=0;
            let currentPers=mainCharacters.male[position][indexDeadPers];//текущий спрайт

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(a);
            ctx.drawImage(currentPers, -PERS_SIZE/2, -PERS_SIZE/2, PERS_SIZE, PERS_SIZE);
            ctx.restore();
            tickCountDeadPers++;
        }
    }

    let index=0,//номер спрайта
        tickCount=0;//счётчик плавности изменения спрайта
    //рисуем персонаж
    function drawPers(position, weapon, x, y, a) {
        //пробелы в спрайтак так как их разное кол-во и смещается счетчик

        let indexLength=Object.keys(mainCharacters.male[position][weapon]).length;
        if (index<indexLength){
            if (tickCount>5){
                index++;
                tickCount=0;
            }
            if (index>indexLength-1)index=0;
            let currentPers=mainCharacters.male[position][weapon][index];//текущий спрайт

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(a);
            ctx.drawImage(currentPers, -PERS_SIZE/2, -PERS_SIZE/2, PERS_SIZE, PERS_SIZE);
            ctx.restore();
            tickCount++;
        }
    }

    let indexWalk=0,//номер спрайта
        tickCountWalk=0;//счётчик плавности изменения спрайта
    //рисуем персонаж
    function drawWalkPers(position, weapon, x, y, a) {

        let indexLengthWalk=Object.keys(mainCharacters.male[position][weapon]).length;
        if (indexWalk<indexLengthWalk){
            if (tickCountWalk>5){
                indexWalk++;
                tickCountWalk=0;
            }
            if (indexWalk>indexLengthWalk-1)indexWalk=0;
            let currentPersW=mainCharacters.male[position][weapon][indexWalk];//текущий спрайт

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(a);
            ctx.drawImage(currentPersW, -PERS_SIZE/2, -PERS_SIZE/2, PERS_SIZE, PERS_SIZE);
            ctx.restore();
            tickCountWalk++;
        }
    }

    function drawLives(){

        let bufferCanvas=document.createElement('canvas');
        let bufferCtx=bufferCanvas.getContext('2d');

        bufferCanvas.width=canv.width*0.08;
        bufferCanvas.height=canv.height*0.04;

        bufferCtx.strokeStyle='white';
        bufferCtx.lineWidth=1;
        bufferCtx.strokeRect(0, 0, canv.width*0.08, canv.height*0.04);
        bufferCtx.stroke();
        bufferCtx.fillStyle='red';
        bufferCtx.fillRect(0, 0, canv.width*0.0267 * lives, canv.height*0.04);
        bufferCtx.fill();

        ctx.drawImage(bufferCanvas, canv.width*0.02, canv.height*0.05);
    }

    let shooting=true;
    let back=new Image();
    back.src='images/menu/background_menu.png';

    document.body.classList.remove('loaded');//loader for a game-scene
    back.onload = function () {
        document.body.classList.add('loaded_hiding');
        window.setTimeout(function () {
          document.body.classList.add('loaded');
          document.body.classList.remove('loaded_hiding');
        }, 500);
      }

    let basicMenuTitle=false;
    let basicPauseTitle=false;
    let pauseStatus=false;
    
    function getMousePos(e) {
        var r = canv.getBoundingClientRect();
        return {
            x: e.clientX - r.left,
            y: e.clientY - r.top
        };
    }

    function scaleMenu(e) {
        var p = getMousePos(e);
        if (p.x >= canv.width*0.9 && p.x <= canv.width*0.9 + 90 &&
            p.y >= canv.height*0.87 && p.y <= canv.height*0.87 + 30) {
                basicMenuTitle=true;
        } else{
            basicMenuTitle=false;
        }
    }

    function openMenu(e) { //выход в меню
        var p = getMousePos(e);
        if (p.x >= canv.width*0.9 && p.x <= canv.width*0.9 + 90 &&
            p.y >= canv.height*0.87 && p.y <= canv.height*0.87 + 30) {
                canv.classList.add('close');
                mainDiv.classList.remove('close');
                clearInterval(gameInterv);
                gameInterv=null;
                musicGame.pause();
                //musicGame=null;
                
        } 
    }
    
    function scalePause(e) {
        var p = getMousePos(e);
        if (p.x >= canv.width*0.9 && p.x <= canv.width*0.9 + 90 &&
            p.y >= canv.height*0.78 && p.y <= canv.height*0.80 + 30) {
                basicPauseTitle=true;
        } else{
            basicPauseTitle=false;
        }
    }

    function pauseGame(e) {
        if (!pauseStatus) {
            var p = getMousePos(e);
            if (p.x >= canv.width*0.9 && p.x <= canv.width*0.9 + 90 &&
                p.y >= canv.height*0.78 && p.y <= canv.height*0.80 + 30) {
                if(basicPauseTitle){
                   clearInterval(gameInterv);
                   pauseStatus=true;
                   musicGame.pause();
                } 
            } 
        } else {
            gameInterv=window.setInterval(update1, 1000 / FPS);
            pauseStatus=false;
            musicGame.play();
        }
    }
    
    function update1() {
        let blinkOn=pers.blinkNum % 2 ==0;
        let deading = pers.deadTime >0;

        // draw field
        ctx.drawImage(back, 0, 0, canv.width, canv.height);

        // отображаем персонаж в канвасе
        if (!deading){
            if (blinkOn && !pers.dead) {
                if (pers.moveUp || pers.moveDown) {
                    //drawPers('stayPos', 'gun', pers.x, pers.y, pers.a);
                    drawWalkPers('walkPos', 'gun', pers.x, pers.y, pers.a);
                }
                if (!pers.moveUp && !pers.moveDown) {
                    //drawWalkPers('walkPos', 'gun', pers.x, pers.y, pers.a);
                    drawPers('stayPos', 'gun', pers.x, pers.y, pers.a);
                }
            }

            //мигания
            if (pers.blinkNum>0){
                pers.blinkTime--;
                if (pers.blinkTime==0){
                    pers.blinkTime=Math.ceil(PERS_BLINK_DUR*FPS);
                    pers.blinkNum--;
                }
            }
        } else {
            drawDeadPers('deadPos', pers.x, pers.y, pers.a);
        }

        //отображаем зомби в канвасе и двигаем и проверяем на границы

        for (let i=0; i<zombies.length; i++){
            drawZomb('walk', zombies[i].x, zombies[i].y, zombies[i].a);
            // if (!zombies[i].toAttack){//зомби
            //     drawZomb('walk', zombies[i].x, zombies[i].y, zombies[i].a, i);
            // }
        }

        //проверка на столкновния зомби
        if (!deading){
            if (pers.blinkNum==0 && !pers.dead) {
                for (let i = 0; i < zombies.length; i++) {
                    if (distBetween(pers.x, pers.y, zombies[i].x, zombies[i].y) < pers.r + zombies[i].r) {
                        //вызвать спрайты атаки зомби уменьшить хелсы
                        zombies[i].toAttack = true;
                        //drawZomb('attack', zombies[i].x, zombies[i].y, zombies[i].a, i);
                        deadPers();//уменьшение хелсов и dead
                        break;
                    } else {
                        zombies[i].toAttack = false;
                    }
                }
            }

            if (pers.moveUp){//изменяем координаты главного героя
                pers.x+=PERS_MOVE_SPEED*Math.sin(pers.a);
                pers.y-=PERS_MOVE_SPEED*Math.cos(pers.a);
            }

            if (pers.moveDown){//изменяем координаты
                pers.x-=PERS_MOVE_SPEED*Math.sin(pers.a);
                pers.y+=PERS_MOVE_SPEED*Math.cos(pers.a);
            }
            //вращаем по keydown главного героя
            pers.a+=pers.rot;
        } else {//если dead то -- dead и создается новый герой
            pers.deadTime--;
            
            if (pers.deadTime==0){
                lives--;
                if (lives==0){
                    gameOver();
                } else {
                    pers = newPers();
                }

            }
        }

        //рисуем пули
        for (let i=0; i<pers.bullets.length; i++){
            
            ctx.save();
            ctx.translate(pers.bullets[i].x, pers.bullets[i].y);

            if (shooting){
                pers.bullets[i].x=pers.x;
                pers.bullets[i].y=pers.y;
                shooting=false;
            }

            ctx.beginPath();
            ctx.rotate(pers.a);
            ctx.fillStyle='salmon';
            ctx.arc(PERS_SIZE/4.35, -PERS_SIZE/2, PERS_SIZE/35, 0, Math.PI*2, false);
            //ctx.arc(pers.bullets[i].x+PERS_SIZE/4, pers.bullets[i].y-PERS_SIZE/2, PERS_SIZE/35, 0, Math.PI*2, false);
            ctx.fill();
            ctx.restore();
        }

        //рисуем название уровней
        if (textAlpha>=0){
            ctx.textAlign='center';
            ctx.textBaseline='middle';
            ctx.fillStyle='rgba(255, 255, 255, ' + textAlpha + ')';// для прозрачности
            ctx.font=TEXT_SIZE +'px Open Sans';
            ctx.fillText(text, canv.width/2, canv.height*0.75);
            textAlpha-= (1.0 / TEXT_FADE_TIME / FPS);
        } else if (pers.dead){
            newGame();
        }

        drawLives();//рисуем жизни

        //рисуем счет
        ctx.textAlign='right';
        ctx.textBaseline='middle';
        ctx.fillStyle='white';
        ctx.font=TEXT_SIZE +'px Open Sans';
        if (user){
            ctx.fillText(user+': '+score, canv.width-PERS_SIZE/2, PERS_SIZE/2);
        } else {
            ctx.fillText(score, canv.width-PERS_SIZE/2, PERS_SIZE/2);
        }
        
        //рисуем хайскор
        ctx.textAlign='center';
        ctx.textBaseline='middle';
        ctx.fillStyle='white';
        ctx.font=(TEXT_SIZE *0.75) +'px Open Sans';
        ctx.fillText('Рекорд  '+ scoreHigh, canv.width/2, PERS_SIZE/2);

        //возврат в меню
        ctx.textAlign='center';
        ctx.textBaseline='middle';
        ctx.fillStyle='white';
        if(!basicMenuTitle){
            ctx.font=(TEXT_SIZE *0.75) +'px Open Sans';
            ctx.fillText('Меню', canv.width*0.94, canv.height*0.9);  
        } else{
            ctx.font=(TEXT_SIZE *0.95) +'px Open Sans';
            ctx.fillText('Меню', canv.width*0.94, canv.height*0.9);
        }
        canv.addEventListener('mousemove', scaleMenu);
        canv.addEventListener('click', openMenu);

        //пауза
        ctx.textAlign='center';
        ctx.textBaseline='middle';
        ctx.fillStyle='white';
        if(!basicPauseTitle){
            ctx.font=(TEXT_SIZE *0.75) +'px Open Sans';
            ctx.fillText('Пауза', canv.width*0.94, canv.height*0.8);  
        } else{
            ctx.font=(TEXT_SIZE *0.95) +'px Open Sans';
            ctx.fillText('Пауза', canv.width*0.94, canv.height*0.8);
        }
        canv.addEventListener('mousemove', scalePause);
        canv.addEventListener('click', pauseGame);

        for (let i=pers.bullets.length-1; i>=0; i--){

            //проверяем расстояние пули
            if (pers.bullets[i].dist>BULLET_DIST*canv.width){
                //если пуля пролетела больше то удаляем ее из массива
                pers.bullets.splice(i, 1);
                continue;
            }
            //перемещаем пулю
            pers.bullets[i].x += pers.bullets[i].xv;
            pers.bullets[i].y -= pers.bullets[i].yv;

            //вычисляем длину полета пули
            pers.bullets[i].dist += Math.sqrt(Math.pow(pers.bullets[i].xv,2) + Math.pow(pers.bullets[i].yv,2));

        } //если xv<0 то + если >0 то -

        //уничтожение зомби
        let zx, zy, zr, bx, by;
        for (let i=zombies.length-1; i>=0; i--){

            //получаем свойства
            zx=zombies[i].x;
            zy=zombies[i].y;
            zr=zombies[i].r;

            //перебираем пули
            for (let j=pers.bullets.length-1; j>=0; j--){

                //получаем свойтсва
                bx=pers.bullets[j].x;
                by=pers.bullets[j].y;

                //проверяем на попадание
                if (distBetween(zx, zy, bx, by) < zr){

                    //удаляем пулю
                    pers.bullets.splice(j,1);

                    //удаляем зомби
                    zombies.splice(i,1);
                    score+=ZOMB_POINTS;

                    //проверяем хайскор
                    if (score>scoreHigh){
                        scoreHigh=score;
                        localStorage.setItem(KEY_SCORE, scoreHigh);
                    }

                    //новый уровень когда все уничтожены
                    if (zombies.length==0){
                        level++;
                        newLevel();
                    }
                    break;
                }
            }
        }

        //проверка на границы
        if (pers.x-pers.r < 0) {
            pers.x = pers.r;
        } else if (pers.x+pers.r > canv.width) {
            pers.x = canv.width - pers.r;
        }
        if (pers.y-pers.r < 0) {
            pers.y = pers.r;
        } else if (pers.y+pers.r > canv.height) {
            pers.y = canv.height - pers.r;
        }

        for (let i=0; i<zombies.length; i++){
            zombies[i].x+=zombies[i].xSpeed*Math.sin(zombies[i].a);
            zombies[i].y+=zombies[i].ySpeed*Math.sin(zombies[i].a);

            if (zombies[i].x-zombies[i].r<0){
                zombies[i].a+=(Math.floor(Math.random() * 360)) * Math.PI/180;
                zombies[i].xSpeed*=(-1);
                zombies[i].x=zombies[i].r;
            } else if (zombies[i].x+zombies[i].r>canv.width){
                zombies[i].a+=(Math.floor(Math.random() * 360)) * Math.PI/180;
                zombies[i].xSpeed*=(-1);
                zombies[i].x=canv.width-zombies[i].r
            }
            if (zombies[i].y-zombies[i].r<0){
                zombies[i].a+=(Math.floor(Math.random() * 360)) * Math.PI/180;
                zombies[i].ySpeed*=(-1);
                zombies[i].y=zombies[i].r;
            } else if (zombies[i].y+zombies[i].r>canv.height){
                zombies[i].a+=(Math.floor(Math.random() * 360)) * Math.PI/180;
                zombies[i].ySpeed*=(-1);
                zombies[i].y=canv.height-zombies[i].r;
            }
        }

        for (let i=0; i<zombies.length; i++){
            for (let j=i+1; j<zombies.length; j++){
                if (zombies[i].x < zombies[j].x+zombies[j].r*1.5 &&
                    zombies[i].x + zombies[i].r*1.5 > zombies[j].x &&
                    zombies[i].y < zombies[j].y + zombies[j].r*1.5 &&
                    zombies[i].y + zombies[i].r*1.5 > zombies[j].y){
                    zombies[i].xSpeed*=(-1);
                    zombies[j].xSpeed*=(-1);
                    zombies[i].ySpeed*=(-1);
                    zombies[j].ySpeed*=(-1);
                }
            }
        }
    }
}