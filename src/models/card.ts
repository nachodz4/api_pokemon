export interface PokemonCard {
  id?: string;
  name: string;
  type: string;
  hp: number;
  attack: number;
  weakness: string;
  resistance: string;
  rarity: string;
  rarity_value: string;
  weakness_value?: number;
  resistance_value?: number;
  expansion: string;
}
