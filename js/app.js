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
let endGame = false;


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


// Event listener for clicks, calls other functions to put the whole game together
function playGame() {
  createCardGrid();
  $('.card').on('click', function() {
    firstClick++;
    startTimer();
    if (!($(this).hasClass('open show'))) {
      $(this).toggleClass('open show');
      openCards.push($(this));
    }
    if (openCards.length === 2) {
      checkMatch();
    }
    updateGameInfo();
  });
}


// Checks cards for matches and whether the game is over
function checkMatch() {
  if (openCards[0].children().attr('class') === openCards[1].children().attr('class')) {
    openCards.forEach(function(card) {
      card.toggleClass('match animated tada');
      card.off('click');
      numMatched++
    });
  } else {
    openCards.forEach(function(card) {
      card.toggleClass('animated shake');
      setTimeout(function(){card.toggleClass('open show animated shake');}, 800);
    });
  }
  openCards = [];
  numOfMoves++
  if (numMatched === 16) {
    endGame = true;
    theEnd();
  }
}


// Updates the number of moves and reduces star count on the webpage
function updateGameInfo() {
  $('.moves').html(String(numOfMoves) + ' Moves');

  if (numOfMoves >= 14 && numOfMoves <= 20) {
    $('#star3').attr('class', 'fa fa-star-o')
    stars = 2;
  } else if (numOfMoves > 20) {
    $('#star2').attr('class', 'fa fa-star-o')
    stars = 1;
  }
}


/* Adds a timer to the page
 * Resources used:
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


// reloads the page - used for restart button and modal
function restart() {
  location.reload();
}


/* Functionality for the end-of-game popup
 * Resources used:
 * https://sabe.io/tutorials/how-to-create-modal-popup-box
 * https://www.w3schools.com/howto/howto_css_modals.asp
 */
function theEnd() {
  let modal = document.querySelector('.modal');
  let closeButton = document.querySelector('.close-button');
  let yes = document.querySelector('#yes');
  let no = document.querySelector('#no');

  // Adds star rating to modal text
  $('#stars').text(String(stars));

  function toggleModal() {
    modal.classList.toggle('show-modal');
  }
  toggleModal();

  closeButton.addEventListener('click', toggleModal);
  yes.addEventListener('click', restart);
  no.addEventListener('click', toggleModal);
}


// Event listener for restart button
$('.restart').on('click', function() {
  restart();
});


playGame();
