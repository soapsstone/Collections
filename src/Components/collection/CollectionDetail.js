import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CollectContext } from "./CollectProvider"
import "./Collection.css"
import { useParams, useHistory } from "react-router-dom"

export const CollectionDetail = () => {
  const { getCollectionById, deleteCollection } = useContext(CollectContext)

	const [singleCollection, setSingleCollection] = useState({})

	const {collectionId} = useParams();
	const history = useHistory();

  const handleDelete = () => {
    console.log(singleCollection)
    deleteCollection(singleCollection.id)
      .then(() => {
        history.push("/collections")
      })
  }

  useEffect(() => {
    console.log("useEffect", collectionId)
    getCollectionById(collectionId)
    .then((response) => {
      setSingleCollection(response)
    })
    }, [])

  return (
    <>
        <button className="btn btn-success" onClick={() => {history.push(`/series/create/${singleCollection.id}`)}}>
          Add Series
        </button>
    <section className="serieses">
      {/* What's up with the question mark???? See below.*/}
      {singleCollection.series?.map(series => {
        if (singleCollection.customerId === +localStorage.getItem("database_customer")){
          return <p key={series.id}><Link className= "link" to={`/series/detail/${series.id}`}>
            {series.name}
            </Link>
      </p>
      }}
          )}
    
    </section>
    </>
  )
}