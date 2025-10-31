import { PokemonFavorite } from "@/app/lib/database";

// Define la estructura de lo que se envia al POST
type AddFavoritePayload = {
  name: string;
};

/**
 * Objeto que encapsula las llamadas fetch a la API de favoritos.
 */
export const favoritesService = {
  
  /**
   * Obtiene todos los favoritos
   */
  getAll: async (): Promise<PokemonFavorite[]> => {
    // Llama a la API Route GET
    const res = await fetch("/api/favorites");
    if (!res.ok) throw new Error("Error al obtener favoritos");
    return res.json();
  },

  /**
   * Agregar un favorito
   */
  add: async (payload: AddFavoritePayload): Promise<PokemonFavorite> => {
    // Llama a la API Route POST
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    // Si la API devuelve un error (400, 409, 500), lanza una excepcion
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
    // Llama a la API Route DELETE
    const res = await fetch(`/api/favorites/${name}`, {
      method: "DELETE",
    });
    // Si la API devuelve un error (400, 404, 500), lanza una excepcion
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al eliminar favorito");
    }
    // DELETE no devuelve contenido, solo confirma
  },
};