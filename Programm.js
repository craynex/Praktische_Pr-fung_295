// Autor: Cristian Martin
// Das Programm macht mehrere Endpunkte auf einem Lokalem Host
// 20.12.2023

const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken') 


const app = express();
const port = 3000;

app.use(bodyParser.json());

let tasks = [
      {id: 1, title: 'Task 1'},
      {id: 2, title: 'Task 2'},
];

const secretKey = 'Halloballo123'

app.get('/tasks', (req, res) => {
      res.status(200)
})

