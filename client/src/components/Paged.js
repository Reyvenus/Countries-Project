import React from "react";
import ("./Paged.css")

export default function Paged({countriesForPage, allCountries, paged}){
    const numbersOfPages = []
    const pages = Math.ceil(allCountries / countriesForPage) //eje 250/10=25
                    
    for(let i = 0; i < pages; i++){
        numbersOfPages.push(i + 1)
        console.log("LOSPAGINADOSNUMBERS", numbersOfPages)
    }

    return(
        <nav>
            <ul className="paged">
                {numbersOfPages &&
                    numbersOfPages.map(index => 
                    <span className="index" key={index}>
                        <a  href="#" onClick={() => paged(index)}>{index + " "}</a>
                    </span>)}
            </ul>
        </nav>
    )
}


