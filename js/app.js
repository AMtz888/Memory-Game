let cardList = [
  '<i class="fa fa-diamond"></i>',
  '<i class="fa fa-diamond"></i>',
  '<i class="fa fa-paper-plane-o"></i>',
  '<i class="fa fa-paper-plane-o"></i>',
  '<i class="fa fa-anchor"></i>',
  '<i class="fa fa-anchor"></i>',
  '<i class="fa fa-bolt"></i>',
  '<i class="fa fa-bolt"></i>',
  '<i class="fa fa-cube"></i>',
  '<i class="fa fa-cube"></i>',
  '<i class="fa fa-leaf"></i>',
  '<i class="fa fa-leaf"></i>',
  '<i class="fa fa-bicycle"></i>',
  '<i class="fa fa-bicycle"></i>',
  '<i class="fa fa-bomb"></i>',
  '<i class="fa fa-bomb"></i>'
];

let openCards = [];
let numOfMoves = 0;
let numMatched = 0;
let firstClick = 0;
let stars = 3;
let endGame;


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Shuffles the cards and creates each card's HTML
function createCardGrid() {
  cardList = shuffle(cardList);
  cardList.forEach(function(card) {
    $('.deck').append('<li class="card">' + card + '</li>');
    });

}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


function playGame() {
  createCardGrid();
  $('.card').on('click', function() {
    firstClick++;
    startTimer();
    $(this).toggleClass('open show');
    openCards.push($(this));
    if (openCards.length === 2) {
      checkMatch();
    }
    updateGameInfo();
  });
}


function checkMatch() {
  console.log("running checkMatch")
  console.log(openCards[0].children().attr('class'), openCards[1].children().attr('class'))
  if (openCards[0].children().attr('class') === openCards[1].children().attr('class')) {
    openCards.forEach(function(card) {
      card.toggleClass('match animated tada');
      card.off('click');
      numMatched++
      console.log("inside first if")
    });
  } else {
    openCards.forEach(function(card) {
      card.toggleClass('animated shake');
      setTimeout(function(){card.toggleClass('open show animated shake');}, 800);
      console.log("inside else")
    });
  }
  openCards = [];
  numOfMoves++
  if (numMatched === 16) {
    endGame = true;
    theEnd();
  }
}

// Updates the number of moves and reduces star count on the page
function updateGameInfo() {
  $('.moves').html(numOfMoves);

  if (numOfMoves >= 14 && numOfMoves <= 20) {
    $('#star3').attr('class', 'fa fa-star-o')
    stars = 2;
    //return stars;
  } else if (numOfMoves > 20) {
    $('#star2').attr('class', 'fa fa-star-o')
    stars = 1;
    //return stars;
  }
}

/* Adds a timer to the page
 * Resources to help me figure out the timer code:
 * https://stackoverflow.com/questions/24155788/timer-to-be-displayed-on-a-webpage
 * https://www.w3schools.com/jsref/met_win_setinterval.asp
 */
 function startTimer() {
   let min = 0;
   let sec = 0;
   let time;
   if (firstClick === 1) {
     time = setInterval(function() {
       sec++;
       if (sec > 59) {
         sec = 0;
         min++;
       }
     $('.timer').html((min > 9 ? min : '0'+min)+':'+(sec > 9 ? sec : '0'+sec));
     if (endGame === true) {
       clearInterval(time);
     }
     }, 1000);
   }
 }

function restart() {
  location.reload();
}

function theEnd() {
  let modal = document.querySelector('.modal');
  let closeButton = document.querySelector('.close-button');
  let yes = document.querySelector('#yes');
  let no = document.querySelector('#no');

  $("#stars").text(String(stars));

  function toggleModal() {
        modal.classList.toggle('show-modal');
    }
  toggleModal();

  closeButton.addEventListener("click", toggleModal);
  yes.addEventListener("click", restart);
  no.addEventListener("click", toggleModal);
  console.log("running theEnd");
}

$('.restart').on('click', function() {
  restart();
});

playGame();
