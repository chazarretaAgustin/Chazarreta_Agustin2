import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image'; 

// Definición de tipos para los datos del pokemon
type PokemonDetailData = {
    id: number;
    name: string;
    sprites: {
        front_default: string; // URL del sprite
    };
    types: {
        type: {
            name: string;
        }
    }[];
}

//El Server Component es asíncrono y recibe los parámetros de la ruta dinámica en las props (params)
export default async function PokemonDetailPage({ 
    params 
}: { 
    params: { name: string } 
}) {
    const pokemonName = params.name; // Extrae el nombre del pokemon de los parámetros de la URL
    let pokemon: PokemonDetailData | null = null;

    try {
        // Obtiene los datos completos del pokemon (Server-side Data Fetching)
        const response = await axios.get<PokemonDetailData>(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
        );
        pokemon = response.data;
    } catch (error) {
        console.error(`Error al obtener el detalle de ${pokemonName}:`, error);
        //Manejo de error si el pokemon no se encuentra
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2>¡Pokémon no encontrado!</h2>
                <p>Verifica si el nombre es correcto.</p>
                <Link href="/" style={{ marginTop: '20px', display: 'inline-block' }}>
                    &larr; Volver a la Lista
                </Link>
            </div>
        );
    }
    
    //Si la solicitud falla, no se debe intentar renderizar pokemon.name
    if (!pokemon) {
         return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2>Error de Carga</h2>
                <p>No se pudieron obtener los datos del Pokémon.</p>
                <Link href="/" style={{ marginTop: '20px', display: 'inline-block' }}>
                    &larr; Volver a la Lista
                </Link>
            </div>
        );
    }

    //Muestra los detalles
    return (
        <div style={{ padding: '20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Detalle de {pokemon.name.toUpperCase()}</h1>
            
            <Image 
                src={pokemon.sprites.front_default} 
                alt={pokemon.name} 
                width={200} 
                height={200} 
                priority
                style={{ 
                    border: '4px solid #cc0000', 
                    borderRadius: '50%', 
                    margin: '20px auto',
                    backgroundColor: '#f0f0f0' 
                }} 
            />
 
            <p style={{ fontSize: '1.2em' }}>
                <strong>ID Pokedex:</strong> {pokemon.id}
            </p>
            <p style={{ fontSize: '1.2em' }}>
                <strong>Tipos:</strong> {pokemon.types.map(t => t.type.name).join(', ').toUpperCase()}
            </p>
            
            <hr style={{ margin: '30px 0', width: '300px' }} />

            {/*Enlace para volver a la lista (Navegación Cliente con Link)*/}
            <Link 
                href="/" 
                style={{ 
                    padding: '10px 20px', 
                    background: '#333', 
                    color: 'white', 
                    textDecoration: 'none', 
                    borderRadius: '5px' 
                }}
            >
                &larr; Volver a la Lista Principal
            </Link>
        </div>
    );
}