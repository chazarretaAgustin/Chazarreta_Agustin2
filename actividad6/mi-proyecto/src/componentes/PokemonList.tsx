"use client";  // Mantiene como Client Component 
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList } from '@/servicios/pokemon';
import PokemonListItem from './PokemonListItem';
import LoadingSkeleton from './LoadingSkeleton'; //skeleton

//Define el límite inicial
const INITIAL_LIMIT = 30;

export default function PokemonList() {
    const [currentLimit, setCurrentLimit] = useState(INITIAL_LIMIT); //Maneja el estado del límite para el botón "Cargar Más"
    const { data, isLoading, isError } = useQuery({ //Usa useQuery con la clave de caché y la función de fetching
        queryKey: ['pokemonList', currentLimit], //La queryKey cambia si el límite cambia para invalidar el caché
        queryFn: () => fetchPokemonList(currentLimit, 0), // Usamo del currentLimit
        placeholderData: (previousData) => previousData,// Mantiene los datos anteriores mientras se hace el fetch del nuevo límite
    });

    //Lógica para el botón "Cargar Más"
    const handleLoadMore = () => {
        setCurrentLimit(prevLimit => prevLimit + 30);//Aumenta el límite en 30
    };

    //Estados de la interfaz de usuario (Carga y Error)
    if (isError) {
        return <p style={{ color: 'red' }}>Error al cargar los Pokémons. Intente de nuevo.</p>;
    }

    //Renderizado
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Lista de Pokémons</h1>
            
            {/*Mostrar Skeleton mientras carga (mientras isLoading es true)*/}
            {isLoading && !data && ( 
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                    {[...Array(5)].map((_, i) => <LoadingSkeleton key={i} />)}
                </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                {data?.map((pokemon) => (
                    <PokemonListItem 
                        key={pokemon.name} 
                        name={pokemon.name} 
                        url={pokemon.url} 
                    />
                ))}
            </div>

            {/*Componente Cargar Más*/}
            <button 
                onClick={handleLoadMore}
                disabled={isLoading} //Deshabilita mientras está cargando
                style={{ 
                    marginTop: '30px', 
                    padding: '10px 20px', 
                    fontSize: '1em', 
                    background: isLoading ? '#ccc' : '#4CAF50', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
            >
                {isLoading ? 'Cargando...' : 'Cargar Más Pokémons (30 adicionales)'}
            </button>
        </div>
    );
}