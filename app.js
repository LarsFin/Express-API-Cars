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
  const data = carService.getCars();
  res.status(data.code);
  res.send(data.body);
});

app.get('/cars/:carId', (req, res) => {
  const data = carService.getCar(req.params.carId);
  res.status(data.code);
  res.send(data.body);
});

app.post('/cars/', (req, res) => {
  const data = carService.addCar(req.body);
  res.status(data.code);
  res.send(data.body);
});

app.delete('/cars/:carId', (req, res) => {
  const data = carService.deleteCar(req.params.carId);
  res.status(data.code);
  res.send(data.body);
});

app.put('/cars/:carId', (req, res) => {
  const data = carService.updateCar(req.params.carId, req.body);
  res.status(data.code);
  res.send(data.body);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
