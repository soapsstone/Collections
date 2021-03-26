import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const CardContext = createContext()

// This component establishes what data can be used.
export const CardProvider = (props) => {
    const [cards, setCards] = useState([])

    const getCards = () => {
        return fetch("http://localhost:8088/cards")
        .then(res => res.json())
        .then(setCards)
    }

    const addCard = cardObj => {
        return fetch("http://localhost:8088/cards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cardObj)
        })
        .then(getCards)
    }

    const getCardById = (id) => {
        return fetch(`http://localhost:8088/cards/${id}`)
            .then(res => res.json())
    }

    const deleteCard = cardId => {
        return fetch(`http://localhost:8088/cards/${cardId}`, {
            method: "DELETE"
        })
            .then(getCards)
    }

    const updateCard = card => {
        return fetch(`http://localhost:8088/cards/${card.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(card)
        })
          .then(getCards)
      }

    /*
        You return a context provider which has the
        `cards` state, `getCards` function,
        and the `addCard` function as keys. This
        allows any child elements to access them.
    */
    return (
        <CardContext.Provider value={{
            cards, getCards, addCard, getCardById, deleteCard, updateCard
        }}>
            {props.children}
        </CardContext.Provider>
    )
}