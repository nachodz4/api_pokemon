// import { PokemonCard } from '../models/card';
import { Request, Response } from 'express';
import pool from '../db';


// Create a new card
export const createCard = async (req: Request, res: Response) => {
    const { name, type, hp, attack, weakness, resistance } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO pokemon_cards (name, type, hp, attack, weakness, resistance, weakness_value, resistance_value)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [name, type, hp, attack, weakness.type, resistance.type, weakness.value, resistance.value]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error creating card', error });
    }
};

// Update an existing card
export const updateCard = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, type, hp, attack, weakness, resistance } = req.body;
    try {
        const result = await pool.query(
            `UPDATE pokemon_cards SET name = $1, type = $2, hp = $3, attack = $4, weakness = $5, resistance = $6
                ,weakness_value = $7, resistance_value = $8
             WHERE id = $9 RETURNING *`,
            [name, type, hp, attack, weakness.type, resistance.type, weakness.value, resistance.value, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating card', error });
    }
};

// Retrieve a specific card
export const getCard = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM pokemon_cards WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving card', error });
    }
};

// Retrieve all cards
export const getAllCards = async (_: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM pokemon_cards');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cards', error });
    }
};

// Delete a card
export const deleteCard = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM pokemon_cards WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting card', error });
    }
};

// Card Battle Simulation
export const battleCards = async (req: Request, res: Response) => {
    const { card1Id, card2Id } = req.body;
    const queryCard = 'SELECT * FROM pokemon_cards WHERE id = $1';
    try {
        const card1Result = await pool.query(queryCard, [card1Id]);
        const card2Result = await pool.query(queryCard, [card2Id]);

        if (card1Result.rows.length === 0 || card2Result.rows.length === 0) {
            return res.status(404).json({ message: 'One or both cards not found' });
        }

        const card1 = card1Result.rows[0];
        const card2 = card2Result.rows[0];

        let card1Damage = card1.attack;
        let card2Damage = card2.attack;

        if (card1.type === card2.weakness) {
            card1Damage *= card2.weakness_value;
        }
        if (card2.type === card1.weakness) {
            card2Damage *= card1.weakness_value;
        }
        if (card1.type === card2.resistance) {
            card1Damage -= card2.resistance_value;
        }
        if (card2.type === card1.resistanceType) {
            card2Damage -= card1.resistance_value;
        }

        const result = card1Damage > card2Damage ? `${card1.name} wins!` : `${card2.name} wins!`;
        res.json({ result, card1Damage, card2Damage });
    } catch (error) {
        res.status(500).json({ message: 'Error during battle simulation', error });
    }
};

// Identify Card Weaknesses and Resistances
export const identifyWeaknessesAndResistances = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const cardResult = await pool.query('SELECT * FROM pokemon_cards WHERE id = $1', [id]);
        if (cardResult.rows.length === 0) {
            return res.status(404).json({ message: 'Card not found' });
        }

        const card = cardResult.rows[0];
        const queryType = 'SELECT * FROM pokemon_cards WHERE type = $1';
        const weaknesses = await pool.query(queryType, [card.weakness]);
        const resistances = await pool.query(queryType, [card.resistance]);

        res.json({ weaknesses: weaknesses.rows, resistances: resistances.rows });
    } catch (error) {
        res.status(500).json({ message: 'Error identifying weaknesses and resistances', error });
    }
};
