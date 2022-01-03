const { Country, Activity } = require("../db")
const express = require("express")

const server = express()

server.post("/", async (req, res) => {
    const { name, dificult, duration, season, countryID } = req.body
    console.log("NAMEBODY", name)
    console.log("CODE", countryID)

    try {
        let activity;
        activity = await Activity.findOne({ where: { name: name }, })
        const countries = await Country.findAll({ where: { id: countryID } })
        console.log("ACTIVITYYYY", activity)
        console.log("GET", countries)
        if (!activity) {
            activity = await Activity.create({
                name: name,
                dificult: dificult,
                duration: duration,
                season: season
            })
        }

        for (const country of countries) {
            country.addActivity(activity)
        }

        // const union = await activity.addCountries(countryID)
        // res.send(union)
        res.send(activity)
    }
    catch (error) {
        res.send(error)
    }
})


// server.post("/", (req, res) => {
//     const { name, dificult, duration, season, countryID } = req.body
//     console.log("NAMEBODY", name)
//     console.log("CODE", countryID)

//     const finOneActivity = Activity.findOne({ where: { name: name }, })
//     const getAllCountries = Country.findAll({ where: { id: countryID } })

//     Promise.all([finOneActivity, getAllCountries]).then(response => {
//         const activity = response[0];
//         const countries = response[1];

//         if (!activity) {
//             Activity.create({
//                 name: name,
//                 dificult: dificult,
//                 duration: duration,
//                 season: season
//             }).then((response) => {
//                 for (const country of countries) {
//                     country.addActivity(response)
//                 }

//                 res.send(response)
//             }).catch(err => console.log(err))
//         }

//         for (const country of countries) {
//             country.addActivity(activity)
//         }

//         res.send(activity)
//     })
// })




server.get("/", async (req, res) => {

    const name = req.query.name
    const activities = await Activity.findAll()

    if (name) {
        const nameActivity = activities.filter(index => index.name.toLowerCase.includes(name.toLowerCase()))
        res.json(nameActivity)
    }
    console.log("ACTIVITY", activities)
    res.json(activities)

})

// const handleResponse = (req, res, response) => {
//     const name = req.query.name
//     const activity = response.filter(index => index.name === name)
//     res.json(activity)
// }

// server.get("/", (req, res) => {
//     Activity.findAll().then((response) => {
//         const name = req.query.name
//     const activity = response.filter(index => index.name === name)
//     res.json(activity)
//     })
// })


module.exports = server