import React from "react";
import { formatDay } from "../functions/formatDay";
import { getWeatherIcon } from "../functions/getWheatherIcon";


class Day extends React.Component {
  /**
   * Renders a single day in the weather forecast, displaying the weekday (or
   * "Today" if it's today), the weather icon, and the high and low temperatures
   * in degrees Celsius.
   *
   * @returns {ReactElement} The rendered day component.
   */
  render() {
    const { date, max, min, code, isToday } = this.props;
    const icon = getWeatherIcon(code);
    return (
      <li className="day">
        <span>{icon}</span> 
        <p>{isToday ? 'Today' : formatDay(date)}</p> 
        <p>{Math.floor(min)}&deg; &mdash;  <strong>{Math.ceil(max)}&deg;</strong></p>
      </li>
    );
  }
}

export default Day
