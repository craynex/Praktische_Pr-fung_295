// Autor: Cristian Martin
// Das Programm macht mehrere Endpunkte auf einem Lokalem Host
// 20.12.2023


// Alles Installieren
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken') 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json'); 


const app = express();
const port = 3000; // Port kann hier geändert werden

app.use(bodyParser.json());

// Task Liste
let tasks = [
{     
      id: 1, 
      AusgeführterTask: 'Kaffemaschine Einschalten',
      Ort: 'Küche'
},
{     
      id: 2,
      AusgeführterTask: 'TV einschalten',
      Ort: 'Wohnzimmer'
},
];


// Authentifizierungsschlüssel
const Key = 'Halloballo123'

// Generiert mit ChatGPT von hier
// Speichere die ungültigen Tokens (eine Art Blacklist)
const invalidTokens = new Set();

// Middleware für Authentifizierung
const authenticate = (req, res, next) => {
  if (req.path === '/login') {
    // Für /login-Endpunkt keine Authentifizierung erforderlich
    next();
  } else {
    const token = req.headers.authorization;

    if (token) {
      const tokenValue = token.split(' ')[1];
      
      // Überprüfe, ob das Token auf der Blacklist ist
      if (invalidTokens.has(tokenValue)) {
        res.status(401).json({ error: 'Invalid token' });
      } else {
        jwt.verify(tokenValue, Key, (err, decoded) => {
          if (err) {
            res.status(401).json({ error: 'Invalid token' });
          } else {
            req.user = decoded.user;
            next();
          }
        });
      }
    } else {
      res.status(403).json({ error: 'Token not provided' });
    }
  }
};

// Route für den DELETE /logout-Endpunkt
app.delete('/logout', authenticate, (req, res) => {
  // Markiere das Token als ungültig, um es zu blockieren
  const tokenValue = req.headers.authorization.split(' ')[1];
  invalidTokens.add(tokenValue);

  res.status(204).json({message: 'Logout successful'}); // Erfolgreicher Logout mit Statuscode 204
});

// Generiert mit ChatGPT bis hier

// Endpunkt GET /tasks um alle Tasks anzusehen
app.get('/tasks', authenticate, (req, res) => {
      res.status(200).json(tasks);
})

// Endpunkt POST /tasks um einen Task zu erstellen
app.post('/tasks', authenticate, (req, res) => {
      // Korrigiert mit ChatGPT von hier
      const newtask = req.body;
      tasks.push(newtask);
      res.status(201).json(newtask);
      // Korrigiert mit ChatGPT bis hier
});

// Endpunkt GET /tasks/(1) um einen Tasks anzusehen
app.get('/tasks/:id', authenticate, (req, res) => {
      const taskId = parseInt(req.params.id);
      const task = tasks.find(t => t.id === taskId);

      if(task) {
            res.status(200).json(task);
      } else {
            res.status(404).json({error: '404 Not found'});
      }
});

// Endpunkt PUT /tasks/(1) um einen Task zu bearbeiten
app.put('/tasks/:id', authenticate, (req, res) => {
      const taskId = parseInt(req.params.id);
      const updatedtask = req.body;
      const index = tasks.findIndex(t => t.id === taskId);

      if(index !== -1) {
            tasks[index] = updatedtask;
            res.status(200).json({message: 'File has been edited'})
      } else {
            res.status(404).json({error: '404 Not found'})
      }
});

// Endpunkt DELETE /tasks(1) um alle Tasks anzusehen
app.delete('/tasks/:id', authenticate, (req, res) => {
      const taskId = parseInt(req.params.id);
      const index = tasks.findIndex(t => t.id === taskId)
      // Korrigiert mit ChatGPT von hier
      if (index !== -1) {
            const deletedtask = tasks.splice(index, 1)[0];
            res.status(200).json({ message: 'task deleted successfully' });
          } else {
            res.status(404).json({ error: 'task not found' });
          }
        });
      // Korrigiert mit ChatGPT bis hier

// Endpunkt POST /Login zum einloggen
app.post('/login', (req, res) => {
      const{email, password} = req.body;

      if(email === 'cristian.martin@zli.com' && password === 'Halloballo123') {
      const token = jwt.sign({user: email}, Key);
      res.status(200).json({token});
      } else {
            res.status(401).json({error: 'Invalid User or Password'}) // Google gefragt welcher Statuscode richtig ist
      }
});

app.use('/swagger-ui/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Generiert mit ChatGPT von hier
app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
});
// Generiert mit ChatGPT bis hier
