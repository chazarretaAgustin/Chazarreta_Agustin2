"use client"; // Esta página debe ser Client Component para usar hooks
import { useFavorites, useAddFavorite, useRemoveFavorite } from "@/app/hooks/useFavorites";
import PokemonListItem from "@/componentes/PokemonListItem";
import LoadingSkeleton from "@/componentes/LoadingSkeleton";
import Link from "next/link";

/**
 * Página para mostrar solo los pokemons favoritos.
 */
export default function FavoritesPage() {
    // Obtiene la lista de favoritos
    const { data: favoritesData, isLoading, isError } = useFavorites();
    
    // Obtiene las mutaciones (para pasarlas al item y permitir eliminarlos desde aca)
    const addFavoriteMutation = useAddFavorite();
    const removeFavoriteMutation = useRemoveFavorite();

    // Crear el Set de favoritos (aca siempre seran "true")
    const favoriteNames = new Set(favoritesData?.map(f => f.name));

    if (isError) {
        return <p style={{ color: 'red' }}>Error al cargar los favoritos.</p>;
    }

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Mis Pokémons Favoritos</h1>

            {/* Estado de Carga */}
            {isLoading && (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                    {[...Array(3)].map((_, i) => <LoadingSkeleton key={i} />)}
                </div>
            )}

            {/* Estado Vacío */}
            {!isLoading && favoritesData?.length === 0 && (
                <p>No tienes ningún pokémon favorito todavía. 
                    <Link href="/" style={{ color: 'blue', marginLeft: '5px' }}>
                        Añade algunos
                    </Link>.
                </p>
            )}

            {/* Lista de Favoritos */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                {favoritesData?.map((pokemon) => (
                    <PokemonListItem
                        key={pokemon.name}
                        name={pokemon.name}
                        isFavorite={favoriteNames.has(pokemon.name)}  // Siempre va a ser true en esta página
                        addFavoriteMutation={addFavoriteMutation}
                        removeFavoriteMutation={removeFavoriteMutation}
                    />
                ))}
            </div>
        </div>
    );
}