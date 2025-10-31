import axios from 'axios';

type PokemonItem = { name: string; url: string; }; // Tipo de dato para un pokemon individual
type PokemonListResponse = { results: PokemonItem[] }; // Tipo de dato para la respuesta completa de la api

//Función que acepta limit y offset para armar la url
export async function fetchPokemonList(limit: number = 30, offset: number = 0): Promise<PokemonItem[]> {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const response = await axios.get<PokemonListResponse>(url);
    return response.data.results;
}