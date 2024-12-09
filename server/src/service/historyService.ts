import fs from 'fs';

class City {
  name: string;
  id: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

// TO DO: Complete the HistoryService class
class HistoryService {
  // TO DO: Define a read method that reads from the searchHistory.json file
    private async read(): Promise<City[]> {
      try {
        const data = await fs.promises.readFile('searchHistory.json', 'utf-8');
        return JSON.parse(data);
      } catch (error) {
        console.error('Error Reading seach History', error);
        return [];
    }
  }
  
  // TO DO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      await fs.promises.writeFile('searchHistory.json', JSON.stringify(cities));
    } catch (error) {
      console.error('Error Writing search History', error);
      throw error;
    }
  }

  // TO DO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    return await this.read();
  }

  // TO DO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(cityName: string): Promise<void> {
    const cities = await this.read();
    cities.push(new City(cityName, cities.length.toString()));
    await this.write(cities);
  }

  // BONUS TO DO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string): Promise<void> {
    const cities = await this.read();
    const index = cities.findIndex((city) => city.id !== id);
    await this.write(cities.splice(index, 1));
    }
  }

export default new HistoryService();
