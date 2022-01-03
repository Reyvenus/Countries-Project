import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import { getCountries, getByContinents, getByActivities, getOrderAlphabetic, getOrderPopulation, getActivities } from "../actions";
import CountryCard from "./CountryCard";
import Paged from "./Paged";
import SearchBar from "./SearchBar";
import "./Home.css"

export default function Home() {
    const dispatch = useDispatch()

    const allCountries = useSelector(state => state.countries)
    const allActivities = useSelector(state => state.allActivities)
    console.log("ACTTTIVITY222", allActivities)
    //ESTADOS LOCALES
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesForPage, setCountriesForPage] = useState(10)
    const [order, setOrder] = useState("")
    const [orderPopulation, setOrderPopulation] = useState(0)

    //PAGINADO
    const indexLastGame = currentPage * countriesForPage  //10
    const indexFirstGame = indexLastGame - countriesForPage //0
    const currentCountries = allCountries.slice(indexFirstGame, indexLastGame)
    const paged = (pagesNumber) => {
        setCurrentPage(pagesNumber)
    }

    const handleContinents = (e) => {
        e.preventDefault()
        dispatch(getByContinents(e.target.value))
    }

    const handleActivity = function (e) {
        e.preventDefault()
        dispatch(getByActivities(e.target.value))
    }

    const handleOrder = (e) => {
        e.preventDefault()
        dispatch(getOrderAlphabetic(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    const handleOrderPopulation = (e) => {
        e.preventDefault()
        dispatch(getOrderPopulation(e.target.value))
        setCurrentPage(1)
        setOrderPopulation(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(getCountries())
    }

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    useEffect(() => {
        dispatch(getActivities())
    }, [dispatch])

    return (
        <div className="homePrincipal">
            <h1 id="titulo">THE COUNTRIES OF THE WORLD</h1>
            
            <div className="containerSearchButon">
                <div className="search">
                    <SearchBar />
                </div>
                <div className="actionButtonsContainer">
                    <button className="actionButton" onClick={(e) => handleClick(e)}>Show all Countries</button>
                    <div className="buildActivity">
                        <Link to="/activity/">
                            <button className="actionButton">Create Activity</button>
                        </Link>
                    </div>
                </div>
            </div>


            <div className="selectContainer">
                <select className="select" onChange={(e) => handleContinents(e)}>
                    <option selected>Filter by Continents</option>
                    <option value="All">All Continents</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Asia">Asia</option>
                    <option value="Africa">Africa</option>
                    <option value="South America">South America</option>
                    <option value="Europe">Europe</option>
                    <option value="North America">North America</option>
                    <option value="Oceania">Oceania</option>
                </select>

                <select onChange={(e) => handleActivity(e)}>
                    <option value="All" selected>Filter by Activity</option>
                    <option value="All Activity">Countries Activities</option>
                    {allActivities.map(index =>
                        <option value={index.name}>{index.name}</option>)
                    }
                </select>

                <select onChange={(e) => handleOrder(e)}>
                    <option>Show in order Alphabetic</option>
                    <option value="Upward">Upward</option>
                    <option value="Falling">Falling</option>
                </select>

                <select onChange={(e) => handleOrderPopulation(e)}>
                    <option>Show by Population</option>
                    <option value="Min">Max Population</option>
                    <option value="Max">Min Population</option>
                </select>

            </div>
            <div className="cardCountry">
                {currentCountries.map(index => {
                    return (
                        <div >
                            {<Link to={"/detail/" + index.id}>
                                <CountryCard key={index} error={index.error} flagImage={index.flagImage} name={index.name} continents={index.continents} />
                            </Link>}
                        </div>
                    )
                })}
            </div>
           
            <div>
                {currentCountries.length >= 10 && 
                <Paged
                    countriesForPage={countriesForPage}
                    allCountries={allCountries.length}
                    paged={paged}
                />}
            </div>
        </div>
    )
}