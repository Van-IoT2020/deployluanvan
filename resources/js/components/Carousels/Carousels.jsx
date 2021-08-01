import React from 'react';
import {
  // UncontrolledCarousel,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
import { Link } from 'react-router-dom';

class Carousels extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeIndex: 0,
      animating: false,
      sliders: []
    };
  }

  componentWillMount(){
    axios.get('http://127.0.0.1:8000/api/slide/')
    .then(res => {
      // this.setState({
      //   sliders: res.data,
      // })
      var lstImg = [];
      res.data.map((item) => {
        if(item.slide_status == 1){
          var objectSlide = {
            src: item.slide_image,
            altText: item.slide_desc,
            caption: item.slide_desc,
            uri: item.slide_link
          };
          lstImg.push(objectSlide);
        }
      });

      this.setState({
        sliders: lstImg,
      })
    }).catch(err => console.log(err))
  }

  next() {
    if (this.state.animating) return;
    const nextIndex = this.state.activeIndex === this.state.sliders.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({activeIndex: nextIndex});
  }

  previous() {
    if (this.state.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.state.sliders.length - 1 : this.state.activeIndex - 1;
    this.setState({activeIndex: nextIndex});
  }

  goToIndex(newIndex){
    if (this.state.animating) return;
    this.setState({activeIndex: nextIndex});
  }

  render() {
    return (
      <>
        {/* <UncontrolledCarousel  items= {this.state.sliders}/>  */}
        <Carousel
          activeIndex={this.state.activeIndex}
          next={() => this.next()}
          previous={() => this.previous()}
        >
          <CarouselIndicators items={this.state.sliders} activeIndex={this.state.activeIndex} onClickHandler={(newIndex) => this.goToIndex(newIndex)} />
          {
            this.state.sliders.map((item) => (
              <CarouselItem
                  onExiting={() => this.setState({animating: true})}
                  onExited={() => this.setState({animating: false})}
                  key={item.src}
                >
                <Link to={item.uri}>
                  <img src={item.src} alt={item.altText} style={{ 
                                            display: 'block',
                                            top: '50%', 
                                            position: "relative",
                                            objectFit: "cover",
                                            verticalAlign: 'middle',
                                            width: '100vw',
                                            height: '82vh'
                                        }} />
                </Link>
                  
                  <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
                </CarouselItem>
            ))
          } 
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={() => this.previous()} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={() => this.next()} />
        </Carousel>
      </>
    )
  }
}

export default Carousels;

