const {knex} = require("./knex.js")

// create database

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

randomDate(new Date(2012, 0, 1), new Date())
record = {
    name: Math.random().toString(26).slice(0,10),
    dob: randomDate(new Date(1990, 0, 1), new Date()),
    salary: parseInt(Math.random()*100000),
    skills: [Math.round(Math.random()*10), Math.round(Math.random()*10)].join(',')
}
console.log(record)
knex("employee").insert(record).then(records => {
    console.log(records)
})