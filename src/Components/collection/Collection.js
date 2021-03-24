import React from "react"
import { Link } from "react-router-dom"
import "./Collection.css"

export const Collection = ({ collection }) => (
    <section className="collection">
        <h3 className="collection__name">
            <Link to={`/collections/detail/${collection.id}`}>
            {collection.name}
            </Link>
        </h3>
    </section>
)