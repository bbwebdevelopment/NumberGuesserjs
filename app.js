/*
GAME FUNCTIONS:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct anser if loss
- Let player choose to play again
*/

// Game Values

let min = 1,
max = 10,
winningNum = getRandomNum(min, max),
guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
// span min number
minNum = document.querySelector('.min-num'),
// span max number
maxNum = document.querySelector('.max-num'),
// submit button
guessBtn = document.querySelector('#guess-btn'),
// input field
guessInput = document.querySelector('#guess-input'),
// parent paragraph for spans to change when game over
message = document.querySelector('.message');


//Assign ui min and maxx
minNum.textContent = min;
maxNum.textContent = max;


// play again even addEventListener
/*using mousedown instead of click as click counts as two basically and would skip play again view in ui*/
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    // reloading page
    window.location.reload();
  }
})
// Listen for Guess
guessBtn.addEventListener('click', function(){
/*quick check if event listener is functioning and console value of input. keep in mind this is still string and needs to be parsed as 
console.log(guessInput.value);*/
 // settings value to variable
  let guess = parseInt(guessInput.value);

  //Validate 
  if(isNaN(guess) || guess < min || guess > max){
    //  calling function declared below with temp string and min + variable inside along with second variable of color for error
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // check if won
  if(guess === winningNum){

    gameOver(true, `${winningNum} is correct, YOU WIN!`);
    // game over won
    // //disable input
    // guessInput.disabled = true;
    // //change border color
    // guessInput.style.borderColor = 'green';

    // setMessage(`${winningNum} is correct, YOU WIN!`, 'green')
  } else {
  // wrong number removing 1 from guess left, reverse iteration 
    guessesLeft -= 1;
    if(guessesLeft === 0){
      // game over lost 
      
      gameOver(false, `Game Over, you lost, the correct number was ${winningNum}`);
    } else {
      // game continues answer wrong

      // change border color
      guessInput.style.borderColor = 'red';

      // guess input clear input
      guessInput.value = '';
      // calling set message function with temp literal
      setMessage(`${guess} is not correct, please pick another number between ${min} and ${max}, you have ${guessesLeft} chances left`, 'red');
    }
  }
});

//game over
function gameOver(won, msg) {
  // init variable for turn below
  let color;
  // turnary conditional based on won or not
  won === true ? color = 'green' : color = 'red';
  //disable input
  guessInput.disabled = true;
  //change border color
  guessInput.style.borderColor = color;
  //set message
  message.style.color = color;

  setMessage(msg);

  // play again? 

  // setting button text to play again
  guessBtn.value = 'Play Again';
  //  adding another class to button after game lost which needs event delegation
  guessBtn.className += 'play-again';

}


// get winning number
function getRandomNum(min, max){
  // keep in mind zero based must add 1 otherwise 0-9
   return Math.floor(Math.random()*(max-min+1)+min);
}
// Set Message with msg container for input when being called and color red for error and green for success

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;

}

