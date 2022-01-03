import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css'

export default function LandingPage() {
    return (
        <div className="landingContainer">
            <div className='landingPageImage'>
                <h1 className='landingPageH1'>WellCome</h1>
            </div>
            <div>
                <Link to="/home">
                    <button className='landingPageButton'>Enter</button>
                </Link>
            </div>
        </div>
        
    )
}
