import express from 'express';
import { getCountries } from '../controllers/country.js';

const countryRouter = express.Router();

countryRouter.get('/get-countries', getCountries);

export default countryRouter;

