import OAuth from "oauth";

export default function yahooApi(location) {
  const {
    YAHOO_APP_ID,
    YAHOO_CONSUMER_KEY,
    YAHOO_CONSUMER_SECRET
  } = process.env;

  const header = {
    "Yahoo-App-Id": YAHOO_APP_ID,
    "Content-Type": "application/json",
  };


  const request = new OAuth.OAuth(
    null,
    null,
    YAHOO_CONSUMER_KEY,
    YAHOO_CONSUMER_SECRET,
    "1.0",
    null,
    "HMAC-SHA1",
    null,
    header
  );

  return new Promise((resolve, reject) => request.get(
    `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${location}&format=json`,
    null,
    null,
    (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    }
  ));
}