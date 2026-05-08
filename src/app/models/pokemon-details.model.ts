
interface IPokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
interface IPokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
interface IPokemonAbility {
  ability: {
    name: string;
    url: string;
  };
}

export interface IPokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: IPokemonAbility[];
  types: IPokemonType[];
  stats: IPokemonStat[];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}