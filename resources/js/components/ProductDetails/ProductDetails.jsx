import React from 'react';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import Carousels from '../Carousels/Carousels';
import Details from '../ProductDetails/Details/Details';
class ProductDetails extends React.Component {
    render() {
        return (
            <div style={{overflow:"hidden", width:"100vw"}}>
                <Menu />
                <Carousels />
                <Header />
                <Details id={this.props.match.params.id} />
                <span> </span>
                <Footer />
            </div>
        );
        
    }
}

export default ProductDetails;