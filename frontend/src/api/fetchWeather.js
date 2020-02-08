
export default function fetchWeather(location) {
  return fetch(`http://localhost:3002/weather?locations=${location}`)
    .then(response => response.json())
}
