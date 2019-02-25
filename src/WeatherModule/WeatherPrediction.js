import React, {useState} from 'react';

import CitySearch from './CitySearch/CitySearch';


function WeatherPrediction() {

    const [cities, setCities] = useState([]);

    function onCitySelect(newCityRecord) {
        let matchedCities = cities.filter((e) => e.id === newCityRecord.id);
        if(matchedCities.length === 0) {
            if(cities.length === 9) {
                cities.shift();
            }
        let newCities = [...cities, newCityRecord];
        console.log("Added a city", newCities);
        setCities(newCities);
        } else {
            alert("City Weather report already available");
        }
    }
    
    return (
        <div>
            <CitySearch onCitySelect={onCitySelect}/>         
        </div>
    )
}

export default WeatherPrediction;