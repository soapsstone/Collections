import React from "react"
import "./Card.css"

export const Card = ({ card }) => (
    <section className="card">
        <h3 className="card__name">{card.name}</h3>
    </section>
)