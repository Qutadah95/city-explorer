import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const MOVIES_API_KEY = process.env.MOVIES_API_KEY;

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Data: {},
      map_url: '',
      error: false,
      showlocationdata: false,
      watherInfo: [],
      weatherData: [],
      moviesData:[],
    }

  };

  NameChange = (e) => { this.setState({ Name: e.target.value }) }
  handelSubmit = async (e) => {

    e.preventDefault();
    // try {
    console.log(this.state.Name);

    console.log(this.state.watherInfo);

    const url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_KEY}&q=${this.state.Name}&format=json`;

    console.log(url, 'url');

    const response = await axios.get(url);
    console.log(response.data[0], 'response');

    const serverurl = `${process.env.REACT_APP_server_url}/weather?city_name=${this.state.Name}`
    console.log(serverurl, 'serverurl');




    this.setState({
      Data: response.data[0],
      showlocationdata: true,

    });
    const map_url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${this.state.Data.lat},${this.state.Data.lon}&format=png`;
    console.log(map_url, 'map_url');
    this.setState({
      map_url: map_url,

    });


    this.weatherBitFunction();
    this.moviesBitFunction();

  };
  weatherBitFunction = async (e) => {
    const weatherurl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${this.state.Name}&key=${WEATHER_API_KEY}`;
    console.log(weatherurl, 'url');
    const weatherresponse = await axios.get(weatherurl);
    console.log(weatherresponse.data, 'weatherresponse');
    this.setState({
      weatherData: weatherresponse.data[0],
    });

  };
  moviesBitFunction = async (e) => {
    const moviesurl = `https://api.themoviedb.org/3/search/movie?query=${this.state.Name}&api_key=${MOVIES_API_KEY}`;
    console.log(moviesurl, 'url');
    const moviesresponse = await axios.get(moviesurl);
    console.log(moviesresponse, 'moviesresponse');
    this.setState({
      moviesData: moviesresponse.data,
    });

  };

  render() {

    return (
      <div >
        <div>
          <Form onSubmit={this.handelSubmit} >
            <Form.Group onChange={this.NameChange} className="mb-3" controlId="formBasicEmail">
              <Form.Label>location Name</Form.Label>
              <Form.Control name="name" type="text" placeholder="Enter the location Name" />

            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        {this.state.showlocationdata &&
          <div>
            <h2>location informations</h2>
            <p>location: {this.state.Data.display_name}</p>
            <p>latitude: {this.state.Data.lat}</p>
            <p>longitude: {this.state.Data.lon}</p>
            {this.state.error && <p>error getting the data  </p>}
            <img src={this.state.map_url} alt="" />
            <p>{this.state.weatherData}</p>
          </div>
        }
      </div>
    )
  }
};

export default App;

