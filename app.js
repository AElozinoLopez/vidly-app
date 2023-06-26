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
    res.send(genres)
})

// To get a single genre
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id) );

    if (!genre)  res.status(404).send('The genre with the given ID does not exist');
    // return;
    res.send(genre);
})

app.post('/api/genres', (req, res) => {
    // validation logic
    if(!req.body.title || req.body.title.length < 3) {
        res.status(400).send('Genre is required');
        // return;
    }

    // Post logic
    const genre = {
        id: genres.length + 1,
        title: req.body.title
    };
    genres.push(genre);
    res.send(genre);
})

// Updating the genres

app.put('/api/genres/:id', (req, res) => {
    // Validate
    if (!req.body.title || req.body.title.length) {
        res.status(400).send("The genre with the given ID does not exist")
    }

    // Updating the record
    const genre = genres.find(g => g.id === parseInt(req.body.params));
    if (!genre) res.status(400).send('Input a valid course');
    genre.push(genre)
})


app.listen(port, console.log(`Vidly app is listening on port ${port}`));