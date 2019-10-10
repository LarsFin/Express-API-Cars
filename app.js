const CarService = require('./lib/services/car-service.js');
const InMemDB = require('./lib/repositories/in-memory-storage.js');
const MessageFactory = require('./lib/helpers/message-factory.js');
const express = require('express');

const app = express(),
      port = 3000;

// Helpers
const messageFactory = new MessageFactory();

// Repository
const dbContext = new InMemDB();

// Services
const carService = new CarService(dbContext, messageFactory);

// Routes
app.get('/cars/', (req, res) => {
  let data = carService.getCars();
  res.status(data.code);
  res.send(data.body);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
