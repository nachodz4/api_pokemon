CREATE TABLE pokemon_cards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    hp INTEGER NOT NULL,
    attack INTEGER NOT NULL,
    weakness VARCHAR(50) NOT NULL,
    resistance VARCHAR(50) NOT NULL,
    weakness_value INTEGER,
    resistance_value INTEGER
);