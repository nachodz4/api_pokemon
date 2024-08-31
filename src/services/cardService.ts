import { QueryResult } from "pg";
import { PokemonCard } from "../models/card";
import pool from "../db";

class PokemonService {
  async getAllCards(): Promise<PokemonCard[]> {
    const result: QueryResult = await pool.query("SELECT * FROM pokemon_cards");
    return result.rows;
  }

  async getCardById(id: number): Promise<PokemonCard | null> {
    const result: QueryResult = await pool.query(
      "SELECT * FROM pokemon_cards WHERE id = $1",
      [id]
    );
    return result.rows[0] || null;
  }

  async getCardByType(type: string): Promise<PokemonCard[] | null> {
    const result: QueryResult = await pool.query(
      "SELECT * FROM pokemon_cards WHERE type = $1",
      [type]
    );
    return result.rows || null;
  }

  async createCard(card: PokemonCard): Promise<PokemonCard> {
    const result: QueryResult = await pool.query(
      `INSERT INTO pokemon_cards (name, type, hp, attack, weakness, resistance, rarity, rarity_value, weakness_value, resistance_value, expansion)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [
        card.name,
        card.type,
        card.hp,
        card.attack,
        card.weakness,
        card.resistance,
        card.rarity,
        card.rarity_value,
        card.weakness_value,
        card.resistance_value,
        card.expansion,
      ]
    );
    return result.rows[0];
  }

  async updateCard(
    id: number,
    card: Partial<PokemonCard>
  ): Promise<PokemonCard | null> {
    const result: QueryResult = await pool.query(
      `UPDATE pokemon_cards SET name = $1, type = $2, hp = $3, attack = $4, weakness = $5, resistance = $6
                  ,weakness_value = $7, resistance_value = $8, rarity = $9, rarity_value = $10, expansion = $11
               WHERE id = $12 RETURNING *`,
      [
        card.name,
        card.type,
        card.hp,
        card.attack,
        card.weakness,
        card.resistance,
        card.weakness_value,
        card.resistance_value,
        card.rarity,
        card.rarity_value,
        card.expansion,
        id,
      ]
    );
    return result.rows[0] || null;
  }

  async deteleCard(id: number): Promise<boolean> {
    const result: QueryResult = await pool.query(
      "DELETE FROM pokemon_cards WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows.length > 0;
  }
}

export default new PokemonService();
