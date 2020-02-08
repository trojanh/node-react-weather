const initialState = {
  pending: false,
  weather: null,
  error: null
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_WEATHER_SUCCESS':
      return {
        ...state,
        pending: false,
        weather: action.weather
      }

    case 'FETCH_WEATHER_PENDING':
      return {
        ...state,
        pending: action.pending
      }
    case 'FETCH_WEATHER_ERROR':
      return {
        ...state,
        pending: false,
        error: action.error
      }
    default:
      return state
  }
}

export default weatherReducer;