import { PokemonFavorite } from "@/app/lib/database";

// El payload es la interfaz completa de PokemonFavorite
type AddFavoritePayload = PokemonFavorite;

export const favoritesService = {
    /**
   * Obtiene todos los favoritos
   */
  getAll: async (): Promise<PokemonFavorite[]> => {
    const res = await fetch("/api/favorites");
    if (!res.ok) throw new Error("Error al obtener favoritos");
    return res.json();
  },

  /**
   * Agregar un favorito
   */
  add: async (payload: AddFavoritePayload): Promise<PokemonFavorite> => { // Recibe el payload completo
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload), // Envia el objeto completo
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al agregar favorito");
    }
    return res.json();
  },

  /**
   * Elimina un favorito por su nombre
   */
  remove: async (name: string): Promise<void> => {
    const res = await fetch(`/api/favorites/${name}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al eliminar favorito");
    }
  },
};