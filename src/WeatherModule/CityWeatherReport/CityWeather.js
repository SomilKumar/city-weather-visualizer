import React, {useState, useEffect} from 'react';

import WeatherVisual from './WeatherVisual';


function CityWeather({cityData}) {

    const [tempUnit, setTempUnit] = useState('metric');
    const [isLoading, setIsLoading] = useState(false);
    const [cityForecast, setCityForecast] = useState({});
    const [weekMood, setWeekMood] = useState('');
    const [fetchError, setFetchError] = useState(false)

    useEffect( () => {
        setIsLoading(true);
        fetchCityForecast();
    },
        [cityData,tempUnit]
    );

    function calculateWeekMood(allDays) {
        const allCodes= {
            great: [800],
            normal:[300,500,501,701,711,721,801,802,803],
            bad:[200,201,210,211,301,502,503,504,511,600,601,731,761,804]
        };
        let avg ={
            great:{label: "Great", count:0},
            normal:{label: "Normal", count:0},
            bad:{label: "Bad", count:0},
            unacceptable:{label: "Unacceptable", count:0}
        }
        let mood = {label: "Great"};
        let max = 0;

        allDays.forEach(el => {
            if(allCodes.great.indexOf(el.weather[0].id))
                avg.great.count+= 1;
            else if(allCodes.normal.indexOf(el.weather[0].id))
                avg.normal.count+=1;
            else if(allCodes.bad.indexOf(el.weather[0].id))
                avg.bad.count+=1;
            else 
                avg.unacceptable.count+=1;
        });
   
        for(const key in avg) {
            if(avg[key].count > max ) {
                mood = avg[key];
            }
        }

        console.log(avg, mood);

        setWeekMood(mood.label);

    }

    async function fetchCityForecast() {
        let data = [];
        const forecastQuery = `https://api.openweathermap.org/data/2.5/forecast?id=${cityData.id}&units=${tempUnit}&APPID=a6c98ebcf46fd073bf700219a88bd003`;
        try {
            const response = await fetch(forecastQuery);
            data = await response.json();
            console.log("City Data for",data);
            setCityForecast(data);
            calculateWeekMood(data.list);
            setIsLoading(false);
            setFetchError(false);
        } catch(error) {
            console.log("Error Handled",error);
            setIsLoading(false);
            setFetchError(true);
        }
    }
    
    return (
        <div className="columns">  
            <div className="column is-half">
            {
                isLoading && 
                <div>
                    <span>Loading Weather Report.....</span> <br/> <br />
                    <button className="button is-fullwidth is-link is-loading is-rounded"></button>
                </div>
            }
            {
                fetchError && 
                <div>
                    <span> &emsp; Error while fetching weather data.... Please try again.</span>
                </div>
            }
            {
                Object.keys(cityForecast).length >0 && 
                <React.Fragment>
                <div className="columns">
                    <div className="column is-6">
                        <span className="tag is-large"> Mood of week: {weekMood}</span> 
                    </div>
                    
                    <div className="column is-6">
                        <div className="control">
                            <div className="select">
                                <select onChange={(e) => setTempUnit(e.target.value)}>
                                    <option value="metric">Temp in Celsius</option>
                                    <option value="imperial">Temp in Fahrenheit</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>
            
                <div className="columns">
                    <div className="column is-12">
                        <WeatherVisual data={cityForecast.list} metric={tempUnit}/>
                    </div>
                </div>
                </React.Fragment>
            }
            </div>
        </div>
    )
}

export default CityWeather;