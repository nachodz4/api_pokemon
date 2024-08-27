import { PokemonCard } from '../models/card';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

let cards: PokemonCard[] = [];

// Create a new card
export const createCard = (req: Request, res: Response) => {
    const newCard: PokemonCard = {
        id: uuidv4(),
        ...req.body
    };
    cards.push(newCard);
    res.status(201).json(newCard);
};

// Update an existing card
export const updateCard = (req: Request, res: Response) => {
    const { id } = req.params;
    const cardIndex = cards.findIndex(card => card.id === id);
    if (cardIndex === -1) {
        return res.status(404).json({ message: 'Card not found' });
    }
    cards[cardIndex] = { ...cards[cardIndex], ...req.body };
    res.json(cards[cardIndex]);
};

// Retrieve a specific card
export const getCard = (req: Request, res: Response) => {
    const { id } = req.params;
    const card = cards.find(card => card.id === id);
    if (!card) {
        return res.status(404).json({ message: 'Card not found' });
    }
    res.json(card);
};

// Retrieve all cards
export const getAllCards = (_: Request, res: Response) => {
    //TODO: Get cards from DB PostgreSQL
    res.json(cards);
};

// Delete a card
export const deleteCard = (req: Request, res: Response) => {
    const { id } = req.params;
    cards = cards.filter(card => card.id !== id);
    res.status(204).send();
};

// Card Battle Simulation
// 
export const battleCards = (req: Request, res: Response) => {
    const { card1Id, card2Id } = req.body;
    const card1 = cards.find(card => card.id === card1Id);
    const card2 = cards.find(card => card.id === card2Id);

    if (!card1 || !card2) {
        return res.status(404).json({ message: 'One or both cards not found' });
    }

    let card1Damage = card1.attack;
    let card2Damage = card2.attack;

    if (card1.type === card2.weakness) {
        card1Damage *= 2;
    }
    if (card2.type === card1.weakness) {
        card2Damage *= 2;
    }
    if (card1.type === card2.resistance) {
        card1Damage -= 20;
    }
    if (card2.type === card1.resistance) {
        card2Damage -= 20;
    }

    const result = card1Damage > card2Damage ? `${card1.name} wins!` : `${card2.name} wins!`;
    res.json({ result, card1Damage, card2Damage });
};

// Identify Card Weaknesses and Resistances
export const identifyWeaknessesAndResistances = (req: Request, res: Response) => {
    const { id } = req.params;
    const card = cards.find(card => card.id === id);
    if (!card) {
        return res.status(404).json({ message: 'Card not found' });
    }
    const weaknesses = cards.filter(c => c.type === card.weakness);
    const resistances = cards.filter(c => c.type === card.resistance);
    res.json({ weaknesses, resistances });
};
