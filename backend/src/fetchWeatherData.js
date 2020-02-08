import url from "url";
import queryString from "querystring";
import yahooApi from "./yahooApi.js";

export default async function fetchWeatherData(req, res) {
  try {

    const { query } = url.parse(req.url);
    const queryParams = queryString.decode(query)
    if (!queryParams.locations) {
      throw new Error("locations string cannot be empty");
    }
    const locations = queryParams.locations && queryParams.locations.split(",");

    const weatherData = await Promise.all(
      locations.map(yahooApi)
    );
    console.log(weatherData);
    res.end(JSON.stringify(weatherData));
  } catch (err) {
    console.log(err)
    res.statusCode = 404;
    res.end(JSON.stringify({
      error: err.toString()
    }));
  }
}
