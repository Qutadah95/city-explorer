import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
// import Weather from './components/Weather';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Data: {},
      map_url: '',
      error: false,
      showlocationdata:false,
      watherInfo:[],

    }
  };
  NameChange = (e) => { this.setState({ Name: e.target.value }) }
  handelSubmit = async (e) => {

    e.preventDefault();
    try {
      console.log(this.state.Name);



      const url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_KEY}&q=${this.state.Name}&format=json`;



      const response = await axios.get(url);
const serverurl=`${process.env.REACT_APP_server_url}/weather?city_name=${this.state.Name}`
      const serverresponse = await axios.get(serverurl);
// console.log(serverresponse.data[0].city_name);
      // console.log(response.data[0]);
      
    
      this.setState({
        Data: response.data[0],
        showlocationdata:true,
        watherInfo:serverresponse.data,

      });
      const map_url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${this.state.Data.lat},${this.state.Data.lon}&format=png`;
      console.log(map_url);
      this.setState({
        map_url: map_url,

      });
    } catch (error) {
      this.setState({
        error: true,
      });
    }
  }


  render() {
    // console.log(this.state.watherInfo[0].description);

    return (
      <div >
        <Form onSubmit={this.handelSubmit}>
          <Form.Group onChange={this.NameChange} className="mb-3" controlId="formBasicEmail">
            <Form.Label>location Name</Form.Label>
            <Form.Control name="name" type="text" placeholder="Enter the location Name" />

          </Form.Group>


 

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {this.state.showlocationdata&&
        <div>
          
          <h2>location informations</h2>
          <p>location: {this.state.Data.display_name}</p>
          <p>latitude: {this.state.Data.lat}</p>
          <p>longitude: {this.state.Data.lon}</p>
          {this.state.error &&<p>error getting the data  </p>}
          <img src={this.state.map_url} alt="" />
          
          {/* <p>date: {this.state.watherInfo}</p>
          <p>description: {this.state.watherInfo}</p>
          <p>date: {this.state.watherInfo}</p>
          <p>description: {this.state.watherInfo}</p>
          <p>date: {tthis.state.watherInfo}</p>
          <p>description: {this.state.watherInfo}</p> */}
          
            
          {/* <Weather
          // map={this.state.map_url}
          // Name={this.state.name}
          // lat={this.state.Data.lat}
          // lon={this.state.Data.lon}
          // watherInfo={this.state.watherInfo}
          data={this.state.watherInfo}

          /> */}
        
         {/* <p>location name : {this.state.watherInfo.city_name}</p>
         <p>lat : {this.state.watherInfo.lat}</p>
         <p>long : {this.state.watherInfo.lon}</p>
         <p>description: : {this.state.watherInfo[0].data[0].weather.description}</p>
         <p>country_code: : {this.state.watherInfo.country_code}</p>
         <p>state_code: : {this.state.watherInfo.state_code}</p> */}

        </div>
      }
      </div>
    );
  }
}

export default App;
