import { NextResponse } from "next/server";
import { db } from "@/app/lib/database";

/**
 * Elimina un favorito usando el 'name' de la URL
 */
export async function DELETE(
  request: Request,
  { params }: { params: { name: string } } // Recibe 'name' de la URL
) {
  try {
    const name = params.name; // El nombre viene de la ruta dinamica

    if (!name) {
      return NextResponse.json({ error: "Nombre (parametro) invalido" }, { status: 400 }); // 400: Bad Request
    }

    // Intenta eliminar de la DB
    const deleted = await db.remove(name);

    // Validacion: Si no se elimino nada, no se encontro
    if (!deleted) {
      return NextResponse.json({ error: "Pokemon no encontrado en favoritos" }, { status: 404 }); // 404: Not Found
    }

    return NextResponse.json({ message: `Pokemon ${name} eliminado` }, { status: 200 }); // 200: OK (Confirmacion de eliminacion)

  } catch (error) {

    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 }); // 500: Internal Server Error
  
  }
}