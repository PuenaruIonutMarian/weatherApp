import React from "react";
import Day from "./Day";


class Weather extends React.Component {


    /**
   * Clears the interval ID when the component is unmounted, preventing memory
   * leaks by ensuring that the interval is stopped when the component is no
   * longer needed.
   */
componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  


/**
 * Renders the weather forecast for a given location, displaying the maximum
 * and minimum temperatures, weather code, and date for each day.
 *
 * @returns {JSX.Element} A React component that contains a list of Day
 * components, each representing a day's weather information.
 */
render() {
    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      time: dates,
      weathercode: codes
    } = this.props.weather;

    return (
      <div>
        <h2>Weather {this.props.location} </h2>
        <ul className="weather">
          {dates.map((date, index) => ( <Day key={date} date={date}  max={max[index]} min={min[index]} code={codes.at(index)} isToday={index === 0}/>))}
        </ul>
      </div>
    );
  }
}

export default Weather