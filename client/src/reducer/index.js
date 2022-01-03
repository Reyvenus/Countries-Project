
const initialState = {
    countries: [],
    allCountries: [],
    allDetail: [],
    allActivities: []
}

export default function rootReducer(state = initialState, action) {
    if (action.type === "GET_COUNTRIES") {
        return {
            ...state,
            countries: action.payload,
            allCountries: action.payload
        }
    }

    if (action.type === "SHOW_COUNTRIES_BY_NAME") {
        return {
            ...state,
            countries: action.payload
        }
    }

    if (action.type === "SHOW_BY_CONTINENTS") {
        const allCountries = state.allCountries
        console.log("QUE ME TRAES", allCountries)
        const byContinents = action.payload === "All"
            ? allCountries
            : allCountries.filter(index => index.continents === action.payload)
                
        console.log("SHHHHHOOWMEEE", byContinents)
        return {
            ...state,
            countries: byContinents
        }
    }

    if (action.type === "SHOW_BY_ORDER_") {
        const countries = state.allCountries 
        let showByOrder = action.payload === "Upward"
            ? countries.sort((a, b) => {
                if (a.name > b.name) return 1
                if (a.name < b.name) return -1
                return 0
            })
            : countries.sort((a, b) => {
                if (a.name < b.name) return 1
                if (a.name > b.name) return -1
                return 0
            })

        return {
            ...state,
            countries: showByOrder
        }
    }

    if (action.type === "SHOW_BY_POPULATION") {
        const showByPopulation = action.payload === "Max"
            ? state.countries.sort((a, b) => {
                if (a.population > b.population) return 1
                if (a.population < b.population) return -1
                return 0
            })
            : state.countries.sort(function (a, b) {
                if (a.population < b.population) return 1
                if (a.population > b.population) return -1
                return 0
            })

        return {
            ...state,
            countries: showByPopulation
        }
    }

    if (action.type === "POST_ACTIVITY") {
        return {
            ...state
        }
    }

    if (action.type === "SHOW_BY_DETAIL") {
        return {
            ...state,
            allDetail: action.payload
        }
    }

    if (action.type === "SHOW_BY_ACTIVITY") {
        return {
            ...state,
            allActivities: action.payload
        }
    }

    if (action.type === "SHOW_BY_ACTIVITIES") {
        let byActivities = state.allCountries

        if (action.payload !== "All") {
            byActivities = action.payload === "All Activity"
                ? byActivities.filter(index => index.activities.length > 0)
                : byActivities.filter(index => index.activities.find(index => index.name === action.payload))
        }
        console.log("SHHHHHOOWMEEE222222", byActivities)

        return {
            ...state,
            countries: byActivities
        }
    }

    return state

}