import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import logos from "../assets/logos";
import fetchWeather from "../api/fetchWeather";

const Button = styled.button`
  font-size: 25px;
  font-family: inherit;
  font-weight: 600;
  height: 100px;
  width: 100%;
  border-radius: 12px;
  border-radius: 12px;
  background: #00695c;
  border-color: #006966;

  display: flex;

  :hover {
    background: #26a69a;
    border-color: #006966;
  }
  :focus {
    outline: 0;
  }
`;

const CityButtonWrapper = styled.div`
  display: flex;
`;

const CitiesWrapper = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;

  @media (max-width: 786px) {
    width: 100%;
  }
`;

const CitySection = styled.div`
  margin: 20px;
`;

const CityIcon = styled.div`
  width: 35%;
  height: 100%;
  align-self: center;
`;

const CityName = styled.div`
  align-self: center;
`;

export default function Cities() {
  const dispatch = useDispatch();
  const updateWeatherData = async name => {
    dispatch({ type: "FETCH_WEATHER_PENDING", pending: true });
    fetchWeather(name)
      .then(data => {
        const weather = JSON.parse(data[0]);
        console.log(weather);
        dispatch({
          type: "FETCH_WEATHER_SUCCESS",
          weather: { ...weather, cityName: name }
        });
        window.scrollTo(0, 0);
      })
      .catch(error => {
        dispatch({ type: "FETCH_WEATHER_ERROR", error });
      });
  };
  return (
    <CitiesWrapper>
      {logos.map(({ name, icon }) => {
        return (
          <CitySection key={name}>
            <CityButtonWrapper>
              <Button onClick={() => updateWeatherData(name)}>
                <CityIcon>{icon}</CityIcon>
                <CityName>{name}</CityName>
              </Button>
            </CityButtonWrapper>
          </CitySection>
        );
      })}
    </CitiesWrapper>
  );
}
