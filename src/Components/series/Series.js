import React from "react"
import { Link } from "react-router-dom"
import "./Series.css"

export const Deck = ({ deck }) => (








    <section className="deck">
        <h3 className="deck__name">
            <Link to={`/series/detail/${series.id}`}>
            {series.name}
            </Link>
        </h3>
        <button onClick={handleDelete}>Delete Co</button>
    </section>
)