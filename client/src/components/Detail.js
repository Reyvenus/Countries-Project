import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getByDetail } from "../actions";
import ("./Detail.css")


export default function Detail() {
    //console.log("PROPSS", props)
    const {id} = useParams()
    console.log("IDCODE", id)
    const dispatch = useDispatch()
    const myCountry = useSelector(state => state.allDetail)
    
    useEffect(() => {
        dispatch(getByDetail(id))
    }, [id])
    
    return (
        <div className="detail">
            {
                myCountry.length > 0                    ?
                    <div className="countryContainer">
                        <div className='countryDetail'>
                            <img className="imgContainer" src={myCountry[0].flagImage}/>
                            <h1 className="tituloH1">{myCountry[0].name.toUpperCase()}</h1>
                            
                            <p>
                                <label>Subregion:</label>
                                <span>{myCountry[0].subregion}</span>
                            </p>
                            <p>
                                <label>Population:</label>
                                <span>{myCountry[0].population} millones</span>
                            </p>
                            <p>
                                <label>Area:</label>
                                <span>{myCountry[0].area} km2</span>
                            </p> 
                            <p>
                                <label>Tourist Activities:</label>
                                <span>{myCountry[0].activities.map(index => index.name + " ")}</span>
                            </p> 
                        </div>
                        <div>
                            <Link to="/Home">
                                <button className="btnBuildActiviy">Back to Home</button>
                            </Link>
                        </div>
                    </div>
                    : <p>Loading...</p>
            }
        </div>
    )
}