import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const CollectContext = createContext()

// This component establishes what data can be used.
export const CollectProvider = (props) => {
    const [collections, setCollections] = useState([])

    const getCollections = () => {
        return fetch("http://localhost:8088/collections")
        .then(res => res.json())
        .then(setCollections)
    }

    const addCollection = collectionObj => {
        return fetch("http://localhost:8088/collections", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(collectionObj)
        })
        .then(getCollections)
    }

    const getCollectionById = (id) => {
        return fetch(`http://localhost:8088/collections/${id}?_embed=series&_embed=card`)
            .then(res => res.json())
    }

    const deleteCollection = collectionId => {
        return fetch(`http://localhost:8088/collections/${collectionId}`, {
            method: "DELETE"
        })
            .then(getCollections)
    }

    /*
        You return a context provider which has the
        `collections` state, `getCollections` function,
        and the `add` function as keys. This
        allows any child elements to access them.
    */
    return (
        <CollectContext.Provider value={{
            collections, getCollections, addCollection, getCollectionById, deleteCollection
        }}>
            {props.children}
        </CollectContext.Provider>
    )
}