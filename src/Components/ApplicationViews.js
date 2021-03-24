import React from "react";
import { Route } from "react-router-dom";
//import { Card } from "./card/Card"
import { CardList } from "./card/CardList";
import { CardProvider } from "./card/CardProvider";
import { CardForm } from "./card/CardForm";
import { CollectionList } from "./collection/CollectList";
import { CollectProvider } from "./collection/CollectProvider";
import { CollectionForm } from "./collection/CollectionForm";
import { CollectionDetail } from "./collection/CollectionDetail";
import { Home } from "./Home";
import { DeckProvider } from "./series/SeriesProvider";
import { SeriesDetail } from "./series/SeriesDetail";
import { SeriesForm } from "./series/SeriesForm";


export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route path="/">
                <Home />
            </Route>

            <CollectProvider>
                <DeckProvider>
                    <CardProvider>
                        <Route exact path="/cards">
                            <CardList />
                        </Route>
                        <Route exact path="/collections">
                            <CollectionList />
                        </Route>
                        <Route exact path="/collections/create">
                            <CollectionForm />
                        </Route>
                        <Route exact path="/series/create">
                            <SeriesForm />
                        </Route>
                        <Route exact path="/cards/create">
                            <CardForm />
                        </Route>
                        <Route exact path="/collections/detail/:collectionId(\d+)">
                            <CollectionDetail />
                        </Route>
                        <Route exact path="/series/detail/:seriesId(\d+)">
                            <SeriesDetail />
                        </Route>
                    </CardProvider>
                </DeckProvider>
            </CollectProvider>
        </>
    )
}