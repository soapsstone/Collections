import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { DeckContext } from "./SeriesProvider"
import "./Series.css"
import { useParams, useHistory } from "react-router-dom"

export const SeriesDetail = () => {
  const { getDeckById } = useContext(DeckContext)

	const [singleDeck, setSingleDeck] = useState({})

	const {seriesId} = useParams();
	const history = useHistory();

  useEffect(() => {
    console.log("useEffect", seriesId)
    getDeckById(seriesId)
    .then((response) => {
      setSingleDeck(response)
    })
    }, [])

  return (
    <section className="carddeck">
      {/* What's up with the question mark???? See below.*/}
      {singleDeck.cards?.map(cards => <p><Link to={`/cards/detail/${cards.id}`}>
            {cards.name}
            </Link></p>)}
    </section>
  )
}