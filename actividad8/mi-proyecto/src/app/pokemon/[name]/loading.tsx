export default function PokemonDetailLoading() {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Buscando detalles de Pokémon...</h2>
            <div style={{ 
                width: '100px', 
                height: '100px', 
                border: '10px solid #f3f3f3', 
                borderRadius: '50%', 
                borderTop: '10px solid #cc0000', 
                margin: '20px auto',
                animation: 'spin 1s linear infinite' 
            }}></div>
            <p>Preparando la vista del servidor.</p>
        </div>
    );
}