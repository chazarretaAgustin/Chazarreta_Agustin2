import { NextResponse } from "next/server";
import { db } from "@/app/lib/database"; // Importa la DB simulada

/**
 * Obtiene todos los Pokémons favoritos
 */
export async function GET() {
  try {
    const favorites = await db.getAll();
    return NextResponse.json(favorites, { status: 200 }); // Devuelve los favoritos con estado 200 (ok)
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 }); // 500: Internal Server Error
  }
}

/**
 * Agrega un nuevo Pokémon a favoritos
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    // Validacion: Campo 'name' obligatorio
    if (!name) {
      return NextResponse.json({ error: "El campo 'name' es obligatorio" }, { status: 400 }); // 400: Bad Request
    }

    // Validacion: Evita duplicados
    const existing = await db.getByName(name); 
    if (existing) {
      return NextResponse.json({ error: "Este Pokemon ya esta en favoritos" }, { status: 409 }); // 409: Conflict (el recurso ya existe)
    }

    const newFavorite = await db.add({ name }); // Agrega el nuevo favorito a la DB
    
    return NextResponse.json(newFavorite, { status: 201 }); // 201: Created (devuelve el recurso creado)

  } catch (error) {
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 }); // 500: Internal Server Error (si falla el JSON.parse() o la DB)
  }
}