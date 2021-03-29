import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CardContext } from "./CardProvider";
import "./Card.css";
import { useParams, useHistory } from "react-router-dom";

export const CardDetail = () => {
    const { getCardById, deleteCard } = useContext(CardContext)

    const [card, setCard] = useState({})

    const {cardId} = useParams();
    const history = useHistory();

    const handleDelete = () => {
        deleteCard(card.id)
          .then(() => {
            history.push("/cards")
          })
      }

      useEffect(() => {
        console.log("useEffect", cardId)
        getCardById(cardId)
        .then((response) => {
          setCard(response)
        })
        }, [])

        return (
            <>
            <section className="cards">
      {/* What's up with the question mark???? See below.*/}
      {card.series?.map(series => <p key={series.id}><Link to={`/series/detail/${series.id}`}>
            {series.name}
            </Link></p>)}
            <button onClick={() => {
              history.push(`/cards/edit/${card.id}`)
            }}>Edit</button>
    
    
    
    </section>
            
            </>
        )

}
