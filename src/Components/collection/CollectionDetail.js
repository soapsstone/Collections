import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CollectContext } from "./CollectProvider"
import "./Collection.css"
import { useParams, useHistory } from "react-router-dom"

export const CollectionDetail = () => {
  const { getCollectionById } = useContext(CollectContext)

	const [singleCollection, setSingleCollection] = useState({})

	const {collectionId} = useParams();
	const history = useHistory();

  useEffect(() => {
    console.log("useEffect", collectionId)
    getCollectionById(collectionId)
    .then((response) => {
      setSingleCollection(response)
    })
    }, [])

  return (
    <section className="deck">
      {/* What's up with the question mark???? See below.*/}
      {singleCollection.series?.map(series => <p><Link to={`/series/detail/${series.id}`}>
            {series.name}
            </Link></p>)}
    </section>
  )
}