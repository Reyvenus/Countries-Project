import React from "react";
import "./CountryCard.css"

export default function CountryCard({ error, flagImage, name, continents }) {
    if(name){
        return (
        <div className="country">
            <img className="imgCard" src={flagImage} alt="image not found" />
            <h2>{name.toUpperCase()}</h2>
            <h3>{continents}</h3>
        </div>
    )
    }
    else
        return(
            <div className="countrytwo">
                <img className="imgCard" src="https://previews.123rf.com/images/trueffelpix/trueffelpix1605/trueffelpix160500018/58037157-vector-ilustraci%C3%B3n-de-la-p%C3%A1gina-de-error-no-encontrado.jpg"/>
                <h1>{error}</h1>
            </div>
        )
    }