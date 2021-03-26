import React, { useContext, useState, useEffect } from "react";
import { CardContext } from "./CardProvider";
import { useParams, useHistory } from "react-router-dom";
import "./Card.css"

export const Card = ({ card }) => {
    const { getCardById,deleteCard } = useContext(CardContext)
    const [singleCard, setCard] = useState({})
    const history = useHistory();
    const {cardId} = useParams();

    useEffect(() => {
      console.log("useEffect", cardId)
      getCardById(cardId)
      .then((response) => {
        setCard(response)
      })
      }, [])
    
    const handleDelete = () => {
      console.log(singleCard)
        deleteCard(card.id)
          .then(() => {
            history.push("/cards")
          })
      }

    return (
    <section className="card">
        <h3 className="card__name">{card.name}</h3>
        <button onClick={handleDelete}>Delete Card</button>
    </section>
    
    )
    }