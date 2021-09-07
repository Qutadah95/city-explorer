import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class HornedBeasts extends React.Component {

  constructor(props) {
    super(props);

  }

 
  
  
  render() {
    return (
      
        <Card style={{ width: '18rem',display:'inline-block',margin:'15px' }}>
          <Card.Img variant="top" src={this.props.map_url} />
          <Card.Body>
            <Card.Title>{this.props.watherInfo[0].data}</Card.Title>
            <Card.Text>
            {this.props.lat}
            </Card.Text>
            <Card.Text>
            {this.props.lon}
            </Card.Text>
            <Card.Text>
            {this.props.watherInfo}
            </Card.Text>
            {/* <Button onClick={this.favoriteFunctions} variant="primary">favorite</Button> */}
            <Card.Text>
            {/* 💙 {this.state.favaretCounter} */}
            </Card.Text>
          </Card.Body>
        </Card>
       

      
    );
  }
}

export default HornedBeasts;
