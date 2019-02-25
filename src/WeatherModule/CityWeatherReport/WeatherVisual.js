import React from 'react';
import * as Recharts from 'recharts';
import moment from 'moment';

const {ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;


function CustomTooltip({ payload, label, active, metric }) {
    if (active) {
        const data = payload[0].payload;
        const imgSrc = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
        const fullDate = moment.unix(data.dt).format("llll");
      return (
        <div className="card">
            <div className="card-header">
            <p className="card-header-title">{data.weather[0].description.toUpperCase()}</p>
            <span className="card-header-icon">
                <img src={imgSrc} alt="weather-icon"></img>
            </span>
            </div>
          <div className="card-content">
                <div className="content">
                <h2>{data.main.temp} <span>&#176;{ metric === 'metric'? ' C': ' F' }</span></h2>
                <h3>{data.wind.speed} &emsp; m/s</h3>
                <br />
                <span>High: &emsp; {data.main.temp_max} </span> <br />
                <span>Low: &emsp; {data.main.temp_min}</span> <br />
                <br />
                <span>{fullDate}</span>
                </div>
            </div>
        </div>
      );
    }
    return null;
}

class WeatherVisual extends React.Component {

    renderCustomAxisTick = (tickItem) => { 
        return moment.unix(tickItem).format("ddd, Do MMM h a");
    }

 

    render() {
        const {data, metric} = this.props;
        return (
            <div>
            <ComposedChart width={1000} height={600} data={data}
                margin={{top: 20, right: 20, bottom: 20, left: 20}}>
            <CartesianGrid stroke='strokeDasharray="5 5"'/>
            <XAxis dataKey="dt" tickFormatter={this.renderCustomAxisTick}/>
            <YAxis yAxisId="left"   label={{ value: "Temperature", angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: "Wind Speed", angle: 90, position: 'insideRight' }}/>
            <Tooltip content={<CustomTooltip metric={metric}/>} />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="main.temp" stroke="#8884d8"/>
            <Line yAxisId="right" type="monotone" dataKey="wind.speed" stroke="#82ca9d" />
        </ComposedChart>
            </div>
        )
    
    }
}

export default WeatherVisual;