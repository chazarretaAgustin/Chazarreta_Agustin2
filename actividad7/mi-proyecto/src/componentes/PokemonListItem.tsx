import Link from 'next/link';

import { UseMutationResult } from '@tanstack/react-query';
import { PokemonFavorite } from '@/app/lib/database';

type PokemonListItemProps = {
    name: string;
    isFavorite: boolean;
    addFavoriteMutation: UseMutationResult<PokemonFavorite, Error, { name: string }, unknown>;
    removeFavoriteMutation: UseMutationResult<void, Error, string, unknown>;
};

export default function PokemonListItem({ 
    name, 
    isFavorite, 
    addFavoriteMutation, 
    removeFavoriteMutation 
}: PokemonListItemProps) {
    
    // Determina si alguna mutación (agregar o quitar) esta cargando
    const isLoading = addFavoriteMutation.isPending || removeFavoriteMutation.isPending;

    // Manejador de clic para el btn de favorito
    const handleFavoriteClick = (e: React.MouseEvent) => {
        // Evita que el <Link> (padre) se active al hacer clic en el btn
        e.preventDefault(); 
        e.stopPropagation();

        if (isFavorite) {
            removeFavoriteMutation.mutate(name); // Si ya es favorito, llama a la mutacion de eliminar
        } else {
            addFavoriteMutation.mutate({ name }); // Si no es favorito, llama a la mutacion de agregar
        }
    };
    
    // Determina si hay un error en alguna de las mutaciones
    const mutationError = addFavoriteMutation.error || removeFavoriteMutation.error;

    return (
        // El <Link> sigue llevando a la página de detalle
        <Link 
            href={`/pokemon/${name}`}
            style={{
                display: 'block',
                margin: '10px 0',
                padding: '15px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'left',
                width: '300px',
                textDecoration: 'none', 
                color: '#333', 
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
                transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            {/* Contenedor flexible para alinear nombre y btn */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '1.1em' }}>{name.toUpperCase()}</strong>
                
                {/* Btn de Favorito */}
                <button
                    onClick={handleFavoriteClick}
                    disabled={isLoading} // Deshabilita btn mientras carga
                    aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.5em',
                        opacity: isLoading ? 0.5 : 1,
                        padding: '0 5px',
                    }}
                >
                    {/* Muestra estado de carga y cambia apariencia) */}
                    {isLoading ? '⏳' : (isFavorite ? '⭐' : '☆')}
                </button>
            </div>

            <p style={{ margin: '5px 0 0', fontSize: '0.9em', color: '#666' }}>
                Haz click para ver detalles &rarr;
            </p>

            {/* Muestra error de mutacion) */}
            {mutationError && (
                <p style={{ color: 'red', fontSize: '0.8em', marginTop: '10px' }}>
                    Error: {mutationError.message}
                </p>
            )}
        </Link>
    );
}