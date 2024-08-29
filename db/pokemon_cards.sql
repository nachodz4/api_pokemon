CREATE TABLE IF NOT EXISTS pokemon_cards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    hp INTEGER NOT NULL,
    attack INTEGER NOT NULL,
    weakness VARCHAR(50) NOT NULL,
    resistance VARCHAR(50) NOT NULL,
    rarity VARCHAR(50) NOT NULL,
    rarity_value VARCHAR(50) NOT NULL,
    weakness_value INTEGER,
    resistance_value INTEGER,
    expansion VARCHAR(255) NOT NULL
);

INSERT INTO pokemon_cards (name, type, hp, attack, weakness, resistance, rarity, rarity_value, weakness_value, resistance_value, expansion)
VALUES
('Pikachu', 'Electric', 60, 50, 'Ground', 'Steel', 'Common', '130/156', 20, 20, 'Base Set'),
('Charizard', 'Fire', 120, 90, 'Water', 'Grass', 'Rare', '130/156', 30, 30, 'Base Set'),
('Blastoise', 'Water', 100, 80, 'Electric', 'Fire', 'Rare', '130/156', 30, 20, 'Base Set'),
('Venusaur', 'Grass', 100, 80, 'Fire', 'Water', 'Rare', '130/156', 30, 20, 'Base Set'),
('Mewtwo', 'Psychic', 130, 100, 'Dark', 'Fighting', 'Uncommon', '130/156', 40, 20, 'Base Set'),
('Jigglypuff', 'Fairy', 60, 40, 'Steel', 'Dark', 'Common', '130/156', 20, 10, 'Jungle'),
('Gengar', 'Ghost', 90, 70, 'Psychic', 'Normal', 'Rare', '130/156', 30, 20, 'Fossil'),
('Machamp', 'Fighting', 90, 80, 'Psychic', 'Rock', 'Rare', '130/156', 40, 20, 'Base Set');