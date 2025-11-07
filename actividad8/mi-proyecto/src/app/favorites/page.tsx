"use client"; 
import { useFavorites, useAddFavorite, useRemoveFavorite } from "@/app/hooks/useFavorites";
import PokemonListItem from "@/componentes/PokemonListItem";
import LoadingSkeleton from "@/componentes/LoadingSkeleton";
import Link from "next/link";

export default function FavoritesPage() {
    const { data: favoritesData, isLoading, isError } = useFavorites(); // obtiene la lista de favoritos para mostrar
    const addFavoriteMutation = useAddFavorite();
    const removeFavoriteMutation = useRemoveFavorite(); // Permite eliminar desde la pagina de favoritos
    const favoriteNames = new Set(favoritesData?.map(f => f.name));

    if (isError) {
        return <p style={{ color: 'red' }}>Error al cargar los favoritos.</p>;
    }

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Mis Pokémons Favoritos</h1>
            {isLoading && (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                    {[...Array(3)].map((_, i) => <LoadingSkeleton key={i} />)}
                </div>
            )}

            {!isLoading && favoritesData?.length === 0 && (
                <p>No tienes ningún pokémon favorito todavía. 
                    <Link href="/" style={{ color: 'blue', marginLeft: '5px' }}>
                        Añade algunos
                    </Link>.
                </p>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                {favoritesData?.map((pokemon) => (
                    <PokemonListItem
                        key={pokemon.name}
                        name={pokemon.name}
                        customName={pokemon.customName}
                        description={pokemon.description}
                        isFavorite={favoriteNames.has(pokemon.name)} 
                        addFavoriteMutation={addFavoriteMutation}
                        removeFavoriteMutation={removeFavoriteMutation}
                    />
                ))}
            </div>
        </div>
    );
}