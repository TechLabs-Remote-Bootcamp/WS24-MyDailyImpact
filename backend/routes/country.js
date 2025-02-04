import express from 'express';
import Country from '../models/Country.js';

const countryRouter = express.Router();


countryRouter.get('/test-country', (req, res) => {
    res.json({ message: 'Country router is working' });
  });
// Get all countries
countryRouter.get('/countries', async (req, res) => {
  try {
    const countries = await Country.find({});
    res.json(countries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default countryRouter;

