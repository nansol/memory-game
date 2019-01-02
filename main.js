const cards = document.querySelectorAll('.memory-card');

let flippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

(function shuffle(){
  cards.forEach(card => {
    let random = Math.floor(Math.random() * 31);
    card.style.order = random;
  } )
})()

function flipCard() {
  if(lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!flippedCard) {
    flippedCard = true;
    firstCard = this;

    return;
  } 
    secondCard = this;
    checkForMatch();
   
  }

function checkForMatch(){
  let isMatch = firstCard.dataset.namecard === secondCard.dataset.namecard
  isMatch ? disableCards() : unflipCards();

}

function disableCards(){
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards(){
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
    }, 1500);
}

function resetBoard(){
  [flippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

cards.forEach(card => card.addEventListener('click', flipCard));