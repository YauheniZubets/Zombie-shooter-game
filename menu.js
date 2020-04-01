
const mainDiv;

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

    let play=document.createElement('a');
    menuDiv.append(play);
    play.classList.add('play');
    play.textContent='Начать';

    let registr=document.createElement('a');
    menuDiv.append(registr);
    registr.classList.add('registr');
    registr.textContent='Регистрация';

    let records=document.createElement('a');
    menuDiv.append(records);
    records.classList.add('records');
    records.textContent='Рекорды';

    play.addEventListener('click', turnOnGame);

}
mainMenu();

function turnOnGame() {
    mainDiv.classList.add('close');
    mainGame();
}

