import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { DeckContext } from "./SeriesProvider";
import "./Series.css";

export const SeriesForm = () => {
    const { addDeck, getDecks } = useContext(DeckContext)

       /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

    Define the intial state of the form inputs with useState()
    */

   const [deck, setSingleDeck] = useState({});
   const [showForm, setShowForm] = useState(false)
   const history = useHistory();

    /*
    Reach out to the world and get customers state
    and locations state on initialization.
    */
   useEffect(() => {
    getDecks()
  }, [])

      //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newDeck = { ...deck }
        /* Animal is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newDeck[event.target.id] = event.target.value
        // update state
        setSingleDeck(newDeck)
      }

      const handleClickSaveDeck = () => {
        if (deck.name){
            addDeck({
                id: showForm,
                name: deck.name,
                // date: event.date,
                // location: event.location
            });
            setShowForm(false);
            setSingleDeck({})
            
        }
        else{
          //invoke addDeck passing deck as an argument.
          //once complete, change the url and display the deck list
          addDeck(deck)
        } history.push("/series")
    
  }

  return (
    <form className="deckForm">
        <h2 className="deckForm__title">New Deck</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Deck name:</label>
                <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Deck name" value={deck.name}/>
            </div>
        </fieldset>
        <button className="btn btn-primary"
            onClick={handleClickSaveDeck}>
            Save Deck
          </button>
      </form>
    )
}