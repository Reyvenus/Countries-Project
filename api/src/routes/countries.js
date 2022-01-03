const express = require("express")
const axios = require("axios").default
const { Country, Activity } = require("../db")

const server = express()
const URL_API_COUNTRIES = "https://restcountries.com/v3/all"

const getInfoApi = async () => {
    const infoInDb = await Country.findAll()

    if (infoInDb.length === 0) {
        const infoUrlApiCountries = await axios.get(URL_API_COUNTRIES)
        const infoApi = infoUrlApiCountries.data.map(index => {
            return {
                id: index.cca3,
                name: index.name.common,
                flagImage: index.flags[1],
                continents: index.continents[0],
                subregion: index.subregion,
                area: index.area,
                population: index.population
            }
        })
        const infoDataBase = await Country.bulkCreate(infoApi)
        return infoDataBase
    }
    return infoInDb
}

const getinfoDb = async () => {
    const infoCountries = await getInfoApi()
    return await Country.findAll({include: Activity})
}


server.get("/", async (req, res) => {
    const infoInDb = await getinfoDb()
    const name = req.query.name
    // const nameModify = name[0].toUpperCase()
    // const nameCut = name.slice(1, name.length)
    // const newName = nameModify + nameCut
    try {
        if (name) {
            const filterByName = infoInDb.filter(index => index.name.toLowerCase().includes(name.toLowerCase()))
            console.log("NAME", filterByName.length)
            if (filterByName.length > 0) res.json(filterByName)
            else res.send([{error: "No se encontraron coincidencias"}])
        }
        else res.json(infoInDb)
    }
    catch (error) {
        res.send(error)
    }
})


server.get("/:id", async function(req, res){
    const id = req.params.id
    const infoInDb = await getinfoDb()

    try {
        if(id){
            const filterById = infoInDb.filter(index => index.id === id)
            if(filterById.length > 0) res.status(200).send(filterById)
            else res.send([{error:"No se encontro el codigo de pais"}])
        }
        else res.json(infoInDb)
    } 
    catch (error) {
        res.send(error)
    }
})


server.get("countries/", (req, res) => {
    res.send("hola")
})




module.exports = server