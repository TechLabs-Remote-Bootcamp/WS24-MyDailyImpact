import Country from "../models/Country.js";
import { ApiError } from "../utils/errorHandler.js";

export const getCountries = async (req, res, next) => {
    try {
        const countries = await Country.find({});
        res.json(countries);
    } catch (error) {
        console.error(error);
        next(new ApiError(500, "Error fetching all countries", error.message));
    }
};