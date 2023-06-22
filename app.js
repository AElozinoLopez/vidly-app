const express = require('express');
const Joi = require("joi");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
