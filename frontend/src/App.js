import React from "react";
import styled from "styled-components";
import Cities from "./components/Cities";
import Weather from "./components/Weather";
import { createStore } from "redux";
import weatherReducer from "./reducers";
import { Provider } from "react-redux";

const AppWrapper = styled.div`
  text-align: center;
`;

const AppHeader = styled.header`
  color: #26a69a;
  font-size: 30px;
  font-weight: 700;
  background-color: #282c34;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AppBody = styled.div`
  background-color: #212121;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  font-family: inherit;
  color: white;
  overflow: scroll;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

function App() {
  const store = createStore(weatherReducer);

  return (
    <AppWrapper>
      <AppHeader>Weather App</AppHeader>
      <Provider store={store}>
        <AppBody>
          <Cities />
          <Weather />
        </AppBody>
      </Provider>
    </AppWrapper>
  );
}

export default App;
