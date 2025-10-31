import fs from "fs/promises"; // Módulo de Node.js para sistema de archivos
import path from "path";

// Ruta al archivo json que actuará como la DB
const DB_PATH = path.join(process.cwd(), "database.json");

// Define la estructura de un pokemon favorito (solo guarda el nombre)
export interface PokemonFavorite {
  name: string;
}

/**
 * Clase que simula una base de datos usando un archivo json
 * Se usa 'fs/promises' para operaciones asíncronas.
 */
class Database {
  // Método privado para leer el archivo json
  private async readDB(): Promise<PokemonFavorite[]> {
    try {
      const data = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];// Si el archivo no existe o está vacío, devuelve un array vacío
    }
  }

  // Método privado para escribir en el archivo json
  private async writeDB(data: PokemonFavorite[]): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2)); // JSON.stringify(...) formatea el json para que sea mas legible
  }

  // Obtiene todos los favoritos
  async getAll(): Promise<PokemonFavorite[]> {
    return await this.readDB();
  }

  // Busca un favorito por nombre
  async getByName(name: string): Promise<PokemonFavorite | undefined> {
    const data = await this.readDB();
    return data.find((p) => p.name.toLowerCase() === name.toLowerCase());
  }

  // Añade un favorito
  async add(pokemon: PokemonFavorite): Promise<PokemonFavorite> {
    const data = await this.readDB();
    data.push(pokemon);
    await this.writeDB(data);
    return pokemon;
  }

  // Elimina un favorito por nombre
  async remove(name: string): Promise<boolean> {
    const data = await this.readDB();
    const initialLength = data.length;
    // Filtra el array, quedandose con todos menos el que coincide (el que se va a eliminar)
    const filtered = data.filter((p) => p.name.toLowerCase() !== name.toLowerCase());
    
    // Si el tamaño no cambio, entonces el pokemon no se encontro
    if (filtered.length === initialLength) {
      return false; // No se elimina nada
    }
    
    await this.writeDB(filtered);
    return true; // Eliminacion exitosa
  }
}

// Exporta una instancia única (Singleton) de la base de datos
export const db = new Database();