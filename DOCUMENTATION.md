Pokemon Card API Documentation

1. Assumptions

   1.1. Pokemon Card Model
   Each Pokemon card is assumed to have the following attributes:
   id, name, type, hp, attack, weakness, resistance, rarity, rarity_value, weakness_value, resistance_value, and expansion.

   Type defines the elemental nature of the Pokémon card; examples are Water, Fire, Electric, etc.
   The weakness and resistance attributes define how a Pokemon card interacts with other types during a battle simulation.

   Rarity and rarity_value describe the scarcity and value of a Pokemon card.

   Assume the database schema is predefined and already created in PostgreSQL.

   1.2. Battle Simulation

   A battle between two Pokémon cards is determined by type, attack, weakness, weakness_value, resistance and resistance_value.

   In estimating damages of battles, the above attributes will be used.
   Assume a simple model where each card wins or loses based on one attack

   1.3. Environment Setup

   The environment variables (.env file) is utilized to configure some settings. For example, PORT and DATABASE_URL are environment variables used in this application.

   1.4. Testing

   Unit testing were be done using Jest and Supertest.
   Basic API functionalities are tested but not exhaustive edge cases and/or integrations tests with third-party services.

2. Implemented Solution

   2.1. RESTful API

   Framework: The API has built using Node.js with Express; the codebase will be complemented with TypeScript to afford better typing and more maintainability.

   Database: The relational database management system used will be PostgreSQL. The interactions with the database was done pg library.

   Routing: Express routes responsible for dealing with Pokemon cards for all CRUD operations - from creation to deletion - and emulating the battle.

   2.2. Pokémon Service Layer

   Separation of concerns: There will be a service layer, pokemonService.ts, responsible for all operations concerning the DB.
   This service layer will keep the handlers clean, only containing the logic to do with HTTP requests and responses.

   2.3. Testing

   Unit Tests: Basic unit tests are done using Jest and Supertest to check if the API endpoints work as expected.
   Test Coverage: TODO.

3. Improvements

   3.1. Enhanced Battle Simulation

   Damage Calculation: Add more advanced damage calculation formulae considering other attributes such as speed, defense, and status effects.

   Multiple Rounds: Battle across rounds rather than single attacks for a more realistic typical Pokemon battle simulation.

   3.3. Validation and Error Handling

   Input Validation: Improve validation of incoming requests using libraries like Joi or express-validator to ensure better data integrity.

   Error Handling: Add error-handling middleware to standardize all error responses for an even better developer experience.

   3.4. Authentication and Authorization

   User Authentication: Provide protection to API endpoints using the JWT authentication mechanism.

   3.5. Performance Optimization Caching:

   Provide caching mechanisms for frequently accessed REST points to reduce the load on the database. Database Indexing: Review and adjust database indexing for optimal query performance.

   3.6. Deployment and CI/CD

   CI/CD: Set up a CI/CD pipeline using one of the previously mentioned tools, such as GitHub Actions, Jenkins, or CircleCI, in order to continuously test and deploy.

   Containerization: Consider containerizing the application using Docker for easy deployment and to ensure consistency across different environments.

   3.8. Advanced Documentation

   Versioning: Allow API versioning, controlling changes and updates of the API in such a way that existing clients do not break.
