import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import WeatherIcon from "react-icons-weather";
import logos from "../assets/logos";

const Content = styled.div`
  margin: 20px;
  flex: 1;
  @media (max-width: 786px) {
    margin: 5px;
  }
`;

const WeatherRow = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  justify-content: space-around;
  @media (max-width: 786px) {
    width: 100%;
    margin: 2px;
    flex-flow: wrap;
    justify-content: center;
  }
`;
const WeatherWrapper = styled.div`
  display: flex;
  flex: 4;
`;

const RowHeader = styled.div`
  margin: 10px;
  font-size: 25px;
  font-weight: 600;
  color: #26a69a;
  @media (max-width: 786px) {
    width: 100%;
  }
`;

const RowContent = styled.div`
  align-self: center;
  margin-left: 10px;
  text-transform: capitalize;
  text-align: end;
  ${({ icon }) =>
    icon &&
    `
font-size: 50px;
`}
  ${({ header }) =>
    header &&
    `
font-size: 20px;
font-weight: 400;
width: 30%

`}
`;

const renderText = text => {
  return (
    <WeatherWrapper>
      <Content>
        <WeatherRow>{text}</WeatherRow>
      </Content>
    </WeatherWrapper>
  );
};

export default function Weather() {
  const { error, weather, pending } = useSelector(state => state);
  console.log(weather);
  if (pending) {
    return renderText("Loading...");
  }
  if (error) {
    return renderText("Something went wrong");
  }
  if (!weather) {
    return renderText("Select your city to see weather");
  }
  const cityLogo =
    weather && logos.find(({ name }) => name === weather.cityName);
  const observations = weather.current_observation;
  return (
    <WeatherWrapper>
      <Content>
        {cityLogo && cityLogo.icon}

        <WeatherRow>
          <RowHeader>
            {`${weather.location.city}, ${weather.location.country}`}
          </RowHeader>
        </WeatherRow>

        <WeatherRow>
          <RowContent>{observations.condition.temperature} &#8457;</RowContent>
          <RowContent icon>
            <WeatherIcon
              name="yahoo"
              iconId={observations.condition.code.toString()}
            />
          </RowContent>
          <RowContent>{observations.condition.text}</RowContent>
        </WeatherRow>

        <WeatherRow>
          <WeatherRow column>
            <WeatherRow>
              <RowContent>Humidity: </RowContent>
              <RowContent>
                {weather.current_observation.atmosphere.humidity}
              </RowContent>
            </WeatherRow>
            <WeatherRow>
              <RowContent>Visibility: </RowContent>
              <RowContent>
                {weather.current_observation.atmosphere.visibility}
              </RowContent>
            </WeatherRow>
            <WeatherRow>
              <RowContent>Pressure: </RowContent>
              <RowContent>
                {weather.current_observation.atmosphere.pressure}
              </RowContent>
            </WeatherRow>
          </WeatherRow>
          <WeatherRow column>
            <WeatherRow>
              <RowContent>Chill: </RowContent>
              <RowContent>{weather.current_observation.wind.chill}</RowContent>
            </WeatherRow>
            <WeatherRow>
              <RowContent>Direction: </RowContent>
              <RowContent>
                {weather.current_observation.wind.direction}
              </RowContent>
            </WeatherRow>
            <WeatherRow>
              <RowContent>Speed: </RowContent>
              <RowContent>{weather.current_observation.wind.speed}</RowContent>
            </WeatherRow>
          </WeatherRow>
          <WeatherRow column>
            <WeatherRow>
              <RowContent>Sunrise: </RowContent>
              <RowContent>
                {weather.current_observation.astronomy.sunrise}
              </RowContent>
            </WeatherRow>
            <WeatherRow>
              <RowContent>Sunset: </RowContent>
              <RowContent>
                {weather.current_observation.astronomy.sunset}
              </RowContent>
            </WeatherRow>
            <WeatherRow></WeatherRow>
          </WeatherRow>
        </WeatherRow>
      </Content>
    </WeatherWrapper>
  );
}
