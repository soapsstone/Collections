import React, { useContext, useEffect, useState, Component } from "react"
import { Link } from "react-router-dom"
import { DeckContext } from "./SeriesProvider"
import "./Series.css"
import { useParams, useHistory } from "react-router-dom"
import { CardContext } from "../card/CardProvider"
import { Card } from "../card/Card"
import { ProgressBar } from "bootstrap-4-react"

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
      console.log(response)
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

    const calculateCompleted = () => {
      let completed = []
      let value = singleDeck.forEach((cards) => {
        if(cards.completed === true) {
          completed.push(cards)
        }
      })
      let completedValue = completed.length
      console.log(completedValue)
      let deckValue = singleDeck.length
      value = (completedValue / deckValue) * 100
      console.log(deckValue)
      return value
    }

  return (
<>
    <button className="btn btn-success" onClick={() => {history.push(`/cards/create/${singleDeck.id}`)}}>
      Add Card
    </button> 
    
    <section className="cards">
      {console.log("CardList: Render", cards)}
      {/* What's up with the question mark???? See below.*/}
      {cards.map(cards => {
        if (cards.customerId === +localStorage.getItem("database_customer")){
        return <div><Card key={cards.id} card={cards} />
        </div>
        }
        <ProgressBar  animated now={calculateCompleted()} />
      }
            )}
    </section>
    <button className="btn btn-danger" onClick={handleDelete}>Delete Deck</button>
    
</>
  )
}