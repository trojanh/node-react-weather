
export default function fetchWeather(location) {
  return fetch(`https://yahoo-weather-api.trojanh.now.sh/weather?locations=${location}`)
    .then(response => response.json())
}
