import { createNewTransaction } from "../utils/transaction.handle";
const axios = require("axios");

async function getRestaurantsByZipCode(zipCode: string) {
  const rapidApiKey = process.env.API_KEY;
  const page = 0;

  const options = {
    method: "GET",
    url: `https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/zipcode/${zipCode}/${page}`,
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "restaurants-near-me-usa.p.rapidapi.com",
    },
  };
  await createNewTransaction(
    `GET restaurants near zip code: ${zipCode}`,
    "restaurant"
  );
  try {
    const response = await axios.request(options);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { getRestaurantsByZipCode };
