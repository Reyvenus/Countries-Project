import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { postByActivity, getCountries } from "../actions";
import("./CreateActivity.css")


const validate = (input) => {
    let errors = {}
    if (!input.name) errors.name = "The field NAME can't be empyt"
    if (!input.dificult) errors.dificult = "The field DIFICULT can't be empyt"
    if (input.dificult > 5 || input.dificult < 0) errors.dificult = "Only can be between 1 and 5"
    if (!input.duration) errors.duration = "The field DURATION can't be empyt -->ej: 2 horas"

    return errors
}

export default function CreateActivity() {

    const dispatch = useDispatch()
    const allCountries = useSelector(state => state.countries)

    useEffect(() => {
        dispatch(getCountries())
    }, [])

    const [input, setInput] = useState({
        name: "",
        dificult: "",
        duration: "",
        season: "",
        countryID: []
    })


    const [errors, setErrors] = useState({})
    console.log("CREACION", input)

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleCheckbox = (e) => {
        if (e.target.checked) {
            setInput({
                ...input,
                season: e.target.value
            })
        }
    }

    const handleSelect = (e) => {
        setInput({
            ...input,
            countryID: [...input.countryID, e.target.value]
        })
    }

    const handleDelete = (index) => {
        setInput({
            ...input,
            countryID: input.countryID.filter(country => country !== index)
        })
    }

    const handleSubmit = (e) => {
        //e.preventDefautl()
        dispatch(postByActivity(input))
        alert("Activity tourist add succes")
        // setInput({
        //     name: "",
        //     dificult: "",
        //     duration: "",
        //     season: "",
        //     id: []
        // })
    }

    return (
        <div className="principal">
            {/* <div className="container"></div> */}
            <h3>Create your activity</h3>
            <div className="container">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="inputsContainer">
                        <div className="inputs">
                            <label>Name:</label>
                            <input className="inputChange" type="text" value={input.name} name="name" onChange={(e) => handleInputChange(e)}></input>
                        </div>
                        <p>{errors.name && (<p className="error">{errors.name}</p>)}</p>

                        <div className="inputs">
                            <label>Dificult:</label>
                            <input className="inputChange" type="number" value={input.dificult} name="dificult" onChange={(e) => handleInputChange(e)}></input>
                        </div>
                        <p>{errors.dificult && (<p className="error">{errors.dificult}</p>)}</p>

                        <div className="inputs">
                            <label>Duration:</label>
                            <input className="inputChange" type="text" value={input.duration} name="duration" onChange={(e) => handleInputChange(e)}></input>
                        </div>
                        <p>{errors.duration && (<p className="error">{errors.duration}</p>)}</p>

                        <div className="checkboxs">
                            <label><b>Season:</b></label>
                        </div>

                        <div className="checkboxs">
                            <label>Verano</label>
                            <input className="inputChange1" type="checkbox" value="verano" name="verano" onChange={(e) => handleCheckbox(e)}></input>
                        </div>

                        <div className="checkboxs">
                            <label>Otoño</label>
                            <input className="inputChange1" type="checkbox" value="otoño" name="otoño" onChange={(e) => handleCheckbox(e)}></input>
                        </div>

                        <div className="checkboxs">
                            <label>Invierno</label>
                            <input className="inputChange1" type="checkbox" value="invierno" name="invierno" onChange={(e) => handleCheckbox(e)}></input>
                        </div>

                        <div className="checkboxs">
                            <label>Primavera</label>
                            <input className="inputChange1" type="checkbox" value="primavera" name="primavera" onChange={(e) => handleCheckbox(e)}></input>
                        </div>

                        <div className="inputs">
                            <label>Country:</label>
                            <select onChange={(e) => handleSelect(e)}>
                                <option>Add Country</option>
                                {allCountries.map(index =>

                                    <option value={index.id}>{index.name}</option>

                                )}
                            </select>

                        </div>
                        <div className="inputs">
                            <label></label>
                            <input value={input.countryID.map(index => index + "-")}></input>
                            {/* <button>Clear</button> */}
                        </div>

                    </div>
                    <div className="actionButtons">
                        <div className="btn">
                            <Link to="/Home">
                                <button>Back to Home</button>
                            </Link>
                            <button className="btn" type="submit">Create</button>
                        </div>
                    </div>
                </form>
                {input.countryID.map(index =>
                    <div>
                        <p>{index}</p>
                        <button className="buttonX" onClick={() => handleDelete(index)}>X</button>
                    </div>
                    )}
            </div>
            {/* <div className="container"></div> */}
        </div>
    )
}
