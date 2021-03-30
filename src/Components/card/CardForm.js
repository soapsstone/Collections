import React, { useContext, useEffect, useState } from "react";
import { CardContext } from "./CardProvider";
import "./Card.css";
import { useParams, useHistory } from "react-router-dom"

export const CardForm = () => {
    const { addCard, getCards, getCardById, updateCard } = useContext(CardContext)

    const [ singleCard, setSingleCard ] = useState({})
    const [showForm, setShowForm] = useState(false)
    const history = useHistory();
    const {seriesId} = useParams();
    const {cardId} = useParams();

    //for edit, hold on to state of card in this view
    const [cardEdit, setCardEdit] = useState({})
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);
    

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

      const handleClickSaveCard = () => {
        if (cardId){
            //PUT - update
          updateCard({
                id: singleCard.id,
                name: singleCard.name,
                seriesId: +seriesId
                // date: event.date,
                // location: event.location
            })
            .then(() => history.push(`/series/detail/${singleCard.id}`))
            console.log(singleCard.id)
        }else{
          //invoke addCard passing card as an argument.
          //once complete, change the url and display the card list
          addCard({
            name: singleCard.name,
            seriesId: +seriesId
          })
          .then(() => history.push(`/series/detail/${seriesId}`))
          console.log(seriesId)
        } 
  }

  useEffect(() => {
    getCards().then(() => {
      if (cardId){
        getCardById(cardId)
        .then(cardEdit => {
          setSingleCard(cardEdit)
          setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    })
  }, [])

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
            disabled={isLoading}
            onClick={event => {
              event.preventDefault()
              handleClickSaveCard()
            }}>
            {cardId ? <>Update Card</> : <>Save Card</> }
          </button>
    </form>
  )
}