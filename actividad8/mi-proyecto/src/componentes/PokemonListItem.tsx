import Link from 'next/link';
import { useState } from 'react'; // Importa useState
import { UseMutationResult } from '@tanstack/react-query';
import { PokemonFavorite } from '@/app/lib/database';
import FavoriteFormModal from './FavoriteFormModal'; // Importa el modal

type PokemonListItemProps = {
    name: string; 
    customName?: string; 
    description?: string; 
    isFavorite: boolean;
    addFavoriteMutation: UseMutationResult<PokemonFavorite, Error, PokemonFavorite, unknown>;
    removeFavoriteMutation: UseMutationResult<void, Error, string, unknown>;
};

export default function PokemonListItem({ 
    name, 
    customName, 
    description,
    isFavorite, 
    addFavoriteMutation, 
    removeFavoriteMutation 
}: PokemonListItemProps) {
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const isRemoving = removeFavoriteMutation.isPending;

    const handleFavoriteClick = (event: React.MouseEvent) => { // Define lo que pasa cuando se hace clic en la estrella
        /*
            Permite hacer clic sobre los campos de texto sin ejecutar la navegación al detalle
            Sino, al hacer clic en alguno de los campos de texto, va al detalle impidiendo completar los campos
        */
        event.preventDefault(); 
        event.stopPropagation();

        if (isFavorite) { // Si ya es favorito ...
            removeFavoriteMutation.mutate(name); 
        } else {
            setModalIsOpen(true);
        }
    };
    
    const mutationError = removeFavoriteMutation.error;
    return (
      <>
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
            onMouseEnter={(event) => {
              event.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
              event.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              event.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '1.1em' }}>{(customName || name).toUpperCase()}</strong> 
                <button
                      onClick={handleFavoriteClick}
                    disabled={isRemoving} 
                    aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.5em',
                        opacity: isRemoving ? 0.5 : 1,
                        padding: '0 5px',
                    }}
                >
                    {isRemoving ? '⏳' : (isFavorite ? '⭐' : '☆')}
                 </button>
            </div>

            {description && (
                <p style={{ margin: '5px 0 0', fontSize: '0.9em', color: '#555', fontStyle: 'italic' }}>
                    {description}
                </p>
            )}

            <p style={{ margin: '5px 0 0', fontSize: '0.9em', color: '#666' }}>
                Haz click para ver detalles &rarr;
            </p>

            {mutationError && (
                <p style={{ color: 'red', fontSize: '0.8em', marginTop: '10px' }}>
                    Error: {mutationError.message}
                 </p>
            )}
        </Link>

        {modalIsOpen && (
            <FavoriteFormModal 
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                pokemonName={name}
                addFavoriteMutation={addFavoriteMutation}
            />
        )}
      </>
    );
}