
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
            //logo:new Image(200, 200).src='images/characterslogo/man icon_no_bg.png',
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
    let img=new Image(100, 100);
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
                    death:{
                        0:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Death', 'Death', '00'),
                        1:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Death', 'Death', '01'),
                        2:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Death', 'Death', '02'),
                        3:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Death', 'Death', '03'),
                        4:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Death', 'Death', '04'),
                        5:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Death', 'Death', '05')
                    },
                    walk:{
                        0:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Walk', 'Walk', '00'),
                        1:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Walk', 'Walk', '01'),
                        2:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Walk', 'Walk', '02'),
                        3:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Walk', 'Walk', '03'),
                        4:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Walk', 'Walk', '04'),
                        5:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Walk', 'Walk', '05'),
                        6:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Walk', 'Walk', '06'),
                        7:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Walk', 'Walk', '07'),
                        8:getZombImage('images', 'Zombies', '1lvl', 'Zombie3_male', 'Walk', 'Walk', '08')
                    }
                }
            }
        }
    }
}

createZombies();