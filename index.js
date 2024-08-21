let deckId
let computerScore = 0
let myScore = 0
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById("header")
const remainingText = document.getElementById("remaining")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")

newDeckBtn.addEventListener("click", handleClick)

drawCardBtn.addEventListener("click", async () => {
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
    
    remainingText.textContent = `Remaining cards: ${ data.remaining }`

    for ( let i = 0; i < data.cards.length; i++ )
    {
        cardsContainer.children[ i ].innerHTML = `
        <img src=${ data.cards[ i ].image } class="card" />
    `
    }

    const winnerText = determineCardWinner(data.cards[0], data.cards[1])
    header.textContent = winnerText
            
    if (data.remaining === 0) {
        drawCardBtn.disabled = true
        if (computerScore > myScore) {
            header.textContent = "The computer won the game!"
        } else if (myScore > computerScore) {
            header.textContent = "You won the game!"
        } else {
            header.textContent = "It's a tie game!"
        }
    }
} )

async function handleClick ()
{
    const res = await fetch( "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/" );
    const data = await res.json();
    remainingText.textContent = `Remaining cards: ${ data.remaining }`;
    deckId = data.deck_id;
    drawCardBtn.disabled = false;
    cardsContainer.innerHTML = `<div class="card-slot"></div>
                                <div class="card-slot"></div>`
    computerScore = 0
    myScore = 0
    computerScoreEl.textContent = `Computer score: ${ computerScore }`
    myScoreEl.textContent = `My score: ${ myScore }`
    header.textContent = "Game of Cards"
}

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    
    if (card1ValueIndex > card2ValueIndex) {
        computerScore++
        computerScoreEl.textContent = `Computer score: ${computerScore}`
        return "Computer wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        myScore++
        myScoreEl.textContent = `My score: ${myScore}`
        return "You win!"
    } else {
        return "Tie!"
    }
}