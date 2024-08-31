# Pokémon Card API

A RESTful API for managing Pokemon cards, including battle simulations.

## Getting Started

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nachodz4/api_pokemon.git
   ```

2. **Navigate into the project directory:**
   ```bash
   cd pokemon-card-api
   ```
3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up the environment variables:**

   Create a .env file in the root of your project and add the following:

   ```bash
   PORT=3000
   DATABASE_URL=postgresql://<username>:<password>@<url>:<port>/<your_database>
   ```

5. **Run the application:**
   ```bash
   npm start
   ```

## API endpoints

### Pokemon Card Management

**Get All Pokemon Cards**

- URL: `/api/cards`

- Method: `GET`
- Description: Retrieves a list of all Pokemon cards.
- Response: `200 OK` with a list of Pokémon cards.

**Get a Specific Pokemon Card**

- URL: `/api/cards/{id}`

- Method: `GET`
- Description: Retrieves details of a specific Pokémon card by its ID.
- Response: `200 OK` with the card details.

**Create a New Pokémon Card**

- URL: `/api/cards`

- Method: `POST`

- Description: Creates a new Pokemon card.

- Request Body:

  ```json
  {
    "name": "Scizor",
    "type": "Ground",
    "hp": 120,
    "attack": 60,
    "weakness": "Fire",
    "weakness_value": 2,
    "resistance": "Normal",
    "resistance_value": 0,
    "rarity": "Common",
    "rarity_value": "130/160",
    "expansion": "Exoskeleton, this pokemon takes 30 less damage from attack"
  }
  ```

  **Update an Existing Pokémon Card**

- URL: `/api/cards/{id}`

- Method: `PUT`
- Description: Updates an existing Pokémon card by its ID.
- Request Body: Same as "Create a New Pokemon Card"
- Response: `200 OK` with the updated card details.

**Delete a Pokémon Card**

- URL: `/api/cards/{id}`
- Method: `DELETE`

- Description: Deletes a specific Pokémon card by its ID.
- Response: `200 OK` if the card was successfully deleted.

**Battle Simulation**

Simulate a Battle Between Two Pokemon

- URL: `/api/battle`

- Method: `POST`

- Description: Simulates a battle between two Pokémon cards.

- Request Body:

  ```json
  {
    "card1Id": 1,
    "card2Id": 2
  }
  ```

- Response: `200 OK` with the result of the battle.

**Weaknesses and Resistances**

- URL: `/api/cards/{id}/weaknesses-resistances`

- Method: `GET`

- Description: Get weaknesses and resistances of specific pokemon.

- Response: `200 OK` with this result:
  ```json
  {
    "weaknesses": [
      {
        "id": 4,
        "name": "Blastoise",
        "type": "Water",
        "hp": 100,
        "attack": 80,
        "weakness": "Electric",
        "resistance": "Fire",
        "rarity": "Rare",
        "rarity_value": "130/156",
        "weakness_value": 30,
        "resistance_value": 20,
        "expansion": "Base Set"
      }
    ],
    "resistances": [
      {
        "id": 5,
        "name": "Venusaur",
        "type": "Grass",
        "hp": 100,
        "attack": 80,
        "weakness": "Fire",
        "resistance": "Water",
        "rarity": "Rare",
        "rarity_value": "130/156",
        "weakness_value": 30,
        "resistance_value": 20,
        "expansion": "Base Set"
      }
    ]
  }
  ```
