import LoadingSkeleton from "@/componentes/LoadingSkeleton";

export default function FavoritesLoading() {
    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Cargando Favoritos, esperá...</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                {[...Array(3)].map((_, i) => <LoadingSkeleton key={i} />)}
            </div>
        </div>
    );
}