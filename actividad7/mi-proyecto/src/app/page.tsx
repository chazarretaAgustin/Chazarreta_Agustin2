//Este archivo es un Server Component por defecto
import PokemonList from '../componentes/PokemonList';

export default function Home() {
  return (
    // Solo se renderiza el componente principal.
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PokemonList />
    </div>
  );
}