import React, { useContext, useEffect } from "react"
import { CardContext } from "./CardProvider"
import { Card } from "./Card"
import "./Card.css"

export const CardList = () => {
  // This state changes when `getCards()` is invoked below
  const { cards, getCards } = useContext(CardContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("CardList: useEffect - getCards")
    getCards()

  }, [])


  return (
    <div className="cards">
      {console.log("CardList: Render", cards)}
      {
        cards.map(card => {
          return <Card key={card.id} card={card} />
        })
      }
    </div>
  )
}