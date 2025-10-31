"use client"; // Los hooks son 'client-side'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { favoritesService } from "@/servicios/favorites.service";

// Clave de caché para la lista de favoritos
const FAVORITES_QUERY_KEY = ["favorites"];

/**
 * Hook para obtener todos los favoritos.
 */
export function useFavorites() {
  return useQuery({
    queryKey: FAVORITES_QUERY_KEY,
    queryFn: favoritesService.getAll, // Llama al servicio
  });
}

/**
 * Hook para añadir un favorito.
 */
export function useAddFavorite() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: favoritesService.add, // Llama al servicio 'add'
    onSuccess: () => {
      // Invalida la caché de favoritos para que cualquier componente usando "useFavorites" se actualice
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
    mutationFn: favoritesService.remove, // Llama al servicio "remove"
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEY }); // Invalida la caché
    },
  });
}