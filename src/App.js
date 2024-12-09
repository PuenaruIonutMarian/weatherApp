import React from "react";
import { convertToFlag } from "./functions/convertToFlag";
import Input from "./classes/Input";
import Weather from "./classes/Weather";



class App extends React.Component {
    state = {
      city: "",
      isLoading: false,
      displayLocation: '',
      weather: {},
    };

fetchWeather = async() => {
    if(this.state.city.length < 2) return this.setState({weather: {}});

    try {
      this.setState({ isLoading: true });
    // 1) Getting location (geocoding)
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.city}`
    );
    const geoData = await geoRes.json();
    console.log(geoData);

    if (!geoData.results) throw new Error("Location not found");

    const { latitude, longitude, timezone, name, country_code } =
      geoData.results.at(0);
      console.log('Country Code:', country_code);
    this.setState({displayLocation: `${name} ${convertToFlag(country_code)}`});

    // 2) Getting actual weather
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
    );
    const weatherData = await weatherRes.json();
    this.setState({weather: weatherData.daily});
  } catch (err) {
    console.error(err);
  } finally {
    this.setState({ isLoading: false });
  }
  
}

setLocation = (e) => {
  this.setState({city: e.target.value});
}

    /**
     * Fetches the weather when the component mounts.
     * useEffect[]
     */
componentDidMount() {
//   this.fetchWeather();

this.setState({city: localStorage.getItem('city') || '' });
}

/**
 * Invoked immediately after updating occurs. This method is called when there
 * is a change in the city state. If the city has changed from the previous 
 * state, it triggers a fetch of the weather data for the new city.
 *
 * @param {object} prevProps - The previous props.
 * @param {object} prevState - The previous state.
 * useEffect[location/city]
 */
componentDidUpdate(prevProps, prevState) {
  if (prevState.city !== this.state.city) {
    this.fetchWeather();
    localStorage.setItem('city', this.state.city);

  }
}

    /**
     * Renders the main application component, which contains the input field
     * to select a location, a button to fetch the weather, and a loader
     * that displays while the weather is being fetched. If the weather has
     * been fetched, it also renders the weather forecast component.
     * @returns {ReactElement} The rendered application component.
     */
  render() {
    return (
      <div className="app">
        <h1>Weather App</h1>
        <Input location={this.state.displayLocation} onChangeLocation= {this.setLocation}/>
      {this.state.isLoading && <p className="loader">Loading...</p>}
      {this.state.weather.weathercode && <Weather weather={this.state.weather} location={this.state.displayLocation} /> }
      </div>
    );
  }
}

export default App;






