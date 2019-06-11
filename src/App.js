import React from 'react';
import './App.css';
import Titles from './components/Titles'
import Weather from "./components/Weather";
import Form from "./components/Form";

const API_KEY = 'd1fd8f1c98fdf991d477698c8e2ba18d';


class App extends React.Component {
    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }
    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        const API_URL = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
        const data = await API_URL.json();

        if (city && country) {
            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: ""
            })
        } else {
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: "Please enter the values."
            });
        }
    }


    render() {
        return (
            <div className="App">
                <div className="wrapper">
                    <div className="main">
                        <div className="row">
                            <div className="col-md-5 title-container">
                                <Titles/>
                            </div>
                            <div className="col-md-7 form-container">
                                <Form getWeather={this.getWeather}/>
                                <Weather
                                    temperature={this.state.temperature}
                                    humidity={this.state.humidity}
                                    city={this.state.city}
                                    country={this.state.country}
                                    description={this.state.description}
                                    error={this.state.error}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default App;
