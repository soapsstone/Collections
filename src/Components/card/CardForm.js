import React, { useContext, useEffect, useState } from "react";
import { CardContext } from "./CardProvider";
import "./Card.css";
import { useParams, useHistory } from "react-router-dom"

export const CardForm = () => {
    const { addCard, getCards } = useContext(CardContext)

    const [ singleCard, setSingleCard ] = useState({})
    const [showForm, setShowForm] = useState(false)
    const history = useHistory();
    const {seriesId} = useParams();

    useEffect(() => {
        getCards()
    }, [])

    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newCard = { ...singleCard }
        /* Animal is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newCard[event.target.id] = event.target.value
        // update state
        setSingleCard(newCard)
      }

      const handleClickSaveCard = (e) => {
        e.preventDefault()
        if (singleCard.name){
            
          addCard({
                name: singleCard.name,
                seriesId: +seriesId
                // date: event.date,
                // location: event.location
            })
            .then(() => history.push(`/series/detail/${seriesId}`))
            
        }
        else{
          //invoke addCard passing card as an argument.
          //once complete, change the url and display the card list
          addCard(singleCard)
          .then(() => history.push(`/series/detail/${seriesId}`))
        } 
  }

  return (
    <form className="cardForm">
    <h2 className="cardForm__title">New Card</h2>
    <fieldset>
        <div className="form-group">
            <label htmlFor="name">Card name:</label>
            <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Card name" value={singleCard.name}/>
        </div>
    </fieldset>
    <button className="btn btn-primary"
            onClick={handleClickSaveCard}>
            Save Card
          </button>
    </form>
  )



}