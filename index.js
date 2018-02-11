var charForPlayer;
var playerList = [];
var compList = [];
var playerListWindow = document.querySelector('.player-list-window');
var compCityPanel = document.querySelector('.comp-city-panel');
var compListWindow = document.querySelector('.comp-list-window');


function restart(){
    window.location.reload() 
} 
function gameOver(){
    alert('Компьютер победил! Его результат: ' + compList.length);
    $('.comp-city-panel, .player-city-panel, .voice-button').css('display', 'none');
    $('.list-style').css('height','181px');
}

function checkList(from, cityName){
    if(from == 'player'){
        if(playerList.indexOf(cityName) == -1 && compList.indexOf(cityName) == -1){
            playerList.push(cityName);
            var playerListItem = document.createElement('li');
            playerListItem.innerHTML = cityName;
            playerListWindow.insertAdjacentElement('afterbegin', playerListItem);
        }
        else {
            alert('Такой город уже есть в списке!');
            return 'error';
        }   
    }
    else{
        if(compList.indexOf(cityName) == -1 && playerList.indexOf(cityName) == -1){
                    compList.push(cityName);
                    compCityPanel.textContent = cityName;
                    var compListItem = document.createElement('li');
                    compListItem.innerHTML = cityName;
                    compListWindow.insertAdjacentElement('afterbegin', compListItem);
                }
                else {
                    alert('Такой город уже есть в списке!');
                    return 'error';
                }   
    }
}
function lastCharFinder(computerInputValue){
var computerInputLength = computerInputValue.length;

     var computerInputValueLowerCase = computerInputValue.toLowerCase();
    var computerInputValueCapitalized = computerInputValueLowerCase[0].toUpperCase() + computerInputValueLowerCase.slice(1);
    var lastCharTestValue = computerInputValueCapitalized[computerInputLength - 1];
    
    var n = computerInputLength;
    while (lastCharTestValue == 'й' || lastCharTestValue == 'ы' || lastCharTestValue == 'ь' || lastCharTestValue == 'ъ')
    {
        n--;
        lastCharTestValue = computerInputValueCapitalized[n];       
}
    charForPlayer = lastCharTestValue.toUpperCase();
    alert('Ваш ход! Назовите город на букву "' + charForPlayer + '"');
    $('.player-input').attr('placeholder', 'Введите город на "' + charForPlayer + '"');
}



function playerLastCharFinder(playerInputValue){

    var playerInputLength = playerInputValue.length;
     var playerInputValueLowerCase = playerInputValue.toLowerCase();
    var playerInputValueCapitalized = playerInputValueLowerCase[0].toUpperCase() + playerInputValueLowerCase.slice(1);
    var lastCharTestValue = playerInputValueCapitalized[playerInputLength - 1];
    
    var n = playerInputLength;
    while (lastCharTestValue == 'й' || lastCharTestValue == 'ы' || lastCharTestValue == 'ь' || lastCharTestValue == 'ъ')
    {
        n--;
        lastCharTestValue = playerInputValueCapitalized[n];       
}
// дополнительная поверка, вероятно бесполезная, УДАЛИТЬ!
//     if(lastCharTestValue == undefined){ alert('Неверное название!');
// return;
// }
    var playerWordLastChar = lastCharTestValue;
    getCoord(playerInputValueCapitalized, playerWordLastChar);
}
function playerInputHandler(event){

event.preventDefault();
// $('.player-input').attr('placeholder','');
var playerInputValue = playerInput.value;
playerInput.value = '';
if (charForPlayer != undefined && charForPlayer != playerInputValue[0].toUpperCase()){
    alert('Ошибка! Нужно ввести город на букву "' + charForPlayer + '"');
}
else
{
    playerLastCharFinder(playerInputValue);
}
  }
var playerInputForm = document.querySelector('.player-input-form');
var playerInput = document.querySelector('.player-input');
playerInput.focus();
playerInputForm.addEventListener('submit', playerInputHandler);





