"use client"; 
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { favoritesService } from "@/servicios/favorites.service";
import { PokemonFavorite } from "@/app/lib/database"; // Importamos el tipo de la BD

const FAVORITES_QUERY_KEY = ["favorites"];

/**
 * Hook para obtener todos los favoritos.
 */
export function useFavorites() {
  return useQuery({
    queryKey: FAVORITES_QUERY_KEY,
    queryFn: favoritesService.getAll, 
  });
}

/**
 * Hook para añadir un favorito.
 */
export function useAddFavorite() {
  const queryClient = useQueryClient(); 

  // Actualizamos los tipos de la mutacion
  return useMutation<
    PokemonFavorite, // Tipo de dato que devuelve
    Error, // Tipo de error
    PokemonFavorite // Tipo del payload 
  >({
    mutationFn: favoritesService.add, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEY });
    },
  });
}

/**
 * Hook para eliminar un favorito.
 */
export function useRemoveFavorite() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: favoritesService.remove, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEY }); 
    },
  });
}