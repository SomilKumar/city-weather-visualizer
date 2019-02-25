import React, {
    useState, useEffect
} from 'react';

import uuid from 'uuid';


import useDebounce from '../../Utils/useDebouceHook';



function CitySearch({onCitySelect}) {
    
    const [searchQuery, setSearchQuery] = useState('');
    const [cities, setCities] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [noCityMatched, setNoCityMatched] = useState(false);
    const [serverError, setServerError] = useState(false);
    
    const currentQuery = useDebounce(searchQuery, 300);

    useEffect (() => {
        if (currentQuery) {
            setIsSearching(true);
            searchCities(currentQuery);
            } else {
                setIsSearching(false);
                setCities([]);
            }
        },
        [currentQuery]
    );


    async function searchCities(query) {
        let data = [];
        try {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/find?q=${query}&type=like&sort=population&cnt=10&APPID=a6c98ebcf46fd073bf700219a88bd003`);
            data = await response.json();
            setMatchedCities(data.list);
            setServerError(false);
        } catch(error) {
            console.log("Error Handled",error);
            setIsSearching(false);
            setServerError(true);
        }

    
    }

    function setMatchedCities(matchedCities) {
        if(matchedCities.length > 0) {
            setCities(matchedCities);
            setNoCityMatched(false);
        }else {
            setNoCityMatched(true);
        }
        setIsSearching(false); 
    }

    function handleCitySelect(cityRecord) {
        onCitySelect(cityRecord);
    }

    function renderCities() {

        return (
            <React.Fragment>
                <h2 className="subtitle">Select a city from below:</h2>
                { cities.map(city => (
                    <span className="tag is-light" key={uuid.v4()}
                    onClick={()=> handleCitySelect(city)}
                    style={{marginRight: "4px", cursor: "pointer"}}>
                    { `${city.name}, ${city.sys.country}` } 
                    </span>
                    
            ))}
            </React.Fragment>
        )
    }

    return(
        <React.Fragment>
        <div className="columns is-centered">  
            <div className="column is-half"> 
            <div className={`control ${isSearching ? 'is-loading' : ''}`}>
              <input
                className="input"
                type="text"
                placeholder="Search your city here"
                value={searchQuery}
                onChange={(e)=> setSearchQuery(e.target.value)}
              />
            </div>
            </div>
        </div>
        <div className="columns is-centered">
            <div className="column is-half">
                 {
                     serverError && <span>some error caused while searching....server issues, please try again.</span>
                 }
            </div>
        </div>
        <div className="columns is-centered">
            <div className="column is-half">
                 {
                     noCityMatched && <span>Could no find matched city, enter exact name or try again!!</span>
                 }
            </div>
        </div>
        <div className="columns is-centered">
            <div className="column is-half">
                 {
                     cities.length > 0 && renderCities()
                 }
            </div>
        </div>
        </React.Fragment>
    )
}

export default CitySearch;