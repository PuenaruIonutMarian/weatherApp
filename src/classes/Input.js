import React from "react";

class Input extends React.Component {
  /**
   * Renders an input field with a placeholder value of 'Paris'
   * that displays the current city value and calls the onChangeLocation
   * function when the input changes.
   * @return {ReactElement} The rendered input component.
   */
  render() {
    return (
      <div>
        <input type="text" placeholder="Search your city..." value={this.props.city} onChange={this.props.onChangeLocation}/>
      </div>
    );
  }
}

export default Input