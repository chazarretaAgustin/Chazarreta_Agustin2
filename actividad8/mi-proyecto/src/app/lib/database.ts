import fs from "fs/promises"; 
import path from "path";

const DB_PATH = path.join(process.cwd(), "database.json"); // Ruta completa del archivo database.json

// La estructura  incluye los campos del formulario
export interface PokemonFavorite {
  name: string; // ID unico
  customName: string; // Nombre dado por el usuario
  description: string; // Descripcion dada por el usuario
}

/**
 * Clase que simula una base de datos usando un archivo json
 */
class Database {
  // Metodo privado para leer el archivo json
  private async readDB(): Promise<PokemonFavorite[]> {
    try {
      const data = await fs.readFile(DB_PATH, "utf-8"); // Lee el database.json completamente
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  // Metodo privado para escribir en el archivo json
  private async writeDB(data: PokemonFavorite[]): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
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

  // Añade un favorito, recibe el objeto PokemonFavorite completo
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
    const filtered = data.filter((p) => p.name.toLowerCase() !== name.toLowerCase());
    
    if (filtered.length === initialLength) {
      return false; 
    }
    
    await this.writeDB(filtered);
    return true; 
  }
}

export const db = new Database();