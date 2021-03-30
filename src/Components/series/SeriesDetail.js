import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { DeckContext } from "./SeriesProvider"
import "./Series.css"
import { useParams, useHistory } from "react-router-dom"
import { CardContext } from "../card/CardProvider"
import { Card } from "../card/Card"

export const SeriesDetail = () => {
  const { getDeckById, deleteDeck } = useContext(DeckContext)
  const { cards, getCards } = useContext(CardContext)
	const [singleDeck, setSingleDeck] = useState([])
	const {seriesId} = useParams();
	const history = useHistory();

  useEffect(() => {
    console.log("useEffect", seriesId)
    getDeckById(seriesId)
    .then((response) => {
      setSingleDeck(response)
    })
    }, [])

    useEffect(() => {
      console.log("CardList: useEffect - getCards")
      getCards()
  
    }, [])

    const handleDelete = () => {
      console.log(singleDeck)
      deleteDeck(singleDeck.id)
        .then(() => {
          history.push("/collections")
        })
    }




  return (
<>
    <button onClick={() => {history.push(`/cards/create/${singleDeck.id}`)}}>
      Add Card
    </button> 
    
    <section className="card">
      {console.log("CardList: Render", cards)}
      {/* What's up with the question mark???? See below.*/}
      {cards.map(card => {
        return <div><Card key={card.id} card={card} />
        </div>
      }
            )}
            <button onClick={handleDelete}>Delete Deck</button>
    </section>
    
</>
  )
}