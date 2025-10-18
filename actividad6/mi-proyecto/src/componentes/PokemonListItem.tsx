import Link from 'next/link';

type PokemonListItemProps = {
    name: string;
    url: string; 
};

//Componente que renderiza cada Pokémon como un Link (Card clickeable)
export default function PokemonListItem({ name}: PokemonListItemProps) {
    return (
        <Link 
            //Esto apunta a la nueva ruta dinámica. Usamos el nombre como identificador.
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
            //Esto añade un efecto visual para simular que es clickeable
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            <strong style={{ fontSize: '1.1em' }}>{name.toUpperCase()}</strong>
            <p style={{ margin: '5px 0 0', fontSize: '0.9em', color: '#666' }}>Haz click para ver detalles &rarr;</p>
        </Link>
    );
}