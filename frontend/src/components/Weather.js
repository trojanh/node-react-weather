import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import WeatherIcon from "react-icons-weather";
import logos from "../assets/logos";

const Content = styled.div`
  margin: 20px 180px;
  flex: 1;
  @media (max-width: 786px) {
    margin: 5px;
    max-width: 100%;
  }
`;

const WeatherRow = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  justify-content: space-around;
  font-size: 16px;
  border-top: solid 1px #00695c;
`;

const WeatherRow1 = styled.div`
  display: flex;
  max-width: 100%;
  justify-content: space-around;
`;

const WeatherRow2 = styled.div`
  margin: 8px;
  display: flex;
  flex: 1 0 0;
  justify-content: space-between;
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
  ${({ bold }) =>
    bold &&
    `
    font-weight: 400;
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

const renderColumn = data => {
  return (
    <WeatherRow2>
      {Object.keys(data)
        .slice(0, 3)
        .map(value => {
          return (
            <WeatherRow2 key={value}>
              <RowContent>{value}: </RowContent>
              <RowContent>{data[value]}</RowContent>
            </WeatherRow2>
          );
        })}
    </WeatherRow2>
  );
};

const renderForecasts = forecasts => {
  return (
    <WeatherRow1>
      {forecasts.slice(0, 5).map(forecast => {
        return (
          <WeatherRow column key={forecast.date}>
            <RowContent bold>{forecast.day}</RowContent>
            <RowContent>
              <WeatherIcon name="yahoo" iconId={forecast.code.toString()} />
            </RowContent>
            <WeatherRow2>
              <div>H: </div>
              <div>{forecast.high}</div>
            </WeatherRow2>
            <WeatherRow2>
              <div>L: </div>
              <div>{forecast.low}</div>
            </WeatherRow2>
          </WeatherRow>
        );
      })}
    </WeatherRow1>
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

        <WeatherRow1>
          <RowContent>{observations.condition.temperature} &#8457;</RowContent>
          <RowContent icon>
            <WeatherIcon
              name="yahoo"
              iconId={observations.condition.code.toString()}
            />
          </RowContent>
          <RowContent>{observations.condition.text}</RowContent>
        </WeatherRow1>

        <WeatherRow column>
          {renderColumn(weather.current_observation.atmosphere)}
          {renderColumn(weather.current_observation.wind)}
        </WeatherRow>
        <WeatherRow column>{renderForecasts(weather.forecasts)}</WeatherRow>
      </Content>
    </WeatherWrapper>
  );
}
