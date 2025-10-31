"use client";
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList } from '@/servicios/pokemon'; // Servicio de la lista principal
import PokemonListItem from './PokemonListItem';
import LoadingSkeleton from './LoadingSkeleton';
import { useFavorites, useAddFavorite, useRemoveFavorite } from '@/app/hooks/useFavorites'; // Importa los hooks de favoritos

const INITIAL_LIMIT = 30;

export default function PokemonList() {
    const [currentLimit, setCurrentLimit] = useState(INITIAL_LIMIT);

    // Hook para la lista de Pokemon 
    const { 
        data: pokemonListData, 
        isLoading: isListLoading, 
        isError: isListError 
    } = useQuery({
        queryKey: ['pokemonList', currentLimit],
        queryFn: () => fetchPokemonList(currentLimit, 0),
        placeholderData: (previousData) => previousData,
    });

    // Hook para obtener la lista de favoritos
    const { 
        data: favoritesData, 
        isLoading: isFavoritesLoading 
    } = useFavorites();

    // Hooks para las mutaciones
    const addFavoriteMutation = useAddFavorite();
    const removeFavoriteMutation = useRemoveFavorite();

    //  Crear un Set de favoritos para busqueda
    const favoriteNames = new Set(favoritesData?.map(f => f.name));

    // Lógica para el btn "Cargar Más" 
    const handleLoadMore = () => {
        setCurrentLimit(prevLimit => prevLimit + 30);
    };

    // Estados de la interfaz
    if (isListError) {
        return <p style={{ color: 'red' }}>Error al cargar los Pokémons.</p>;
    }

    const isLoading = isListLoading || isFavoritesLoading; // Define el estado de carga combinado (cargando si cualquiera esta cargando)
    const isLoadMoreLoading = isListLoading && !!pokemonListData; //  Estado de carga del btn "Cargar Más" (solo si la lista principal esta cargando)

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Lista de Pokémons</h1>
            
            {/* Skeleton (solo en la carga inicial) */}
            {isLoading && !pokemonListData && ( 
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                    {[...Array(5)].map((_, i) => <LoadingSkeleton key={i} />)}
                </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                {/* Usama "pokemonListData" para renderizar la lista */}
                {pokemonListData?.map((pokemon) => {
                    // Determina si este ítem es favorito usando el Set
                    const isFavorite = favoriteNames.has(pokemon.name);
                    
                    return (
                        <PokemonListItem 
                            key={pokemon.name} 
                            name={pokemon.name}                             
                            // Pasa estado y mutaciones al hijo
                            isFavorite={isFavorite}
                            addFavoriteMutation={addFavoriteMutation}
                            removeFavoriteMutation={removeFavoriteMutation}
                        />
                    );
                })}
            </div>

            {/* Btn "Cargar Más" */}
            <button 
                onClick={handleLoadMore}
                disabled={isLoadMoreLoading} // Deshabilita si esta cargando más
                style={{ 
                    marginTop: '30px', 
                    padding: '10px 20px', 
                    fontSize: '1em', 
                    background: isLoadMoreLoading ? '#ccc' : '#4CAF50', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: isLoadMoreLoading ? 'not-allowed' : 'pointer'
                }}
            >
                {isLoadMoreLoading ? 'Cargando...' : 'Cargar más Pokemons (30 adicionales)'}
            </button>
        </div>
    );
}