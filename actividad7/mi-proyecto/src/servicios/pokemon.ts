import axios from 'axios';

type PokemonItem = { name: string; url: string; };
type PokemonListResponse = { results: PokemonItem[] };

//Función que acepta limit y offset para la carga
export async function fetchPokemonList(limit: number = 30, offset: number = 0): Promise<PokemonItem[]> {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const response = await axios.get<PokemonListResponse>(url);
    return response.data.results;
}