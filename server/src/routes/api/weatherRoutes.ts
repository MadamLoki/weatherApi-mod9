import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TO DO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    // Extract cityName from request body
    const { cityName } = req.body;
    console.log('Received request for city:', cityName);

    const weather = new WeatherService(cityName);
    const weatherData = await weather.getWeatherForCity(cityName);

    // Log the data we're sending back
    console.log('Sending weather data:', weatherData);

    // Send the response
    res.json(weatherData);

    // Save to history after sending response
    await HistoryService.addCity(cityName);

  } catch (error) {
    console.error('Weather API Error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    });
  }
});




// TO DO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  const history = await HistoryService.getCities();
  res.json(history);
});

// BONUS TO DO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  await HistoryService.removeCity(req.params.id);
  res.status(200).send('City removed');
});

export default router;
