require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// Connects to MongoDO, storing databse URL in .env file
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const database = mongoose.connection

// Check for problem while connecting to database
database.on('error', (error) => console.error(error))

// Opened once, prints log when connected
database.once('open', () => console.log('Connected to MongoDB'))

// Accepts JSON body
app.use(express.json())

// Route for server
const factsRouter = require('./routes/facts')
app.use('/facts', factsRouter)

// Connects to port
app.listen(3000, () => console.log('Connect to Server'))