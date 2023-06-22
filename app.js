const express = require('express');
const Joi = require("joi");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 5000

const genres = [
    {id: 1, title: "The Comeback", genre: "Epic"},
    {id: 2, title: "Stutern Summer", genre: "Romance"},
    {id: 3, title: "Come To The Rescue", genre: "Action"},
    {id: 4, title: "The Last Kiss", genre: "Romance"},
    {id: 5, title: "The Twin Warriors", genre: "Action"},
    {id: 6, title: "Coming To America", genre: "Epic"},
    {id: 7, title: "Blessing In My Hood", genre: "Horror"}
]
// Root route
app.get('/', (req, res) => {
    res.send('Welcome to Vidly Movie Rentals App')
})

// All genres route
app.get('/api/genres', (req, res) => {
    res.status(200).send('Movies available on Vidly:');
})


app.listen(port, console.log(`Vidly app is listening on port ${port}`));