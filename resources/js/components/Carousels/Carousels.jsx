import React from 'react';
import {
  UncontrolledCarousel
} from 'reactstrap';

class Carousels extends React.Component {
  constructor(props){
    super(props);
    this.state={
      items: [
        {
          src: './images/imageCrs/3.jpg',
          altText: '',
          caption: ''
        },
        {
          src: './images/imageCrs/4.jpg',
          altText: '',
          caption: ''
        },
        {
          src: './images/imageCrs/6.jpg',
          altText: '',
          caption: ''
        }
      ]
    };
  }

  componentWillMount(){
    this.setState({
      items: [
        {
          src: '/images/imageCrs/3.jpg',
          altText: '',
          caption: ''
        },
        {
          src: '/images/imageCrs/4.jpg',
          altText: '',
          caption: ''
        },
        {
          src: '/images/imageCrs/6.jpg',
          altText: '',
          caption: ''
        }
      ]
    })
  }

  render() {
    return (
      <>
        <UncontrolledCarousel items={this.state.items} /> 
      </>
    )
  }
}

export default Carousels;

