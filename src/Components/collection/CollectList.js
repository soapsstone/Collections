import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { CollectContext } from "./CollectProvider"
import { Collection } from "./Collection"
import "./Collection.css"

export const CollectionList = () => {
  // This state changes when `getCollections()` is invoked below
  const { collections, getCollections, deleteCollection } = useContext(CollectContext)

  const [singleCollection, setSingleCollection] = useState({})
  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("CollectionList: useEffect - getCollections")
    getCollections()

  }, [])

  const history = useHistory()
  
  const handleDelete = () => {
    deleteCollection(singleCollection.id)
      .then(() => {
        history.push("/collections")
      })
  }

  return (
    <>

    <h2>Collections</h2>
    
		<button onClick={() => {history.push("/collections/create")}}>
            Add Collection
        </button>

    <div className="collections">
      {console.log("CollectionList: Render", collections)}
      {
        collections.map(collection => {
          return <Collection key={collection.id} collection={collection} />
        })
      }
    </div>
    </>
  )
}