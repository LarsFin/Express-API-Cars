# Care Web Dev Test

An API developed using express JS. For details on the requirements of the application,
please look here; https://github.com/ecsdigital/cars-web-dev-test.

## Testing

I'll be using Jest for TDD, as a stretch goal for testing, I might take a look
at doing some API tests over the wire.


## UI

Don't plan on it too heavily, but if I have time; I'll create HTML pages to
interact with the api.


## Data Storage

Will currently persist storage through life time of application via a collection.
Afterwards will look into persistent storage with database.


## User Stories

Follows the CRUD model pattern with create/read/update and delete.

Can retrieve all of my cars [✓]
```
As a car collector,
So, that I can marvel at my collection,
I would like to to read a list of all of my cars
```

Can add a car [✓]
```
As a car collector,
So, that I can note a new car down,
I would like to be able to add a car to my collection
```

Can retrieve a car [✓]
```
As a car collector,
So, that I can inspect one of my cars,
I would like to read the data of a specific car
```

Can delete a car [✓]
```
As a car collector,
So, that I can maintain an orderly collection,
I would like to remove a specific car from my collection
```

Can update a car [✓]
```
As a car collector,
So, that I can keep my car data up to date,
I would like to be able to update data on a specific car
```
