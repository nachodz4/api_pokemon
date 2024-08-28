export interface PokemonCard {
    id: string;
    name: string;
    type: string;
    hp: number;
    attack: number;
    weaknessType: string;
    weaknessValue: number;
    resistanceType: string;
    resistanceValue: number;
}