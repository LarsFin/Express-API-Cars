const CarService = require('./lib/services/car-service.js');
const InMemDB = require('./lib/repositories/in-memory-storage.js');
const MessageFactory = require('./lib/helpers/message-factory.js');
const CarModel = require('./lib/models/car.js');
const express = require('express');
const bodyParser = require('body-parser');

const app = express(),
      port = 3000;

app.use(bodyParser.json());

// Helpers
const messageFactory = new MessageFactory();

// Repository
const dbContext = new InMemDB(CarModel);

// Services
const carService = new CarService(dbContext, messageFactory);

// Routes
app.get('/cars/', (req, res) => {
  let data = carService.getCars();
  res.status(data.code);
  res.send(data.body);
});

app.post('/cars/', (req, res) => {
  let data = carService.addCar(req.body);
  res.send();
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
