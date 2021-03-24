import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const DeckContext = createContext()

// This component establishes what data can be used.
export const DeckProvider = (props) => {
    const [decks, setDecks] = useState([])

    const getDecks = () => {
        return fetch("http://localhost:8088/series")
        .then(res => res.json())
        .then(setDecks)
    }

    const addDeck = deckObj => {
        return fetch("http://localhost:8088/series", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deckObj)
        })
        .then(getDecks)
    }

    const getDeckById = (id) => {
        console.log(id)
        return fetch(`http://localhost:8088/series/${id}`)
            .then(res => res.json())
    }

    /*
        You return a context provider which has the
        `decks` state, `getDecks` function,
        and the `addDeck` function as keys. This
        allows any child elements to access them.
    */
    return (
        <DeckContext.Provider value={{
            decks, getDecks, addDeck, getDeckById
        }}>
            {props.children}
        </DeckContext.Provider>
    )
}