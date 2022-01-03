import axios from "axios"


export const getCountries = () => {
    return async function (dispatch) {
        const getCountries = await axios.get("http://localhost:3001/countries")
        console.log("PAISESDATABASE", getCountries)
        return dispatch({
            type: "GET_COUNTRIES",
            payload: getCountries.data
        })
    }
}

export const getCountriesByName = (name) => {
    return async function(dispatch){
        const getCountriesByName = await axios.get("http://localhost:3001/countries?name=" + name)
        return dispatch({
            type: "SHOW_COUNTRIES_BY_NAME",
            payload: getCountriesByName.data
        })
    }
}

export function getByActivities (payload){
    return{
        type:"SHOW_BY_ACTIVITIES",
        payload
    }
}

export const getOrderAlphabetic = function(payload){
    return{
        type: "SHOW_BY_ORDER_",
        payload
    }
}

export const getOrderPopulation = (payload) => {
    return {
        type: "SHOW_BY_POPULATION",
        payload
    }
}

export const postByActivity = (payload) => {
    return async function() {
        const getActivities = await axios.post("http://localhost:3001/activity", payload)
        console.log("HABERRRRRR", getActivities)
        return getActivities
    }
}

export const getByDetail = (id) => {
    return async (dispatch) => {
        const getDetail = await axios.get("http://localhost:3001/countries/" + id)
        console.log("DETALLESS", getDetail)
        return dispatch({
            type: "SHOW_BY_DETAIL",
            payload: getDetail.data
        })
    }
}

export const getActivities = (payload) => {
    return async function(dispatch){
        const activities = await axios.get("http://localhost:3001/activity")
        console.log("RESPOSeeeeeeE", activities)  
        //console.log("ACCTTTT", activities)
        return dispatch({
            type: "SHOW_BY_ACTIVITY",
            payload: activities.data
        })
    }
}


// export const getActivities = () => {
//     return function(dispatch){
//         axios.get("http://localhost:3001/activity").then((activities) =>{
//         console.log("RESPOSE", activities)    
//         return dispatch ({
//                 type: "SHOW_BY_ACTIVITY",
//                 payload: activities.data
//             })
//         })
//     }
// }


export const getByContinents = (payload) => {
    return {
        type: "SHOW_BY_CONTINENTS",
        payload
    }
}