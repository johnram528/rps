//New Game click event

$(document).on('click', '.playButton', function(ev){        
  ev.preventDefault()
  $('.moves').empty()                        //clear previous game results after each game
  $('.winners').empty()
  $('.overallWinner').empty()                 
  game()
})
// handle individual rounds for game
let newRound = function() {
  let userChoice = prompt("r, p, or s?");    
  let computerChoice = (function(){               //wrapped this into a function since we have to reuse in case of a tie game
     choice = Math.random();
    if (choice <0.34){
        choice = "r";
    }else if(choice <=0.67){
        choice = "p";
    }
    else{
        choice = "s";
    }
    return choice
  })
  let computer = computerChoice()
  let round = compare(userChoice, computer)
  while(round[round.length-1][0] == round[round.length-1][1]) { //check if move results in tie. switched from if to while for multiple ties in a round
    let tieRound = round;                                 //new variable to hold data from last move
    userChoice = prompt("TIE! Please select again.");
    computer = computerChoice();
    round = compare(userChoice, computer, tieRound);     //if tied we send the last move along with current move and continue until tie is broken
  }
  return round
}


let combination = (function(move){                      //helper used to determine the correct text for the winner of each move
  if(move == 'rp'){
    return 'computer'
  }
  if(move == 'rs'){
    return 'player 1'
  }
  if(move == 'pr'){
    return 'player 1'
  }
  if(move == 'ps'){
    return 'computer'
  }
  if(move == 'sr'){
    return 'computer'
  }
  if(move == 'sp'){
    return 'player 1'
  }

})

//counters
let playerWins = 0;
let computerWins = 0

let scoreBoard = []           //holds data that will be iterated over and used to display a games results

//GAME 
let game = function(){
  let rounds = prompt("How many rounds would you like to play?")
  for (i = 0; i < rounds; i++) {                                  
    let round = newRound()                          
    scoreBoard.push(round)                                    //add each round to the scoreboard
  }
  let moves = scoreBoard.forEach( function(rnd, i){
    let round = rnd.join(',')
    $('.moves').append('round ' + (i + 1) +': ' + round+ '<br>')
  })
;
  let winners = scoreBoard.forEach( function(rnd, i){
    let round = rnd
    $('.winners').append('round ' + (i + 1) + ' winner: ' + combination(round[round.length -1]) + '<br>')
  })
  let overallWinner = (function() {                                //compares numbers from counters in order to display the winner of the game
    if(playerWins > computerWins) {
      $('.overallWinner').append('overall winner: player 1 <br>')
    }else if (playerWins < computerWins) {
      $('.overallWinner').append('overall winner: computer <br>')
    }else{
      $('.overallWinner').append('game tied <br>')
    }
  })
  moves
  winners
  overallWinner()
  scoreBoard = []                                //reset the scoreboard after each game
}

//compare player vs pc moves 
let compare = function(choice1,choice2, tieResult){  //added tieResult as 3rd argument in order to handle more than 1 move per round
    let result = tieResult || [] ;                   //result is blank array in case tieResult is undefined
    let length = result.length || 0                  //capture length of array or set to zero if 1st move in the round
    if(choice1==choice2){
        result [length] =  choice1+choice2;
    }else{
      if(choice1=="r"){
          if(choice2=="s"){
          result[length] = "rs";
          playerWins += 1                           //update score count here to provide overallWinner later
          }
          else{
          result[length] = "rp";
          computerWins += 1
          }
      }
      if(choice1=="p"){
          if(choice2=="r"){
          result[length] = "pr";
          playerWins += 1
          }
          else{
          result[length] = "ps";
          computerWins += 1
          }
      }
      if(choice1=="s"){
          if(choice2=="r"){
          result[length] = "sr";
          playerWins += 1
          }
          else{
          result[length] = "sp";
          computerWins += 1
          }
      }
    }
    return result
};
