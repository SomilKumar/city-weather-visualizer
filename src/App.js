import React, { Component } from "react";
import "./App.scss";

import WeatherPrediction from "./WeatherModule/WeatherPrediction";
class App extends Component {
  render() {
    return (
      <div className="App">
      <div className="columns is-centered">
          <div className="column is-12">
             <h2 className="has-text-link">City Weather Visualizer</h2>
            </div>
        </div>
        <div className="columns is-centered">
          <div className="column is-12">
            <WeatherPrediction />
            </div>
        </div>
      </div>
    );
  }
}

export default App;
