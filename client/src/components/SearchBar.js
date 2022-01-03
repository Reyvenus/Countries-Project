import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../actions";
import ("./SearchBar.css")

export default function SearchBar(){

    const dispatch = useDispatch()

    const [name, setName] = useState("")

    const handleInputChange = (e) => {
        e.preventDefault()
        const name = e.target.value 
        setName(name)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getCountriesByName(name))
        setName("")
    }

    return(
        <div className="searchCard">
            <input className="inputSearch" type="text" placeholder="Search Country" onChange={(e) => handleInputChange(e)}></input>
            <button className="buttonSearch" type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}