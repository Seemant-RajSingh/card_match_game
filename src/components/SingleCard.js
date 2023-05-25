import './SingleCard.css'

export default function SingleCard({passed_card, passed_handleChoice, flipped, passed_disabled}) {

  const handleClick = () => {
    if(!passed_disabled) {
      passed_handleChoice(passed_card)
    }
  }


  return (
    <div className="card" key={passed_card.id}>
        <div className={flipped ? "flipped" : ""}>
          <img className="front" src={passed_card.src} alt="card front" />
          <img className="back" src="/img/cover.png" alt="cover" onClick={handleClick}/>
        </div>
    </div>
  )
}
