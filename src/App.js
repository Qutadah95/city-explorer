import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Data: {},
      map_url: '',
      error: false,

    }
  };
  NameChange = (e) => { this.setState({ Name: e.target.value }) }
  handelSubmit = async (e) => {

    e.preventDefault();
    try {
      console.log(this.state.Name);



      const url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_KEY}&q=${this.state.Name}&format=json`;



      const response = await axios.get(url);

      console.log(response.data[0]);
      this.setState({
        Data: response.data[0],

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
console.log(this.state.error);
    return (
      <div >
        <Form onSubmit={this.handelSubmit}>
          <Form.Group onChange={this.NameChange} className="mb-3" controlId="formBasicEmail">
            <Form.Label>location Name</Form.Label>
            <Form.Control type="text" placeholder="Enter the location Name" />

          </Form.Group>



          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <div>
          
          <h2>location informations</h2>
          <p>location: {this.state.Data.display_name}</p>
          <p>latitude: {this.state.Data.lat}</p>
          <p>longitude: {this.state.Data.lon}</p>
          {this.state.error &&<p>error getting the data  </p>}
          <img src={this.state.map_url} alt="" />


        </div>

      </div>
    );
  }
}

export default App;
