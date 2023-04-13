# Playground

Welcome to Playground, a fun and interactive project built with TypeScript, Go, and SQLite. This project contains three microservices: `users`, `appointments`, and `results`, each with its own REST API.

## Getting Started

To get started with Playground, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies for each microservice by running `npm install` in the `users`, `appointments`, and `results` directories.
3. Run each microservice by running `npm start` in the `users`, `appointments`, and `results` directories.
4. Access each microservice's API by making requests to `http://localhost:3000`, `http://localhost:3001`, and `http://localhost:3002`, respectively.

## API Endpoints

The following endpoints are available for each microservice:

### Users Microservice

- `GET /users`: Retrieve a list of all users.
- `GET /users/:id`: Retrieve a specific user by ID.
- `POST /users`: Create a new user.
- `PUT /users/:id`: Update an existing user by ID.
- `DELETE /users/:id`: Delete an existing user by ID.
- `GET /users/:id/appointments`: Retrieve a list of all appointments for a specific user.
- `GET /users/:id/results`: Retrieve a list of all results for a specific user.

### Appointments Microservice

- `GET /appointments`: Retrieve a list of all appointments.
- `GET /appointments/:id`: Retrieve a specific appointment by ID.
- `POST /appointments`: Create a new appointment.
- `PUT /appointments/:id`: Update an existing appointment by ID.
- `DELETE /appointments/:id`: Delete an existing appointment by ID.
- `GET /appointments/:id/results`: Retrieve a list of all results for a specific appointment.

### Results Microservice

- `GET /users/:id/results`: Retrieve a list of all results for a specific user.
- `GET /appointments/:id/results`: Retrieve a list of all results for a specific appointment.
- `GET /results/:id`: Retrieve a specific result by ID.
- `POST /users/:id/results`: Create a new result for a specific user.
- `POST /appointments/:id/results`: Create a new result for a specific appointment.
- `PUT /results/:id`: Update an existing result by ID.
- `DELETE /results/:id`: Delete an existing result by ID.

## Seed Data

To seed the database with sample data, run the `npm run seed` command in each microservice directory. This will populate each microservice's database with some sample users, appointments, and results.

## Testing

To run the tests for each microservice, run the `npm test` command in the `users`, `appointments`, and `results` directories, respectively. The tests cover basic functionality for each microservice, including creating, retrieving, updating, and deleting data.

## Conclusion

That's it for Playground! We hope you have fun exploring and experimenting with this project. If you have any questions or feedback, please don't hesitate to reach out. Happy coding!
