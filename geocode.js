
ymaps.ready(init);
var myMap;
function init() {
    myMap = new ymaps.Map("map", {
        center: [45.76, 10.64],
        zoom: 1
    });
}
var charForPlayer;

function AIGetCoord(AICityName,forFirstChar) {
    var myGeocoder = ymaps.geocode(AICityName, { kind: 'locality', results: 1 });

    myGeocoder.then(
        function (res) {
            var firstGeoObject = res.geoObjects.get(0);
            if (firstGeoObject) {
                var myGeocoderCoordRaw = res.geoObjects.get(0).geometry.getCoordinates();
                var myGeoObjName = firstGeoObject.properties.get('name');
                var myGeocoderCoord = myGeocoderCoordRaw + '';
                myGeocoderCoord = myGeocoderCoord.split(',');

                myPlacemark = new ymaps.Placemark(myGeocoderCoord, {
                    hintContent: AICityName
                });
                myPlacemark.options.set('preset', 'islands#darkBlueDotIconWithCaption');
                myMap.geoObjects.add(myPlacemark);
                var checkListTestComp = checkList('comp', AICityName);
                if (checkListTestComp == 'error'){
                    alert('Компьютер повторяется! Еще раз...');
                    getNameAndCoord(forFirstChar);
                }
                lastCharFinder(AICityName);

            }
            else {
                alert('Компьютер говорит ' + AICityName + ', но такого города нет на нашей карте! Еще одна попытка...');
                getNameAndCoord(AICityName[0]);
            }
        },
        function (err) {
            alert('Ошибка соединения...');
        }
    )
}

function getNameAndCoord(forFirstChar) {
    var citiesOnLetterArr = [];
    for (i = 0; i < citiesArrayOne.length; i++) {
        if (citiesArrayOne[i].indexOf(forFirstChar) == 0) {
            citiesOnLetterArr.push(citiesArrayOne[i]);
        }
    }
    if (citiesOnLetterArr.length < 1) {
        for (i = 0; i < citiesArrayTwo.length; i++) {
            if (citiesArrayTwo[i].indexOf(forFirstChar) == 0) {
                citiesOnLetterArr.push(citiesArrayTwo[i]);
            }
        }
    }
    var randNum = Math.floor(Math.random() * (citiesOnLetterArr.length));
    var AICityName = citiesOnLetterArr[randNum];
    alert('Компьютер называет город ' + AICityName);
    AIGetCoord(AICityName,forFirstChar);

}

function getCoord(cityName, lastChar) {
    var myGeocoder = ymaps.geocode(cityName, { kind: 'locality', results: 1 });

    myGeocoder.then(
        function (res) {

            var firstGeoObject = res.geoObjects.get(0);
            if (firstGeoObject) {
                var myGeocoderCoordRaw = res.geoObjects.get(0).geometry.getCoordinates();
                var myGeoObjName = firstGeoObject.properties.get('name');
                if (myGeoObjName.toUpperCase() != cityName.toUpperCase()) {
                    alert('Неверное название!');
                    return;
                }
                var checkListTest = checkList('player', cityName);
                if (checkListTest == 'error'){
                    // alert('ошибка');
                    return;
                }
                alert('Игрок называет город ' + cityName);
                var myGeocoderCoord = myGeocoderCoordRaw + '';
                myGeocoderCoord = myGeocoderCoord.split(',');

                myPlacemark = new ymaps.Placemark(myGeocoderCoord, {
                    hintContent: cityName
                });
                myPlacemark.options.set('preset', 'islands#redDotIconWithCaption');
                myMap.geoObjects.add(myPlacemark);

                // НЕ СРАБАТЫВАЕТ АВТОЗУМ !!!!!!!!!!!!!!!!!!!!
                // myMap.setBounds(res.geoObjects.getBounds());

                

                var forFirstChar = lastChar.toUpperCase();
                getNameAndCoord(forFirstChar);
            }
            else {
                alert('Такого города нет на карте!');

            }
        },
        function (err) {
            alert('Ошибка соединения...');
        }
    )
}