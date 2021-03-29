import React, { useContext, useState, useEffect } from "react";
import { CardContext } from "./CardProvider";
import { useParams, useHistory } from "react-router-dom";
import "./Card.css"

export const Card = ({ card }) => {
    const { getCardById,deleteCard } = useContext(CardContext)
    const [singleCard, setSingleCard] = useState({})
    const history = useHistory();
    const {cardId} = useParams();

    //for edit, hold on to state of card in this view
    const [cardEdit, setCardEdit] = useState({})
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      console.log("useEffect", cardId)
      getCardById(cardId)
      .then((response) => {
        setSingleCard(response)
      })
      }, [])
    
    const handleDelete = () => {
      console.log(singleCard)
        deleteCard(card.id)
          .then(() => {
            history.push("/cards")
          })
      }

      useEffect(() => {
        if (cardId){
          getCardById(cardId)
          .then(cardId => {
            setCardEdit(cardId)
            setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }

      }, [])

    return (
    <section className="card">
        <h3 className="card__name">{card.name}</h3>
        <button className="btn btn-primary"
        disabled={isLoading}
        onClick={() => {
          history.push(`/cards/edit/${card.id}`)
        }}>Edit</button>
        <button onClick={handleDelete}>Delete Card</button>
    </section>
    
    )
    }