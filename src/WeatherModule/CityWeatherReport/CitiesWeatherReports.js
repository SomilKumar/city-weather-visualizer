import React, {
    useState, useEffect
} from 'react';



import CityWeather from './CityWeather';
import './CitiesWeartherReport.scss';

function CitiesWeatherReport({allCities}) {
    
    const [cities, setCities] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    
    useEffect(() => {        
        if(allCities.length) {
            console.log("Received Cities", allCities);
            setCities(allCities);
            setActiveTab(allCities.length -1);
        }
      }, 
      [allCities]
    );

    return ( 
        <React.Fragment>
        <div className="columns is-centered">  
            <div className="column is-half">

            {
               cities.length === 0 ? <p>No City Selected</p> :
                <React.Fragment>
                <div className="tabs">
                    <ul>
                   {cities.map((e, index) => (
                        <li className={`${index === activeTab ? 'is-active': ''}`} 
                            key={e.id}>
                            <a onClick={() => setActiveTab(index)}>
                                {e.name}
                            </a>
                        </li>
                    ))
                   }
                    </ul>
                </div>
                
                <div style={{display: "flex", flexDirection: "row"}}>
                { cities.map((e, index) => (
                    <div className={`${index === activeTab ? 'visible': 'hidden'}`} 
                        key={e.id}>
                        <CityWeather cityData={e}/>
                    </div>
                ))
                }
                </div>
                </React.Fragment>
            
            } 
            </div>
        </div>
        </React.Fragment>
    )
}

export default CitiesWeatherReport;