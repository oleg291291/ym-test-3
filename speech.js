
function speechToText(){
 // Создаем распознаватель
 
   if('webkitSpeechRecognition' in window) {
var recognizer = new webkitSpeechRecognition();
// Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
recognizer.interimResults = true;

// Какой язык будем распознавать?
recognizer.lang = 'ru-Ru';

// Используем колбек для обработки результатов
recognizer.onresult = function (event) {
  var result = event.results[event.resultIndex];
  if (result.isFinal) {
    console.log('Вы сказали: ' + result[0].transcript);
    playerInput.value = result[0].transcript;
  } else {
    console.log('Промежуточный результат: ', result[0].transcript);
    playerInput.value = result[0].transcript;
  }
};

recognizer.start();  
   }
   else {
     alert('распознавание речи не поддерживается!')
   }
}

