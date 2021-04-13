import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CollectContext } from "./CollectProvider";
import { useHistory } from "react-router-dom"
import "./Collection.css"

export const Collection = ({ collection }) => {
    const { deleteCollection } = useContext(CollectContext)
    const [singleCollection] = useState({})
    const history = useHistory();
    
    
    const handleDelete = () => {
      console.log(collection)
        deleteCollection(collection.id)
          .then(() => {
            history.push("/collections")
          })
      }
    
    return (
    <section className="collection">
        <h3 className="collection__name">
            <Link to={`/collections/detail/${collection.id}`}>
            {collection.name}
            </Link>
        </h3>
        <button className="btn btn-danger" onClick={handleDelete}>Delete Collection</button>
    </section>
)}