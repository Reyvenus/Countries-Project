const express = require ("express")
const { Country} = require ("../db")

const server = express()

server.get("/", async (req, res) => {
    const info = await Country.findAll()
    const continents = info.map(index => index.continents)
    let arrayContinents = []
    for (let i = 0; i < continents.length; i++) {
        if(!arrayContinents.includes(continents[i])){
            arrayContinents.push(continents[i])
            console.log("array", arrayContinents)
        }
    }
    res.json(arrayContinents)
})

module.exports = server