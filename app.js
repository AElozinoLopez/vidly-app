const express = require('express');
const Joi = require("joi");
require('dotenv').config();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get('env');  // Not sure what this line exactly does for now

const port = process.env.PORT || 5000;
process.env.NODE_ENV = app.get('env') // To be explored further

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
    // Looking up the course
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) res.status(400).send('The genre with the given ID was not found');
    res.send(genre)

    // Validate the input
    if (!req.body.title || req.body.title.length < 8) {
        res.status(400).send('Genre is required')
    }

    // Updating teh course
    genre.title = req.body.title;
    res.send(genre);
    
})

app.delete('/api/genres/:id', (req, res) => {
    // Look up the genre
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) res.status(400).send('The course with the given ID was not found');
    res.send(genre);
    // Deleting a genre
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
})

// // Validation Using Joi
// const schema = {
//     name: Joi.string().min(8).required()
// }

// const result = Joi.validate(req.body.schema);

// if (result.error) {
//     res.status(400).send(result.error.details[0].message);
//     return;
// }


// // Still on validating using joi -  this time, placing the validation logic in a function
// function validateGenre(genre) {
//     const schema = {
//         name: Joi.string().min(8).required()
//     };
//     return Joi.validate(genre, schema);
// }
// // Re-writing the validation logic
// const {error} = validateGenre(req.body);
// if (error) {
//     res.status(400).send(error.details[0].message);
//     return;
// }


app.listen(port, console.log(`Vidly app is listening on port ${port}`));