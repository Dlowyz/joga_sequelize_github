const express = require("express")
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))


const Sequelize = require("sequelize")
const sequelize = new Sequelize('mysql://root:1234@localhost:3306/joga_sequelize')

sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to database')
    })
    .catch(err => {
        console.log('cant connect to database: ', err)
    })


app.get('/', (req, res) => {
    res.json({message: "Welcome to sequelize!"})
})

app.listen({port}, () => {
    console.log('app is running on port '+port)
}
)