const express = require('express');

const app = express();

// middleware
app.use(express.json());
app.use(express.urlEncoded({Extended: true}));
