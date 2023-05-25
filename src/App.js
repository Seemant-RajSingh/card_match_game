import './App.css';
import { useState, useEffect } from 'react'
import SingleCard from './components/SingleCard';

//each object within just has one property : src, which contains the source of image
const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]


function App() {

  //useState variable that holds an array
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)




//const and not function??? why
  const shuffleCards = () => {

    //duplicating cards
    const shuffledCards = [...cardImages, ...cardImages]

    //if +ve, then the two cards being compared in shuffleCards will be switched else not, hence END RESULT IS SHUFFLED CARDS
    //how is it taking dhuffledCards array?
    //how is the+ve/-ve rule applied
    .sort(() => Math.random() - 0.5)

    //END RESULT IS each card in the shuffled array gets a unique id(src property is already there as seen in console.log), and is stored in a variable card
    .map((card) => ({ ...card, id: Math.random() }))
      
    //storing the shuffled deck with id in card state var
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }





  //** CARD DATA SENT BACK TO APP.JS WHICH ITSELF WAS SENT  */
  const handleChoice = (card_from_click) => {
    //console.log(card_from_map.id) - consoles card id on clicking cover card

    //if choice one is null, first card data is sent to choiceOne, once its filled, choiceTwo is sent the card data, if they match cards remain unturned else, both variables are set null and cards are flipped back
    choiceOne ? setChoiceTwo(card_from_click) : setChoiceOne(card_from_click)
  }





  //this function triggeres each time 'BOTH' the variables in the dependency array changes
  useEffect(() => {
    
    //verify if two cards were selected
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        //console.log('those cards match')

        // setting matched prop of the two matched cards to true
        setCards(prevCards => {
          return prevCards.map(current_card => {
            if (current_card.src === choiceOne.src) {
              return { ...current_card, matched: true }
            } else {
              return current_card //return is similar to set card value here and cards useState determines whats visible on frontend
            }
          })
        })

        //console.log(turns)
        resetTurn()

      } else {
        //console.log('those cards do not match')
        setTimeout(() => resetTurn(), 1000)
      }

    }
  }, [choiceOne, choiceTwo])



//console.log(cards)



  //if cards dont match
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    //sometimes the format below needs to return a value instead of directly updating
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }




  // start new game automatically at beginning
  useEffect(() => {
    shuffleCards()
  }, [])




  //console.log(cards, turns)

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
      {cards.map(card => (
        //the rendering depends directly on useState variable cards
        //three cases where flipped will have a true value - selected/matched cards
        <SingleCard key={card.id} passed_card={card} passed_handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} passed_disabled={disabled}/>
      ))}
      </div>

      <p>Turns : {turns}</p>
    </div>
  );
}

export default App;
