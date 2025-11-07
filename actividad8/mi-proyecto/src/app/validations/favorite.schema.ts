import * as Yup from "yup";

// Esquema de validacion para el formulario de favoritos
export const favoriteSchema = Yup.object().shape({
  /**
   * Nombre personalizado que el usuario le dara al favorito.
   * - Mínimo 3 caracteres
   * - Máximo 50 caracteres
   * - Nbre personalizado obligatorio
   */
  customName: Yup.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres")
    .required("El nombre personalizado es obligatorio"),
  
  /**
   * Descripcion para el favorito.
   * - Opcional
   * - Maximo 100 caracteres
   */
  description: Yup.string()
    .max(100, "La descripcion no puede tener mas de 100 caracteres"),
});