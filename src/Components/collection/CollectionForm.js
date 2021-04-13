import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { CollectContext } from "./CollectProvider";
import "./Collection.css";

export const CollectionForm = () => {
    const { addCollection, getCollections } = useContext(CollectContext)
    //const { locations, getLocations } = useContext(LocationContext)
    //const { customers, getCustomers } = useContext(CustomerContext)

    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

    Define the intial state of the form inputs with useState()
    */

    const [collection, setCollection] = useState({});
    const [showForm, setShowForm] = useState(false)

    const history = useHistory();

    /*
    Reach out to the world and get customers state
    and locations state on initialization.
    */
    useEffect(() => {
      getCollections()
    }, [])

    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
      /* When changing a state object or array,
      always create a copy, make changes, and then set state.*/
      const newCollection = { ...collection }
      /* Animal is an object with properties.
      Set the property to the new value
      using object bracket notation. */
      newCollection[event.target.id] = event.target.value
      // update state
      setCollection(newCollection)
    }

    const handleClickSaveCollection = () => {
        if (collection.name){
            addCollection({
                id: showForm,
                name: collection.name,
                customerId: +localStorage.getItem("database_customer")
                // date: event.date,
                // location: event.location
            });
            setShowForm(false);
            setCollection({})
            
        }
        else{
          //invoke addCollection passing collection as an argument.
          //once complete, change the url and display the collection list
          addCollection(collection)
        } history.push("/collections")
    
  }

    return (
      <form className="collectionForm">
          <h2 className="collectionForm__title">New Collection</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Collection name:</label>
                  <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Collection name" value={collection.name}/>
              </div>
          </fieldset>
          {/* <fieldset>
              <div className="form-group">
                  <label htmlFor="location">Assign to location: </label>
                  <select defaultValue={animal.locationId} name="locationId" id="locationId" className="form-control" >
                      <option value="0">Select a location</option>
                      {locations.map(l => (
                          <option key={l.id} value={l.id}>
                              {l.name}
                          </option>
                      ))}
                  </select>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="customerId">Customer: </label>
                  <select defaultValue={animal.customerId} name="customer" id="customerId" className="form-control" >
                      <option value="0">Select a customer</option>
                      {customers.map(c => (
                          <option key={c.id} value={c.id}>
                              {c.name}
                          </option>
                      ))}
                  </select>
              </div>
          </fieldset> */}
          <button className="btn btn-primary"
            onClick={handleClickSaveCollection}>
            Save Collection
          </button>
      </form>
    )
}
// Provider Function to Save Animal
// Now it is time for you to save your animal. First, create a function in your provider to perform the fetch operation.
