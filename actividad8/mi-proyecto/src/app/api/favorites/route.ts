import { NextResponse } from "next/server";
import { db } from "@/app/lib/database"; 

/**
 * Obtiene todos los pokemons favoritos
 */
export async function GET() {
 try {
    const favorites = await db.getAll();
    return NextResponse.json(favorites, { status: 200 }); 
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 }); 
  }
}

/**
 * Agrega un nuevo pokemon a favoritos
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, customName, description } = body;

    if (!name || !customName) {
      return NextResponse.json({ error: "Los campos 'name' y 'customName' son obligatorios" }, { status: 400 }); 
    }

    // Validacion: Evita duplicados usando el 'name' unico
    const existing = await db.getByName(name); 
    if (existing) { // Si el pokemon ya está en favoritos...
      return NextResponse.json({ error: "Este pokemon ya está en favoritos" }, { status: 409 }); 
    }

    // Pasa el objeto completo a la BD
    const newFavorite = await db.add({ 
      name, 
      customName, 
      description: description || '' // Asegura que 'description' no sea 'undefined'
    });
    
    return NextResponse.json(newFavorite, { status: 201 }); 

  } catch (error) {
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 }); 
  }
}