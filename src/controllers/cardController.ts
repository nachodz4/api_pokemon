import { Request, Response } from "express";
import PokemonService from "../services/cardService";

// Create a new card
export const createCard = async (req: Request, res: Response) => {
  try {
    const newCard = await PokemonService.createCard(req.body);

    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: "Error creating card", error });
  }
};

// Update an existing card
export const updateCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await PokemonService.updateCard(parseInt(id, 10), req.body);
    if (!result) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error updating card", error });
  }
};

// Retrieve a specific card
export const getCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await PokemonService.getCardById(parseInt(id, 10));
    if (!result) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving card", error });
  }
};

// Retrieve all cards
export const getAllCards = async (_: Request, res: Response) => {
  try {
    const result = await PokemonService.getAllCards();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cards", error });
  }
};

// Delete a card
export const deleteCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await PokemonService.deteleCard(parseInt(id, 10));
    if (!result) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting card", error });
  }
};

// Card Battle Simulation
export const battleCards = async (req: Request, res: Response) => {
  const { card1Id, card2Id } = req.body;
  try {
    const card1Result = await PokemonService.getCardById(card1Id);
    const card2Result = await PokemonService.getCardById(card2Id);

    if (card1Result && card2Result) {
      const card1 = card1Result;
      const card2 = card2Result;

      let card1Damage = card1.attack;
      let card2Damage = card2.attack;

      if (card1.type === card2.weakness) {
        card1Damage *= card2.weakness_value || 1;
      }
      if (card2.type === card1.weakness) {
        card2Damage *= card1.weakness_value || 1;
      }
      if (card1.type === card2.resistance) {
        card1Damage -= card2.resistance_value || 0;
      }
      if (card2.type === card1.resistance) {
        card2Damage -= card1.resistance_value || 1;
      }

      const result =
        card1Damage > card2Damage
          ? `${card1.name} wins!`
          : `${card2.name} wins!`;
      return res.json({ result, card1Damage, card2Damage });
    }

    return res.status(404).json({ message: "One or both cards not found" });
  } catch (error) {
    res.status(500).json({ message: "Error during battle simulation", error });
  }
};

// Identify Card Weaknesses and Resistances
export const identifyWeaknessesAndResistances = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const cardResult = await PokemonService.getCardById(parseInt(id, 10));
    if (!cardResult) {
      return res.status(404).json({ message: "Card not found" });
    }

    const card = cardResult;
    const weaknesses = await PokemonService.getCardByType(card.weakness);
    const resistances = await PokemonService.getCardByType(card.resistance);

    res.json({ weaknesses: weaknesses, resistances: resistances });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error identifying weaknesses and resistances", error });
  }
};
